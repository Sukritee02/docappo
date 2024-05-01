const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);
const connection = mongoose.connection;//connect to the mongodb mongourl
// verify weather the fuction is verified or not for that we will use on                              
connection.on("connected", () => {
  console.log("MongoDB connection is sucessful");                                      
});

connection.on(("error"),
  (error) => {
    console.log("ERROR MongoDB is connection", error);
});

module.exports = mongoose;
// importing this fill in server.js file