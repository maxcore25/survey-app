import { Button } from '@mui/material';
import React from 'react';

export default function TabButton({ children, onClick, active, ...props }) {
  return (
    <Button
      variant='outlined'
      onClick={onClick}
      sx={{
        p: '4px 16px',
        fontWeight: 500,
        fontSize: '18px',
        lineHeight: '22px',
        textTransform: 'none',
        color: active ? 'var(--color-50)' : 'var(--color-900)',
        background: active ? 'var(--color-primary)' : 'transparent',
        border: '1px solid var(--color-primary)',
        borderRadius: '16px',

        '&:hover': {
          border: '1px solid var(--color-primary)',
          background: active
            ? 'var(--color-primary-acc2)'
            : 'var(--color-primary-acc1)',
        },
      }}
      {...props}>
      {children}
    </Button>
  );
}
