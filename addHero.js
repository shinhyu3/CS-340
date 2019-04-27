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
            context.addHero = results;
			
	    complete();
        });
    }

    function getHeroes(res, mysql, context,complete){
        mysql.pool.query("SELECT Hero.Hero_id, Hero.Hero_name, Hero.Start_damage, Originating_game.Game_name as Game FROM Hero LEFT JOIN Originating_game ON Hero.Game_id = Originating_game.Game_id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.addHero = results;
	    complete();
        });
    }

    function getPerson(res, mysql, context, id, complete){
	var sql = "SELECT Hero.Hero_id as id, Hero.Hero_name, Hero.Start_damage, Hero.Game_id, Special_ability.Special_name FROM Hero INNER JOIN Special_ability ON Special_ability.Hero_id = Hero.Hero_id WHERE Hero.Hero_id = ?";
	var inserts = [id];
	mysql.pool.query(sql, inserts, function(error, results, fields){
	    if(error){
	        res.write(JSON.stringify(error));
		res.end();
	    }
	    context.person = results[0];
	    complete();
	});
   }
    
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete.js","selectGameID.js"];
        var mysql = req.app.get('mysql');
        getHeroes(res, mysql, context,complete);
		getGames(res, mysql, context, complete);
		function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('addHero', context);
            }
		}
    });

    //Takes you to link updateHero where you display 1 hero to update
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectGameID.js", "updateHero.js"];
        var mysql = req.app.get('mysql');
        getPerson(res, mysql, context, req.params.id, complete);
        getGames(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('updateHero', context);
            }
        }
    });

    router.post('/', function(req, res){
		if (req.body.game == 'none'){
				req.body.game = null;
			}
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Hero (Hero.Hero_name, Hero.Start_damage, Hero.Game_id) VALUES (?, ?, ?)";
        var inserts = [req.body.Hero_name, req.body.Start_damage, req.body.game];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
				var mysql1 = req.app.get('mysql');
				var sql1 = "Select Hero_id as hid FROM Hero WHERE Hero_name = ?";
		
				var inserts1 = [req.body.Hero_name];
		
				sql1 = mysql1.pool.query(sql1,inserts1,function(error, results, fields){
				if(error){
					console.log(JSON.stringify(error))
					res.write(JSON.stringify(error));
					res.end();
				} else {
					var sql2 = "INSERT INTO Special_ability (Special_name, Hero_id) VALUES (?,?)"
					var inserts2 = [req.body.Special_ability, results[0].hid]
					sql2 = mysql1.pool.query(sql2,inserts2,function(error, results, fields){
					if(error){
						console.log(JSON.stringify(error))
						res.write(JSON.stringify(error));
						res.end();
				} else {
					res.redirect('/addHero');
					}
				});
					}
				});
				
			}
		});
	});


	router.put('/:id', function(req, res){
			if (req.body.Game_id == 'none'){
				req.body.Game_id = null;
			}
			var mysql = req.app.get('mysql');
			var sql = "UPDATE Hero SET Hero_name=?, Start_damage=?, Game_id=? WHERE Hero_id=?";
			var inserts = [req.body.Hero_name, req.body.Start_damage, req.body.Game_id, req.params.id];
			sql = mysql.pool.query(sql,inserts,function(error, results, fields){
				if(error){
					console.log(error)
					res.write(JSON.stringify(error));
					res.end();
				} else {
					var mysql1 = req.app.get('mysql');
					var sql1 = "UPDATE Special_ability SET Special_name =? WHERE Hero_id=?";
					var inserts1 = [req.body.Ability_name, req.params.id];
					sql1 = mysql1.pool.query(sql1,inserts1,function(error, results, fields){
					if(error){
						console.log(error)
						res.write(JSON.stringify(error));
						res.end();
					} else {
						res.status(200);
						res.end();
						}
				});	
				}
		});		
	});

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Hero WHERE Hero_id = ?";
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
	
	return router;
}();
