const express = require('express');
const app = express();
const PORT = 8080;
const { v7 : uuidv7 } = require('uuid');
const path = require('path');
var methodOverride = require('method-override')


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'))

let posts = [
        {
          id: uuidv7(),
          username: "Sonu",
          content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, cupiditate.",
          timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
          likes: Math.floor(Math.random() * 100), // Random likes count
          retweets: Math.floor(Math.random() * 50), // Random retweets count
          comments: [
            {
              id: uuidv7(),
              username: "Raj",
              content: "Nice post!",
              timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
            }
          ]
        },
        {
          id: uuidv7(),
          username: "Shavik",
          content: "Lorem ipsum, dolor sit amet.",
          timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
          likes: Math.floor(Math.random() * 100),
          retweets: Math.floor(Math.random() * 50),
          comments: [
            {
              id: uuidv7(),
              username: "Amit",
              content: "I totally agree!",
              timestamp: new Date().toISOString(),
            }
          ]
        },
        {
          id: uuidv7(),
          username: "Anand",
          content: "Lorem ipsum, dolor  adipisicing elit. Saepe, cupiditate.",
          timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
          likes: Math.floor(Math.random() * 100),
          retweets: Math.floor(Math.random() * 50),
          comments: [
            {
              id: uuidv7(),
              username: "Pooja",
              content: "Interesting thoughts!",
              timestamp: new Date().toISOString(),
            }
          ]
        }
      ];
      

app.get('/posts', (req,res) => {
        res.render("index.ejs", {posts});
})

app.get('/posts/new', (req,res) => {
        res.render("newBlog.ejs");
})

app.post('/posts', (req,res) => {
        let {username, content} = req.body;
        const id = uuidv7();
        let timestamp= new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        const comments = []
        let newPost = {id,username, content, timestamp, comments}
         posts.push(newPost);
        res.redirect('/posts') 
})

app.get("/posts/:id", (req, res) => {
        const {id} = req.params;
        const post = posts.find((p) => p.id === id);
        res.render("show.ejs", {post})
})

app.patch("/posts/:id", (req,res) => {
        const {id} = req.params;
        let newContent = req.body.content;
        const post = posts.find((p) => p.id === id);
        post.content= newContent;
        res.redirect("/posts")
})

app.get("/posts/:id/edit", (req,res) => {
        const {id} = req.params;
        const post = posts.find((p) => p.id === id);
        res.render("edit.ejs", {post});
})

app.delete("/posts/:id", (req,res) => {
        const {id} = req.params;
        posts = posts.filter((p) => p.id !== id);
        res.redirect("/posts")
})

app.listen(PORT, () => {
        console.log(`app is listening on the localhost:${PORT}`);
})