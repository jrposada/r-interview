import { Request, Response } from 'express';
import { ApiError } from './api-error.ts';
import { ApiResponseData } from './api-response-data.ts';
import { sendError } from './send-error.ts';
import { sendSuccess } from './send-success.ts';

export function apiHandler<
  TQuery,
  TData,
  TParams extends Request['params'],
  TResponseData,
>(
  handler: (
    request: Request,
    // TODO: use object instead of args
    query: TQuery,
    data: TData,
    // TODO: type params
    params: TParams
  ) => Promise<ApiResponseData<TResponseData>> | ApiResponseData<TResponseData>,
  validate: (
    query: Request['query'],
    data: TData,
    params: TParams
  ) => { data: TData; query: TQuery; params: TParams }
) {
  return async function (request: Request, response: Response) {
    const origin = request.get('origin');

    try {
      const { data, query, params } = validate(
        request.query,
        request.file ?? request.body,
        request.params as TParams
      );
      const result = await handler(request, query, data, params);
      sendSuccess(origin, response, result);
    } catch (error) {
      console.log(error);

      if (error instanceof ApiError) {
        sendError(origin, response, error);
        return;
      }

      sendError(origin, response, new ApiError(500, 'Unknown error'));
    }
  };
}
