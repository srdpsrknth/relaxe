/* Reuses the existing same-origin study 17 bridge; no native preferences or persistence. */
(function(){
'use strict';
const frames=[...document.querySelectorAll('iframe[data-side]')],controls=[...document.querySelectorAll('[data-control]')];
function send(frame){const values=Object.fromEntries(controls.map(control=>[control.dataset.control,control.value]));Object.assign(values,{'layout-kind':'compact','layout-side':frame.dataset.side,'layout-surface':'filled','layout-thumbsize':'64','layout-toolbarvisibility':'hidden'});frame.contentWindow?.postMessage({type:'relaxe-layout-comparison',values},location.origin)}
for(const frame of frames)frame.addEventListener('load',()=>send(frame));
for(const control of controls)control.addEventListener('change',()=>frames.forEach(send));
frames.forEach(send);
})();
