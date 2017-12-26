
var Listeners = (function()
{

    var self = this;
    var drag = false;
    var xdelta = 0;
    var ydelta = 0;
    var dContent = undefined;
    var dStart = undefined;

    var setDrag = function (event) {

        dContent = event.target;
        drag = true;
        var area = dContent.getBoundingClientRect();

        xdelta = event.clientX - area.x;
        ydelta = event.clientY - area.y;
        Global.controls.enabled = false;
    };

    var onMouseDown = function (event) {
        //event.preventDefault();
        var id = event.target.id;



            switch (id) {
                case "scene-view":
                    setDrag(event);
                    break;
                case "object-view":
                    setDrag(event);
                    break;
                default:
                    if (event.button == 2) {

                        Ui.toggleRightMenu(event);
                    }

                    break;
            }
        

            event.target.focus();
        

    };

    var onMouseUp = function(event) {
        event.preventDefault();

        drag = false;
        Global.controls.enabled = true;

    };

    var onResize = function(event) {
        event.preventDefault();
        Global.width = Global.GameDiv.clientWidth;
        Global.height = Global.GameDiv.clientHeight;

        //When window is resized change renderer size to fit the div
        
        Global.camera.aspect = Global.width / Global.height;
        Global.camera.updateProjectionMatrix();
        Global.renderer.setSize(Global.width, Global.height);
    };

    var onMouseMove = function(event) {
        event.preventDefault();

        //If an object is being dragged

        if (drag) {
            //debugger;
            dContent.style.left = event.clientX - xdelta + 'px';
            dContent.style.top = event.clientY - ydelta + 'px';
            console.log(event.clientY + " " + ydelta + 'px');
        }
    };

    var initListeners = function() {

        Global.GameDiv.addEventListener('mousedown', this.onMouseDown, false);
        window.addEventListener('resize', this.onResize, false);
        Global.GameDiv.addEventListener('mouseup', this.onMouseUp, false);
        Global.GameDiv.addEventListener('mousemove', this.onMouseMove, false);
    }

    return {

        initListeners: initListeners,
        onMouseMove: onMouseMove,
        onResize: onResize,
        onMouseUp: onMouseUp,
        onMouseDown: onMouseDown,
        setDrag: setDrag

    }


    
})()


