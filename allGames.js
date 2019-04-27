module.exports = function(){
    var express = require('express');
    var router = express.Router();

     function getAllGames(res, mysql, context, complete){
        mysql.pool.query("SELECT Game_id, Game_name FROM Originating_game", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.allGames = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete.js", "setNULL.js"];
        var mysql = req.app.get('mysql');
        getAllGames(res, mysql, context,complete);
		function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('allGames', context);
            }
		}
    });

	router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Originating_game WHERE Game_id = ?";
        var inserts = [req.params.id];
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
        var sql = "INSERT INTO Originating_game (Originating_game.Game_name) VALUES (?)";
        var inserts = [req.body.Game_name];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/allGames');
            }
        });
    });
	return router;
}();
