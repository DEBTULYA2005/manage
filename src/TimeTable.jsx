import "./TimeTable.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TimeTable() {
  const navigate = useNavigate();
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  // All days should be visible by default
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Fetch timetable from Django API
  useEffect(() => {
    axios
      .get("https://freemanage.onrender.com/api/timetable/")
      .then((res) => {
        setTimetable(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching timetable:", err);
        setLoading(false);
      });
  }, []);

  // Group timetable by day
  const groupedTimetable = days.map((day) => ({
    day,
    slots: timetable.filter((item) => item.day === day),
  }));

  return (
    <div className="timetable">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <center>
        <h1>Time Table</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="table">
            {groupedTimetable.map((dayItem, index) => (
              <div key={index} className="day-column">
                <div className="day">{dayItem.day}</div>

                {dayItem.slots.length > 0 ? (
                  dayItem.slots.map((slot, i) => (
                    <div key={i} className="slot">
                      {slot.start_time} - {slot.end_time}
                      <br />
                      {slot.subject && (
                        <small>
                          {slot.subject} ({slot.teacher})
                        </small>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="slot">-</div>
                )}
              </div>
            ))}
          </div>
        )}

        <h3>Extra Time</h3>
      </center>
    </div>
  );
}
