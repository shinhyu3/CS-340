module.exports = function(){
    var express = require('express');
    var router = express.Router();

     function getAllLevels(res, mysql, context, complete){
        mysql.pool.query("SELECT Level_.Level_id, Level_.Level_name, Level_.Objectives, Originating_game.Game_name as game FROM Level_ INNER JOIN Originating_game ON Originating_game.Game_id = Level_.Game_id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.allLevels = results;
            complete();
        });
    }

	  
   function getGames(res, mysql, context,complete){
        mysql.pool.query("SELECT Game_id as id, Game_name as name FROM Originating_game", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.game = results;
	    complete();
        });
    }
	
	
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getAllLevels(res, mysql, context,complete);
		getGames(res, mysql, context,complete);
		function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('allLevels', context);
            }
		}
    });

    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Level_ (Level_name, Objectives, Game_id) VALUES (?, ?, ?)";
        var inserts = [req.body.Level_name, req.body.Objectives, req.body.O_game];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/allLevels');
            }
        });
    });
	return router;
}();

  
    