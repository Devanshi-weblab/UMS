import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { PieChart } from '@mui/x-charts/PieChart';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import Grid from '@mui/material/Grid';
import UniversitySelector from './UniversitySelector';
import Stack from '@mui/material/Stack';
import UniversityToggle from './UniversityToggle';
import NavigationBar from './NavigationBar';
import UniversityList from './UniversityList';
import StatusCard from './StatusCards';

const UniversityOperations = () => {
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/programs/overview'
        );
        const data = await response.json();

        setOverviewData(data);
      } catch (error) {
        console.error('Failed to fetch overview data:', error);
      }
    };

    fetchOverview();
  }, []);

  return (
    <>
      <Grid container spacing={4}>

        <Grid size={12} display="flex" justifyContent="flex-start">
          <NavigationBar />
        </Grid>
        <Grid size={12} display="flex" justifyContent="flex-start">
          <UniversityToggle tab={tab} onTabChange={setTab} />
        </Grid>

        <Grid size={12}>
          {tab == 'overview' ? (
            <Card sx={{ maxWidth: 1500 }}>
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
                      height={350}
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
                      <StatusCard status="Completed"
                        count={2}
                        percentage={20}
                        color="#2ecc71" />
                      <StatusCard
                        status="On Track"
                        count={4}
                        percentage={40}
                        color="#2979ff"
                      />

                      <StatusCard
                        status="Delayed"
                        count={2}
                        percentage={20}
                        color="#e53935"
                      />

                      <StatusCard
                        status="At Risk"
                        count={2}
                        percentage={20}
                        color="#fb8c00"
                      />
                    </Stack>
                  </Grid>



                </Grid>
              </CardContent>
            </Card>
          ) : (
            <UniversityList />
          )}
        </Grid>


      </Grid >
    </>
  );
}

export default UniversityOperations
