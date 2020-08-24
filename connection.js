'use strict';
 var express = require("express")

 const util = require('util')

 var app = express();
 const cors = require('cors');

 const bodyparser = require('body-parser');

 app.use(bodyparser.json());

var handlebars = require("express-handlebars");
app.engine("handlebars", handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Setting up the cors config
app.use(cors());


const ADODB = require('node-adodb');
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=Shift_Scheduler.mdb;');
 
// connection
//   .execute('INSERT INTO Team(Team_id, Team_name) VALUES (8,"Anna")')
//   .then(data => {
//     console.log(JSON.stringify(data, null, 2));
//   })
//   .catch(error => {
//     console.error(error);
//   });

app.get('/', (req, res) => {
  res.send('Hello World, from express');
});

app.get('/selectQuery',(req,res)=>{

console.log(req.query.test)

const query = 'Select * FROM  team';  

 //res.send('Hello World, from sadsadsadsexpress');
  connection
  .query(query)
  .then(data => {
   // console.log(JSON.stringify(data));
    const result = JSON.stringify(data);
    console.log(data)
    res.send(data)
  })
  .catch(error => {
    console.error(error);
  });

});


//To get shift schedule of selected team with respect to month

app.get('/getcurrentshift',(req,res)=>{

console.log(req.query.team_id)
console.log(req.query.month_number)

const Shift_query = `SELECT * FROM SCHEDULE WHERE Team_id = '${req.query.team_id}' AND Month = '${req.query.month_number}' `;

  connection.query(Shift_query).then(data => {
   // console.log(JSON.stringify(data));
    const result = JSON.stringify(data);
    console.log(data)
    res.send(data)
  })
  .catch(error => {
    console.error(error);
  });

});

//To update the shift after clicking on submit
app.put('/updateshift',(req,res)=>{

console.log(req.query)
console.log(req.query.shift)
const update_query = `Update Schedule set shift = '${req.query.shift}', General_shift_hours = '${req.query.g_hours}',Morn_shift_hours = '${req.query.M_hours}',Night_shift_hours = '${req.query.N_hours}',Leave_hours = '${req.query.L_hours}',T_H_hours = '${req.query.total_hours}' WHERE Employee_name ='${req.query.Employee_name}'`;
connection.query(update_query) 

res.send('updated successfully')
  
  .catch(error => {
   console.error(error);
  });

 });



//To get the shift after clicking on the previous month list, it will get details from 2 tables (schedule and shift)

 app.get('/getshift',(req,res)=>{

  console.log(req.query.team_id)
  console.log(req.query.month_number)
  
 // const Shift_query = `SELECT * FROM SCHEDULE WHERE Team_id = '${req.query.team_id}' AND Month = '${req.query.month_number}' `;
 const shift_query = `SELECT * FROM Schedule t1 INNER JOIN Shift t2 ON t1.Team_id = t2.Team_id
 WHERE t1.Team_id = '${req.query.team_id}' AND t2.Month = '${req.query.month_number}'`;
  

    connection.query(shift_query).then(data => {
     // console.log(JSON.stringify(data));
      const result = JSON.stringify(data);
      console.log(data)
      res.send(data)
    })
    .catch(error => {
      console.error(error);
    });
    
  });

// To get the employee name list 

app.get('/getemployee',(req,res)=>{

  console.log(req.query.team_id)

  
  const Shift_query =`SELECT * FROM Employee where Team_id=${req.query.team_id}`;
  
    connection.query(Shift_query).then(data => {
     // console.log(JSON.stringify(data));
      const result = JSON.stringify(data);
      console.log(data)
      res.send(data)
    })
    .catch(error => {
      console.error(error);
    });
  
  });

// To insert in to the schedule table if it is first time shift update

  app.post('/postschedule',(req,res)=>{

    console.log(req.query.team_id)
    console.log(req.query.month_number)
    
    const insert_query = `INSERT INTO SCHEDULE (Date_field, Employee_name, shift, General_shift_hours, Morn_shfit_hours, Night_shift_hours, Leave_hours, Total_hours, Team_id, Month) VALUES ('cellvalues_date',cellvalues_employee,cellvalues_shift,cellvalues_gsh,cellvalues_msh,cellvalues_nsh,cellvalues_leavehours,cellvalues_thours,team_id,month_number) `;
    
    connection.query(insert_query) 

    res.send('record inserted successfully')
  
  .catch(error => {
   console.error(error);
  });

 });

var port = 3260;

app.listen(port, function(){
	console.log("CORS-enabled web server is now running on port : " + port);
});

// 'SELECT * FROM Employee INNER JOIN Team ON Team.Team_id=Employee.Team_id')

  // connection
  // .query('SELECT * FROM Shift')
  // .then(data => {
  //   console.log(JSON.stringify(data));
  // })
  // .catch(error => {
  //   console.error(error);
  // });
 