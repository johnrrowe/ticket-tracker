package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
)

func OpenDatabaseConn() *sql.DB {
	db, err := sql.Open("mysql", "john:password@(localhost)/products")
	if err != nil {
		fmt.Println(err)
	}

	err = db.Ping()
	if err != nil {
		fmt.Println(err)
	}
	return db
}

func printErr(err error) {
	if err != nil {
		fmt.Println(err)
	}
}

func QueryProducts(db *sql.DB) []Product {
	fmt.Println("Fetch Products!!")
	query := "SELECT * FROM products"
	stmt, err := db.Prepare(query)
	defer stmt.Close()
	printErr(err)

	result, err := stmt.Query()
	defer result.Close()
	printErr(err)

	products := []Product{}
	for result.Next() {
		var product Product
		err = result.Scan(&product.ID, &product.Name, &product.Slug, &product.Description)
		printErr(err)
		products = append(products, product)
	}
	return products
}
