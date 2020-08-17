package main

// Import our dependencies. We'll use the standard HTTP library as well as the gorilla router for this app
import (
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"net/http"
)

func main() {

	// Configure JWT Middleware
	jwtMiddleware := ConfigJWTMiddleware("https://localhost:8080", "https://dev-jg--u462.us.auth0.com/")

	db := OpenDatabaseConn()

	r := mux.NewRouter()
	r.Handle("/products", jwtMiddleware.Handler(ProductsHandler(db))).Methods("GET")
	r.Handle("/products/{slug}/feedback", jwtMiddleware.Handler(AddFeedbackHandler(db))).Methods("POST")

	// For dev only - Set up CORS so React client can consume our API
	corsWrapper := cors.New(cors.Options{
		AllowedMethods: []string{"GET", "POST"},
		AllowedHeaders: []string{"Content-Type", "Origin", "Accept", "*"},
	})

	http.ListenAndServe(":8080", corsWrapper.Handler(r))
}
