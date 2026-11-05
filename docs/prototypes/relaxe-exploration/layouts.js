/* Retained-layout study 17. Reuses the scoped feed's actions/media; no Android changes. */
(function(){
'use strict';
const enabled=new URLSearchParams(location.search).get('study')==='17';
const params=new URLSearchParams(location.search),embedded=params.has('layout-embedded');
const names={card:'Large card · Card 1 (default)',card2:'Large card · Card 2',compact:'Compact card',vertical:'Vertical swipe',gallery:'Gallery'};
let mediaDismissEnabled=true;
let kind=Object.hasOwn(names,params.get('layout'))?params.get('layout'):'card';
let doc=null,composition='current',getContext,original=[],ready=false,fitFrame=0,toolbarObserver;
const options={height:'fit',actions:'source',lines:'2',side:'right',columns:'source',gallery:'media',surface:'source',author:'show',flair:'show',age:'show',padding:'source',gap:'source',previewlimit:'320',thumbsize:'64',toolbar:'default',toolbarposition:'bottom',toolbarvisibility:'hidden',swipeaxis:'horizontal',gallerytitle:'hidden',photoframing:'fit',videoframing:'fit'};
const L=id=>document.getElementById(id);
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function action(id,label,content,extra=''){return `<button type="button" data-action="${id}" aria-label="${esc(label)}" ${extra}>${content}</button>`}
const actionIds=['vote-up','vote-down','post-details','external','save','share-post','copy-link','author','subreddit'];
function selectedActions(){return options.toolbar==='default'?(kind==='compact'?['vote-up','vote-down','post-details','external']:['vote-up','vote-down','post-details','save','share-post']):[...new Set(options.toolbar.split(',').filter(id=>actionIds.includes(id)))]}
const solid=path=>`<svg class="foundation-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="${path}"/></svg>`;
function card(post,state){
 if(kind==='compact'||kind==='vertical')return null;
 const T=window.RelaxeStudyTheme,metadata=`<div class="layout-card-meta"><strong>${esc(post.sub.replace(/^r\//,''))}</strong><span class="post-author"> · ${esc(post.author)}</span><span class="post-age"> · ${esc(post.age)}</span></div>`,title=action('open-post','Open post and comments: '+post.title,esc(post.title),'class="post-body layout-card-title"');
 const gated=post.gated&&!state.revealed,warning=gated?'Content hidden':post.unavailable?'Preview unavailable':post.type,src=post.type==='GIF'?'earth-poster.png':post.src;
 const preview=post.src?action('open-media','Open '+post.type.toLowerCase()+': '+post.title,`${!gated&&!post.unavailable&&post.type!=='Video'?`<img src="assets/${esc(src)}" alt="" loading="lazy">`:`<span class="layout-preview-fallback">${gated?'Content hidden':post.unavailable?'Preview unavailable':'▶ Video preview'}</span>`}<span class="layout-media-type">${esc(post.pages?'Gallery · '+post.pages.length+' images':warning)}</span>`,'class="layout-card-preview"'+(kind==='gallery'?' aria-description="Tap to view media. Long press, right click or press Shift+F10 for post details."':'')):'';
 const text=post.type==='Text'&&options.lines!=='0'?`<p class="layout-card-excerpt">${post.fixtureId==='p5'?'A small repair, a replacement seal, and something useful kept out of the bin. What have you repaired lately?':'It was a small act of kindness that made the rest of the day feel lighter.'}</p>`:post.type==='Link'?'<p class="layout-card-link">Article · example.org</p>':'';
 const actionMarkup={
  'vote-up':action('vote-up','Upvote post · '+post.score+' points',T.icon('up')+`<strong class="layout-card-score">${esc(post.score)}</strong>`,`aria-pressed="${state.vote===1}"`),
  'vote-down':action('vote-down','Downvote post',T.icon('down'),`aria-pressed="${state.vote===-1}"`),
  'post-details':action('post-details','Comments — open default post details',T.icon('comments')+`<span>${post.comments}</span>`),
  'save':action('save',state.saved?'Unsave post':'Save post',T.icon('save'),`aria-pressed="${state.saved}"`),
  'share-post':action('share-post','Share post',solid('M18 2a4 4 0 1 1-3.6 5.7l-6.6 3.8a4 4 0 0 1 0 1l6.6 3.8a4 4 0 1 1-1 1.7l-6.6-3.8a4 4 0 1 1 0-4.4l6.6-3.8A4 4 0 0 1 18 2Z')),
  'external':action('external','Open in external browser',solid('M14 2h8v8h-3V7l-9 9-2-2 9-9h-3V2ZM2 5h9v3H5v11h11v-6h3v9H2V5Z')),
  'author':action('author','Open profile · u/'+post.author,'u/'),
  'subreddit':action('subreddit','Open subreddit · '+post.sub,'r/'),
  'copy-link':action('copy-link','Copy link',solid('M8 2h14v16h-3V5H8V2ZM2 6h14v16H2V6Zm3 3v10h8V9H5Z'))
 };
 const footer=`<div class="layout-card-actions" role="group" aria-label="Post actions">${selectedActions().map(id=>actionMarkup[id]).join('')}${action('more-row','More post actions',T.icon('more'))}</div>`;
 const flair=post.flair?`<span class="layout-card-flair">${esc(post.flair)}</span>`:'',status=`<p class="layout-card-feedback" role="status">${state.pending?'Updating…':state.saved?'Saved locally':state.vote===1?'Upvoted locally':state.vote===-1?'Downvoted locally':''}${state.read?' · Read':''}</p>`,more=action('more-row','More post actions',T.icon('more'));
 const actions=options.actions==='more'?`<div class="layout-card-actions layout-more-only">${more}</div>`:footer;
 const information=composition==='titlefirst'?title+metadata:composition==='metadatafirst'?metadata+title:kind==='card2'?title+metadata:metadata+title;
 let content;
 if(kind==='gallery')content=(preview||`<div class="layout-gallery-text">${title}</div>`)+(preview&&options.gallerytitle==='show'?action('open-media','Open media: '+post.title,'<span>'+esc(post.title)+'</span>','class="layout-gallery-caption"'):'')+(preview?action('gallery-details','Open post details: '+post.title,'Post details','class="gallery-details-shortcut"'):'');
 else if(kind==='card2')content=preview+`<div class="layout-card-copy">${information}${flair}${text}</div>`+status;
 else content=`<div class="layout-card-copy">${information}${flair}${text}</div>`+preview+status;
 if(kind!=='gallery')content=options.toolbarposition==='top'?actions+content:content+actions;
 return `<article class="row a layout-card layout-${kind} ${state.read?'read':''}" data-post="${esc(post.id)}" data-card-options="true" ${kind==='gallery'?'data-longpress="true"':''}>${content}</article>`;
}
function galleryControlScope(){for(const id of ['layout-swipeaxis','layout-gallerytitle']){const control=L(id);if(control)control.closest('label').hidden=kind!=='gallery'}}
function refresh(){galleryControlScope();if(!enabled||!doc||!ready)return;const bridge=L('shell-feed')?.contentWindow?.RelaxeFeedStudy;if(bridge){if(kind!=='vertical')bridge.setToolbarFixtures({order:kind==='gallery'||options.actions==='more'&&kind!=='compact'?[]:selectedActions(),alwaysShow:kind==='compact'&&options.toolbarvisibility==='always'});bridge.replacePosts(original.filter(post=>kind!=='gallery'||options.gallery!=='media'||post.src).map(post=>({...post,fixtureId:post.id,id:'card-'+getContext().account+'-'+post.id})));if(kind==='vertical'&&!doc.querySelector('.media'))doc.querySelector('[data-action="open-media"]')?.click()}}
async function attach(frameDoc){if(!enabled)return;ready=false;doc=frameDoc;doc.documentElement.dataset.cardStudy='17';
 await new Promise((resolve,reject)=>{const link=doc.createElement('link');link.rel='stylesheet';link.href='layouts.css?rev=107';link.onload=resolve;link.onerror=reject;doc.head.append(link)});
 const bridge=L('shell-feed').contentWindow.RelaxeFeedStudy;original=bridge.fixturePosts();bridge.renderRow=card;
 bridge.longPress=id=>{if(kind!=='gallery')return false;bridge.openPostDetails(id);return true};
 bridge.mediaFraming=post=>kind==='vertical'?(['Video','GIF'].includes(post?.type)?options.videoframing:options.photoframing):null;
 bridge.mediaGestureMode=()=>kind==='vertical'?'vertical':kind==='gallery'?options.swipeaxis:'preview';
 bridge.mediaDismissEnabled=()=>mediaDismissEnabled;
 bridge.mediaNavigation=()=>kind==='gallery'?{axis:options.swipeaxis}:null;
 bridge.mediaExit=id=>{if(kind!=='gallery')return;const tile=[...doc.querySelectorAll('.layout-gallery')].find(tile=>tile.dataset.post===id);if(tile){fitGalleryTiles();tile.scrollIntoView({block:'nearest',inline:'nearest'});tile.querySelector('[data-action="open-media"],.post-body')?.focus({preventScroll:true})}};
 bridge.visibleToolbar=id=>{const row=[...doc.querySelectorAll('.scroll .row')].find(row=>row.dataset.post===id);return row?[...row.querySelectorAll('.layout-card-actions button,.row-toolbar button')].filter(button=>!button.hidden&&button.dataset.action!=='more-row').map(button=>button.dataset.action):[]};
 bridge.toolbarChanged=state=>{if(kind!=='compact')return;options.toolbar=state.order.join(',');options.toolbarvisibility=state.alwaysShow?'always':'hidden';L('layout-toolbar').value=options.toolbar;L('layout-toolbarvisibility').value=options.toolbarvisibility;parent.postMessage({type:'relaxe-toolbar-state',toolbar:options.toolbar,visibility:options.toolbarvisibility},location.origin)};
 toolbarObserver?.disconnect();toolbarObserver=new ResizeObserver(()=>{fitGalleryTiles();scheduleToolbarFit()});
 new ResizeObserver(()=>{adaptiveColumns(doc);fitGalleryTiles();scheduleToolbarFit()}).observe(doc.documentElement);
 doc.fonts.ready.then(scheduleToolbarFit);
 // Cards keep More. Gallery delegates hold/context/keyboard details entry to the shared handler.
 const openOptions=event=>{if(kind==='gallery')return;const row=event.target.closest('.layout-card');if(!row)return;event.preventDefault();event.stopImmediatePropagation();row.querySelector('[data-action="more-row"]').click()};
 doc.addEventListener('contextmenu',openOptions,true);
 doc.addEventListener('keydown',event=>{if(event.key==='ContextMenu'||event.key==='F10'&&event.shiftKey)openOptions(event)},true);
 if(params.get('settings-feed')==='1'){
  const style=doc.createElement('style');style.textContent='html,body{height:100%;overflow:hidden!important}.phone,.phone.refined,.phone.dark,.phone.refined.dark{height:100dvh!important;min-height:0!important}.feed-filter,.shared-shell-nav{display:none!important}.phone.shared-shell-owner{padding-bottom:0!important}.phone .scroll{padding-bottom:12px!important}';doc.head.append(style);
  // Settings actions announce routes; media entry uses the existing viewer.
  let lastPost=null;doc.addEventListener('click',event=>{const button=event.target.closest('[data-action]');if(!button)return;const row=button.closest('[data-post]');if(row)lastPost=bridge.fixturePosts().find(post=>post.id===row.dataset.post)||lastPost;
   const id=button.dataset.action,labels={'open-post':'Open post and comments','open-media':'Open media','post-details':'Open post and comments','vote-up':'Upvote','vote-down':'Downvote',save:'Save',external:'Open externally','share-post':'Share','copy-link':'Copy link',author:'Open profile',subreddit:'Open subreddit','go-community':'Open subreddit','about-author':'Open profile','mark-unread':'Mark unread','hide-post':'Hide post','report-post':'Report post','mute-community':'Mute subreddit'};
   if(id==='open-media')return;if(!Object.hasOwn(labels,id))return;if(id==='open-post'&&row?.classList.contains('expanded')&&options.toolbarvisibility==='hidden')return;event.preventDefault();event.stopImmediatePropagation();
   const target=['author','about-author'].includes(id)?'u/'+lastPost?.author:['subreddit','go-community'].includes(id)?lastPost?.sub:lastPost?.title||'',text=getContext().account==='guest'&&['vote-up','vote-down','save'].includes(id)?'Sign in to '+labels[id].toLowerCase()+'.':'Preview: '+labels[id]+(target?' · '+target:'')+'. No Reddit action was sent.';
   let feedback=doc.querySelector('#settings-action-feedback');if(!feedback){feedback=doc.createElement('p');feedback.id='settings-action-feedback';feedback.setAttribute('role','status');feedback.style.cssText='padding:10px;font-size:14px;line-height:1.5;overflow-wrap:anywhere;color:var(--fg);background:var(--card)';doc.querySelector('.phone').prepend(feedback)}feedback.textContent=text;
  },true);
 }
 ready=true;L('shell-feed').dataset.layoutReady='true';if(params.get('settings-feed')==='1')parent.postMessage({type:'relaxe-compact-ready'},location.origin);
}
function scheduleToolbarFit(){if(!fitFrame)fitFrame=requestAnimationFrame(()=>{fitFrame=0;fitToolbars()})}
function fitGalleryTiles(){
 if(doc&&kind==='gallery'){
  const grid=doc.querySelector('.scroll');
  if(grid){const style=doc.defaultView.getComputedStyle(grid),unit=parseFloat(style.gridAutoRows)||4,gap=parseFloat(style.rowGap)||0;for(const tile of grid.querySelectorAll('.layout-gallery')){toolbarObserver?.observe(tile);const span='span '+Math.max(1,Math.ceil((tile.getBoundingClientRect().height+gap)/(unit+gap)));if(tile.style.gridRowEnd!==span)tile.style.gridRowEnd=span}}
 }
}
function fitToolbars(){
 if(!doc||!ready)return;
 fitGalleryTiles();
 const toolbars=[...doc.querySelectorAll('.layout-card-actions,.row-toolbar')];
 const counts=[];
 for(const toolbar of toolbars){
  toolbarObserver?.observe(toolbar);
  const buttons=[...toolbar.querySelectorAll('button')],more=buttons.find(button=>button.dataset.action==='more-row');
  if(!more||!toolbar.clientWidth)continue;
  const active=doc.activeElement,style=doc.defaultView.getComputedStyle(toolbar),gap=parseFloat(style.columnGap)||0;
  for(const button of buttons)button.hidden=false;
  const available=toolbar.clientWidth-(parseFloat(style.paddingLeft)||0)-(parseFloat(style.paddingRight)||0);
  let used=more.getBoundingClientRect().width,full=false,count=0;
  for(const button of buttons.filter(button=>button!==more)){
   const width=button.getBoundingClientRect().width;
   if(full||used+gap+width>available+.5){full=true;button.hidden=true;if(button===active)more.focus()}
   else{used+=gap+width;count++}
  }
  counts.push(count);
 }
 if(embedded&&counts.length)parent.postMessage({type:'relaxe-toolbar-capacity',min:Math.min(...counts),max:Math.max(...counts)},location.origin);
}
function adaptiveColumns(frameDoc){
 if(!enabled||!frameDoc?.body)return;
 const width=frameDoc.documentElement.clientWidth,text=+(getContext?.().config.text||1),gap=options.gap==='source'?12:+options.gap;
 const minimum=320*Math.max(1,text*.75);
 const capacity=kind==='gallery'?2:width<600||['compact','vertical'].includes(kind)?1:Math.max(1,Math.min(2,Math.floor((width-16+gap)/(minimum+gap))));
 const requested=options.columns==='source'?(kind==='gallery'?2:1):+options.columns,effective=kind==='gallery'?Math.max(2,Math.min(requested,capacity)):Math.min(requested,capacity);
 frameDoc.documentElement.style.setProperty('--layout-columns',effective);
 frameDoc.documentElement.dataset.effectiveColumns=effective;
 const control=L('layout-columns');if(control){control.disabled=capacity<2;control.querySelector('option[value="1"]').disabled=kind==='gallery'}
 if(embedded)parent.postMessage({type:'relaxe-layout-capacity',capacity,effective,width},location.origin);
}
function decorate(frameDoc){
 if(!enabled)return;
 if(kind==='gallery')for(const [id,label]of [['previous',options.swipeaxis==='horizontal'?'← Previous':'↑ Previous'],['next',options.swipeaxis==='horizontal'?'Next →':'Next ↓']]){const button=frameDoc.querySelector('.page-nav [data-action="'+id+'"]');if(button)button.textContent=label}
 const label=frameDoc.querySelector('.feed-filter span:last-child');if(label)label.textContent=names[kind];
 const el=frameDoc.documentElement;
 Object.assign(el.dataset,{layoutKind:kind,previewHeight:options.height,thumbnailSide:options.side,layoutSurface:options.surface==='source'&&['card','card2','compact'].includes(kind)?'filled':options.surface,layoutAuthor:options.author,layoutFlair:options.flair,layoutAge:options.age,informationOrder:composition,toolbarPosition:options.toolbarposition});
 adaptiveColumns(frameDoc);
 el.style.setProperty('--layout-text-lines',options.lines==='all'?100:options.lines);
 el.style.setProperty('--layout-padding',(options.padding==='source'?(kind==='compact'?8:12):options.padding)+'px');
 el.style.setProperty('--layout-gap',(options.gap==='source'?(kind==='compact'?6:12):options.gap)+'px');
 el.style.setProperty('--layout-preview-limit',options.previewlimit+'px');
 el.style.setProperty('--layout-thumb-size',options.thumbsize+'px');
 toolbarObserver?.disconnect();fitGalleryTiles();scheduleToolbarFit();
 const error=frameDoc.querySelector('.scroll .placeholder');
 if(error&&frameDoc.getElementById('state').value==='error'){error.querySelector('h3').textContent='Couldn’t load posts';error.querySelector('p').textContent='Initial-load failure specimen. Your comparison settings are kept.'}
}
function route(next){if(!enabled)return;if(L('layout-fixtures'))L('layout-fixtures').hidden=next!=='home';if(next==='home')refresh()}
function initialize(context){
 if(!enabled)return;getContext=context;
 document.title='Relaxe · Layout families and customization';
 document.querySelector('.topline>span').textContent='LAYOUT FAMILIES / 17';
 document.querySelector('.badge').textContent='Four families selected · settings proposal · revision 40';
 document.querySelector('.intro h1').innerHTML='Choose a layout.<br>Make it yours.';
 document.querySelector('.intro>p').textContent='Large card, Compact card, Vertical swipe and Gallery. Card 1 and Card 2 are retained Large card compositions. Customize elements and their positions within a family.';
 document.querySelector('.nav-notes').innerHTML='<p class="eyebrow">FOUR FAMILIES SELECTED / 17</p><h2>Fewer layouts.<br>More control.</h2><p>Large card defaults to Card 1 (text above preview); Card 2 remains selectable and customizable. Compact card uses the accepted refined A feed and hidden customizable actions. Compact 2 is rejected; Card 3 is not a separate proposed layout.</p><p>Surface, metadata order, author/flair/time visibility and thumbnail placement are the first settings experiments. Large and Compact cards use Filled by default; Outlined and Flat remain available. Large card previews default to Fit whole media; Square crop remains selectable. Exact editor organization and other defaults remain open. Use existing account/context preferences; native migration is separate work.</p><p>Vertical swipe remains vertical; Horizontal is limited to Gallery entry. It reuses the accepted viewer, starting with hidden controls. Gallery defaults to visual media only, with All posts selectable, and keeps at least two columns with whole-media previews scaled to tile width. Tapping a visual tile opens a media-first viewer with Comments. Horizontal swipes step through album images before the next visual post; Vertical is selectable. Other tiles open details. Back keeps the current tile visible. Inline album paging and feed autoplay are not simulated.</p><p><a href="layouts-overview.html?rev=40">Four-family comparison and settings preview</a> · <a href="../../DESIGN.md">Decisions and research</a></p>';
 if(embedded)document.documentElement.dataset.layoutEmbedded='true';if(embedded&&params.get('settings-feed')==='1')document.documentElement.dataset.settingsFeed='true';
 const select=(id,label,choices)=>`<label>${label}<select id="${id}">${choices.map(([value,text])=>`<option value="${value}">${text}</option>`).join('')}</select></label>`;
 const box=document.createElement('div');box.id='layout-fixtures';box.className='controls layout-fixtures';
 box.innerHTML=select('layout-kind','Layout / composition',Object.entries(names))+select('layout-surface','Card surface',[['source','Composition default'],['filled','Filled'],['outlined','Outlined'],['plain','Flat rows']])+select('layout-composition','Title / metadata order',[['current','Composition default'],['titlefirst','Title first'],['metadatafirst','Metadata first']])+select('layout-height','Preview framing',[['fit','Fit whole media'],['square','Square crop']])+select('layout-actions','Large card actions',[['source','Direct actions'],['more','More only']])+select('layout-lines','Large card text excerpts',[['2','2 lines'],['4','4 lines'],['all','Full fixture text'],['0','Hidden']])+select('layout-side','Compact thumbnail',[['left','Left'],['right','Right'],['hidden','Hidden']])+select('layout-author','Author',[['show','Show'],['hide','Hide']])+select('layout-flair','Post flair',[['show','Show'],['hide','Hide']])+select('layout-age','Post age',[['show','Show'],['hide','Hide']])+select('layout-columns','Feed columns',[['source','Default · Gallery 2'],['1','1 column'],['2','2 columns']])+select('layout-swipeaxis','Gallery viewer swipe direction',[['horizontal','Horizontal · default'],['vertical','Vertical']])+select('layout-gallery','Gallery content',[['all','All fixture posts'],['media','Visual media only']])+select('layout-gallerytitle','Gallery post titles',[['hidden','Media only'],['show','Short title below media']])+select('layout-padding','Card padding',[['source','Family default'],['8','Tight · 8'],['12','Standard · 12'],['16','Roomy · 16']])+select('layout-gap','Gap between posts',[['source','Family default'],['0','None'],['4','Small · 4'],['8','Medium · 8'],['16','Large · 16']])+select('layout-previewlimit','Preview height limit',[['320','Standard · 320'],['200','Short · 200'],['440','Tall · 440']])+select('layout-thumbsize','Thumbnail size',[['64','Standard · 64'],['48','Small · 48'],['80','Medium · 80'],['112','Large · 112']])+select('layout-toolbarposition','Toolbar position',[['bottom','Below post content'],['top','Above post content']])+select('layout-toolbarvisibility','Compact toolbar entry',[['hidden','Reveal with long press'],['always','Always show']])+select('layout-photoframing','Vertical photos and albums',[['fit','Fit whole media'],['fill','Fill viewport']])+select('layout-videoframing','Vertical videos and GIFs',[['fit','Fit whole media'],['fill','Fill viewport']])+select('layout-fixture','Feed fixture',[['ready','Normal'],['loading','Loading'],['empty','Empty'],['error','Failure']])+select('layout-direction','Layout direction',[['ltr','Left to right'],['rtl','Right to left']]);
 box.insertAdjacentHTML('beforeend',select('media-dismiss-enabled','Swipe-down close preference · fixture',[['on','Enabled'],['off','Disabled']]));
 const toolbarValue=document.createElement('input');toolbarValue.type='hidden';toolbarValue.id='layout-toolbar';toolbarValue.value='default';box.append(toolbarValue);document.querySelector('.controls').after(box);L('layout-kind').value=kind;for(const key of Object.keys(options))L('layout-'+key).value=options[key];galleryControlScope();
 L('media-dismiss-enabled').addEventListener('change',event=>{mediaDismissEnabled=event.target.value==='on'});
 L('layout-kind').addEventListener('change',event=>{kind=event.target.value;const surface=doc?.getElementById('surface');if(surface){surface.value='feed';surface.dispatchEvent(new Event('change',{bubbles:true}))}refresh()});
 for(const key of Object.keys(options))L('layout-'+key).addEventListener('change',event=>{options[key]=event.target.value;if(['photoframing','videoframing'].includes(key))L('shell-feed')?.contentWindow?.RelaxeFeedStudy?.resetMediaFraming();refresh()});
 L('layout-composition').addEventListener('change',event=>{composition=event.target.value;refresh()});
 L('layout-fixture').addEventListener('change',event=>{const control=doc?.getElementById('state');if(control){control.value=event.target.value;control.dispatchEvent(new Event('change',{bubbles:true}))}});
 L('layout-direction').addEventListener('change',event=>{L('nav-phone').dir=event.target.value;if(doc)doc.documentElement.dir=event.target.value});
}
window.addEventListener('message',event=>{if(!enabled||!embedded||event.origin!==location.origin||event.source!==parent||event.data?.type!=='relaxe-layout-comparison')return;for(const [id,value]of Object.entries(event.data.values||{})){const select=L(id);if(id==='layout-toolbar'&&typeof value==='string'&&(value==='default'||value.split(',').filter(Boolean).every(id=>actionIds.includes(id)))){options.toolbar=value;select.value=value;refresh();continue}if(select?.tagName==='SELECT'&&[...select.options].some(option=>option.value===value)){select.value=value;select.dispatchEvent(new Event('change',{bubbles:true}))}}});
window.addEventListener('message',event=>{if(params.get('settings-feed')==='1'&&event.origin===location.origin&&event.source===L('shell-feed')?.contentWindow&&event.data?.type==='relaxe-shell-scroll')parent.postMessage(event.data,location.origin)});
window.RelaxeLayouts={initialize,attach,refresh,route,decorate};
})();
