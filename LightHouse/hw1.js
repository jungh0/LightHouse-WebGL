var gl;
var points;

var white = vec4(1, 1, 1, 1);

var LightVec = 1 //등대 방향 바꾸기 1: 왼쪽 -1: 오른쪽
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

    window.requestAnimationFrame(Ani);
    canvas.addEventListener("mousemove", function () { onMouseUp(event) });
};

function Ani() {
    //sky start
    var color = vec4(0.26, 0.38, 0.53, 1);
    var vertices = [vec2(-1, 1), vec2(-1, -0.3), vec2(1, -0.3), vec2(1, 1),];
    makeBuffer(vertices, makeColor(color, vertices.length))
    drawFAN(0, vertices.length)
    //sky end

    //moon start
    renderCircle(0.1, -0.46, 0.26, white, 1, 1)
    //moon end

    //cloud start
    var color = vec4(0.23, 0.29, 0.41, 1);
    makeCloud(0.15, 0.74, color)
    makeCloud(-0.76, 0.5, color)
    //cloud end

    //light start
    if ((LSizeF && LightVec == 1) || (!LSizeF && LightVec == -1)) { LightBack() }
    moveLight()
    if ((!LSizeF && LightVec == 1) || (LSizeF && LightVec == -1)) { LightBack() }
    //light start

    window.requestAnimationFrame(Ani);
    //setTimeout(Ani, 100)
}

function LightBack() {
    //black start
    var color = vec4(0, 0, 0, 1);
    var vertices = [vec2(-1, -1), vec2(-1, -0.3), vec2(1, -0.3), vec2(1, -1),];
    makeBuffer(vertices, makeColor(color, vertices.length))
    drawFAN(0, vertices.length)
    //black end

    //ground start
    var color = vec4(0.11, 0.18, 0.29, 1);
    var vertices = [vec2(-1, -0.15), vec2(-0.5, -0.1), vec2(1, -0.15), vec2(1, -0.3), vec2(-1, -0.3)];
    makeBuffer(vertices, makeColor(color, vertices.length))
    drawFAN(0, vertices.length)
    //ground end

    //lighthouse start
    var color = vec4(0.11, 0.18, 0.29, 1);
    var vertices = [vec2(0.3, -0.2), vec2(0.6, -0.2), vec2(0.55, 0.6), vec2(0.35, 0.6)];
    makeBuffer(vertices, makeColor(color, vertices.length))
    drawFAN(0, vertices.length)
    var vertices = [vec2(0.32, 0.6), vec2(0.58, 0.6), vec2(0.58, 0.66), vec2(0.32, 0.66)];
    makeBuffer(vertices, makeColor(color, vertices.length))
    drawFAN(0, vertices.length)
    var vertices = [vec2(0.41, 0.66), vec2(0.49, 0.66), vec2(0.49, 0.70), vec2(0.41, 0.70)];
    makeBuffer(vertices, makeColor(color, vertices.length))
    drawFAN(0, vertices.length)
    //lighthouse end

    //lighthouse light start
    var color = vec4(0.95, 0.96, 0.58, 1);
    var vertices = [vec2(0.38, 0.56), vec2(0.44, 0.56), vec2(0.44, 0.43), vec2(0.37, 0.43)];
    makeBuffer(vertices, makeColor(color, vertices.length))
    drawFAN(0, vertices.length)
    var vertices = [vec2(0.46, 0.43), vec2(0.53, 0.43), vec2(0.52, 0.56), vec2(0.46, 0.56)];
    makeBuffer(vertices, makeColor(color, vertices.length))
    drawFAN(0, vertices.length)
    //lighthouse light end
}

function moveLight() {
    var yelloT = vec4(1, 1, 0, 0.45);
    renderCircle(3, 0.44, 0.48, yelloT, Math.PI * LAngle / 2 * LightVec, LSize)

    console.log(LSizeF);

    if (LSize == 10) {
        LSizeF = false
    }

    if (LSize == 1 && !LSizeF) {
        LSize = 2
        LSizeF = true
        LAngle = 1
        LAngleF = true
        console.log("tt");
    }

    if (LSizeF) {
        LSize += 0.5
    } else {
        LSize -= 0.5
    }

    if (LAngleF) {
        LAngle += 1 / 16
    }

    if (LAngle >= 3) {
        LAngleF = false
        LSize = 1
    }

}

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

function makeColor(color, cnt) {
    var tmp = [];
    for (var c = 0; c < cnt; c++) {
        tmp.push(color)
    }
    return tmp;
}

function drawFAN(a, b) {
    gl.drawArrays(gl.TRIANGLE_FAN, a, b);
}

function drawTRI(a, b) {
    gl.drawArrays(gl.TRIANGLES, a, b);
}

function makeBuffer(vertices, colors) {
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var vertexPositionBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var vertexColorBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
}

//draw circle
function renderCircle(r, x, y, color, subAngle, size) {
    var noOfFans = 200;
    var centerOfCircle = vec2(x, y);
    var anglePerFna = (2 * Math.PI) / noOfFans;
    var mVirtices = [];
    mVirtices.push(centerOfCircle);
    for (var i = 0; i <= noOfFans / size; i++) {
        var angle = anglePerFna * (i + 1);
        mVirtices.push(
            vec2(
                x + Math.cos(angle + subAngle) * r,
                y + Math.sin(angle + subAngle) * r
            )
        );
    }
    makeBuffer(mVirtices, makeColor(color, mVirtices.length))
    gl.drawArrays(gl.TRIANGLE_FAN, 0, mVirtices.length);
}

function onMouseUp(event) {
    var mx = event.clientX;
    var my = event.clientY;
    var canvas = document.getElementById('gl-canvas');
    var rect = canvas.getBoundingClientRect();
    mx = mx - rect.left;
    my = my - rect.top;
    if (mx == 250) { mx = 0; }
    if (mx < 250) { mx = (250 - mx) / 250 * -1 }
    if (mx > 250) { mx = (mx - 250) / 250 }
    if (my == 250) { mx = 0; }
    if (my < 250) { my = (250 - my) / 250 }
    if (my > 250) { my = (my - 250) / 250 * -1 }
    console.log({ x: mx, y: my });
}
