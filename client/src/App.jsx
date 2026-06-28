import ReportIssue from "./components/ReportIssue";
import IssueMap from "./components/IssueMap";
import IssueList from "./components/IssueList";
import AdminDashboard from "./components/AdminDashboard";
import Analytics from "./components/Analytics";
import Leaderboard from "./components/Leaderboard";
import PredictiveInsights from "./components/PredictiveInsights";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-blue-700 text-white p-6 shadow-lg">
        <h1 className="text-4xl font-bold">
          CivicHero AI 🦸‍♂️
        </h1>

        <p className="mt-2 text-lg">
          Hyperlocal Community Problem Solver
        </p>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">

        <ReportIssue />

        <IssueMap />

        <IssueList />

        <AdminDashboard />

        <Analytics />

        <Leaderboard />

        <PredictiveInsights />

      </div>
    </div>
  );
}

export default App;