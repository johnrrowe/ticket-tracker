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

func CreateUserIfNotExist(db *sql.DB, userID string, userName string, userEmail string) bool {
	query := fmt.Sprintf(
		`INSERT INTO users (id, name, email)
		 SELECT "%s", "%s", "%s" FROM DUAL
		 WHERE NOT EXISTS (SELECT * FROM users
			WHERE id="%s" LIMIT 1)`,
		userID, userName, userEmail, userID)

	stmt, err := db.Prepare(query)
	defer stmt.Close()
	printErr("CreateUser: error preparing SQL stmt", err)

	_, err = stmt.Exec()
	printErr("CreateUser: error executing SQL stmt", err)
	return (err == nil)
}
