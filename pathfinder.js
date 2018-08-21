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

    pathfinder: function(x, y, size_) {    // put starting x, y and a size of grid to navigate

        this.x = x;
        this.y = y;

        var f_x = x, f_y = y;    // FOR FUNCTIONS
        var size = size_;

        this.find_path = function(destination_x, destination_y) {

            var valid_path = "";
            var paths = [""];
            var found = false;
            var tries = 0;

            eval("_"+destination_x+"_"+destination_y+"_='destination'");

            function check(coordinate) {
                var to_return;
                var split_1 = coordinate.split("_");
                split_1.shift();
                if ( split_1[0] > size || split_1[1] > size || split_1[0] < 0 || split_1[1] < 0 ) {
                    return;
                }
                if ( eval(coordinate) == "obstacle" ) {
                    to_return = "obstacle";
                } else if ( eval(coordinate) == "destination" ) {
                    to_return = "destination";
                } else if ( eval(coordinate) == "Empty" ) {
                    to_return = "empty";
                }
                return to_return;
            }

            function multiply(path) {
                if ( found ) {
                    console.log(valid_path);
                    paths = [""];
                    return true;
                }

                var temp_x = f_x, temp_y = f_y;
                var decode = path.split("");
                var coordinate = "";

                function decode_() {
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
                }

                decode_();

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
                        tries ++;
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
                        tries ++;
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
                        tries ++;
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
                        tries ++;
                    } else if ( check(coordinate) == "destination" ) {
                        var new_path = path + "4";
                        valid_path = new_path;
                        found = true;
                    }
                }
                function multiply_all_directions() {
                    up();
                    down();
                    left();
                    right();
                }
                multiply_all_directions();
            }

            function start() {
                while( found == false ) {
                    if ( ( valid_path != "" ) || ( tries >= 1000000 ) ) {
                        found = true;
                    } else {
                        for ( var i = 0; i <= paths.length; i ++ ) {
                            var decode = paths[i].split("");
                            clean_up();
                            function clean_up() {
                                for ( var n = 1; n < decode.length; n ++ ) {
                                    if ( (decode[n] == 1 && decode[n-1] == 2) || (decode[n] == 2 && decode[n-1] == 1) || (decode[n] == 3 && decode[n-1] == 4) || (decode[n] == 4 && decode[n-1] == 3) ) {
                                        var to_delete = paths.indexOf(paths[i]);
                                        paths.splice(to_delete, 1);
                                    }
                                }
                            }
                            
                            multiply(paths[i]);
                            if ( paths.length > 1000 ) {
                                for ( var m = 0; m <= 1; m ++ ) {
                                    paths.shift();
                                }
                                clean_up();
                            }
                        }
                    }
                }
            }
            start();
        }
    }
}
