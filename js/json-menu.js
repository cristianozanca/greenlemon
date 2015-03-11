
$.getJSON('/wp-json/menus', function(data) {

    for (var i=0, len=data.length; i < len; i++)
             {
            //    console.log(data[i]);
                var itemz = data[i];
            //    console.log(itemz);
             var name = itemz["slug"];
            // console.log(name);

            // NOME DA IMPOSTARE SU WP DEL MENU = primary
             if (name == 'primary'){

             var menuID = itemz["ID"];
            
            //console.log(menuID);

//load JSON MENU Wordpress con suo ID
$.getJSON('/wp-json/menus/' + menuID, function(data) {
    
//build menu
var builddata = function () {
    //console.log(data);

    var source = [];
    var cosi = [];

    for (i = 0; i < data.items.length; i++) {
        var itemz = data.items[i];
       // console.log(itemz);

        var oggetto = itemz["object"];        

        var labella = itemz["title"];
        // tolgo spazi metti trattini e converto tutto minuscolo
        var label = labella.replace(/\s+/g, '-').toLowerCase();
        
        var parentid = itemz["parent"];
        var id = itemz["ID"];
        var idpage = itemz["object_id"];
//        var url = itemz["url"];

if (oggetto == "category"){
        var url = '#/cat/' + label + '/' + idpage + '/page/1';
}

else { var url = '#/pagina/' + idpage + ''; }

        if (cosi[parentid]) {

            var item = { parentid: parentid, label: label, url: url, item: item };
            if (!cosi[parentid].cosi) {
                cosi[parentid].cosi = [];

            }
            cosi[parentid].cosi[cosi[parentid].cosi.length] = item;
            cosi[id] = item;


        }
        else {
            cosi[id] = { parentid: parentid, label: label, url: url, item: item };
            source[id] = cosi[id];
        }
    }
    return source;

    
}

var buildUL = function (parent, cosi) {
    $.each(cosi, function () {
        if (this.label) {
            var li = $("<li class='js-menu'>" + "<a href='"+ this.url +"'>" + this.label + "</a></li>");
            li.appendTo(parent);
            if (this.cosi && this.cosi.length > 0) {
                var ul = $("<ul class='dropdown-menu js-menu'></ul>");
                ul.appendTo(li);
                buildUL(ul, this.cosi);
            }
        }
    });
}
var source = builddata();
var ul = $(".json-menu");
ul.appendTo(".json-menu");
buildUL(ul, source);
//add bootstrap classes
if ($(".json-menu>li:has(ul.js-menu)"))
{
    $(".json-menu>li.js-menu").addClass('dropdown-submenu');
}
if ($(".json-menu>li>ul.js-menu>li:has(> ul.js-menu)"))
{
    $(".json-menu>li>ul.js-menu li ").addClass('dropdown-submenu');
}
$("ul.js-menu").find("li:not(:has(> ul.js-menu))").removeClass("dropdown-submenu");


    }); // ok

}

}

}); 
