package handler

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/NicolasKivela/solita-dev-academy-spring-2026-exercise/service"
)

type Handler struct {
	Service *service.Service
}

func (h *Handler) GetDailyElectricityData(w http.ResponseWriter, r *http.Request) {

	startStr := r.URL.Query().Get("start")
	endStr := r.URL.Query().Get("end")
	dailydata, err := h.Service.DailyData(startStr, endStr)
	if err != nil {
		log.Fatal("Error when parsing start date to time")
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(dailydata)
}
