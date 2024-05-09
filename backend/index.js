require("dotenv").config();
const { Client } = require("pg");
const path = require("path");
const express = require("express");
const app = express();

// Import
const blogRoutes = require("./routes/blogRoutes");
// const blogRouteHandler = blogRoutes(Client);
const galleryRoutes = require("./routes/galleryRoutes");
const logInRoutes = require("./routes/logInRoutes");

const client = new Client({
  connectionString: process.env.PGURI,
});


// connects to database
client.connect();


app.use(express.static(path.join(path.resolve(), "dist")));

// app.get("/api", (_request, response) => {
//   response.send({ hello: "World" });
// });

// app.get("/blog", (_request, response) => {
//  response.send({ blog: "blog" });
// });

// Use
app.use("/blog", blogRoutes);
app.use("/gallery", galleryRoutes);
app.use("/login", logInRoutes);

app.listen(3001, () => {
  console.log("Redo på http://localhost:3001/");
});

// app.listen(3000, () => {
//   console.log("Redo på http://localhost:3000/");
// });
