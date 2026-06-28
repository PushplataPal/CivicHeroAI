import { useEffect, useState } from "react";
import axios from "axios";

function IssueList() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await axios.get(
        "https://civichero-ai-backend.onrender.com/api/issues"
      );

      setIssues(res.data);
    } catch (error) {
      console.log(error);
    }
  };

 const handleUpvote = async (id) => {
  try {
    await axios.put(
      `https://civichero-ai-backend.onrender.com/api/issues/${id}/upvote`
    );

    let currentPoints =
      Number(localStorage.getItem("heroPoints")) || 0;

    currentPoints += 10;

    localStorage.setItem(
      "heroPoints",
      currentPoints
    );

    fetchIssues();

    alert("Thanks for verifying! +10 Hero Points 🏆");

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div style={{ marginTop: "50px" }}>
      <h2>Community Issues 📋</h2>

      {issues.map((issue) => (
        <div
          key={issue._id}
          className="
bg-white
shadow-lg
rounded-2xl
p-6
mb-6
hover:shadow-xl
transition
"
        >
          <h3>{issue.title}</h3>

          <p>
            <b>Description:</b> {issue.description}
          </p>
<p>
  <b>AI Suggestion:</b> {issue.suggestion}
</p>
          <p>
            <b>Category:</b> {issue.category}
          </p>

          <p>
            <b>Severity:</b> {issue.severity}
          </p>

          <p>
            <b>Location:</b> {issue.location}
          </p>

          <p>
            <b>Status:</b> {issue.status}
          </p>
{issue.severity === "High" && (
  <p
    style={{
      color: "red",
      fontWeight: "bold",
    }}
  >
    🔥 High Priority Issue
  </p>
)}
          <p>
            <b>Community Support:</b> {issue.upvotes || 0} 👍
          </p>

          <button onClick={() => handleUpvote(issue._id)}>
            Verify Issue 👍
          </button>

          <br /><br />

          {issue.image && (
            <img
              src={`https://civichero-ai-backend.onrender.com/uploads/${issue.image}`}
              alt={issue.title}
              width="250"
              style={{
                borderRadius: "10px",
                marginTop: "10px",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default IssueList;