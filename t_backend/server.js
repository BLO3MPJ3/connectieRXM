import express from "express"; //gebruik maken van express
import mongoose from "mongoose"; //gebruik maken van mongoose

const applicatie = express(); // aanmaken van backend applicatie

console.log("Start server"); //test melding

applicatie.use(express.json({ limit: "15mb", extended: true })); //post en aanvraag methode database met gebruik van json
applicatie.use(express.urlencoded({ limit: "15mb", extended: true })); //herkennen van strings en arrays in json

var port = 5000; //poort definieren
var url = "mongodb://127.0.0.1:27017/shop"; //route naar db

applicatie.listen(port, function () {
  console.log("Server is running on Port...: " + port);
}); //melding dat server actief is

export const connection = mongoose.createConnection(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}); //zet de connectie
