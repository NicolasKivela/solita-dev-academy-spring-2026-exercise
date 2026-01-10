package repository

import (
	"database/sql"
	"time"

	"github.com/NicolasKivela/solita-dev-academy-spring-2026-exercise/model"
	_ "github.com/jackc/pgx/v5/stdlib"
)

type Repository struct {
	Db *sql.DB
}

func (r *Repository) FetchElectricityDaily(start time.Time, end time.Time) ([]model.DailyData, error) {
	rows, err := r.Db.Query(`SELECT date, SUM(production_amount) AS daily_production, 
	AVG(hourly_price) AS avg_daily_price, COUNT(*) AS hours_recorded
	FROM electricity
	WHERE date BETWEEN $1 AND $2
	GROUP BY date
	ORDER BY date ASC;`, start, end)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	datarows := make([]model.DailyData, 0, 2200)
	for rows.Next() {
		var dailydata model.DailyData
		err := rows.Scan(&dailydata.Date, &dailydata.ProductionSum, &dailydata.AvgPrice)
		if err != nil {
			return nil, err
		}
		datarows = append(datarows, dailydata)
	}
	return datarows, err
}
