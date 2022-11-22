import { Box, Stack } from '@mui/system';
import React from 'react';
import TabButton from '../../elements/buttons/TabButton';

export default function SurveysLayout() {
  return (
    <Stack sx={{ gap: '32px', m: '0 auto' }}>
      <Stack direction='row' sx={{ gap: '32px', m: '0 auto' }}>
        <TabButton>Все голосования</TabButton>
        <TabButton>Открытые</TabButton>
        <TabButton>Завершенные</TabButton>
      </Stack>
    </Stack>
  );
}
