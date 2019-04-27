module.exports = function(){
    var express = require('express');
    var router = express.Router();

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


    function getHeroesByGame(req, res, mysql, context,complete){
        var query = "SELECT Hero.Hero_id AS id, Hero_name, Start_damage, Originating_game.Game_name AS game FROM Hero INNER JOIN Originating_game ON Hero.Game_id = Originating_game.Game_id WHERE Hero.Game_id = ?";
    console.log(req.params)
    var inserts = [req.params.game]
    mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.filterByGame = results;
	    complete();
        });
    }

	
	    function getHeroes(res, mysql, context,complete){
        mysql.pool.query("SELECT Hero.Hero_id AS id, Hero_name, Start_damage, Originating_game.Game_name AS game FROM Hero INNER JOIN Originating_game ON Hero.Game_id = Originating_game.Game_id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.filterByGame = results;
	    complete();
        });
    }
	
	

 router.get('/filter/:game', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete.js","filterHeroes.js", "selectGameID.js"];
        var mysql = req.app.get('mysql');
        getHeroesByGame(req, res, mysql, context, complete);
        getGames(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('filterByGame', context);
            }

        }
    });

    
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete.js", "filterHeroes.js", "selectGameID.js"];
        var mysql = req.app.get('mysql');
        getHeroes(res, mysql, context,complete);
		getGames(res, mysql, context, complete);
		function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('filterByGame', context);
            }
		}
    });
	
	return router;
}();
