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
	q := `SELECT projects.id, projects.name, p_user.name, type
		  FROM projects
		  JOIN (
		  	SELECT project_id, name
		  	FROM users
		  	JOIN project_users
				ON id = user_id
				WHERE user_id = ?
		  ) AS p_user
		  ON projects.id = p_user.project_id`

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

func CreateSprint(db *sql.DB, info sprint) bool {
	q := `INSERT INTO sprints (project_id, name)
		  VALUES (?, ?)`
	stmt, err := db.Prepare(q)
	defer stmt.Close()
	printErr("CreateSprint: error preparing query", err)
	result, err := stmt.Exec(info.ProjectID, info.Name)
	printErr("CreateSprint: error executing stmt", err)

	q = `INSERT INTO job_status (sprint_id, name)
		 VALUES (?, ?)`
	lastID, err := result.LastInsertId()
	printErr("CreateSprint: error retrieving ID", err)

	_, err = db.Query(q, lastID, "To Do")
	printErr("CreateSprint: error inserting job_status", err)
	_, err = db.Query(q, lastID, "In Progress")
	printErr("CreateSprint: error inserting job_status", err)
	_, err = db.Query(q, lastID, "Done")
	printErr("CreateSprint: error inserting job_status", err)

	return (err == nil)
}

func GetSprints(db *sql.DB, projectID string) []sprint {
	q := `SELECT name, project_id
		  FROM sprints
		  WHERE project_id = ?`

	rows, err := db.Query(q, projectID)
	defer rows.Close()
	printErr("GetSprints: error querying sprints", err)

	var sprints []sprint
	for rows.Next() {
		var s sprint
		err = rows.Scan(&s.Name, &s.ProjectID)
		printErr("GetSprints: error scanning row", err)

		sprints = append(sprints, s)
	}
	err = rows.Err()
	printErr("GetSprints", err)

	return sprints
}
