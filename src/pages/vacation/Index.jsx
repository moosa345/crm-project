import { useEffect, useState } from "react";
import { useVacationStore } from "store/useVacationStore";

export default function VacationPage() {
  const {
    vacations,
    fetchVacations,
    addVacation,
    updateVacation,
    deleteVacation,
  } = useVacationStore();

  const [form, setForm] = useState(null);

  useEffect(() => {
    fetchVacations();
  }, []);

  /* SAVE */
  const saveVacation = async () => {
    if (!form.name || !form.email) return;

    if (form._id) {
      await updateVacation(form._id, form);
    } else {
      await addVacation(form);
    }

    setForm(null);
  };

  /* DELETE */
  const removeVacation = async (id) => {
    await deleteVacation(id);
  };

  return (
    <div style={{ padding: 24 }}>
      {/* HEADER */}
      <div style={header}>
        <h2 style={{ margin: 0 }}>Vacations</h2>

        <div style={{ display: "flex", gap: 16 }}>
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
      {vacations.map((emp) => (
        <div key={emp._id} style={card}>
          <div>
            <div style={{ fontWeight: 600 }}>{emp.name}</div>
            <div style={email}>{emp.email}</div>
          </div>

          <div style={stats}>
            <Stat label="Vacations" value={emp.vacation} />
            <Stat label="Sick Leave" value={emp.sick} />
            <Stat label="Work remotely" value={emp.remote} />
          </div>

          <div>
            <button onClick={() => setForm(emp)} style={linkBtn}>
              Edit
            </button>
            <button onClick={() => removeVacation(emp._id)} style={deleteBtn}>
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* MODAL */}
      {form && (
        <div style={overlay}>
          <div style={modal}>
            <h3>{form._id ? "Edit Request" : "Add Request"}</h3>

            <Input
              placeholder="Name"
              value={form.name || ""}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <Input
              placeholder="Email"
              value={form.email || ""}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <Input
              type="number"
              placeholder="Vacations"
              value={form.vacation || ""}
              onChange={(e) =>
                setForm({ ...form, vacation: e.target.value })
              }
            />

            <Input
              type="number"
              placeholder="Sick Leave"
              value={form.sick || ""}
              onChange={(e) =>
                setForm({ ...form, sick: e.target.value })
              }
            />

            <Input
              type="number"
              placeholder="Work remotely"
              value={form.remote || ""}
              onChange={(e) =>
                setForm({ ...form, remote: e.target.value })
              }
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button style={addBtn} onClick={saveVacation}>
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

/* SMALL COMPONENTS */

const Stat = ({ label, value }) => (
  <div style={{ textAlign: "center", minWidth: 110 }}>
    <div style={statLabel}>{label}</div>
    <div style={{ fontWeight: 600 }}>{value}</div>
  </div>
);

const Input = (props) => (
  <input
    {...props}
    style={{
      width: "100%",
      padding: 8,
      marginBottom: 10,
      borderRadius: 8,
      border: "1px solid #cbd5f5",
    }}
  />
);

/* STYLES */

const header = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 };
const tabs = { background: "#f1f5f9", borderRadius: 10, display: "flex", padding: 4 };
const activeTab = { background: "#3b82f6", color: "#fff", padding: "6px 14px", borderRadius: 8, fontSize: 13 };
const tab = { padding: "6px 14px", fontSize: 13, color: "#64748b" };
const addBtn = { background: "#3b82f6", color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", cursor: "pointer" };
const card = { background: "#fff", borderRadius: 16, padding: "16px 20px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" };
const email = { fontSize: 13, color: "#94a3b8" };
const stats = { display: "flex", gap: 40 };
const statLabel = { fontSize: 12, color: "#94a3b8" };
const linkBtn = { background: "none", border: "none", color: "#3b82f6", cursor: "pointer", marginRight: 10 };
const deleteBtn = { background: "none", border: "none", color: "red", cursor: "pointer" };
const overlay = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center" };
const modal = { background: "#fff", padding: 20, borderRadius: 16, width: 340 };