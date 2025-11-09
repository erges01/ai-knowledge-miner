---
# 🧠 AI Knowledge Miner  
**A Retrieval-Augmented Generation (RAG) system built with Node.js, TypeScript, OpenAI & Pinecone**

> “Teach your AI to *remember*, *search*, and *reason*.”  

---

## 🚀 Overview  

**AI Knowledge Miner** is a lightweight Retrieval-Augmented Generation (RAG) pipeline.  
It combines **vector search** (Pinecone) with **OpenAI embeddings & generation**, allowing you to ask questions about your own data — with context-aware, memory-backed responses.  

This repo contains two parts:
- 🧩 **Backend** – Handles vector storage, embeddings, and queries.  
- 💻 **CLI** – Command-line interface for ingesting files & asking questions.  

---

## 🧠 What It Does  

1. **Embeds** your documents or text into vectors using OpenAI’s `text-embedding-3-small` model.  
2. **Stores** those vectors in Pinecone (your external vector database).  
3. **Retrieves** the most relevant chunks when you ask a question.  
4. **Augments** GPT with those retrieved contexts for better, factual responses.  

Think of it like:

You → (CLI) → Question → Embed → Retrieve (Pinecone) ↓ Context + GPT → Answer

---

## ⚙️ Tech Stack  

| Tool | Purpose |
|------|----------|
| **Node.js + TypeScript** | Core backend & CLI scripting |
| **OpenAI API** | Embeddings + LLM text generation |
| **Pinecone** | Vector database for semantic search |
| **Yargs** | CLI command parsing |
| **Dotenv** | Secure environment variable management |

---

## 🧩 Folder Structure

ai-knowledge-miner/ │ ├── backend/ │   ├── src/ │   │   ├── vector.ts      # Handles embedding + Pinecone upsert/query │   │   ├── qa.ts          # Handles Q&A logic and prompt composition │   ├── tsconfig.json │   ├── package.json │ ├── cli/ │   ├── src/ │   │   └── index.ts       # CLI entry point (yargs setup) │   ├── tsconfig.json │   ├── package.json │ ├── .env.example           # API keys and config template └── README.md

---

## 🔑 Environment Variables  

Create a `.env` file in both **backend/** and **cli/** with:

OPENAI_API_KEY=your_openai_api_key PINECONE_API_KEY=your_pinecone_api_key PINECONE_ENVIRONMENT=your_pinecone_environment PINECONE_INDEX=ai-knowledge-index

---

## 🧠 Example Commands (CLI)

```bash
# Ingest all text files from a folder
npx ai-miner ingest ./notes

# Ask your data a question
npx ai-miner ask "What are the key ideas in file X?"

# Benchmark or test retrieval
npx ai-miner test


---

💡 How It Works (Simple Terms)

Embedding: turns text into numbers that capture meaning.

Vector DB (Pinecone): stores those number-representations efficiently.

Retrieval: when you ask something, it finds the closest matching meanings.

Generation: OpenAI uses those results to answer intelligently — with context awareness.



---

🧰 Roadmap

[ ] Add local file caching

[ ] Support PDF & Markdown ingestion

[ ] Add chat session memory

[ ] Web dashboard (Next.js)

[ ] Deploy as an API service



---

🧑‍💻 Author

 Adé Sopé 




---

⚡ Inspiration

This project is inspired by how RAG powers systems like ChatGPT Retrieval, Notion Q&A, and GitHub Copilot Chat — bringing memory and reasoning together.


---

🪄 License

MIT © 2025
Use freely, build smarter.

---

