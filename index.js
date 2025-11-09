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

// used /GET to just showcase the page; not submit!
app.get("/post", (req, res)=>{
    res.render("post.ejs")
})

//When user submits a post
app.post("/post", (req, res) =>{
     const newPost = {
        postTitle : req.body["title"],
        postMessage: req.body["message"]
    }
    // Lists the new entry to the array
    posts.push(newPost);

    res.redirect("/");
})

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
});