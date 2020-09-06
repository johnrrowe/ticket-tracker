package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
)

func OpenDatabaseConn() *sql.DB {
	db, err := sql.Open("mysql", "john:password@(localhost)/ticket_tracker")
	if err != nil {
		fmt.Println(err)
	}

	err = db.Ping()
	if err != nil {
		fmt.Println(err)
	}
	return db
}

func CreateUserIfNotExist(db *sql.DB, info user) {
	q := `INSERT INTO users (id, name, email)
		  SELECT ?, ?, ? FROM DUAL
		  WHERE NOT EXISTS (SELECT * FROM users
			WHERE id=? LIMIT 1)`

	_, err := db.Query(q, info.ID, info.Name, info.Email, info.ID)
	printErr("CreateUser: error querying db", err)
}

func CreateProject(db *sql.DB, info project) bool {
	q := `INSERT INTO projects (name, lead, type)
		  VALUES (?, ?, ?)`
	stmt, err := db.Prepare(q)
	defer stmt.Close()
	printErr("CreateProject: error preparing query", err)
	result, err := stmt.Exec(info.Name, info.Lead, info.Type)
	printErr("CreateProject: error executing stmt", err)

	q = `INSERT INTO project_users (user_id, project_id)
		 VALUES (?, ?)`
	lastID, err := result.LastInsertId()
	printErr("CreateProject: error retrieving ID", err)

	_, err = db.Query(q, info.Lead, lastID)
	printErr("CreateProject: error inserting project_user", err)

	return (err == nil)
}

func GetProjects(db *sql.DB, userID string) []project {
	q := `SELECT projects.id, projects.name, users.name, type
		  FROM users 
		  JOIN (
			SELECT id, name, lead, type
			FROM projects
			JOIN project_users
				ON id = project_id
				WHERE user_id = ?
		  ) AS projects
		  	ON users.id = lead`

	rows, err := db.Query(q, userID)
	defer rows.Close()
	printErr("GetProjects: error querying projects", err)

	var projects []project
	for rows.Next() {
		var p project
		err = rows.Scan(&p.ID, &p.Name, &p.Lead, &p.Type)
		printErr("GetProjects: error scanning row", err)

		projects = append(projects, p)
	}
	err = rows.Err()
	printErr("GetProjects", err)

	return projects
}
