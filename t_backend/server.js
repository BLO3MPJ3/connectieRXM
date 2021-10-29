import express from "express"; //gebruik maken van express
import mongoose from "mongoose"; //gebruik maken van mongoose

const applicatie = express(); // aanmaken van backend applicatie

console.log("Start server"); //test melding

applicatie.use(express.json({ limit: "15mb", extended: true })); //post en aanvraag methode database met gebruik van json
applicatie.use(express.urlencoded({ limit: "15mb", extended: true })); //herkennen van strings en arrays in json

applicatie.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type,Accept");
  next();
}); // voeg header toe om CORS beveiliging te omzeilen

var port = 5000; //poort definieren
var url = "mongodb://127.0.0.1:27017/shop"; //route naar db

export const connection = mongoose.createConnection(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}); //zet de connectie

const schema = new mongoose.Schema({
  categorie: String,
  pr_name: String,
  pr_price: Number,
  pr_place: String,
  pr_description: String,
});

const Product = connection.model("product", schema); // maakt collectie items aan in db

applicatie.get("/allproducts", async function (req, res) {
  console.log("Get all products");

  const result = await Product.find();

  res.json(result);
  console.log(result);
}); //alle resultaten van de database ophalen

applicatie.post("/createproduct", async (req, res) => {
  const categorie = req.body.categorie;
  const pr_name = req.body.pr_name;
  const pr_price = req.body.pr_price;
  const pr_place = req.body.pr_place;
  const pr_description = req.body.pr_description;

  const newProduct = new Product({
    categorie,
    pr_name,
    pr_price,
    pr_place,
    pr_description,
  });

  const result = await newProduct.save();

  res.json(result);
}); // hiermee verzend je nieuwe waarden in json naar de db en slaat dit op

applicatie.listen(port, function () {
  console.log("Server is running on Port...: " + port);
}); //melding dat server actief is
