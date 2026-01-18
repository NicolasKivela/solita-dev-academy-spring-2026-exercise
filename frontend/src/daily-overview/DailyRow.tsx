import React from "react";
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';

import type { DailyData } from "../types/electricity";
interface dailyRowPorps{
    dailyDetails: DailyData
}

export function DailyGraph({dailyDetails}: dailyRowPorps){
const margin = { right: 24 };
var price: number[] = []
console.log("dailydetails", dailyDetails)
if (dailyDetails && Array.isArray(dailyDetails.hourly_data)){
    price = dailyDetails.hourly_data.map((value) => {
    return value.price
})
}
const xLabels = Array.from({ length: 24 }, (_, i) => `${i}-${i+1}`);
  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <LineChart
        series={[
          { data: price, label: 'Price (€)' },
      
        ]}
        xAxis={[{ scaleType: 'point',label:"Hours", data: xLabels, 
            height: 60, 
            valueFormatter(value, context) {
            if (context.location === 'tooltip') {
                return `Klo ${value}`;
            }
            return value
        },}]}
        yAxis={[{ width: 50, label:"Euros"}]}
        margin={margin}
      />
    </Box>
  )
}
