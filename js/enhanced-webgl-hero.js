/**
 * Enhanced WebGL Hero - Vanilla JS Implementation
 * Advanced shader effects with pointer interactions
 * Converts React/WebGL component to pure vanilla JavaScript
 */

class WebGLRenderer {
  constructor(canvas, scale = 1) {
    this.canvas = canvas;
    this.scale = scale;
    this.gl = canvas.getContext('webgl2', { antialias: false, alpha: false });
    if (!this.gl) {
      console.error('WebGL2 not supported');
      return;
    }
    
    this.program = null;
    this.vs = null;
    this.fs = null;
    this.buffer = null;
    this.shaderSource = this.getDefaultShader();
    
    this.mouseMove = [0, 0];
    this.mouseCoords = [0, 0];
    this.pointerCoords = [0, 0];
    this.nbrOfPointers = 0;
    
    this.vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;
    
    this.vertices = [-1, 1, -1, -1, 1, 1, 1, -1];
    
    this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
  }

  getDefaultShader() {
    return `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
uniform vec2 move;
uniform vec2 touch;
uniform int pointerCount;
uniform vec2 pointers[10];

#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}

float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float fbm(vec2 p) {
  float t=.0, a=1.; 
  mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}

float clouds(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a);
    d=a;
    p*=2./(i+1.);
  }
  return t;
}

void main(void) {
  vec2 uv=(FC-.5*R)/MN;
  vec2 st=uv*vec2(2.,1.);
  
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y+move.y*.001));
  
  uv+=.1*touch/MN;
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
  }
  
  for (int i=0; i<pointerCount; i++) {
    vec2 pcoord = pointers[i];
    float dist = distance(FC, pcoord);
    col += vec3(.5,.3,.1) * 0.1 / (dist + 1.);
  }
  
  O=vec4(col,1);
}`;
  }

  compile(shader, source) {
    const gl = this.gl;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const error = gl.getShaderInfoLog(shader);
      console.error('Shader compilation error:', error);
    }
  }

  test(source) {
    let result = null;
    const gl = this.gl;
    const shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      result = gl.getShaderInfoLog(shader);
    }
    gl.deleteShader(shader);
    return result;
  }

  reset() {
    const gl = this.gl;
    if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
      if (this.vs) {
        gl.detachShader(this.program, this.vs);
        gl.deleteShader(this.vs);
      }
      if (this.fs) {
        gl.detachShader(this.program, this.fs);
        gl.deleteShader(this.fs);
      }
      gl.deleteProgram(this.program);
    }
  }

  setup() {
    const gl = this.gl;
    this.vs = gl.createShader(gl.VERTEX_SHADER);
    this.fs = gl.createShader(gl.FRAGMENT_SHADER);
    this.compile(this.vs, this.vertexSrc);
    this.compile(this.fs, this.shaderSource);
    this.program = gl.createProgram();
    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.program));
    }
  }

  init() {
    const gl = this.gl;
    const program = this.program;
    
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    program.resolution = gl.getUniformLocation(program, 'resolution');
    program.time = gl.getUniformLocation(program, 'time');
    program.move = gl.getUniformLocation(program, 'move');
    program.touch = gl.getUniformLocation(program, 'touch');
    program.pointerCount = gl.getUniformLocation(program, 'pointerCount');
    program.pointers = gl.getUniformLocation(program, 'pointers');
  }

  updateMouse(coords) {
    this.mouseCoords = coords;
  }

  updateMove(deltas) {
    this.mouseMove = deltas;
  }

  updatePointerCoords(coords) {
    this.pointerCoords = coords;
  }

  updatePointerCount(nbr) {
    this.nbrOfPointers = nbr;
  }

  updateScale(scale) {
    this.scale = scale;
    this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale);
  }

  render(now = 0) {
    const gl = this.gl;
    const program = this.program;
    
    if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    
    gl.uniform2f(program.resolution, this.canvas.width, this.canvas.height);
    gl.uniform1f(program.time, now * 1e-3);
    gl.uniform2f(program.move, this.mouseMove[0], this.mouseMove[1]);
    gl.uniform2f(program.touch, this.mouseCoords[0], this.mouseCoords[1]);
    gl.uniform1i(program.pointerCount, this.nbrOfPointers);
    
    if (this.pointerCoords.length > 0) {
      gl.uniform2fv(program.pointers, new Float32Array(this.pointerCoords));
    }
    
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

class PointerHandler {
  constructor(element, scale = 1) {
    this.scale = scale;
    this.active = false;
    this.pointers = new Map();
    this.lastCoords = [0, 0];
    this.moves = [0, 0];

    const map = (x, y) => [x * this.scale, element.height - y * this.scale];

    element.addEventListener('pointerdown', (e) => {
      this.active = true;
      this.pointers.set(e.pointerId, map(e.clientX, e.clientY));
    });

    element.addEventListener('pointerup', (e) => {
      if (this.count === 1) {
        this.lastCoords = this.first;
      }
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });

    element.addEventListener('pointerleave', (e) => {
      if (this.count === 1) {
        this.lastCoords = this.first;
      }
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });

    element.addEventListener('pointermove', (e) => {
      if (!this.active) return;
      this.lastCoords = [e.clientX, e.clientY];
      this.pointers.set(e.pointerId, map(e.clientX, e.clientY));
      this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];
    });

    element.addEventListener('mousemove', (e) => {
      if (!this.active) return;
      this.lastCoords = [e.clientX, e.clientY];
    });
  }

  get count() {
    return this.pointers.size;
  }

  get move() {
    return this.moves;
  }

  get coords() {
    return this.pointers.size > 0 
      ? Array.from(this.pointers.values()).flat() 
      : [0, 0];
  }

  get first() {
    const firstPointer = this.pointers.values().next().value;
    return firstPointer || this.lastCoords;
  }

  updateScale(scale) {
    this.scale = scale;
  }
}

