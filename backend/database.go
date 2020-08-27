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

func CreateUserIfNotExist(db *sql.DB, user_id string, user_name string) bool {
	query := fmt.Sprintf(
		`INSERT INTO users (id, name)
		 SELECT "%s", "%s" FROM DUAL
		 WHERE NOT EXISTS (SELECT * FROM users
			WHERE id="%s" LIMIT 1)`,
		user_id, user_name, user_id)

	stmt, err := db.Prepare(query)
	defer stmt.Close()
	printErr("CreateUser: error preparing SQL stmt", err)

	_, err = stmt.Exec()
	printErr("CreateUser: error executing SQL stmt", err)
	return (err == nil)
}
