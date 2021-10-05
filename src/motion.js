function main() {
  var canvas, gl, shaderProgram;

  var Dynamic = [];
  var Static = [];
  var vertices = [];

  canvas = document.getElementById("canva");
  gl = canvas.getContext("webgl");

    // -------- GAMBAR DINAMIS ----------

    var stick1 = [ // gagang hijau
      0.55, 0.8, 0.477, 0.72, 0.403, 
      0.60, 0.8, 0.477, 0.72, 0.403, 
      0.57, 0.85, 0.477, 0.72, 0.403, 
      0.61, 0.85, 0.477, 0.72, 0.403
    ];

    Dynamic = Dynamic.concat(stick1);

    var stick2 = [ // gagang kuning
      0.5, 0.5, 0.96, 0.939, 0.71, 
      0.45, 0.5, 0.96, 0.939, 0.71, 
      0.55, 0.8, 0.96, 0.939, 0.71, 
      0.6, 0.8, 0.96, 0.939, 0.71
    ];

    Dynamic = Dynamic.concat(stick2);

    var stick3 = [ //gagang abu-abu
      0.5, 0.5, 0.53, 0.493, 0.493, 
      0.45, 0.5, 0.86, 0.814, 0.814, 
      0.32, 0, 0.86, 0.814, 0.814, 
      0.3, 0, 0.86, 0.814, 0.814
    ];

    Dynamic = Dynamic.concat(stick3);

    for (var i = 0; i <= 450; i += 0.5) { //lingkaran
      var j = (i * Math.PI) / 180; //derajat ke radian

      var circle0 = [
        (Math.sin(j) / 8) + 0.2,(Math.cos(j) / 8),
        0.86,
        0.814,
        0.814,
      ];

      var circle1 = [
        (Math.sin(j) / 8) + 0.2, 0, 
        0.76, 0.714, 0.714
        // 9010
      ];

      Dynamic = Dynamic.concat(circle0);
      Dynamic = Dynamic.concat(circle1);
    }
    

    // ----------------- GAMBAR STATIS -------------------
      var stick4 = [ // gagang hijau
        -0.65, 0.7, 0.477, 0.72, 0.403, 
        -0.59, 0.7, 0.477, 0.72, 0.403, 
        -0.64, 0.75, 0.477, 0.72, 0.403, 
        -0.60, 0.75, 0.477, 0.72, 0.403 //9090
      ];
  
      Static = Static.concat(stick4);
  
      var stick5 = [ // gagang kuning
        -0.65, 0.7, 0.96, 0.939, 0.71, 
        -0.59, 0.7, 0.96, 0.939, 0.71, 
        -0.64, 0.2, 0.96, 0.939, 0.71, 
        -0.60, 0.2, 0.96, 0.939, 0.71 //9110
      ];
  
      Static = Static.concat(stick5);
  
      var stick6 = [ // gagang abu-abu
        -0.64, 0.2, 0.53, 0.493, 0.493, 
        -0.60, 0.2, 0.86, 0.814, 0.814, 
        -0.63, -0.55, 0.86, 0.814, 0.814, 
        -0.61, -0.55, 0.86, 0.814, 0.814 //9130
      ];
      
      Static = Static.concat(stick6);

    for (var i = 0; i <= 450; i += 0.5) { //lingkaran
        var j = (i * Math.PI) / 180; //derajat ke radian
  
        var circle2 = [
          (Math.sin(j) / 8)-0.63,(Math.cos(j) / 8)-0.6,
          0.86,
          0.814,
          0.814,
        ];
  
        var circle3 = [
        (Math.sin(j) / 8)-0.63, -0.6, 
          0.76, 0.714, 0.714
          // 18150
        ];
  
        Static = Static.concat(circle2);
        Static = Static.concat(circle3);
    }

    vertices = vertices.concat(Dynamic);
    vertices = vertices.concat([(Math.sin(j) / 8) + 0.2, 0, 1, 1, 1, -0.65, 0.7, 1, 1, 1]);
    vertices = vertices.concat(Static);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);


    var vertexShaderSource = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uChange;
        void main() {
            gl_Position = vec4(aPosition.x, aPosition.y, 1.0, 1.0);
            vColor = aColor;
        }
    `;

    var fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);


    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);


    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);


    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(aPosition);
    
    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aColor);

      
    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(
      aPosition,
      2,
      gl.FLOAT,
      false,
      5 * Float32Array.BYTES_PER_ELEMENT,
      0
    );
    gl.enableVertexAttribArray(aPosition);

    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(
      aColor,
      3,
      gl.FLOAT,
      false,
      5 * Float32Array.BYTES_PER_ELEMENT,
      2 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aColor);
  
  var speed = 0.0032;
  var change = 0;
  var uChange = gl.getUniformLocation(shaderProgram, "uChange");

  function render() { // motion
      if (change < -0.5 || change > 0) {
        speed = speed * -1;
      }

      for (let i = 1; i < 9011; i += 5) {
          vertices[i] = vertices[i] + speed;
      }
      
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
      change = change + speed;
      gl.uniform1f(uChange, change);

      gl.clearColor(1.0, 1.0, 1.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length);
      requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
