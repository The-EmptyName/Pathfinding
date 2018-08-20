var PF = {
    make_grid: function(width, height, obstacles_to_add) {

        /*
         * Main file must contain an array named 'obstacles'
         * 'obstacles' must store coordinates of each obstacle
         * Each coordinate must be in a '_x_y' format
         */    
        this.obstacles_to_add = obstacles_to_add;

        for ( var i = 0; i <= height; i ++ ) {
            for ( var n = 0; n <= width; n ++ ) {
                evaling = "_"+n+"_"+i+"_='Empty';";
                eval(evaling);
            }
        }

        for ( var i = 0; i < this.obstacles_to_add.length; i++ ) {
            this.obstacles_to_add[i] += "_";
            var evaling = this.obstacles_to_add[i] + "='obstacle';";
            eval(evaling);
        }

    },

    pathfinder: function(x, y, size) {    // put starting x, y and a size of grid to navigate

        this.x = x;
        this.y = y;

        var f_x = x, f_y = y;    // FOR FUNCTIONS
        var size = size;

        this.find_path = function(destination_x, destination_y) {

            var valid_path = "";
            var paths = [""];
            var found = false;

            eval("_"+destination_x+"_"+destination_y+"_='destination'");

            function check(coordinate) {
                var to_return;
                if ( eval(coordinate) == "obstacle" ) {
                    to_return = "obstacle";
                } else if ( eval(coordinate) == "destination" ) {
                    to_return = "destination";
                    //debugger;
                } else if ( eval(coordinate) == "Empty" ) {
                    to_return = "empty";
                }
                return to_return;
            }

            function multiply(path) {
                if ( found ) {
                    console.log(valid_path);
                    return true;
                }
                function refresh() {
                    temp_x = f_x, temp_y = f_y;
                    decode = path.split("");
                    coordinate = "";
                    for ( var i = 0; i <= decode.length; i ++ ) {

                        if ( decode[i] == 1 ) {
                            temp_y --;
                        } else if ( decode[i] == 2 ) {
                            temp_y ++;
                        } else if ( decode[i] == 3 ) {
                            temp_x --;
                        } else if ( decode[i] == 4 ) {
                            temp_x ++;
                        }

                    }
                    console.log(paths);
                }

                var temp_x = f_x, temp_y = f_y;
                var decode = path.split("");
                var coordinate = "";

                for ( var i = 0; i <= decode.length; i ++ ) {
                    if ( decode[i] == 1 ) {
                        temp_y --;
                    } else if ( decode[i] == 2 ) {
                        temp_y ++;
                    } else if ( decode[i] == 3 ) {
                        temp_x --;
                    } else if ( decode[i] == 4 ) {
                        temp_x ++;
                    }
                }

                function up() {
                    temp_y --;
                    if ( temp_y < 0 ) {
                        return;
                    }
                    if ( temp_y > size ) {
                        return;
                    }
                    coordinate = "_"+temp_x+"_"+temp_y+"_";
                    if( check(coordinate) == "empty" ) {
                        var new_path = path + "1";
                        paths.push(new_path);
                    } else if ( check(coordinate) == "destination" ) {
                        var new_path = path + "1";
                        valid_path = new_path;
                        found = true;
                    }
                }
                function down() {
                    temp_y ++;
                    if ( temp_y < 0 ) {
                        return;
                    }
                    if ( temp_y > size ) {
                        return;
                    }
                    coordinate = "_"+temp_x+"_"+temp_y+"_";
                    if( check(coordinate) == "empty" ) {
                        var new_path = path + "2";
                        paths.push(new_path);
                    } else if ( check(coordinate) == "destination" ) {
                        var new_path = path + "2";
                        valid_path = new_path;
                        found = true;
                    }
                }
                function left() {
                    temp_x --;
                    if ( temp_x < 0 ) {
                        return;
                    } 
                    if ( temp_x > size ) {
                        return;
                    }
                    coordinate = "_"+temp_x+"_"+temp_y+"_";
                    if( check(coordinate) == "empty" ) {
                        var new_path = path + "3";
                        paths.push(new_path);
                    } else if ( check(coordinate) == "destination" ) {
                        var new_path = path + "3";
                        valid_path = new_path;
                        found = true;
                    }
                }
                function right() {
                    temp_x ++;
                    if ( temp_x < 0 ) {
                        return;
                    }
                    if ( temp_x > size ) {
                        return;
                    }
                    coordinate = "_"+temp_x+"_"+temp_y+"_";
                    if( check(coordinate) == "empty" ) {
                        var new_path = path + "4";
                        paths.push(new_path);
                    } else if ( check(coordinate) == "destination" ) {
                        var new_path = path + "4";
                        valid_path = new_path;
                        found = true;
                    }
                }
                function multiply_all_directions() {
                    refresh();
                    up();
                    refresh();
                    down();
                    refresh();
                    left();
                    refresh();
                    right();
                    refresh();
                }
                multiply_all_directions();
            }

            function start() {
                while( found == false ) {
                    if ( ( valid_path != "" ) || ( paths.length >= 10000 ) ) {
                        found = true;
                        console.log(valid_path);
                    } else {
                        for ( var i = 0; i <= paths.length; i ++ ) {
                            multiply(paths[i]);
                        }
                    }
                }
            }
            start();
        }
    }
}
