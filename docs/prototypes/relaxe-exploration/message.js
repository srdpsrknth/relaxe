/* Study 22. Synthetic private-message composer; no API, uploads or persistent drafts. */
(function(){
'use strict';
const E=id=>document.getElementById(id),T=window.RelaxeStudyTheme;
const config={appearance:'light',palette:'blue',text:'1',width:'390'};
const dialog=E('message-dialog'),content=E('message-dialog-content');
const fields=['recipient','subject','body'].map(key=>E('message-'+key));
let fixture='ready',closed=false,pending=null,origin=null,allowNavigation=false,recover=false;
const initialRecipient='trailnotes';
const notice=(id,text)=>{E(id).textContent=text;E(id).hidden=!text};
const hasWriting=()=>fields[0].value!==initialRecipient||fields[1].value!==''||fields[2].value!=='';
function theme(){
  const settings={foundation:'selected',...config},direction=T.directions[0],phone=E('message-phone');
  for(const [key,value]of Object.entries(T.tokens(direction,settings)))phone.style.setProperty(key,value);
  T.setStyleAttributes(phone,direction,settings);
  phone.style.setProperty('--w',config.width+'px');
  phone.style.setProperty('--h',({360:800,390:844,600:960,720:480}[config.width])+'px');
  phone.dataset.largeText=String(+config.text>=2);
  window.RelaxeShell?.setContext({account:fixture==='guest'?'guest':'weekendreader',...config});
}
function sync(){
  const blocked=fixture==='guest',busy=Boolean(pending);
  E('message-form').hidden=closed;E('message-closed').hidden=!closed;
  for(const f of fields)f.disabled=blocked||busy||closed;
  for(const b of E('message-tools').querySelectorAll('button'))b.disabled=blocked||busy||closed;
  E('message-send').disabled=blocked||busy||closed;E('message-send').textContent=busy?'Sending…':'Send';
  E('message-preview').disabled=blocked||busy||closed;E('message-close').disabled=closed;
  E('message-fixture').disabled=busy;
  E('message-reopen').disabled=blocked;E('message-reopen').textContent=recover?'Recover message':'New message';
  E('message-account').textContent=blocked?'Guest':'From u/weekendreader';
  E('message-subject-count').textContent=fields[1].value.length+' / 100';
  notice('message-notice',blocked?'Sign in to send a private message.':busy?'Sending message…':'');
  theme();
}
function paragraph(node,text){const p=document.createElement('p');p.textContent=text;node.append(p);return p}
function action(node,label,callback){const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',callback);node.append(b);return b}
function show(title,build){
  if(!dialog.open)origin=document.activeElement;
  E('message-dialog-title').textContent=title;content.replaceChildren();content.className='';
  build(content);dialog.showModal();E('message-dialog-close').focus();
}
function clearErrors(){
  notice('message-error','');
  for(const f of fields){f.removeAttribute('aria-invalid');notice(f.id+'-error','')}
}
function focusWriting(){fields[2].focus({preventScroll:true});fields[2].scrollIntoView({block:'nearest'})}
function reset(){fields[0].value=initialRecipient;fields[1].value='';fields[2].value='';clearErrors()}
function finish(copy,title='Message composer closed'){
  closed=true;E('message-result-title').textContent=title;notice('message-result',copy);sync();E('message-reopen').focus();
}
function leave(next){
  if(pending){
    show('Leave while sending?',node=>{
      paragraph(node,'Your message is still being sent. Leaving may not stop delivery.');
      const buttons=document.createElement('div');buttons.className='dialog-actions';
      action(buttons,'Keep writing',()=>dialog.close());
      action(buttons,'Leave composer',()=>{dialog.close();next('Sending was in progress when you left.')});node.append(buttons);
    });return;
  }
  if(!hasWriting()){next('No message sent.');return}
  show('Discard message?',node=>{
    paragraph(node,'Your unsent message will be discarded.');
    const buttons=document.createElement('div');buttons.className='dialog-actions';
    action(buttons,'Keep writing',()=>dialog.close());
    action(buttons,'Discard message',()=>{reset();dialog.close();next('Message discarded.')});node.append(buttons);
  });
}
function preview(){
  show('Message preview',node=>{
    content.className='dialog-preview';
    paragraph(node,'From u/weekendreader → '+fields[0].value);
    const h=document.createElement('h4');h.textContent=fields[1].value||'No subject';node.append(h);
    // Limited safe Markdown specimen. Links/HTML never create fetchable or executable nodes.
    for(const line of (fields[2].value||'No message yet.').split('\n')){
      const p=document.createElement(line.startsWith('> ')?'blockquote':'p');
      const text=line.startsWith('> ')?line.slice(2):line;
      const pattern=/\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;
      let last=0,m;
      while((m=pattern.exec(text))){
        p.append(document.createTextNode(text.slice(last,m.index)));
        const el=document.createElement(m[1]?'strong':m[2]?'em':m[3]?'code':'span');
        el.textContent=m[1]||m[2]||m[3]||m[4];p.append(el);
        if(m[4])p.append(document.createTextNode(' ('+m[5]+')'));last=pattern.lastIndex;
      }
      p.append(document.createTextNode(text.slice(last)));node.append(p);
    }
  });
}
function format(kind){
  const f=fields[2],pairs={bold:['**','**'],italic:['*','*'],link:['[','](https://example.com)'],strike:['~~','~~'],heading:['## ',''],list:['- ',''],numbered:['1. ',''],quote:['> ',''],spoiler:['>!','!<'],code:['`','`']};
  if(!pairs[kind])return;
  const [before,after]=pairs[kind],selected=f.value.slice(f.selectionStart,f.selectionEnd)||'text';
  if(dialog.open){origin=f;dialog.close()}
  f.setRangeText(before+selected+after,f.selectionStart,f.selectionEnd,'select');clearErrors();sync();focusWriting();
}
for(const [id,key]of [['message-appearance','appearance'],['message-palette','palette'],['message-scale','text'],['message-width','width']])E(id).addEventListener('change',event=>{config[key]=event.target.value;theme()});
E('message-fixture').addEventListener('change',()=>{fixture=E('message-fixture').value;clearErrors();sync()});
for(const f of fields)f.addEventListener('input',()=>{clearErrors();sync()});
for(const b of E('message-tools').querySelectorAll('[data-message-format]'))b.addEventListener('click',()=>format(b.dataset.messageFormat));
E('message-more').addEventListener('click',()=>show('Formatting',node=>{
  const buttons=document.createElement('div');buttons.className='message-format-options';
  for(const [kind,label]of [['strike','Strikethrough'],['heading','Heading'],['list','Bulleted list'],['numbered','Numbered list'],['quote','Quote'],['spoiler','Spoiler'],['code','Inline code']])action(buttons,label,()=>format(kind));node.append(buttons);
}));
E('message-preview').addEventListener('click',preview);
E('message-close').addEventListener('click',()=>leave(copy=>finish(copy)));
E('message-reopen').addEventListener('click',()=>{if(!recover&&!pending)reset();recover=false;closed=false;sync();fields[1].focus()});
E('message-form').addEventListener('submit',event=>{
  event.preventDefault();if(E('message-send').disabled)return;clearErrors();let invalid=null;
  for(const [index,copy]of ['Enter a recipient.','Enter a subject.','Enter a message.'].entries()){
    if(fields[index].value===''){fields[index].setAttribute('aria-invalid','true');notice(fields[index].id+'-error',copy);invalid??=fields[index]}
  }
  if(invalid){invalid.focus();return}
  const task={recipient:fields[0].value,subject:fields[1].value,body:fields[2].value,fail:fixture==='send-error'};
  pending=task;sync();
  setTimeout(()=>{
    if(pending!==task)return;pending=null;
    if(dialog.open&&E('message-dialog-title').textContent==='Leave while sending?')dialog.close();
    if(task.fail){
      recover=closed;notice('message-error','Couldn’t send message. Your writing is kept. Try again.');
      if(closed)notice('message-result','Couldn’t send message. Recover it to try again.');sync();
    }else{
      reset();recover=false;finish('Your message to '+task.recipient+' was sent.','Message sent');
    }
  },1200);
});
E('message-dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{if(origin?.isConnected&&!origin.disabled)origin.focus({preventScroll:true})});
dialog.addEventListener('keydown',event=>{
  if(event.key!=='Tab')return;
  const items=[...dialog.querySelectorAll('button,input,textarea,select')].filter(el=>!el.disabled&&!el.hidden),first=items[0],last=items.at(-1);
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!dialog.open&&!closed){event.preventDefault();leave(copy=>finish(copy))}});
document.addEventListener('click',event=>{
  const b=event.target.closest('.shared-shell-nav [data-destination]');
  if(!b||b.dataset.destination==='search'||closed)return;
  if(allowNavigation){allowNavigation=false;return}
  if(!hasWriting()&&!pending)return;
  event.preventDefault();event.stopImmediatePropagation();leave(()=>{allowNavigation=true;b.click()});
},true);
E('message-close').innerHTML=T.icon('close');E('message-dialog-close').innerHTML=T.icon('close');E('message-more').innerHTML=T.icon('more');
sync();document.addEventListener('relaxe-shell-ready',theme,{once:true});
// Direct review fixture only; no persistence or native exit-contract change.
if(new URLSearchParams(location.search).get('scenario')==='unsent'){
  fields[1].value='Route notes';fields[2].value='Thanks for sharing the trail. Is the lower loop open this weekend?';
  sync();E('message-close').focus();leave(copy=>finish(copy));
}
})();
