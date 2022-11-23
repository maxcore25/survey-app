import { Stack } from '@mui/system';
import React, { useState } from 'react';
import BaseModal from '../BaseModal';
import { styled } from '@mui/material/styles';
import { TextField, Typography } from '@mui/material';
import AppButton from '../../elements/buttons/AppButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Title = styled(Typography)({
  fontFamily: 'inherit',
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '22px',
  color: '#000',
});

export default function AddSurveyModal() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [shortName, setShortName] = useState('');

  const handleChangeName = e => {
    setName(e.target.value);
  };

  const handleChangeDescription = e => {
    setDescription(e.target.value);
  };

  const handleChangeShortName = e => {
    setShortName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <BaseModal>
      <Stack component='form' onSubmit={handleSubmit} sx={{ gap: '24px' }}>
        <Stack sx={{ gap: '10px' }}>
          <Title>Название</Title>
          <TextField
            label='Название'
            variant='outlined'
            value={name}
            onChange={handleChangeName}
          />
        </Stack>
        <Stack sx={{ gap: '10px' }}>
          <Title>Описание</Title>
          <TextField
            label='Описание'
            variant='outlined'
            value={description}
            onChange={handleChangeDescription}
            multiline
            rows={7}
          />
        </Stack>
        <Stack sx={{ gap: '10px' }}>
          <Title>Краткое название</Title>
          <TextField
            label='Краткое название'
            variant='outlined'
            value={shortName}
            onChange={handleChangeShortName}
          />
        </Stack>
        <Stack sx={{ gap: '10px' }}>
          <Title>Варианты ответов</Title>
          <TextField label='Вариант ответа #1' variant='outlined' />
          <TextField label='Вариант ответа #2' variant='outlined' />
          <Stack>
            <AppButton startIcon={<AddCircleOutlineIcon />} />
          </Stack>
        </Stack>
        <AppButton>Создать</AppButton>
      </Stack>
    </BaseModal>
  );
}
