import React, { useEffect, useState } from 'react';
import AppLayout from '../../components/layouts/AppLayout';

export default function Panel() {
  useEffect(() => {
    console.log('Component did mount');
  }, []);

  return <AppLayout>Panel</AppLayout>;
}
