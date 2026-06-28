import { useEffect, useState } from "react";
import axios from "axios";

function Analytics() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/issues"
      );

      setIssues(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const pending = issues.filter(
    (i) => i.status === "Pending"
  ).length;

  const resolved = issues.filter(
    (i) => i.status === "Resolved"
  ).length;

  const inProgress = issues.filter(
    (i) => i.status === "In Progress"
  ).length;

  const highSeverity = issues.filter(
    (i) => i.severity === "High"
  ).length;

  return (
    <div
     className="
bg-white
rounded-2xl
shadow-lg
p-6
"
    >
      <h2>Analytics Dashboard 📊</h2>

      <h3>Total Issues: {issues.length}</h3>

      <p>⏳ Pending: {pending}</p>

      <p>🚧 In Progress: {inProgress}</p>

      <p>✅ Resolved: {resolved}</p>

      <p>🔥 High Severity Issues: {highSeverity}</p>
    </div>
  );
}

export default Analytics;