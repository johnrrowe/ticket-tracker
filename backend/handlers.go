package main

import (
	"database/sql"
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
)

// Product will contain information about VR experiences
type Product struct {
	ID          int
	Name        string
	Slug        string
	Description string
}

var ProductsHandler = func(db *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		payload, _ := json.Marshal(QueryProducts(db))

		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(payload))
	})
}

var AddFeedbackHandler = func(db *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		slug := vars["slug"]

		products := QueryProducts(db)

		var product Product
		for _, p := range products {
			if p.Slug == slug {
				product = p
			}
		}

		w.Header().Set("Content-Type", "application/json")
		if product.Slug != "" {
			payload, _ := json.Marshal(product)
			w.Write([]byte(payload))
		} else {
			http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		}
	})
}
