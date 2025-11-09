#!/usr/bin/env node
import axios from 'axios';
import dotenv from 'dotenv';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

dotenv.config();
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

const argv = yargs(hideBin(process.argv))
  .command(
    'scan <path>',
    'Scan a folder and create embeddings',
    (yargs) => {
      yargs.positional('path', {
        describe: 'Path to folder/repo to scan',
        type: 'string'
      });
    },
    async (args) => {
      try {
        console.log(`Scanning folder: ${args.path} ...`);
        const res = await axios.post(`${BACKEND_URL}/scan`, { path: args.path });
        console.log('✅ Done:', res.data);
      } catch (err: any) {
        console.error('❌ Error scanning folder:', err.message);
      }
    }
  )
  .command(
    'ask <question>',
    'Ask a question about the scanned repo',
    (yargs) => {
      yargs.positional('question', {
        describe: 'Question to ask',
        type: 'string'
      });
    },
    async (args) => {
      try {
        console.log(`Asking: ${args.question} ...`);
        const res = await axios.get(`${BACKEND_URL}/ask`, {
          params: { q: args.question }
        });
        console.log('🧠 Answer:\n', res.data.answer);
      } catch (err: any) {
        console.error('❌ Error asking question:', err.message);
      }
    }
  )
  .demandCommand()
  .help()
  .argv;
