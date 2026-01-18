import { useEffect, useState } from "react";
import type { DailyData } from "../types/electricity";
import { dateFormatForAPI } from "../utils/formatters";
import { getElectricityData } from "../api/electricity";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
interface ChooseDateProps {
  onChangeDailyData: (dailydata: Record<string, DailyData>) => void;
}
export function ChooseDate({ onChangeDailyData }: ChooseDateProps) {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2024-01-01T00:00:00"),
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  function setValue() {
    if (startDate && endDate) {
      const start = dateFormatForAPI(startDate);
      const end = dateFormatForAPI(endDate);
      getElectricityData(start, end)
        .then((data) => {
          onChangeDailyData(data);
        })
        .catch((err) => console.error(err));
    } else {
      console.log("No start date or end date");
    }
  }

  useEffect(() => {
    setValue();
  }, []);
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Start date picker"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
        />
        <DatePicker
          label="End date picker"
          value={endDate}
          onChange={(newEndValue) => setEndDate(newEndValue)}
        />
      </LocalizationProvider>
      <button
        onClick={() => {
          setValue();
        }}
      >
        Find data
      </button>
    </div>
  );
}
