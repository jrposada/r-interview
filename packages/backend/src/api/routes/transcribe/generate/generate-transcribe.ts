import { Request, Router } from 'express';
import { TranscribeService } from '../../../../services/transcribe-service.ts';
import { apiHandler } from '../../../helpers/api-handler.ts';

function validate(
  _query: Request['query'],
  _data: undefined
): { query: undefined; data: undefined } {
  return { query: undefined, data: undefined };
}

async function handler(_query: undefined, _data: undefined) {
  const service = new TranscribeService();
  // await service.initialize();

  const report = await service.generate();

  return { status: 200, data: report };
}

export function generateTranscribe(router: Router) {
  /**
   * @swagger
   * /transcribe/generate:
   *  post:
   *      description: Transcribe an audio file to `.txt`.
   *      responses:
   *          200:
   *              description: `.txt` binary
   */
  router.post('/transcribe/generate', apiHandler(handler, validate));
}
