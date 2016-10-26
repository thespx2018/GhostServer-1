$(document).ready(function(){
    update();
    setInterval(function(){update()},1000);
    $("#start-button").click(function(){
        $.get("/admin/start",function(data,status){
            if(status == "success"){
                if(data == "OK"){
                    showMessage("开始游戏！");
                }else{
                    showMessage("错误：游戏不能开始");
                }
            }
        });
    });
    $("#reset-button").click(function(){
        $.get("/admin/reset",function(data,status){
            if(status == "success"){
                if(data == "OK"){
                    showMessage("重置成功");
                }else{
                    showMessage("错误：无法重置");
                }
            }
        });
    });

});

function update(){
    //login to the server
    $.get('/admin',function(data,status){
        if (status == 'success'){
            tableClear();
            processReply(data);
        } 
    });
};

function tableClear(){
    $("#player-statistics-table tbody").remove();
};

function processReply(data){
    var players = data.player;
    var game_status = data.game;
    var batteries = data.battery;
    for (var i in players){
        var player = players[i];
        showPlayerStat(player);
    }
    showGameStatus(game_status);
};

function showGameStatus(game_status){
    var indicator = $("#game-indicator");
    indicator.text(game_status);
};

function showPlayerStat(player){
    var table = $("#player-statistics-table");
    var new_tbody = $("<tbody></tbody>");
    var new_row = $("<tr></tr>");
    var id = player.id;
    new_row.append($("<td></td>").text(id));
    var role = player.role;
    new_row.append($("<td></td>").text(role));
    var status = player.status;
    new_row.append($("<td></td>").text(status));
    new_button = $("<button class='pure-button dead-switch'>弄死</button>");
    new_button.click(function(){
        var player_id = $(this).parent().prevAll().last().text();
        $.get('/admin/die?player_id='+player_id,function(data,status){
            if(status == 'success'){
            }
        });
    });
    new_row.append($("<td></td>").append(new_button));
    new_tbody.append(new_row);
    table.append(new_tbody);
};

function showMessage(message){
    $("#message-area").text(message);
    $("#message-area").fadeIn(1000,function(){
        setTimeout(function(){$("#message-area").fadeOut(1000)},1000);
    });
};