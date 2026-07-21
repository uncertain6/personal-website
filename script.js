function tick(){
  document.getElementById('clock').textContent = new Date().toLocaleTimeString('en-GB');
}
tick();
setInterval(tick, 1000);

function showPanel(id, el){
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + id).classList.add('active');
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
  el.classList.add('active');
  clickSound();
}

let actx;
function ensureCtx(){
  if(!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
  if(actx.state === 'suspended') actx.resume();
}
function tone(freq, start, dur, peak){
  const t = actx.currentTime + start;
  const osc = actx.createOscillator();
  const gain = actx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, t);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(peak, t + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gain).connect(actx.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}
function hoverSound(freq){
  ensureCtx();
  tone(freq, 0, 0.28, 0.1);
}
function clickSound(){
  ensureCtx();
  tone(880, 0, 0.2, 0.12);
  tone(1180, 0.05, 0.2, 0.12);
}