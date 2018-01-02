var Renderer = (function () {

    var render = function () {
            //render = this.render;
            requestAnimationFrame(render);

        //Global.renderer.render(Global.scene, Global.camera);
        // Global.rendererCss.render(Global.sceneCss, Global.camera);

            Global.composer.render();
            debugger;
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

            Global.camera.position.z = 10;


            Global.renderer.setSize(Global.width, Global.height);

            Global.renderer.domElement.id = "canvas";
            Global.GameDiv.appendChild(Global.renderer.domElement);

            
            
            //var shaderPass = new THREE.ShaderPass(THREE.SepiaShader);
            //Global.composer.addPass(shaderPass);

            var size = 100;
            var divisions = 100;
            var gridHelper = new THREE.GridHelper(size, divisions);
            Global.scene.add(gridHelper);

        //Lights
            Global.renderer.shadowMap.enabled = true;
            Global.renderer.shadowMapType = THREE.PCFSoftShadowMap;


            var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            directionalLight.castShadow = true;
            Global.scene.add(directionalLight);
            var light = new THREE.AmbientLight("rgb(255, 255, 255)", 0.25); // soft white light
            Global.scene.add(light);

        //initCSS3d();
            Global.composer = new THREE.EffectComposer(Global.renderer);

            var renderPass = new THREE.RenderPass(Global.scene, Global.camera);
            Global.composer.addPass(renderPass);
            var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
            effectCopy.renderToScreen = true;
            Global.composer.addPass(effectCopy);

        render();

    };
    
    return {
        initRendering: initRendering
        
    }


})();


