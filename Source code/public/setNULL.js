function setNULL(gid){
    $.ajax({
        url: '/allGames/',
        type: 'POST',
		data: gid,
        success: function(result){
            window.location.reload(true);
        }
    })
};