import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./App.module.css";

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
      pr_name: "Courgette geel",
      pr_price: 1,
      pr_place: "Maastricht",
      pr_description: "lekkere courgettes",
    });
  };

  return (
    <>
      <div className={classes.tabel1}>
        <div className={classes.hoofd}>
          <div className={classes.cell1}>Categorie</div>
          <div className={classes.cell1}>Naam product</div>
          <div className={classes.cell1}>Prijs</div>
          <div className={classes.cell1}>Plaats</div>
          <div className={classes.cell1}>Omschrijving</div>
        </div>
      </div>

      {items.map((item) => {
        return (
          <div>
            <div className={classes.tabel1}>
              <div className={classes.head}>
                <div>
                  <h1 key={item._id}> </h1>
                </div>
                <div className={classes.cell}>{item.categorie}</div>
                <div className={classes.cell}>{item.pr_name}</div>
                <div className={classes.cell}>{item.pr_price}</div>
                <div className={classes.cell}>{item.pr_place}</div>
                <div className={classes.cell}>{item.pr_description}</div>
              </div>
            </div>
          </div>
        );
      })}

      <br />
      <form className={classes.form}>
        <label>
          Naam Product:
          <input type="text" />
        </label>
        <br />
        <label>
          Prijs:
          <input type="number" />
        </label>
        <br />
        <label>
          Plaats:
          <input type="text" />
        </label>
        <br />
        <label>
          Omschrijving:
          <input type="text" />
        </label>
      </form>
      <br />
      <button onClick={handleClick} className={classes.form}>
        Nieuwe Product!
      </button>
    </>
  );
};

export default Items;
