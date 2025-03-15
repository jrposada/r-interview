import { CloudUpload, Download } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { t } from 'i18next';
import {
  ChangeEventHandler,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranscribesDownload } from '../core/hooks/transcribes/use-transcribes-download';
import { useTranscribesSubmit } from '../core/hooks/transcribes/use-transcribes-submit';
import { saveAs } from '../core/utils/file-saver';
import { useSocket } from '../core/hooks/socket/use-socket';

const Index: FunctionComponent = () => {
  const [file, setFile] = useState<File | undefined>();
  const [transcribeJob, setTranscribeJob] = useState<
    { id: string } | undefined
  >(undefined);
  const socket = useSocket();

  const { mutate: sendTranscribesSubmit, status: transcribesSubmitStatus } =
    useTranscribesSubmit();
  const { mutate: sendTranscribesDownload, status: transcribesDownloadStatus } =
    useTranscribesDownload({
      onSuccess: (data) => {
        saveAs(data, 'transcript.txt');
      },
    });

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

  const handleDownloadTranscript = useCallback(() => {
    if (!transcribeJob) {
      return;
    }

    sendTranscribesDownload({ id: transcribeJob.id });
  }, [transcribeJob]);

  // Transcription complete event.
  useEffect(() => {
    const eventName = 'transcription-complete';

    socket.on(eventName, (job: { id: string }) => {
      setTranscribeJob({ id: job.id });
    });

    return () => {
      socket.off(eventName);
    };
  }, [socket]);

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
        loading={transcribesSubmitStatus === 'pending'}
      >
        {t('upload')}
        <input type="file" hidden onChange={handleFileChange} />
      </Button>

      <Button
        variant="contained"
        tabIndex={-1}
        startIcon={<Download />}
        onClick={handleDownloadTranscript}
        disabled={!transcribeJob}
        loading={transcribesDownloadStatus === 'pending'}
      >
        {t('download')}
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
