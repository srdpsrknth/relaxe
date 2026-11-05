/* Study 27. Source-shaped moderator action inventory. Route previews only. */
(function(){
'use strict';
const E=id=>document.getElementById(id),T=window.RelaxeStudyTheme,config={appearance:'light',palette:'blue',text:'1',width:'390'};
let open=false,pendingRemoval=null;
const eligible=()=>E('mod-access').value==='moderator';
function theme(){const settings={foundation:'selected',...config},direction=T.directions[0],phone=E('mod-phone');for(const [key,value]of Object.entries(T.tokens(direction,settings)))phone.style.setProperty(key,value);T.setStyleAttributes(phone,direction,settings);phone.style.setProperty('--w',config.width+'px');phone.style.setProperty('--h',({360:800,390:844,600:960,720:480}[config.width])+'px');phone.dataset.largeText=String(+config.text>=2);window.RelaxeShell?.setContext({account:E('mod-access').value==='guest'?'guest':'weekendreader',subreddit:'hiking',...config})}
function setOpen(value){if(!value)clearConfirmation();open=value&&eligible();E('mod-overlay').hidden=!open;E('mod-open').setAttribute('aria-expanded',String(open));for(const child of E('mod-phone').children)if(child!==E('mod-overlay')&&child!==E('mod-confirm-overlay'))child.inert=open;if(open)E('mod-close').focus({preventScroll:true});else if(!E('mod-open').hidden)E('mod-open').focus({preventScroll:true});else E('mod-feed').focus({preventScroll:true})}
function clearConfirmation(){pendingRemoval=null;E('mod-confirm-overlay').hidden=true;E('mod-panel').inert=false}
function route(id,label){if(!eligible())return;E('mod-result').hidden=false;E('mod-result').textContent='Route preview: '+label+'. No moderator action was performed.';E('mod-feedback').textContent=E('mod-result').textContent;setOpen(false)}
function cancelConfirmation(){const id=pendingRemoval?.id;clearConfirmation();if(open)(E('mod-panel').querySelector('[data-action="'+id+'"]')||E('mod-close')).focus({preventScroll:true})}
function select(id,label){
  if(!eligible())return;
  if(!['remove','spam'].includes(id)){route(id,label);return}
  const kind=E('mod-target').value;
  pendingRemoval={id,label};E('mod-confirm-title').textContent=id==='spam'?'Mark this '+kind+' as spam?':'Remove this '+kind+'?';
  E('mod-confirm-target').textContent=kind==='post'?'Post · A quiet loop after the rain':'Comment on “A quiet loop after the rain”';
  E('mod-confirm-excerpt').textContent=kind==='post'?'We followed the lower trail and stayed on the marked route.':'The lower trail is open again. Please stay on the marked path.';
  E('mod-confirm-warning').textContent=id==='spam'?'Remove this '+kind+' and mark it as spam in r/hiking?':'Remove this '+kind+' from r/hiking?';
  E('mod-confirm-submit').textContent=id==='spam'?'Mark as spam':'Remove '+kind;
  E('mod-panel').inert=true;E('mod-confirm-overlay').hidden=false;E('mod-confirm-scroll').scrollTop=0;E('mod-confirm-cancel').focus({preventScroll:true});
}
function addActions(host,items){for(const [id,label]of items){const button=document.createElement('button');button.type='button';button.className='mod-action';button.dataset.action=id;button.textContent=label;button.addEventListener('click',()=>select(id,label));host.append(button)}}
function render(){
  const post=E('mod-target').value==='post',state=E('mod-state').value,flagged=state==='flagged';
  E('mod-primary').dataset.composition='buttons';E('mod-primary').replaceChildren();E('mod-secondary').replaceChildren();
  E('mod-target-summary').textContent=(post?'Post · A quiet loop after the rain':'Comment · The lower trail is open again')+' · '+(state==='approved'?'Approved':state==='removed'?'Removed':'Review fixture');
  E('mod-secondary-title').textContent=post?'Post controls':'Comment controls';
  const primary=[];if(state!=='approved')primary.push(['approve','Approve']);if(state!=='removed')primary.push(['remove','Remove'],['spam','Mark as spam']);
  const secondary=[];if(post)secondary.push(['sticky',flagged?'Unsticky post':'Sticky post']);secondary.push(['lock',flagged?'Unlock':'Lock']);
  if(post){secondary.push(['nsfw',flagged?'Unmark NSFW':'Mark NSFW'],['spoiler',flagged?'Unmark spoiler':'Mark spoiler']);if(state!=='no-flair')secondary.push(['flair','Change flair'])}
  secondary.push(['distinguish',flagged?'Undistinguish as moderator':'Distinguish as moderator']);
  // Ineligible fixtures expose no action rows, even in the hidden sheet.
  if(eligible()){addActions(E('mod-primary'),primary);addActions(E('mod-secondary'),secondary)}
  E('mod-open').hidden=!eligible();E('mod-availability').textContent=eligible()?'Review trigger. Native entry is through the existing moderator action route.':'Moderator actions are unavailable for this access/handler fixture.';
}
for(const [id,key]of [['mod-appearance','appearance'],['mod-palette','palette'],['mod-scale','text'],['mod-width','width']])E(id).addEventListener('change',event=>{config[key]=event.target.value;theme()});
for(const id of ['mod-target','mod-state','mod-access'])E(id).addEventListener('change',()=>{clearConfirmation();E('mod-result').hidden=true;render();theme();setOpen(true)});
E('mod-close').innerHTML=T.icon('close');E('mod-close').addEventListener('click',()=>setOpen(false));E('mod-open').addEventListener('click',()=>setOpen(true));
E('mod-overlay').addEventListener('click',event=>{if(event.target===E('mod-overlay'))setOpen(false)});
E('mod-overlay').addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();setOpen(false)}if(event.key!=='Tab')return;const items=[...E('mod-panel').querySelectorAll('button,[tabindex="0"]')].filter(el=>!el.disabled&&el.getClientRects().length),first=items[0],last=items.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}});
E('mod-confirm-cancel').addEventListener('click',cancelConfirmation);
E('mod-confirm-submit').addEventListener('click',()=>{if(!pendingRemoval||!eligible())return;const {id,label}=pendingRemoval;route(id,label)});
E('mod-confirm-overlay').addEventListener('click',event=>{if(event.target===E('mod-confirm-overlay'))cancelConfirmation()});
E('mod-confirm-overlay').addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();cancelConfirmation()}if(event.key!=='Tab')return;const first=E('mod-confirm-scroll'),last=E('mod-confirm-submit');if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}});
render();theme();setOpen(true);
document.addEventListener('relaxe-shell-ready',()=>{theme();for(const child of E('mod-phone').children)if(child!==E('mod-overlay')&&child!==E('mod-confirm-overlay'))child.inert=open},{once:true});
})();
