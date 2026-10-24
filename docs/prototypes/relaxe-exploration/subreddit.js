/* Subreddit header study. Local fixtures only; no Reddit requests or native preferences. */
const S=id=>document.getElementById(id),ST=window.RelaxeStudyTheme;
const subConfig={palette:'blue',appearance:'light',text:'1',width:'390',state:'ready',direction:'ltr',orientation:'portrait',swiping:'enabled'};
const subState={tab:'posts',sort:'hot',time:'day',subscribed:true,pending:false,offsets:{posts:0,about:null},scrollTop:0,compact:false};
const subSorts={hot:'Hot',new:'New',top:'Top',rising:'Rising',controversial:'Controversial'};
const subTimes={hour:'Hour',day:'Day',week:'Week',month:'Month',year:'Year',all:'All Time'};
const timedSort=sort=>sort==='top'||sort==='controversial';
function sortCaption(){return subSorts[subState.sort]+(timedSort(subState.sort)?' · '+subTimes[subState.time]:'')}
let subDoc=null,subScroll=null,subObserver=null,dialogOrigin=null,subscriptionTimer=null;
const subFixtures=[
 {id:'h1',sub:'r/hiking',author:'ridgewalker',age:'2h',score:'2.4k',comments:186,type:'Photo',title:'The last light on the Dolomites after a day of rain',src:'mountain.jpg',flair:'Trip report'},
 {id:'h2',sub:'r/hiking',author:'mossandmiles',age:'3h',score:'841',comments:64,type:'Gallery',title:'Two trails, one weekend: from a forest floor to the high peaks',src:'forest.jpg',pages:['forest.jpg','mountain.jpg'],flair:'Photos'},
 {id:'h3',sub:'r/hiking',author:'slowsteps',age:'4h',score:'405',comments:32,type:'Photo',title:'Taking the long way home through the woods',src:'forest.jpg'},
 {id:'h4',sub:'r/hiking',author:'trailnotes',age:'5h',score:'176',comments:51,type:'Text',title:'What small change made your day pack more comfortable?',flair:'Discussion'},
 {id:'h5',sub:'r/hiking',author:'northbound',age:'6h',score:'619',comments:48,type:'Photo',title:'The clouds finally lifted just before we reached the pass',src:'mountain.jpg'},
 {id:'h6',sub:'r/hiking',author:'fernpaths',age:'7h',score:'283',comments:22,type:'Photo',title:'A quiet trail after the rain, with nobody else in sight',src:'forest.jpg'},
 {id:'h7',sub:'r/hiking',author:'mapandcompass',age:'8h',score:'92',comments:39,type:'Text',title:'A reminder to leave your route and return time with someone',flair:'Advice'},
 {id:'h8',sub:'r/hiking',author:'smallpeaks',age:'9h',score:'357',comments:29,type:'Photo',title:'Our first walk above the tree line this season',src:'mountain.jpg'}
];
const shortDescription='For hikers, by hikers. Share your trails, trip reports, photographs and questions from the outdoors.';
const longDescription=shortDescription+' From a first local walk to a carefully planned mountain route, everyone has a place here. Tell us where you went, what the conditions were like and what you learned. Check local access and weather, respect wildlife and leave the trail better than you found it. Long descriptions wrap fully in this study; large text is allowed to make the header taller.';
function subIcon(name){return ST.icon(name)}
function subButton(action,label,content=label,extra=''){return `<button type="button" data-sub-action="${action}" aria-label="${label}" ${extra}>${content}</button>`}
function subAnnounce(text){subDoc.querySelector('.sub-status').textContent=text}
function subHeader(){const failed=subConfig.state==='error',noBanner=subConfig.state==='no-banner'||failed,subscribe=failed?'':subButton('subscribe','Subscribe','Subscribe','class="sub-subscribe" aria-pressed="false"');return `<div class="sub-banner" data-empty="${noBanner}">${noBanner?'':'<img src="assets/mountain.jpg" alt="">'}</div><div class="sub-intro"><div class="sub-name-row"><span class="sub-avatar" aria-hidden="true">↟</span><h1>r/hiking</h1>${subscribe}</div>${failed?'<div class="sub-error" role="status">Couldn’t load subreddit details. Your posts remain available.'+subButton('retry-header','Retry subreddit details','Retry')+'</div>':`<p class="sub-stats">2.1m subscribers · 342 online · fixture counts</p>${subConfig.state==='hide-description'?'':`<p class="sub-description">${subConfig.state==='long'?longDescription:shortDescription}</p>`}`}</div>`}
function updateSubscription(){if(!subDoc)return;for(const button of subDoc.querySelectorAll('[data-sub-action="subscribe"]')){const subscribed=subConfig.state!=='guest'&&subState.subscribed;button.textContent=subState.pending?'Updating…':subscribed?'Subscribed':'Subscribe';button.setAttribute('aria-label',subState.pending?'Updating subscription':subscribed?'Unsubscribe from hiking':'Subscribe to hiking');button.setAttribute('aria-pressed',String(subscribed));button.disabled=subState.pending}}
function subAbout(){return `<h2>About r/hiking</h2><p>${shortDescription}</p><h3>Subreddit rules</h3><ol><li>Keep posts related to hiking.</li><li>Be respectful to other users.</li><li>Include useful route and conditions information with trip reports.</li><li>Protect sensitive locations and follow local access rules.</li></ol><h3>Sidebar</h3><p>Plan for the weather, carry what you need, and leave no trace. These rules and descriptions are synthetic fixtures.</p>${subButton('wiki','Open subreddit wiki','Wiki')} ${subButton('moderators','View subreddit moderators','Moderators')}`}
function updateCompact(){if(!subScroll)return;const compact=subScroll.querySelector('.sub-header h1').getBoundingClientRect().bottom<=subScroll.getBoundingClientRect().top+1;subScroll.previousElementSibling.dataset.compact=String(compact);const name=subDoc.querySelector('.sub-compact-name');name.setAttribute('aria-hidden',String(!compact));name.innerHTML='r/hiking'+(subState.tab==='about'?'<span class="sub-page-name">About</span>':'');subState.scrollTop=subScroll.scrollTop;subState.compact=compact;const caption=(compact?'Compact header · ':'Expanded header · ')+(subState.tab==='posts'?'Posts':'About')+' · '+(subConfig.state==='guest'?'Guest':'weekendreader');if(S('sub-readout').textContent!==caption)S('sub-readout').textContent=caption}
function applyTab(){subScroll.querySelector('.sub-posts').hidden=subState.tab!=='posts';subScroll.querySelector('.sub-posts').style.minHeight=subScroll.clientHeight+'px';const about=subScroll.querySelector('.sub-about');about.hidden=subState.tab!=='about';about.style.minHeight=subScroll.clientHeight+'px';for(const button of subScroll.querySelectorAll('[data-sub-tab]'))button.setAttribute('aria-pressed',String(button.dataset.subTab===subState.tab));subDoc.querySelector('#sub-sort').hidden=subState.tab!=='posts';subScroll.setAttribute('aria-label','r/hiking: '+(subState.tab==='posts'?'Posts':'About'));subScroll.setAttribute('aria-description',subConfig.swiping==='enabled'?'Swipe horizontally to switch between Posts and About. Page controls are also available at the top and in More.':'Swipe navigation disabled. Use the page controls at the top or in More.');updateSortButton();updateCompact()}
function mountSubreddit(){if(!subDoc?.body)return;const scroll=subDoc.querySelector('.scroll');if(!scroll||scroll===subScroll)return;const desiredOffset=subState.scrollTop;subScroll=scroll;scroll.setAttribute('tabindex','0');scroll.setAttribute('aria-label','Subreddit posts and header');
 const list=subDoc.createElement('div');list.className='sub-posts';while(scroll.firstChild)list.append(scroll.firstChild);
 scroll.innerHTML=`<header class="sub-header">${subHeader()}</header><div class="sub-tabsbar"><button class="sub-tab" type="button" data-sub-tab="posts" aria-pressed="true">Posts</button><button class="sub-tab" type="button" data-sub-tab="about" aria-pressed="false">About</button></div>`;
 scroll.append(list);list.setAttribute('aria-label','Posts');const about=subDoc.createElement('section');about.className='sub-about';about.setAttribute('aria-label','About r/hiking');about.innerHTML=subAbout();scroll.append(about);
 const toolbar=subDoc.createElement('header');toolbar.className='sub-toolbar';toolbar.dataset.compact='false';toolbar.innerHTML=subButton('back','Back to shell',subIcon('back'))+'<h2 class="sub-compact-name" aria-hidden="true">r/hiking</h2>'+subButton('sort','Sort posts: '+sortCaption(),subSortIcon(),'id="sub-sort" aria-haspopup="dialog"')+subButton('more','More subreddit actions',subIcon('more'));scroll.before(toolbar);
 const status=subDoc.createElement('p');status.className='sub-status';status.setAttribute('role','status');scroll.after(status);scroll.addEventListener('scroll',updateCompact,{passive:true});bindSubPaging(scroll);
 applyTab();scroll.scrollTop=desiredOffset;updateSubscription();ST.decorate(subDoc);updateCompact();
}
// The native route should reuse ViewPager2 and its existing disable-swiping preference.
function switchSubTab(tab){
 if(tab===subState.tab)return;
 subState.offsets[subState.tab]=subScroll.scrollTop;
 const previousOffset=subScroll.scrollTop,focusWasInPage=subScroll.contains(subDoc.activeElement);
 subState.tab=tab;applyTab();subScroll.scrollTop=subState.offsets[tab]??previousOffset;updateCompact();
 if(focusWasInPage)subScroll.focus({preventScroll:true});
 S('sub-readout').textContent=(subState.compact?'Compact header · ':'Expanded header · ')+(tab==='posts'?'Posts':'About')+' · '+(subConfig.state==='guest'?'Guest':'weekendreader');
}
function bindSubPaging(scroll){
 let gesture=null,suppressClickUntil=0;
 scroll.addEventListener('pointerdown',event=>{
  if(!event.isPrimary){gesture=null;return}
  if(event.button!==0||!event.target.closest('.sub-posts,.sub-about')||event.target.closest('a,input,select,textarea,[contenteditable],.row-toolbar,.sub-about button'))return;
  gesture={id:event.pointerId,x:event.clientX,y:event.clientY,horizontal:false};
 });
 scroll.addEventListener('pointermove',event=>{
  if(!gesture||event.pointerId!==gesture.id)return;
  if(gesture.vertical)return;
  const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;
  if(!gesture.horizontal&&Math.abs(dy)>12&&Math.abs(dy)>=Math.abs(dx)){gesture.vertical=true;return}
  if(Math.abs(dx)>12&&Math.abs(dx)>Math.abs(dy)*1.5){gesture.horizontal=true;if(!scroll.hasPointerCapture(event.pointerId))scroll.setPointerCapture(event.pointerId);event.preventDefault()}
 });
 scroll.addEventListener('pointerup',event=>{
  if(!gesture||event.pointerId!==gesture.id)return;
  const {x,y,horizontal,vertical}=gesture;gesture=null;
  const dx=event.clientX-x,dy=event.clientY-y;
  if(scroll.hasPointerCapture(event.pointerId))scroll.releasePointerCapture(event.pointerId);
  if(vertical)suppressClickUntil=Date.now()+400;
  if(!horizontal)return;
  suppressClickUntil=Date.now()+400;event.preventDefault();
  if(subConfig.swiping!=='enabled')return;
  if(Math.abs(dx)<64||Math.abs(dx)<=Math.abs(dy)*1.5)return;
  const forward=subConfig.direction==='rtl'?dx>0:dx<0;
  if(forward&&subState.tab==='posts')switchSubTab('about');
  else if(!forward&&subState.tab==='about')switchSubTab('posts');
 });
 scroll.addEventListener('pointercancel',()=>{gesture=null});
 scroll.addEventListener('dragstart',event=>event.preventDefault());
 scroll.addEventListener('click',event=>{if(Date.now()<suppressClickUntil){event.preventDefault();event.stopImmediatePropagation()}},true);
 scroll.addEventListener('keydown',event=>{
  if(event.target!==scroll||event.altKey||event.ctrlKey||event.metaKey)return;
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();switchSubTab((event.key==='ArrowRight')!==(subConfig.direction==='rtl')?'about':'posts')}
 });
}
function updateHeaderFixture(){if(!subScroll)return;const header=subScroll.querySelector('.sub-header'),height=header.offsetHeight,oldOffset=subScroll.scrollTop,wasBelow=oldOffset>=height;header.innerHTML=subHeader();updateSubscription();subScroll.scrollTop=wasBelow?header.offsetHeight+oldOffset-height:oldOffset;updateCompact()}
function applySubTheme(){const frame=S('sub-frame'),settings={foundation:'selected',palette:subConfig.palette,appearance:subConfig.appearance,text:subConfig.text},direction=ST.directions[0],tokens=ST.tokens(direction,settings);const portraitHeight=subConfig.width==='360'?800:subConfig.width==='600'?960:844;S('sub-phone').style.setProperty('--w',(subConfig.orientation==='landscape'?portraitHeight:subConfig.width)+'px');S('sub-phone').style.setProperty('--h',(subConfig.orientation==='landscape'?subConfig.width:portraitHeight)+'px');if(!subDoc?.body)return;subDoc.documentElement.dir=subConfig.direction;for(const [key,value]of Object.entries(tokens))subDoc.documentElement.style.setProperty(key,value);ST.setStyleAttributes(subDoc.documentElement,direction,settings);for(const [id,value]of [['theme',subConfig.appearance==='light'?'light':'dark'],['text',subConfig.text],['width',subConfig.width]]){const select=subDoc.getElementById(id);if(select.value!==value){select.value=value;select.dispatchEvent(new Event('change',{bubbles:true}))}}frame.contentWindow.RelaxeShell?.setContext({account:subConfig.state==='guest'?'guest':'weekendreader',subreddit:'hiking',palette:subConfig.palette,appearance:subConfig.appearance,text:subConfig.text,width:subConfig.width});mountSubreddit();if(frame.dataset.ready==='true'){updateHeaderFixture();applyTab()}}
function closeSubDialog(){subDoc.querySelector('.sub-study-dialog')?.close()}
function openSubDialog(title,body){let dialog=subDoc.querySelector('.sub-study-dialog');if(!dialog){dialog=subDoc.createElement('dialog');dialog.className='sub-study-dialog';dialog.setAttribute('aria-labelledby','sub-dialog-title');subDoc.body.append(dialog);dialog.addEventListener('close',()=>{if(dialogOrigin?.isConnected)dialogOrigin.focus({preventScroll:true})})}if(!dialog.open)dialogOrigin=subDoc.activeElement;dialog.innerHTML=`<header><h2 id="sub-dialog-title" tabindex="-1">${title}</h2>${subButton('close-dialog','Close subreddit dialog',subIcon('close'))}</header>${body}`;if(!dialog.open)dialog.showModal();dialog.querySelector('h2').focus();updateSubscription();ST.decorate(subDoc)}
function subSortIcon(){return '<svg class="foundation-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M3 4h18v3H3V4Zm0 7h12v3H3v-3Zm0 7h6v3H3v-3Z"/></svg>'}
function updateSortButton(){const button=subDoc?.getElementById('sub-sort');if(button){button.innerHTML=subSortIcon();button.setAttribute('aria-label','Sort posts: '+sortCaption());button.title='Sort posts: '+sortCaption()}}
function openSortDialog(){openSubDialog('Sort posts',`<p class="sub-current-sort">Current: ${sortCaption()}</p><div class="sub-menu">${Object.entries(subSorts).map(([key,label])=>`<button type="button" data-sub-sort="${key}" aria-pressed="${key===subState.sort}">${label}${key===subState.sort?' ✓':''}${timedSort(key)?' ›':''}</button>`).join('')}</div>`)}
function openTimeDialog(sort){openSubDialog(subSorts[sort]+' · Time range',`<div class="sub-menu">${Object.entries(subTimes).map(([key,label])=>`<button type="button" data-sub-time="${key}" data-sort-type="${sort}" aria-pressed="${sort===subState.sort&&key===subState.time}">${label}${sort===subState.sort&&key===subState.time?' ✓':''}</button>`).join('')}</div>${subButton('sort','Back to sort options','Back')}`)}
function chooseSort(sort,time){subState.sort=sort;if(time)subState.time=time;updateSortButton();closeSubDialog();subAnnounce('Sort: '+sortCaption()+' · fixture list order unchanged.')}
function subAction(action){if(action==='page-posts'||action==='page-about'){closeSubDialog();switchSubTab(action==='page-posts'?'posts':'about');return}if(action==='sort'){openSortDialog();return}if(action==='back')location.href='navigation.html';else if(action==='search')S('sub-frame').contentWindow.RelaxeShell.openSearch();else if(action==='retry-header'){subConfig.state='ready';S('sub-state').value='ready';updateHeaderFixture()}else if(action==='close-dialog')closeSubDialog();else if(action==='more')openSubDialog('r/hiking',`<div class="sub-menu">${subButton(subState.tab==='posts'?'page-about':'page-posts',subState.tab==='posts'?'About r/hiking':'Back to posts')}${subButton('subscribe','Subscribe to hiking')}${subButton('favorite','Add subreddit to favorites','Favorite')}${subButton('rules','Read subreddit rules','Rules')}${subButton('wiki','Open subreddit wiki','Wiki')}${subButton('moderators','View subreddit moderators','Moderators')}</div>`);else if(action==='subscribe'){
 if(subState.pending)return;if(subConfig.state==='guest'){subAnnounce('Sign in to manage subreddit subscriptions. Guest fixture only.');return}subState.pending=true;updateSubscription();const previous=subState.subscribed;subscriptionTimer=setTimeout(()=>{subState.pending=false;if(subConfig.state==='subscribe-error'){subState.subscribed=previous;subAnnounce('Couldn’t update subscription. Previous state kept. Try again.')}else{subState.subscribed=!previous;subAnnounce(subState.subscribed?'Subscribed · local fixture':'Unsubscribed · local fixture')}updateSubscription()},350);
 }else if(action==='rules')openSubDialog('Subreddit rules',subAbout());else if(action==='wiki'||action==='moderators'||action==='favorite')subAnnounce((action==='wiki'?'Wiki':action==='moderators'?'Moderators':'Favorites')+' destination preview · current subreddit and account. No external action.');}
