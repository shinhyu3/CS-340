function deleteClass(id){
    $.ajax({
        url: '/allClasses/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteHero(id){
    $.ajax({
        url: '/addHero/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteLevel(id){
    $.ajax({
        url: '/allLevels/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};


function deleteGame(id){
    $.ajax({
        url: '/allGames/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteHeroClass(hid,cid){
    $.ajax({
        url: '/allHeroClass/hid/' + hid + '/cid/' + cid,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

