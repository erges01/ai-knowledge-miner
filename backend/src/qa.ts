import './config'; // <-- ADD THIS AT THE VERY TOP
import OpenAI from 'openai';
import { queryTopK } from './vector';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function askQuestion(question: string) {
  const matches = await queryTopK(question, 5);

  // --- FIX IS HERE ---
  const contexts = matches
    .filter((m) => m.metadata) // 1. Filter out any matches that have undefined metadata
    .map((m) => {
      // 2. We removed your explicit type: (m: { metadata: ... })
      //    Now that we've filtered, TypeScript knows m.metadata exists.
      //    We use 'as' to tell it the *shape* of that metadata.
      const metadata = m.metadata as { filePath: string; text?: string };
      return `FILE: ${metadata.filePath}\n---\n${metadata.text ?? ''}`;
    });
  // --- END OF FIX ---

  const prompt = `
You are an AI assistant for a codebase.
Answer the following question using ONLY the context below.
Context:
${contexts.join('\n\n---\n')}
Question: ${question}
Provide file paths and code snippets in your answer.
If the answer is not in context, say "I don't know."
`;

  const resp = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 800,
  });

  return resp.choices?.[0]?.message?.content ?? 'No answer';
}