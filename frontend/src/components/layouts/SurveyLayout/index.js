import {
  Divider,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import AppButton from '../../elements/buttons/AppButton';
import API from '../../../api';

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
});

const StatsNumber = styled(Typography)({
  margin: '0 4px',
  display: 'inline-block',
  color: 'var(--color-primary)',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '22px',
});

const WhiteTitle = styled(Typography)({
  fontFamily: 'inherit',
  fontWeight: 700,
  fontSize: '24px',
  lineHeight: '26px',
  color: '#fff',
});

const Text = styled(Typography)({
  fontFamily: 'inherit',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '18px',
});

const GradientBox = styled(Box)({
  display: 'grid',
  placeContent: 'center',
  height: '264px',
  background:
    'linear-gradient(92.83deg, #FFFFFF 0%, #009A96 0.01%, #00699E 100%)',
});

const CustomRadio = styled(Radio)({
  color: 'var(--color-primary) !important',
});

export default function SurveyLayout() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState('');
  const [survey, setSurvey] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSurveyData = async () => {
      const result = await API.get(`/survey/${localStorage.getItem('surveyId')}`, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } });
      setSurvey(result.data);
      setLoading(false);
    };
    getSurveyData();
  }, []);

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const submitSurvey = async () => {
      const answerData = {
        "answer_id": value,
      }
      const result = await API.post(`/survey/vote/${localStorage.getItem('surveyId')}`, answerData, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } });
      if (result.status === 201) {
        navigate("/home");
      }
      
    };
    submitSurvey();
  };

  return (
    !loading && (
      <Stack sx={{ gap: '32px', m: '64px auto', maxWidth: 'var(--max-width)' }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            boxShadow: '0px 4px 20px rgba(83, 83, 83, 0.1)',
            borderRadius: '16px',
            display: 'grid',
            gap: '24px',
          }}>
          <Title>{survey.title}</Title>
          <Stats>
            Проголосовало:
            <StatsNumber component='span'>{survey.voted}</StatsNumber>
            человек
          </Stats>
          <Stack sx={{ gap: '10px' }}>
            <Title>Описание</Title>
            <Text>
              {survey.description}
            </Text>
          </Stack>
          <GradientBox>
            <WhiteTitle>{survey.question}</WhiteTitle>
          </GradientBox>
          <Stack component='form' onSubmit={handleSubmit} sx={{ gap: '24px' }}>
            <Stack>
              <Title sx={{ marginBottom: '10px' }}>Ответ</Title>
              <Divider />
              <FormControl>
                <RadioGroup name='answers' value={value} onChange={handleChange}>
                  {survey.answers.map(answer => (
                    <FormControlLabel
                      value={answer.guid}
                      control={<CustomRadio />}
                      label={answer.title}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Stack>
            <AppButton type='submit' sx={{ width: '200px', margin: '0 auto' }}>
              Отправить
            </AppButton>
          </Stack>
        </Paper>
      </Stack>
    )
  );
}
