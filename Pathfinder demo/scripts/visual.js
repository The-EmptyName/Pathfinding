var v = {
    make_div: function(width, height, x, y, z, id, text) {
        var to_make = "<div style = 'width:"+width+"px; height:"+height+"px; position: absolute; left:"+x+"px; top:"+y+"px; index-z:"+z+"px;' id = '"+id+"'>"+text+"</div>";
        document.getElementsByTagName("body")[0].innerHTML += to_make;
    },
    make_img: function(width, height, x, y, z, id, source, onclick){
        var to_make = "<img style = 'width:"+width+"px; height:"+height+"px; position: absolute; left:"+x+"px; top:"+y+"px; index-z:"+z+"px;' id = '"+id+"' src = '"+source+"'></img>";
        document.getElementsByTagName("body")[0].innerHTML += to_make;
    },
    change_background_by_id: function(id, color) {
        document.getElementById(id).style.background = color;
    },
    change_background_by_tag: function(tag, color) {
        document.getElementsByTagName(tag)[0].style.background = color;
    },
    add_border: function(id, size, color, style) {
        document.getElementById(id).style.borderWidth = size + "px";
        document.getElementById(id).style.borderColor = color;
        document.getElementById(id).style.borderStyle = style;
    },
    move: function(id, x, y) {
        document.getElementById(id).style.left = x + "px";
        document.getElementById(id).style.top = y + "px";
    },
    attribute: function(id, attribute, set) {
        document.getElementById(id).setAttribute(attribute, set);
    },
    make_grid: function(x, y, z, width, height, lines, columns, color, border_color, border_size, border_style, onclick) {
        var line = 0, column = 0;
        var w = width / lines, h = height / columns;
        for ( ;column < columns; column ++ ) {
            line = 0;
            for ( ;line < lines; line ++ ) {
                var id = "_"+line+"_"+column;
                var attr = onclick + "('" + id + "')";
                this.make_div(w, h, line * w, column * h, z, id, "");
                this.change_background_by_id(id, color);
                this.add_border(id, border_size, border_color, border_style);
                this.attribute(id, "onclick", attr);
            }
        }
    }
}