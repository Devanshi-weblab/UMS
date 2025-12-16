import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  Box,
  IconButton,
} from '@mui/material';
import CreateUniversityList from './CreateUniversityList';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteSingle from './DeleteSingle';

const stickyLeftHeader = {
  position: 'sticky',
  left: 0,
  zIndex: 5,
  backgroundColor: '#f9fafb',
  borderRight: '1px solid #e0e0e0',
};

const stickyLeftCell = {
  position: 'sticky',
  left: 0,
  zIndex: 3,
  backgroundColor: '#fff',
  borderRight: '1px solid #e0e0e0',
};

const stickyRightHeader = {
  position: 'sticky',
  right: 0,
  zIndex: 5,
  backgroundColor: '#f9fafb',
  borderLeft: '1px solid #e0e0e0',
};

const stickyRightCell = {
  position: 'sticky',
  right: 0,
  zIndex: 3,
  backgroundColor: '#fff',
  borderLeft: '1px solid #e0e0e0',
};

const headerStyle = {
  fontWeight: 600,
  whiteSpace: 'nowrap',
};


const UniversityList = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDelete = (row) => {
    setSelectedRow(row);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedRow(null);
  };


  const fetchData = () => {
    fetch("http://localhost:5000/api/programs")
      .then((res) => res.json())
      .then((json) => setData(json.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid size={12} >
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Program
          </Button>
        </Box>

        <CreateUniversityList
          open={open}
          handleClose={handleClose}
          onSuccess={fetchData}
        />
      </Grid>
      <Grid size={12}>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 520,
            overflowX: 'auto',
          }}
        >
          <Table stickyHeader sx={{ minWidth: 1600, tableLayout: 'fixed' }}>

            <TableHead>
              <TableRow>
                <TableCell sx={stickyLeftHeader}>
                  University Name
                </TableCell>

                <TableCell sx={headerStyle}>Program(s)</TableCell>
                <TableCell sx={headerStyle}>Current Status</TableCell>
                <TableCell sx={headerStyle}>Issues / Challenges</TableCell>
                <TableCell sx={headerStyle}>Proposed Action</TableCell>
                <TableCell sx={headerStyle}>Responsible Person</TableCell>
                <TableCell sx={headerStyle}>Timeline / Deadline</TableCell>
                <TableCell sx={headerStyle}>Key Update</TableCell>
                <TableCell sx={headerStyle}>Status</TableCell>

                <TableCell sx={stickyRightHeader}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row) => (
                <TableRow key={row._id} hover>

                  {/* Sticky Left */}
                  <TableCell sx={stickyLeftCell}>
                    {row.university}
                  </TableCell>

                  <TableCell>{row.programs}</TableCell>

                  <TableCell sx={{ whiteSpace: 'normal' }}>
                    {row.currentStatus}
                  </TableCell>

                  <TableCell sx={{ whiteSpace: 'normal' }}>
                    {row.issues}
                  </TableCell>

                  <TableCell sx={{ whiteSpace: 'normal' }}>
                    {row.proposedAction}
                  </TableCell>

                  <TableCell>
                    {row.responsiblePerson}
                  </TableCell>

                  <TableCell>
                    {row.deadline
                      ? new Date(row.deadline).toLocaleDateString()
                      : ''}
                  </TableCell>

                  <TableCell sx={{ whiteSpace: 'normal' }}>
                    {row.keyUpdates}
                  </TableCell>

                  <TableCell>
                    {row.status}
                  </TableCell>

                  {/* Sticky Right */}
                  <TableCell sx={stickyRightCell}>
                    <IconButton size="small" aria-label="edit">
                      <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      size="small"
                      aria-label="delete"
                      color="error"
                      onClick={() => handleOpenDelete(row)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <DeleteSingle
                      open={openDelete}
                      data={selectedRow}
                      onClose={handleCloseDelete}
                      onSuccess={fetchData}
                    />
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid >
    </Grid>
  );
};

export default UniversityList;
