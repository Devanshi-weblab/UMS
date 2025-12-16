import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Typography
} from '@mui/material';

const DeleteSingle = ({ open, data, onClose, onSuccess }) => {
const handleDelete = async () => {
  try {
    await fetch(`http://localhost:5000/api/programs/${data._id}`, {
      method: "DELETE",
    });

    onSuccess();  
    onClose();   
  } catch (error) {
    console.error(error);
  }
};


  if (!data) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Confirmation</DialogTitle>

      <Typography sx={{ px: 3 }}>
        Are you sure you want to delete{" "}
        <strong>{data.programName}</strong>?
      </Typography>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteSingle;
