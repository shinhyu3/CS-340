function filterHeroesByGame() {
	var game_id = document.getElementById('game_filter').value
        window.location = '/filterByGame/filter/' + parseInt(game_id)
}
