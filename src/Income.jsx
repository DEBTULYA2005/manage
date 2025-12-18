import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Income.css";
import AddPaymentModal from "./AddPaymentModal";
import CalculationModal from "./CalculationModal";

export default function Income() {
  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);
  const [payments, setPayments] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showCalc, setShowCalc] = useState(false);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
  const res = await fetch("https://freemanage.onrender.com/api/income/");
  const data = await res.json();
  setSummary(data);
  setPayments(data.payments || []);
  };

  const fetchPayments = async () => {
  const res = await fetch("https://freemanage.onrender.com/api/income/");
  const data = await res.json();
  setPayments(data.payments || []);
  };

  return (
    <div className="income-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button><br></br>
      <center><h1>INCOME</h1></center>

      {summary && (
        <div className="income-summary">
          <p>Total Fees: ₹ {summary.total_fees}</p>
          <p>Percentage: {summary.percentage}%</p>
          <h2>Monthly Income: ₹ {summary.income_amount}</h2>
        </div>
      )}

      <div className="actions">
        <button onClick={() => setShowCalc(true)}>See Calculations</button>
        <button onClick={() => setShowAdd(true)}>ADD +</button>
      </div>

      <table className="income-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount Received</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(payments) && payments.length > 0 ? (
          payments.map(p => (
            <tr key={p.id}>
              <td>{p.date}</td>
              <td>₹ {p.amount}</td>
              <td>{p.remarks}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" style={{ textAlign: "center" }}>
              No payments found
            </td>
          </tr>
        )}
        </tbody>
      </table>

      {showAdd && <AddPaymentModal close={() => setShowAdd(false)} refresh={fetchPayments} />}
      {showCalc && <CalculationModal close={() => setShowCalc(false)} />}
    </div>
  );
}
