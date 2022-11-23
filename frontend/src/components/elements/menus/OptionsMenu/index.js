import * as React from 'react';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function OptionsMenu({ anchorEl, open, handleClose, onEdit }) {
  return (
    <Menu
      anchorEl={anchorEl}
      id='account-menu'
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: '12px',
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
      <MenuItem onClick={onEdit}>
        <ListItemIcon>
          <EditIcon fontSize='small' />
        </ListItemIcon>
        Редактировать
      </MenuItem>
      <MenuItem onClick={() => console.log('delete')}>
        <ListItemIcon>
          <DeleteIcon fontSize='small' />
        </ListItemIcon>
        Удалить
      </MenuItem>
    </Menu>
  );
}
