
var Listeners = (function()
{

    var self = this;
    var drag = false;
    var xdelta = 0;
    var ydelta = 0;
    var dContent = undefined;
    var dStart = undefined;

    var setDrag = function (event) {

        dContent = event.target.parentElement;
        drag = true;
        var area = dContent.getBoundingClientRect();
        var Gameview = Global.GameDiv.getBoundingClientRect();

        

        xdelta = event.clientX - area.x;
        ydelta = event.clientY - area.y;

        Global.controls.enabled = false;
    };

    var onMouseDown = function (event) {
        event.preventDefault();
        var id = event.target.id;
        var targetclass = event.target.classList.contains("drag");
            
        var area = event.target.getBoundingClientRect();
        console.log(id)
        //IF rightclick for rightclick menu
        if (event.button == 2) {
            
            if (id == "connection-view") {
                Ui.togglePropertyMenu(event);
            }
            else if(id == "canvas") {
                Ui.toggleRightMenu(event);
            }
        }

            //IF left click on draggable window
        else if (event.button == 0){
            
            if (targetclass) {
                setDrag(event);
            }         
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

            dContent.style.left = event.pageX - xdelta + 'px';
            dContent.style.top = event.pageY - ydelta + 'px';

            console.log(event.clientY + " " + ydelta + 'px');
        }
    };

    var initListeners = function() {

        debugger;
        Global.MainDiv.addEventListener('mousedown', this.onMouseDown, false);
        window.addEventListener('resize', this.onResize, false);
        Global.MainDiv.addEventListener('mouseup', this.onMouseUp, false);
        Global.MainDiv.addEventListener('mousemove', this.onMouseMove, false);

        //Global.ConnectDiv.addEventListener('mousedown', this.onMouseDown, false);.addEventListener('mousedown', this.onMouseDown, false);

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