class EnhancedWebGLHero {
  constructor() {
    this.canvasRef = null;
    this.rendererRef = null;
    this.pointersRef = null;
    this.animationFrameRef = null;
    this.init();
  }

  init() {
    const heroSection = document.querySelector('#home');
    if (!heroSection) {
      console.error('Hero section #home not found');
      return;
    }

    // Create or get canvas
    let canvas = heroSection.querySelector('canvas.webgl-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.className = 'webgl-canvas absolute inset-0 w-full h-full object-contain touch-none';
      canvas.style.background = 'black';
      heroSection.insertBefore(canvas, heroSection.firstChild);
    }

    this.canvasRef = canvas;
    this.setupRenderer();
    this.setupAnimationLoop();
    this.setupResizeListener();
  }

  setupRenderer() {
    const canvas = this.canvasRef;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    this.rendererRef = new WebGLRenderer(canvas, dpr);
    this.pointersRef = new PointerHandler(canvas, dpr);

    this.rendererRef.setup();
    this.rendererRef.init();

    if (this.rendererRef.test(this.rendererRef.shaderSource) === null) {
      // Shader is valid
    }
  }

  setupAnimationLoop() {
    const loop = (now) => {
      if (!this.rendererRef || !this.pointersRef) return;

      this.rendererRef.updateMouse(this.pointersRef.first);
      this.rendererRef.updatePointerCount(this.pointersRef.count);
      this.rendererRef.updatePointerCoords(this.pointersRef.coords);
      this.rendererRef.updateMove(this.pointersRef.move);
      this.rendererRef.render(now);
      
      this.animationFrameRef = requestAnimationFrame(loop);
    };

    this.animationFrameRef = requestAnimationFrame(loop);
  }

  setupResizeListener() {
    const resize = () => {
      if (!this.canvasRef) return;

      const canvas = this.canvasRef;
      const dpr = Math.max(1, 0.5 * window.devicePixelRatio);

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      if (this.rendererRef) {
        this.rendererRef.updateScale(dpr);
      }
      if (this.pointersRef) {
        this.pointersRef.updateScale(dpr);
      }
    };

    window.addEventListener('resize', resize, { passive: true });
  }

