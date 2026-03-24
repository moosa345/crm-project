import { useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// ==============================|| INCOME AREA CHART ||============================== //

export default function IncomeAreaChart() {
  const theme = useTheme();

  const series = [
    {
      name: 'Income',
      data: [1200, 1900, 1500, 2400, 2100, 2800, 2600]
    }
  ];

  const options = useMemo(
    () => ({
      chart: {
        type: 'area',
        height: 320,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
        sparkline: {
          enabled: false
        }
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [0, 100]
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: [theme.palette.primary.main],
      grid: {
        borderColor: theme.palette.divider,
        strokeDashArray: 4,
        xaxis: {
          lines: {
            show: false
          }
        }
      },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: Array(7).fill(theme.palette.text.secondary),
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        labels: {
          formatter: (value) => `$${value}`,
          style: {
            colors: [theme.palette.text.secondary],
            fontSize: '12px'
          }
        }
      },
      tooltip: {
        theme: theme.palette.mode,
        y: {
          formatter: (value) => `$${value}`
        }
      },
      markers: {
        size: 4,
        strokeWidth: 2,
        hover: {
          size: 6
        }
      },
      legend: {
        show: false
      }
    }),
    [theme]
  );

  return <ReactApexChart options={options} series={series} type="area" height={320} />;
}