import { Request, Router } from 'express';
import assert from 'node:assert';
import { ApiError } from '../../../helpers/api-error.ts';
import { apiHandler } from '../../../helpers/api-handler.ts';

function validate(
  _query: Request['query'],
  data: { job: unknown },
  params: Request['params']
): { query: undefined; data: { job: unknown }; params: Request['params'] } {
  if (!data) {
    throw new ApiError(400, 'No data');
  }

  return { data, query: undefined, params };
}

async function handler(
  request: Request,
  _query: undefined,
  data: { job: unknown },
  _params: Request['params']
) {
  assert(request.io, 'Expected IO to be defined.');

  console.log(data);
  request.io.emit('transcription-complete', data.job);

  return { status: 200, data };
}

export function hookTranscribesComplete(router: Router) {
  /**
   * @swagger
   * /transcribes/submit:
   *  post:
   *      description: Transcribe an audio file to `.txt`.
   *      responses:
   *          200:
   *              description:
   */
  router.post('/transcribes/webhook/complete', apiHandler(handler, validate));
}
