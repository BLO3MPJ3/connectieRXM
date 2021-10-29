import React, { useState, useEffect } from "react";
import axios from "axios";

const Items = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/allproducts").then((res) => {
      setItems(res.data);
    });
  }, []);

  const handleClick = () => {
    axios.post("http://localhost:5000/createproduct", {
      categorie: "groenten",
      pr_name: "Wilde tomaat",
      pr_price: 7,
      pr_place: "Meerssen",
      pr_description: "bionische tomaten",
    });
  };

  return (
    <>
      {items.map((item) => {
        return <h1 key={item._id}>{item.pr_name}</h1>;
      })}
      <button onClick={handleClick}>Nieuwe Product!</button>
    </>
  );
};

export default Items;
