import "./StudentInfo.css";
import Loading from "./loading";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function StudentInfo() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    school: "",
    class_name: "",
    contact: "",
    admission_date: "",
    fees: "",
  });

  // 🔹 Fetch students
  useEffect(() => {
    axios
      .get("https://freemanage.onrender.com/api/students/")
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Save student
  const handleSave = () => {
    axios
      .post("https://freemanage.onrender.com/api/students/", formData)
      .then((res) => {
        setStudents([...students, res.data]);
        setShowModal(false);
        setFormData({
          name: "",
          school: "",
          class_name: "",
          contact: "",
          admission_date: "",
          fees: "",
        });
      });
  };

  return (
    <div className="student-info">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <center>
        <h1>Student's Info</h1>

        {loading ? (
          <Loading />
        ) : (
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>School</th>
                <th>Class</th>
                <th>Contact Info</th>
                <th>Admission Date</th>
                <th>FEES</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.school}</td>
                  <td>{student.class_name}</td>
                  <td>{student.contact}</td>
                  <td>{student.admission_date}</td>
                  <td>{student.fees}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </center>

      <button className="add-btn" onClick={() => setShowModal(true)}>
        ADD +
      </button>

      {/* POPUP MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Student</h3>

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="school"
              placeholder="School"
              value={formData.school}
              onChange={handleChange}
            />

            <input
              type="text"
              name="class_name"
              placeholder="Class"
              value={formData.class_name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="contact"
              placeholder="Contact No."
              value={formData.contact}
              onChange={handleChange}
            />

            <input
              type="date"
              name="admission_date"
              value={formData.admission_date}
              onChange={handleChange}
            />

            <input
              type="text"
              name="fees"
              placeholder="Student's Fees"
              value={formData.fees}
              onChange={handleChange}
            />

            <div className="modal-actions">
              <button className="save-btn" onClick={handleSave}>
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
