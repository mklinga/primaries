const express = require("express");
const app = express();

const apiServer = require("./src/api");

app.use(express.static("public"));
app.use("/api", apiServer);

app.listen(3000, () => console.log("Running at :3000"));
