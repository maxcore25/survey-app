import { CardMedia, Paper, Typography } from '@mui/material';
import React from 'react';
import AppButton from '../../buttons/AppButton';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/system';

const Theme = styled(Typography)({
  textTransform: 'uppercase',
  fontFamily: 'inherit',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '18px',
  color: '#A6A8B5',
  marginBottom: '16px',
});

const Title = styled(Typography)({
  textTransform: 'uppercase',
  fontFamily: 'inherit',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '16px',
  color: '#2B2B2C',
  marginBottom: '18px',
});

export default function SurveyCard() {
  return (
    <Paper
      elevation={0}
      sx={{ borderRadius: '12px', border: '1px solid #D9DDE0' }}>
      <Theme>ТРАНСПОРТ</Theme>
      <Title>Викторина «Современные автовокзалы Москвы»</Title>
      <CardMedia
        component='img'
        height='160'
        image='https://kipmu.ru/wp-content/uploads/klvrgfg-scaled.jpg'
        alt='survey'
      />
      <Stack direction='row'>
        <AppButton>Голосовать</AppButton>
        <span>+20 баллов</span>
      </Stack>
    </Paper>
  );
}
