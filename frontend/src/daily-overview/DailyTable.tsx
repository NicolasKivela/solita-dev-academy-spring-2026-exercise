import React, { useState } from "react";
import { DailyRow } from "./DailyRow";
import type { DailyData } from "../types/electricity";
import { ChooseDate } from "./ChooseDate";
interface DailyTableProps{
    dailyData: DailyData[]
}
export function DailyTable({dailyData}:DailyTableProps){
    const [clickedDay, setClickedDay] = useState("")
    console.log(dailyData)
    return(
        <div>
            <DailyRow/>
        </div>
    )

    
}