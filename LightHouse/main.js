var gl;
var points;

var white = vec4(1, 1, 1, 1);

var LightVec = -1 //등대 방향 바꾸기 1: 왼쪽 -1: 오른쪽
var LAngle = 1
var LAngleF = true
var LSize = 2
var LSizeF = true

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
    //sky start
    var color = [
        vec4(0.13, 0.2, 0.32, 1.0),
        vec4(0.28, 0.39, 0.56, 1.0),
        vec4(0.28, 0.39, 0.56, 1.0),
        vec4(0.13, 0.2, 0.32, 1.0),
    ];
    var vertices = [vec2(-1, 1), vec2(-1, -0.3), vec2(1, -0.3), vec2(1, 1),];
    makeBuffer(vertices, color)
    drawFAN(0, vertices.length)
    //sky end

    //cloud start
    var color = vec4(0.23, 0.29, 0.41, 1);
    makeCloud(0.15, 0.74, color)
    makeCloud(-0.76, 0.5, color)
    //cloud end

    var tmp = false
    if ((LSizeF && LightVec == 1) || (!LSizeF && LightVec == -1)) {
        tmp = true
        LightBack()
    }

    //light start
    moveLight(false)
    //light end

    if ((!LSizeF && LightVec == 1) || (!tmp && LightVec == -1)) {
        LightBack()
    }

    window.requestAnimationFrame(object);
    //setTimeout(object, 100)
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

function LightBack() {
    mainvec(false)
    mainvec(true)
}

function mainvec(reverse) {

    if (!reverse) {
        //water color start
        var color = vec4(0.26, 0.38, 0.53, 1);
        var vertices = [vec2(-1, -1), vec2(-1, -0.3), vec2(1, -0.3), vec2(1, -1),];
        makeBuffer(vertices, makeColor(color, vertices.length))
        drawFAN(0, vertices.length)
        //water color end
    }

    //ground start
    var color = vec4(0.11, 0.18, 0.29, 1);
    var vertices = [vec2(-1, -0.15), vec2(-0.5, -0.05), vec2(-0.1, -0.1), vec2(1, -0.15), vec2(1, -0.3), vec2(-1, -0.3)];
    makeBuffer(vertices, makeColor(color, vertices.length), reverse)
    drawFAN(0, vertices.length)

    var vertices = [vec2(0.592, -0.132), vec2(0.608, -0.116), vec2(0.64, -0.136)];
    makeBuffer(vertices, makeColor(color, vertices.length), reverse)
    drawFAN(0, vertices.length)

    var vertices = [vec2(0.224, -0.116), vec2(0.236, -0.1), vec2(0.248, -0.12), vec2(0.252, -0.1), vec2(0.268, -0.116)];
    makeBuffer(vertices, makeColor(color, vertices.length), reverse)
    drawFAN(0, vertices.length)

    for (offset_ = 0; offset_ < 0.3; offset_ += 0.1) {
        var vertices = [
            vec2(0.032 + offset_, -0.104),
            vec2(0.032 + offset_, -0.05),
            vec2(0.04 + offset_, -0.1),
            vec2(0.04 + offset_, -0.05)
        ];
        makeBuffer(vertices, makeColor(color, vertices.length), reverse)
        drawFAN(0, vertices.length)
    }
    //ground end

    //lighthouse start
    var color = vec4(0.11, 0.18, 0.29, 1);
    var vertices = [vec2(0.3, -0.2), vec2(0.6, -0.2), vec2(0.55, 0.6), vec2(0.35, 0.6)];
    makeBuffer(vertices, makeColor(color, vertices.length), reverse)
    drawFAN(0, vertices.length)

    var vertices = [vec2(0.32, 0.6), vec2(0.58, 0.6), vec2(0.58, 0.65), vec2(0.32, 0.65)];
    makeBuffer(vertices, makeColor(color, vertices.length), reverse)
    drawFAN(0, vertices.length)
    
    var vertices = [vec2(0.41, 0.65), vec2(0.49, 0.65), vec2(0.49, 0.68), vec2(0.41, 0.68)];
    makeBuffer(vertices, makeColor(color, vertices.length), reverse)
    drawFAN(0, vertices.length)
    //lighthouse end

    //lighthouse light start
    var color = vec4(0.95, 0.96, 0.58, 1);
    var color = [
        vec4(0.95, 0.96, 0.58, 1),
        vec4(0.95, 0.96, 0.58, 1),
        vec4(0.95, 0.96, 0.58, 0.3),
        vec4(0.95, 0.96, 0.58, 0.3),
    ];

    var vertices = [vec2(0.36, 0.59), vec2(0.445, 0.59), vec2(0.445, 0.45), vec2(0.35, 0.45)];
    makeBuffer(vertices, color, reverse)
    drawFAN(0, vertices.length)

    var vertices = [vec2(0.54, 0.59), vec2(0.455, 0.59),vec2(0.455, 0.45), vec2(0.55, 0.45)];
    makeBuffer(vertices, color, reverse)
    drawFAN(0, vertices.length)
    //lighthouse light end

    //moon start
    renderCircle(0.1, -0.46, 0.26, white, 1, 1, reverse)
    //moon end

    if (reverse) {
        //water effect start
        var color = vec4(0, 0, 0, 0.7);
        var vertices = [vec2(-1, -1), vec2(-1, -0.3), vec2(1, -0.3), vec2(1, -1),];
        makeBuffer(vertices, makeColor(color, vertices.length))
        drawFAN(0, vertices.length)
        //water effect end
    }

}

//구름
function makeCloud(x, y, white) {
    renderCircle(0.1, 0.0 + x, 0.3 + y, white, Math.PI, 1)
    renderCircle(0.1, 0.15 + x, 0.33 + y, white, Math.PI, 1)
    renderCircle(0.1, 0.3 + x, 0.32 + y, white, Math.PI, 1)
    renderCircle(0.1, 0.4 + x, 0.25 + y, white, Math.PI, 1)

    renderCircle(0.1, 0.0 + x, 0.2 + y, white, Math.PI, 1)
    renderCircle(0.1, 0.1 + x, 0.2 + y, white, Math.PI, 1)
    renderCircle(0.1, 0.2 + x, 0.15 + y, white, Math.PI, 1)
    renderCircle(0.1, 0.3 + x, 0.2 + y, white, Math.PI, 1)
}
