import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Debtulya</h3>

        <p>
          A modern student management platform focused on simplicity,
          efficiency, and user-friendly design.
        </p>

        <div className="footer-links">
          <span>Amount</span>
          <span>Time Table</span>
          <span>Student Info</span>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} Debtulya. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
