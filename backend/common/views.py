from django.views import generic

from drf_spectacular.utils import OpenApiExample, extend_schema
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from open_search.config import INDEX_NAME, client

from .serializers import MessageSerializer

ITEM_PER_PAGE = 50

class IndexView(generic.TemplateView):
    template_name = "common/index.html"

class RestViewSet(viewsets.ViewSet):
    serializer_class = MessageSerializer

    @extend_schema(
        summary="Check REST API",
        description="This endpoint checks if the REST API is working.",
        examples=[
            OpenApiExample(
                "Successful Response",
                value={
                    "message": "This message comes from the backend. "
                    "If you're seeing this, the REST API is working!"
                },
                response_only=True,
            )
        ],
        methods=["GET"],
    )
    @action(
        detail=False,
        methods=["get"],
        permission_classes=[AllowAny],
        url_path="rest-check",
    )
    def rest_check(self, request):
        serializer = self.serializer_class(
            data={
                "message": "This message comes from the backend. "
                "If you're seeing this, the REST API is working!"
            }
        )
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class RecipeViewSet(viewsets.ViewSet):
    serializer_class = MessageSerializer

    @extend_schema(
        summary="Check RECIPES API",
        description="This endpoint checks if the REST API is working.",
        examples=[
            OpenApiExample(
                "Successful Response",
                value={
                    "message": "This message comes from the backend. "
                    "If you're seeing this, the REST API is working!"
                },
                response_only=True,
            )
        ],
        methods=["GET"],
    )

    def create_response(self, query, fields = False):
        response = []
        resp = client.search(
            body = query,
            index = 'epi-recipes'
        )
        result = resp['hits']['hits']
        for i in result:
            data = { "_index": i['_index'], "_id": i['_id'] }
            source = i['fields'] if fields else i['_source']
            data.update(source)
            response.append(data)
        return response
    
    @action(detail=False, methods=["get"], permission_classes=[AllowAny], url_path="all",)
    def all(self, request):
        # get search query 
        search_query = request.GET.get('query')
        # get id for single document
        id = request.GET.get('id')
        # get next cursor for pagination
        next = request.GET.get('next')
        query = {
            "from": next if next else 0, # start cursor for documents index
            "size": ITEM_PER_PAGE, # number of records fetch
        }

        if (id):
            query['query'] = {
                'multi_match': {
                'query': id,
                'fields': ['_id']
                }
            }
            return Response({ "recipe": self.create_response(query)[0] }, status=status.HTTP_200_OK)

        if (search_query):
            query['query'] = {
                'multi_match': {
                'query': search_query,
                'fields': ['title^2', 'director']
                }
            }

        query['sort'] = [
            {
                "rating": {
                    "order": "desc"
                }
            }
        ]

        return Response({ "next": ITEM_PER_PAGE + 1, "recipes": self.create_response(query) }, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"], permission_classes=[AllowAny], url_path="categories")
    def categories(self, request):
        unique_categories = set()
        query = {
            "size": 100,
            "query": {
                # "nested": {
                #     "path": "",
                #     "query": {
                #         "match_all": {}
                #     },
                #     "inner_hits": {
                #         "docvalue_fields": ["categories"]
                #     }
                # }
                "match_all": {}
            },
            "fields": ["categories"],
            "_source": "false",
        }
        categories = self.create_response(query, fields= True)
        for i in categories:
            unique_categories.update(set(i['categories']))
        return Response(unique_categories, status=status.HTTP_200_OK)