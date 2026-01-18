import { useState } from "react";
import "./App.css";
import { DailyTable } from "./daily-overview/DailyTable";
import { ChooseDate } from "./daily-overview/ChooseDate";
import type { DailyData } from "./types/electricity";
function App() {
  const [dailyData, setDailyData] = useState<Record<string, DailyData>>({});
  return (
    <div>
      <ChooseDate onChangeDailyData={setDailyData} />
      <DailyTable dailyData={dailyData} />
    </div>
  );
}

export default App;
