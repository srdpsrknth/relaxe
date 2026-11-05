/* Study 32: account-scoped history settings fixtures. No database, preference or API writes. */
(function(){
'use strict';
const buffers=new Map();
const historyFields=[
 {key:'_mark_posts_as_read',title:'Save read posts',summary:'Record posts you open, including when you open their media.',default:false,group:'Recording'},
 {key:'_mark_posts_as_read_after_voting',title:'Mark posts as read after voting',summary:'Available when Save read posts is On.',default:false,group:'Recording'},
 {key:'_mark_posts_as_read_on_scroll',title:'Mark posts as read on scroll',summary:'Scrolling past a post can mark it read without opening it.',default:false,group:'Recording'},
 {key:'_hide_read_posts_automatically',title:'Hide read posts automatically',summary:'Applies to other post feeds. Choose the additional scopes below.',default:false,group:'Automatic hiding'},
 {key:'_hide_read_posts_automatically_in_subreddits',title:'Also hide in subreddits',summary:'',default:false,group:'Automatic hiding'},
 {key:'_hide_read_posts_automatically_in_users',title:'Also hide on user pages',summary:'',default:false,group:'Automatic hiding'},
 {key:'_hide_read_posts_automatically_in_search',title:'Also hide in search results',summary:'',default:false,group:'Automatic hiding'},
 {key:'_read_posts_limit_enabled',title:'Limit history size',summary:'Older entries are removed in batches as records are added. This is a target, not a strict count.',default:true,group:'Storage'},
 {key:'_read_posts_limit',title:'History limit',summary:'Minimum 100. Empty input returns to 500 when you finish editing.',default:500,group:'Storage',number:true}
];
function state(scope,account,definitions){const key=scope+'|'+account;if(!buffers.has(key))buffers.set(key,Object.fromEntries(definitions.map(item=>[item.key,item.default])));return buffers.get(key)}
function element(tag,className,text){const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node}
function group(root,title){const section=element('section','settings-group video-settings-group');section.append(element('h3',null,title));const rows=element('div','settings-rows');section.append(rows);root.append(section);return rows}
function makeRow(rows,item,prefix){const row=element('div','video-setting'+(item.number?' video-select':''));row.dataset.historyKey=item.key;const copy=element('div','video-setting-copy'),label=element('label',null,item.title);label.id=prefix+'-label'+item.key;label.htmlFor=prefix+item.key;copy.append(label);let help;
 if(item.summary){help=element('small',null,item.summary);help.id=prefix+'-help'+item.key;copy.append(help)}
 const input=element(item.number?'input':'button',item.number?'history-limit':'video-toggle');input.id=label.htmlFor;input.setAttribute('aria-labelledby',label.id);if(help)input.setAttribute('aria-describedby',help.id);
 if(!item.number){input.type='button';input.setAttribute('role','switch')}row.append(copy,input);rows.append(row);return {row,input};
}
function parseLimit(text){if(!/^[+-]?\d+$/.test(text))return null;const value=BigInt(text);if(value>9223372036854775807n||value< -9223372036854775808n)return null;return Number(BigInt.asIntN(32,value>2147483647n?2147483647n:value))}
window.RelaxeHistorySettings={render(root,account){
 const values=state('history',account,historyFields),controls=new Map();
 const intro=element('p','field-help','Post history and read state belong to this account. Turning recording Off keeps existing records and your choices. Clear stored history through Account Settings Management.');root.append(intro);
 const feedback=element('p','field-help');feedback.id='history-settings-feedback';feedback.setAttribute('role','status');
 for(const name of ['Recording','Automatic hiding','Storage']){const rows=group(root,name);for(const item of historyFields.filter(field=>field.group===name)){
  const control=makeRow(rows,item,'history');controls.set(item.key,control);const input=control.input;
  if(item.number){input.type='text';input.inputMode='numeric';input.maxLength=10;input.value=String(values[item.key]);input.addEventListener('input',()=>{const parsed=parseLimit(input.value);if(parsed!==null&&parsed>=100)values[item.key]=parsed});
   input.addEventListener('blur',()=>{const parsed=parseLimit(input.value);values[item.key]=parsed===null?500:Math.max(100,parsed);input.value=String(values[item.key]);feedback.textContent='History limit: '+input.value+' · changed in this preview only.'});input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();input.blur()}});
  }else input.addEventListener('click',()=>{values[item.key]=!values[item.key];sync();feedback.textContent=item.title+': '+(values[item.key]?'On':'Off')+' · changed in this preview only.'});
 }}root.append(feedback);
 function sync(){const recording=values._mark_posts_as_read;for(const item of historyFields){const {row,input}=controls.get(item.key);let inactive=false;
  if(item.group==='Recording')inactive=item.key!=='_mark_posts_as_read'&&!recording;
  if(item.group==='Automatic hiding')inactive=!recording||(item.key!=='_hide_read_posts_automatically'&&!values._hide_read_posts_automatically);
  if(item.number)inactive=!values._read_posts_limit_enabled;
  input.disabled=inactive;row.dataset.inactive=String(inactive);if(!item.number)input.setAttribute('aria-checked',String(values[item.key]));
 }}sync();
}};
const visitedFields=[{key:'_recently_visited_enabled',title:'Save recently visited',summary:'Turning this Off deletes the recently visited subreddits and users stored for this account.',default:false}];
window.RelaxeRecentlyVisitedSettings={render(root,account){
 const values=state('recently',account,visitedFields),item=visitedFields[0];
 root.append(element('p','field-help','Keep up to 50 subreddits and 50 users for this account. Post history, search history, Saved and Subscriptions are separate.'));
 const {input}=makeRow(group(root,'Recording'),item,'recently'),feedback=element('p','field-help');feedback.setAttribute('role','status');root.append(feedback);
 const dialog=element('dialog','recently-confirm');dialog.id='recently-visited-confirm';dialog.setAttribute('aria-labelledby','recently-confirm-title');dialog.setAttribute('aria-describedby','recently-confirm-description');
 const title=element('h3',null,'Turn off and clear recently visited?');title.id='recently-confirm-title';const description=element('p',null,(account==='guest'?'Guest':'u/weekendreader')+' · This clears this account’s visited subreddits and users. Turning recording back On will not restore the list.');description.id='recently-confirm-description';
 const actions=element('div','dialog-actions'),cancel=element('button',null,'Cancel'),confirm=element('button',null,'Turn off and clear');cancel.type=confirm.type='button';cancel.autofocus=true;actions.append(cancel,confirm);dialog.append(title,description,actions);root.append(dialog);
 function sync(){input.setAttribute('aria-checked',String(values[item.key]))}function close(){dialog.close();if(input.isConnected)input.focus({preventScroll:true})}
 input.addEventListener('click',()=>{if(!values[item.key]){values[item.key]=true;sync();feedback.textContent='Recording On · changed in this preview only.'}else dialog.showModal()});
 cancel.addEventListener('click',close);confirm.addEventListener('click',()=>{if(!input.isConnected)return;values[item.key]=false;sync();close();feedback.textContent='Recording Off. This preview deletes no stored visits.'});
 dialog.addEventListener('cancel',event=>{event.preventDefault();close()});dialog.addEventListener('keydown',event=>{if(event.key==='Escape')event.stopPropagation()});sync();
}};
})();
