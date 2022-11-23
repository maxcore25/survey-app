import React, { useEffect, useState } from 'react';
import AppLayout from '../../components/layouts/AppLayout';
import PanelLayout from '../../components/layouts/PanelLayout';

export default function Panel() {
  useEffect(() => {
    console.log('Component did mount');
  }, []);

  return (
    <AppLayout>
      <PanelLayout />
    </AppLayout>
  );
}
