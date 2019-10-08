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

//버퍼 만들기
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

//빛 움직임
function moveLight() {
    var yelloT = vec4(1, 1, 0, 0.45);
    renderCircle(3, 0.44, 0.48, yelloT, Math.PI * LAngle / 2 * LightVec, LSize)

    //console.log(LSizeF);

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