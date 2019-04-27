Create Table Originating_game (
Game_id int primary key auto_increment,
Game_name varchar(100) NOT NULL
) engine=innodb;

Insert INTO Originating_game (Game_name) values ('Starcraft');
Insert INTO Originating_game (Game_name) values ('Warcraft');
Insert INTO Originating_game (Game_name) values ('Overwatch');
Insert INTO Originating_game (Game_name) values ('Diablo');

Create Table Level_ (
Level_id int primary key auto_increment,
Level_name varchar(100) NOT NULL,
Objectives varchar(100) NOT NULL,
Game_id int,
Foreign Key (Game_id) references Originating_game(Game_id) ON DELETE SET NULL
) engine=innodb;

Insert INTO Level_ (Level_name, Objectives, Game_id) values ('Alterac Pass', 'Capture Prison Camps', '2');
Insert INTO Level_ (Level_name, Objectives, Game_id) values ('Garden of Terror', 'Collect Seeds', '4');
Insert INTO Level_ (Level_name, Objectives, Game_id) values ('Hanamura Temple', 'Escort Payload', '3');
Insert INTO Level_ (Level_name, Objectives, Game_id) values ('Volskaya Foundry', 'Control Point', '3');
Insert INTO Level_ (Level_name, Objectives, Game_id) values ('Haunted Mines', 'Collect Skulls', '4');
Insert INTO Level_ (Level_name, Objectives, Game_id) values ('Towers of Doom', 'Capture Towers', '4');

Create Table Class_ (
Class_id int primary key auto_increment,
Class_name varchar(100) NOT NULL
) engine=innodb;

Insert INTO Class_ (Class_name) values ('assassin'); 
Insert INTO Class_ (Class_name) values ('bruiser'); 
Insert INTO Class_ (Class_name) values ('siege'); 
Insert INTO Class_ (Class_name) values ('support'); 
Insert INTO Class_ (Class_name) values ('tank'); 

Create Table Hero (
Hero_id int primary key auto_increment,
Hero_name varchar(100) NOT NULL,
Start_damage int,
Game_id int,
foreign key (Game_id) references Originating_game(Game_id) ON DELETE SET NULL 
) engine=innodb;

Insert INTO Hero (Hero_name, Start_damage, Game_id) values ('Raynor', '101', '1');
Insert INTO Hero (Hero_name, Start_damage, Game_id) values ('Alarak', '150', '1');
Insert INTO Hero (Hero_name, Start_damage, Game_id) values ('Zeratul', '47', '1');
Insert INTO Hero (Hero_name, Start_damage, Game_id) values ('Dehaka', '100', '1');
Insert INTO Hero (Hero_name, Start_damage, Game_id) values ('Artanis', '115', '1');

Create Table Hero_class (
Hero_id int,
Class_id int,
foreign key (Hero_id) references Hero(Hero_id) ON DELETE CASCADE,
foreign key (Class_id) references Class_(Class_id) ON DELETE CASCADE,
PRIMARY KEY (Hero_id, Class_id)
) engine=innodb;

Insert INTO Hero_class (Hero_id, Class_id) values ('1','1');
Insert INTO Hero_class (Hero_id, Class_id) values ('2','1');
Insert INTO Hero_class (Hero_id, Class_id) values ('3','1');
Insert INTO Hero_class (Hero_id, Class_id) values ('4','2');
Insert INTO Hero_class (Hero_id, Class_id) values ('5','2');

Create Table Special_ability(
Special_ability_id int primary key auto_increment,
Special_name varchar(100) NOT NULL,
Hero_id int,
foreign key (Hero_id) references Hero(Hero_id) ON DELETE CASCADE
) engine=innodb;

Insert INTO Special_ability (Special_name, Hero_id) values ('Hyperion', '1');
Insert INTO Special_ability (Special_name, Hero_id) values ('Deadly Charge', '2');
Insert INTO Special_ability (Special_name, Hero_id) values ('Might of Nerazim', '3');
Insert INTO Special_ability (Special_name, Hero_id) values ('Isolation', '4');
Insert INTO Special_ability (Special_name, Hero_id) values ('Purifier Beam', '5');