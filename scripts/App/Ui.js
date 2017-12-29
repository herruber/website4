    var Ui = (function () {


    var sceneView = document.getElementById("scene-view");
    var rMenu = document.getElementById("right-click-menu");
    var pMenu = document.getElementById("property-menu");
    var preview = document.getElementById("preview-ui");

    var targetview = document.getElementById("target-view");

    var propertyview = document.getElementById("property-view");
    var meshview = document.getElementById("mesh-view");
    var objectview = document.getElementById("object-view");

    var reader = new FileReader();
    var rMenuVisible = false;
    var pMenuVisible = false;

    var properties = -1;
    var props = 0;

    //Returns the inner html
    var loadHtml = function (page) {
        var path = "Html/" + page + ".html";
        return path;
    };

    var requestHtml = function (name) {

        var xhr = new XMLHttpRequest();
        xhr.onload = function () {

            var ob = {
                input: undefined, //An element for example input slider
                inputname: "", //The input label
                dimensions: []
            }

            Global.Target.userData.connections.push(ob)

            addSlider(this.responseText);
        }
        xhr.open("GET", loadHtml(name));
        xhr.responseType = "text";
        xhr.send();

    };

    var reloadProperties = function () {

        while (propertyview.firstChild) {
            propertyview.removeChild(propertyview.firstChild);
        }

        
        for (var i = 0; i < Global.Target.userData.connections.length; i++) {

            if (Global.Target.userData.connections[i].input) {
                var div = Global.Target.userData.connections[i].input;

                propertyview.appendChild(div);
            }
            
        }
    };

    var addSlider = function (content) {
        
        var div = document.createElement('div');
        div.id = "property-" +properties;

        div.innerHTML = content;


        propertyview.appendChild(div);

        for (var i = 0; i < div.children.length; i++) {
            div.children[i].id = div.children[i].id + properties;
        }

        Global.Target.userData.connections[properties].input = div;

    };

    var addProperty = function (elem) {

        properties++;

        if (elem.value == "slider") {
            requestHtml(elem.value);
        }

        elem.value = "0";

    };

    var addConnection = function (elem) {
        debugger;
        var type = elem.value.split("-")[0];
        var dimension = elem.value.split("-")[1];
        var id = elem.id.split("-")[1];

        var div = document.createElement('div');
        div.innerText = elem.value;

        if (dimension == "x") {
            Global.Target.userData.connections[id].dimensions.push(new THREE.Vector3(1, 0, 0));
        }

        if (dimension == "y") {
            Global.Target.userData.connections[id].dimensions.push(new THREE.Vector3(0, 1, 0));
        }

        if (dimension == "z") {
            Global.Target.userData.connections[id].dimensions.push(new THREE.Vector3(0, 0, 1));
        }

        targetview.appendChild(div);

        
    };

    var updateTarget = function (elem) {

        var id = elem.id.split("-")[2];

        var tar = Global.Target;

        console.log(tar);

        for (var m = 0; m < tar.children.length; m++) {

            for (var p = 0; p < Global.Target.userData.connections[id].dimensions.length; p++) {

                var dimension = Global.Target.userData.connections[id].dimensions[p];

                if (dimension.x != 0) {
                    tar.children[m].scale.set(elem.value, 1, 1);
                }

                
            }
        }

        
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
        addConnection: addConnection,
        updateTarget: updateTarget,
        reloadProperties: reloadProperties,
    }



}())
