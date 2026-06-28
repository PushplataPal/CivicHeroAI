import { useEffect, useState } from "react";
import axios from "axios";

function PredictiveInsights() {
  const [prediction, setPrediction] = useState("");

  useEffect(() => {
    fetchPrediction();
  }, []);

  const fetchPrediction = async () => {
    try {
      const issuesRes = await axios.get(
        "http://localhost:5000/api/issues"
      );

      const aiRes = await axios.post(
        "http://localhost:5000/api/ai/predict",
        {
          issues: issuesRes.data,
        }
      );

      setPrediction(aiRes.data.prediction);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="
bg-white
rounded-2xl
shadow-lg
p-6
"
    >
      <h2>AI Predictive Insights 🔮</h2>

      <p>{prediction}</p>
    </div>
  );
}

export default PredictiveInsights;