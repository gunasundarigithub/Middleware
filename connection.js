'use strict';
 
const ADODB = require('node-adodb');
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=Shift Scheduler APP.accdb;');
 
connection
  .execute('INSERT INTO Team(Team_id, Team_name) VALUES ("Ent",6)')
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(error => {
    console.error(error);
  });
  connection
  .query('SELECT * FROM Team')
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(error => {
    console.error(error);
  });
 