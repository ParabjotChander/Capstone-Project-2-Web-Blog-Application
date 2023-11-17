import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;
var blogs = [];
var map = new Map();
var count = 0;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) =>{
  res.render("index.ejs");
});

app.post("/submit", (req, res) =>{
  const msg = req.body["message"];
  blogs.push(msg);
  map.set(count, msg);
  count++;
  var data = { list: blogs}
  res.render("index.ejs", data);
});

app.post("/edit", (req, res) =>{
  
  var msg_2 = req.body["edit_message"];
  var og = req.body["og_msg"]
  
  for(let i = 0; i < blogs.length; i++){
   if(blogs[i].trim() == og.trim()){
      console.log(og + blogs[i]);
      blogs[i] = msg_2;
      break;
    }
  }
  
  var data = {list: blogs};
  
  res.render("index.ejs", data);
});

app.post("/delete", (req, res) => {

  const delete_msg = req.body["delete_message"];

  const index = blogs.indexOf(delete_msg.trim());
  
  if (index > -1) { 
    blogs.splice(index, 1); 
  }
  
  var data = {list: blogs};
  res.render("index.ejs", data);
});

app.listen(port, () =>{
  console.log(`App listening on port ${port}`);
});