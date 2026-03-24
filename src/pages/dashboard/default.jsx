import { useState } from 'react';

// material-ui
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from 'sections/dashboard/default/MonthlyBarChart';
import ReportAreaChart from 'sections/dashboard/default/ReportAreaChart';
import NearestEventsCard from 'sections/dashboard/default/NearestEventsCard';
import ProjectsCard from 'sections/dashboard/default/ProjectsCard';
import TransactionHistoryCard from 'sections/dashboard/default/TransactionHistoryCard';
import OrdersTable from 'sections/dashboard/default/OrdersTable';
import WorkloadCard from 'sections/dashboard/default/WorkloadCard';
import IncomeAreaChart from 'sections/dashboard/default/IncomeAreaChart';

// assets
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const [orderMenuAnchor, setOrderMenuAnchor] = useState(null);
  const [analyticsMenuAnchor, setAnalyticsMenuAnchor] = useState(null);

  const handleOrderMenuClick = (event) => {
    setOrderMenuAnchor(event.currentTarget);
  };

  const handleOrderMenuClose = () => {
    setOrderMenuAnchor(null);
  };

  const handleAnalyticsMenuClick = (event) => {
    setAnalyticsMenuAnchor(event.currentTarget);
  };

  const handleAnalyticsMenuClose = () => {
    setAnalyticsMenuAnchor(null);
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* Header */}
      <Grid size={12}>
        <Typography variant="h4" sx={{ mb: 0.5 }}>
          CRM Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome back! Here's your business performance overview.
        </Typography>
      </Grid>

      {/* KPI Cards */}
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Total Customers" count="4,250" percentage={12.5} extra="+320 this month" />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Active Leads" count="1,890" percentage={8.4} extra="+145 new leads" />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Total Orders" count="18,800" percentage={4.3} extra="+980 this week" />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Revenue" count="$35,078" percentage={10.2} extra="+$4,200 growth" />
      </Grid>

      {/* Main Left Content */}
      <Grid size={{ xs: 12, lg: 8 }}>
        <Grid container spacing={2.75}>
          {/* Income Overview */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Income Overview
            </Typography>

            <MainCard content={false}>
              <Box sx={{ p: 3, pb: 0 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Box>
                    <Typography variant="h6" color="text.secondary">
                      This Week Statistics
                    </Typography>
                    <Typography variant="h3" sx={{ mt: 0.5 }}>
                      $7,650
                    </Typography>
                  </Box>

                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: 'success.main',
                      bgcolor: 'success.lighter',
                      px: 1.25,
                      py: 0.5,
                      borderRadius: 2,
                      fontWeight: 600
                    }}
                  >
                    +12.5%
                  </Typography>
                </Stack>
              </Box>

              <Box sx={{ px: 1, pb: 1 }}>
                <IncomeAreaChart />
              </Box>
            </MainCard>

            <Box sx={{ mt: 2.75 }}>
              <MonthlyBarChart />
            </Box>
          </Grid>

          {/* Analytics Report */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Grid>
                <Typography variant="h5">Analytics Report</Typography>
              </Grid>
              <Grid>
                <IconButton onClick={handleAnalyticsMenuClick}>
                  <EllipsisOutlined style={{ fontSize: '1.25rem' }} />
                </IconButton>
                <Menu
                  id="analytics-menu"
                  anchorEl={analyticsMenuAnchor}
                  open={Boolean(analyticsMenuAnchor)}
                  onClose={handleAnalyticsMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem onClick={handleAnalyticsMenuClose}>Weekly</MenuItem>
                  <MenuItem onClick={handleAnalyticsMenuClose}>Monthly</MenuItem>
                  <MenuItem onClick={handleAnalyticsMenuClose}>Yearly</MenuItem>
                </Menu>
              </Grid>
            </Grid>

            <MainCard content={false}>
              <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
                <ListItemButton divider>
                  <ListItemText primary="Sales Growth" />
                  <Typography variant="h5">+45.14%</Typography>
                </ListItemButton>

                <ListItemButton divider>
                  <ListItemText primary="Expenses Ratio" />
                  <Typography variant="h5">0.58%</Typography>
                </ListItemButton>

                <ListItemButton>
                  <ListItemText primary="Conversion Rate" />
                  <Typography variant="h5">8.9%</Typography>
                </ListItemButton>
              </List>

              <ReportAreaChart />
            </MainCard>
          </Grid>

          {/* Recent Orders */}
          <Grid size={{ xs: 12 }}>
            <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Grid>
                <Typography variant="h5">Recent Orders</Typography>
              </Grid>
              <Grid>
                <IconButton onClick={handleOrderMenuClick}>
                  <EllipsisOutlined style={{ fontSize: '1.25rem' }} />
                </IconButton>
                <Menu
                  id="orders-menu"
                  anchorEl={orderMenuAnchor}
                  onClose={handleOrderMenuClose}
                  open={Boolean(orderMenuAnchor)}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem onClick={handleOrderMenuClose}>Export as CSV</MenuItem>
                  <MenuItem onClick={handleOrderMenuClose}>Export as Excel</MenuItem>
                  <MenuItem onClick={handleOrderMenuClose}>Print Table</MenuItem>
                </Menu>
              </Grid>
            </Grid>

            <MainCard content={false}>
              <OrdersTable />
            </MainCard>
          </Grid>
        </Grid>
      </Grid>

      {/* Right Sidebar */}
      <Grid size={{ xs: 12, lg: 4 }}>
        <Stack spacing={2.75}>
          <NearestEventsCard />
          <ProjectsCard />
          <WorkloadCard />
        </Stack>
      </Grid>

      {/* Bottom Section */}
      <Grid size={{ xs: 12, md: 7, lg: 8 }}>
        <TransactionHistoryCard />
      </Grid>

      <Grid size={{ xs: 12, md: 5, lg: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Latest Transactions
        </Typography>

        <MainCard content={false}>
          <List
            component="nav"
            sx={{
              px: 0,
              py: 0,
              '& .MuiListItemButton-root': {
                py: 1.5,
                px: 2,
                '& .MuiAvatar-root': avatarSX,
                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
              }
            }}
          >
            <ListItem
              component={ListItemButton}
              divider
              secondaryAction={
                <Stack sx={{ alignItems: 'flex-end' }}>
                  <Typography variant="subtitle1" noWrap>
                    + $1,430
                  </Typography>
                  <Typography variant="h6" color="success.main" noWrap>
                    Completed
                  </Typography>
                </Stack>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ color: 'success.main', bgcolor: 'success.lighter' }}>
                  <GiftOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #002434</Typography>} secondary="Today, 2:00 AM" />
            </ListItem>

            <ListItem
              component={ListItemButton}
              divider
              secondaryAction={
                <Stack sx={{ alignItems: 'flex-end' }}>
                  <Typography variant="subtitle1" noWrap>
                    + $302
                  </Typography>
                  <Typography variant="h6" color="primary.main" noWrap>
                    Paid
                  </Typography>
                </Stack>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}>
                  <MessageOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #984947</Typography>} secondary="5 August, 1:45 PM" />
            </ListItem>

            <ListItem
              component={ListItemButton}
              secondaryAction={
                <Stack sx={{ alignItems: 'flex-end' }}>
                  <Typography variant="subtitle1" noWrap>
                    + $682
                  </Typography>
                  <Typography variant="h6" color="warning.main" noWrap>
                    Pending
                  </Typography>
                </Stack>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ color: 'warning.main', bgcolor: 'warning.lighter' }}>
                  <SettingOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #988784</Typography>} secondary="7 hours ago" />
            </ListItem>
          </List>
        </MainCard>
      </Grid>
    </Grid>
  );
}