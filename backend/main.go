package main

import (
	"database/sql"
	"fmt"
	"html"
	"log"
	"net/http"

	"github.com/NicolasKivela/solita-dev-academy-spring-2026-exercise/handler"
	"github.com/NicolasKivela/solita-dev-academy-spring-2026-exercise/repository"
	"github.com/NicolasKivela/solita-dev-academy-spring-2026-exercise/service"
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
	myService := &service.Service{Repo: myRepo}
	myHandler := &handler.Handler{Service: myService}

	http.HandleFunc("/api/daily-data", myHandler.GetDailyElectricityData)
	http.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
	})
	port := ":8010"

	fmt.Println("Starting server")
	err = http.ListenAndServe(port, nil)

	fmt.Println(err)
	fmt.Println("Starting server")
	if err != nil {
		log.Fatal("Listenandserve", err)
	}
	fmt.Println(err)
	fmt.Printf("HEllo")
}