  destroy() {
    if (this.animationFrameRef) {
      cancelAnimationFrame(this.animationFrameRef);
    }
    if (this.rendererRef) {
      this.rendererRef.reset();
    }
  }
}

// Add CSS animations
const webglAnimationsStyle = document.createElement('style');
webglAnimationsStyle.textContent = `
  @keyframes fade-in-down {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-down {
    animation: fade-in-down 0.8s ease-out forwards;
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
    opacity: 0;
  }

  .animation-delay-200 {
    animation-delay: 0.2s;
  }

  .animation-delay-400 {
    animation-delay: 0.4s;
  }

  .animation-delay-600 {
    animation-delay: 0.6s;
  }

  .animation-delay-800 {
    animation-delay: 0.8s;
  }

  .webgl-canvas {
    will-change: transform;
    display: block;
  }

  #home {
    position: relative;
    overflow: hidden;
  }

  .hero-content-overlay {
    position: absolute;
    inset: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .trust-badge {
    margin-bottom: 2rem;
  }

  .trust-badge-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 140, 0, 0.1);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 180, 0, 0.3);
    border-radius: 9999px;
    font-size: 0.875rem;
    color: rgb(255, 200, 124);
  }

  .hero-heading {
    text-align: center;
    margin: 1.5rem 0;
  }

  .hero-headline {
    font-size: clamp(2.5rem, 10vw, 7rem);
    font-weight: 700;
    background: linear-gradient(90deg, rgb(255, 200, 124), rgb(255, 200, 0), rgb(217, 119, 6));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1.2;
    margin: 0.5rem 0;
  }

  .hero-headline:nth-of-type(2) {
    background: linear-gradient(90deg, rgb(255, 200, 0), rgb(255, 140, 0), rgb(220, 38, 38));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero-subtitle {
    max-width: 48rem;
    margin: 0 auto;
    font-size: clamp(1rem, 3vw, 1.5rem);
    color: rgba(255, 200, 124, 0.9);
    font-weight: 300;
    line-height: 1.6;
  }

  .hero-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    margin-top: 2.5rem;
  }

  @media (min-width: 640px) {
    .hero-buttons {
      flex-direction: row;
    }
  }

  .hero-button {
    padding: 1rem 2rem;
    border-radius: 9999px;
    font-weight: 600;
    font-size: 1.125rem;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
  }

  .hero-button-primary {
    background: linear-gradient(135deg, rgb(255, 140, 0), rgb(255, 200, 0));
    color: rgb(15, 15, 15);
  }

  .hero-button-primary:hover {
    background: linear-gradient(135deg, rgb(255, 120, 0), rgb(255, 180, 0));
    transform: scale(1.05);
    box-shadow: 0 20px 25px -5px rgba(255, 140, 0, 0.25);
  }

  .hero-button-primary:active {
    transform: scale(0.95);
  }

  .hero-button-secondary {
    background: rgba(255, 140, 0, 0.1);
    border: 2px solid rgba(255, 180, 0, 0.3);
    color: rgb(255, 200, 124);
    backdrop-filter: blur(12px);
  }

  .hero-button-secondary:hover {
    background: rgba(255, 140, 0, 0.2);
    border-color: rgba(255, 180, 0, 0.5);
    transform: scale(1.05);
  }

  .hero-button-secondary:active {
    transform: scale(0.95);
  }

  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .px-8 { padding-left: 2rem; padding-right: 2rem; }
  .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
  .mb-8 { margin-bottom: 2rem; }
  .mb-2 { margin-bottom: 0.5rem; }
  .mt-10 { margin-top: 2.5rem; }
  .sm\:flex-row { flex-direction: row; }
`;

document.head.appendChild(webglAnimationsStyle);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new EnhancedWebGLHero();
  });
} else {
  new EnhancedWebGLHero();
}
