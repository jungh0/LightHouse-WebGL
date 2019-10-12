var bufferData = [];
var bufferDataC = [];
var bufferLocation = [];

//버퍼 만들기
function makeBuffer(vertices, colors, reverse) {
    if (reverse) {
        vertices.forEach(function (element, index, array) {
            vertices[index][1] = element[1] * -1 - 0.6
        });
    }
    var bufferLen = vertices.length
    var bufferDataLen = bufferData.length

    vertices.forEach(function (element, index, array) {
        bufferData.push(element)
    });
    colors.forEach(function (element, index, array) {
        bufferDataC.push(element)
    });
    bufferLocation.push(vec2(bufferDataLen,bufferLen))
}

function drawBuffer(){
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var vertexPositionBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(bufferData), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var vertexColorBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(bufferDataC), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    bufferLocation.forEach(function (element, index, array) {
        gl.drawArrays(gl.TRIANGLE_FAN, element[0], element[1]);
    });
}

//draw circle
function renderCircle(r, x, y, color,color2, subAngle, size, reverse) {
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

    if(color2 == null){
        makeBuffer(mVirtices, makeColorCircle(color,color, mVirtices.length), reverse)
    }else{
        makeBuffer(mVirtices, makeColorCircle(color,color2, mVirtices.length), reverse)
    }
    
}

function makeColorCircle(color,color2, cnt) {
    var tmp = [];
    for (var c = 0; c < cnt; c++) {
        if(c == 0){
            tmp.push(color2)
        }else{
            tmp.push(color)
        }
        
    }
    return tmp;
}

function makeColor(color, cnt) {
    var tmp = [];
    for (var c = 0; c < cnt; c++) {
        tmp.push(color)
    }
    return tmp;
}

//빛 움직임
function moveLight(x,y,reverse) {
    //console.log(LSizeF);
    if (reverse) {
        var yelloT = vec4(1, 1, 0, 0.1);
    } else {
        var yelloT = vec4(1, 1, 0, 0.45);
    }
    renderCircle(3, x, y, transparent, yelloT, Math.PI * LAngle / 2 * LightVec, LSize, reverse)
    
    if (LSize == 10) {
        LSizeF = false
    }

    if (LSize == 1 && !LSizeF) {
        LSize = 2
        LSizeF = true
        LAngle = 1
        LAngleF = true
        //console.log("tt");
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

//마우스 리스너
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
    var tmp = "&nbspx: " + mx + " y: " + my
    document.getElementById("location").innerHTML = tmp;
}

//구름
function makeCloud(x, y, white) {
    renderCircle(0.1, 0.0 + x, 0.3 + y, white, null, Math.PI, 1,false)
    renderCircle(0.1, 0.15 + x, 0.33 + y, white, null, Math.PI, 1,false)
    renderCircle(0.1, 0.3 + x, 0.32 + y, white, null, Math.PI, 1,false)
    renderCircle(0.1, 0.4 + x, 0.25 + y, white, null, Math.PI, 1,false)

    renderCircle(0.1, 0.0 + x, 0.2 + y, white, null, Math.PI, 1,false)
    renderCircle(0.1, 0.1 + x, 0.2 + y, white, null, Math.PI, 1,false)
    renderCircle(0.1, 0.2 + x, 0.15 + y, white, null, Math.PI, 1,false)
    renderCircle(0.1, 0.3 + x, 0.2 + y, white, null, Math.PI, 1,false)
}
