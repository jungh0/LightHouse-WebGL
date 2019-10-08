var gl;
var points;



window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    window.requestAnimationFrame(Ani);

    canvas.addEventListener("mousemove", function(){onMouseUp(event)});
};

function Ani(){
    var white = vec4(1, 1, 1, 1);
    var yello = vec4(1, 1, 0, 1);
    var black = vec4(0, 0, 0, 1);

    //black start
    var color = vec4(0, 0, 0, 1);
    var vertices = [vec2(-1, 1),vec2(-1, -1),vec2(1, -1),vec2(1, 1),];
    makeBuffer(vertices, makeColor(color, vertices.length))
    drawFAN(0, vertices.length)
    //black end

    //sky start
    var color = vec4(0.26, 0.38, 0.53, 1);
    var vertices = [vec2(-1, 1),vec2(-1, -0.3),vec2(1, -0.3),vec2(1, 1),];
    makeBuffer(vertices, makeColor(color, vertices.length))
    drawFAN(0, vertices.length)
    //sky end

    //ground start
    var color = vec4(0.11, 0.18, 0.29, 1);
    var vertices = [vec2(-1, -0.15),vec2(-0.5, -0.1),vec2(1, -0.15),vec2(1, -0.3),vec2(-1, -0.3)];
    makeBuffer(vertices, makeColor(color, vertices.length))
    drawFAN(0, vertices.length)
    //ground end

    //lighthouse start
    var color = vec4(0.11, 0.18, 0.29, 1);
    var vertices = [vec2(0.3, -0.2),vec2(0.6, -0.2),vec2(0.55,0.6),vec2(0.35, 0.6)];
    makeBuffer(vertices, makeColor(color, vertices.length))
    drawFAN(0, vertices.length)
    var vertices = [vec2(0.32, 0.6),vec2(0.58, 0.6),vec2(0.58,0.66),vec2(0.32, 0.66)];
    makeBuffer(vertices, makeColor(color, vertices.length))
    drawFAN(0, vertices.length)
    var vertices = [vec2(0.41, 0.66),vec2(0.49, 0.66),vec2(0.49,0.70),vec2(0.41, 0.70)];
    makeBuffer(vertices, makeColor(color, vertices.length))
    drawFAN(0, vertices.length)
    //lighthouse end

    //lighthouse light start
    var color = vec4(0.95, 0.96, 0.58, 1);
    var vertices = [vec2(0.38, 0.56),vec2(0.44, 0.56),vec2(0.44,0.43),vec2(0.37, 0.43)];
    makeBuffer(vertices, makeColor(color, vertices.length))
    drawFAN(0, vertices.length)
    var vertices = [vec2(0.46,0.43),vec2(0.53,0.43),vec2(0.52, 0.56),vec2(0.46,0.56)];
    makeBuffer(vertices, makeColor(color, vertices.length))
    drawFAN(0, vertices.length)
    //lighthouse light end

    //moon start
    renderCircle(0.1, -0.46, 0.26, white,1,1)
    //moon end

    //light start
    moveLight()
    //light start

    setTimeout(Ani,100)
}

var tmp1 = 1
var tmp1F = true
var tmp2 = 2
var tmp2F = true

function moveLight(){
    var yelloT = vec4(1, 1, 0, 0.5);
    renderCircle(3, 0.44, 0.48, yelloT, Math.PI * tmp1/2 ,tmp2)

    if(tmp1F){
        tmp1 += 1/16
    }else{
        tmp1 -= 1/16
    }
    if (tmp1 >= 3){
        tmp1F = false
        console.log("sad");
    }
    if (tmp1 == 1){
        tmp1F = true
    }

    if(tmp2F){
        tmp2 += 0.5
    }else{
        tmp2 -= 0.5
    }
    if (tmp2 >= 10){
        tmp2F = false
    }
    if (tmp2 == 2){
        tmp2F = true
    }
}

function makeCloud(x, y, white) {
    renderCircle(0.1, 0.0 + x, 0.3 + y, white)
    renderCircle(0.1, 0.15 + x, 0.33 + y, white)
    renderCircle(0.1, 0.3 + x, 0.32 + y, white)
    renderCircle(0.1, 0.4 + x, 0.25 + y, white)

    renderCircle(0.1, 0.0 + x, 0.2 + y, white)
    renderCircle(0.1, 0.1 + x, 0.2 + y, white)
    renderCircle(0.1, 0.2 + x, 0.15 + y, white)
    renderCircle(0.1, 0.3 + x, 0.2 + y, white)
}

