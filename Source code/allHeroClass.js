
module.exports = function(){
    var express = require('express');
    var router = express.Router();
    
	
    function getHeroes(res, mysql, context,complete){
        mysql.pool.query("SELECT Hero_id as H_id, Hero_name as H_name FROM Hero", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.hero = results;
	    complete();
        });
    }
    
	 function getAllClasses(res, mysql, context, complete){
        mysql.pool.query("SELECT Class_id as C_id, Class_name as C_name FROM Class_", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.Hclass = results;
            complete();
        });
    }

	function getHeroClass(res, mysql, context, complete){
        mysql.pool.query("SELECT Hero.Hero_id, Hero.Hero_name, Class_.Class_name, Class_.Class_id FROM Hero INNER JOIN Hero_class ON Hero_class.Hero_id = Hero.Hero_id INNER JOIN Class_ ON Class_.Class_id = Hero_class.Class_id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.HCresults = results;
            complete();
        });
    }
	
	
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectGameID.js", "delete.js"];
        var mysql = req.app.get('mysql');
		getHeroes(res, mysql, context,complete);
		getAllClasses(res, mysql, context, complete);
		getHeroClass(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('allHeroClass', context);
            }
        }
    });
   
    router.delete('/hid/:hid/cid/:cid', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Hero_class WHERE Hero_id = ? AND Class_id = ?";
        var inserts = [req.params.hid, req.params.cid];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })
   
   
    
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Hero_class (Hero_id, Class_id) VALUES (?, ?)";
        var inserts = [req.body.Hero_id, req.body.Class_id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/allHeroClass');
            }
        });
    });
	return router;
}();