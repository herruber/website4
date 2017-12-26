var Renderer = (function () {

    
    return {

        render: function () {
            render = this.render;
            requestAnimationFrame(render);

            Global.renderer.render(Global.scene, Global.camera);

        },

        initRendering: function () {
            Global.width = Global.GameDiv.clientWidth;
            Global.height = Global.GameDiv.clientHeight;
            Global.camera = new THREE.PerspectiveCamera(75, Global.width / Global.height, 0.1, 1000);
            Global.controls = new THREE.OrbitControls(Global.camera, Global.GameDiv);

            var size = 100;
            var divisions = 100;
            var gridHelper = new THREE.GridHelper(size, divisions);
            Global.scene.add(gridHelper);


            Global.camera.position.z = 10;


            Global.renderer.setSize(Global.width, Global.height);


            Global.GameDiv.appendChild(Global.renderer.domElement);

        }
    }


})();


