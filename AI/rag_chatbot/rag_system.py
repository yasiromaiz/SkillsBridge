import os
import json
from typing import List, Dict
import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
import ollama
from config import *

class RAGChatbot:
    def __init__(self):
        self.embeddings_model = SentenceTransformer(EMBEDDINGS_MODEL)
        self.index = None
        self.documents = []
        self.load_or_create_index()
    
    def load_or_create_index(self):
        """Load FAISS index or create new one"""
        if os.path.exists(FAISS_INDEX_PATH):
            self.index = faiss.read_index(FAISS_INDEX_PATH)
            with open("./data/documents.json", "r") as f:
                self.documents = json.load(f)
        else:
            self.create_sample_documents()
    
    def create_sample_documents(self):
        """Create sample documents for internship guidance"""
        sample_docs = [
            "How to build a strong resume: Include your skills, projects, and achievements. Use action verbs like 'developed', 'implemented', 'designed'. Keep it to one page.",
            "MERN Stack skills required: MongoDB for database, Express for backend, React for frontend, Node.js for runtime. Practice by building full-stack projects.",
            "Interview preparation tips: Research the company, practice coding problems, prepare behavioral answers using STAR method, dress professionally.",
            "Tier-2 and Tier-3 college students can compete with IIT students by: Building strong projects, contributing to open source, learning in-demand skills.",
            "Resume screening: Companies use ATS (Applicant Tracking System). Use keywords from job description, avoid fancy formatting, include measurable achievements.",
            "JavaScript ES6 features: Arrow functions, destructuring, spread operator, promises, async/await. Essential for Node and React development.",
            "Database design: Normalize your MongoDB schema, use indexes for performance, plan for scalability from day one.",
            "Internship interview questions: Tell me about yourself, why this company, your biggest project, how you handle failures, what you learned from internships."
        ]
        
        self.documents = sample_docs
        embeddings = self.embeddings_model.encode(sample_docs)
        embeddings = np.array(embeddings).astype('float32')
        
        self.index = faiss.IndexFlatL2(embeddings.shape[1])
        self.index.add(embeddings)
        
        os.makedirs("./data", exist_ok=True)
        faiss.write_index(self.index, FAISS_INDEX_PATH)
        with open("./data/documents.json", "w") as f:
            json.dump(sample_docs, f)
    
    def retrieve_relevant_docs(self, query: str, k: int = TOP_K_RESULTS) -> List[str]:
        """Retrieve top-k relevant documents using FAISS"""
        query_embedding = self.embeddings_model.encode([query])
        query_embedding = np.array(query_embedding).astype('float32')
        
        distances, indices = self.index.search(query_embedding, k)
        
        relevant_docs = [self.documents[i] for i in indices[0]]
        return relevant_docs
    
    def generate_response(self, query: str, user_profile: Dict = None) -> str:
        """Generate response using RAG + Ollama"""
        relevant_docs = self.retrieve_relevant_docs(query)
        context = "\n".join([f"- {doc}" for doc in relevant_docs])
        
        system_prompt = """You are a career assistant for Tier-2 & Tier-3 college students. 
        Give actionable advice for resume, projects, interview prep, and internship applications.
        Be encouraging and provide specific examples."""
        
        user_context = f"User Profile: {json.dumps(user_profile)}\n\n" if user_profile else ""
        
        full_prompt = f"""Context from knowledge base:
{context}

{user_context}Question: {query}

Answer:"""
        
        response = ollama.generate(
            model=OLLAMA_MODEL,
            prompt=full_prompt,
            system=system_prompt,
            stream=False
        )
        
        return response['response'].strip()
    
    def ask(self, question: str, user_profile: Dict = None) -> Dict:
        """Main chatbot interface"""
        answer = self.generate_response(question, user_profile)
        return {
            "question": question,
            "answer": answer,
            "sources": self.retrieve_relevant_docs(question)
        }

# Initialize chatbot
chatbot = RAGChatbot()