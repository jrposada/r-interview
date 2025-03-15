import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useSnackbar from '../../../ui/snackbar/use-snackbar';
import { t } from 'i18next';
import { ApiResponse } from '@shared/models/api-response';

type UseTranscribesDownloadParams = {
  onError?: (message: string) => void;
  onSuccess?: (data: string) => void;
};

type UseTranscribesDownloadMutationParams = {
  id: string;
};

export function useTranscribesDownload({
  onError,
  onSuccess,
}: UseTranscribesDownloadParams = {}) {
  const { enqueueAutoHideSnackbar } = useSnackbar();
  const client = useQueryClient();

  return useMutation<
    string,
    string,
    UseTranscribesDownloadMutationParams,
    unknown
  >({
    mutationFn: async ({ id }) => {
      const response = await axios.post<ApiResponse<string>>(
        `${import.meta.env.VITE_API_BASE_URL}/transcribes/download/${id}`
      );

      return response.data.data;
    },
    onError: (message) => {
      enqueueAutoHideSnackbar({
        message: t('transcribes.download.error'),
        variant: 'error',
      });
      onError?.(message);
    },
    onSuccess: (data) => {
      client.invalidateQueries({
        queryKey: ['transcribes'],
      });

      onSuccess?.(data);
    },
  });
}
