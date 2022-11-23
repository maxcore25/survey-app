import { Stack } from '@mui/system';
import React, {useEffect, useState} from 'react';
import TabButton from '../../elements/buttons/TabButton';
import SurveysGroup from '../../modules/groups/SurveysGroup';
import API from '../../../api';

export default function SurveysLayout() {
  const [surveys, setSurveys] = useState([]);
  const [realSurveys, setRealSurveys] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { id: 0, title: 'Все голосования' },
    { id: 1, title: 'Активные' },
    { id: 2, title: 'Завершенные' },
  ]
  useEffect(() => {
    const getSurveysData = async () => {
      const result = await API.get(`/survey`, {headers: {Authorization: `Bearer ${localStorage.getItem('access_token')}`}});
      setSurveys(result.data);
      setRealSurveys(result.data);
    };
    getSurveysData();
  }, [])

  const handleClick = (event) => {
    const index = parseInt(event.target.id)
    setActiveTab(index);
    if (index === 0) {
      const filteredSurveys = surveys.filter(survey => survey.is_active === true || survey.is_active === false);
      setRealSurveys(filteredSurveys);
    }
    else if (index === 1) {
      const filteredSurveys = surveys.filter(survey => survey.is_active === true);
      setRealSurveys(filteredSurveys);
    }
    else if (index === 2) {
      const filteredSurveys = surveys.filter(survey => survey.is_active === false);
      setRealSurveys(filteredSurveys);
    }
  };

  return (
    <Stack sx={{ gap: '32px', m: '64px auto', maxWidth: 'var(--max-width)' }}>
      <Stack direction='row' sx={{ gap: '32px', m: '0 auto' }}>
        {tabs.map((tab, index) => (
          <TabButton key={index} id={index} onClick={handleClick} active={activeTab === index}>{tab.title}</TabButton>
        ))}
      </Stack>
      <SurveysGroup surveys={realSurveys}/>
    </Stack>
  );
}
