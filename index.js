import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts =[]

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) =>{
    res.render("index.ejs", {posts: posts});
});

app.get("/post", (req, res)=>{
    res.render("post.ejs")
})

app.post("/post", (req, res) =>{
     const newPost = {
        postTitle : req.body["title"],
        postMessage: req.body["message"]
    }
    posts.push(newPost);
    console.log(req.body)
    console.log("Posts in the array: ", posts)
    res.redirect("/");
})

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
});