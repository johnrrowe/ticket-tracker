package main

import (
	"database/sql"
	"encoding/base64"
	"encoding/json"
	// "github.com/gorilla/mux"
	"net/http"
	"strings"
)

type authHeader struct {
	Iss   string    `json:"iss"`
	Sub   string    `json:"sub"`
	Aud   [2]string `json:"aud"`
	Iat   int       `json:"iat"`
	Exp   int       `json:"exp"`
	Azp   string    `json:"azp"`
	Scope string    `json:"scope"`
}

// Product will contain information about VR experiences
type Product struct {
	ID          int
	Name        string
	Slug        string
	Description string
}

func getUserInfoFromReq(req *http.Request) string {
	dataB64 := strings.Split(req.Header.Get("authorization"), ".")[1]
	data, err := base64.StdEncoding.DecodeString(dataB64)
	printErr("GetUserInfo: error decoding authorization", err)
	var auth authHeader
	err = json.Unmarshal([]byte(string(data)), &auth)
	printErr("GetUserInfo: error unmarshalling authHeader", err)
	return strings.Split(auth.Sub, "|")[1]
}

var AddUserHandler = func(db *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		userID := getUserInfoFromReq(r)
		payload, _ := json.Marshal(CreateUserIfNotExist(db, userID, "name"))

		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(payload))
	})
}

// var ProductsHandler = func(db *sql.DB) http.Handler {
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		payload, _ := json.Marshal(QueryProducts(db))

// 		w.Header().Set("Content-Type", "application/json")
// 		w.Write([]byte(payload))
// 	})
// }

// var AddFeedbackHandler = func(db *sql.DB) http.Handler {
// 	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
// 		vars := mux.Vars(req)
// 		slug := vars["slug"]

// 		products := QueryProducts(db)

// 		var product Product
// 		for _, p := range products {
// 			if p.Slug == slug {
// 				product = p
// 			}
// 		}

// 		w.Header().Set("Content-Type", "application/json")
// 		if product.Slug != "" {
// 			payload, _ := json.Marshal(product)
// 			w.Write([]byte(payload))
// 		} else {
// 			http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
// 		}
// 	})
// }
