import PropTypes from 'prop-types';

// material-ui
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

// third-party
import { NumericFormat } from 'react-number-format';

// project imports
import Dot from 'components/@extended/Dot';

// ==============================|| TABLE DATA ||============================== //

function createData(id, client, orders, status, revenue, emoji) {
  return { id, client, orders, status, revenue, emoji };
}

const rows = [
  createData('CRM-1001', 'Acme Solutions', 12, 1, 24500, '🏢'),
  createData('CRM-1002', 'Bright Media', 8, 0, 12800, '📣'),
  createData('CRM-1003', 'TechNova Pvt Ltd', 15, 1, 38200, '💻'),
  createData('CRM-1004', 'Urban Retail', 5, 2, 7400, '🛍️'),
  createData('CRM-1005', 'Skyline Ventures', 10, 1, 19600, '🚀'),
  createData('CRM-1006', 'Prime Logistics', 7, 0, 11250, '🚚')
];

// ==============================|| SORT HELPERS ||============================== //

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| HEAD CELLS ||============================== //

const headCells = [
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: '🧾 Deal ID'
  },
  {
    id: 'client',
    align: 'left',
    disablePadding: true,
    label: '👥 Client'
  },
  {
    id: 'orders',
    align: 'right',
    disablePadding: false,
    label: '📦 Orders'
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,
    label: '📍 Status'
  },
  {
    id: 'revenue',
    align: 'right',
    disablePadding: false,
    label: '💰 Revenue'
  }
];

// ==============================|| TABLE HEAD ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow
        sx={{
          '& .MuiTableCell-root': {
            fontWeight: 700,
            fontSize: '0.85rem',
            color: 'text.secondary',
            borderBottom: '1px solid',
            borderColor: 'divider',
            py: 1.75
          }
        }}
      >
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| STATUS CHIP ||============================== //

function OrderStatus({ status }) {
  let color;
  let title;
  let emoji;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      emoji = '⏳';
      break;
    case 1:
      color = 'success';
      title = 'Closed';
      emoji = '✅';
      break;
    case 2:
      color = 'error';
      title = 'Lost';
      emoji = '❌';
      break;
    default:
      color = 'primary';
      title = 'New';
      emoji = '🆕';
  }

  return (
    <Chip
      label={
        <Stack direction="row" spacing={0.75} alignItems="center">
          <span>{emoji}</span>
          <Dot color={color} />
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Stack>
      }
      size="small"
      sx={{
        height: 30,
        borderRadius: 2,
        bgcolor: `${color}.lighter`,
        '& .MuiChip-label': {
          px: 1
        }
      }}
    />
  );
}

// ==============================|| ORDERS TABLE ||============================== //

export default function OrdersTable() {
  const order = 'asc';
  const orderBy = 'id';

  return (
    <Box>
      {/* Small top summary */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={1.5}
        sx={{ p: 2.5, pb: 1 }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            📈 Recent CRM Deals
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Latest clients, deal status & revenue overview
          </Typography>
        </Box>

        <Chip
          label="🔥 6 Active Deals"
          color="primary"
          variant="outlined"
          sx={{ borderRadius: 2, fontWeight: 600 }}
        />
      </Stack>

      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead order={order} orderBy={orderBy} />

          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `crm-table-row-${index}`;

              return (
                <TableRow
                  hover
                  key={row.id}
                  tabIndex={-1}
                  role="checkbox"
                  sx={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    },
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  {/* Deal ID */}
                  <TableCell component="th" id={labelId} scope="row">
                    <Link
                      underline="hover"
                      color="primary"
                      sx={{
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {row.id}
                    </Link>
                  </TableCell>

                  {/* Client */}
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar
                        sx={{
                          width: 34,
                          height: 34,
                          fontSize: '1rem',
                          bgcolor: 'primary.lighter'
                        }}
                      >
                        {row.emoji}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {row.client}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          CRM Account
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>

                  {/* Orders */}
                  <TableCell align="right">
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {row.orders}
                    </Typography>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <OrderStatus status={row.status} />
                  </TableCell>

                  {/* Revenue */}
                  <TableCell align="right">
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: row.status === 2 ? 'error.main' : 'success.main'
                      }}
                    >
                      <NumericFormat value={row.revenue} displayType="text" thousandSeparator prefix="$" />
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

// ==============================|| PROP TYPES ||============================== //

OrderTableHead.propTypes = {
  order: PropTypes.any,
  orderBy: PropTypes.string
};

OrderStatus.propTypes = {
  status: PropTypes.number
};