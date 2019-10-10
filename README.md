# LightHouse-WebGL

<pre><a href="https://jungh0.github.io/LightHouse-WebGL/LightHouse/">https://jungh0.github.io/LightHouse-WebGL/LightHouse/</a></pre>

## LightHouse Source
<img src="https://user-images.githubusercontent.com/8678595/66541973-228a6000-eb6c-11e9-82cd-e72d420c6964.gif" width="400px">

<pre><a href="https://jungh0.github.io/LightHouse-WebGL/LightExample/">https://jungh0.github.io/LightHouse-WebGL/LightExample/</a></pre>

Light function
```js
function moveLight(reverse) {
    //console.log(LSizeF);
    if (reverse) {
        var yelloT = vec4(1, 1, 0, 0.1);
    } else {
        var yelloT = vec4(1, 1, 0, 0.45);
    }
    renderCircle(3, 0, 0, transparent, yelloT, Math.PI * LAngle / 2 * LightVec, LSize, reverse)
    
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
```

Circle function
```js
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
```

## LICENSE
```
   Copyright 2019 Jungh0

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```
