import { Stack } from '@mui/system';
import React, { useContext, useState } from 'react';
import BaseModal from '../BaseModal';
import { styled } from '@mui/material/styles';
import { Box, TextField, Typography } from '@mui/material';
import AppButton from '../../buttons/AppButton';
import { MainContext } from '../../../../context/MainContextProvider';

const testSurvey = {
  name: 'Название для новой улицы в Нижегородском районе',
  description:
    'В Нижегородском районе ЮВАО предлагается дать название сразу трем Проектируемым проездам. Они тянутся друг за другом и пролегают от станции Новопролетарской до дома № 28 на Орехово-Зуевском проезде. Все три участка планируют объединить в одну улицу. Свои варианты наименований для нее могут предложить активные граждане. Так, например, эта улица могла бы носить название Пятигорской по своему географическому положению. «Пятигорские» наименования возле Рязанского проспекта имеют отсылку к Лермонтовскому проспекту, являющемуся его продолжением после пересечения с МКАД. Он, в свою очередь, направлен в сторону усадьбы Тарханы — это одно из наиболее известных лермонтовских мест России.',
  shortName: 'Как назвать эту московскую улицу?',
  answers: [{ name: 'Lorem ipsum dolor sit amet' }, { name: 'qwe' }],
};

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

export default function EditSurveyModal({
  open,
  onClose,
  survey = testSurvey,
}) {
  const { selectedSurvey, setSelectedSurvey } = useContext(MainContext);

  const [name, setName] = useState(survey.name);
  const [description, setDescription] = useState(survey.description);
  const [shortName, setShortName] = useState(survey.shortName);
  const [answers, setAnswers] = useState(survey.answers);

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
            {answers.map(answer => (
              <AnswerInput key={answer.name} value={answer.name} />
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
