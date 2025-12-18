import { useEffect, useState } from "react";
import "./Modal.css";

export default function CalculationModal({ close }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/students/")
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  const total = students.reduce((s, st) => s + Number(st.fees), 0);
  const income = total * 0.25;

  return (
    <div className="modal-overlay">
      <div className="modal printable">
        <h2>Income Calculation</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Fees</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.fees}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p>Total Fees: ₹ {total}</p>
        <p>25% Income: ₹ {income}</p>

        <div className="modal-actions">
          <button className="print" onClick={() => window.print()}>Print</button>
          <button className="cancel" onClick={close}>Close</button>
        </div>
      </div>
    </div>
  );
}
