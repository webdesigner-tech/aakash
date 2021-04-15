const express = require("express");
const { expr } = require("jquery");
const path = require("path");
require("./db/conn");
const User = require("./models/usermessage");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

//setting the path
const staticpath = path.join(__dirname , "../public");
const templatepath = path.join(__dirname , "../templates/views");
const partialpath = path.join(__dirname , "../templates/partials");
// const staticportfoliopath = path.join(__dirname , "../public/portfolio");

//middleware
app.use('/css', express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq' ,express.static(path.join(__dirname,"../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false})) //jo bi form me fill kiiya usko get krne ke liye we extended property to false
app.use(express.static(staticpath))
app.set("view engine", "hbs");  //set view engine
app.set("views" ,templatepath);
hbs.registerPartials(partialpath);

// app.use(express.static(staticportfoliopath));

// routing
app.get("/",(req,res)=> {
  res.render("index");
})


// app.get("/contact",(req,res)=> {
//     res.render("contact");
//   })

  app.post("/contact" ,async(req,res)=> {
    try {
        // res.send(req.body)
          const userData = new User(req.body);
         await userData.save();
         res.status(201).render("index.hbs");
         
    } catch (error) {
       res.status(500).send(error);
      
    }  
  })


//server create
app.listen(port, ()=> { 
console.log(`server is running at port no ${port}`);

})