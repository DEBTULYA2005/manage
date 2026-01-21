// Dashboard.jsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  
  // const [about, setAbout] = useState("");
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/dashboard/")
      .then((response) => {
        setAbout(response.data.about);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load dashboard data");
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard">
      <nav className="navbar">
        <Link to="/" className="logo active">Debtulya</Link>

        <div className="nav-center">
          <Link to="/income">Income</Link>
          <Link to="/timetable">Time Table</Link>
          <Link to="/students">Student Info</Link>
          <Link to="/Account">Account</Link>
        </div>
      </nav>

      <div className="banner">
        <h1 className="typing-text">
          Wellcome! Debtulya
        </h1>
      </div>

      <section className="about">
        <h2>About</h2>
        <p>Our platform is designed to simplify student management and learning activities through a clean, secure, and user-friendly system. It helps organize student records, timetables, and fee information efficiently while supporting continuous improvement in today’s digital learning environment.</p>
        <br></br>
        <p>I am a part-time educator at <b>ORBIT EDUCATIONS</b> coaching classes, committed to helping students build strong academic foundations through clear explanations and practical learning methods. My focus is on improving understanding, confidence, and overall academic growth.</p>
        
        <br></br>

        <div className="frontend">
          <img src="https://codedamn.com/assets/images/learnpaths/og/frontend.png" alt="FRONT-END"/>
          <p>The frontend of this website is designed with a strong focus on simplicity, responsiveness, and user experience. Built using modern web technologies, it ensures smooth navigation, clear layouts, and visually appealing components that make information easy to access and understand. Special attention has been given to usability and performance so that users can interact with the platform comfortably on different devices. During the development process, AI tools were used as a supportive resource for idea generation, code optimization, and problem-solving, helping to improve efficiency while keeping the final design aligned with real user needs.</p>
        </div>
        
        <br></br>

        <div className="backend">
          <p>
            The backend of this website is designed to be robust, secure, and scalable, ensuring smooth data management and reliable performance. It is built using Django and Django REST Framework to handle core functionalities such as student information management, income calculations, and timetable operations. Well-structured APIs are used to securely exchange data between the frontend and backend, enabling real-time updates and seamless integration. The system follows best practices for error handling, data validation, and modular design, making it easy to maintain and extend in the future. This backend architecture ensures accuracy, efficiency, and consistency across all services provided by the platform.
          </p>   
          <img src="https://miro.medium.com/v2/resize:fit:1400/1*g4xobp2Cg3u4zC5z0rH-Gg.png" alt="BACK-END"/>     
        </div>

        <br></br>

        <div className="why">
          <h4>Why React + Django is best ?</h4>
          <p>React + Django works because it's a pragmatic implementation of good software architecture principles. Django provides the robust, secure, and efficient backend infrastructure that complex applications need, while React provides the dynamic, responsive, and maintainable user interface that modern users expect.

            The combination isn't just technically sound; it's organizationally optimal - it creates natural boundaries that align with team structures, development workflows, and deployment strategies. This is why it has become a popular choice for startups and enterprises alike: it scales both technically and organizationally.
          </p>
        </div>
        </section>
    </div>
  );
}
