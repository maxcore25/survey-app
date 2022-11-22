import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import AppButton from '../../../elements/buttons/AppButton';

export default function TestInfoGroup() {
  const [student, setStudent] = useState('');
  const [subject, setSubject] = useState('');
  const [type, setType] = useState('');
  const [mark, setMark] = useState('');
  const [semester, setSemester] = useState('');
  const [date, setDate] = useState('');
  const [year, setYear] = useState('');

  const handleChangeStudent = e => {
    setStudent(e.target.value);
  };

  const handleChangeSubject = e => {
    setSubject(e.target.value);
  };

  const handleChangeType = e => {
    setType(e.target.value);
  };

  const handleChangeMark = e => {
    setMark(e.target.value);
  };

  const handleChangeSemester = e => {
    setSemester(e.target.value);
  };

  const handleChangeDate = e => {
    setDate(e.target.value);
  };

  const handleChangeYear = e => {
    setYear(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    setStudent('');
    setSubject('');
    setType('');
    setMark('');
    setSemester('');
    setDate('');
    setYear('');

    console.log({
      student,
      subject,
      type,
      mark,
      semester,
      date,
      year,
    });
  };

  return (
    <Paper
      sx={{
        p: '16px',
        boxShadow: '0px 4px 20px rgba(83, 83, 83, 0.1)',
        borderRadius: '12px',
      }}>
      <form onSubmit={handleSubmit}>
        <Stack sx={{ gap: '32px' }}>
          <Stack
            direction='row'
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
            }}>
            <FormControl fullWidth>
              <InputLabel>Студент</InputLabel>
              <Select
                id='demo-simple-select'
                value={student}
                label='Студент'
                onChange={handleChangeStudent}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Предмет</InputLabel>
              <Select
                id='demo-simple-select'
                value={subject}
                label='Предмет'
                onChange={handleChangeSubject}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Тип экзамена</InputLabel>
              <Select
                id='demo-simple-select'
                value={type}
                label='Тип экзамена'
                onChange={handleChangeType}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Оценка</InputLabel>
              <Select
                id='demo-simple-select'
                value={mark}
                label='Оценка'
                onChange={handleChangeMark}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Семестр</InputLabel>
              <Select
                id='demo-simple-select'
                value={semester}
                label='Семестр'
                onChange={handleChangeSemester}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label='Дата экзамена'
              value={date}
              onChange={handleChangeDate}
            />
            <TextField
              label='Год обучения'
              value={year}
              onChange={handleChangeYear}
            />
          </Stack>
          <AppButton type='submit' sx={{ p: '16px' }}>
            Добавить
          </AppButton>
        </Stack>
      </form>
    </Paper>
  );
}
