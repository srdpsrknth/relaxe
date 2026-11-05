/* Scoped to the new adaptive compositor. Existing stand-alone feed studies are unchanged. */
(function(){
'use strict';
if(new URLSearchParams(location.search).get('adaptive-study')!=='1'||parent===window)return;
let child=null,bridge=null,bound=false;
const canonical=id=>bridge?.fixturePosts().find(p=>p.id===id)?.fixtureId||id;
const send=data=>parent.postMessage(data,location.origin);
function bind(){if(bound)return;const f=document.getElementById('shell-feed');child=f?.contentWindow;bridge=child?.RelaxeFeedStudy;if(!bridge)return;bound=true;const allowed=['p1','p2','p3','p4','p5'],replace=bridge.replacePosts;bridge.replacePosts=fixtures=>replace(fixtures.filter(p=>allowed.includes(p.fixtureId||p.id)));bridge.replacePosts(bridge.fixturePosts());
 const doc=child.document;let lastPost=null;const open=id=>{id=canonical(id);if(!allowed.includes(id))return;doc.querySelectorAll('video').forEach(v=>v.pause());send({type:'relaxe-adaptive-open',post:id})};bridge.openPostDetails=open;
 child.addEventListener('click',event=>{const b=event.target.closest('[data-action]'),row=b?.closest('[data-post]');if(!b)return;if(row)lastPost=row.dataset.post;const action=b.dataset.action;if(['open-post','post-details','comments','gallery-details'].includes(action)&&(row||lastPost)){event.preventDefault();event.stopImmediatePropagation();open(row?.dataset.post||lastPost)}},true);
 let media=false,overlay=false;const observe=()=>{const next=!!doc.querySelector('.media'),nextOverlay=!!doc.querySelector('dialog[open]');if(next!==media){media=next;send({type:'relaxe-adaptive-media',active:media})}if(nextOverlay!==overlay){overlay=nextOverlay;send({type:'relaxe-adaptive-feed-overlay',active:overlay})}};new child.MutationObserver(observe).observe(doc.body,{childList:true,subtree:true,attributes:true,attributeFilter:['open']});observe();
}
window.addEventListener('message',event=>{if(event.origin!==location.origin||event.source!==parent)return;const data=event.data;if(data?.type==='relaxe-adaptive-bind')bind();if(!bound)return;if(data?.type==='relaxe-adaptive-suspend')child.document.querySelectorAll('video').forEach(v=>v.pause());if(data?.type==='relaxe-adaptive-focus'&&['p1','p2','p3','p4','p5'].includes(data.post)){const row=[...child.document.querySelectorAll('[data-post]')].find(n=>canonical(n.dataset.post)===data.post);row?.scrollIntoView({block:'nearest',inline:'nearest'});(row?.querySelector('[data-action="open-post"], [data-action="open-media"]')||row)?.focus({preventScroll:true})}if(data?.type==='relaxe-adaptive-media-back'){const dialog=child.document.querySelector('dialog[open]');if(dialog){dialog.close();return}child.document.dispatchEvent(new child.KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true}))}});
})();
