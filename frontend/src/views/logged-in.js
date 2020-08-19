import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLoggedIn } from "../components/nav-bar.js";
import { GetProducts } from "../components/query.js";

const LoggedIn = () => {
  const [products, setProducts] = useState([]);

  const { getAccessTokenSilently, loading, user } = useAuth0();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = await getAccessTokenSilently();
      const responseData = await GetProducts(token);
      setProducts(responseData);
    };
    fetchProducts();
  }, [getAccessTokenSilently]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavLoggedIn />
      <div className="App jumbotron text-center">
        <h1>Ticket Tracker</h1>
        <p>
          Hi, {user.name}! Below you'll find the latest games that need
          feedback. Please provide honest feedback so developers can make the
          best games.
        </p>
        <div className="row">
          {products.map(function (product, index) {
            return (
              <div className="col-sm-4" key={index}>
                <div className="card mb-4">
                  <div className="card-header">{product.Name}</div>
                  <div className="card-body">{product.Description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoggedIn;
