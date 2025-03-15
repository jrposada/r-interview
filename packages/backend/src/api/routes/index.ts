import { Router } from 'express';
import { downloadTranscribes } from './transcribes/submit/download-transcribes.ts';
import { hookTranscribesComplete } from './transcribes/submit/hook-transcribes-complete.ts';
import { submitTranscribes } from './transcribes/submit/submit-transcribes.ts';

const router = Router();

downloadTranscribes(router);
hookTranscribesComplete(router);
submitTranscribes(router);

export { router };
