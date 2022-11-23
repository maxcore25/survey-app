import { Stack } from '@mui/material';
import React from 'react';
import SurveysTable from '../../elements/tables/SurveysTable';

export default function PanelLayout() {
  return (
    <Stack sx={{ gap: '32px', m: '64px auto', maxWidth: 'var(--max-width)' }}>
      <SurveysTable />
    </Stack>
  );
}
