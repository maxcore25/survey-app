import { Stack } from '@mui/material';
import React from 'react';
import RecordBookTable from '../../elements/tables/RecordBookTable';
import AllRecordBooksTable from '../../elements/tables/AllRecordBooksTable';

export default function PanelLayout() {
  return (
    <Stack sx={{ gap: '32px', m: '64px auto', maxWidth: 'var(--max-width)' }}>
      <RecordBookTable />
      <AllRecordBooksTable />
    </Stack>
  );
}
