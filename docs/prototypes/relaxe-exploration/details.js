/* Standalone, synthetic post-details study. No Reddit API or persistent account data. */
const D = s => document.querySelector(s);
const escapeHTML = v => String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const actionButton=(action,label,text,extra='')=>`<button type="button" data-action="${action}" aria-label="${escapeHTML(label)}" ${extra}>${text}</button>`;
const detailPosts={
 p1:{title:'The last light on the Dolomites after a day of rain',community:'EarthPorn',author:'ridgewalker',flair:'Photography',score:'2.4k',count:186,age:'2h',type:'Photo',files:['mountain.jpg'],body:'<p>We waited through a grey afternoon for a few minutes of light. The clouds opened just as we were packing up.</p>'},
 p2:{title:'Two trails, one weekend: from a forest floor to the high peaks',community:'hiking',author:'mossandmiles',flair:'Trip report',score:'841',count:64,age:'3h',type:'Gallery',files:['forest.jpg','mountain.jpg'],body:'<p>A forest walk on Saturday, then a slow climb above the clouds on Sunday. Two very different ways to spend the weekend.</p>'},
 p3:{title:'A quiet moment with the flowers in our community garden',community:'gardening',author:'smallplot',score:'312',count:27,age:'4h',type:'Video',files:['garden.mp4'],body:'<p>A little movement in the garden before everyone arrived. The sound is off in this sample.</p>'},
 p4:{title:'Watching Earth turn never gets old',community:'space',author:'orbitalnotes',flair:'Visualization',score:'1.8k',count:92,age:'5h',type:'GIF',files:['earth.gif'],body:'<p>A rotating Earth visualization. The changing outline is unexpectedly calming.</p>'},
 p5:{title:'What did you repair this month instead of replacing? My ten-year-old kettle lives to boil another day.',community:'BuyItForLife',author:'repairfirst',flair:'Discussion',score:'527',count:143,age:'5h',type:'Text',files:[],body:'<p>The lid hinge failed, but the rest of the kettle was still working. A replacement clip and a patient repair-café volunteer gave it another life.</p><p>It was a small fix, but finishing it felt surprisingly good. I wrote down <a href="#repair-notes" data-action="link-preview">what I learned</a> so I could find it again.</p><p><strong>What small repair are you proud of this month?</strong> Photos, little victories and lessons learned are all welcome.</p>'}
};
const preferences={post:'p1',presentation:'full',actions:'hold',theme:'light',text:1,width:390,state:'ready'};
const discussions=new Map(),viewPositions=new Map(),drafts=new Map();
let composerTarget=null,composerOpen=false,composerError='',sending=false,notice='',failNext=false,dialogOrigin=null,skipClickUntil=0;
let requestEpoch=0;
function fixtureComments(post){
 const p=detailPosts[post],repair=post==='p5',photo=['p1','p2'].includes(post);
 const topics=repair?[
  'I love a small repair. Was the replacement part easy to find?',
  'The manufacturer still listed it. The repair café helped me work out which part I needed.',
  'I did the same with a chair this month. Replacing one loose fitting made it useful again.',
  'That is exactly the sort of fix I hoped to hear about. Small things add up.',
  'The best part is learning enough to notice the next thing you can fix.',
  'And writing down the part number before forgetting it!',
  'Future me is very grateful for a labelled envelope of spare parts.'
 ]:photo?[
  'Beautiful light. Which trail did you take, and was it busy after the rain?',
  'We followed the lower loop and waited near the ridge. Almost everyone had headed back by then.',
  'That sounds like the perfect way to end a wet day. Was the path still muddy?',
  'The sheltered sections were wet, but the open stretch was much better.',
  'Thanks for adding the trail conditions. That context is as useful as the photo.',
  'I keep a tiny trip notebook for exactly this reason.',
  'A dated note is so much better than trying to remember which weekend it was.'
 ]:[
  p.type==='Video'?'This is such a peaceful little clip. How long has the garden been here?':'There is something calming about watching a familiar thing move slowly.',
  p.type==='Video'?'A few years now. People take turns looking after the beds.':'The simple loop is part of why I wanted to share it.',
  'A lovely thing to come across during a quick break.',
  'Glad it gave you a quiet moment.',
  'The context in the comments makes it even better.',
  'I like these small conversations.',
  'Same here. A good reminder to slow down.'
 ];
 return [
  {id:'c1',parent:null,author:repair?'repaircafe':'trailplanner',score:62,age:'1h',body:`<p>${topics[0]}</p>`},
  {id:'c2',parent:'c1',author:p.author,score:34,age:'1h',op:true,body:`<p>${topics[1]}</p>`},
  {id:'c3',parent:'c1',author:repair?'fixingthings':'weekendwalker',score:21,age:'55m',body:`<p>${topics[2]}</p>`},
  {id:'c4',parent:'c3',author:p.author,score:15,age:'48m',op:true,body:`<p>${topics[3]}</p>`},
  {id:'c5',parent:'c4',author:'smallnotes',score:8,age:'42m',edited:true,body:`<p>${topics[4]}</p><p>${actionButton('spoiler','Reveal spoiler note','Reveal note','class="spoiler"')}</p>`},
  {id:'c6',parent:'c5',author:'pocketnotebook',score:5,age:'35m',body:`<p>${topics[5]}</p>`},
  {id:'c7',parent:'c6',author:'slowweekends',score:3,age:'28m',body:`<p>${topics[6]}</p>`},
  {id:'c8',parent:null,author:'ordinarygood',score:87,age:'50m',body:`<blockquote>A little patience can change the whole day.</blockquote><p>This made me smile. There is a <a href="#reference" data-action="link-preview">related discussion</a> worth coming back to.</p>`},
  {id:'c9',parent:null,author:'[deleted]',score:null,age:'45m',deleted:true,body:'<p>[removed]</p>'},
  {id:'c10',parent:null,author:'mod_team',score:12,age:'20m',mod:true,locked:true,body:'<p>Please keep personal details out of the thread and be considerate when sharing locations or contact information.</p>'}
 ];
}
function discussion(){
 if(!discussions.has(preferences.post))discussions.set(preferences.post,{comments:fixtureComments(preferences.post),collapsed:new Set(),tool:null,votes:new Map(),saved:new Set(),spoilers:new Set(),pending:new Set(),actionErrors:new Map(),sort:'Best',more:'available',page:0,postExpanded:null,postSaved:false,postVote:0,postPending:false});
 return discussions.get(preferences.post);
}
function blockedReply(c){return sending||['locked','archived','guest'].includes(preferences.state)||Boolean(c?.locked)}
function blockedVote(c){return ['archived','guest'].includes(preferences.state)}
function commentDepth(c,d=discussion()){let depth=0,parent=c.parent;while(parent){depth++;parent=d.comments.find(x=>x.id===parent)?.parent}return depth}
function childrenOf(id,d=discussion()){return d.comments.filter(x=>x.parent===id)}
function descendantCount(id,d=discussion()){return childrenOf(id,d).reduce((n,c)=>n+1+descendantCount(c.id,d),0)}
function activeFocus(){const e=document.activeElement;if(e?.id==='reply-text')return{textarea:true,start:e.selectionStart,end:e.selectionEnd};return e?.dataset?.action?{action:e.dataset.action,id:e.closest('[data-comment]')?.dataset.comment}:null}
function restoreFocus(token){if(!token)return;if(token.textarea){const field=D('#reply-text');field?.focus({preventScroll:true});field?.setSelectionRange(token.start,token.end);return}const root=token.id?D(`[data-comment="${token.id}"]`):D('#detail-phone');root?.querySelector(`[data-action="${token.action}"]`)?.focus({preventScroll:true})}
function draftKey(){return preferences.post+':weekendreader:'+(composerTarget||'post')}
function postMedia(p,d){
 if(!p.files.length)return '';
 const file=p.files[d.page];
 if(p.type==='Video')return `<div class="post-media"><video controls muted playsinline preload="none" src="assets/${file}" aria-label="Flower video sample"></video></div>`;
 const image=p.type==='GIF'?'earth-poster.png':file;
 return `<div class="post-media">${actionButton('open-image',p.type==='GIF'?'Play GIF preview':'Open full media',`<img src="assets/${image}" alt="${p.type==='GIF'?'Earth visualization':file==='forest.jpg'?'Sunlight through a forest':'Mountain peaks above a sea of clouds'}">`)}${p.files.length>1?`<div class="gallery-tools">${actionButton('gallery-back','Previous image','←',d.page===0?'disabled':'')}<span>${d.page+1} / ${p.files.length}</span>${actionButton('gallery-forward','Next image','→',d.page===p.files.length-1?'disabled':'')}</div>`:''}</div>`;
}
function postCard(){
 const p=detailPosts[preferences.post],d=discussion(),expanded=d.postExpanded===null?preferences.presentation==='full':d.postExpanded;
 if(!expanded)return `<section class="detail-post-card"><div class="post-summary">${p.files.length&&p.type!=='Video'?`<img src="assets/${p.type==='GIF'?'earth-poster.png':p.files[d.page]}" alt="">`:''}${actionButton('toggle-post','Expand full post',`<strong>${p.title}</strong><span class="meta">${p.community} · ${p.author} · ${p.count} comments</span>`)}</div>${actionButton('toggle-post','Show full post','Show full post ↓','class="post-toggle"')}</section>`;
 return `<article class="detail-post-card"><div class="post-heading"><h1>${p.title}</h1><div class="meta"><strong>${p.community}</strong> · ${p.author}${p.flair?` · <span class="flair">${p.flair}</span>`:''}</div><div class="post-stats"><strong>${p.score} points</strong> · ${p.count} comments · ${p.age}${d.postSaved?' · Saved':''}</div></div>${postMedia(p,d)}<div class="post-copy">${p.body}</div><div class="post-actions">${actionButton('post-up','Upvote post','↑ '+p.score,`aria-pressed="${d.postVote===1}" ${blockedVote()||d.postPending?'disabled':''}`)}${actionButton('post-down','Downvote post','↓',`aria-pressed="${d.postVote===-1}" ${blockedVote()||d.postPending?'disabled':''}`)}${actionButton('jump-comments','Jump to comments','◯ '+p.count)}${actionButton('post-reply','Reply to main post','Reply',blockedReply()?'disabled':'')}${actionButton('post-save',d.postSaved?'Unsave post':'Save post',d.postSaved?'Saved':'Save',d.postPending?'disabled':'')}${actionButton('post-more','More post actions','⋮')}</div>${actionButton('toggle-post','Collapse post to summary','Collapse post ↑','class="post-toggle"')}</article>`;
}
function commentToolbar(c){
 const d=discussion(),disabled=d.pending.has(c.id);
 return `<div class="comment-toolbar" role="group" aria-label="Comment actions">${actionButton('comment-up','Upvote comment','↑',`aria-pressed="${d.votes.get(c.id)===1}" ${blockedVote(c)||disabled?'disabled':''}`)}${actionButton('comment-down','Downvote comment','↓',`aria-pressed="${d.votes.get(c.id)===-1}" ${blockedVote(c)||disabled?'disabled':''}`)}${actionButton('reply','Reply to '+c.author,'Reply',blockedReply(c)?'disabled':'')}${actionButton('comment-save',d.saved.has(c.id)?'Unsave comment':'Save comment',d.saved.has(c.id)?'Saved':'Save',disabled?'disabled':'')}${actionButton('comment-more','More comment actions','⋮')}</div>`;
}
function renderComment(c){
 const d=discussion(),depth=commentDepth(c),collapsed=d.collapsed.has(c.id),descendants=descendantCount(c.id),showToolbar=preferences.actions==='always'||d.tool===c.id;
 const parent=d.comments.find(x=>x.id===c.parent),context=parent?`Reply to ${parent.author} · level ${depth+1}`:'Top-level comment';
 const body=d.spoilers.has(c.id)?c.body.replace(/Reveal note/,'The route or repair note is now visible.'):c.body;
 return `<article class="comment" id="detail-${c.id}" data-comment="${c.id}" data-depth="${depth}" style="--indent:${Math.min(depth,4)*10}px" aria-label="${escapeHTML(context)} by ${escapeHTML(c.author)}"><header class="comment-header"><div class="comment-heading">${actionButton('author','About '+c.author,`${escapeHTML(c.author)}${c.op?'<span class="author-badge">OP</span>':''}${c.mod?'<span class="author-badge">MOD</span>':''}`,`class="comment-author" ${c.deleted?'disabled':''}`)}<div class="comment-info"><strong>${c.score===null?'Score hidden':c.score+' points'}</strong> · ${c.age}${c.edited?' · edited':''}${c.locked?' · locked':''}</div></div>${actionButton('collapse',(collapsed?'Expand':'Collapse')+' comment branch',collapsed?'+':'−',`class="collapse-thread" aria-expanded="${!collapsed}"`)}</header>${parent?`<p class="comment-context">${escapeHTML(context)}</p>`:''}${collapsed?`<p class="collapsed-note">Comment hidden${descendants?' · '+descendants+' replies in this branch':''}</p>`:`<div class="comment-copy" data-hold="${c.id}" tabindex="0" aria-label="Comment text; long press or Shift+F10 for actions">${body}</div>${showToolbar?commentToolbar(c):''}<p class="comment-state" role="status">${d.pending.has(c.id)?'Updating…':d.actionErrors.get(c.id)|| (d.saved.has(c.id)?'Saved locally':d.votes.get(c.id)?(d.votes.get(c.id)===1?'Upvoted locally':'Downvoted locally'):'')}</p>`}</article>`+(collapsed?'':childrenOf(c.id).map(renderComment).join(''));
}
function commentsContent(){
 const d=discussion(),state=preferences.state;
 if(state==='initial-loading')return '<div role="status" aria-label="Loading comments">'+Array(3).fill('<div class="comment-loading"></div>').join('')+'</div>';
 if(state==='initial-error')return `<div class="thread-banner error" role="status">The post is available, but comments could not load. ${actionButton('retry-comments','Retry comments','Retry')}</div>`;
 if(state==='empty')return '<div class="thread-banner">No comments yet. Start the conversation when you are ready.</div>';
 let roots=d.comments.filter(x=>!x.parent);
 if(d.sort==='Top')roots=[...roots].sort((a,b)=>(b.score||0)-(a.score||0));
 if(d.sort==='New')roots=[...roots].reverse();
 const banner=state==='refreshing'?'<div class="thread-banner" role="status">Refreshing comments… current discussion stays visible.</div>':state==='recovery'?`<div class="thread-banner" role="status">Recovered 2 of 4 comments before the service stopped. This is a partial result. ${actionButton('recovery','Recovery details','Details')}</div>`:['locked','archived','guest'].includes(state)?`<div class="thread-banner">${{locked:'This post is locked. Voting and saving remain available; replies are closed.',archived:'This post is archived. Voting and replying are unavailable.',guest:'Browsing as guest. Sign in to vote or reply.'}[state]}</div>`:'';
 const more=d.more==='loaded'?'':`<button type="button" class="more-replies" data-action="load-more" ${d.more==='loading'?'disabled':''}>${d.more==='loading'?'Loading more comments…':d.more==='failed'||state==='more-error'?'More comments could not load · Retry':'Load 2 more comments'}</button>`;
 return banner+roots.map(c=>`<section class="thread" data-root="${c.id}">${renderComment(c)}</section>`).join('')+more;
}
function replyArea(){
 const d=discussion(),target=d.comments.find(c=>c.id===composerTarget);
 if(!composerOpen){const hasDraft=[...drafts.entries()].some(([key,text])=>key.startsWith(preferences.post+':')&&text.trim());return `<div class="reply-entry">${actionButton('new-reply','Write a comment',hasDraft?'Continue a local draft…':'Write a comment…',blockedReply()?'disabled':'')}${actionButton('next-thread','Next top-level comment','↓ Next thread','class="next-thread"')}</div>`}
 return `<section class="reply-composer"><div class="composer-head"><span>Replying to <strong>${target?escapeHTML(target.author):'the post'}</strong> · weekendreader</span>${actionButton('close-composer','Close editor and keep draft','✕')}</div><label class="seek-label" for="reply-text">Your reply</label><textarea id="reply-text" placeholder="Write your reply…" ${sending?'disabled':''}>${escapeHTML(drafts.get(draftKey())||'')}</textarea>${composerError?`<p class="composer-error" role="alert">${composerError}</p>`:''}<div class="composer-tools"><span>Local draft only</span>${actionButton('preview-reply','Preview reply','Preview')}${actionButton('send-reply','Send fixture reply',sending?'Sending…':'Send',sending||blockedReply(target)||!(drafts.get(draftKey())||'').trim()?'disabled':'')}</div></section>`;
}
function renderDetails(){
 const old=D('.detail-scroll'),focus=activeFocus();if(old)viewPositions.set(old.dataset.post,old.scrollTop);
 const oldVideo=D('#detail-phone video'),playback=oldVideo?{time:oldVideo.currentTime,playing:!oldVideo.paused,post:old?.dataset.post}:null;oldVideo?.pause();
 const d=discussion(),p=detailPosts[preferences.post],height={360:800,390:844,600:960}[preferences.width];
 const phone=D('#detail-phone');phone.className=`phone detail-phone ${preferences.theme} ${preferences.text>1?'large':''}`;
 phone.style.cssText=`--w:${preferences.width}px;--h:${height}px;--scale:${preferences.text}`;
 phone.closest('.study').style.setProperty('--w',preferences.width+'px');
 phone.innerHTML=`<div class="statusbar" aria-hidden="true"><span>9:41</span><span>▰ ▪ 92%</span></div><header class="appbar">${actionButton('back','Back','←')}<span class="heading">Post</span>${actionButton('jump-comments','Jump to comments','↓ Comments','class="jump-comments"')}${actionButton('post-more','Post options','⋮')}</header><section class="detail-scroll" data-post="${preferences.post}" aria-label="Post and comments">${postCard()}<header class="comments-strip" id="comments-start"><h2>${p.count} comments</h2><label><span class="seek-label">Sort comments</span><select id="comment-sort" aria-label="Sort comments">${['Best','Top','New'].map(v=>`<option ${d.sort===v?'selected':''}>${v}</option>`).join('')}</select></label><span class="account-context">${preferences.state==='guest'?'Guest · sign in to reply':'Viewing as weekendreader'}</span></header>${commentsContent()}</section><footer class="detail-bottom">${replyArea()}<div class="detail-status" role="status">${notice}</div></footer>`;
 D('.detail-scroll').scrollTop=viewPositions.get(preferences.post)||0;restoreFocus(focus);bindHolds();
 const newVideo=D('#detail-phone video');if(newVideo&&playback?.post===preferences.post){newVideo.addEventListener('loadedmetadata',()=>{if(playback.time<newVideo.duration)newVideo.currentTime=playback.time;if(playback.playing&&!D('#detail-dialog').open)newVideo.play().catch(()=>{})},{once:true});if(playback.playing)newVideo.load()}
 D('#detail-measurement').textContent=`${preferences.width} × ${height} · text ${preferences.text*100}% · ${preferences.presentation==='full'?'Full post first':'Summary comparison'} · actions ${preferences.actions==='hold'?'on long press':'visible'}`;
}
function scrollToElement(element){const scroll=D('.detail-scroll');if(!element)return;const offset=element.getBoundingClientRect().top-scroll.getBoundingClientRect().top;scroll.scrollTop+=offset-(element.id==='comments-start'?0:D('.comments-strip').getBoundingClientRect().height+6)}
function openDialog(title,body){dialogOrigin=activeFocus();D('#detail-phone video')?.pause();D('#detail-dialog-title').textContent=title;D('#detail-dialog-content').innerHTML=body;if(!D('#detail-dialog').open)D('#detail-dialog').showModal()}
function actionResult(c,action){
 const d=discussion(),epoch=requestEpoch;if(d.pending.has(c.id))return;
 const oldVote=d.votes.get(c.id)||0,oldSaved=d.saved.has(c.id),failed=failNext;failNext=false;D('#detail-failure').checked=false;
 if(action==='comment-save')oldSaved?d.saved.delete(c.id):d.saved.add(c.id);else{const v=action==='comment-up'?1:-1;d.votes.set(c.id,oldVote===v?0:v)}
 d.pending.add(c.id);d.actionErrors.delete(c.id);renderDetails();
 setTimeout(()=>{if(epoch!==requestEpoch)return;d.pending.delete(c.id);if(failed){d.votes.set(c.id,oldVote);oldSaved?d.saved.add(c.id):d.saved.delete(c.id);d.actionErrors.set(c.id,'Could not update. Previous state restored. Try again.')}if(d===discussion())renderDetails()},450);
}
function beginReply(id=null){const d=discussion(),c=d.comments.find(x=>x.id===id);if(blockedReply(c))return;composerTarget=id;composerOpen=true;composerError='';renderDetails();D('#reply-text').focus({preventScroll:true})}
function sendReply(){
 const d=discussion(),post=preferences.post,key=draftKey(),value=(drafts.get(key)||'').trim(),target=composerTarget,epoch=requestEpoch;
 if(!value||blockedReply(d.comments.find(x=>x.id===target)))return;
 const failed=failNext;failNext=false;D('#detail-failure').checked=false;sending=true;composerError='';renderDetails();
 setTimeout(()=>{if(epoch!==requestEpoch)return;sending=false;if(failed){composerError='Could not send. Your draft is kept; try again.';if(preferences.post===post)renderDetails();return}
 const id='local-'+Date.now();d.comments.push({id,parent:target,author:'weekendreader',score:1,age:'now',body:'<p>'+escapeHTML(value).replace(/\n/g,'<br>')+'</p>'});drafts.delete(key);if(target){let current=target;while(current){d.collapsed.delete(current);current=d.comments.find(x=>x.id===current)?.parent}}composerOpen=false;notice='Reply added to the local fixture. Nothing was posted to Reddit.';if(preferences.post===post){renderDetails();scrollToElement(D('#detail-'+id))}},500);
}
function handleDetail(action,id){
 const d=discussion(),p=detailPosts[preferences.post],c=d.comments.find(x=>x.id===id);
 if(action==='collapse'){d.collapsed.has(id)?d.collapsed.delete(id):d.collapsed.add(id);renderDetails();scrollToElement(D('#detail-'+id));D(`#detail-${id} [data-action="collapse"]`)?.focus({preventScroll:true})}
 else if(action==='toggle-post'){d.postExpanded=!(d.postExpanded===null?preferences.presentation==='full':d.postExpanded);renderDetails()}
 else if(action==='jump-comments')scrollToElement(D('#comments-start'));
 else if(action==='reply')beginReply(id);
 else if(action==='post-reply')beginReply(null);
 else if(action==='new-reply'){
  const entry=[...drafts.entries()].find(([key,text])=>key.startsWith(preferences.post+':')&&text.trim());if(entry){const target=entry[0].split(':').pop();beginReply(target==='post'?null:target)}else beginReply();
 }
 else if(action==='close-composer'){composerOpen=false;composerError='';notice='Draft kept locally.';renderDetails()}
 else if(action==='send-reply')sendReply();
 else if(action==='preview-reply')openDialog('Reply preview','<div class="link-preview">'+escapeHTML(drafts.get(draftKey())||'').replace(/\n/g,'<br>')+'</div>');
 else if(['comment-up','comment-down','comment-save'].includes(action))actionResult(c,action);
 else if(action==='comment-more')openDialog('Comment options',`<p class="sheet-post">${escapeHTML(c.author)}</p><div class="sheet-actions">${actionButton('reply','Reply to comment','Reply',blockedReply(c)?'disabled':'')}${actionButton('comment-save',d.saved.has(c.id)?'Unsave comment':'Save comment',d.saved.has(c.id)?'Unsave':'Save')}${actionButton('link-preview','Copy comment link preview','Copy link')}${actionButton('link-preview','Report comment preview','Report')}</div><p class="sheet-warning">Local destination previews. No report, clipboard or account operation occurs.</p>`);
 else if(action==='author')openDialog('Author information',`<p class="link-preview">Existing profile destination for ${escapeHTML(c.author)}.</p>`);
 else if(action==='spoiler'){d.spoilers.has(id)?d.spoilers.delete(id):d.spoilers.add(id);renderDetails()}
 else if(action==='link-preview')openDialog('Link destination','<p class="link-preview">The link remains a distinct target. Opening it does not collapse the comment or discard your reading position. External navigation is only previewed here.</p>');
 else if(action==='post-more')openDialog('Post options',`<p class="sheet-post">${p.title}</p><p class="link-preview">Existing post menu destinations remain available according to account and permissions: community, author, external open, share/copy, hide, report, edit and recovery. This study does not add or send those actions.</p>`);
 else if(action==='post-up'||action==='post-down'||action==='post-save'){
  if(d.postPending)return;const before={vote:d.postVote,saved:d.postSaved},failed=failNext,epoch=requestEpoch;failNext=false;D('#detail-failure').checked=false;d.postPending=true;if(action==='post-save')d.postSaved=!d.postSaved;else{const v=action==='post-up'?1:-1;d.postVote=d.postVote===v?0:v}renderDetails();setTimeout(()=>{if(epoch!==requestEpoch)return;d.postPending=false;if(failed){d.postVote=before.vote;d.postSaved=before.saved;notice='Could not update post. Previous state restored.'}else notice='Post updated locally.';if(d===discussion())renderDetails()},450);
 }
 else if(action==='gallery-back'||action==='gallery-forward'){d.page+=action==='gallery-forward'?1:-1;renderDetails()}
 else if(action==='open-image')openDialog('Media preview',`<img src="assets/${p.files[d.page]}" alt="Full media sample" style="width:100%;height:auto;display:block"><p class="sheet-warning">Use the approved vertical viewer for its full-screen interaction study. Inline playback policy is a separate native integration check.</p>`);
 else if(action==='retry-comments'){preferences.state='ready';D('#detail-state').value='ready';renderDetails()}
 else if(action==='recovery')openDialog('Partial recovery','<p class="link-preview">Two comments recovered before a service limit stopped the pass. Preserve upstream recovery reasons and partial-result semantics; do not show “no comments found” for an interrupted pass.</p>');
 else if(action==='load-more'){
  if(d.more==='loading')return;const failed=failNext||preferences.state==='more-error',epoch=requestEpoch;failNext=false;D('#detail-failure').checked=false;d.more='loading';renderDetails();setTimeout(()=>{if(epoch!==requestEpoch)return;if(failed){d.more='failed';if(preferences.state==='more-error'){preferences.state='ready';D('#detail-state').value='ready'}}else{d.more='loaded';d.comments.push({id:'more1',parent:null,author:'latearrival',score:4,age:'10m',body:'<p>I almost missed this conversation. Thanks for sharing a little detail from your day.</p>'},{id:'more2',parent:null,author:'quietscroll',score:2,age:'8m',body:'<p>Saving this to come back to later.</p>'})}if(d===discussion())renderDetails()},500);
 }
 else if(action==='next-thread'){const scroll=D('.detail-scroll'),top=scroll.getBoundingClientRect().top+D('.comments-strip').getBoundingClientRect().height+10;const next=[...D('#detail-phone').querySelectorAll('.thread')].find(e=>e.getBoundingClientRect().top>top+5);scrollToElement(next||D('#comments-start'))}
 else if(action==='back'){if(composerOpen){composerOpen=false;notice='Draft kept locally.';renderDetails()}else openDialog('Return to feed','<p class="link-preview">The native route must restore the feed or viewer you came from, including its anchor, filters and account. This standalone page keeps its own scroll state only.</p><p><a href="index.html">Open the retained feed/media study</a></p>')}
}
let dialogComment=null;
document.addEventListener('click',e=>{if(Date.now()<skipClickUntil&&e.target.closest('[data-hold]')){e.preventDefault();return}const button=e.target.closest('[data-action]');if(!button||button.disabled)return;e.preventDefault();const id=button.closest('[data-comment]')?.dataset.comment||dialogComment;if(D('#detail-dialog').open&&['reply','comment-save'].includes(button.dataset.action))D('#detail-dialog').close();dialogComment=id;handleDetail(button.dataset.action,id)});
document.addEventListener('input',e=>{if(e.target.id==='reply-text'){drafts.set(draftKey(),e.target.value);D('[data-action="send-reply"]').disabled=sending||blockedReply(discussion().comments.find(x=>x.id===composerTarget))||!e.target.value.trim()}});
document.addEventListener('change',e=>{
 if(e.target.id==='comment-sort'){discussion().sort=e.target.value;notice='Fixture sort changed to '+e.target.value+'. Thread identities and local state are retained.';renderDetails();scrollToElement(D('#comments-start'))}
 if(e.target.id==='detail-failure')failNext=e.target.checked;
});
for(const [id,key]of [['detail-post','post'],['detail-presentation','presentation'],['detail-actions','actions'],['detail-theme','theme'],['detail-text','text'],['detail-width','width'],['detail-state','state']])D('#'+id).addEventListener('change',e=>{
 if(sending){e.target.value=preferences[key];return}
 preferences[key]=['text','width'].includes(key)?Number(e.target.value):e.target.value;if(key==='post'){composerOpen=false;composerTarget=null;notice='';composerError=''}if(key==='presentation')discussion().postExpanded=null;if(key==='state'){composerOpen=false;composerError=''}renderDetails();
});
D('#detail-dialog-close').addEventListener('click',()=>D('#detail-dialog').close());D('#detail-dialog').addEventListener('close',()=>{if(document.activeElement?.id!=='reply-text')restoreFocus(dialogOrigin)});
D('#detail-reset').addEventListener('click',()=>{requestEpoch++;discussions.delete(preferences.post);viewPositions.set(preferences.post,0);D('.detail-scroll').scrollTop=0;for(const key of drafts.keys())if(key.startsWith(preferences.post+':'))drafts.delete(key);composerOpen=false;composerError='';sending=false;notice='';failNext=false;D('#detail-failure').checked=false;preferences.state='ready';D('#detail-state').value='ready';renderDetails()});
function toggleCommentActions(id){const d=discussion();d.tool=d.tool===id?null:id;renderDetails()}
function bindHolds(){
 document.querySelectorAll('[data-hold]').forEach(el=>{
  let timer=null,origin=null;const cancel=()=>{clearTimeout(timer);timer=null;origin=null};
  el.addEventListener('pointerdown',e=>{if(preferences.actions!=='hold'||e.button!==0||!e.isPrimary||e.target.closest('button,a')||window.getSelection()?.toString())return;origin={x:e.clientX,y:e.clientY};timer=setTimeout(()=>{if(window.getSelection()?.toString())return;skipClickUntil=Date.now()+500;toggleCommentActions(el.dataset.hold)},550)});
  el.addEventListener('pointermove',e=>{if(origin&&Math.hypot(e.clientX-origin.x,e.clientY-origin.y)>8)cancel()});for(const event of ['pointerup','pointercancel','pointerleave'])el.addEventListener(event,cancel);
  el.addEventListener('contextmenu',e=>{if(e.target.closest('a,button')||window.getSelection()?.toString())return;e.preventDefault();cancel();toggleCommentActions(el.dataset.hold)});
 });
}
document.addEventListener('keydown',e=>{if(D('#detail-dialog').open)return;if((e.shiftKey&&e.key==='F10')||e.key==='ContextMenu'){const el=e.target.closest('[data-hold]');if(el){e.preventDefault();toggleCommentActions(el.dataset.hold)}}if(e.key==='Escape'){if(composerOpen){composerOpen=false;notice='Draft kept locally.';renderDetails()}else if(discussion().tool){discussion().tool=null;renderDetails()}}});
const requested=new URLSearchParams(location.search).get('post');if(detailPosts[requested]){preferences.post=requested;D('#detail-post').value=requested}
renderDetails();
