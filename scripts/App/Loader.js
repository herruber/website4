var Loader = (function () {

    var fileToText = function (file) {
        var name = file.name;
        var reader = new FileReader();

        reader.addEventListener('load', function (event) {
            var contents = event.target.result;

            var object = new THREE.OBJLoader().parse(contents);
            object.name = name;
            var mesh = object.children[0];
            mesh.name = name;
            mesh.material = new THREE.MeshStandardMaterial();

            mesh.castShadow = true; //default is false
            mesh.receiveShadow = true; //default

            Global.addMesh(mesh);
            document.getElementById("files").value = "";

        }, false);

        reader.readAsText(file);

    };

    var loadMesh = function () {
        if (Global.Target) {

            var files = document.getElementById("files").files;
            var astext = [];

            for (var i = 0; i < files.length; i++) {
                fileToText(files[i]);

            }
        }
    };


    return {

        fileToText: fileToText,
        loadMesh: loadMesh

    }
})()