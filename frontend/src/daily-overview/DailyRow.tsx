import React from "react";
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';

import type { DailyData } from "../types/electricity";
interface dailyRowPorps{
    dailyDetails: DailyData
}

export function DailyGraph({dailyDetails}: dailyRowPorps){
const margin = { right: 24 };
var price: number[] = []
let consumptionToProduction: number[];
let maxConsumptionToProduction: number = 0;
let maxConsToProdIndex: (number | null) = 0;
let peakPriceHighlight: (number | null)[] = [];
console.log("dailydetails", dailyDetails)
if (dailyDetails && Array.isArray(dailyDetails.hourly_data)){
    price = dailyDetails.hourly_data.map((value) => {
    return value.price
})
    consumptionToProduction = dailyDetails.hourly_data.map((value) => {
        const ratio = value.consumption/value.production
        return ratio
    })
    maxConsumptionToProduction = Math.max(...consumptionToProduction)
    maxConsToProdIndex = consumptionToProduction.indexOf(maxConsumptionToProduction)
    peakPriceHighlight = price.map((p, i) => (i === maxConsToProdIndex ? p : null));
}
const minPrice = price.length > 0 ? Math.min(...price) : 0;
const maxPrice = price.length > 0 ? Math.max(...price) : 0;
const xLabels = Array.from({ length: 24 }, (_, i) => `${i}-${i+1}`);
  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <LineChart
        series={[
          { data: price, label: 'Price (C/kWh)' },
          { data: peakPriceHighlight, 
            label: "Max Consumption to Production ratio",
            color: "red",
            valueFormatter: (value: number | null) => {
                if (value === null) return null; 
                return `${maxConsumptionToProduction.toFixed(2)}`;
            },
            labelMarkType: "circle"}
        ]}
        
        xAxis={[{ scaleType: 'point',label:"Hours", data: xLabels, 
            height: 60, 
            valueFormatter(value, context) {
            if (context.location === 'tooltip') {
                return `Klo ${value}`;
            }
            return value
        },}]}
        yAxis={[{ width: 50, label:"C/kWh"}]}
        margin={margin}
      >
        <ChartsReferenceLine 
          y={minPrice} 
          label={`Min ${minPrice}`} 
          lineStyle={{ stroke: 'green', strokeDasharray: '4 4' }} 
        />
        <ChartsReferenceLine 
          y={maxPrice} 
          label={`Max ${maxPrice}`} 
          lineStyle={{ stroke: 'red', strokeDasharray: '4 4' }} 
        />
      </LineChart>
    </Box>
  )
}
