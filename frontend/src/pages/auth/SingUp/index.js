import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MireaLogo from '../../../components/elements/icons/MireaLogo';
import Container from '@mui/material/Container';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';


export default function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { state } = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login(data.get('email'), data.get('password')).then(() => {
      navigate(state?.path || '/student');
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <MireaLogo />
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Почта"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Вход
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/register'>Регистрация</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}