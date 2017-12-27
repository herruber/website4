var Ui = (function () {


    var sceneView = document.getElementById("scene-view");
    var rMenu = document.getElementById("right-click-menu");
    var pMenu = document.getElementById("property-menu");
    var reader = new FileReader();
    var rMenuVisible = false;
    var pMenuVisible = false;

    //Returns the inner html
    var loadHtml = function (page) {
        var path = "Html/" + page + ".html";
        return '<object type="text/html" data="' + path+ '"></object>';
    };

    var addProperty = function () {
        
        var propview = Global.ConnectDiv;

        var bajs = '<div class="drag"></div>Input name: <br /> <input type="text" /> <br /> Type: <select id="property-select"><option value="slider">Slider</option><option value="number">Number</option></select>';
        var bajs2 = '<div class="drag"></div>Target: <select id="propertyTarget-select" multiple><option value="x">x</option><option value="y">y</option><option value="z">z</option></select>';



        var div = document.createElement('div');
        var divtar = document.createElement('div');
        div.id = "property-container";
        divtar.id = "propertyTarget-container"

        var arrow = document.createElement('div');
        arrow.style.width = "300px";
        arrow.style.height = "6px";
        arrow.style.position = "absolute";
        arrow.style.left = div.offsetLeft + 100 + "px";
        arrow.style.top = div.pageY + 100 + "px";


        div.innerHTML = bajs;
        divtar.innerHTML = bajs2;

        div.style.left = pMenu.style.left;
        div.style.top = pMenu.style.top;

        divtar.style.left = pMenu.offsetLeft + 300 + "px";
        divtar.style.top = pMenu.style.top;


        debugger;
        propview.appendChild(div);
        propview.appendChild(divtar);

        propview.appendChild(arrow);

    };

    var toggleRightMenu = function (event) {
        rMenuVisible = !rMenuVisible;

        if (rMenuVisible) {
            pMenuVisible = false;
            pMenu.style.display = 'none';

            rMenu.style.display = 'block';

            rMenu.style.left = event.pageX + 'px';
            rMenu.style.top = event.pageY + 'px';
        }
        else {
            rMenu.style.display = 'none';
        }
    };

    var togglePropertyMenu = function (event) {
        pMenuVisible = !pMenuVisible;

        if (pMenuVisible) {
            rMenuVisible = false;
            rMenu.style.display = 'none';

            pMenu.style.display = 'block';

            pMenu.style.left = event.pageX + 'px';
            pMenu.style.top = event.pageY + 'px';
        }
        else {
            pMenu.style.display = 'none';
        }
    };

    var updateMeshes = function () {
        var elem = document.getElementById("mesh-view");

        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }
        debugger;
        for (var m = 0; m < Global.Target.children.length; m++) {
            
            this.addMeshToList(Global.Target.children[m]);
        }
    };

    var addMeshToList = function (mesh) {
        var elem = document.getElementById("mesh-view");
        var div = document.createElement('div');
        div.id = "mesh-" +mesh.id;
        div.innerText = mesh.name;

        elem.appendChild(div);

    };

    var addToActorList = function (id) {
        var div = document.createElement('div');
        div.id = "scene-actor-" + id;
        div.className = "ui-scene-actor";
        div.innerText = "actor" + id;
        div.onclick = function () { Global.setTarget(id) };

        sceneView.appendChild(div);
    };

    var updateActor = function (elem) {


        if (Global.Target) {

            Global.Target.name = elem.value;
            console.log(Global.Target.name)
            var id = Global.Target.userData.id;
            var div = document.getElementById("scene-actor-" + id);
            div.innerText = elem.value;
        }
        

    };

    var listProperties = function (object) {


    };


    return {

        toggleRightMenu: toggleRightMenu,
        addToActorList: addToActorList,
        updateActor: updateActor,
        addMeshToList: addMeshToList,
        listProperties: listProperties,
        updateMeshes: updateMeshes,
        togglePropertyMenu: togglePropertyMenu,
        addProperty: addProperty,
        loadHtml: loadHtml,


    }



}())
