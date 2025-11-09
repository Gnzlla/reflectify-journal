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

//URL friendly name for the title:

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
