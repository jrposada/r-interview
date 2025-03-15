import { Request, Router } from 'express';
import { TranscribeService } from '../../../../services/transcribe-service.ts';
import { apiHandler } from '../../../helpers/api-handler.ts';

type DownloadTranscribesParams = {
  jobId: string;
};

function validate(
  _query: Request['query'],
  _data: undefined,
  params: DownloadTranscribesParams
): { query: undefined; data: undefined; params: DownloadTranscribesParams } {
  return { query: undefined, data: undefined, params };
}

async function handler(
  _query: undefined,
  _data: undefined,
  params: DownloadTranscribesParams
) {
  const service = new TranscribeService();

  const summary = await service.download(params.jobId);

  return { status: 200, data: summary };
}

export function downloadTranscribes(router: Router) {
  /**
   * @swagger
   * /transcribes/download/{jobId}:
   *  post:
   *      description: Transcribe an audio file.
   *      parameters:
   *        - in: path
   *          name: jobId
   *          schema:
   *            type: integer
   *          required: true
   *          description: Numeric ID of the transcript job.
   *      responses:
   *          200:
   *              description: Text string.
   */
  router.post('/transcribes/download/:jobId', apiHandler(handler, validate));
}
