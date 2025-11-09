import express from "express";
import bodyParser from "body-parser";
import slugify from "slugify";

const app = express();
const port = 3000;

let posts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { posts: posts});
});

// used /GET to just showcase the page; not submit!
app.get("/post", (req, res) => {
  res.render("post.ejs");
});

//When user submits a post
app.post("/post", (req, res) => {
  const newPost = {
    postTitle: req.body["title"],
    postMessage: req.body["message"],
    slugURL: slugify(req.body["title"], { replacement: "-", lower: true })
  };

  posts.push(newPost);
  console.log(newPost.slugURL);
  res.redirect("/");
});


app.get("/posts/:slugURL", (req, res)=>{
    // gets the dynamic part of the URL (the slug from /posts/:slugURL)
    const slug = req.params.slugURL;

    // searches the posts array for the post that has a matching slug
    const foundPost = posts.find(post => post.slugURL === slug);

    if (foundPost){
        res.render("content.ejs",{postURL: foundPost});
    } else{
        res.redirect("/")
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
