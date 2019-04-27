/* Add a hero to hero table */
INSERT INTO Hero (Hero_name, Start_damage, Special_ability_id, Game_id)
VALUES (:Hero_nameInput, :Start_damageInput, :Special_ability_idInput, :Game_idInput);

/* Add special ability */
INSERT INTO Special_ability (Special_name, Hero_id) 
VALUES (:Special_abilityInput, :Hero_idInput);

/* Add Level */
INSERT INTO Level_ (Level_name, Objectives, Game_id)
VALUES (:Level_nameInput, :ObjectivesInput, :Game_idInput);

/* Add Class */
INSERT INTO Class_ (Class_name) 
VALUES (:Class_nameInput);

/* Insert into Originating Game */
INSERT INTO Originating_game (Game_name)
VALUES (:Game_nameInput);

/* Insert into Hero_Class */
INSERT INTO Hero_class (Hero_id, Class_id)
VALUES (:Hero_idInput, :Class_idInput);

/* Show all heroes from a user specified game */
SELECT Hero.Hero_id, Hero.Hero_name, Hero.Start_damage, Originating_game.Game_name AS Game FROM Hero LEFT JOIN Originating_game ON Hero.Game_id = Originating_game.Game_id

/* Show all Heroes */
SELECT Hero.Hero_id, Hero.Hero_name, Hero.Start_damage FROM Hero;

/* Show all special abilities */
SELECT Special_abilities.Special_ability_id, Special_abilities.Special_name FROM Special_abilities;

/* Show all Levels */
SELECT Level_.Level_id, Level_.Level_name, Level_.Objectives FROM Level_;

/* Show all Classes */
SELECT Class_.Class_id, Class_.Class_name FROM Class_;

/* Show all Heroes from a certain Originating Game */
SELECT Hero.Hero_id, Hero.Hero_name, Hero.Game_id FROM Hero INNER JOIN Originating_game ON Hero.Game_id = Originating_game.Game_id WHERE Hero.Game_id = ?;

/* Show all from Hero_Class */
SELECT Hero_Class.Hero_id, Hero_Class.Class_id FROM Hero_Class;

/* Delete Hero from Hero entity table by hero name, variable heroName is from html file */
DELETE FROM Hero WHERE Hero.hero_name='heroName';

/* Update Hero start damage from  Hero entity table startDamage and heroName are variables used in html file.*/
UPDATE Hero SET Hero.Start_damage = 'startDamage' WHERE Hero.hero_name='heroName';

/* Delete originating game title which will then set the level value its derived from to NULL*/
DELETE FROM Originating_game WHERE Originating_game.game_id='Game_id';

/* Delete from many to many relationship table */
DELETE FROM Hero_class WHERE Hero_class.Hero_id='Hero_id';

