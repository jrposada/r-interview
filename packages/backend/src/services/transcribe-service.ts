import { RevAiApiClient, RevAiApiJob } from 'revai-node-sdk';

export const VALID_MIMETYPES = ['audio/wav'];

export class TranscribeService {
  readonly #revAiClient;

  constructor() {
    this.#revAiClient = new RevAiApiClient({
      token: process.env.REV_AI_ACCESS_TOKEN,
    });
  }
  async download(jobId: string): Promise<string> {
    const summary = await this.#revAiClient.getTranscriptText(jobId);
    return summary;
  }
  async submit(file: Express.Multer.File): Promise<RevAiApiJob> {
    const job = await this.#revAiClient.submitJobAudioData(
      file.buffer,
      file.filename,
      {
        // TODO: set urls in envs
        callback_url: `https://d3d5-170-253-8-113.ngrok-free.app/api/transcribes/webhook/complete`,
      }
    );

    return job;
  }
}
