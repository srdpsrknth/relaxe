/* Focused surface comparison. Existing same-origin study bridge; no persistence. */
(function(){
'use strict';
const frames=[...document.querySelectorAll('iframe[data-surface]')],controls=[...document.querySelectorAll('[data-control]')],family=document.getElementById('surface-family');
const requestedFamily=new URLSearchParams(location.search).get('family');
if(requestedFamily==='compact')family.value='compact';
function send(frame){const values=Object.fromEntries(controls.map(control=>[control.dataset.control,control.value]));values['layout-kind']=family.value;values['layout-surface']=frame.dataset.surface;frame.contentWindow?.postMessage({type:'relaxe-layout-comparison',values},location.origin)}
function update(){document.documentElement.style.setProperty('--comparison-width',document.getElementById('surface-width').value+'px');for(const frame of frames)send(frame);document.getElementById('surface-status').textContent='Reviewing '+(family.value==='compact'?'Compact card':'Large card · Card 1')+'. Filled is the selected default.'}
for(const control of [...controls,family])control.addEventListener('change',update);
for(const frame of frames)frame.addEventListener('load',()=>send(frame));
for(const button of document.querySelectorAll('[data-surface-jump]'))button.addEventListener('click',()=>frames.find(frame=>frame.dataset.surface===button.dataset.surfaceJump)?.closest('.comparison-panel').scrollIntoView({block:'nearest',inline:'start'}));
update();
})();
