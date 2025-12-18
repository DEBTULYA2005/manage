import { useState } from "react";
import "./Modal.css";

export default function AddPaymentModal({ close, refresh }) {
  const [form, setForm] = useState({
    date: "",
    amount: "",
    remarks: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!form.date || !form.amount || !form.remarks) {
      setError("Date, Amount, and Remarks are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/income/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, amount: Number(form.amount) }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = data.error || JSON.stringify(data);
        setError("Failed to save payment: " + msg);
        setLoading(false);
        return;
      }

      refresh();
      close();
    } catch (err) {
      console.error(err);
      setError("Network or server error");
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Payment</h2>

        {error && <p className="modal-error">{error}</p>}

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <select
          value={form.remarks}
          onChange={(e) => setForm({ ...form, remarks: e.target.value })}
        >
          <option value="">Select Payment Mode</option>
          <option value="CASH">CASH</option>
          <option value="ONLINE">ONLINE</option>
          <option value="CREDIT">Other</option>
        </select>

        <div className="modal-actions">
          <button onClick={submit} className="save" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button onClick={close} className="cancel" disabled={loading}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
