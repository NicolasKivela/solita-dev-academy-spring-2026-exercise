package model

import "time"

type DailyReport struct {
	TotalDays      int         `json:"total_days"`
	OverallAverage float64     `json:"overall_average_price"`
	Days           []DailyData `json:"days"`
}

type DailyData struct {
	Date           time.Time    `json:"date"`
	AvgPrice       float64      `json:"avg_daily_price"`
	ProductionSum  float64      `json:"daily_production"`
	ConsumptionSum float64      `json:"daily_consumption"`
	NegativeStreak int          `json:"negative_streak"`
	HourlyData     []HourlyData `json:"hourly_data"`
}

type HourlyData struct {
	Date  time.Time `json:"date"`
	Hour  time.Time `json:"hour"`
	Price float64   `json:"price"`
}

type ElectricityData struct {
	Date              time.Time `json:"date"`
	StartTime         time.Time `json:"start_time"`
	ProductionAmount  float64   `json:"production_amount"`
	ConsumptionAmount float64   `json:"consumption_amount"`
	HourlyPrice       float64   `json:"hourly_price"`
}
