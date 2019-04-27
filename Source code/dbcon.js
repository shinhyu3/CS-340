var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_saundema',
  password        : '9862',
  database        : 'cs340_saundema'
});
module.exports.pool = pool;
