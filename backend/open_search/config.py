"""
Configuration information regarding client and envs
"""
import os

from dotenv import load_dotenv
from opensearchpy import OpenSearch

load_dotenv()

INDEX_NAME = "epi-recipes"
SERVICE_URI = os.getenv("SERVICE_URI")
if SERVICE_URI == "https://user:pass@hostname:port" or SERVICE_URI is None:
    print(f"Update SERVICE_URI to your cluster uri. Current value for SERVICE_URI={SERVICE_URI}")
    exit(-1)

client = OpenSearch(SERVICE_URI, 
    http_compress = True, # enables gzip compression for request bodies
    # http_auth = auth,
    use_ssl = False,
    verify_certs = False,
    ssl_assert_hostname = False,
    ssl_show_warn = False
    # ca_certs = ca_certs_path
)
