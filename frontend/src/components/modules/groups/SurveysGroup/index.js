import { Stack } from '@mui/system';
import React from 'react';
import SurveyCard from '../../../elements/cards/SurveyCard';

export default function SurveysGroup({surveys}) {
  return (
    <Stack
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '32px',
      }}>
      {surveys.map(survey => (
        <SurveyCard key={survey.guid} survey={survey} />
      ))}
    </Stack>
  );
}