function makeTree(tmp, treecolor) {
    makeBuffer(tmp, makeColor(treecolor, tmp.length))
    drawTRI(0, 9)
    var bodycolor = vec4(0.5, 0.3, 0.0, 1.0);
    makeBuffer(tmp, makeColor(bodycolor, tmp.length))
    drawTRI(9, 6)
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

//draw circle
function renderCircle(r, x, y, color, subAngle, size) {
    var noOfFans = 200;
    var centerOfCircle = vec2(x, y);
    var anglePerFna = (2 * Math.PI) / noOfFans;

    var mVirtices = [];
    mVirtices.push(centerOfCircle);

    for (var i = 0; i <= noOfFans/size; i++) {
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

//move tree x, y
function makeTreeLeaf(vertices, aa, bb) {
    var tmp = vertices
    //var ran = getRandomArbitrary(1,1.05)
    for (let [index, val] of vertices.entries()) {
        if (index % 2 == 0) {
            tmp[index] += aa
        }
        if (index % 2 == 1) {
            tmp[index] += bb
        }
        //tmp[index] *= ran
    }
    return tmp
}

function renderHalfCircle(r, x, y, color) {
    var noOfFans = 20;
    var centerOfCircle = vec2(x, y);
    var anglePerFna = (2 * Math.PI) / noOfFans;

    var mVirtices = [];
    mVirtices.push(centerOfCircle);

    for (var i = 0; i <= noOfFans/4; i++) {
        var angle = anglePerFna * (i + 1);
        mVirtices.push(
            vec2(
                x + Math.cos(angle) * r,
                y + Math.sin(angle) * r
            )
        );
    }
    makeBuffer(mVirtices,color)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, mVirtices.length);
}

function rainbow(){
    var vertices = [
        vec2( -0.4, -0.1 ),
        vec2( 1, 0.7 ),
        vec2( 1, 0.8 ),
        vec2( -0.5, -0.1 ),

        vec2( -0.5, -0.1 ),
        vec2( 1, 0.8 ),
        vec2( 1, 0.9 ),
        vec2( -0.6, -0.1 ),

        vec2( -0.6, -0.1 ),
        vec2( 1, 0.9 ),
        vec2( 1, 1.0 ),
        vec2( -0.7, -0.1 ),

        vec2( -0.7, -0.1 ),
        vec2( 1, 1.0 ),
        vec2( 1, 1.1 ),
        vec2( -0.8, -0.1 ),
    ];
    var colors = [
        vec4(1.0, 0.0, 1.0, 1.0),
        vec4(1.0, 0.0, 1.0, 1.0),
        vec4(0.0, 0.0, 1.0, 1.0),
        vec4(0.0, 0.0, 1.0, 1.0),

        vec4(0.0, 0.0, 1.0, 1.0),
        vec4(0.0, 0.0, 1.0, 1.0),
        vec4(0.0, 1.0, 1.0, 1.0),
        vec4(0.0, 1.0, 1.0, 1.0),

        vec4(0.0, 1.0, 1.0, 1.0),
        vec4(0.0, 1.0, 1.0, 1.0),
        vec4(1.0, 1.0, 0.0, 1.0),
        vec4(1.0, 1.0, 0.0, 1.0),

        vec4(1.0, 1.0, 0.0, 1.0),
        vec4(1.0, 1.0, 0.0, 1.0),
        vec4(1.0, 0.0, 0.0, 1.0),
        vec4(1.0, 0.0, 0.0, 1.0),
    ];
    makeBuffer(vertices,colors)
    this.drawFAN(0, 4)
    this.drawFAN(4, 4)
    this.drawFAN(8, 4)
    this.drawFAN(12, 4) 
}

function onMouseUp(event) {
    
    var mx = event.clientX;
    var my = event.clientY;
    var canvas = document.getElementById('gl-canvas');
    var rect = canvas.getBoundingClientRect();// check if your browser supports this
    mx = mx - rect.left;
    my = my - rect.top;
    if(mx==250){
        mx = 0;
    }
    if(mx<250){
        mx = (250 - mx)/250 * -1
    }
    if(mx>250){
        mx = (mx - 250)/250
    }
    if(my==250){
        mx = 0;
    }
    if(my<250){
        my = (250 - my)/250
    }
    if(my>250){
        my = (my - 250)/250 * -1
    }
    console.log({x: mx , y: my});

}