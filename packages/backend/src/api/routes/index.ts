import { Router } from 'express';
import { downloadTranscribe } from './transcribe/submit/download-transcribe.ts';
import { submitTranscribe } from './transcribe/submit/submit-transcribe.ts';

const router = Router();

downloadTranscribe(router);
submitTranscribe(router);

export { router };
