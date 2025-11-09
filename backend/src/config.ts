// backend/src/config.ts

import dotenv from 'dotenv';
import path from 'path';

// This finds the .env file in your main 'ai-knowledge-miner' root folder
dotenv.config({ path: path.resolve(__dirname, '../../.env') });