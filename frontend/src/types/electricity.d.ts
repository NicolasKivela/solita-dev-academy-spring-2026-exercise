
type DailyData = {
	Date:           Date 
	AvgPrice:       float64      
	ProductionSum:  float64      
	ConsumptionSum: float64      
	NegativeStreak: int          
	HourlyData:     HourlyData 
}

type HourlyData = {
	Date:        Date 
	Hour:        time.Time
	Price:       float64  
	Consumption: float64  
	Production:  float64  
}
export const {HourlyData, DailyData}