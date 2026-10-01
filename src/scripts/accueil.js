// Accueil immersif : scroll qui ouvre la lame, poteau et coupe-chou en 3D (Three.js),
// son optionnel. Ce fichier n'est chargé que sur "/". Three.js est chargé à part,
// en différé : tant qu'il n'est pas prêt (ou sans WebGL), un poteau en CSS prend le relais.
var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var root = document.documentElement;
var canvas = document.getElementById('gl');
var sections = Array.prototype.slice.call(document.querySelectorAll('.scene'));
var steps = Array.prototype.slice.call(document.querySelectorAll('.steps li'));

function clamp(x, a, b) { a = a === undefined ? 0 : a; b = b === undefined ? 1 : b; return Math.min(b, Math.max(a, x)); }
function smooth(x) { x = clamp(x); return x * x * (3 - 2 * x); }
function lerp(a, b, k) { return a + (b - a) * k; }

/* Le texte du hero apparaît dès que la page est prête, sans attendre la 3D */
window.requestAnimationFrame(function () { root.classList.add('ready'); });

var THREE = null;
var hasGL = false, renderer, scene, camera, pole, razor, bladePivot, keyLight, layoutPortrait = false;

function stripeCanvas() {
  var c = document.createElement('canvas');
  c.width = 256; c.height = 256;
  var g = c.getContext('2d');
  var cols = ['#b3261e', '#efe6d2', '#1f3a6b', '#efe6d2'];
  var band = 32, shift = 640;
  for (var i = -24; i < 10; i++) {
    var y0 = i * band;
    g.fillStyle = cols[((i % 4) + 4) % 4];
    g.beginPath();
    g.moveTo(0, y0);
    g.lineTo(256, y0 + shift);
    g.lineTo(256, y0 + shift + band + 1);
    g.lineTo(0, y0 + band + 1);
    g.closePath();
    g.fill();
  }
  return c;
}

function initGL() {
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    camera.position.set(0, 0, 9);
  } catch (e) {
    root.classList.add("no-gl");
    return;
  }
    var brass = new THREE.MeshPhongMaterial({ color: 0xb98a3c, specular: 0xffe2a0, shininess: 90 });
    var steel = new THREE.MeshPhongMaterial({ color: 0xc9ced2, specular: 0xffffff, shininess: 140 });
    var wood = new THREE.MeshPhongMaterial({ color: 0x3a2216, specular: 0x1a0f08, shininess: 14 });

    var tex = new THREE.CanvasTexture(stripeCanvas());
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 2.5);
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    pole = new THREE.Group();
    var body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.55, 3.2, 64, 1, true),
      new THREE.MeshPhongMaterial({ map: tex, shininess: 60, specular: 0x332211, side: THREE.DoubleSide })
    );
    var glass = new THREE.Mesh(
      new THREE.CylinderGeometry(0.585, 0.585, 3.2, 64, 1, true),
      new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0.1, shininess: 220, specular: 0xffffff, depthWrite: false })
    );
    pole.add(body, glass);

    [1, -1].forEach(function (s) {
      var disc = new THREE.Mesh(new THREE.CylinderGeometry(0.66, 0.66, 0.3, 48), brass);
      disc.position.y = 1.75 * s;
      var ring = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.045, 12, 48), brass);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 1.58 * s;
      var dome = new THREE.Mesh(new THREE.SphereGeometry(0.5, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2), brass);
      dome.position.y = 1.9 * s;
      if (s < 0) { dome.rotation.x = Math.PI; }
      var knob = new THREE.Mesh(new THREE.SphereGeometry(0.12, 20, 12), brass);
      knob.position.y = 2.42 * s;
      pole.add(disc, ring, dome, knob);
    });
    scene.add(pole);

    razor = new THREE.Group();
    var handle = new THREE.Group();
    [-0.05, 0.05].forEach(function (z) {
      var sc = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.26, 0.05), wood);
      sc.position.set(-0.9, 0, z);
      handle.add(sc);
    });
    var bolster = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.3, 0.16), brass);
    bolster.position.set(-0.05, 0, 0);
    var tail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.28, 0.16), brass);
    tail.position.set(-1.8, 0, 0);
    var pin = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.22, 20), brass);
    pin.rotation.x = Math.PI / 2;
    handle.add(bolster, tail, pin);

    var bs = new THREE.Shape();
    bs.moveTo(0, -0.12);
    bs.lineTo(1.5, -0.12);
    bs.quadraticCurveTo(1.86, -0.12, 1.84, 0.08);
    bs.lineTo(1.78, 0.11);
    bs.lineTo(0, 0.11);
    bs.lineTo(0, -0.12);
    var bg = new THREE.ExtrudeGeometry(bs, { depth: 0.028, bevelEnabled: false });
    bg.translate(0, 0, -0.014);
    bladePivot = new THREE.Group();
    bladePivot.add(new THREE.Mesh(bg, steel));
    bladePivot.rotation.z = Math.PI;

    razor.add(handle, bladePivot);
    razor.visible = false;
    scene.add(razor);

    scene.add(new THREE.AmbientLight(0x8a6446, 0.85));
    var sun = new THREE.DirectionalLight(0xffd9a8, 0.8);
    sun.position.set(3, 4, 5);
    scene.add(sun);
    keyLight = new THREE.PointLight(0xffb463, 1.5, 28);
    keyLight.position.set(2, 2, 5);
    scene.add(keyLight);
    var rim = new THREE.PointLight(0x4a6aa8, 0.7, 30);
    rim.position.set(-5, -2, 3);
    scene.add(rim);
  hasGL = true;
  resize();
  root.classList.add("gl-ready");
}

