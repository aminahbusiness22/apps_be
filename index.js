 const express =require('express');
 const app = express();
 const mysql =require('mysql');
 const cors = require('cors')
 
 app.use(cors());
 app.use(express.json());

//  const db = mysql.createConnection({
//      user:"root",
//      host:"localhost",
//      password:"",
//      database:"employeesystem"
//  });

 const db = mysql.createConnection({
    user:"admin",
    host:"db-minah.cryf0o6tynzo.ap-northeast-1.rds.amazonaws.com",
    password:"Minah123",
    database:"employeesystem"
});

app.get("/", (req,res) =>
{
    res.json("Welcome")

}
);

 app.post("/create", (req,res) =>
     {
         const name = req.body.name;
         const age = req.body.age;
         const position = req.body.position;
         const country = req.body.country;
         const wage = req.body.wage;

         db.query('INSERT INTO employees (name,age,position,country,wage) VALUES (?,?,?,?,?)',
         [name,age,position,country,wage],
         (err,result)=>{
             if(err){
                 console.log(err)
             }else{
                 res.send("value inserted")
             }
         }
         )
     }
 );

 


 app.get("/employees", (req,res) =>
     {
         db.query('SELECT * FROM employees',
         (err,result)=>{
             if(err){
                 console.log(err)
             }else{
                 res.send(result);
             }
         }
         )
     }
 );


 app.put("/update", (req,res)=>{
     const id = req.body.id;
     const wage = req.body.wage;
     db.query("UPDATE employees SET  wage=? WHERE id=?",[wage,id] ,
     (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result);
        }
    }
     )
 }
 );

 app.listen(3000,()=>{
     console.log("your server is running");
 });