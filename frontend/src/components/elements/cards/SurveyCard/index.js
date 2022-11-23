import { CardMedia, Paper, Typography } from '@mui/material';
import React from 'react';
import AppButton from '../../buttons/AppButton';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';

const Theme = styled(Typography)({
  textTransform: 'uppercase',
  fontFamily: 'inherit',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '18px',
  color: '#A6A8B5',
});

const Title = styled(Typography)({
  fontFamily: 'inherit',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '16px',
  color: '#2B2B2C',
});

export default function SurveyCard() {
  return (
    <Paper
      elevation={0}
      sx={{ borderRadius: '12px', border: '1px solid #D9DDE0' }}>
      <Stack sx={{ p: 2, marginBottom: '8px', gap: '16px' }}>
        <Theme>ТРАНСПОРТ</Theme>
        <Title>Викторина «Современные автовокзалы Москвы»</Title>
      </Stack>
      <CardMedia
        component='img'
        height='160'
        image='https://kipmu.ru/wp-content/uploads/klvrgfg-scaled.jpg'
        alt='survey'
      />
      <Stack
        direction='row'
        sx={{ p: 2, alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to='/survey/1'>
          <AppButton>Голосовать</AppButton>
        </Link>
        <Typography
          component='span'
          sx={{ color: 'var(--color-primary)', fontFamily: 'inherit' }}>
          +20 баллов
        </Typography>
      </Stack>
    </Paper>
  );
}
