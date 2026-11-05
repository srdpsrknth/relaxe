/* Study 29: route-only Share presentation. No clipboard, requests, files or Android intents. */
(function(){
'use strict';
const E=id=>document.getElementById(id),T=window.RelaxeStudyTheme,config={appearance:'light',palette:'blue',text:'1',width:'390'};
let open=false;
const postURL='https://www.reddit.com/r/hiking/comments/example/a_weekend_on_the_trail/';
function outputs(){
 const fixture=E('share-fixture').value,items=[{id:'post',title:'Post link',url:postURL,noun:'post link'}];
 const media={image:['Image link','image link','https://media.example/trail.jpg'],gif:['GIF link','GIF link','https://media.example/trail.gif'],'gif-video':['GIF link','GIF link','https://media.example/trail.gif'],video:['Video link','video link','https://media.example/trail.mp4'],link:['Link','link','https://example.com/trail-notes']}[fixture];
 if(media)items.push({id:'media',title:media[0],noun:media[1],url:media[2]});
 if(fixture==='gif-video')items.push({id:'variant',title:'Video link',noun:'video link',url:'https://media.example/trail-variant.mp4'});
 return items;
}
function theme(){const settings={foundation:'selected',...config},direction=T.directions[0],phone=E('share-phone');for(const [key,value]of Object.entries(T.tokens(direction,settings)))phone.style.setProperty(key,value);T.setStyleAttributes(phone,direction,settings);phone.style.setProperty('--w',config.width+'px');phone.style.setProperty('--h',({360:800,390:844,600:960,720:480}[config.width])+'px');phone.dataset.largeText=String(+config.text>=2);window.RelaxeShell?.setContext({account:E('share-account').value,subreddit:'hiking',...config})}
function setOpen(value){open=value;E('share-overlay').hidden=!open;E('share-open').setAttribute('aria-expanded',String(open));for(const child of E('share-phone').children)if(child!==E('share-overlay'))child.inert=open;(open?E('share-close'):E('share-open')).focus({preventScroll:true})}
function route(label){const message='Route preview: '+label+'. Nothing was shared or copied.';E('share-result').hidden=false;E('share-result').textContent=message;E('share-feedback').textContent=message;setOpen(false)}
function button(label,id,accessible){const control=document.createElement('button');control.type='button';control.textContent=label;control.dataset.share=id;if(accessible)control.setAttribute('aria-label',accessible);control.addEventListener('click',()=>route(accessible||label));return control}
function render(){
 const root=E('share-actions');root.replaceChildren();
 for(const item of outputs()){
  const group=document.createElement('section');group.className='share-group';group.dataset.output=item.id;group.setAttribute('aria-labelledby','share-heading-'+item.id);
  const heading=document.createElement('h4');heading.id='share-heading-'+item.id;heading.textContent=item.title;
  const url=document.createElement('p');url.className='share-url';url.textContent=item.url;group.append(heading,url);
  const actions=document.createElement('div');actions.className='share-pair';
  for(const action of ['Share','Copy']){const label=action+' '+item.noun,control=button(action,item.id+'-'+action.toLowerCase(),label);actions.append(control)}
  group.append(actions);root.append(group);
 }
 if(E('share-fixture').value!=='link-only'){
  const group=document.createElement('section');group.className='share-group';group.dataset.output='image-export';const heading=document.createElement('h4');heading.textContent='As an image';group.append(heading);
  for(const [id,label]of [['post-image','Share post as image'],['with-comments','Share with comments']]){const control=button(label,id);control.className='share-action';group.append(control)}root.append(group);
 }
 E('share-context').textContent=(E('share-account').value==='guest'?'Guest':'u/weekendreader')+' · A weekend on the trail';
 E('share-media-caption').textContent=E('share-fixture').selectedOptions[0].textContent;
}
for(const [id,key]of [['share-appearance','appearance'],['share-palette','palette'],['share-scale','text'],['share-width','width']])E(id).addEventListener('change',event=>{config[key]=event.target.value;theme()});
for(const id of ['share-fixture','share-account'])E(id).addEventListener('change',()=>{E('share-result').hidden=true;E('share-feedback').textContent='Paired Share / Copy selected.';render();theme();E('share-scroll').scrollTop=0;setOpen(true)});
E('share-close').innerHTML=T.icon('close');E('share-close').addEventListener('click',()=>setOpen(false));E('share-open').addEventListener('click',()=>{render();setOpen(true)});
E('share-overlay').addEventListener('click',event=>{if(event.target===E('share-overlay'))setOpen(false)});
E('share-overlay').addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();setOpen(false)}if(event.key!=='Tab')return;const items=[...E('share-panel').querySelectorAll('button,[tabindex="0"]')].filter(el=>!el.disabled&&el.getClientRects().length),first=items[0],last=items.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}});
render();theme();setOpen(true);document.addEventListener('relaxe-shell-ready',()=>{theme();for(const child of E('share-phone').children)if(child!==E('share-overlay'))child.inert=open},{once:true});
})();
