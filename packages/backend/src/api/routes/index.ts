import { Router } from 'express';
import { downloadTranscribes } from './transcribes/submit/download-transcribes.ts';
import { submitTranscribes } from './transcribes/submit/submit-transcribes.ts';

const router = Router();

downloadTranscribes(router);
submitTranscribes(router);

export { router };
