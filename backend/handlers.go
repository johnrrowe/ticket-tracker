package main

import (
	"database/sql"
	"encoding/base64"
	"encoding/json"
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

type user struct {
	ID    string
	Name  string `json:"name"`
	Email string `json:"email"`
}

type project struct {
	Name string `json:"name"`
	Type string `json:"type"`
	Lead string `json:"lead"`
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
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		userID := getUserIDFromReq(req)
		user := user{userID, "", ""}
		json.NewDecoder(req.Body).Decode(&user)
		CreateUserIfNotExist(db, user)
	})
}

var CreateProjectHandler = func(db *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		project := project{"", "", getUserIDFromReq(req)}
		json.NewDecoder(req.Body).Decode(&project)
		CreateProject(db, project)
	})
}

var GetProjectsHandler = func(db *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		userID := getUserIDFromReq(req)
		projects := GetProjects(db, userID)

		payload, err := json.Marshal(projects)
		printErr("GetProjects: error marshalling projects", err)

		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(payload))
	})
}
