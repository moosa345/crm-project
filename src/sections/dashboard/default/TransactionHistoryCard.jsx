import { useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

// ==============================|| TRANSACTION DATA ||============================== //

const filterOptions = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'week',
    label: 'This Week'
  },
  {
    value: 'month',
    label: 'This Month'
  }
];

const transactions = {
  today: [
    {
      id: 1,
      name: 'Payment from Acme Corp',
      date: 'Today, 10:30 AM',
      amount: '+$2,450',
      type: 'credit',
      status: 'Completed',
      emoji: '💰'
    },
    {
      id: 2,
      name: 'Subscription Renewal',
      date: 'Today, 12:15 PM',
      amount: '-$199',
      type: 'debit',
      status: 'Pending',
      emoji: '📄'
    },
    {
      id: 3,
      name: 'Invoice Paid by TechNova',
      date: 'Today, 03:45 PM',
      amount: '+$1,280',
      type: 'credit',
      status: 'Completed',
      emoji: '🏢'
    }
  ],
  week: [
    {
      id: 1,
      name: 'Payment from Acme Corp',
      date: 'Mon, 10:30 AM',
      amount: '+$2,450',
      type: 'credit',
      status: 'Completed',
      emoji: '💰'
    },
    {
      id: 2,
      name: 'Refund to Client',
      date: 'Tue, 01:20 PM',
      amount: '-$450',
      type: 'debit',
      status: 'Failed',
      emoji: '↩️'
    },
    {
      id: 3,
      name: 'Invoice Paid by TechNova',
      date: 'Wed, 03:45 PM',
      amount: '+$1,280',
      type: 'credit',
      status: 'Completed',
      emoji: '🏢'
    },
    {
      id: 4,
      name: 'Cloud Hosting Bill',
      date: 'Thu, 09:10 AM',
      amount: '-$320',
      type: 'debit',
      status: 'Completed',
      emoji: '☁️'
    }
  ],
  month: [
    {
      id: 1,
      name: 'Enterprise Deal Closed',
      date: '02 Mar 2026',
      amount: '+$8,900',
      type: 'credit',
      status: 'Completed',
      emoji: '🚀'
    },
    {
      id: 2,
      name: 'Marketing Campaign',
      date: '08 Mar 2026',
      amount: '-$1,200',
      type: 'debit',
      status: 'Completed',
      emoji: '📣'
    },
    {
      id: 3,
      name: 'Payment from Bright Media',
      date: '15 Mar 2026',
      amount: '+$3,450',
      type: 'credit',
      status: 'Completed',
      emoji: '💳'
    },
    {
      id: 4,
      name: 'Software License',
      date: '20 Mar 2026',
      amount: '-$499',
      type: 'debit',
      status: 'Pending',
      emoji: '🧾'
    }
  ]
};

// ==============================|| STATUS CHIP ||============================== //

function StatusChip({ status }) {
  let color = 'default';

  if (status === 'Completed') color = 'success';
  if (status === 'Pending') color = 'warning';
  if (status === 'Failed') color = 'error';

  return (
    <Chip
      label={status}
      color={color}
      size="small"
      variant="outlined"
      sx={{
        borderRadius: 2,
        fontWeight: 600,
        height: 26
      }}
    />
  );
}

// ==============================|| TRANSACTION HISTORY CARD ||============================== //

export default function TransactionHistoryCard() {
  const [value, setValue] = useState('today');

  return (
    <Box>
      {/* Header */}
      <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Grid>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            💳 Transaction History
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Recent payments, invoices & expenses
          </Typography>
        </Grid>

        <Grid>
          <TextField
            size="small"
            select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{
              minWidth: 120,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
            slotProps={{
              htmlInput: {
                sx: {
                  py: 0.75,
                  fontSize: '0.875rem'
                }
              }
            }}
          >
            {filterOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {/* Transaction List */}
      <Stack spacing={1.5}>
        {transactions[value].map((item, index) => (
          <Box key={item.id}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
              sx={{
                p: 1.5,
                borderRadius: 3,
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'action.hover'
                }
              }}
            >
              {/* Left Section */}
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flex: 1 }}>
                <Avatar
                  sx={{
                    width: 42,
                    height: 42,
                    fontSize: '1.2rem',
                    bgcolor: item.type === 'credit' ? 'success.lighter' : 'warning.lighter'
                  }}
                >
                  {item.emoji}
                </Avatar>

                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.date}
                  </Typography>
                </Box>
              </Stack>

              {/* Right Section */}
              <Stack alignItems="flex-end" spacing={0.75}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    color: item.type === 'credit' ? 'success.main' : 'error.main'
                  }}
                >
                  {item.amount}
                </Typography>
                <StatusChip status={item.status} />
              </Stack>
            </Stack>

            {index !== transactions[value].length - 1 && <Divider sx={{ my: 0.5 }} />}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}