var Global = (function () {

    //g_ is a global variable

    var Target = undefined;
    var GameDiv = document.getElementById("game-view");
    var ConnectDiv = document.getElementById("connection-view");
    var MainDiv = document.getElementById("main-container");

    var currentName = document.getElementById("object-name");
    var width;
    var height;

    var scene = new THREE.Scene();
    var sceneCss = new THREE.Scene();

    //Scene variables
    var createdActors = [];
    var createdGizmos = [];
    var createdLines = [];

    var camera;
    var controls;
    var renderer = new THREE.WebGLRenderer();
    var rendererCss = new THREE.CSS3DRenderer();

    var setTarget = function (value) {
        this.Target = createdActors[value];
        console.log(this.Target)
        Ui.updateMeshes();

        currentName.value = createdActors[value].name;
        Ui.reloadProperties();
    }

    var addMesh = function (mesh) {

        if (this.Target) {

            //this.scene.add(mesh);
            this.Target.children.push(mesh);
            this.scene.add(mesh);
            debugger;
            Ui.addMeshToList(mesh);
            //Update meshes list
        }

        console.log(this.Target.children);
    }

    var addActor = function (actor, id) {

        createdActors.push(actor);

        //Do after change

        Ui.addToActorList(id);
    }

    var RayFromCamera = function (event) {
        var raycaster = new THREE.Raycaster();

        var mouse3D = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1,
            0.5);

        raycaster.setFromCamera(mouse3D, camera);

        var intersects = raycaster.intersectObjects(scene.children);
        debugger;
    }

    return {
        //Variables
        Target: Target,
        GameDiv: GameDiv,
        currentName: currentName,
        width: width,
        height: height,
        scene: scene,
        createdActors: createdActors,
        createdGizmos: createdGizmos,
        createdLines: createdLines,
        camera: camera,
        controls: controls,
        renderer: renderer,
        //Functions
        setTarget: setTarget,
        addMesh: addMesh,
        addActor: addActor,
        RayFromCamera: RayFromCamera,
        MainDiv: MainDiv,
        ConnectDiv: ConnectDiv,
        rendererCss: rendererCss,
        sceneCss: sceneCss
    }



}())


