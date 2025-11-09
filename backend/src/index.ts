import './config'; // <-- ADD THIS AT THE VERY TOP
import Fastify from 'fastify';
//import dotenv from 'dotenv';
import { scanAndIndex } from './scanner';
import { askQuestion } from './qa';

//dotenv.config();

const server = Fastify({ logger: true });

server.post('/scan', async (req, res) => {
  const body = req.body as { path: string };
  if (!body?.path) return res.status(400).send({ error: 'path required' });
  const result = await scanAndIndex(body.path);
  return res.send(result);
});

server.get('/ask', async (req, res) => {
  const q = (req.query as any).q;
  if (!q) return res.status(400).send({ error: 'q required' });
  const ans = await askQuestion(String(q));
  return res.send({ answer: ans });
});

const start = async () => {
  await server.listen({ port: 4000 });
  console.log('🚀 Backend running on http://localhost:4000');
};
start();
