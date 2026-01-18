package repository

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/NicolasKivela/solita-dev-academy-spring-2026-exercise/model"
	_ "github.com/jackc/pgx/v5/stdlib"
)

type Repository struct {
	Db *sql.DB
}

func (r *Repository) FetchElectricityDaily(start time.Time, end time.Time) (map[time.Time]model.DailyData, error) {
	fmt.Println("FetchingElectricityDaily")
	rows, err := r.Db.Query(`SELECT date, SUM(COALESCE(productionamount,0)) AS daily_production, 
	SUM(COALESCE(consumptionamount,0)) AS daily_consumption,
	AVG(COALESCE(hourlyprice,0)) AS avg_daily_price
	FROM public.electricitydata
	WHERE date BETWEEN $1 AND $2
	GROUP BY date
	ORDER BY date ASC;`, start, end)
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	dataMap := make(map[time.Time]model.DailyData)
	for rows.Next() {
		var dailydata model.DailyData
		err := rows.Scan(&dailydata.Date, &dailydata.ProductionSum, &dailydata.ConsumptionSum, &dailydata.AvgPrice)
		if err != nil {
			return nil, err
		}
		dataMap[dailydata.Date] = dailydata
	}
	return dataMap, nil
}

func (r *Repository) FetchRawElectricityData(start time.Time, end time.Time) ([]model.ElectricityData, error) {
	rows, err := r.Db.Query(`SELECT date, startTime, COALESCE(productionAmount,0)
							, COALESCE(consumptionAmount, 0), COALESCE(hourlyPrice) 
                             FROM public.electricitydata WHERE date BETWEEN $1 AND $2`, start, end)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var list []model.ElectricityData
	for rows.Next() {
		var h model.ElectricityData
		rows.Scan(&h.Date, &h.StartTime, &h.ProductionAmount, &h.ConsumptionAmount, &h.HourlyPrice)
		list = append(list, h)
	}
	return list, nil
}
