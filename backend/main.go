package main

// Import our dependencies. We'll use the standard HTTP library as well as the gorilla router for this app
import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"net/http"
)

func printErr(prefix string, err error) {
	if err != nil {
		fmt.Println(fmt.Errorf("%s: %w", prefix, err))
	}
}

func main() {

	// Configure JWT Middleware
	jwtMiddleware := ConfigJWTMiddleware("https://localhost:8080", "https://dev-jg--u462.us.auth0.com/")

	db := OpenDatabaseConn()
	defer db.Close()

	r := mux.NewRouter()

	// user handlers
	r.Handle("/add_user", jwtMiddleware.Handler(AddUserHandler(db))).Methods("POST")

	// project handlers
	r.Handle("/create_project", jwtMiddleware.Handler(CreateProjectHandler(db))).Methods("POST")
	r.Handle("/get_projects", jwtMiddleware.Handler(GetProjectsHandler(db))).Methods("GET")

	// sprint handlers
	r.Handle("/create_sprint", jwtMiddleware.Handler(CreateSprintHandler(db))).Methods("POST")
	r.Handle("/get_sprints", jwtMiddleware.Handler(GetSprintsHandler(db))).Methods("GET")
	r.Handle("/start_sprint", jwtMiddleware.Handler(StartSprintHandler(db))).Methods("POST")
	r.Handle("/get_active", jwtMiddleware.Handler(GetActiveSprintHandler(db))).Methods("GET")

	// job handlers
	r.Handle("/get_statuses", jwtMiddleware.Handler(GetJobStatusesHandler(db))).Methods("GET")

	// For dev only - Set up CORS so React client can consume our API
	corsWrapper := cors.New(cors.Options{
		AllowedMethods: []string{"GET", "POST"},
		AllowedHeaders: []string{"Content-Type", "Origin", "Accept", "*"},
	})
	http.ListenAndServe(":8080", corsWrapper.Handler(r))
}