function resize() {
  var w = window.innerWidth, h = window.innerHeight;
  layoutPortrait = (w / h) < 0.95;
  if (hasGL) {
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
}
window.addEventListener('resize', resize);
resize();
/* t vaut 0 en haut de la première scène de l'accueil et 6 en bas de la dernière ; le centre de la scène i est à i + 0.5 */
function scrollT() {
  var c = window.innerHeight * 0.5;
  for (var i = 0; i < sections.length; i++) {
    var r = sections[i].getBoundingClientRect();
    if (c < r.bottom || i === sections.length - 1) {
      return i + clamp((c - r.top) / r.height, 0, 1);
    }
  }
  return 0;
}

var px = 0, py = 0, tpx = 0, tpy = 0;
window.addEventListener('pointermove', function (e) {
  if (e.pointerType === 'touch') { return; }
  tpx = (e.clientX / window.innerWidth) * 2 - 1;
  tpy = -((e.clientY / window.innerHeight) * 2 - 1);
}, { passive: true });

/* ---------- Son ---------- */
var actx = null, master = null, soundOn = false, wasOpen = false;
var sndBtn = document.getElementById('snd');

function buildAudio() {
  var AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) { return false; }
  actx = new AC();
  master = actx.createGain();
  master.gain.value = 0;
  master.connect(actx.destination);
  var rate = actx.sampleRate, len = rate * 4, i;

  var room = actx.createBuffer(1, len, rate), rd = room.getChannelData(0), last = 0;
  for (i = 0; i < len; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; rd[i] = last * 3.2; }
  var roomSrc = actx.createBufferSource(); roomSrc.buffer = room; roomSrc.loop = true;
  var lp = actx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 420;
  var roomGain = actx.createGain(); roomGain.gain.value = 0.5;
  roomSrc.connect(lp); lp.connect(roomGain); roomGain.connect(master);
  roomSrc.start();

  var crack = actx.createBuffer(1, len, rate), cd = crack.getChannelData(0);
  for (i = 0; i < len; i++) { if (Math.random() < 0.0008) { cd[i] = (Math.random() * 2 - 1) * (0.35 + Math.random() * 0.65); } }
  var crackSrc = actx.createBufferSource(); crackSrc.buffer = crack; crackSrc.loop = true;
  var hp = actx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1400;
  var crackGain = actx.createGain(); crackGain.gain.value = 0.55;
  crackSrc.connect(hp); hp.connect(crackGain); crackGain.connect(master);
  crackSrc.start();
  return true;
}

