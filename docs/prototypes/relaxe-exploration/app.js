/* Isolated design fixtures. No Reddit API, storage, analytics, or account access. */
const posts = [
 {id:'p1',sub:'r/EarthPorn',author:'ridgewalker',age:'2h',score:'2.4k',comments:186,type:'Photo',title:'The last light on the Dolomites after a day of rain',src:'mountain.jpg'},
 {id:'p2',sub:'r/hiking',author:'mossandmiles',age:'3h',score:'841',comments:64,type:'Gallery',title:'Two trails, one weekend: from a forest floor to the high peaks',src:'forest.jpg',pages:['forest.jpg','mountain.jpg'],flair:'Trip report'},
 {id:'p3',sub:'r/gardening',author:'smallplot',age:'4h',score:'312',comments:27,type:'Video',title:'A quiet moment with the flowers in our community garden',src:'garden.mp4'},
 {id:'p4',sub:'r/space',author:'orbitalnotes',age:'5h',score:'1.8k',comments:92,type:'GIF',title:'Watching Earth turn never gets old',src:'earth.gif'},
 {id:'p5',sub:'r/BuyItForLife',author:'repairfirst',age:'5h',score:'527',comments:143,type:'Text',title:'What did you repair this month instead of replacing? My ten-year-old kettle lives to boil another day.',flair:'Discussion'},
 {id:'p6',sub:'r/Android',author:'openinterfaces',age:'6h',score:'964',comments:208,type:'Link',title:'Why large text should change a layout, not hide the important parts',flair:'Article · example.org'},
 {id:'p7',sub:'r/photography',author:'afterhours',age:'6h',score:'118',comments:19,type:'Photo',title:'Night photography study — content warning fixture',src:'forest.jpg',gated:true},
 {id:'p8',sub:'r/Outdoors',author:'coastalpath',age:'7h',score:'76',comments:8,type:'Photo',title:'The view from the trail — original media is currently unavailable',src:'mountain.jpg',unavailable:true},
 {id:'p9',sub:'r/CasualConversation',author:'morningpages',age:'8h',score:'236',comments:71,type:'Text',title:'A tiny good thing that happened today: someone returned my notebook'},
 {id:'p10',sub:'r/hiking',author:'slowsteps',age:'8h',score:'405',comments:32,type:'Photo',title:'Taking the long way home through the woods',src:'forest.jpg'}
];
const directions = [
 {id:'a',name:'Index',number:'01 / READING FIRST',summary:'64px thumbnail · title first · whole text opens comments · occasional actions in a sheet. Fit media with reserved controls.'},
 {id:'b',name:'Dock',number:'02 / ACTIONS FIRST',summary:'56px thumbnail · explicit vote, comments and save · taller rows. Fit media above a persistent themed action dock.'},
 {id:'c',name:'Context',number:'03 / COMMUNITY FIRST',summary:'Community above title · score rail · thumbnail right. Immersive fill viewer with controls on an opaque scrim.'}
];
const $ = s => document.querySelector(s);
const settings = {review:'refine',surface:'feed',theme:'light',text:1,width:390,state:'ready'};
const saved = new Set(), read = new Set(), revealed = new Set(), votes = new Map(), pages = new Map();
const scrollOffsets = new Map();
const mediaPosts = posts.filter(p=>p.src);
let mediaIndex=0, zoom=1, playKey=null, muted=true, fitOverride=null, failNext=false, pending=new Set();
let sheetPost=null, sheetMode=null;
let dialogOrigin=null;
let openToolbar=null, alwaysShowToolbar=false, suppressClickUntil=0;
let manualPaused=null, playbackSuspended=false, mediaNotice='';
const playbackPositions=new Map();
let mediaControlsVisible=false, mediaHideTimer=null, mediaSeeking=false, seekWasPlaying=false;
let inputModality='pointer', mediaPointerActive=false, suppressMediaClickUntil=0;
let restoringMediaFocus=false;
function setMediaControls(visible){
 mediaControlsVisible=visible;clearTimeout(mediaHideTimer);
 const chrome=document.querySelector('.immersive .media-chrome'),surface=document.querySelector('.immersive .tap-catcher');
 if(chrome)chrome.hidden=!visible;
 if(surface){surface.setAttribute('aria-expanded',String(visible));surface.setAttribute('aria-label',visible?'Hide media controls':'Show media controls')}
 if(!visible&&chrome?.contains(document.activeElement)){restoringMediaFocus=true;surface?.focus({preventScroll:true});restoringMediaFocus=false}
 scheduleMediaHide();
}
function scheduleMediaHide(){
 clearTimeout(mediaHideTimer);
 if(!isRefined()||settings.surface!=='media'||!mediaControlsVisible||!playKey||mediaSeeking||mediaPointerActive||$('#sheet').open||document.hidden)return;
 if(inputModality==='keyboard'&&document.querySelector('.immersive')?.contains(document.activeElement))return;
 mediaHideTimer=setTimeout(()=>setMediaControls(false),4000);
}
function formatTime(seconds){if(!Number.isFinite(seconds))return '0:00';return Math.floor(seconds/60)+':'+String(Math.floor(seconds%60)).padStart(2,'0')}
function immersiveMedia(d){
 const p=mediaPosts[mediaIndex],page=pages.get(p.id)||0,key=d.id+':'+p.id,isPlaying=playKey===key;
 let state=settings.state;if(state==='ready'&&p.gated&&!revealed.has(p.id))state='gated';if(state==='ready'&&p.unavailable)state='error';
 const fill=fitOverride===true;
 const src=p.pages?p.pages[page]:p.src;
 const content=state==='ready'?(p.type==='Video'?`<video data-key="${key}" src="assets/${src}" ${isPlaying?'autoplay':''} ${muted?'muted':''} loop playsinline preload="none" aria-label="Flower video sample"></video>`:`<img draggable="false" src="assets/${p.type==='GIF'&&!isPlaying?'earth-poster.png':src}" alt="${esc(p.type==='GIF'?'Rotating Earth visualization':p.pages&&page===0?'Sunlight falling through a green forest':'Mountain peaks in evening light')}">`):'';
 const tools=state==='ready'?`<div class="media-tools">${['Video','GIF'].includes(p.type)?btn('play',isPlaying?'Pause media':'Play media',isPlaying?'Ⅱ Pause':'▷ Play',`aria-pressed="${isPlaying}"`):btn('zoom',zoom>1?'Reset zoom':'Zoom image',zoom>1?'1× Reset':'2× Zoom')}${p.type==='Video'?btn('mute',muted?'Unmute video':'Mute video',muted?'Muted':'Sound on'):''}${btn('fit',fill?'Fit whole media':'Fill viewport',fill?'Fit':'Fill')}${p.pages?btn('gallery-prev','Previous gallery image','←',page===0?'disabled':'')+`<span>${page+1}/2</span>`+btn('gallery-next','Next gallery image','→',page===1?'disabled':''):''}</div>${p.type==='Video'?'<div class="media-seek"><label class="seek-label" for="media-seek-a">Seek video</label><input id="media-seek-a" type="range" min="0" max="1000" value="0" aria-label="Seek video"><output class="playback-time" aria-live="off">0:00 / 0:00</output></div>':''}`:'';
 return `<div class="statusbar" aria-hidden="true"><span>9:41</span><span>▰ ▪ 92%</span></div><section class="media a immersive" data-post="${p.id}" aria-label="Visual media viewer"><div class="stage ${fill?'fill':''}" style="--zoom:${zoom}" data-gesture="${d.id}">${content}${btn('toggle-controls',mediaControlsVisible?'Hide media controls':'Show media controls','',`class="tap-catcher" aria-controls="media-chrome-a" aria-expanded="${mediaControlsVisible}"`)}</div>${state!=='ready'?placeholder(state,true):''}${mediaNotice?`<p class="media-notice" role="status">${mediaNotice} ${btn('play','Play media','Play')}</p>`:''}<div id="media-chrome-a" class="media-chrome" ${mediaControlsVisible?'':'hidden'}><header class="media-header">${btn('exit-media','Back to feed','←')}<span>${p.type}${p.pages?` · ${page+1}/${p.pages.length}`:''} · ${mediaIndex+1}/${mediaPosts.length}</span>${btn('hide-controls','Hide media controls','✕')}</header><div class="media-dock">${zoom>1?'<div class="zoom-note">Paging locked while zoomed</div>':''}${tools}<div class="media-info"><span class="meta">${p.sub.replace(/^r\//,'')} · ${p.author} · ${p.age}</span><h3>${p.title}</h3></div><div class="media-actions">${btn('vote-up','Upvote post','↑ '+p.score,`aria-pressed="${votes.get(p.id)===1}"`)}${btn('vote-down','Downvote post','↓',`aria-pressed="${votes.get(p.id)===-1}"`)}${btn('post-details','Comments — open default post details','◯ '+p.comments+' Comments')}${btn('save',saved.has(p.id)?'Unsave post':'Save post',saved.has(p.id)?'Saved':'Save',`aria-pressed="${saved.has(p.id)}"`)}${btn('options','More post actions','⋮')}</div><nav class="page-nav" aria-label="Media pages">${btn('previous','Previous post','↑ Previous',mediaIndex===0?'disabled':'')}${btn('next','Next post','Next ↓',mediaIndex===mediaPosts.length-1?'disabled':'')}</nav></div></div></section>`;
}
const toolbarChoices=[
 {id:'vote-up',label:'Upvote',icon:'↑'},
 {id:'vote-down',label:'Downvote',icon:'↓'},
 {id:'post-details',label:'Post & comments',icon:'▤'},
 {id:'external',label:'Open externally',icon:'↗'},
 {id:'save',label:'Save / unsave',icon:'◇'},
 {id:'share-post',label:'Share',icon:'⇧'},
 {id:'copy-link',label:'Copy link',icon:'⧉'}
];
const defaultToolbar=['vote-up','vote-down','post-details','external'];
let toolbarOrder=[...defaultToolbar];
function isRefined(){return settings.review==='refine'}
function inlineToolbar(p){
 const actions=toolbarOrder.map(id=>{
  const item=toolbarChoices.find(x=>x.id===id);
  const pressed=id==='save'?saved.has(p.id):id==='vote-up'?votes.get(p.id)===1:id==='vote-down'?votes.get(p.id)===-1:null;
  return btn(id,item.label,`<span aria-hidden="true">${item.icon}</span>`,`${pressed===null?'':`aria-pressed="${pressed}"`} title="${esc(item.label)}"`);
 }).join('');
 return `<div class="row-toolbar" role="group" aria-label="Post toolbar">${actions}${btn('more-row','More post actions','⋮','title="More post actions"')}</div><p class="row-feedback" role="status">${pending.has(p.id)?'Updating…':saved.has(p.id)?'Saved locally':votes.get(p.id)?(votes.get(p.id)===1?'Upvoted locally':'Downvoted locally'):''}</p>`;
}
function refinedRow(p){
 const expanded=alwaysShowToolbar||openToolbar===p.id;
 const metadata=`<span class="meta"><strong>${p.sub.replace(/^r\//,'')}</strong><span aria-hidden="true"> · </span>${p.author}${p.flair?`<span aria-hidden="true"> · </span><span class="flair">${p.flair}</span>`:''}</span>`;
 const summary=`<span class="stats"><strong>${p.score} points</strong> · ${p.comments} comments · ${p.age}${saved.has(p.id)?' · Saved':''}${read.has(p.id)?' · Read':''}</span>`;
 return `<article class="row a ${read.has(p.id)?'read':''} ${expanded?'expanded':''}" data-post="${p.id}" data-longpress="true">${thumbnail(p)}${btn('open-post',`Open post and comments: ${p.title}`,`<span class="title">${p.title}</span>${metadata}${summary}`,`class="post-body" aria-expanded="${expanded}" aria-description="Long press, right click or press Shift+F10 for post actions"`)}${expanded?inlineToolbar(p):''}</article>`;
}
function focusToken(el=document.activeElement){return el?.dataset?.action?{action:el.dataset.action,post:el.closest('[data-post]')?.dataset.post,direction:el.closest('[data-direction]')?.dataset.direction}:null}
function restoreFocus(token){if(!token)return;const root=token.direction?document.querySelector(`[data-direction="${token.direction}"]`):document;const post=token.post?root?.querySelector(`[data-post="${token.post}"]`):root;(post?.querySelector(`[data-action="${token.action}"]`)||post?.querySelector('.post-body'))?.focus({preventScroll:true})}
const esc = v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const btn=(action,label,content,extra='')=>`<button type="button" data-action="${action}" aria-label="${esc(label)}" ${extra}>${content}</button>`;
const stats=p=>`${p.score} points · ${p.comments} comments${saved.has(p.id)?' · Saved':''}${read.has(p.id)?' · Read':''}`;
function thumbnail(p){
 const icon={Video:'▷',Text:'≡',Link:'↗',GIF:'GIF',Gallery:'▧',Photo:'▧'}[p.type];
 const image=p.gated&&!revealed.has(p.id)?'<span class="fallback">◈</span>':p.unavailable?'<span class="fallback">!</span>':p.type==='Video'?'<span class="fallback">▷</span>':p.src?`<img src="assets/${p.type==='GIF'?'earth-poster.png':p.src}" alt="" loading="lazy">`:`<span class="fallback">${icon}</span>`;
 return btn('open-media',p.src?`Open ${p.type.toLowerCase()}: ${p.title}`:`Open post: ${p.title}`,`${image}<span class="type">${p.gated?'Gated':p.type==='Gallery'?'1/2':p.type}</span>`,'class="thumb"');
}
function row(p,d){
 if(isRefined()&&d==='a')return refinedRow(p);
 const meta=`<span class="meta"><strong>${p.sub}</strong> · ${p.age}</span>`;
 const title=`<span class="title">${p.title}</span>`;
 const summary=`<span class="stats">${stats(p)}</span>`;
 const body=btn('comments',`Open comments: ${p.title}`,`${d==='c'?meta:title}${d==='c'?title:meta}${p.flair?`<span class="flair">${p.flair}</span>`:''}${d==='b'?'':summary}`,'class="post-body"');
 const more=btn('options',`More actions: ${p.title}`,'⋮','class="overflow"');
 const vote=btn('vote-up',`Upvote: ${p.title}`,'↑',`aria-pressed="${votes.get(p.id)===1}"`);
 let inner;
 if(d==='a') inner=thumbnail(p)+body+more;
 if(d==='b') inner=thumbnail(p)+body+`<div class="inline-actions">${vote}${btn('comments',`${p.comments} comments`,`${p.comments} ◯`)}${btn('save',saved.has(p.id)?'Unsave post':'Save post',saved.has(p.id)?'Saved':'Save',`aria-pressed="${saved.has(p.id)}"`)}${more}</div>`;
 if(d==='c') inner=`<div class="score"><span>${p.score}</span>${more}</div>${body}${thumbnail(p)}`;
 return `<article class="row ${d} ${read.has(p.id)?'read':''}" data-post="${p.id}">${inner}</article>`;
}
function placeholder(state,media=false){
 if(state==='loading') return media?'<div class="placeholder" role="status"><h3>Loading media…</h3><p>Poster remains until the first frame.</p></div>':`<div role="status" aria-label="Loading posts">${'<div class="skeleton"></div>'.repeat(6)}</div>`;
 const copy={error:['Media unavailable','The original file could not be loaded. Your place is kept.','retry','Retry'],empty:['Nothing here yet',media?'No supported visual posts in this fixture feed.':'No posts match the current filters.','retry','Reset fixture'],gated:['Content hidden','Spoiler / NSFW gate fixture. Media is not loaded before reveal.','reveal','Reveal media']};
 const [title,detail,action,label]=copy[state];
 return `<div class="placeholder"><h3>${title}</h3><p>${detail}</p>${btn(action,label,label)}${media?'<p>Next post remains available below.</p>':''}</div>`;
}
function shell(d){
 return `<div class="statusbar" aria-hidden="true"><span>9:41</span><span>▰ ▪ 92%</span></div><header class="appbar">${btn('account','Account and navigation','r','class="avatar"')}<span class="heading">Home</span>${btn('search','Search fixture','⌕')}</header><div class="feed-filter"><span>Best ▾</span><span>Following</span><span>Compact · ${d.name}</span></div><div class="scroll" data-scroll="${d.id}">${settings.state==='ready'?posts.map(p=>row(p,d.id)).join(''):placeholder(settings.state)}</div><nav class="bottom-nav" aria-label="Main navigation">${btn('home','Home','<span class="nav-icon">⌂</span>Home','class="active"')}${btn('communities','Communities','<span class="nav-icon">▦</span>Communities')}${btn('saved','Saved posts','<span class="nav-icon">◇</span>Saved')}</nav>`;
}
function media(d){
 if(isRefined())return immersiveMedia(d);
 const p=mediaPosts[mediaIndex], page=pages.get(p.id)||0, key=d.id+':'+p.id;
 const isPlaying=playKey===key;
 let state=settings.state;
 if(state==='ready'&&p.gated&&!revealed.has(p.id)) state='gated';
 if(state==='ready'&&p.unavailable) state='error';
 const fill=fitOverride===null?d.id==='c':fitOverride;
 let content='';
 if(state!=='ready') content=placeholder(state,true);
 else {
  const src=p.pages?p.pages[page]:p.src;
 const file=p.type==='Video'?`<video data-key="${key}" src="assets/${src}" ${isPlaying?'autoplay controls':''} ${muted?'muted':''} loop playsinline preload="none" aria-label="Flower video sample"></video>`:`<img draggable="false" src="assets/${p.type==='GIF'&&!isPlaying?'earth-poster.png':src}" alt="${esc(p.type==='GIF'?'Rotating Earth visualization':p.pages&&page===0?'Sunlight falling through a green forest':'Mountain peaks in evening light')}">`;
  content=`<div class="stage ${fill?'fill':''}" style="--zoom:${zoom}" data-gesture="${d.id}">${file}<span class="media-badge">${p.type}${p.pages?` · ${page+1}/${p.pages.length}`:''}${fill?' · Fill':''}</span></div>`;
 }
 const tools=state==='ready'?`<div class="media-tools">${p.type==='Video'||p.type==='GIF'?btn('play',isPlaying?'Pause media':'Play media',isPlaying?'Ⅱ Pause':'▷ Play','aria-pressed="'+isPlaying+'"'):btn('zoom',zoom>1?'Reset zoom':'Zoom image',zoom>1?'1× Reset':'2× Zoom')}${p.type==='Video'?btn('mute',muted?'Unmute video':'Mute video',muted?'Muted':'Sound on'):''}${btn('fit',fill?'Fit whole media':'Fill viewport',fill?'Fit':'Fill')}${p.pages?btn('gallery-prev','Previous gallery image','←',page===0?'disabled':'')+`<span>${page+1}/2</span>`+btn('gallery-next','Next gallery image','→',page===1?'disabled':''):''}</div>`:'';
 return `<div class="statusbar" aria-hidden="true"><span>9:41</span><span>▰ ▪ 92%</span></div><section class="media ${d.id}" data-post="${p.id}"><header class="media-header">${btn('exit-media','Back to feed','←')}<span>Following · Best · ${mediaIndex+1}/${mediaPosts.length}</span>${btn('options','More post actions','⋮')}</header>${content}${zoom>1?'<div class="zoom-note">Paging locked while zoomed · center zoom simulation</div>':''}${tools}${mediaNotice?`<p class="media-notice" role="status">${mediaNotice}</p>`:''}<div class="media-info"><span class="meta">${isRefined()?p.sub.replace(/^r\//,'')+' · '+p.author:p.sub+' · u/'+p.author} · ${p.age}</span><h3>${p.title}</h3></div><div class="media-actions">${btn('vote-up','Upvote post','↑ '+p.score,`aria-pressed="${votes.get(p.id)===1}"`)}${btn(isRefined()?'post-details':'comments','Open post and comments',p.comments+' ◯')}${btn('save',saved.has(p.id)?'Unsave post':'Save post',saved.has(p.id)?'Saved':'Save',`aria-pressed="${saved.has(p.id)}"`)}${btn('options','More post actions','⋮')}</div><nav class="page-nav" aria-label="Media pages">${btn('previous','Previous post','↑ Previous',mediaIndex===0?'disabled':'')}${btn('next','Next post','Next ↓',mediaIndex===mediaPosts.length-1?'disabled':'')}</nav></section>`;
}
function render(){
 clearTimeout(mediaHideTimer);
 const active=focusToken();
 document.querySelectorAll('[data-scroll]').forEach(e=>scrollOffsets.set(e.dataset.scroll,e.scrollTop));
 document.querySelectorAll('video').forEach(v=>{if(v.dataset.key&&Number.isFinite(v.currentTime))playbackPositions.set(v.dataset.key,v.currentTime);v.pause();v.removeAttribute('src');v.load()});
 if(isRefined()){
  const p=mediaPosts[mediaIndex],key='a:'+p.id;
  const eligible=settings.surface==='media'&&settings.state==='ready'&&!document.hidden&&!$('#sheet').open&&!playbackSuspended&&manualPaused!==key&&(!p.gated||revealed.has(p.id))&&!p.unavailable&&['Video','GIF'].includes(p.type);
  playKey=eligible?key:null;
 }
 const height={360:800,390:844,600:960}[settings.width];
 const shown=isRefined()?directions.slice(0,1):directions;
 $('#studies').classList.toggle('focused',isRefined());
 $('#studies').innerHTML=shown.map(d=>`<section class="study" style="--w:${settings.width}px;--h:${height}px"><div class="study-head"><span class="num">${isRefined()?(settings.surface==='media'?'MEDIA REVIEW / TAP TO REVEAL':'ACCEPTED FEED DIRECTION'):d.number}</span><h2>${d.id.toUpperCase()} · ${d.name}${isRefined()?' / refined':''}</h2><p>${isRefined()?(settings.surface==='media'?'Autoplay · Fit framing · media first. Tap to reveal controls, metadata and Reddit actions.':'Compact cards · no permanent overflow · long press for your toolbar. Metadata wraps; the title stays first.'):d.summary}</p></div><div class="phone ${d.id} ${settings.theme} ${settings.text>1?'large':''} ${isRefined()?'refined':''}" data-direction="${d.id}" style="--scale:${settings.text}">${settings.surface==='feed'?shell(d):media(d)}</div><p class="measurement" id="measure-${d.id}"></p></section>`).join('')+(isRefined()?`<aside class="review-notes"><span class="eyebrow">WHAT TO REVIEW</span><h2>${settings.surface==='feed'?'A card, three text levels.':'Media first. Tap for controls.'}</h2><p>${settings.surface==='feed'?'The collapsed card keeps its title, metadata and statistics together. Community and username have no prefixes. Long metadata wraps without losing the flair.':'The page opens with its overlays hidden. One tap reveals media controls, text and Reddit actions; another hides them without changing playback. Video/GIF overlays hide after four seconds while playing.'}</p>${settings.surface==='feed'?'<ol><li>Title at the top</li><li>Community · author · post flair</li><li><strong>Points</strong> · comments · time</li></ol><h3>Long-press toolbar</h3><p>↑ Upvote · ↓ Downvote · ▤ Post & comments · ↗ Open externally · ⋮ More</p>':'<h3>Playback and navigation</h3><p>Videos and GIFs autoplay muted when eligible. Swipe vertically for posts, horizontally for galleries. Use explicit Pause, seek, mute and page buttons after revealing controls.</p><p>Controls stay while paused, scrubbing or navigating by keyboard. Photos keep them until the next tap. The media frame stays fixed as overlays appear.</p><h3>Comments stays a Reddit action</h3><p>Upvote · downvote · Comments · Save · More. Comments opens the default post-details screen, using the current post and account.</p>'}<p>“More” contains community and author destinations, unread/hide/report/mute, share/copy and save. These actions are destination previews only.</p>${btn('configure-toolbar','Customize long-press toolbar','Customize toolbar','class="configure-cta"')}<p class="small-note">Local fixtures only. Native Android behavior and styling will be refined during implementation.</p><h3>Review separately</h3><p>Post details can be reviewed next. Whole-app styling belongs in its own chat, working through each UI part with you.</p></aside>`:'');
 document.querySelectorAll('[data-scroll]').forEach(e=>e.scrollTop=scrollOffsets.get(e.dataset.scroll)||0);
 requestAnimationFrame(measure);
 bindGestures();
 bindLongPress();
 bindMediaChrome();
 restoreFocus(active);
 document.querySelectorAll('video[data-key]').forEach(v=>{
  v.addEventListener('loadedmetadata',()=>{const position=playbackPositions.get(v.dataset.key)||0;if(position>0&&position<v.duration)v.currentTime=position},{once:true});
  const syncButton=playing=>{const control=v.closest('.media').querySelector('[data-action="play"]');if(control){control.setAttribute('aria-label',playing?'Pause media':'Play media');control.setAttribute('aria-pressed',String(playing));control.textContent=playing?'Ⅱ Pause':'▷ Play'}};
  v.addEventListener('pause',()=>{if(!v.isConnected||!isRefined())return;manualPaused=v.dataset.key;playKey=null;syncButton(false);clearTimeout(mediaHideTimer)});
  v.addEventListener('play',()=>{if(!v.isConnected||!isRefined())return;manualPaused=null;playKey=v.dataset.key;syncButton(true);scheduleMediaHide()});
  if(v.autoplay)v.play().catch(()=>{if(!v.isConnected||playKey!==v.dataset.key)return;manualPaused=v.dataset.key;mediaNotice='Playback was blocked by the browser. Use Play to start.';render()});
 });
 scheduleMediaHide();
}
function measure(){
 for(const d of directions){
  const phone=document.querySelector(`[data-direction="${d.id}"]`);if(!phone)continue;const scroll=phone.querySelector('.scroll');
  if(!scroll){$('#measure-'+d.id).innerHTML=`${mediaPosts[mediaIndex].type} · ${fitOverride===null?(d.id==='c'?'Fill':'Fit'):(fitOverride?'Fill':'Fit')} · one media item can play across this comparison.`;continue}
  const box=scroll.getBoundingClientRect(),rows=[...scroll.querySelectorAll('.row')],heights=rows.map(e=>e.getBoundingClientRect().height).sort((a,b)=>a-b);
  const full=rows.filter(e=>{const r=e.getBoundingClientRect();return r.top>=box.top-.5&&r.bottom<=box.bottom+.5}).length;
  const median=heights.length?Math.round((heights[4]+heights[5])/2):0;
  $('#measure-'+d.id).innerHTML=`<strong>${full}</strong> complete rows · ${Math.round(box.height)}px feed viewport<br>Median ${isRefined()?'card body':'row'} ${median}px · ${settings.width} × ${{360:800,390:844,600:960}[settings.width]} · text ${settings.text*100}%`;
 }
}
function setMedia(index){mediaIndex=Math.max(0,Math.min(mediaPosts.length-1,index));zoom=1;playKey=null;manualPaused=null;playbackSuspended=false;mediaNotice='';mediaControlsVisible=false;mediaSeeking=false;render()}
function configureToolbar(){
 playbackSuspended=true;playKey=null;render();sheetPost=null;sheetMode='configure';
 const all=[...toolbarOrder,...toolbarChoices.map(x=>x.id).filter(id=>!toolbarOrder.includes(id))];
 $('#sheet-title').textContent='Long-press toolbar';
 $('#sheet-content').innerHTML=`<p class="sheet-warning">Choose and reorder the buttons. More remains available for all other actions. Changes affect this preview only.</p><div class="toolbar-editor">${all.map(id=>{const item=toolbarChoices.find(x=>x.id===id),i=toolbarOrder.indexOf(id);return `<div class="toolbar-choice"><label><input type="checkbox" data-toolbar-choice="${id}" ${i>=0?'checked':''}>${item.label}</label>${i>=0?btn('toolbar-up','Move '+item.label+' up','↑',`data-choice="${id}" ${i===0?'disabled':''}`)+btn('toolbar-down','Move '+item.label+' down','↓',`data-choice="${id}" ${i===toolbarOrder.length-1?'disabled':''}`):''}</div>`}).join('')}<div class="toolbar-choice"><span>⋮ More (always available)</span></div></div><label class="always-show"><input type="checkbox" id="always-show" ${alwaysShowToolbar?'checked':''}>Always show row toolbar</label>${btn('toolbar-defaults','Restore default toolbar','Restore defaults')}<p class="sheet-warning">Proposed native location: Feed options → Long-press toolbar. Reuse existing account-scoped preferences and current toolbar settings.</p>`;
 if(!$('#sheet').open)$('#sheet').showModal();
}
function showRowMenu(p){
 playbackSuspended=true;playKey=null;render();sheetPost=p;sheetMode='row-menu';
 $('#sheet-title').textContent='More post actions';
 $('#sheet-content').innerHTML=`<p class="sheet-post"><strong>${p.sub.replace(/^r\//,'')}</strong><br>${p.title}</p><div class="sheet-actions">${!toolbarOrder.includes('vote-up')?btn('vote-up','Upvote post','↑ Upvote'):''}${!toolbarOrder.includes('vote-down')?btn('vote-down','Downvote post','↓ Downvote'):''}${btn('save',saved.has(p.id)?'Unsave post':'Save post',saved.has(p.id)?'Unsave':'Save')}${btn('post-details','Post and comments','Post & comments')}${btn('external','Open in external browser','Open in external browser')}${btn('go-community','Go to subreddit','Go to '+p.sub.replace(/^r\//,''))}${btn('about-author','About username','About '+p.author)}${btn('mark-unread','Mark unread','Mark unread')}${btn('hide-post','Hide post','Hide')}${btn('report-post','Report post','Report')}${btn('mute-community','Mute community','Mute community')}${btn('share-post','Share post','Share')}${btn('copy-link','Copy post link','Copy link')}${btn('configure-toolbar','Customize toolbar','Customize toolbar')}</div><label><input type="checkbox" id="fail-next" ${failNext?'checked':''}>Simulate next save/vote failure</label><p class="sheet-message" role="status"></p><p class="sheet-warning">Synthetic actions only. No external browser, clipboard, account, report or share operation is triggered.</p>`;
 if(!$('#sheet').open)$('#sheet').showModal();
}
function showDialog(p,mode){
 const activeAction=$('#sheet').open?document.activeElement?.dataset.action:null;
 sheetPost=p;sheetMode=mode;
 $('#sheet-title').textContent=mode==='comments'?'Comments':'Post actions';
 $('#sheet-content').innerHTML=`<p class="sheet-post"><strong>${p.sub}</strong><br>${p.title}</p>${mode==='comments'?`<p class="sheet-warning">Synthetic discussion · Best · same fixture account</p><div class="sheet-comment"><span>u/trailside · 1h · 42 points</span><p>The light makes this feel so peaceful. Thanks for sharing the details.</p></div><div class="sheet-comment"><span>u/weekendreader · 40m · 18 points</span><p>I came for a quick scroll and stayed for the conversation.</p></div>`:`<div class="sheet-actions">${btn('vote-up','Upvote post','↑ Upvote',`aria-pressed="${votes.get(p.id)===1}"`)}${btn('vote-down','Downvote post','↓ Downvote',`aria-pressed="${votes.get(p.id)===-1}"`)}${btn('save',saved.has(p.id)?'Unsave post':'Save post',saved.has(p.id)?'Unsave':'Save',`aria-pressed="${saved.has(p.id)}"`)}${btn('comments','Open comments','◯ Open comments')}</div><label><input type="checkbox" id="fail-next" ${failNext?'checked':''}>Simulate next save/vote failure</label>`}<p class="sheet-message" role="status"></p><p class="sheet-warning">Local state demonstration. No votes, saves or read marks are sent to Reddit.</p>`;
 if(!$('#sheet').open)$('#sheet').showModal();
 if(activeAction)$('#sheet-content').querySelector(`[data-action="${activeAction}"]`)?.focus();
}
function info(title,message){$('#sheet-title').textContent=title;$('#sheet-content').innerHTML=`<p>${message}</p><p class="sheet-warning">Scope demonstration only.</p>`;sheetPost=null;if(!$('#sheet').open)$('#sheet').showModal()}
function destination(title,message){playbackSuspended=true;playKey=null;render();info(title,message)}
function refreshPostSheet(p){const active=document.activeElement?.dataset.action;if(sheetMode==='row-menu')showRowMenu(p);else showDialog(p,sheetMode);if(active)$('#sheet-content').querySelector(`[data-action="${active}"]`)?.focus()}
function mutate(p,action){
 if(pending.has(p.id))return;
 const oldSaved=saved.has(p.id),oldVote=votes.get(p.id)||0,failed=failNext;
 failNext=false;pending.add(p.id);
 const apply=(s,v)=>{s?saved.add(p.id):saved.delete(p.id);votes.set(p.id,v)};
 apply(action==='save'?!oldSaved:oldSaved,action==='save'?oldVote:oldVote===(action==='vote-up'?1:-1)?0:action==='vote-up'?1:-1);
 render();
 if($('#sheet').open&&sheetPost){refreshPostSheet(p);$('.sheet-message').textContent='Updating fixture…'}
 setTimeout(()=>{
  pending.delete(p.id);if(failed)apply(oldSaved,oldVote);render();
  if($('#sheet').open&&sheetPost?.id===p.id){refreshPostSheet(p);$('.sheet-message').textContent=failed?'Could not update. Previous state restored. Try again.':'Updated locally.'}
 },450);
}
function handle(action,p,d,choice){
 if(action==='toggle-controls')setMediaControls(!mediaControlsVisible);
 else if(action==='hide-controls')setMediaControls(false);
 else if(action==='open-post'&&openToolbar===p.id&&!alwaysShowToolbar){openToolbar=null;render()}
 else if(action==='open-post'||action==='post-details'){read.add(p.id);destination('Post & comments',`Existing post-details and comments destination for “${esc(p.title)}”. Its screen design will be reviewed after the feed. No new detail-page layout is proposed here.`)}
 else if(action==='more-row')showRowMenu(p);
 else if(action==='configure-toolbar')configureToolbar();
 else if(action==='toolbar-defaults'){toolbarOrder=[...defaultToolbar];alwaysShowToolbar=false;configureToolbar()}
 else if(action==='toolbar-up'||action==='toolbar-down'){const i=toolbarOrder.indexOf(choice),j=i+(action==='toolbar-up'?-1:1);if(i>=0&&j>=0&&j<toolbarOrder.length){[toolbarOrder[i],toolbarOrder[j]]=[toolbarOrder[j],toolbarOrder[i]];configureToolbar();$('#sheet-content').querySelector(`[data-choice="${choice}"][data-action="${action}"]`)?.focus()}}
 else if(action==='external')destination('Open in external browser','Destination preview: the original outbound link, with the Reddit permalink for a text post. Production should reuse the existing external-open route. This sample does not launch a browser.');
 else if(action==='go-community')destination('Go to subreddit',`Community destination: ${esc(p.sub.replace(/^r\//,''))}.`);
 else if(action==='about-author')destination('About username',`Author destination: ${esc(p.author)}.`);
 else if(action==='mark-unread'){read.delete(p.id);destination('Marked unread','Read state was cleared for this local fixture only.')}
 else if(['hide-post','report-post','mute-community','share-post','copy-link'].includes(action))destination({'hide-post':'Hide post','report-post':'Report post','mute-community':'Mute community','share-post':'Share post','copy-link':'Copy link'}[action],'Preview of the existing upstream action. No account changes, report, clipboard write or sharing occurs in this design study.');
 else if(action==='comments'){read.add(p.id);playbackSuspended=true;playKey=null;render();showDialog(p,'comments')}
 else if(action==='options'){playbackSuspended=true;playKey=null;render();showDialog(p,'options')}
 else if(action==='save'||action.startsWith('vote-'))mutate(p,action);
 else if(action==='open-media'){if(!p.src){read.add(p.id);render();showDialog(p,'comments')}else{settings.surface='media';$('#surface').value='media';setMedia(mediaPosts.indexOf(p))}}
 else if(action==='next'&&zoom===1)setMedia(mediaIndex+1);
 else if(action==='previous'&&zoom===1)setMedia(mediaIndex-1);
 else if(action==='gallery-next'||action==='gallery-prev'){if(zoom===1){pages.set(p.id,Math.max(0,Math.min(1,(pages.get(p.id)||0)+(action==='gallery-next'?1:-1))));playKey=null;render()}}
 else if(action==='exit-media'||action==='home'){playKey=null;zoom=1;settings.surface='feed';$('#surface').value='feed';render()}
 else if(action==='play'){const key=d+':'+p.id;if(isRefined()){manualPaused=playKey===key?key:null;playbackSuspended=false;mediaNotice=''}playKey=playKey===key?null:key;render()}
 else if(action==='mute'){muted=!muted;render()}
 else if(action==='zoom'){zoom=zoom===1?2:1;render()}
 else if(action==='fit'){fitOverride=!(fitOverride===null?d==='c':fitOverride);zoom=1;render()}
 else if(action==='retry'){if(p?.unavailable){info('Retry fixture','This original-media fixture remains unavailable. In the app, retry must keep the current post and offer provider/open externally when already supported.')}else{settings.state='ready';$('#state').value='ready';render()}}
 else if(action==='reveal'){if(p)revealed.add(p.id);settings.state='ready';$('#state').value='ready';render()}
 else if(action==='saved')info('Saved posts',saved.size?posts.filter(x=>saved.has(x.id)).map(x=>esc(x.title)).join('<br><br>'):'No saved fixture posts yet.');
 else if(action==='account')info('Account scope','Fixture account: u/weekendreader. Active Home feed · Best · existing filters. Production must use the current account and upstream preferences.');
 else if(action==='communities')info('Communities','Community navigation is unchanged in the first proposed feed slice.');
 else if(action==='search')info('Search','Search keeps the existing upstream navigation and scope. This study focuses on feed and media presentation.');
}
document.addEventListener('click',e=>{
 const target=e.target.closest('[data-action]');if(!target||target.disabled)return;
 if(!$('#sheet').open)dialogOrigin=focusToken(target);
 const p=posts.find(x=>x.id===target.closest('[data-post]')?.dataset.post)||sheetPost||mediaPosts[mediaIndex];
 handle(target.dataset.action,p,target.closest('[data-direction]')?.dataset.direction||'a',target.dataset.choice);
 if(target.closest('.media-chrome'))scheduleMediaHide();
});
document.addEventListener('change',e=>{
 if(e.target.id==='fail-next')failNext=e.target.checked;
 if(e.target.dataset.toolbarChoice){const id=e.target.dataset.toolbarChoice;toolbarOrder=toolbarOrder.filter(x=>x!==id);if(e.target.checked)toolbarOrder.push(id);configureToolbar();$('#sheet-content').querySelector(`[data-toolbar-choice="${id}"]`)?.focus()}
 if(e.target.id==='always-show'){alwaysShowToolbar=e.target.checked;configureToolbar();$('#always-show').focus()}
});
for(const id of ['review','surface','theme','text','width','state'])$('#'+id).addEventListener('change',e=>{settings[id]=['text','width'].includes(id)?Number(e.target.value):e.target.value;playKey=null;zoom=1;if(id==='surface'||id==='review'){manualPaused=null;playbackSuspended=false;mediaNotice='';openToolbar=null;mediaControlsVisible=false}render()});
$('#close-sheet').addEventListener('click',()=>$('#sheet').close());
$('#sheet').addEventListener('close',()=>restoreFocus(dialogOrigin));
$('#reset').addEventListener('click',()=>{saved.clear();read.clear();revealed.clear();votes.clear();pages.clear();playbackPositions.clear();document.querySelectorAll('[data-scroll]').forEach(e=>e.scrollTop=0);scrollOffsets.clear();failNext=false;fitOverride=null;playKey=null;zoom=1;mediaIndex=0;openToolbar=null;manualPaused=null;playbackSuspended=false;mediaNotice='';mediaControlsVisible=false;mediaSeeking=false;settings.state='ready';$('#state').value='ready';render()});
document.addEventListener('visibilitychange',()=>{if(document.hidden){playbackSuspended=true;playKey=null;render()}});
window.addEventListener('resize',measure);
document.addEventListener('keydown',e=>{
 inputModality='keyboard';clearTimeout(mediaHideTimer);
 if($('#sheet').open)return;
 if(isRefined()&&settings.surface==='media'&&e.key==='Escape'){e.preventDefault();if(zoom>1){zoom=1;render()}else if(mediaControlsVisible)setMediaControls(false);else handle('exit-media',mediaPosts[mediaIndex],'a');return}
 if(e.key==='Escape'&&openToolbar){openToolbar=null;render();return}
 if((e.key==='F10'&&e.shiftKey)||e.key==='ContextMenu'){const row=e.target.closest('[data-longpress]');if(row){e.preventDefault();toggleToolbar(row.dataset.post);return}}
 if(settings.surface!=='media'||(['SELECT','INPUT','BUTTON'].includes(e.target.tagName)&&!e.target.matches('.tap-catcher')))return;const a={ArrowDown:'next',ArrowUp:'previous',ArrowLeft:'gallery-prev',ArrowRight:'gallery-next'}[e.key];if(a){e.preventDefault();handle(a,mediaPosts[mediaIndex],'a')}
});
document.addEventListener('pointerdown',e=>{inputModality='pointer';if(e.target.closest('.immersive')){mediaPointerActive=true;clearTimeout(mediaHideTimer)}});
for(const event of ['pointerup','pointercancel'])document.addEventListener(event,()=>{mediaPointerActive=false;scheduleMediaHide()});
function bindMediaChrome(){
 const media=document.querySelector('.immersive');if(!media)return;
 media.addEventListener('focusin',()=>{if(inputModality==='keyboard'&&!restoringMediaFocus)setMediaControls(true)});
 media.querySelector(':scope>.placeholder')?.addEventListener('click',e=>{if(!e.target.closest('button'))setMediaControls(!mediaControlsVisible)});
 const slider=media.querySelector('.media-seek input'),video=media.querySelector('video');
 if(slider&&video){
  const update=()=>{const duration=Number.isFinite(video.duration)?video.duration:0;if(!mediaSeeking)slider.value=duration?Math.round(video.currentTime/duration*1000):0;slider.setAttribute('aria-valuetext',formatTime(video.currentTime)+' of '+formatTime(duration));media.querySelector('.playback-time').textContent=formatTime(video.currentTime)+' / '+formatTime(duration)};
  for(const event of ['timeupdate','loadedmetadata','durationchange'])video.addEventListener(event,update);
  slider.addEventListener('pointerdown',()=>{mediaSeeking=true;seekWasPlaying=!video.paused;clearTimeout(mediaHideTimer);video.pause()});
  slider.addEventListener('input',()=>{if(Number.isFinite(video.duration))video.currentTime=Number(slider.value)/1000*video.duration;clearTimeout(mediaHideTimer)});
  const finish=()=>{mediaSeeking=false;if(seekWasPlaying){seekWasPlaying=false;video.play().catch(()=>{})}scheduleMediaHide()};
  for(const event of ['change','pointerup','pointercancel','blur'])slider.addEventListener(event,finish);
  update();
 }
}
function toggleToolbar(id){openToolbar=openToolbar===id?null:id;render()}
function bindLongPress(){
 document.querySelectorAll('[data-longpress]').forEach(row=>{
  let timer=null,origin=null;
  const cancel=()=>{clearTimeout(timer);timer=null;origin=null};
  row.addEventListener('pointerdown',e=>{
   if(e.button!==0||!e.isPrimary||e.target.closest('.row-toolbar'))return;
   origin={x:e.clientX,y:e.clientY};timer=setTimeout(()=>{suppressClickUntil=Date.now()+500;toggleToolbar(row.dataset.post)},550);
  });
  row.addEventListener('pointermove',e=>{if(origin&&Math.hypot(e.clientX-origin.x,e.clientY-origin.y)>8)cancel()});
  for(const event of ['pointerup','pointercancel','pointerleave'])row.addEventListener(event,cancel);
  row.addEventListener('contextmenu',e=>{e.preventDefault();cancel();if(Date.now()>suppressClickUntil)toggleToolbar(row.dataset.post)});
 });
}
document.addEventListener('click',e=>{if(Date.now()<suppressClickUntil&&e.target.closest('[data-longpress]')&&!e.target.closest('.row-toolbar')){e.preventDefault();e.stopImmediatePropagation();suppressClickUntil=0}},true);
document.addEventListener('click',e=>{if(Date.now()<suppressMediaClickUntil&&e.target.closest('.immersive .stage')){e.preventDefault();e.stopImmediatePropagation()}},true);
function bindGestures(){
 document.querySelectorAll('[data-gesture]').forEach(el=>{
  let origin=null;
  el.addEventListener('pointerdown',e=>{if(e.target.tagName==='VIDEO'||!e.isPrimary)return;origin={x:e.clientX,y:e.clientY,id:e.pointerId};(e.target.matches('.tap-catcher')?e.target:el).setPointerCapture(e.pointerId)});
  el.addEventListener('pointercancel',()=>origin=null);
  el.addEventListener('pointerup',e=>{if(!origin||origin.id!==e.pointerId)return;const dx=e.clientX-origin.x,dy=e.clientY-origin.y;origin=null;if(Math.max(Math.abs(dx),Math.abs(dy))>=8)suppressMediaClickUntil=Date.now()+350;if(zoom>1)return;if(Math.max(Math.abs(dx),Math.abs(dy))<48)return;const p=mediaPosts[mediaIndex];if(Math.abs(dy)>Math.abs(dx)*1.3)handle(dy<0?'next':'previous',p,el.dataset.gesture);else if(Math.abs(dx)>Math.abs(dy)*1.3&&p.pages)handle(dx<0?'gallery-next':'gallery-prev',p,el.dataset.gesture)});
 });
}
render();
