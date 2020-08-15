import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ExternalAPI = () => {
  const url = `/hello`;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(url).then((response) => {
      console.log(response);
      setProduct(response.data);
    });
  }, [url]);

  return (
    <div>
      <h1>External API</h1>
      <h1>{product ? product : null}</h1>
    </div>
  );
};

export default ExternalAPI;
