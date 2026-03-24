import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import { BarChart } from '@mui/x-charts';

// project imports
import MainCard from 'components/MainCard';
import { withAlpha } from 'utils/colorUtils';

// ==============================|| CRM REVENUE BAR CHART ||============================== //

export default function SalesChart() {
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [seriesVisibility, setSeriesVisibility] = useState({
    Revenue: true,
    Expenses: true
  });

  const [highlightedItem, setHighlightedItem] = useState(null);

  const toggleSeriesVisibility = (seriesLabel) => {
    setSeriesVisibility((prev) => ({ ...prev, [seriesLabel]: !prev[seriesLabel] }));
  };

  const handleHighlight = (seriesId) => {
    if (seriesId) {
      setHighlightedItem({ seriesId });
    } else {
      setHighlightedItem(null);
    }
  };

  const valueFormatter = (value) => `$${value}k`;

  const successColor = theme.vars.palette.success.main;
  const successLight = theme.vars.palette.success.lighter;
  const errorColor = theme.vars.palette.error.main;
  const errorLight = theme.vars.palette.error.lighter;

  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const initialSeries = [
    {
      id: 'Revenue',
      data: [18, 24, 21, 28, 26, 31, 29],
      stack: 'revenue',
      label: 'Revenue',
      color: successColor,
      valueFormatter
    },
    {
      id: 'Revenue2',
      data: [4, 6, 5, 7, 6, 8, 7],
      stack: 'revenue',
      label: 'Revenue',
      color: successLight,
      valueFormatter
    },
    {
      id: 'Expenses',
      data: [10, 14, 12, 16, 15, 18, 13],
      stack: 'expenses',
      label: 'Expenses',
      color: errorColor,
      valueFormatter
    },
    {
      id: 'Expenses2',
      data: [3, 5, 4, 5, 4, 6, 5],
      stack: 'expenses',
      label: 'Expenses',
      color: errorLight,
      valueFormatter
    }
  ];

  const legendSeries = [...initialSeries.slice(0, 1), ...initialSeries.slice(2, 3)];

  return (
    <MainCard sx={{ mt: 1, borderRadius: 4 }} content={false}>
      <Box sx={{ p: 2.5, pb: 0 }}>
        {/* Header */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 2,
            mb: 1
          }}
        >
          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }} color="text.secondary" gutterBottom>
              💰 Weekly Revenue Overview
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              $48.6k
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Chip
                label="📈 +12.4% Growth"
                size="small"
                color="success"
                variant="outlined"
                sx={{ borderRadius: 2, fontWeight: 600 }}
              />
              <Chip
                label="🔥 Strong Week"
                size="small"
                color="warning"
                variant="outlined"
                sx={{ borderRadius: 2, fontWeight: 600 }}
              />
            </Stack>
          </Box>

          {/* Legend */}
          <Stack direction="row" sx={{ gap: 3, flexWrap: 'wrap' }}>
            {legendSeries.map((series) => (
              <Stack
                key={series.label}
                direction="row"
                onClick={() => toggleSeriesVisibility(series.label)}
                onMouseEnter={() => handleHighlight(series.id)}
                onMouseLeave={() => handleHighlight(null)}
                sx={{
                  gap: 1,
                  alignItems: 'center',
                  opacity: seriesVisibility[series.label] ? 1 : 0.45,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  px: 1.2,
                  py: 0.75,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                <Box
                  sx={{
                    height: 10,
                    width: 10,
                    borderRadius: '50%',
                    backgroundColor: series.color
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {series.label}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>

        {/* Chart */}
        <BarChart
          hideLegend
          height={360}
          grid={{ horizontal: true }}
          xAxis={[
            {
              id: 'crm-revenue-x-axis',
              data: labels,
              scaleType: 'band',
              tickSize: 0,
              disableLine: true,
              categoryGapRatio: downSM ? 0.45 : 0.55,
              barGapRatio: downSM ? 0.25 : 0.35
            }
          ]}
          yAxis={[
            {
              disableLine: true,
              tickSize: 0,
              tickMaxStep: 10
            }
          ]}
          series={initialSeries
            .map((series) => ({
              ...series,
              type: 'bar',
              color: withAlpha(series.color, 0.9),
              visible: seriesVisibility[series.label]
            }))
            .filter((series) => series.visible)}
          highlightedItem={highlightedItem}
          slotProps={{
            bar: { rx: 6, ry: 6 },
            tooltip: { trigger: 'item' }
          }}
          axisHighlight={{ x: 'none' }}
          margin={{ top: 20, left: 5, bottom: 20, right: 5 }}
          sx={{
            '& .MuiBarElement-root:hover': {
              opacity: 0.75
            },
            '& .MuiChartsGrid-line': {
              strokeDasharray: '4 4',
              stroke: theme.vars.palette.divider
            },
            '& .MuiChartsAxis-root.MuiChartsAxis-directionX .MuiChartsAxis-tick': {
              stroke: 'transparent'
            },
            '& .MuiChartsAxis-root.MuiChartsAxis-directionY .MuiChartsAxis-tick': {
              stroke: 'transparent'
            },
            '& .MuiChartsAxis-tickLabel': {
              fill: theme.vars.palette.text.secondary,
              fontSize: 12
            }
          }}
        />
      </Box>
    </MainCard>
  );
}