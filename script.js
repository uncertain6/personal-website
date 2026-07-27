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
}