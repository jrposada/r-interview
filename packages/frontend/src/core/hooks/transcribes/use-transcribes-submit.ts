import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useSnackbar from '../../../ui/snackbar/use-snackbar';
import { t } from 'i18next';
import { ApiResponse } from '@shared/models/api-response';

type UseTranscribesSubmitParams = {
  onError?: (message: string) => void;
  onSuccess?: () => void;
};

type UseTranscribesSubmitMutationParams = {
  file: File;
};

export function useTranscribesSubmit({
  onError,
  onSuccess,
}: UseTranscribesSubmitParams = {}) {
  const { enqueueAutoHideSnackbar } = useSnackbar();
  const client = useQueryClient();

  // TODO: Response types
  return useMutation<
    { id: string },
    string,
    UseTranscribesSubmitMutationParams,
    unknown
  >({
    mutationFn: async ({ file }) => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post<ApiResponse<{ id: string }>>(
        `${import.meta.env.VITE_API_BASE_URL}/transcribes/submit`,
        formData
      );

      return response.data.data;
    },
    onError: (message) => {
      enqueueAutoHideSnackbar({
        message: t('transcribes.submit.error'),
        variant: 'error',
      });
      onError?.(message);
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['transcribes'],
      });

      enqueueAutoHideSnackbar({
        message: t('transcribes.submit.success'),
        variant: 'success',
      });

      onSuccess?.();
    },
  });
}
