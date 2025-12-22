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
import { Box } from '@mui/material';
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";

const UniversityOperations = () => {
  const [tab, setTab] = useState("overview");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [overviewData, setOverviewData] = useState(null);

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
                          data: overviewData
                            ? [
                              {
                                id: 0,
                                value: overviewData.counts.atRisk,
                                label: 'At Risk',
                                color: '#fb8c00',
                              },
                              {
                                id: 1,
                                value: overviewData.counts.onTrack,
                                label: 'On Track',
                                color: '#2979ff',
                              },
                              {
                                id: 2,
                                value: overviewData.counts.delayed,
                                label: 'Delayed',
                                color: '#e53935',
                              },
                              {
                                id: 3,
                                value: overviewData.counts.completed,
                                label: 'Completed',
                                color: '#2ecc71',
                              },
                            ]
                            : [],
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
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          backgroundColor: "#f5f6f8",
                          borderRadius: 3,
                          padding: "6px 12px",
                        }}
                      >

                        <AccountBalanceOutlinedIcon
                          sx={{ color: "#6b7280", fontSize: 22 }}
                        />

                        <UniversitySelector
                          value={selectedUniversity}
                          onChange={(e) => setSelectedUniversity(e.target.value)}
                        />
                      </Box>

                      {overviewData && (
                        <>
                          <StatusCard
                            status="Completed"
                            count={overviewData.counts.completed}
                            percentage={overviewData.percentages.completed}
                            color="#2ecc71"
                          />

                          <StatusCard
                            status="On Track"
                            count={overviewData.counts.onTrack}
                            percentage={overviewData.percentages.onTrack}
                            color="#2979ff"
                          />

                          <StatusCard
                            status="Delayed"
                            count={overviewData.counts.delayed}
                            percentage={overviewData.percentages.delayed}
                            color="#e53935"
                          />

                          <StatusCard
                            status="At Risk"
                            count={overviewData.counts.atRisk}
                            percentage={overviewData.percentages.atRisk}
                            color="#fb8c00"
                          />
                        </>
                      )}

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
