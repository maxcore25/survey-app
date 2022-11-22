import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { Stack } from '@mui/system';
import MireaNinjaIcon from '../../../components/elements/icons/MireaNinjaIcon';
import { Typography } from '@mui/material';
import AppButton from '../../../components/elements/buttons/AppButton';

export default function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { state } = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = e => {
    setEmail(e.target.value);
  };

  const handleChangePassword = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = event => {
    console.log({ email, password });
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login(data.get('email'), data.get('password')).then(() => {
      navigate(state?.path || '/student');
    });
  };

  return (
    <Box
      component='main'
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
      }}>
      <Box
        sx={{
          p: '80px 50px',
          background: 'var(--color-primary)',
        }}>
        <Stack sx={{ gap: '90px' }}>
          <MireaNinjaIcon />
          <Typography
            component='h1'
            sx={{
              fontWeight: 700,
              fontSize: '55px',
              lineHeight: '60px',
              color: '#fff',
            }}>
            Серверная часть веб-приложения “Опросы”
          </Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <Box>
          <Stack
            direction='row'
            sx={{ gap: '32px', justifyContent: 'center', mb: '32px' }}>
            <Link to='/'>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '24px',
                  lineHeight: '26px',
                  color: 'rgba(37, 34, 44, 0.5)',
                }}>
                Вход
              </Typography>
            </Link>
            <Link to='/register'>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '24px',
                  lineHeight: '26px',

                  color: '#25222C',
                }}>
                Регистрация
              </Typography>
            </Link>
          </Stack>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ maxWidth: '394px' }}>
            <TextField
              value={email}
              onChange={handleChangeEmail}
              margin='normal'
              required
              fullWidth
              id='email'
              label='Почта'
              name='email'
              autoComplete='email'
              autoFocus
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '12px',
                },
              }}
            />
            <TextField
              value={password}
              onChange={handleChangePassword}
              margin='normal'
              required
              fullWidth
              name='password'
              label='Пароль'
              type='password'
              id='password'
              autoComplete='current-password'
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '12px',
                },
              }}
            />
            <AppButton
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, p: 1.7 }}>
              Зарегистрироваться
            </AppButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
