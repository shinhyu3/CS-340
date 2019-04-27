module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getAllSpecialAbilities(res, mysql, context, complete){
        mysql.pool.query("SELECT Special_ability.Special_ability_id, Special_ability.Special_name, Hero.Hero_name FROM Special_ability INNER JOIN Hero ON Hero.Hero_id = Special_ability.Hero_id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.allSpecialAbilities = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getAllSpecialAbilities(res, mysql, context,complete);
		function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('allSpecialAbilities', context);
            }
		}
    });
    
    
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Hero (Hero_name) VALUES (?)";
        var inserts = [req.body.Hero_name_entry];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }
        });
		var mysql1 = req.app.get('mysql');
        var sql1 = "INSERT INTO Special_ability (Special_name) VALUES (?)";
        var inserts1 = [req.body.Special_ability_name];
        sql1 = mysql1.pool.query(sql1,inserts1,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/allSpecialAbilities');
            }
        });
    });
	return router;
}();
  
