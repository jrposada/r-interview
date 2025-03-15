import { RevAiApiClient, RevAiApiJob } from 'revai-node-sdk';

export const VALID_MIMETYPES = ['audio/wav'];

export class TranscribeService {
  readonly #revAiClient;

  constructor() {
    this.#revAiClient = new RevAiApiClient({
      token: process.env.REV_AI_ACCESS_TOKEN,
    });
  }
  async download(): Promise<undefined> {}
  async submit(file: Express.Multer.File): Promise<RevAiApiJob> {
    const job = await this.#revAiClient.submitJobAudioData(
      file.buffer,
      file.filename
    );

    console.log(job);
    return job;
  }
}
