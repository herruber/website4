var Renderer = (function () {

    var render = function () {
            //render = this.render;
            requestAnimationFrame(render);

        Global.renderer.render(Global.scene, Global.camera);
        Global.rendererCss.render(Global.sceneCss, Global.camera);

    };

    var initCSS3d = function () {

        Global.rendererCss.setSize(Global.width, Global.height);
        Global.rendererCss.domElement.id = "canvasCss";
        Global.ConnectDiv.appendChild(Global.rendererCss.domElement);

    };

    var initRendering = function () {
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

            Global.renderer.domElement.id = "canvas";
        Global.GameDiv.appendChild(Global.renderer.domElement);

        //initCSS3d();
        render();

    };
    
    return {
        initRendering: initRendering
        
    }


})();


