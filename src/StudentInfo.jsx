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
  const [editingStudent, setEditingStudent] = useState(null); // 🔹 track editing

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
      .get("https://freemanage-1.onrender.com/api/students/")
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

  // 🔹 Save or Update student
  const handleSave = () => {
    if (editingStudent) {
      // UPDATE
      axios
        .put(`https://freemanage-1.onrender.com/api/students/${editingStudent.id}/`, formData)
        .then((res) => {
          setStudents(students.map((s) => (s.id === editingStudent.id ? res.data : s)));
          closeModal();
        });
    } else {
      // CREATE
      axios
        .post("https://freemanage-1.onrender.com/api/students/", formData)
        .then((res) => {
          setStudents([...students, res.data]);
          closeModal();
        });
    }
  };

  // 🔹 Open modal for editing
  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      school: student.school,
      class_name: student.class_name,
      contact: student.contact,
      admission_date: student.admission_date,
      fees: student.fees,
    });
    setShowModal(true);
  };

  // 🔹 Delete student
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios
        .delete(`https://freemanage-1.onrender.com/api/students/${id}/`)
        .then(() => {
          setStudents(students.filter((s) => s.id !== id));
        });
    }
  };

  // 🔹 Close modal and reset
  const closeModal = () => {
    setShowModal(false);
    setEditingStudent(null);
    setFormData({
      name: "",
      school: "",
      class_name: "",
      contact: "",
      admission_date: "",
      fees: "",
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
                <th>Actions</th> {/* 🔹 new column */}
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
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(student)}>
                      ✏️ Update
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(student.id)}>
                      🗑️ Delete
                    </button>
                  </td>
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
            <h3>{editingStudent ? "Update Student" : "Add Student"}</h3>

            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            <input type="text" name="school" placeholder="School" value={formData.school} onChange={handleChange} />
            <input type="text" name="class_name" placeholder="Class" value={formData.class_name} onChange={handleChange} />
            <input type="text" name="contact" placeholder="Contact No." value={formData.contact} onChange={handleChange} />
            <input type="date" name="admission_date" value={formData.admission_date} onChange={handleChange} />
            <input type="text" name="fees" placeholder="Student's Fees" value={formData.fees} onChange={handleChange} />

            <div className="modal-actions">
              <button className="save-btn" onClick={handleSave}>
                {editingStudent ? "Update" : "Save"}
              </button>
              <button className="cancel-btn" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}