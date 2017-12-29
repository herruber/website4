
var Creator = (function () {

    makeGizmo = function () {
        var geometry = new THREE.BoxBufferGeometry(1, 1, 1);
        var wireframe = new THREE.WireframeGeometry(geometry);

        var lines = new THREE.LineSegments(wireframe);
        lines.material.depthTest = false;
        lines.material.opacity = 0.25;
        lines.material.transparent = true;

        Global.scene.add(lines);
        Global.createdGizmos.push(lines);

        return lines;
    };

    makeAxisHelper = function () {
        var axesHelper = new THREE.AxesHelper(5);
        return axesHelper;
    };

    makeActor = function() {
        var actor = new THREE.Object3D();
        var nr = Global.createdActors.length;

        actor.name = "actor" + nr;

        actor.userData = {
            id: nr,
            
            connections: []
        }

        //var ob = {
        //    input: undefined, //An element for example input slider
        //    inputname: "", //The input label
        //    dimensions: []
        //}

        //actor.userData.connections.push(ob)

        var ax = this.makeAxisHelper();
        var giz = this.makeGizmo();

        actor.add(ax)
        actor.add(giz);
        Global.scene.add(ax);
        Global.scene.add(giz);

        Global.addActor(actor, nr);

    }


    return{

        makeGizmo: makeGizmo,
        makeAxisHelper: makeAxisHelper,
        makeActor: makeActor

    }



}())