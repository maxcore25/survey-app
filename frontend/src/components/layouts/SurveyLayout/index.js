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
import React from 'react';
import { styled } from '@mui/material/styles';
import AppButton from '../../elements/buttons/AppButton';

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
  const [value, setValue] = React.useState('female');

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
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
        <Title>Название для новой улицы в Нижегородском районе</Title>
        <Stats>
          Проголосовало:
          <StatsNumber component='span'>21030</StatsNumber>
          человек
        </Stats>
        <Stack sx={{ gap: '10px' }}>
          <Title>Описание</Title>
          <Text>
            В Нижегородском районе ЮВАО предлагается дать название сразу трем
            Проектируемым проездам. Они тянутся друг за другом и пролегают от
            станции Новопролетарской до дома № 28 на Орехово-Зуевском проезде.
            Все три участка планируют объединить в одну улицу. Свои варианты
            наименований для нее могут предложить активные граждане. Так,
            например, эта улица могла бы носить название Пятигорской по своему
            географическому положению. «Пятигорские» наименования возле
            Рязанского проспекта имеют отсылку к Лермонтовскому проспекту,
            являющемуся его продолжением после пересечения с МКАД. Он, в свою
            очередь, направлен в сторону усадьбы Тарханы — это одно из наиболее
            известных лермонтовских мест России.
          </Text>
        </Stack>
        <GradientBox>
          <WhiteTitle>Как назвать эту московскую улицу?</WhiteTitle>
        </GradientBox>
        <Stack component='form' onSubmit={handleSubmit} sx={{ gap: '24px' }}>
          <Stack>
            <Title sx={{ marginBottom: '10px' }}>Ответ</Title>
            <Divider />
            <FormControl>
              <RadioGroup name='answers' value={value} onChange={handleChange}>
                <FormControlLabel
                  value='female'
                  control={<CustomRadio />}
                  label='Female'
                />
                <FormControlLabel
                  value='male'
                  control={<CustomRadio />}
                  label='Male'
                />
              </RadioGroup>
            </FormControl>
          </Stack>
          <AppButton type='submit' sx={{ width: '200px', margin: '0 auto' }}>
            Отправить
          </AppButton>
        </Stack>
      </Paper>
    </Stack>
  );
}
