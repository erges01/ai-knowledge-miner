import './config';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const INDEX = process.env.PINECONE_INDEX || 'ai-knowledge-index';

export async function embed(text: string) {
  const resp = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return resp.data[0].embedding;
}

export async function embedAndUpsert({
  id,
  text,
  metadata,
}: {
  id: string;
  text: string;
  metadata: any;
}) {
  const vector = await embed(text);
  const index = pinecone.index(INDEX);

  // --- FIX IS HERE ---
  // The upsert method takes the array of records directly.
  // We removed the surrounding '{ vectors: [ ... ] }' object.
  await index.upsert([
    {
      id,
      values: vector,
      metadata,
    },
  ]);
  // --- END OF FIX ---
}

export async function queryTopK(queryText: string, topK = 4) {
  const qvec = await embed(queryText);
  const index = pinecone.index(INDEX);
  const res = await index.query({
    vector: qvec,
    topK,
    includeMetadata: true,
    includeValues: false,
  });
  return res.matches ?? [];
}