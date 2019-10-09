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

    background()

    //light start
    var tmp = false
    if ((LSizeF && LightVec == 1) || (!LSizeF && LightVec == -1)) {
        LightBack(); tmp = true;
    }
    moveLight(false)
    if ((!LSizeF && LightVec == 1) || (!tmp && LightVec == -1)) {
        LightBack()
    }
    //light end

    lightHouseWindow()

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

function background() {
    //sky start
    var color = [
        vec4(0.13, 0.2, 0.32, 1.0),
        vec4(0.28, 0.39, 0.56, 1.0),
        vec4(0.28, 0.39, 0.56, 1.0),
        vec4(0.13, 0.2, 0.32, 1.0),
    ];
    var vertices = [vec2(-1, 1), vec2(-1, -0.3), vec2(1, -0.3), vec2(1, 1),];
    makeBuffer(vertices, color)
    //sky end

    //cloud start
    var color = vec4(0.23, 0.29, 0.41, 1);
    makeCloud(0.15, 0.74, color)
    makeCloud(-0.76, 0.5, color)
    //cloud end

    //mountain start
    var color = vec4(0.12, 0.23, 0.277, 1);
    var vertices = [vec2(-1, -0.15), vec2(-0.856, -0.052), vec2(-0.656, -0.136)]
    makeBuffer(vertices, makeColor(color, vertices.length), false)

    var color = vec4(0.12, 0.23, 0.277, 1);
    var vertices = [vec2(-0.092, -0.14), vec2(0.14, -0.016), vec2(1, -0.056), vec2(1, -0.164)];
    makeBuffer(vertices, makeColor(color, vertices.length), false)
    //mountain end


    //moon start
    renderCircle(0.6, -0.46, 0.26, transparent, whiteLv1, 1, 1, false)
    renderCircle(0.1, -0.46, 0.26, white, null, 1, 1, false)
    //moon end
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
        //water color end
    }

    ///ground start
    var color = vec4(0.11, 0.18, 0.29, 1);

    var vertices = [vec2(-0.34, -0.088), vec2(-0.316, -0.06), vec2(-0.3, -0.064), vec2(-0.28, -0.084)];
    makeBuffer(vertices, makeColor(color, vertices.length), reverse)

    var vertices = [vec2(-0.896, -0.14), vec2(-0.884, -0.116), vec2(-0.872, -0.112), vec2(-0.856, -0.128)];
    makeBuffer(vertices, makeColor(color, vertices.length), reverse)

    var vertices = [vec2(-1, -0.15), vec2(-0.7, -0.15), vec2(-0.5, -0.05), vec2(-0.1, -0.1), vec2(1, -0.15), vec2(1, -0.3), vec2(-1, -0.3)];
    makeBuffer(vertices, makeColor(color, vertices.length), reverse)

    var vertices = [vec2(0.592, -0.132), vec2(0.608, -0.116), vec2(0.64, -0.136)];
    makeBuffer(vertices, makeColor(color, vertices.length), reverse)

    var vertices = [vec2(0.224, -0.116), vec2(0.236, -0.1), vec2(0.248, -0.12), vec2(0.252, -0.1), vec2(0.268, -0.116)];
    makeBuffer(vertices, makeColor(color, vertices.length), reverse)

    //tree start
    var vertices = [vec2(-0.208, -0.104), vec2(-0.188, -0.052), vec2(-0.176, -0.048), vec2(-0.192, -0.096)];
    makeBuffer(vertices, makeColor(color, vertices.length), reverse)

    var vertices = [vec2(-0.188, -0.052), vec2(-0.2, -0.028), vec2(-0.184, -0.02), vec2(-0.176, -0.048)];
    makeBuffer(vertices, makeColor(color, vertices.length), reverse)

    var vertices = [vec2(-0.2, -0.028), vec2(-0.2, 0.012), vec2(-0.18, 0.012), vec2(-0.184, -0.02)];
    makeBuffer(vertices, makeColor(color, vertices.length), reverse)

    renderCircle(0.025, -0.2, 0.012, vec4(0.11, 0.18, 0.29, 1), null, 1, 1, reverse)
    renderCircle(0.015, -0.22, 0.009, vec4(0.11, 0.18, 0.29, 1), null, 1, 1, reverse)
    renderCircle(0.020, -0.175, 0.01, vec4(0.11, 0.18, 0.29, 1), null, 1, 1, reverse)

    var vertices = [vec2(-0.192, -0.048), vec2(-0.236, -0.036), vec2(-0.228, -0.028), vec2(-0.192, -0.032)];
    makeBuffer(vertices, makeColor(color, vertices.length), reverse)

    renderCircle(0.02, -0.236, -0.036, vec4(0.11, 0.18, 0.29, 1), null, 1, 1, reverse)
    renderCircle(0.018, -0.23, -0.018, vec4(0.11, 0.18, 0.29, 1), null, 1, 1, reverse)
    renderCircle(0.015, -0.216, -0.008, vec4(0.11, 0.18, 0.29, 1), null, 1, 1, reverse)

    var vertices = [vec2(-0.184, -0.032), vec2(-0.156, -0.012), vec2(-0.156, -0.024), vec2(-0.184, -0.044)];
    makeBuffer(vertices, makeColor(color, vertices.length), reverse)

    renderCircle(0.018, -0.156, -0.012, vec4(0.11, 0.18, 0.29, 1), null, 1, 1, reverse)
    renderCircle(0.015, -0.143, -0.023, vec4(0.11, 0.18, 0.29, 1), null, 1, 1, reverse)
    //tree end

    for (offset_ = 0; offset_ < 0.3; offset_ += 0.1) {
        var vertices = [
            vec2(0.032 + offset_, -0.104),
            vec2(0.032 + offset_, -0.05),
            vec2(0.04 + offset_, -0.1),
            vec2(0.04 + offset_, -0.05)
        ];
        makeBuffer(vertices, makeColor(color, vertices.length), reverse)
    }
    ///ground end

    //lighthouse start
    var color = vec4(0.11, 0.18, 0.29, 1);
    var vertices = [vec2(0.3, -0.2), vec2(0.6, -0.2), vec2(0.55, 0.6), vec2(0.35, 0.6)];
    makeBuffer(vertices, makeColor(color, vertices.length), reverse)

    var vertices = [vec2(0.32, 0.6), vec2(0.58, 0.6), vec2(0.58, 0.65), vec2(0.32, 0.65)];
    makeBuffer(vertices, makeColor(color, vertices.length), reverse)

    var vertices = [vec2(0.41, 0.65), vec2(0.49, 0.65), vec2(0.49, 0.68), vec2(0.41, 0.68)];
    makeBuffer(vertices, makeColor(color, vertices.length), reverse)
    //lighthouse end

    if (reverse) {
        //moon start
        renderCircle(0.6, -0.46, 0.26, transparent, whiteLv1, 1, 1, reverse)
        renderCircle(0.1, -0.46, 0.26, white, null, 1, 1, reverse)
        //moon end

        //water effect start
        var color = vec4(0, 0, 0, 0.7);
        var vertices = [vec2(-1, -1), vec2(-1, -0.3), vec2(1, -0.3), vec2(1, -1),];
        makeBuffer(vertices, makeColor(color, vertices.length))
        //water effect end
    }
}

function lightHouseWindow() {
    //lighthouse light start
    var color = [
        vec4(0.95, 0.96, 0.58, 1),
        vec4(0.95, 0.96, 0.58, 1),
        vec4(0.63, 0.69, 0.62, 1),
        vec4(0.63, 0.69, 0.62, 1),
    ];

    var vertices = [vec2(0.36, 0.59), vec2(0.445, 0.59), vec2(0.445, 0.45), vec2(0.35, 0.45)];
    makeBuffer(vertices, color, false)

    var vertices = [vec2(0.54, 0.59), vec2(0.455, 0.59), vec2(0.455, 0.45), vec2(0.55, 0.45)];
    makeBuffer(vertices, color, false)
    //lighthouse light end
}