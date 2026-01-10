package model

import "time"

type DailyData struct {
	Date           time.Time `json:"date"`
	AvgPrice       float64   `json:"avg_daily_price"`
	ProductionSum  float64   `json:"daily_production"`
	NegativeStreak int       `json:"negative_streak"`
}
