import React, { useEffect, useState } from 'react';
import AppLayout from '../../components/layouts/AppLayout';
import SurveysLayout from '../../components/layouts/SurveysLayout';

export default function User() {
  const [name, setName] = useState('');

  const years = [
    { label: '2020/2021', value: '2020/2021' },
    { label: '2021/2022', value: '2021/2022' },
    { label: '2022/2023', value: '2022/2023' },
  ];

  const rows = [
    {
      id: 1,
      col1: '30.06.2022',
      col2: 'Шаблоны программных платформ языка Джава Матчин В.Т. (Старший преподаватель, ИиППО)',
      col3: 'Экзамен',
      col4: '4 семестр 2021/2022',
      col5: 'Отлично',
    },
    {
      id: 2,
      col1: '30.06.2022',
      col2: 'Шаблоны программных платформ языка Джава Матчин В.Т. (Старший преподаватель, ИиППО)',
      col3: 'Экзамен',
      col4: '4 семестр 2021/2022',
      col5: 'Отлично',
    },
    {
      id: 3,
      col1: '30.06.2022',
      col2: 'Шаблоны программных платформ языка Джава Матчин В.Т. (Старший преподаватель, ИиППО)',
      col3: 'Экзамен',
      col4: '4 семестр 2021/2022',
      col5: 'Отлично',
    },
    {
      id: 4,
      col1: '30.06.2022',
      col2: 'Шаблоны программных платформ языка Джава Матчин В.Т. (Старший преподаватель, ИиППО)',
      col3: 'Экзамен',
      col4: '4 семестр 2021/2022',
      col5: 'Отлично',
    },
  ];

  const columns = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
    { field: 'col3', headerName: 'Column 3', width: 150 },
    { field: 'col4', headerName: 'Column 4', width: 150 },
    { field: 'col5', headerName: 'Column 5', width: 150 },
  ];

  useEffect(() => {
    console.log('Component did mount');
  }, []);

  return (
    <AppLayout>
      <SurveysLayout />
    </AppLayout>
  );
}
