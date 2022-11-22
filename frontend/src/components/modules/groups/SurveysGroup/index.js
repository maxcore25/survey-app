import { Stack } from '@mui/system';
import React from 'react';
import SurveyCard from '../../../elements/cards/SurveyCard';

export default function SurveysGroup() {
  return (
    <Stack
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
      }}>
      <SurveyCard />
      <SurveyCard />
    </Stack>
  );
}
