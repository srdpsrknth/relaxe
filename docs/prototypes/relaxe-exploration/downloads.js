/* Study 28. Download-choice presentation only. No requests, files, permissions or jobs. */
(function(){
'use strict';
const E=id=>document.getElementById(id),T=window.RelaxeStudyTheme,config={appearance:'light',palette:'blue',text:'1',width:'390'};
let open=false;
function choices(){switch(E('download-fixture').value){case'gallery':return[['current','Download current item','Image 2 of 3'],['all','Download all items','3 items in this gallery post']];case'gallery-no-index':return[['all','Download all items','3 items in this gallery post']];case'gif-video':return[['gif','Download GIF','GIF version'],['gif-video','Download video','Video variant of this GIF']];case'gif':return[['gif','Download GIF','GIF version']];case'image':return[['image','Download image','This image only']];case'video':return[['video','Download video','This video only']];default:return[]}}
function theme(){const settings={foundation:'selected',...config},direction=T.directions[0],phone=E('download-phone');for(const [key,value]of Object.entries(T.tokens(direction,settings)))phone.style.setProperty(key,value);T.setStyleAttributes(phone,direction,settings);phone.style.setProperty('--w',config.width+'px');phone.style.setProperty('--h',({360:800,390:844,600:960,720:480}[config.width])+'px');phone.dataset.largeText=String(+config.text>=2);window.RelaxeShell?.setContext({account:E('download-account').value,subreddit:'hiking',...config})}
function setOpen(value){open=value;E('download-overlay').hidden=!open;E('download-open').setAttribute('aria-expanded',String(open));for(const child of E('download-phone').children)if(child!==E('download-overlay'))child.inert=open;(open?E('download-close'):E('download-open')).focus({preventScroll:true})}
function select(id,label){E('download-result').hidden=false;E('download-result').textContent='Route preview: '+label+'. No download was started.';E('download-feedback').textContent=E('download-result').textContent;setOpen(false)}
function render(){
 const options=choices();
 E('download-actions').replaceChildren();E('download-empty').hidden=!!options.length;
 for(const [id,label,help]of options){const button=document.createElement('button');button.type='button';button.className='download-action';button.dataset.download=id;const text=document.createElement('span');text.textContent=label;const detail=document.createElement('small');detail.textContent=help;button.append(text,detail);button.addEventListener('click',()=>select(id,label));E('download-actions').append(button)}
 E('download-media-caption').textContent=({gallery:'Gallery post · image 2 of 3','gallery-no-index':'Gallery post · 3 items',image:'Single image','gif-video':'GIF preview · video version available',gif:'GIF preview',video:'Video preview',link:'Link preview'})[E('download-fixture').value];
 E('download-context').textContent=(E('download-account').value==='guest'?'Guest':'u/weekendreader')+' · A weekend on the trail';
}
for(const [id,key]of [['download-appearance','appearance'],['download-palette','palette'],['download-scale','text'],['download-width','width']])E(id).addEventListener('change',event=>{config[key]=event.target.value;theme()});
for(const id of ['download-fixture','download-account'])E(id).addEventListener('change',()=>{E('download-result').hidden=true;render();theme();setOpen(true)});
E('download-close').innerHTML=T.icon('close');E('download-close').addEventListener('click',()=>setOpen(false));E('download-open').addEventListener('click',()=>{render();setOpen(true)});
E('download-overlay').addEventListener('click',event=>{if(event.target===E('download-overlay'))setOpen(false)});
E('download-overlay').addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();setOpen(false)}if(event.key!=='Tab')return;const items=[...E('download-panel').querySelectorAll('button,[tabindex="0"]')].filter(el=>!el.disabled&&el.getClientRects().length),first=items[0],last=items.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}});
render();theme();setOpen(true);document.addEventListener('relaxe-shell-ready',()=>{theme();for(const child of E('download-phone').children)if(child!==E('download-overlay'))child.inert=open},{once:true});
})();
