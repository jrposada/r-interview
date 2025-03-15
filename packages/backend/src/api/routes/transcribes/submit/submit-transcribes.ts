import { Request, Router } from 'express';
import {
  TranscribeService,
  VALID_MIMETYPES,
} from '../../../../services/transcribe-service.ts';
import { apiHandler } from '../../../helpers/api-handler.ts';
import multer from 'multer';
import { ApiError } from '../../../helpers/api-error.ts';

const upload = multer();

function validate(
  _query: Request['query'],
  data: Express.Multer.File,
  params: Request['params']
): { query: undefined; data: Express.Multer.File; params: Request['params'] } {
  if (!data) {
    throw new ApiError(400, 'No file uploaded');
  }

  if (!VALID_MIMETYPES.includes(data.mimetype)) {
    throw new ApiError(400, `Invalid file format ${data.mimetype}`);
  }

  return { data, query: undefined, params };
}

async function handler(
  _query: undefined,
  data: Express.Multer.File,
  _params: Request['params']
) {
  const service = new TranscribeService();

  const job = await service.submit(data);

  return { status: 200, data: job };
}

export function submitTranscribes(router: Router) {
  /**
   * @swagger
   * /transcribes/submit:
   *  post:
   *      description: Transcribe an audio file to `.txt`.
   *      responses:
   *          200:
   *              description:
   */
  router.post(
    '/transcribes/submit',
    upload.single('file'),
    apiHandler(handler, validate)
  );
}
