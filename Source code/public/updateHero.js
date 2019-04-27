function updateHero(id){
    $.ajax({
        url: '/addHero/' + id,
        type: 'PUT',
        data: $('#updateHero').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
