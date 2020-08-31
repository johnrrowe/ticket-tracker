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

func getUserIDFromReq(req *http.Request) string {
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
		userID := getUserIDFromReq(r)
		userInfo := struct {
			Name  string `json:"name"`
			Email string `json:"email"`
		}{}
		json.NewDecoder(r.Body).Decode(&userInfo)
		payload, _ := json.Marshal(CreateUserIfNotExist(db, userID, userInfo.Name, userInfo.Email))

		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(payload))
	})
}

var CreateProjectHandler = func(db *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		project := struct {
			Name string `json:"name"`
			Type string `json:"type"`
		}{}
		json.NewDecoder(r.Body).Decode(&project)
		println(project.Name)
		println(project.Type)
	})
}

// var ProductsHandler = func(db *sql.DB) http.Handler {
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		payload, _ := json.Marshal(QueryProducts(db))

// 		w.Header().Set("Content-Type", "application/json")
// 		w.Write([]byte(payload))
// 	})
// }
