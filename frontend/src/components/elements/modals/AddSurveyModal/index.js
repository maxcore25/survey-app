import { Stack } from '@mui/system';
import React, { useState } from 'react';
import BaseModal from '../BaseModal';
import { styled } from '@mui/material/styles';
import { TextField, Typography } from '@mui/material';
import AppButton from '../../buttons/AppButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Title = styled(Typography)({
  fontFamily: 'inherit',
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '22px',
  color: '#000',
});

export default function AddSurveyModal({ open, onClose }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [shortName, setShortName] = useState('');
  const [answers, setAnswers] = useState([{ name: '' }]);

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
    console.log({
      name,
      description,
      shortName,
      answers,
    });

    setName('');
    setDescription('');
    setShortName('');
    setAnswers([{ name: '' }]);

    onClose();
  };

  return (
    <BaseModal open={open} onClose={onClose}>
      <Stack component='form' onSubmit={handleSubmit} sx={{ gap: '24px' }}>
        <Stack sx={{ gap: '10px' }}>
          <Title>Название</Title>
          <TextField
            variant='outlined'
            value={name}
            onChange={handleChangeName}
            sx={{
              '& input': {
                fontFamily: 'var(--primary-font)',
              },
            }}
          />
        </Stack>
        <Stack sx={{ gap: '10px' }}>
          <Title>Описание</Title>
          <TextField
            variant='outlined'
            value={description}
            onChange={handleChangeDescription}
            multiline
            rows={7}
            sx={{
              '& textarea': {
                fontFamily: 'var(--primary-font)',
              },
            }}
          />
        </Stack>
        <Stack sx={{ gap: '10px' }}>
          <Title>Краткое название</Title>
          <TextField
            variant='outlined'
            value={shortName}
            onChange={handleChangeShortName}
            sx={{
              '& input': {
                fontFamily: 'var(--primary-font)',
              },
            }}
          />
        </Stack>
        <Stack sx={{ gap: '10px' }}>
          <Title>Варианты ответов</Title>
          <Stack sx={{ gap: '20px' }}>
            {answers.map(answer => (
              <AnswerInput key={answer.name} value={answer.name} />
            ))}
          </Stack>
          <Stack direction='row' justifyContent='center'>
            <AppButton
              startIcon={<AddCircleOutlineIcon />}
              sx={{
                mt: 2,
                width: '120px',
                height: '40px',

                '& .MuiButton-startIcon': {
                  margin: 0,
                },
              }}
            />
          </Stack>
        </Stack>
        <AppButton
          type='submit'
          sx={{ width: '172px', p: 1.5, alignSelf: 'center', mt: 4 }}>
          Создать
        </AppButton>
      </Stack>
    </BaseModal>
  );
}

function AnswerInput({ ...props }) {
  const [name, setName] = useState('');

  const handleChange = e => {
    setName(e.target.name);
  };

  return (
    <TextField
      value={name}
      onChange={handleChange}
      placeholder='Вариант ответа'
      variant='outlined'
      sx={{
        '& input': {
          fontFamily: 'var(--primary-font)',
        },
      }}
      {...props}
    />
  );
}
