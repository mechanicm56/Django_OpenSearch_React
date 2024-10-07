from .views import RestViewSet, RecipeViewSet


routes = [
    {"regex": r"rest", "viewset": RestViewSet, "basename": "Rest"},
    {"regex": r"recipes", "viewset": RecipeViewSet, "basename": "Recipe" }
]
