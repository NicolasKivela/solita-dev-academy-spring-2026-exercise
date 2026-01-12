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

func (ser *Service) DailyData(startStr, endStr string) ([]model.DailyData, error) {

	fmt.Println("startStr and endStr", startStr, endStr)
	if startStr == "" {
		log.Fatal("Empty startStr")
	}
	if endStr == "" {
		log.Fatal("Empty endStr")
	}
	start, err := time.Parse("2006-01-02", startStr)
	if err != nil {
		log.Fatal("Error when parsing start date to time")
	}
	end, err := time.Parse("2006-01-02", endStr)
	if err != nil {
		log.Fatal("Error when parsing end date to time")
	}
	fmt.Println("GettingDailyElectricityData")
	dailydata, err := ser.Repo.FetchElectricityDaily(start, end)
	return dailydata, err
}
