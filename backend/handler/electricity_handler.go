package handler

import (
	"encoding/json"
	"fmt"
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
		fmt.Println("HANDLER ERROR:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(dailydata)
}
