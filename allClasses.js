module.exports = function(){
    var express = require('express');
    var router = express.Router();

     function getAllClasses(res, mysql, context, complete){
        mysql.pool.query("SELECT Class_.Class_id, Class_.Class_name FROM Class_", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.allClasses = results;
            complete();
        });
    }


    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["allClasses.js"];
        var mysql = req.app.get('mysql');
        getAllClasses(res, mysql, context,complete);
		function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('allClasses', context);
            }
		}
    });


     router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Class_ (Class_name) VALUES (?)";
        var inserts = [req.body.Class_name];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/allClasses');
            }
        });
    });
	return router;
}();


  
