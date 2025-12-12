import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import {
    DataGridPro,
} from '@mui/x-data-grid-pro';

const columns = [
    {
        field: 'universityname',
        headerName: 'University Name',
        width: 150,
        editable: true,
    },
    {
        field: 'programs',
        headerName: 'Program(s)',
        width: 150,
        editable: true,
    },
    {
        field: 'currentstatus',
        headerName: 'Current Status',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'issues',
        headerName: 'Issues',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,

    },
    {
        field: 'newChallenges',
        headerName: 'New Challenges',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,

    },
    {
        field: 'prposedAction',
        headerName: 'Proposed Action',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,

    },
    {
        field: 'responsibleperson',
        headerName: 'Responsible Person',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,

    },
    {
        field: 'Timeline',
        headerName: 'Timeline/Deadline',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,

    },
    {
        field: 'keyupdates',
        headerName: 'Key Update',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,

    },
    {
        field: 'status',
        headerName: 'Status',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,

    },
    {
        field: 'action',
        headerName: 'Action',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,

    }
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },

];

// api 
// ​/api​/v1​/Users


const UniversityList = () => {

    const [date, setData] = useState([]);

    useEffect(() => {
        fetch("https://api.mydummyapi.com/users")
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error("Error:", error));
    }, [])



    return (
        <>

            <Box sx={{ height: 400, width: '100%' }}>
                <DataGridPro
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pinnedColumns: { left: ['universityname'], right: ['action'] },
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </>
    );
}



export default UniversityList
