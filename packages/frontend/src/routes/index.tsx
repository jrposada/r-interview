import { Box, Button, Container, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { createFileRoute } from '@tanstack/react-router';
import { t } from 'i18next';
import {
  ChangeEventHandler,
  FunctionComponent,
  useCallback,
  useState,
} from 'react';
import { useTranscribesSubmit } from '../core/hooks/transcribes/use-transcribes-submit';

const Index: FunctionComponent = () => {
  const [file, setFile] = useState<File | undefined>();
  const {
    data: transcribeJob,
    mutate: sendTranscribesSubmit,
    isPending: isLoadingTranscribesSubmit,
  } = useTranscribesSubmit();

  const handleFileChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const fileList = event.target.files;
      if (!fileList) {
        setFile(undefined);
        return;
      }

      const file = fileList![0];
      if (!file) {
        setFile(undefined);
        return;
      }

      setFile(file);
      sendTranscribesSubmit({ file });
    },
    []
  );
  return (
    <Container>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        my={2}
      >
        <Typography variant="h4">{t('title')}</Typography>
      </Box>

      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUpload />}
        loading={isLoadingTranscribesSubmit}
      >
        {t('Select File')}
        <input type="file" hidden onChange={handleFileChange} />
      </Button>

      {!!transcribeJob && JSON.stringify(transcribeJob)}
      {!!file && <Typography>{file.name}</Typography>}
    </Container>
  );
};

export const Route = createFileRoute('/')({
  beforeLoad: ({}) => {
    // Auth redirect logic here.
  },
  component: Index,
});
