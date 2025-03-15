import { Box, Container, Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { t } from 'i18next';
import { FunctionComponent } from 'react';

const Index: FunctionComponent = () => {
  return (
    <Container>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        my={2}
      >
        <Typography variant="h4">{t('dashboard.title')}</Typography>
      </Box>
    </Container>
  );
};

export const Route = createFileRoute('/')({
  beforeLoad: ({}) => {
    // Auth redirect logic here.
  },
  component: Index,
});
