// import { useState } from 'react';
// import avatar1 from 'assets/images/users/avatar-1.png';
// import avatar2 from 'assets/images/users/avatar-2.png';
// import avatar3 from 'assets/images/users/avatar-3.png';

// const data = [
//   {
//     id: 1,
//     name: 'Ryan Thompson',
//     email: 'ryanthom@gmail.com',
//     avatar: avatar1,
//     vacation: 15,
//     sick: 3,
//     remote: 50
//   },
//   {
//     id: 2,
//     name: 'Vincent Allen',
//     email: 'vincentl@gmail.com',
//     avatar: avatar2,
//     vacation: 10,
//     sick: 6,
//     remote: 34
//   },
//   {
//     id: 3,
//     name: 'Grace Joseph',
//     email: 'gracej@gmail.com',
//     avatar: avatar3,
//     vacation: 10,
//     sick: 5,
//     remote: 19
//   }
// ];

// export default function VacationPage() {
//   const [employees, setEmployees] = useState(data);

//   return (
//     <div style={{ padding: 24 }}>
//       {/* HEADER */}
//       <div style={header}>
//         <h2 style={{ margin: 0 }}>Vacations</h2>

//         <div style={{ display: 'flex', gap: 16 }}>
//           <div style={{ display: 'flex', paddingRight: 350 }}>
//             <span style={activeTab}>Employees’ vacations</span>
//             <span style={tab}>Calendar</span>
//           </div>

//           <button style={addBtn}>+ Add Request</button>
//         </div>
//       </div>

//       {/* LIST */}
//       {employees.map((emp) => (
//         <div key={emp.id} style={card}>
//           {/* LEFT */}
//           <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
//             <img src={emp.avatar} alt={emp.name} style={avatar} />
//             <div>
//               <div style={{ fontWeight: 600 }}>{emp.name}</div>
//               <div style={{ fontSize: 13, color: '#94a3b8' }}>{emp.email}</div>
//             </div>
//           </div>

//           {/* STATS */}
//           <div style={stats}>
//             <Stat label="Vacations" value={emp.vacation} />
//             <Stat label="Sick Leave" value={emp.sick} />
//             <Stat label="Work remotely" value={emp.remote} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// /* ---------- SMALL COMPONENT ---------- */

// const Stat = ({ label, value }) => (
//   <div style={{ textAlign: 'center', minWidth: 110 }}>
//     <div style={{ fontSize: 12, color: '#94a3b8' }}>{label}</div>
//     <div style={{ fontWeight: 600 }}>{value}</div>
//   </div>
// );

// /* ---------- STYLES ---------- */

// const header = {
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   marginBottom: 20
// };

// const tabs = {
//   background: '#f9f5f1',
//   borderRadius: 10,
//   display: 'flex',
//   padding: 4
// };

// const activeTab = {
//   background: '#3b82f6',
//   color: '#fff',
//   padding: '6px 14px',
//   borderRadius: 8,
//   fontSize: 13
// };

// const tab = {
//   padding: '6px 14px',
//   fontSize: 13,
//   color: '#64748b'
// };

// const addBtn = {
//   background: '#3b82f6',
//   color: '#fff',
//   border: 'none',
//   borderRadius: 10,
//   padding: '8px 16px',
//   cursor: 'pointer'
// };

// const card = {
//   background: '#fff',
//   borderRadius: 14,
//   padding: '16px 20px',
//   marginBottom: 12,
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center'
// };

// const avatar = {
//   width: 42,
//   height: 42,
//   borderRadius: '50%',
//   objectFit: 'cover'
// };

// const stats = {
//   display: 'flex',
//   gap: 40
// };

import { useState } from 'react';

import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';

/* -------------------- INITIAL DATA -------------------- */
const initialData = [
  {
    id: 1,
    name: 'Ryan Thompson',
    email: 'ryanthom@gmail.com',
    avatar: avatar1,
    vacation: 15,
    sick: 3,
    remote: 50
  },
  {
    id: 2,
    name: 'Vincent Allen',
    email: 'vincentl@gmail.com',
    avatar: avatar2,
    vacation: 10,
    sick: 6,
    remote: 34
  },
  {
    id: 3,
    name: 'Grace Joseph',
    email: 'gracej@gmail.com',
    avatar: avatar3,
    vacation: 10,
    sick: 5,
    remote: 19
  }
];

