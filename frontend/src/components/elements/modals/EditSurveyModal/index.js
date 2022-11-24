import { Stack } from '@mui/system';
import React, { useContext, useState, useEffect } from 'react';
import BaseModal from '../BaseModal';
import { styled } from '@mui/material/styles';
import { Box, TextField, Typography } from '@mui/material';
import AppButton from '../../buttons/AppButton';
import { MainContext } from '../../../../context/MainContextProvider';
import API from '../../../../api';

const Title = styled(Typography)({
  fontFamily: 'inherit',
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '22px',
  color: '#000',
});

const Stats = styled(Typography)({
  fontFamily: 'inherit',
  fontWeight: 500,
  fontSize: '18px',
  lineHeight: '22px',
  color: '#3E3E41',
});

const StatsNumber = styled(Typography)({
  margin: '0 4px',
  display: 'inline-block',
  color: 'var(--color-primary)',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '22px',
});

const GradientBox = styled(Box)({
  display: 'grid',
  placeContent: 'center',
  height: '264px',
  background:
    'linear-gradient(92.83deg, #FFFFFF 0%, #009A96 0.01%, #00699E 100%)',
});

export default function EditSurveyModal({ open, onClose }) {
  const { selectedSurvey } = useContext(MainContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [shortName, setShortName] = useState('');
  const [answers, setAnswers] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    selectedSurvey && setLoading(false);
    selectedSurvey && setName(selectedSurvey.title);
    selectedSurvey && setDescription(selectedSurvey.description);
    selectedSurvey && setShortName(selectedSurvey.question);
    selectedSurvey && setAnswers(selectedSurvey.answers);
  }, [selectedSurvey])

  const handleChangeName = e => {
    setName(e.target.value);
  };

  const handleChangeDescription = e => {
    setDescription(e.target.value);
  };

  const handleChangeShortName = e => {
    setShortName(e.target.value);
  };

  const handleChangeAnswer = e => {
    setAnswers(answers.map((answer, index) => (index === parseInt(e.target.id) ? { ...answer, title: e.target.value } : answer)));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const patchSurvey = async () => {
      console.log(answers)
      const surveyData = {
        "title": name,
        "description": description,
        "question": shortName,
        "answers": answers
      }
      await API.patch(`/survey/${selectedSurvey.guid}`, surveyData, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } });
    };
    patchSurvey();

    onClose();
  };

  return (
    !loading && (
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
          <Stats>
            Проголосовало:
            <StatsNumber component='span'>21030</StatsNumber>
            человек
          </Stats>
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
          <GradientBox>
            <TextField
              variant='outlined'
              value={shortName}
              onChange={handleChangeShortName}
              sx={{
                width: '80vw',
                maxWidth: '800px',

                '& input': {
                  fontFamily: 'var(--primary-font)',
                  fontWeight: 700,
                  fontSize: '24px',
                  lineHeight: '26px',
                  textAlign: 'center',
                  color: '#fff',
                },
                '& fieldset': {
                  borderColor: '#fff',
                },
                '.MuiInputBase-root:hover fieldset': {
                  borderColor: '#fff',
                },
                '.MuiInputBase-root.Mui-focused fieldset': {
                  borderColor: 'var(--color-primary)',
                },
              }}
            />
          </GradientBox>
          <Stack sx={{ gap: '10px' }}>
            <Title>Варианты ответов</Title>
            <Stack sx={{ gap: '20px' }}>
              {answers.map((answer, index) => (
                <AnswerInput key={index} id={index} value={answer.title} onChange={handleChangeAnswer} />
              ))}
            </Stack>
          </Stack>
          <AppButton
            type='submit'
            sx={{ width: '172px', p: 1.5, alignSelf: 'center', mt: 4 }}>
            Сохранить
          </AppButton>
        </Stack>
      </BaseModal>
    )
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
