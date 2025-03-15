import { Router } from 'express';
import { generateTranscribe } from './transcribe/generate/generate-transcribe.ts';

const router = Router();

generateTranscribe(router);

export { router };