/* ==================== MAIN COMPONENT ==================== */
export default function VacationPage() {
  const [employees, setEmployees] = useState(initialData);
  const [form, setForm] = useState(null);

  /* CREATE + UPDATE */
  const saveEmployee = () => {
    if (!form.name || !form.email) return;

    if (form.id) {
      setEmployees(employees.map((emp) => (emp.id === form.id ? form : emp)));
    } else {
      setEmployees([
        ...employees,
        {
          ...form,
          id: Date.now(),
          avatar: avatar1 // default avatar for new user
        }
      ]);
    }
    setForm(null);
  };

  /* DELETE */
  const deleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <div style={{ padding: 24 }}>
      {/* HEADER */}
      <div style={header}>
        <h2 style={{ margin: 0 }}>Vacations</h2>

        <div style={{ display: 'flex', gap: 16 }}>
          <div style={tabs}>
            <span style={activeTab}>Employees’ vacations</span>
            <span style={tab}>Calendar</span>
          </div>

          <button style={addBtn} onClick={() => setForm({})}>
            + Add Request
          </button>
        </div>
      </div>

      {/* LIST */}
      {employees.map((emp) => (
        <div key={emp.id} style={card}>
          {/* LEFT */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <img src={emp.avatar} alt={emp.name} style={avatar} />
            <div>
              <div style={{ fontWeight: 600 }}>{emp.name}</div>
              <div style={email}>{emp.email}</div>
            </div>
          </div>

          {/* STATS */}
          <div style={stats}>
            <Stat label="Vacations" value={emp.vacation} />
            <Stat label="Sick Leave" value={emp.sick} />
            <Stat label="Work remotely" value={emp.remote} />
          </div>

          {/* ACTIONS */}
          <div>
            <button onClick={() => setForm(emp)} style={linkBtn}>
              Edit
            </button>
            <button onClick={() => deleteEmployee(emp.id)} style={deleteBtn}>
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* MODAL */}
      {form && (
        <div style={overlay}>
          <div style={modal}>
            <h3>{form.id ? 'Edit Request' : 'Add Request'}</h3>

            <Input placeholder="Name" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />

            <Input placeholder="Email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} />

            <Input
              type="number"
              placeholder="Vacations"
              value={form.vacation || ''}
              onChange={(e) => setForm({ ...form, vacation: e.target.value })}
            />

            <Input
              type="number"
              placeholder="Sick Leave"
              value={form.sick || ''}
              onChange={(e) => setForm({ ...form, sick: e.target.value })}
            />

            <Input
              type="number"
              placeholder="Work remotely"
              value={form.remote || ''}
              onChange={(e) => setForm({ ...form, remote: e.target.value })}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button style={addBtn} onClick={saveEmployee}>
                Save
              </button>
              <button onClick={() => setForm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==================== SMALL COMPONENTS ==================== */

const Stat = ({ label, value }) => (
  <div style={{ textAlign: 'center', minWidth: 110 }}>
    <div style={statLabel}>{label}</div>
    <div style={{ fontWeight: 600 }}>{value}</div>
  </div>
);

const Input = (props) => (
  <input
    {...props}
    style={{
      width: '100%',
      padding: 8,
      marginBottom: 10,
      borderRadius: 8,
      border: '1px solid #cbd5f5'
    }}
  />
);

/* ==================== STYLES ==================== */

const header = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20
};

const tabs = {
  background: '#f1f5f9',
  borderRadius: 10,
  display: 'flex',
  padding: 4
};

const activeTab = {
  background: '#3b82f6',
  color: '#fff',
  padding: '6px 14px',
  borderRadius: 8,
  fontSize: 13
};

const tab = {
  padding: '6px 14px',
  fontSize: 13,
  color: '#64748b'
};

const addBtn = {
  background: '#3b82f6',
  color: '#fff',
  border: 'none',
  borderRadius: 10,
  padding: '8px 16px',
  cursor: 'pointer'
};

const card = {
  background: '#fff',
  borderRadius: 16,
  padding: '16px 20px',
  marginBottom: 12,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const avatar = {
  width: 44,
  height: 44,
  borderRadius: '50%'
};

const email = {
  fontSize: 13,
  color: '#94a3b8'
};

const stats = {
  display: 'flex',
  gap: 40
};

const statLabel = {
  fontSize: 12,
  color: '#94a3b8'
};

const linkBtn = {
  background: 'none',
  border: 'none',
  color: '#3b82f6',
  cursor: 'pointer',
  marginRight: 10
};

const deleteBtn = {
  background: 'none',
  border: 'none',
  color: 'red',
  cursor: 'pointer'
};

const overlay = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const modal = {
  background: '#fff',
  padding: 20,
  borderRadius: 16,
  width: 340
};
