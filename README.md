# LightHouse-WebGL
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
</br>

<pre><a href="https://jungh0.github.io/LightHouse-WebGL/LightHouse/">https://jungh0.github.io/LightHouse-WebGL/LightHouse/</a></pre>

## LightHouse 
<img src="https://user-images.githubusercontent.com/8678595/66697213-949aaa80-ed0e-11e9-8da6-1847b1233308.gif" width="400px">


## Light Source
<img src="https://user-images.githubusercontent.com/8678595/66541973-228a6000-eb6c-11e9-82cd-e72d420c6964.gif" width="400px">

<pre><a href="https://jungh0.github.io/LightHouse-WebGL/LightExample/">https://jungh0.github.io/LightHouse-WebGL/LightExample/</a></pre>

**Implement Light (main.js)**
```js
function moveLight(reverse) {
    moveLight(0, 0, false)
}
```

**MoveLight function (util.js)**
```js
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
