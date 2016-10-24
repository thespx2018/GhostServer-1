$(document).ready(function(){
    update();
    setInterval(function(){update()},1000);
    $("#start-button").click(function(){
        $.get("/admin/start",function(data,status){
            if(status == "success"){
                if(data == "OK"){
                    showMessage("Successfully started");
                }else{
                    showMessage("Cannot start");
                }
            }
        });
    });
    $("#reset-button").click(function(){
        $.get("/admin/reset",function(data,status){
            if(status == "success"){
                if(data == "OK"){
                    showMessage("Successfully reset");
                }else{
                    showMessage("Cannot reset");
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
    var players = data;
    for (var i in players){
        var player = players[i];
        showPlayerStat(player);
    }
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
    new_tbody.append(new_row);
    table.append(new_tbody);
};

function showMessage(message){
    $("#message-area").text(message);
    $("#message-area").fadeIn(1000,function(){
        setTimeout(function(){$("#message-area").fadeOut(1000)},1000);
    });
};