function snick() {
  if (!soundOn || !actx) { return; }
  var len = Math.floor(actx.sampleRate * 0.09);
  var b = actx.createBuffer(1, len, actx.sampleRate), d = b.getChannelData(0);
  for (var i = 0; i < len; i++) { d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3); }
  var s = actx.createBufferSource(); s.buffer = b;
  var bp = actx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 3600; bp.Q.value = 1.4;
  var g = actx.createGain(); g.gain.value = 0.9;
  s.connect(bp); bp.connect(g); g.connect(master);
  s.start();
}

if (window.AudioContext || window.webkitAudioContext) { sndBtn.hidden = false; }
sndBtn.addEventListener('click', function () {
  if (!actx && !buildAudio()) { return; }
  soundOn = !soundOn;
  if (actx.state === 'suspended') { actx.resume(); }
  master.gain.cancelScheduledValues(actx.currentTime);
  master.gain.linearRampToValueAtTime(soundOn ? 0.22 : 0, actx.currentTime + 0.4);
  sndBtn.setAttribute('aria-pressed', soundOn ? 'true' : 'false');
  sndBtn.textContent = soundOn ? 'Son activé' : 'Son coupé';
});
document.addEventListener('visibilitychange', function () {
  if (!actx) { return; }
  if (document.hidden) { actx.suspend(); } else if (soundOn) { actx.resume(); }
});


/* ---------- Boucle ---------- */
var tS = 0, last = performance.now(), elapsed = 0;

function frame(now) {
  window.requestAnimationFrame(frame);
  var dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  elapsed += dt;

  var t = scrollT();
  tS = reduce ? t : tS + (t - tS) * (1 - Math.exp(-dt * 5));
  px += (tpx - px) * (1 - Math.exp(-dt * 4));
  py += (tpy - py) * (1 - Math.exp(-dt * 4));

  var open = smooth((tS - 2.2) / 0.7);
  for (var i = 0; i < steps.length; i++) {
    steps[i].classList.toggle('on', open >= i * 0.25 + 0.05);
  }
  if (open > 0.5 && !wasOpen) { wasOpen = true; snick(); }
  if (open < 0.4) { wasOpen = false; }

  if (hasGL) {
    var P = layoutPortrait;

    var v1 = 1 - smooth((tS - 1.6) / 0.6);
    var v2 = smooth((tS - 4.9) / 0.6);
    var vp = Math.max(v1, v2);
    var xRight = P ? 0 : 2.5, xLeft = P ? 0 : -2.6;
    var x = tS < 3 ? lerp(xRight, xLeft, smooth((tS - 0.5) / 1.0)) : xRight;
    pole.visible = vp > 0.01;
    if (pole.visible) {
      pole.scale.setScalar((P ? 0.55 : 0.78) * (0.6 + 0.4 * vp));
      pole.position.set(x, (P ? 1.35 : -0.1) - (1 - vp) * 0.6, 0);
      pole.rotation.y = (reduce ? 0 : elapsed * 0.8) + tS * 1.2 + px * 0.4;
      pole.rotation.z = -0.05 + px * 0.03;
    }

    var vr = smooth((tS - 1.9) / 0.5) * (1 - smooth((tS - 3.1) / 0.5));
    razor.visible = vr > 0.01;
    if (razor.visible) {
      razor.scale.setScalar((P ? 0.62 : 1.0) * (0.6 + 0.4 * vr));
      razor.position.set(P ? 0 : 1.9, (P ? 1.5 : 0.1) - (1 - vr) * 0.5, 0);
      razor.rotation.set(-0.35 + py * 0.15, -0.5 + (tS - 2.5) * 0.6 + px * 0.3, -0.12);
      bladePivot.rotation.z = Math.PI * (1 - open);
    }

    keyLight.position.set(px * 4 + 1, py * 3 + 1.5, 4.5);
    if (pole.visible || razor.visible) { renderer.render(scene, camera); }
    else { renderer.clear(); }
  }
}

window.requestAnimationFrame(frame);

/* Three.js : chargé à part, une fois la page affichée et le navigateur au repos */
function charger() {
  import('three').then(function (mod) {
    THREE = mod;
    initGL();
  }).catch(function () { root.classList.add('no-gl'); });
}
if ('requestIdleCallback' in window) { window.requestIdleCallback(charger, { timeout: 1500 }); }
else { window.setTimeout(charger, 300); }
