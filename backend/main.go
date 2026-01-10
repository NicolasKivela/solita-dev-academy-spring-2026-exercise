package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/NicolasKivela/solita-dev-academy-spring-2026-exercise/handler"
	"github.com/NicolasKivela/solita-dev-academy-spring-2026-exercise/repository"
)

func main() {
	connStr := "postgres://academy:academy@localhost:5432/electricity"
	db, err := sql.Open("pgx", connStr)
	if err != nil {
		log.Fatal(err)
	}
	err = db.Ping()
	if err != nil {
		log.Fatalf("Cannot connect to db at %s: %v", connStr, err)
	}
	fmt.Println("Successfully connected to the database!")
	myRepo := &repository.Repository{Db: db}
	myHandler := &handler.Handler{Repo: myRepo}
	http.HandleFunc("/daily-data", myHandler.GetDailyElectricityData)
	port := ":8010"
	err = http.ListenAndServe(port, nil)
	if err != nil {
		log.Fatal("Listenandserve", err)
	}
	fmt.Printf("HEllo")
}
