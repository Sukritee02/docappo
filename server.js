const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbconfig"); //importing this fill in server.js file
app.use(express.json()); //destructure
const userRoute = require("./routes/userRoute");
app.use("/api/user", userRoute);
const port = process.env.PORT || 5000;
// console.log(process.env.MONGO_URL);
app.listen(port, () => console.log(`node js server statred at ${port}`));
