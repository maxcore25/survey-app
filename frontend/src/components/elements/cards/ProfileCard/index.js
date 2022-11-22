import { Avatar, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

export default function ProfileCard() {
  return (
    <Paper
      elevation={3}
      sx={{
        p: '16px',
        boxShadow: '0px 4px 20px rgba(83, 83, 83, 0.1)',
        borderRadius: '32px',
      }}>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Avatar
          alt='Иванов Иван Иванович'
          src='https://static.tildacdn.com/tild6264-3065-4233-b632-356161663331/s1200.jpeg'
          sx={{ width: '192px', height: '192px' }}
        />
        <Stack sx={{ gap: '16px' }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '40px',
              lineHeight: '110%',
              color: '#000',
            }}>
            Иванов Иван Иванович
          </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '20px',
              lineHeight: '135%',
              color: '#000',
            }}>
            student@example.com
          </Typography>
        </Stack>
        <Stack sx={{ gap: '16px' }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '130%',
              color: '#000',
            }}>
            ИКБО-01-20
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '130%',
              color: '#000',
            }}>
            3 курс
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
