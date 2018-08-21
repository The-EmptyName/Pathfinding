v.make_grid(0, 0, 0, window.innerHeight, window.innerHeight, 10, 10, "gray", "black", 1, "solid", "interact");
v.change_background_by_tag("body","#707070");
v.make_div(100, 25, window.innerHeight + 100, 100, 1, "obstacle_placer", "Place obstacles");
v.change_background_by_id("obstacle_placer", "#909090");
v.add_border("obstacle_placer", 2, "#050505", "solid");
v.attribute("obstacle_placer", "onclick", "select_mode('obstacles')");

v.make_div(100, 25, window.innerHeight + 100, 200, 1, "deleter", "Delete");
v.change_background_by_id("deleter", "#909090");
v.add_border("deleter", 2, "#050505", "solid");
v.attribute("deleter", "onclick", "select_mode('delete')");

v.make_div(100, 25, window.innerHeight + 100, 300, 1, "starter", "Place start");
v.change_background_by_id("starter", "#909090");
v.add_border("starter", 2, "#050505", "solid");
v.attribute("starter", "onclick", "select_mode('start')");

v.make_div(100, 25, window.innerHeight + 100, 400, 1, "ender", "Place end");
v.change_background_by_id("ender", "#909090");
v.add_border("ender", 2, "#050505", "solid");
v.attribute("ender", "onclick", "select_mode('end')");

v.make_div(100, 25, window.innerHeight + 100, 500, 1, "begginer", "Beggin search");
v.change_background_by_id("begginer", "#F0F0F0");
v.add_border("begginer", 2, "#050505", "solid");
v.attribute("begginer", "onclick", "beggin()");

var obstacles = [], start = "", end = "", mode = "";

function select_mode(x) {
    mode = x;
}
function interact(id) {
    var id = id;
    if ( mode == "obstacles" ) {
        if ( obstacles.indexOf(id) <= -1 && start != id && end != id ) {
            v.change_background_by_id(id, "black");
            obstacles.push(id);
            console.log(obstacles);
        }
    } else if ( mode == "delete" ) {
        if ( start != id && end != id ) {
            v.change_background_by_id(id, "gray");
            var i = obstacles.indexOf(id);
            obstacles.splice(i, 1);
            console.log(obstacles);
        } else if ( start == id ) {
            v.change_background_by_id(id, "gray");
            start = "";
        } else if ( end == id ) {
            v.change_background_by_id(id, "gray");
            end = "";
        }
    } else if ( mode == "start" && start == "" ) {
        if ( obstacles.indexOf(id) <= -1 && end != id ) {
            v.change_background_by_id(id, "yellow");
            start = id;
        }
    } else if ( mode == "end" && end == "" ) {
        if ( obstacles.indexOf(id) <= -1 && start != id ) {
            v.change_background_by_id(id, "green");
            end = id;
        }
    }
}
function beggin() {
    if ( start != "" && end != "" ) {
        fix();
        var start_1 = start.split("_");
        var end_1 = end.split("_");
        start_1.shift();
        end_1.shift();
        PF.make_grid(9, 9, obstacles);
        var test = new PF.pathfinder(start_1[0], start_1[1], 9);
        test.find_path(end_1[0], end_1[1]);
        show_path();
        fix();
    }
}
function fix() {
    var obstacle_fix = [];
    for ( var i = 0; i < obstacles.length; i ++ ) {
        var fix_1 = obstacles[i].split("_");
        for ( var n = 0; n < fix_1.length; n ++ ) {
            if ( fix_1[n] == "" ) {
                fix_1.splice(n, 1);
            }
        }
        var fix_2 = "_"+fix_1[0]+"_"+fix_1[1];
        obstacle_fix.push(fix_2);
    }
    obstacles = obstacle_fix;
}
function show_path() {
    for ( var i = 0; i < valid.decoded.length - 1; i++ ) {
        if ( valid.decoded[i] != start || valid.decoded[i] != end ) {
            v.change_background_by_id(valid.decoded[i], "lightblue");
        }
    }
    setTimeout(function(){
        var inter = setInterval(function(){
            if ( valid.decoded.length <= 1 ) {
                clearInterval(inter);
            } else {
                v.change_background_by_id(valid.decoded[0], "gray");
                valid.decoded.shift();
            }
        },100);
    },100);
}