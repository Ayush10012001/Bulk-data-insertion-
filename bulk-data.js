const express= require("express");
const bodyParser = require('body-parser')
const {Pool,Client}= require("pg");
const app = express();
app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended:true}));

const connectionString = 'postgressql://postgres:Indiaasia@1@localhost:3000/postgres';
const client = new Client({
    connectionString: connectionString
});
client.connect();


//read
const getUsers = (req, res) => {
    client.query('SELECT * FROM company', (error, results) => {
      if (error) {
        console.log(error);
      }
      res.send(results.rows);
    })
  }
  app.get("/user",getUsers);



//add new user from JSON array(create)
const adduser = (req,res)=>{
    
    const arr= req.body;
    for(var i=0;i<arr.length;i++){
        console.log(arr[i].name);
    client.query(`insert into company values (${arr[i].id}, '${arr[i].name}', ${arr[i].age})`,(error,results)=>{
        if(error){
            console.log(error)
        }   
        
    })
}
res.send(`User added successfully with data`);
}           
app.post("/user",adduser);




app.listen(4000,()=>{
    console.log("connection established");
})