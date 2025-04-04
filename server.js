const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const cors = require('cors');

const morgan = require("morgan");

const dotenv = require("dotenv");
const session = require('express-session');



const PORT = process.env.PORT || 5000;
dotenv.config();

const app = express();
const router = express.Router();
const productsRoutes = require("./routes/product");
const visitRoutes = require("./routes/visit");
const categoryRoutes = require("./routes/category");
const reviewRoutes = require("./routes/review");
const paymentRoutes = require("./routes/payment");

app.use(session({
  secret: 'mmmmm',
  resave: false,
  saveUninitialized: false
}));
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", productsRoutes);

app.use("/api", visitRoutes);

app.use("/api", reviewRoutes);
app.use("/api", categoryRoutes);

app.use("/api", paymentRoutes);



//connect to mongodb
 
mongoose
  .connect("mongodb+srv://toluarejibadey:ajib@cluster0.y5zbkln.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => console.log(err));


//const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>  console.log(`Listening on port ${PORT}`));
app.get("/h", (req, res) => {
  res.send("Successful response.");
});
app.use("/", router);
// get data for charge by id

//app.listen(port, function() {
//console.log(`api running on port ${port}`);
//});