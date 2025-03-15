import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useSnackbar from '../../../ui/snackbar/use-snackbar';
import { t } from 'i18next';

type UseTranscribesDownloadParams = {
  onError?: (message: string) => void;
  onSuccess?: () => void;
};

type UseTranscribesDownloadMutationParams = {
  jobId: string;
};

export function useTranscribesDownload({
  onError,
  onSuccess,
}: UseTranscribesDownloadParams = {}) {
  const { enqueueAutoHideSnackbar } = useSnackbar();
  const client = useQueryClient();

  // TODO: Response types
  return useMutation<
    void,
    string,
    UseTranscribesDownloadMutationParams,
    unknown
  >({
    mutationFn: async ({ jobId }) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/transcribes/download/${jobId}`
      );

      return response.data;
    },
    onError: (message) => {
      enqueueAutoHideSnackbar({
        message: t('transcribes.download.error'),
        variant: 'error',
      });
      onError?.(message);
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['transcribes'],
      });

      onSuccess?.();
    },
  });
}
