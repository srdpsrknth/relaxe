/* Synthetic study 13. No Reddit requests, messages, native preferences or account writes. */
(function(){
'use strict';
let getContext,route,states={};
const views={all:'All',unread:'Unread',messages:'Messages',sent:'Sent',mentions:'Mentions',comments:'Comment replies',postreplies:'Post replies'};
const root=()=>document.getElementById('destination');
const escapeText=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fixtures={
 notifications:[
  ['n1','trailnotes','Comment reply','hiking','What small change made your day pack more comfortable?','I moved the water closer to my back after your suggestion. Much more comfortable on the steep section.','8m',true],
  ['n2','mapandcompass','Username mention','CampingandHiking','Planning a first overnight trip','u/weekendreader had a useful checklist in the earlier thread. Start with the route you know and try the new kit there.','42m',true],
  ['n3','repairfirst','Post reply','BuyItForLife','What did you repair instead of replacing?','A replacement seal kept our old kettle going. The repair took about ten minutes.','2h',true],
  ['n4','ridgewalker','Comment reply','photography','How do you decide when to put the camera away?','One photograph, then a few minutes just looking. That is a lovely approach.','5h',false],
  ['n5','woodgrain','Comment reply','woodworking','A small shelf made from leftover timber','The wall fixings are hidden behind the back rail. I added a drawing in the thread.','1d',false],
  ['n6','trailnotes','Comment reply','hiking','A quiet trail after the rain','We returned the following morning. The path had dried out by then.','2d',false],
  ['n7','mapandcompass','Username mention','Outdoors','Small things you always carry','This reminded me of the map discussion with u/weekendreader last week.','3d',false],
  ['n8','repairfirst','Post reply','BuyItForLife','A second life for a worn backpack','The repair shop used a matching patch and reinforced the seam.','4d',false]
 ],
 messages:[
  ['m1','ridgewalker','Private message','','The trail map','Thanks for sharing the route. Do you remember where the path branches after the footbridge?','18m',true],
  ['m2','r/hiking','Private message','','Your route guide','Hello! We have added your route guide to the subreddit resources. Thank you for writing it.','3h',true],
  ['m3','mapandcompass','Private message','','Weekend plans','I can join on Saturday. An early start would work best for me.','1d',false],
  ['m4','repairfirst','Private message','','Replacement buckle','The maker still sells spare buckles. I found the part number for the older model.','2d',false],
  ['m5','trailnotes','Private message','','A few photographs','The photographs from our last walk are ready. I will send you the album link later.','3d',false],
  ['m6','ridgewalker','Private message','','Thanks again','The notes were helpful. We took the shorter loop and had plenty of time to stop.','4d',false]
 ],
 sent:[
  ['s1','ridgewalker','Sent message','','Re: The trail map','The path branches just after the footbridge. Take the left fork and follow the river upstream.','12m',false],
  ['s2','mapandcompass','Sent message','','Saturday morning','An early start works for me too. Let us meet at the trailhead at eight.','1d',false],
  ['s3','repairfirst','Sent message','','Thank you for the part number','That is exactly the buckle I needed. I have ordered a replacement.','2d',false]
 ]};
function incoming(){const n=fixtures.notifications,m=fixtures.messages;return [n[0],m[0],n[1],n[2],m[1],n[3],...n.slice(4),...m.slice(2)]}
function allRows(){return [...incoming(),...fixtures.sent]}
function state(){const account=getContext().account;return states[account]||(states[account]={generation:0,view:'all',fixture:'ready',more:false,detail:null,offsets:{},expanded:{},read:new Set(),notice:'',busy:false})}
function rows(){switch(state().view){case 'unread':return incoming().filter(unread);case 'messages':return fixtures.messages;case 'sent':return fixtures.sent;case 'mentions':return fixtures.notifications.filter(r=>r[2]==='Username mention');case 'comments':return fixtures.notifications.filter(r=>r[2]==='Comment reply');case 'postreplies':return fixtures.notifications.filter(r=>r[2]==='Post reply');default:return incoming()}}
function unread(row){return row[7]&&!state().read.has(row[0])}
function icon(name){return window.RelaxeStudyTheme.icon(name)}
function action(id,label,content,extra=''){return `<button type="button" data-inbox="${id}" aria-label="${label}" ${extra}>${content||label}</button>`}
function render(){const s=state();root().dataset.inbox='true';
 if(getContext().account==='guest')return `<div class="inbox-state"><h3>Sign in for your inbox</h3><p>Notifications and private messages belong to a Reddit account.</p><button type="button" data-nav="accounts">Accounts</button></div>`;
 if(s.detail)return detail();
 const selector=`<label class="inbox-view-label"><span class="sr-only">Inbox view</span><select id="inbox-view" aria-label="Inbox view">${Object.entries(views).map(([key,label])=>`<option value="${key}" ${s.view===key?'selected':''}>${label}</option>`).join('')}</select></label>`;
 const tools=`<div class="inbox-tools">${action('read-all','Mark all inbox items read','<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M1 12l2-2 4 4L18 3l2 2L7 18 1 12Zm9 3 2 2L22 7l2 2-12 12-4-4 2-2Z"/></svg>',s.busy?'disabled':'')}${action('more','More inbox actions',icon('more'),`aria-expanded="${s.more}" aria-controls="inbox-menu"`)}</div>`;
 const menu=s.more?`<div class="inbox-menu" id="inbox-menu">${action('compose','New private message')}${action('refresh','Refresh')}${action('top','Back to top')}</div>`:'';
 let body='';
 if(s.fixture==='loading')body='<div class="inbox-state" role="status">Loading inbox…</div>';
 else if(s.fixture==='empty')body='<div class="inbox-state"><h3>Nothing here yet</h3><p>New replies and messages will appear here.</p></div>';
 else if(s.fixture==='error')body=`<div class="inbox-state"><h3>Couldn’t load your inbox</h3><p>Your account and selected page are unchanged.</p>${action('retry','Retry loading inbox')}</div>`;
 else if(!rows().length)body=`<div class="inbox-state"><h3>${s.view==='unread'?'No unread items':'Nothing here yet'}</h3><p>${s.view==='unread'?'You’re all caught up.':'Items in this view will appear here.'}</p></div>`;
 else {const available=rows(),listed=s.expanded[s.view]?available:available.slice(0,5);body=listed.map(row=>`<article class="inbox-row" data-unread="${unread(row)}"><button class="inbox-open" type="button" data-inbox-row="${row[0]}" aria-label="${unread(row)?'Unread. ':''}${escapeText(row[1]+'. '+row[2]+'. '+row[4])}"><span class="inbox-meta"><span class="other-party">${row[0].startsWith('s')?'To ':''}${escapeText(row[1])}</span>${unread(row)?'<span class="inbox-unread">Unread</span>':''}<span class="inbox-age">${row[6]}</span></span><span class="inbox-kind">${row[2]}${row[3]?' · '+escapeText(row[3]):''}</span><strong class="inbox-title">${escapeText(row[4])}</strong><span class="inbox-body">${escapeText(row[5])}</span></button></article>`).join('');body+=`<div class="inbox-page">${s.fixture==='page-error'&&available.length>5&&!s.expanded[s.view]?'<p>Couldn’t load more. Your current items are still here.</p>':''}${available.length>5&&!s.expanded[s.view]?action('load-more',s.fixture==='page-error'?'Retry loading more':'Load more'): '<p class="result-meta">You’re up to date.</p>'}</div>`}
 return `<div class="inbox-top">${selector}${tools}</div>${menu}<div class="inbox-status" role="status">${escapeText(s.notice)}</div>${body}`;
}
function detail(){const s=state(),row=allRows().find(row=>row[0]===s.detail);if(!row)return '';
 return `<section class="inbox-detail"><header><h3 tabindex="-1">${escapeText(row[4])}</h3>${action('back','Back to inbox',icon('back'))}</header><p class="result-meta">${row[0].startsWith('s')?'To ':''}${escapeText(row[1])} · ${row[2]}${row[3]?' · '+escapeText(row[3]):''}</p><p class="inbox-body">${escapeText(row[5])}</p><p class="inbox-status" role="status">${escapeText(s.notice)}</p><p class="result-meta">${row[0].startsWith('n')?'Comment-context route preview. Native navigation resolves the existing Reddit context link.':'Private-message thread preview. Native messages keep their existing conversation and reply route.'}</p><div class="inbox-detail-actions">${row[0].startsWith('s')?'':action('reply','Reply')}${action('back','Back to inbox')}</div><p class="result-meta">Synthetic content. No Reddit action was sent.</p></section>`;
}
function redraw(focus,offset){root().innerHTML=render();root().scrollTop=offset??(state().offsets[state().view]||0);if(focus)(root().querySelector(focus)||root().querySelector('#inbox-view'))?.focus({preventScroll:true});window.RelaxeShell.show()}
function setView(view){const s=state();s.offsets[s.view]=root().scrollTop;s.view=view;s.more=false;s.detail=null;s.notice='';redraw('#inbox-view')}
function initialize(context,onRoute){getContext=context;route=onRoute;
 document.addEventListener('click',event=>{const button=event.target.closest('[data-inbox],[data-inbox-row]');if(!button||root().dataset.inbox!=='true')return;const s=state();
 if(button.dataset.inboxRow){const row=rows().find(row=>row[0]===button.dataset.inboxRow);s.offsets[s.view]=root().scrollTop;s.detail=row[0];s.lastRow=row[0];s.more=false;s.notice=unread(row)?'Updating read status…':'';redraw('h3',0);if(unread(row)){const account=getContext().account,generation=s.generation;s.busy=true;setTimeout(()=>{if(generation!==s.generation)return;s.busy=false;if(s.fixture==='read-error')s.notice='Couldn’t update read status. This item is still unread.';else{s.read.add(row[0]);s.notice='Marked read in this fixture.'}if(root().dataset.inbox==='true'&&getContext().account===account)redraw(s.detail?'h3':null,s.detail?0:undefined)},350)}return}
 const a=button.dataset.inbox;
 if(a==='more'){s.more=!s.more;redraw('[data-inbox="more"]')}
 else if(a==='top'){s.more=false;redraw('[data-inbox="more"]',0)}
 else if(a==='back'){s.detail=null;redraw(`[data-inbox-row="${s.lastRow||''}"]`)}
 else if(a==='reply'||a==='compose'){s.notice=(a==='reply'?'Reply editor':'New private-message editor')+' route preview. No message was sent.';redraw(a==='reply'?'[data-inbox="reply"]':'[data-inbox="compose"]',s.detail?0:undefined)}
 else if(a==='retry'||a==='load-more'||a==='refresh'){s.more=false;s.notice=a==='refresh'?'Refreshed this synthetic page.':'';if(a==='load-more')s.expanded[s.view]=true;else if(s.fixture==='error'||s.fixture==='loading')s.fixture='ready';redraw(a==='load-more'?null:'#inbox-view')}
 else if(a==='read-all'){const account=getContext().account,generation=s.generation;s.busy=true;s.notice='Marking all inbox items read…';s.more=false;redraw('[data-inbox="more"]');setTimeout(()=>{if(generation!==s.generation)return;s.busy=false;if(s.fixture==='read-error')s.notice='Couldn’t mark all read. Unread items are unchanged.';else{for(const row of [...fixtures.notifications,...fixtures.messages])s.read.add(row[0]);s.notice='All inbox items marked read in this fixture.'}if(root().dataset.inbox==='true'&&getContext().account===account)redraw(null)},350)}
 });
 root().addEventListener('click',event=>{const row=event.target.closest('[data-inbox-row]');if(row)state().lastRow=row.dataset.inboxRow});
 root().addEventListener('scroll',()=>{if(root().dataset.inbox==='true'&&!state().detail)state().offsets[state().view]=root().scrollTop},{passive:true});
 root().addEventListener('change',event=>{if(event.target.id==='inbox-view')setView(event.target.value)});
 const controls=document.querySelector('.controls'),box=document.createElement('div');box.className='controls inbox-fixtures';box.hidden=true;box.id='inbox-fixtures';box.innerHTML='<label>Inbox account<select id="inbox-account"><option value="weekendreader">weekendreader</option><option value="guest">Guest</option></select></label><label>Inbox fixture<select id="inbox-fixture"><option value="ready">Normal</option><option value="loading">Loading</option><option value="error">Initial failure</option><option value="empty">Empty</option><option value="read-error">Read-status failure</option><option value="page-error">Load-more failure</option></select></label><label>Direction<select id="inbox-direction"><option value="ltr">Left to right</option><option value="rtl">Right to left</option></select></label>';controls.after(box);
 document.getElementById('inbox-fixture').addEventListener('change',event=>{const s=state();s.generation++;s.busy=false;s.fixture=event.target.value;s.detail=null;s.more=false;s.notice='';s.read.clear();s.expanded={};s.offsets={};redraw(null,0)});
 document.getElementById('inbox-direction').addEventListener('change',event=>{document.getElementById('nav-phone').dir=event.target.value});
 document.getElementById('inbox-account').addEventListener('change',event=>{route(event.target.value)});
}
function enter(){root().dataset.inbox='true';document.getElementById('inbox-fixtures').hidden=false;document.getElementById('inbox-account').value=getContext().account;document.getElementById('inbox-fixture').value=state().fixture;root().innerHTML=render();root().scrollTop=(state().offsets[state().view]||0)}
window.RelaxeInbox={initialize,enter,leave(){root().dataset.inbox='false';document.getElementById('inbox-fixtures').hidden=true}};
})();
