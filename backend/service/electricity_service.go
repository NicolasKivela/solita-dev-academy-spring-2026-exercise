package service

import (
	"fmt"
	"log"
	"time"

	"github.com/NicolasKivela/solita-dev-academy-spring-2026-exercise/model"
	"github.com/NicolasKivela/solita-dev-academy-spring-2026-exercise/repository"
)

type Service struct {
	Repo *repository.Repository
}

func (ser *Service) DailyData(startStr, endStr string) (map[time.Time]model.DailyData, error) {

	if startStr == "" {
		log.Fatal("Empty startStr")
	}
	if endStr == "" {
		log.Fatal("Empty endStr")
	}
	start, err := time.Parse("2006-01-02", startStr)
	if err != nil {
		return nil, fmt.Errorf("invalid start date '%s': %v", startStr, err)
	}
	end, err := time.Parse("2006-01-02", endStr)
	if err != nil {
		return nil, fmt.Errorf("invalid end date '%s': %v", endStr, err)
	}
	fmt.Println("GettingDailyElectricityData")
	dailydata, err := ser.Repo.FetchElectricityDaily(start, end)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch  data: %w", err)
	}
	rawhourlydata, err := ser.Repo.FetchRawElectricityData(start, end)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch raw hourly data: %w", err)
	}
	dailydata = AggregateData(rawhourlydata, dailydata)
	return dailydata, err
}

func AggregateData(data []model.ElectricityData, dailyData map[time.Time]model.DailyData) map[time.Time]model.DailyData {

	current := 0

	for _, hour := range data {
		datekey := hour.Date
		if day, exists := dailyData[datekey]; exists {
			hourlyData := model.HourlyData{
				Date:        datekey,
				Hour:        hour.StartTime,
				Price:       hour.HourlyPrice,
				Consumption: hour.ConsumptionAmount,
				Production:  hour.ProductionAmount,
			}
			day.HourlyData = append(day.HourlyData, hourlyData)
			current = NegativeStreak(current, hour.HourlyPrice, &day)
			dailyData[hour.Date] = day
		}
	}

	return dailyData
}

func NegativeStreak(current int, hourly_price float64, day *model.DailyData) int {
	if hourly_price < 0 {
		current++
		if current > day.NegativeStreak {
			day.NegativeStreak = current
		}
		return current
	} else {
		return 0
	}
}
