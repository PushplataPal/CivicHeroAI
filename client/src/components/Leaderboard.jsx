import { useEffect, useState } from "react";

function Leaderboard() {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const savedPoints =
      localStorage.getItem("heroPoints") || 0;

    setPoints(Number(savedPoints));
  }, []);

  const getBadge = () => {
    if (points >= 200) return "🥇 Gold Hero";
    if (points >= 100) return "🥈 Silver Hero";
    if (points >= 50) return "🥉 Bronze Hero";

    return "🌱 New Volunteer";
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
      <h2>Community Hero Leaderboard 🏆</h2>

      <h3>Your Points: {points}</h3>

      <h3>Badge: {getBadge()}</h3>
    </div>
  );
}

export default Leaderboard;