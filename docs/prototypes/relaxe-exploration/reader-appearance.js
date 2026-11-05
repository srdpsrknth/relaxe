/* Contextual appearance study. Uses existing Settings buffers; no native writes. */
(function(){
'use strict';
const S=window.RelaxeReaderAppearanceSettings,E=id=>document.getElementById(id);
const postFields=[['hide_post_type','Post type'],['hide_post_flair','Post flair'],['hide_upvote_ratio','Upvote ratio'],['hide_subreddit_and_user_prefix','r/ and u/ prefixes'],['hide_the_number_of_votes','Post vote count'],['hide_the_number_of_comments','Comment count']];
const commentFields=[['show_comment_top_padding','Extra comment spacing'],['show_only_one_comment_level_indicator','Single level indicator'],['show_author_avatar','Author avatars'],['show_user_prefix','u/ prefixes'],['hide_the_number_of_votes_in_comments','Comment vote count']];
const media=[[4,'Images'],[2,'GIFs'],[1,'Emotes'],[8,'Comment faces']];
let session=null,origin=null;
function account(){return preferences.state==='guest'?'guest':'weekendreader'}
function notify(open){if(parent!==window)parent.postMessage({type:'relaxe-adaptive-reader-appearance',open},location.origin)}
function decorate(root,values){
 for(const el of root.querySelectorAll('[data-reader-field]'))el.hidden=values.post[el.dataset.readerField]==='true';
 root.dataset.readerPadding=values.comments.show_comment_top_padding;
 root.dataset.readerSingle=values.comments.show_only_one_comment_level_indicator;
 root.dataset.readerDivider=values.comments.show_comment_divider==='true'?values.comments.comment_divider_type:'off';
 for(const el of root.querySelectorAll('[data-reader-comment-votes]'))el.hidden=values.comments.hide_the_number_of_votes_in_comments==='true';
 for(const el of root.querySelectorAll('[data-reader-prefix]'))el.hidden=values.comments.show_user_prefix!=='true';
 for(const el of root.querySelectorAll('[data-reader-avatar]'))el.hidden=values.comments.show_author_avatar!=='true';
 for(const scope of ['post','comments'])for(const [mask]of media)for(const el of root.querySelectorAll(`[data-reader-media="${scope}-${mask}"]`)){
  const on=!!(S.mask(values[scope].embedded_media_type)&mask);el.dataset.enabled=String(on);el.querySelector('small').textContent=on?'Shown':'Hidden';
 }
}
function makePreview(){
 const phone=E('detail-phone'),region=document.createElement('div');region.className='reader-sample '+(preferences.theme==='dark'?'dark':'')+(preferences.text>1?' large':'');region.style.cssText=phone.style.cssText;region.style.setProperty('--scale',preferences.text);
 // Snapshot text only: no duplicate media nodes, player, forms, action IDs or requests.
 const scroll=D('.detail-scroll').cloneNode(true);
 for(const el of scroll.querySelectorAll('img,video,audio,source,iframe'))el.remove();
 if(scroll.querySelector('.post-media'))scroll.querySelector('.post-media').textContent='Media stays in the reader · no playback in this preview';
 for(const el of scroll.querySelectorAll('button,select,input,textarea,a')){
  const text=document.createElement('span');if(el.tagName==='SELECT')text.textContent=el.value;else text.innerHTML=el.innerHTML;text.className=el.className;el.replaceWith(text);
 }
 for(const el of [scroll,...scroll.querySelectorAll('*')])for(const attr of [...el.attributes])if(attr.name==='id'||attr.name==='tabindex'||attr.name.startsWith('data-action')||attr.name==='data-hold'||attr.name.startsWith('aria-'))el.removeAttribute(attr.name);
 scroll.classList.add('reader-preview-scroll');scroll.tabIndex=0;scroll.setAttribute('role','region');scroll.setAttribute('aria-label','Read-only post and comments preview');region.append(scroll);
 for(const [scope,selector]of [['post','.post-copy'],['comments','.comment-copy']]){
  const samples=document.createElement('div');samples.className='reader-media-samples';samples.innerHTML='<p>Inline media samples</p>'+media.map(([mask,label])=>`<span data-reader-media="${scope}-${mask}">${label}<small>Shown</small></span>`).join('');scroll.querySelector(selector)?.append(samples);
 }
 return region;
}
function inputRow(scope,key,label,invert=false){
 const row=document.createElement('label');row.className='reader-control';const text=document.createElement('span');text.textContent=label;
 const input=document.createElement('input');input.type='checkbox';input.checked=(session.draft[scope][key]==='true')!==invert;
 input.addEventListener('change',()=>{session.draft[scope][key]=String(input.checked!==invert);update()});row.append(text,input);return row;
}
function section(title){const group=document.createElement('fieldset'),legend=document.createElement('legend');legend.textContent=title;group.append(legend);return group}
function update(){decorate(E('reader-live-preview'),session.draft);E('reader-apply').disabled=!S.dirty(session);E('reader-edit-status').textContent=S.dirty(session)?'Previewing changes · not applied':'Current appearance'}
function open(){
 if(session)return;
 origin=D('#detail-phone [data-action="post-more"]');session=S.begin(account());D('#detail-phone video')?.pause();
 const dialog=E('reader-appearance');dialog.classList.toggle('dark',preferences.theme==='dark');dialog.style.setProperty('--scale',preferences.text);
 const phoneStyle=getComputedStyle(E('detail-phone'));for(const key of ['--bg','--fg','--accent','--muted','--divider','--tint'])dialog.style.setProperty(key,phoneStyle.getPropertyValue(key));
 E('reader-account').textContent=(session.account==='guest'?'Guest':'u/'+session.account)+' · applies to this account’s post reader and comments';
 E('reader-live-preview').replaceChildren(makePreview());const controls=E('reader-controls');controls.replaceChildren();
 const post=section('Post information');for(const [key,label]of postFields)post.append(inputRow('post',key,label,true));controls.append(post);
 const comments=section('Comments');
 const divider=document.createElement('label');divider.className='reader-control';divider.innerHTML='<span>Comment dividers</span><select aria-label="Comment dividers"><option value="off">Off</option><option value="0">All comments</option><option value="1">Top-level only</option></select>';
 const select=divider.querySelector('select');select.value=session.draft.comments.show_comment_divider==='true'?session.draft.comments.comment_divider_type:'off';select.addEventListener('change',()=>{session.draft.comments.show_comment_divider=String(select.value!=='off');if(select.value!=='off')session.draft.comments.comment_divider_type=select.value;update()});comments.append(divider);
 for(const [key,label]of commentFields)comments.append(inputRow('comments',key,label,key.startsWith('hide_')));controls.append(comments);
 for(const scope of ['post','comments']){
  const group=section(scope==='post'?'Media inside post text':'Media inside comments');
  for(const [mask,label]of media){const row=document.createElement('label');row.className='reader-control';const text=document.createElement('span');text.textContent=label;const input=document.createElement('input');input.type='checkbox';input.checked=!!(S.mask(session.draft[scope].embedded_media_type)&mask);input.addEventListener('change',()=>{session.draft[scope].embedded_media_type=S.code(S.mask(session.draft[scope].embedded_media_type)^mask);update()});row.append(text,input);group.append(row)}controls.append(group);
 }
 E('reader-discard-panel').hidden=true;E('reader-controls').hidden=false;update();dialog.showModal();notify(true);E('reader-appearance-title').focus({preventScroll:true});
}
function finish(apply){
 if(!session)return;
 if(apply)S.commit(session);
 session=null;E('reader-appearance').close();notify(false);if(apply)decorate(E('detail-phone'),S.read(account()));
 if(origin?.isConnected)origin.focus({preventScroll:true});else D('[data-action="post-more"]')?.focus({preventScroll:true});
 D('.detail-status').textContent=apply?'Reader appearance applied in this preview.':'Reader appearance unchanged.';
}
function requestClose(){
 if(!session)return false;
 if(!S.dirty(session)){finish(false);return true}
 E('reader-discard-panel').hidden=false;E('reader-controls').hidden=true;E('reader-apply').disabled=true;E('reader-keep').focus();return true;
}
E('reader-cancel').addEventListener('click',requestClose);E('reader-apply').addEventListener('click',()=>finish(true));
E('reader-keep').addEventListener('click',()=>{E('reader-discard-panel').hidden=true;E('reader-controls').hidden=false;update();E('reader-controls').querySelector('input,select').focus()});
E('reader-discard').addEventListener('click',()=>finish(false));
E('reader-appearance').addEventListener('cancel',event=>{event.preventDefault();requestClose()});
document.addEventListener('keydown',event=>{if(session&&event.key==='Escape'){event.preventDefault();event.stopImmediatePropagation();requestClose()}},true);
function syncPresentation(){if(!session)return;const phone=E('detail-phone'),dialog=E('reader-appearance'),sample=dialog.querySelector('.reader-sample'),style=getComputedStyle(phone);for(const key of ['--bg','--fg','--accent','--muted','--divider','--tint']){dialog.style.setProperty(key,style.getPropertyValue(key));sample?.style.setProperty(key,style.getPropertyValue(key))}dialog.style.setProperty('--scale',preferences.text);sample?.style.setProperty('--scale',preferences.text);dialog.classList.toggle('dark',preferences.theme==='dark');sample?.classList.toggle('dark',preferences.theme==='dark');sample?.classList.toggle('large',preferences.text>1)}
window.RelaxeReaderAppearance={open,requestClose,syncPresentation,get active(){return !!session},refresh(){decorate(E('detail-phone'),S.read(account()));syncPresentation()}};
if(new URLSearchParams(location.search).get('appearance')==='1')open();
})();
