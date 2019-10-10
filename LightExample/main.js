var gl;
var points;

var white = vec4(1, 1, 1, 1);
var transparent = vec4(0, 0, 0, 0);
var whiteLv1 = vec4(1, 1, 1, 0.2);

var LightVec = -1 //등대 방향 바꾸기 1: 왼쪽 -1: 오른쪽
var LAngle = 1
var LAngleF = true
var LSize = 2
var LSizeF = true

var speed = 0

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    window.requestAnimationFrame(object);
    canvas.addEventListener("mousemove", function () { onMouseUp(event) });
    addListener()
};

function object() {
    bufferData = [];
    bufferDataC = [];
    bufferLocation = [];

    var color = vec4(0, 0, 0, 1);
    var vertices = [vec2(-1, -1), vec2(-1, 1), vec2(1, 1), vec2(1, -1),];
    makeBuffer(vertices, makeColor(color, vertices.length))

    moveLight(false)


    drawBuffer()

    if (speed == 0) {
        window.requestAnimationFrame(object);
    } else {
        setTimeout(object, speed)
    }

}

//슬라이드 리스너
function rangeVal(newVal) {
    speed = newVal
}

//버튼 리스너
function addListener() {
    document.getElementById("rotate").onclick = function (event) {
        if (LightVec == 1) {
            LightVec = -1
        } else {
            LightVec = 1
        }
    };
}

