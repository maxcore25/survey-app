import { Button } from '@mui/material';
import React from 'react';

export default function TabButton({ children, onClick, active, ...props }) {
  return (
    <Button
      variant='outlined'
      onClick={onClick}
      sx={{
        p: '8px',
        width: '192px',
        fontWeight: 600,
        fontSize: '18px',
        lineHeight: '140%',
        textTransform: 'none',
        color: active ? 'var(--color-50)' : 'var(--color-900)',
        background: active ? 'var(--color-primary)' : 'transparent',
        border: '1px solid #2563EB',
        borderRadius: '16px',

        '&:hover': {
          background: active
            ? 'var(--color-primary-acc1)'
            : 'rgba(37, 99, 235, 0.15)',
        },
      }}
      {...props}>
      {children}
    </Button>
  );
}
