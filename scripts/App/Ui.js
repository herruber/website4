var Ui = (function () {


    var sceneView = document.getElementById("scene-view");
    var rMenu = document.getElementById("right-click-menu");
    var rMenuVisible = false;

    var toggleRightMenu = function (event) {
        rMenuVisible = !rMenuVisible;

        if (rMenuVisible) {
            rMenu.style.display = 'block';

            rMenu.style.left = event.clientX + 'px';
            rMenu.style.top = event.clientY + 'px';
        }
        else {
            rMenu.style.display = 'none';
        }
    };

    var updateMeshes = function () {
        var elem = document.getElementById("mesh-view");

        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }

        for (var m = 0; m < Global.Target.children; m++) {
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
            alert()
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
        updateMeshes: updateMeshes


    }



}())
