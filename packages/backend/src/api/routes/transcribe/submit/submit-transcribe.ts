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
  data: Express.Multer.File
): { query: undefined; data: Express.Multer.File } {
  if (!data) {
    throw new ApiError(400, 'No file uploaded');
  }

  if (!VALID_MIMETYPES.includes(data.mimetype)) {
    throw new ApiError(400, `Invalid file format ${data.mimetype}`);
  }

  return { data, query: undefined };
}

async function handler(_query: undefined, data: Express.Multer.File) {
  const service = new TranscribeService();

  const job = await service.submit(data);

  return { status: 200, data: job };
}

export function submitTranscribe(router: Router) {
  /**
   * @swagger
   * /transcribe/submit:
   *  post:
   *      description: Transcribe an audio file to `.txt`.
   *      responses:
   *          200:
   *              description:
   */
  router.post(
    '/transcribe/submit',
    upload.single('file'),
    apiHandler(handler, validate)
  );
}
