import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/issues"
    );

    setIssues(res.data);
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/issues/${id}/status`,
        {
          status,
        }
      );

      fetchIssues();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <h2>Admin Dashboard 🛠️</h2>

      {issues.map((issue) => (
        <div
          key={issue._id}
         className="
bg-white
rounded-2xl
shadow-lg
p-6
"
        >
          <h3>{issue.title}</h3>

          <p>Status: {issue.status}</p>

          <button
            onClick={() =>
              updateStatus(issue._id, "In Progress")
            }
          >
            In Progress
          </button>

          {" "}

          <button
            onClick={() =>
              updateStatus(issue._id, "Resolved")
            }
          >
            Resolved
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;