let loadingSubDoc=null;
async function mountSubFrame(){const frame=S('sub-frame'),doc=frame.contentDocument;if(!doc?.body||!frame.contentWindow.RelaxeFeedStudy||loadingSubDoc===doc)return;loadingSubDoc=doc;await Promise.all(['foundations-preview.css?rev=07','subreddit-preview.css?rev=11'].map(href=>new Promise((resolve,reject)=>{const link=doc.createElement('link');link.rel='stylesheet';link.href=href;link.onload=resolve;link.onerror=reject;doc.head.append(link)})));if(doc!==frame.contentDocument||!doc.body)return;subDoc=doc;subScroll=null;frame.contentWindow.RelaxeFeedStudy.beforeRender=scroll=>{if(scroll?.querySelector(".sub-header")){subState.scrollTop=scroll.scrollTop}};frame.contentWindow.RelaxeFeedStudy.replacePosts(subFixtures);applySubTheme();mountSubreddit();
 doc.addEventListener('click',event=>{const sort=event.target.closest('[data-sub-sort]'),time=event.target.closest('[data-sub-time]');if(sort){const type=sort.dataset.subSort;timedSort(type)?openTimeDialog(type):chooseSort(type);return}if(time){chooseSort(time.dataset.sortType,time.dataset.subTime);return}const tab=event.target.closest('[data-sub-tab]');if(tab){switchSubTab(tab.dataset.subTab);return}const button=event.target.closest('[data-sub-action]');if(button){event.preventDefault();subAction(button.dataset.subAction)}});

 subObserver?.disconnect();subObserver=new MutationObserver(mountSubreddit);subObserver.observe(doc.getElementById('studies'),{childList:true,subtree:true});frame.dataset.ready='true';updateCompact();
}
S('sub-frame').addEventListener('load',mountSubFrame);
if(S('sub-frame').contentDocument?.readyState==='complete')mountSubFrame();
for(const [id,key]of [['sub-swiping','swiping'],['sub-palette','palette'],['sub-mode','appearance'],['sub-text','text'],['sub-width','width'],['sub-state','state'],['sub-direction','direction'],['sub-orientation','orientation']])S(id).addEventListener('change',event=>{if(key==='state'){clearTimeout(subscriptionTimer);subState.pending=false}subConfig[key]=event.target.value;applySubTheme()});
S('sub-top').addEventListener('click',()=>{if(subScroll){subScroll.scrollTop=0;updateCompact()}});S('sub-posts').addEventListener('click',()=>{if(subScroll){subState.tab='posts';applyTab();subScroll.scrollTop=subScroll.querySelector('.sub-header').offsetHeight+subScroll.querySelector('.sub-tabsbar').offsetHeight;updateCompact()}});applySubTheme();
