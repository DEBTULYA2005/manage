import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import TimeTable from "./TimeTable";
import StudentInfo from "./StudentInfo";
import Income from "./Income";
import Footer from "./Footer";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <div className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/timetable" element={<TimeTable />} />
          <Route path="/students" element={<StudentInfo />} />
          <Route path="/income" element={<Income />} />
          <Route path="/Account" element={<Account />} />
        </Routes>
      </div>

      
      <Footer />
    </div>
  );
}

export default App;
