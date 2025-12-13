import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const columns = [
  { field: 'university', headerName: 'University Name', width: 150 },
  { field: 'programs', headerName: 'Program(s)', width: 150 },
  { field: 'currentStatus', headerName: 'Current Status', width: 150 },
  { field: 'issues', headerName: 'Issues', width: 160 },
  { field: 'proposedAction', headerName: 'Proposed Action', width: 160 },
  { field: 'responsiblePerson', headerName: 'Responsible Person', width: 180 },
  { field: 'deadline', headerName: 'Timeline / Deadline', width: 160 },
  { field: 'keyUpdates', headerName: 'Key Update', width: 160 },
  { field: 'status', headerName: 'Status', width: 120 },
];

const UniversityList = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/programs")
      .then(res => res.json())
      .then(json => {
        console.log("API Response:", json);

        const mappedRows = json.data.map(item => ({
          id: item._id, // REQUIRED
          university: item.university,
          programs: item.programs,
          currentStatus: item.currentStatus,
          issues: item.issues,
          proposedAction: item.proposedAction,
          responsiblePerson: item.responsiblePerson,
          deadline: item.deadline
            ? new Date(item.deadline).toLocaleDateString()
            : '',
          keyUpdates: item.keyUpdates,
          status: item.status
        }));

        setRows(mappedRows);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Box>
  );
};

export default UniversityList;
