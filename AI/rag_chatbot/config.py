import os
from dotenv import load_dotenv

load_dotenv()

# Ollama Configuration
OLLAMA_MODEL = "llama3.2:1b"
OLLAMA_BASE_URL = "http://localhost:11434"

# FAISS Configuration
FAISS_INDEX_PATH = "./data/faiss_index"
EMBEDDINGS_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

# RAG Configuration
CHUNK_SIZE = 512
CHUNK_OVERLAP = 50
TOP_K_RESULTS = 3