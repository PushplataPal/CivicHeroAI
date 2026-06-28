import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    highSeverity: 0,
    topCategory: "N/A",
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "https://civichero-ai-backend.onrender.com/api/issues"
      );

      const issues = res.data;

      const total = issues.length;

      const pending = issues.filter(
        (i) => i.status === "Pending"
      ).length;

      const resolved = issues.filter(
        (i) => i.status === "Resolved"
      ).length;

      const highSeverity = issues.filter(
        (i) => i.severity === "High"
      ).length;

      const categoryCount = {};

      issues.forEach((issue) => {
        if (issue.category) {
          categoryCount[issue.category] =
            (categoryCount[issue.category] || 0) + 1;
        }
      });

      let topCategory = "N/A";
      let maxCount = 0;

      for (const category in categoryCount) {
        if (categoryCount[category] > maxCount) {
          maxCount = categoryCount[category];
          topCategory = category;
        }
      }

      setStats({
        total,
        pending,
        resolved,
        highSeverity,
        topCategory,
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        marginBottom: "30px",
        border: "1px solid #ddd",
        borderRadius: "12px",
      }}
    >
      <h2>Community Dashboard 📊</h2>

      <p>📌 Total Issues: {stats.total}</p>

      <p>⏳ Pending Issues: {stats.pending}</p>

      <p>✅ Resolved Issues: {stats.resolved}</p>

      <p>🚨 High Severity Issues: {stats.highSeverity}</p>

      <p>🏆 Most Reported Category: {stats.topCategory}</p>
    </div>
  );
}

export default Dashboard;