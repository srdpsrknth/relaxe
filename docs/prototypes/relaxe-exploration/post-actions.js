/* Study 24. Grouped More/menu ordering fixture. No API, clipboard, downloads or persistence. */
(function(){
'use strict';
const E=id=>document.getElementById(id),T=window.RelaxeStudyTheme,config={appearance:'light',palette:'blue',text:'1',width:'390'},states={weekendreader:{saved:false,hidden:false,read:true},guest:{saved:false,hidden:false,read:true}};
let fixture='ready',open=false;
const account=()=>fixture==='guest'?'guest':'weekendreader';
const symbols={author:'M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM3 22v-3c0-7 18-7 18 0v3H3Z',share:'M18 2a4 4 0 0 0-3.8 5.3L8.7 10a4 4 0 1 0 0 4l5.5 2.7a4 4 0 1 0 1-1.8L9.9 12l5.3-2.9A4 4 0 1 0 18 2Z',copy:'M7 2h15v16h-3V5H7V2ZM2 7h15v15H2V7Zm3 3v9h9v-9H5Z','read-aloud':'M2 8h5l7-6v20l-7-6H2V8Zm15-3 2-1a11 11 0 0 1 0 16l-2-1a9 9 0 0 0 0-14Zm-1 4 2-1a6 6 0 0 1 0 8l-2-1a4 4 0 0 0 0-6Z',translate:'M3 3h8v2H8a14 14 0 0 1-2 5l3 3-2 2-3-3-3 2v-3l2-1a12 12 0 0 1-2-3h3l1 1 1-3H1V3h2V1h3v2H3Zm12 5h3l6 14h-3l-1-3h-7l-1 3H9l6-14Zm1.5 3-2.5 6h5l-2.5-6Z',reminder:'M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22Zm-1 5h2v6l5 3-1 2-6-4V6Z',read:'M2 4h20v16H2V4Zm2 3 8 5 8-5V6l-8 5-8-5v1Z',filter:'M1 3h22l-9 10v7l-4 3V13L1 3Z',hide:'M12 4C6 4 2 9 0 12c2 3 6 8 12 8s10-5 12-8c-2-3-6-8-12-8Zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z',report:'M4 2h2v2h15l-3 5 3 5H6v8H4V2Z'};
function iconFor(id,fallback){return symbols[id]?'<svg class="foundation-icon" data-has-solid="true" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path class="solid-icon" fill-rule="evenodd" d="'+symbols[id]+'"/></svg>':T.icon(fallback)}
const groups=[['Post',[['save','Save post','save'],['reply','Reply','comments']]],['Navigate',[['subreddit','Go to subreddit','home'],['author','View author','external']]],['Share and copy',[['share','Share','external'],['copy','Copy title','external'],['crosspost','Crosspost','external']]],['Reading',[['read-aloud','Read aloud','comments'],['translate','Translate','external'],['reminder','Set reminder','save']]],['Manage',[['read','Mark unread','comments'],['filter','Add to post filter','more'],['hide','Hide post','more'],['report','Report post','more']]]];
const sectionIds=['post','navigate','share-copy','reading','manage'];
const defaultOrder=()=>groups.map(([title,items],index)=>({id:sectionIds[index],title,items:items.map(item=>item.slice())}));
const orders={weekendreader:defaultOrder(),guest:defaultOrder()};
const editing=()=>E('actions-surface').value==='order';
function theme(){const settings={foundation:'selected',...config},direction=T.directions[0],phone=E('actions-phone');for(const [key,value]of Object.entries(T.tokens(direction,settings)))phone.style.setProperty(key,value);T.setStyleAttributes(phone,direction,settings);phone.style.setProperty('--w',config.width+'px');phone.style.setProperty('--h',({360:800,390:844,600:960,720:480}[config.width])+'px');phone.dataset.largeText=String(+config.text>=2);window.RelaxeShell?.setContext({account:account(),subreddit:'hiking',...config})}
function allowed(id){return !(account()==='guest'&&['reply','crosspost','report'].includes(id))&&!(id==='reply'&&['locked','archived'].includes(fixture))}
function label(id,fallback){const state=states[account()];return id==='save'?(state.saved?'Unsave post':account()==='guest'?'Save post locally':'Save post'):id==='hide'?(state.hidden?'Unhide post':'Hide post'):id==='read'?(state.read?'Mark unread':'Mark read'):fallback}
function moveButtons(key,upName,downName,index,length,callback){
  const controls=document.createElement('div');controls.className='actions-move-buttons';
  for(const [direction,delta,name,disabled]of [['up',-1,upName,index===0],['down',1,downName,index===length-1]]){
    const button=document.createElement('button');button.type='button';button.dataset.move=key+':'+direction;
    button.setAttribute('aria-label',name);button.innerHTML=T.icon(direction);button.disabled=disabled;
    button.addEventListener('click',()=>callback(delta,direction));controls.append(button);
  }
  return controls;
}
function afterMove(key,direction,announcement){
  render();E('actions-order-status').textContent=announcement;
  let button=E('actions-list').querySelector('[data-move="'+key+':'+direction+'"]');
  if(button?.disabled)button=E('actions-list').querySelector('[data-move="'+key+':'+(direction==='up'?'down':'up')+'"]');
  (button&&!button.disabled?button:E('actions-list')).focus();
}
function moveSection(id,delta,direction){
  const order=orders[account()],index=order.findIndex(group=>group.id===id),next=index+delta;
  if(index<0||next<0||next>=order.length)return;
  const [group]=order.splice(index,1);order.splice(next,0,group);
  afterMove('section:'+id,direction,group.title+' section moved to position '+(next+1)+' of '+order.length+'.');
}
function moveItem(sectionId,id,delta,direction){
  const group=orders[account()].find(section=>section.id===sectionId);
  if(!group)return;const index=group.items.findIndex(item=>item[0]===id),next=index+delta;
  if(index<0||next<0||next>=group.items.length)return;
  const [item]=group.items.splice(index,1);group.items.splice(next,0,item);
  afterMove('item:'+id,direction,item[1]+' moved to position '+(next+1)+' of '+group.items.length+' in '+group.title+'.');
}
function render(){
  const editor=editing(),order=orders[account()];E('actions-phone').dataset.organization='grouped';
  E('actions-phone').dataset.surface=editor?'order':'menu';E('actions-title').textContent=editor?'Menu order':'Post actions';
  E('actions-subtitle').textContent=editor?'Sections and their actions':'A quiet loop after the rain';
  E('actions-list').setAttribute('aria-label',editor?'Section and action ordering':'Available post actions');
  E('actions-order-controls').hidden=!editor;E('actions-list').replaceChildren();
  for(const [groupIndex,section]of order.entries()){
    const visible=editor?section.items:section.items.filter(([id])=>allowed(id));if(!visible.length)continue;
    const group=document.createElement('section');group.className='actions-group';group.dataset.section=section.id;
    const heading=document.createElement('h4');heading.textContent=section.title;
    if(editor){
      const row=document.createElement('div');row.className='actions-order-heading';row.append(heading,
        moveButtons('section:'+section.id,'Move '+section.title+' section up','Move '+section.title+' section down',groupIndex,order.length,(delta,direction)=>moveSection(section.id,delta,direction)));
      group.append(row);
    }else group.append(heading);
    for(const [itemIndex,[id,copy,icon]]of visible.entries()){
      if(editor){
        const row=document.createElement('div');row.className='actions-order-item';row.dataset.orderAction=id;
        const name=document.createElement('div');name.textContent=copy;
        if(!allowed(id)){const help=document.createElement('small');help.textContent='Unavailable for this post';name.append(help)}
        row.append(name,moveButtons('item:'+id,'Move '+copy+' up in '+section.title,'Move '+copy+' down in '+section.title,itemIndex,section.items.length,(delta,direction)=>moveItem(section.id,id,delta,direction)));
        group.append(row);
      }else{
        const button=document.createElement('button');button.type='button';button.className='actions-row';button.dataset.action=id;
        const symbol=document.createElement('span');symbol.innerHTML=iconFor(id,icon);const text=document.createElement('span');text.textContent=label(id,copy);
        button.append(symbol,text);button.addEventListener('click',()=>select(id,copy));group.append(button);
      }
    }
    E('actions-list').append(group);
  }
}
function select(id,copy){const state=states[account()];if(id==='save')state.saved=!state.saved;else if(id==='hide')state.hidden=!state.hidden;else if(id==='read')state.read=!state.read;const local=['save','hide','read'].includes(id);E('actions-feedback').textContent=local?'Fixture state updated: '+label(id,copy)+'. No native data changed.':'Route preview selected: '+copy+'. No request or external action performed.';E('actions-selection').hidden=false;E('actions-selection').textContent=local?'Fixture state updated.':copy+' · route preview';if(local){render();E('actions-list').querySelector('[data-action="'+id+'"]').focus()}}
function setOpen(value){open=value;E('actions-overlay').hidden=!open;E('actions-open').setAttribute('aria-expanded',String(open));for(const child of E('actions-phone').children)if(child!==E('actions-overlay'))child.inert=open;if(open)E('actions-close').focus({preventScroll:true});else E('actions-open').focus({preventScroll:true})}
function setSurface(surface){E('actions-surface').value=surface;E('actions-selection').hidden=true;E('actions-order-status').textContent='';render();setOpen(true)}
for(const [id,key]of [['actions-appearance','appearance'],['actions-palette','palette'],['actions-scale','text'],['actions-width','width']])E(id).addEventListener('change',event=>{config[key]=event.target.value;theme()});
E('actions-surface').addEventListener('change',event=>setSurface(event.target.value));
E('actions-fixture').addEventListener('change',()=>{fixture=E('actions-fixture').value;E('actions-selection').hidden=true;E('actions-order-status').textContent='';render();theme()});
E('actions-order-done').addEventListener('click',()=>setSurface('menu'));
E('actions-order-reset').addEventListener('click',()=>{orders[account()]=defaultOrder();render();E('actions-order-status').textContent='Default order restored for this fixture account.';E('actions-order-reset').focus({preventScroll:true})});
E('actions-open').addEventListener('click',()=>setSurface('menu'));E('actions-close').addEventListener('click',()=>setOpen(false));
E('actions-overlay').addEventListener('click',event=>{if(event.target===E('actions-overlay'))setOpen(false)});
E('actions-overlay').addEventListener('keydown',event=>{
  if(event.key==='Escape'){event.preventDefault();setOpen(false)}if(event.key!=='Tab')return;
  const items=[...E('actions-sheet').querySelectorAll('button,[tabindex="0"]')].filter(el=>!el.disabled&&el.getClientRects().length>0),first=items[0],last=items.at(-1);
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
});
E('actions-close').innerHTML=T.icon('close');if(new URLSearchParams(location.search).get('surface')==='order')E('actions-surface').value='order';
render();theme();setOpen(true);document.addEventListener('relaxe-shell-ready',()=>{theme();for(const child of E('actions-phone').children)if(child!==E('actions-overlay'))child.inert=open},{once:true});
})();
