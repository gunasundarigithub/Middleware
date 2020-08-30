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

// app.get('/', (req, res) => {
//   res.send('Hello World, from express');
// });

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

const Shift_query = `SELECT * FROM Calender WHERE Team_id = '${req.query.team_id}' AND Month = '${req.query.month_number}' `;

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
const update_query = `Update Calender set Day = '${req.query.Day}' WHERE Employee_name ='${req.query.Employee_name}' AND Team_id =${req.query.team_id}`;
connection.query(update_query) 

res.send('updated successfully')
  
  .catch(error => {
   console.error(error);
  });

 });



//To get the shift after clicking on the previous month list, it will get details from 2 tables (schedule and shift)

 app.get('/getshift',(req,res)=>{

  console.log(req.query.team_id)
  console.log(req.query.month_name)
  
 // const Shift_query = `SELECT * FROM SCHEDULE WHERE Team_id = '${req.query.team_id}' AND Month = '${req.query.month_number}' `;
 const shift_query = `SELECT * FROM Calender WHERE Team_id = '${req.query.team_id}' AND Month_name = '${req.query.month_name}'`;
  

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

  console.log(req.body)

  //INSERT INTO Calender VALUES('August',2020,1,'Divya',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31)
    connection
  .execute(`INSERT INTO Calender VALUES (${req.body.Month},${req.body.Month_number},${req.body.year},${req.body.team_id},${req.body.Employee_name})`)
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(error => {
    console.error(error);
  });
    
    var new_schedule = {
      Month_name:req.query.Month,
      Year_num:req.query.year,
      Team_id:req.query.team_id,
      Employee_name:req.query.Employee_name,
      // Day2,Day3,Day4,Day5,Day6,Day7,Day8,Day9,Day10,
      // Day11,Day12,Day13,Day14,Day15,Day16,Day17,Day18,Day19,Day20,
      // Day21,Day23,Day23,Day24,Day25,Day26,Day27,Day28,Day29,Day30}

     };

    //  let insert_data= `INSERT INTO Calender (Month_name,Year_num,Team_id,Employee_name) VALUES (${req.body.Month},${req.body.year},${req.body.team_id},${req.body.Employee_name})`;
    // console.log(insert_data)
    //  connection.query(insert_data).then(data => {
    //   // console.log(JSON.stringify(data));
    //    //const result = JSON.stringify(data);
    //    console.log(data)

    //    res.send(data)
    //  })
    //  .catch(error => {
    //    console.error(error);
    //  });
    
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
 