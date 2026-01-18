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
	"github.com/rs/cors"
)

func main() {
	//connStr := "postgres://academy:academy@localhost:5432/electricity"
	connStr := "postgres://academy:academy@db:5432/electricity"
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
	mux := http.NewServeMux()
	mux.HandleFunc("/api/daily-data", myHandler.GetDailyElectricityData)
	mux.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
	})
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173", "http://localhost"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
		Debug:            true,
	})
	cors := c.Handler(mux)
	port := ":8080"

	fmt.Println("Starting server")
	err = http.ListenAndServe(port, cors)

	fmt.Println(err)
	fmt.Println("Starting server")
	if err != nil {
		log.Fatal("Listenandserve", err)
	}
	fmt.Println(err)
}
