import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const _dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) =>{
    res.render("index.ejs")
});

app.post("/input", (req, res) =>{
    res.render("input-page.ejs")
})

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
});