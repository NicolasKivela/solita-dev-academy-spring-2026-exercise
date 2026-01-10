package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/NicolasKivela/solita-dev-academy-spring-2026-exercise/repository"
)

type Handler struct {
	Repo *repository.Repository
}

func (h *Handler) GetDailyElectricityData(w http.ResponseWriter, r *http.Request) {
	startStr := r.URL.Query().Get("start")
	endStr := r.URL.Query().Get("end")
	start, err := time.Parse("2006-01-02", startStr)
	if err != nil {
		log.Fatal("Error when parsing start date to time")
	}
	end, err := time.Parse("2006-01-02", endStr)
	if err != nil {
		log.Fatal("Error when parsing end date to time")
	}
	dailydata, err := h.Repo.FetchElectricityDaily(start, end)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(dailydata)
}
