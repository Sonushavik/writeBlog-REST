const express = require('express');
const app = express();
const PORT = 8080;
const { v7 : uuidv7, validate } = require('uuid');
const path = require('path');
var methodOverride = require('method-override')
const mysql = require("mysql2");
const { faker } = require('@faker-js/faker');
const { error } = require('console');
require('dotenv').config()

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'))

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'write_blog',
  password: process.env.db_password,
});

let getRandomBlog = () => {
  return[
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
    faker.lorem.sentence(), // Fake title
    faker.lorem.paragraphs(3), // Fake content
    faker.date.past(), // Fake publish date
  ]
}

// let q =" insert INTO blogs(id, username, email, password, title, content, published_at) values ?"

// let data = [];

// for(let i=1; i<10; i++){
//   data.push(getRandomBlog());
// }

// try {
//     connection.query(q, [data], (error, result) => {
//       if(error) throw error;
//       console.log(result);
//     })
// } catch (error) {
//   console.log(error);
// }


// let posts = [
//         {
//           id: uuidv7(),
//           username: "Sonu",
//           content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, cupiditate.",
//           timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
//           likes: Math.floor(Math.random() * 100), // Random likes count
//           retweets: Math.floor(Math.random() * 50), // Random retweets count
//           comments: [
//             {
//               id: uuidv7(),
//               username: "Raj",
//               content: "Nice post!",
//               timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
//             }
//           ]
//         },
//         {
//           id: uuidv7(),
//           username: "Shavik",
//           content: "Lorem ipsum, dolor sit amet.",
//           timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
//           likes: Math.floor(Math.random() * 100),
//           retweets: Math.floor(Math.random() * 50),
//           comments: [
//             {
//               id: uuidv7(),
//               username: "Amit",
//               content: "I totally agree!",
//               timestamp: new Date().toISOString(),
//             }
//           ]
//         },
//         {
//           id: uuidv7(),
//           username: "Anand",
//           content: "Lorem ipsum, dolor  adipisicing elit. Saepe, cupiditate.",
//           timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
//           likes: Math.floor(Math.random() * 100),
//           retweets: Math.floor(Math.random() * 50),
//           comments: [
//             {
//               id: uuidv7(),
//               username: "Pooja",
//               content: "Interesting thoughts!",
//               timestamp: new Date().toISOString(),
//             }
//           ]
//         }
//       ];

app.use((req, res, next) => {
  let q= "SELECT COUNT(*) AS total FROM blogs";
  try {
    connection.query(q, (error, result) => {
      if(error){
        console.log(error);
        res.locals.totalblog = 0;
      }else{
        res.locals.totalblog = result[0].total;
      }
      next();
    })
  } catch (error) {
    
  }
})

app.get('/', (req,res) => {
  // let q= "SELECT COUNT(*) FROM blogs";
  // try {
  //   connection.query(q, (error, result) => {
  //     if(error) throw error;
  //     let totalblog = result[0]["COUNT(*)"]
  //     res.render("home.ejs",{totalblog})
  //   })
  // } catch (error) {
  //   console.log(error);
  // }

  res.render("home.ejs");
})

app.get('/posts', (req,res) => {
        let q= "SELECT * FROM blogs";
        try {
          connection.query(q, (error, result) => {
            if(error) throw error;
            let posts = result;
            res.render("index.ejs", {posts});
          })
        } catch (error) {
          console.log(error);
        }
})

app.get('/posts/new', (req,res) => {
        res.render("newBlog.ejs");
})

app.post('/posts', (req,res) => {
        let {username,email, password, title, content} = req.body;
        let id = faker.string.uuid();

        let q = "INSERT INTO blogs(id,username,email, password, title, content) values(?,?,?,?,?,?)";
        values = [id,username,email, password, title, content];

        try {
          connection.query(q, values, (error, result) => {
            if(error) throw error;
            res.redirect('/posts') 
          })
        } catch (error) {
          console.log(error);
        }
})

app.get("/posts/:id", (req, res) => {
        const {id} = req.params;
        let q=  `select * from blogs where id = '${id}'`;
        try {
          connection.query(q, (error, result) => {
            if(error) throw error;
            let post = result[0];
            res.render("show.ejs", {post})
          })
        } catch (error) {
          console.log(error)
        }
})

app.patch("/posts/:id", (req,res) => {
        const {id} = req.params;
        let {newtitle,newcontent,editpass} = req.body
        let q =  `select * from blogs where id = '${id}'`;
        try {
          connection.query(q, (error, result) => {
            if(error) throw error;
            let blog = result[0];
            if(editpass != blog.password){
              res.send("Wrong password");
            }else{
              let q2 = `UPDATE blogs SET title = '${newtitle}' , content = '${newcontent}' where id = '${id}'`
              connection.query(q2, (error, result) => {
                if(error) throw error;
                console.log('blog updated successfully!!');
                res.redirect('/posts');
              })
            }
          })
        } catch (error) {
          console.log(error);
        }

})

app.get("/posts/:id/edit", (req,res) => {
  const {id} = req.params;
  let q=  `select * from blogs where id = '${id}'`;
  try {
    connection.query(q, (error, result) => {
      if(error) throw error;
      let post = result[0];
      res.render("edit.ejs", {post});
    })
  } catch (error) {
    console.log(error)
  }
})

app.delete("/posts/:id", (req,res) => {
        const {id} = req.params;
        let q= `DELETE FROM blogs WHERE id = '${id}'`;
        try {
          connection.query(q, (error, result) => {
            if(error) throw error;
            console.log('blog deleted')
            res.redirect('/posts');
          })
        } catch (error) {
          console.log(error);
        }
})

app.use((req, res, next) => {
  const error = new Error("Page Not Found");
  error.status = 404;
  next(error);
});

// Global Error Handling Middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render("error", { error });
});


app.listen(PORT, () => {
        console.log(`app is listening on the localhost:${PORT}`);
})