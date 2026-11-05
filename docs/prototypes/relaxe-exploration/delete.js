/* Study 26. Contained delete confirmation. Page-memory fixture only; no requests. */
(function(){
'use strict';
const E=id=>document.getElementById(id),T=window.RelaxeStudyTheme,config={appearance:'light',palette:'blue',text:'1',width:'390'};
const postBody='We followed the lower trail through the trees and reached the viewpoint just before the clouds lifted.',commentBody='The lower trail is open again. Please stay on the marked path.';
let open=false,deleted=false;
const target=()=>E('delete-target').value,kind=()=>target()==='post'?'post':'comment',owns=()=>E('delete-owner').value==='own';
function theme(){const settings={foundation:'selected',...config},direction=T.directions[0],phone=E('delete-phone');for(const [key,value]of Object.entries(T.tokens(direction,settings)))phone.style.setProperty(key,value);T.setStyleAttributes(phone,direction,settings);phone.style.setProperty('--w',config.width+'px');phone.style.setProperty('--h',({360:800,390:844,600:960,720:480}[config.width])+'px');phone.dataset.largeText=String(+config.text>=2);window.RelaxeShell?.setContext({account:E('delete-owner').value==='guest'?'guest':'weekendreader',subreddit:'hiking',...config})}
function render(){
  const isPost=kind()==='post',author=owns()?'weekendreader':'trailnotes',body=isPost?postBody:commentBody;
  E('delete-page-title').textContent=deleted&&isPost?'Home':'Post details';
  E('delete-content').hidden=deleted&&target()!=='parent';E('delete-child').hidden=target()!=='parent';
  E('delete-author').textContent=deleted?'[deleted] · r/hiking':'u/'+author+' · r/hiking';
  E('delete-post-title').hidden=!isPost;E('delete-body').textContent=deleted?'[deleted]':body;
  E('delete-open').textContent='Delete '+kind();E('delete-open').hidden=!owns()||deleted;
  E('delete-unavailable').hidden=owns()||deleted;
  E('delete-title').textContent='Delete this '+kind()+'?';E('delete-confirm').textContent='Delete '+kind();
  E('delete-account').textContent='u/weekendreader · r/hiking';
  E('delete-target-label').textContent=isPost?'Post · A quiet loop after the rain':'Comment on “A quiet loop after the rain”';
  E('delete-excerpt').textContent=body;
  E('delete-warning').textContent='Delete your '+kind()+' from Reddit? Relaxe has no Undo for deletion.';
}
function setOpen(value){open=value&&owns()&&!deleted;E('delete-overlay').hidden=!open;E('delete-open').setAttribute('aria-expanded',String(open));for(const child of E('delete-phone').children)if(child!==E('delete-overlay'))child.inert=open;if(open)E('delete-cancel').focus({preventScroll:true});else if(!E('delete-open').hidden)E('delete-open').focus({preventScroll:true});else if(!E('delete-result').hidden)E('delete-result').focus({preventScroll:true});else E('delete-feed').focus({preventScroll:true})}
function reset(){deleted=false;E('delete-result').hidden=true;render();theme();setOpen(owns())}
for(const [id,key]of [['delete-appearance','appearance'],['delete-palette','palette'],['delete-scale','text'],['delete-width','width']])E(id).addEventListener('change',event=>{config[key]=event.target.value;theme()});
for(const id of ['delete-target','delete-owner'])E(id).addEventListener('change',reset);
E('delete-reset').addEventListener('click',reset);E('delete-open').addEventListener('click',()=>setOpen(true));E('delete-cancel').addEventListener('click',()=>setOpen(false));
E('delete-confirm').addEventListener('click',()=>{
  if(!open||!owns()||deleted)return;
  const failure=E('delete-outcome').value==='error';if(!failure)deleted=true;
  E('delete-result').textContent=failure?'Demo failure: your '+kind()+' is unchanged. Nothing was deleted on Reddit.':kind()==='post'?'Demo success: post details closed. Nothing was deleted on Reddit.':'Demo success: comment preview updated. Nothing was deleted on Reddit.';
  E('delete-result').hidden=false;E('delete-feedback').textContent=failure?'Demo failure left the content unchanged.':'Synthetic success only. No native or Reddit content changed.';render();setOpen(false);
});
E('delete-overlay').addEventListener('click',event=>{if(event.target===E('delete-overlay'))setOpen(false)});
E('delete-overlay').addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();setOpen(false)}if(event.key!=='Tab')return;const items=[E('delete-scroll'),E('delete-cancel'),E('delete-confirm')],first=items[0],last=items.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}});
reset();
document.addEventListener('relaxe-shell-ready',()=>{theme();for(const child of E('delete-phone').children)if(child!==E('delete-overlay'))child.inert=open},{once:true});
})();
