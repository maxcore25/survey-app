import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SurveysTable from '../../elements/tables/SurveysTable';
import API from '../../../api';

export default function PanelLayout() {
  const [surveys, setSurveys] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSurveysData = async () => {
      const result = await API.get(`/survey`, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } });
      setSurveys(result.data);
      setLoading(false);
    };
    getSurveysData();
  }, []);

  return (
    !loading && (
      <Stack sx={{ gap: '32px', m: '64px auto', maxWidth: 'var(--max-width)' }}>
        <SurveysTable rows={surveys} />
      </Stack>
    )
  );
}
