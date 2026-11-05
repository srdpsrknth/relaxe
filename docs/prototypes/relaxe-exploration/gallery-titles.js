/* Focused same-origin study 17 Gallery interaction preview; no settings store or API actions. */
(function(){
'use strict';
const frames=[...document.querySelectorAll('iframe[data-captions]')],controls=[...document.querySelectorAll('[data-control]')];
function send(frame){const values=Object.fromEntries(controls.map(control=>[control.dataset.control,control.value]));Object.assign(values,{'nav-theme':'blue','layout-kind':'gallery','layout-columns':'2','layout-gallery':'media','layout-height':'fit','layout-swipeaxis':'horizontal','layout-gallerytitle':frame.dataset.captions});frame.contentWindow?.postMessage({type:'relaxe-layout-comparison',values},location.origin)}
for(const frame of frames)frame.addEventListener('load',()=>send(frame));
for(const control of controls)control.addEventListener('change',()=>frames.forEach(send));
frames.forEach(send);
})();
