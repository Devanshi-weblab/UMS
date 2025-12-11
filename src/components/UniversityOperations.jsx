import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { PieChart } from '@mui/x-charts/PieChart';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import Grid from '@mui/material/Grid';
import UniversitySelector from './UniversitySelector';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { ToggleButton } from '@mui/material';
import UniversityToggle from './UniversityToggle';
import NavigationBar from './NavigationBar';


const UniversityOperations = () => {
  return (
    <>
      <Grid container spacing={4}>

        <Grid size={12} display="flex" justifyContent="flex-start">
          <NavigationBar />
        </Grid>
        <Grid size={12} display="flex" justifyContent="flex-start">
          <UniversityToggle />
        </Grid>

        <Grid size={12}>
          <Card sx={{ maxWidth: 1000 }}>
            <CardContent>

              <Grid container spacing={2}>

                <Grid size={8}>
                  <Typography gutterBottom variant="h5" component="div">
                    University Status Overview
                  </Typography>
                  <PieChart

                    series={[
                      {
                        data: [
                          { id: 0, value: 10, label: 'At Risk', color: '#ff9933' },
                          { id: 1, value: 15, label: 'On Track', color: '#4da6ff' },
                          { id: 2, value: 20, label: 'Delayed', color: '#ff3333' },
                          { id: 3, value: 12, label: 'Completed', color: '#33ff99' },
                        ],
                        innerRadius: 10,
                        outerRadius: 100,
                        paddingAngle: 3,
                        cornerRadius: 3,

                      },
                    ]}
                    width={500}
                    height={400}
                    slotProps={{
                      legend: {
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        direction: 'row',
                        padding: 10,
                      },
                    }}
                  />
                </Grid>
                <Grid size={4}>
                  <Stack spacing={2} direction="column">
                    <UniversitySelector />
                    <Button variant="outlined">Completed</Button>
                    <Button variant="outlined">On Track</Button>
                    <Button variant="outlined">Delayed</Button>
                    <Button variant="outlined">At Risk</Button>
                  </Stack>

                </Grid>



              </Grid>
            </CardContent>
          </Card>
        </Grid>


      </Grid>
    </>
  );
}

export default UniversityOperations
