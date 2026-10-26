/* Study 16: synthetic Recently visited lists; no native recording or Reddit writes. */
(function(){
'use strict';
let getContext,changeAccount,active=false,ownerAccount=null;
const states={},V=id=>document.getElementById(id),root=()=>V('destination');
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fixtures={
 subreddits:['Outdoors','photography','CampingandHiking','woodworking','BuyItForLife','gardening','hiking','EarthPorn','AskReddit','mildlyinteresting','AnalogCommunity','Visiblemending','backpacking','trailrunning','UrbanGardening','woodcarving','CampingGear','Frugal'],
 users:['ridgewalker','trailnotes','mapandcompass','repairfirst','smallplot','mossandmiles','openinterfaces','coastalpath','orbitalnotes','morningpages','afterhours','forestfloor']
};
const ages=['today · 10:15','today · 09:40','today · 08:30','yesterday · 19:20','yesterday · 16:05','2 days ago','3 days ago','4 days ago','5 days ago','1 week ago','8 days ago','9 days ago','10 days ago','11 days ago','12 days ago','2 weeks ago','3 weeks ago','1 month ago'];
function state(){const account=active?ownerAccount:getContext().account;return states[account]||(states[account]={type:'subreddits',query:'',more:false,fixture:'ready',notice:'',detail:null,offsets:{},data:Object.fromEntries(Object.entries(fixtures).map(([type,names])=>[type,names.slice(0,account==='guest'?8:names.length).map((name,index)=>({name,type,age:ages[index],added:false,saved:false}))]))})}
function button(action,label,body=label,extra=''){return `<button type="button" data-visited="${action}" aria-label="${esc(label)}" ${extra}>${body}</button>`}
function capture(){if(active&&!state().detail)state().offsets[state().type]=root().scrollTop}
function row(item){const user=item.type==='users',name=esc(item.name),ref=`data-name="${name}"`,add=user?(item.added?'Unfollow':'Follow'):(item.added?'Unsubscribe':'Subscribe');
 return `<div class="visited-row"><button type="button" class="visited-open" data-visited-open="${name}" aria-label="Open ${user?'user':'subreddit'} ${name}"><span class="browse-avatar" aria-hidden="true">${user?'u/':'r/'}</span><span class="visited-copy"><strong>${name}</strong><small>Visited ${item.age}</small></span></button><div class="visited-actions">${button('add',add+' '+item.name,user?(item.added?'Following':'Follow'):(item.added?'Subscribed':'Subscribe'),`${ref} aria-pressed="${item.added}"`)}${user?button('save',(item.saved?'Unsave':'Save')+' user '+item.name,window.RelaxeStudyTheme.icon('save'),`${ref} class="visited-save" aria-pressed="${item.saved}"`):''}</div></div>`;
}
function list(){const s=state(),items=s.data[s.type].filter(i=>i.name.toLowerCase().includes(s.query.toLowerCase()));
 if(s.fixture==='off')return '<div class="visited-empty"><h3>Recently visited is off</h3><p>Recording is controlled separately for this account in Settings → Recently visited. Turning it off there also clears this account’s list.</p>'+button('settings','Recently visited settings')+'</div>';
 if(s.fixture==='loading')return '<p role="status">Loading recently visited…</p>';
 if(s.fixture==='empty')return `<div class="visited-empty"><h3>No ${s.type} visited yet</h3><p>Eligible visits appear here when recording is enabled for this account.</p></div>`;
 if(!items.length)return '<div class="visited-empty"><h3>No matching names</h3><p>Try another name or switch the list.</p>'+button('clear','Clear name filter')+'</div>';
 return (s.fixture==='error'?'<p class="visited-error" role="status">Couldn’t load updates. Showing this fixture’s previous list. '+button('retry','Retry recently visited')+'</p>':'')+items.map(row).join('');
}
function updateList(){V('visited-list').innerHTML=list();V('visited-notice').textContent=state().notice}
function render(){const s=state();root().dataset.visited='true';
 if(s.detail){const item=s.detail,user=s.type==='users';root().innerHTML=button('back','Back to Recently visited')+`<h3 tabindex="-1">${esc(item.name)}</h3><p class="visited-caption">${user?'User profile':'Subreddit'} · ${getContext().account==='guest'?'Guest':getContext().account}</p><p>Existing ${user?'user profile':'subreddit'} destination route preview. The native route retains this account and its existing loading, visit-recording and restoration behavior.</p><p>This fixture does not record a new visit.</p>`;root().scrollTop=0;root().querySelector('h3').focus({preventScroll:true});return}
 root().innerHTML=`<div class="visited-controls"><div class="visited-tabs" role="tablist" aria-label="Recently visited lists">${['subreddits','users'].map(type=>button('type-'+type,type==='subreddits'?'Subreddits':'Users',type==='subreddits'?'Subreddits':'Users',`id="visited-tab-${type}" role="tab" aria-selected="${s.type===type}" aria-controls="visited-list" tabindex="${s.type===type?0:-1}"`)).join('')}</div>${button('more','More Recently visited actions',window.RelaxeStudyTheme.icon('more'),`aria-expanded="${s.more}" aria-controls="visited-menu"`)}</div><div id="visited-menu" class="visited-menu" ${s.more?'':'hidden'}>${button('settings','Recently visited settings')}</div><div class="visited-filter"><label class="sr-only" for="visited-query">Filter recently visited names</label><input id="visited-query" type="search" autocomplete="off" placeholder="Filter names" value="${esc(s.query)}">${button('clear','Clear name filter','×')}</div><p class="visited-caption">Most recently visited first${getContext().account==='guest'?' · Guest · on this device':''}</p><p id="visited-notice" class="visited-notice" role="status">${esc(s.notice)}</p><div id="visited-list" role="tabpanel" aria-labelledby="visited-tab-${s.type}">${list()}</div>`;
 root().scrollTop=s.offsets[s.type]||0;
}
function selectType(type){capture();state().type=type;state().notice='';render();V('visited-tab-'+type).focus({preventScroll:true})}
function enter(){ownerAccount=getContext().account;active=true;render();V('visited-fixtures').hidden=false;V('visited-account').value=getContext().account;V('visited-fixture').value=state().fixture}
function leave(){if(!active)return;capture();active=false;delete root().dataset.visited;V('visited-fixtures').hidden=true}
function initialize(context,onAccount){getContext=context;changeAccount=onAccount;
 const box=document.createElement('div');box.id='visited-fixtures';box.className='controls visited-fixtures';box.hidden=true;box.innerHTML='<label>Visited account<select id="visited-account"><option value="weekendreader">weekendreader</option><option value="guest">Guest</option></select></label><label>Visited fixture<select id="visited-fixture"><option value="ready">Normal · recording enabled</option><option value="off">Recording off</option><option value="loading">Loading</option><option value="empty">Empty</option><option value="error">Load failure · retain list</option><option value="action-error">Action failure</option></select></label><label>Visited direction<select id="visited-direction"><option value="ltr">Left to right</option><option value="rtl">Right to left</option></select></label>';document.querySelector('.controls').after(box);
 V('visited-account').addEventListener('change',e=>changeAccount(e.target.value));
 V('visited-fixture').addEventListener('change',e=>{capture();state().fixture=e.target.value;state().notice='';state().detail=null;render()});
 V('visited-direction').addEventListener('change',e=>V('nav-phone').dir=e.target.value);
 root().addEventListener('keydown',e=>{if(!active||e.target.getAttribute('role')!=='tab'||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const type=e.key==='Home'?'subreddits':e.key==='End'?'users':state().type==='subreddits'?'users':'subreddits';selectType(type)});
 root().addEventListener('input',e=>{if(!active||e.target.id!=='visited-query')return;state().query=e.target.value;state().notice='';updateList()});
 root().addEventListener('click',e=>{if(!active)return;const open=e.target.closest('[data-visited-open]'),control=e.target.closest('[data-visited]'),s=state();
  if(open){capture();s.detail=s.data[s.type].find(i=>i.name===open.dataset.visitedOpen);render();return}
  if(!control)return;const action=control.dataset.visited;
  if(action==='type-subreddits'||action==='type-users'){selectType(action.slice(5))}
  else if(action==='more'){s.more=!s.more;V('visited-menu').hidden=!s.more;control.setAttribute('aria-expanded',String(s.more))}
  else if(action==='settings'){s.notice='Existing account-scoped Recently visited settings route preview. No recording setting or stored list changed.';if(V('visited-notice'))V('visited-notice').textContent=s.notice}
  else if(action==='clear'){s.query='';s.notice='';V('visited-query').value='';updateList();V('visited-query').focus()}
  else if(action==='retry'){s.fixture='ready';s.notice='Loaded this synthetic list.';V('visited-fixture').value='ready';updateList()}
  else if(action==='back'){const name=s.detail.name;s.detail=null;render();root().querySelector(`[data-visited-open="${CSS.escape(name)}"]`)?.focus({preventScroll:true})}
  else if(action==='add'||action==='save'){const item=s.data[s.type].find(i=>i.name===control.dataset.name);if(!item)return;
   if(s.fixture==='action-error')s.notice='Couldn’t change '+item.name+'. Previous state kept.';
   else{const field=action==='save'?'saved':'added';item[field]=!item[field];s.notice='Fixture updated. '+(getContext().account==='guest'?'Guest actions use their existing local mechanisms. ':'')+'The visited row remains in the list.'}
   updateList();root().querySelector(`[data-visited="${action}"][data-name="${CSS.escape(item.name)}"]`)?.focus({preventScroll:true});
  }
 });
}
window.RelaxeVisited={initialize,enter,leave};
})();
