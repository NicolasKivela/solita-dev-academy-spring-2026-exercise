import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getElectricityData } from './api/electricity'
import { dateFormatForAPI } from './utils/formatters'
import { DailyTable } from './daily-overview/DailyTable'
import { ChooseDate } from './daily-overview/ChooseDate'
import type { DailyData } from "./types/electricity";
function App() {
  const [count, setCount] = useState(0)
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  console.log("dailydata after chosen dates", dailyData)
  return (
    <>
    <ChooseDate dailyData={dailyData} onChangeDailyData={setDailyData}/>
    <DailyTable dailyData={dailyData}/>
    </>
  )
}

export default App
