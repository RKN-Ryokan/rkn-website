const path = require("path");
const express = require("express");

const app = express();

//Set paths
const publicPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./views");

//Set view engines
app.set("views", viewsPath);
app.set("view engine", "ejs");

app.use(express.static(publicPath, {
  etag: false,
  maxAge: '-1d',
  setHeaders: setCustomCacheControl
}));

function setCustomCacheControl(res, path) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
}

//Render pages
app.get("/", (req, res) => {
  res.render("pages/index");
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on port ${port}`);
});
