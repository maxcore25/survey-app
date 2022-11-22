import React, { useEffect, useState } from 'react';
import AppLayout from '../../components/layouts/AppLayout';
import SurveyLayout from '../../components/layouts/SurveyLayout';

export default function Survey() {
  useEffect(() => {
    console.log('Component did mount');
  }, []);

  return (
    <AppLayout>
      <SurveyLayout />
    </AppLayout>
  );
}
