import { Modal } from '@mui/material';
import React from 'react';

export default function BaseModal({ children, open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      {children}
    </Modal>
  );
}
