/* Local comparison wrapper. No changes to accepted study files or native preference stores. */
const byId=id=>document.getElementById(id);
const studyTheme=window.RelaxeStudyTheme;
const directions=studyTheme.directions, colors=studyTheme.colors;
const settings={foundation:'selected',surface:'feed',appearance:'light',palette:'direction',text:'1',width:'390',compare:'all'};
function icon(name){return studyTheme.icon(name)}
function styleFor(direction){return studyTheme.styleFor(direction,settings)}
function paletteFor(direction){return studyTheme.paletteFor(direction,settings)}
function themeFixtureFor(direction){return studyTheme.themeFixtureFor(direction,settings)}
function tokens(direction){return studyTheme.tokens(direction,settings,themeFixtureFor(direction))}
function setStyleAttributes(root,direction){studyTheme.setStyleAttributes(root,direction,settings)}
function decorate(doc){studyTheme.decorate(doc)}
function setSelect(doc,id,value){const control=doc.getElementById(id);if(control&&control.value!==value){control.value=value;control.dispatchEvent(new Event('change',{bubbles:true}))}}
async function applyFrame(frame,direction,initial=false){
 const doc=frame.contentDocument;if(!doc?.body)return;
 for(const [key,value]of Object.entries(tokens(direction)))doc.documentElement.style.setProperty(key,value);
 setStyleAttributes(doc.documentElement,direction);
 if(doc.body.classList.contains('sample')){doc.body.style.setProperty('--scale',settings.text);return}
 if(!doc.getElementById('foundation-styles')){await new Promise((resolve,reject)=>{const link=doc.createElement('link');link.id='foundation-styles';link.rel='stylesheet';link.href='foundations-preview.css?rev=07';link.onload=resolve;link.onerror=()=>reject(new Error('Preview stylesheet could not load'));doc.head.append(link)})}
 const detail=Boolean(doc.getElementById('detail-phone'));
 setSelect(doc,detail?'detail-theme':'theme',settings.appearance==='light'?'light':'dark');
 setSelect(doc,detail?'detail-text':'text',settings.text);
 setSelect(doc,detail?'detail-width':'width',settings.width);
 if(!detail)setSelect(doc,'surface',settings.surface==='media'?'media':'feed');
 if(initial&&settings.surface==='comments')doc.querySelector('[data-action="jump-comments"]')?.click();
 decorate(doc);
 if(initial){const observer=new MutationObserver(()=>decorate(doc));observer.observe(doc.body,{childList:true,subtree:true});frame._icons=observer}
}
function samples(surface){
 const preference=surface==='preferences';
 return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="foundations-preview.css?rev=07"></head><body class="sample"><header class="sample-bar">${icon('back')}<h1>${preference?'Appearance':'Shared controls'}</h1></header><main><p class="scope">Viewing as weekendreader · synthetic fixture<br>${preference?'Preference-row styling only; organization and scope will be reviewed later.':'Local state examples; no external actions.'}</p>${preference?`
 <section><h2>Reading & media</h2><label class="preference"><span>Use dynamic colors<small>Illustrative palette. Existing Apply action and account scope remain separate.</small></span><input type="checkbox" aria-label="Use dynamic colors" checked></label><label class="preference"><span>AMOLED dark<small>Black canvas in the existing dark-theme family.</small></span><input type="checkbox" aria-label="AMOLED dark"></label><label class="preference"><span>Autoplay on Wi-Fi<small>Keep existing network and media preferences.</small></span><input type="checkbox" aria-label="Autoplay on Wi-Fi" checked></label><label class="preference"><span>Locked by this fixture<small>Unavailable · sign-in required</small></span><input type="checkbox" aria-label="Unavailable preference" disabled></label></section>
 <section><h2>Text & theme</h2><p>Follow existing title, content and custom font preferences.</p><div class="button-row"><button data-demo="dialog">Theme options</button><button disabled>Apply · no changes</button></div><p class="state-note" role="status">Changes here last only in this preview.</p></section>`:`
 <section><h2>Actions & selection</h2><div class="button-row"><button class="primary" data-demo="save">Save post</button><button aria-pressed="true" class="selected" data-demo="vote">${icon('up')} Upvoted</button><button disabled>Reply · locked</button><button data-demo="dialog">More options</button></div><p class="state-note" id="save-result" role="status">Not saved · local fixture</p><label class="preference"><span>Fail next save<small>Preview pending, error and retry.</small></span><input type="checkbox" id="fail-save" aria-label="Fail next save"></label></section>
 <section><h2>Feedback</h2><p class="success">✓ Saved · available in your saved list</p><p class="error">! Couldn’t load more posts. Your place is kept.</p><div class="button-row"><button data-demo="retry">Retry</button></div><p class="state-note" id="retry-result" role="status">3 posts retained · append failed</p><p class="pending">Updating… · current content stays visible</p><p>No posts match these filters. <a href="#filters" data-demo="filters">Review filters</a></p><div class="skeleton" role="status" aria-label="Loading posts"></div></section>`}
 <section class="sample-sheet"><h2>Shared language</h2><p>The same title, body, secondary text, outlined controls, selected accent and feedback roles apply to every area.</p><p class="context">Tab through the controls for focus. Press and hold a button to inspect its pressed outline.</p></section></main>
 <dialog aria-labelledby="sample-dialog-title"><h2 id="sample-dialog-title">Post options</h2><p>The last light on the Dolomites after a day of rain</p><div class="button-row"><button data-demo="close">Close options</button><button class="primary" data-demo="close">Done</button></div></dialog></body></html>`;
}
function bindSample(frame){const doc=frame.contentDocument;let saved=false,busy=false,origin=null;
 doc.addEventListener('click',event=>{const button=event.target.closest('[data-demo]');if(!button)return;const action=button.dataset.demo;
  if(action==='dialog'){origin=button;doc.querySelector('dialog').showModal()}
  if(action==='close')doc.querySelector('dialog').close();
  if(action==='vote'){const active=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(active));button.classList.toggle('selected',active);button.innerHTML=icon('up')+(active?' Upvoted':' Upvote')}
  if(action==='save'&&!busy){busy=true;const failed=doc.getElementById('fail-save').checked;doc.getElementById('fail-save').checked=false;button.disabled=true;const result=doc.getElementById('save-result');result.textContent='Saving…';result.className='state-note';setTimeout(()=>{if(!failed)saved=!saved;result.textContent=failed?'! Couldn’t save. Previous state kept. Try again.':saved?'✓ Saved locally':'Not saved · local fixture';result.className='state-note '+(failed?'error':'');button.textContent=saved?'Unsave post':'Save post';button.disabled=false;busy=false},650)}
  if(action==='retry'){button.disabled=true;doc.getElementById('retry-result').textContent='Loading more…';setTimeout(()=>{doc.getElementById('retry-result').textContent='✓ More posts loaded · your place is kept';button.disabled=false},650)}
  if(action==='filters'){event.preventDefault();button.textContent='Filters reviewed · fixture unchanged'}
 });doc.querySelector('dialog').addEventListener('close',()=>origin?.focus());
}
function specimen(){return `<section class="specimen" aria-label="Shared type and control specimen"><div class="specimen-heading"><span>IDENTICAL CONTENT / SHARED STYLING</span><h3>The last light on the Dolomites after a day of rain</h3></div><div class="specimen-body"><p>EarthPorn · ridgewalker<br><strong>2.4k points</strong> · 186 comments · 2h</p><div class="specimen-icons" aria-hidden="true">${icon('search')}${icon('comments')}${icon('save')}${icon('up')}</div><div class="specimen-actions"><button type="button" class="specimen-primary" data-specimen="save" aria-pressed="false">${icon('save')}<span>Save</span></button><button type="button" data-specimen="vote" aria-pressed="false">${icon('up')}<span>Upvote</span></button></div></div></section>`}
function update(){
 const surface=settings.surface;
 byId('surface-hint').textContent={feed:'Hold a card for its accepted toolbar; desktop: right click or Shift+F10. The retained shell is context and will be reviewed next.',post:'Full post first, with explicit main-post Reply. Original behavior is retained; only shared styling is applied.',comments:'Top-right −/+ collapses each branch. Hold comment text for actions. The full post remains above the discussion.',media:'The same fitted photo opens with controls hidden. Tap to reveal; use the accepted study for video/GIF autoplay and timeout flows.',preferences:'Row and control appearance only. Preference organization, account scope and theme-editor flows remain open.',components:'Try save success/failure, vote selection, Retry and More options. Tab to inspect keyboard focus; disabled controls explain availability.'}[surface];
 for(const direction of directions){
  let section=byId('direction-'+direction.id);
  if(!section){section=document.createElement('article');section.id='direction-'+direction.id;section.className='direction';section.dataset.foundation=direction.id;section.innerHTML=`<header><span class="number">${direction.label}</span><h2>${direction.name}</h2><p>${direction.description}</p></header>${specimen()}<div class="swatches" aria-label="Color roles"></div><iframe title="${direction.name} foundation preview"></iframe><p class="role-summary"></p>`;section.addEventListener('click',event=>{const button=event.target.closest('[data-specimen]');if(!button)return;const pressed=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(pressed));button.querySelector('span').textContent=button.dataset.specimen==='save'?(pressed?'Saved':'Save'):(pressed?'Upvoted':'Upvote')});byId('comparisons').append(section)}
  for(const [key,value]of Object.entries(tokens(direction)))section.style.setProperty(key,value);
  setStyleAttributes(section,direction);
  const selectedCaptions={stone:['A / NEUTRAL FALLBACK','Neutral','Selected typography, rounding and icons, using the neutral A palette as an illustrative fallback.'],hearth:['B / WARM FALLBACK','Warm','The same selected components with the warm B palette. No fixed shipping palette is selected.'],grove:['SYSTEM / WALLPAPER FIXTURE','Wallpaper · blue','The same selected components with a simulated system palette. Actual colors come from the existing theme provider.']};
  const caption=settings.foundation==='selected'?selectedCaptions[direction.id]:[direction.label,direction.name,direction.description];
  section.querySelector('header .number').textContent=caption[0];section.querySelector('header h2').textContent=caption[1];section.querySelector('header p').textContent=caption[2];
  section.hidden=settings.compare!=='all'&&settings.compare!==direction.id;section.style.setProperty('--w',settings.width+'px');
  section.querySelector('.swatches').innerHTML=paletteFor(direction).slice(0,7).map((color,i)=>`<span class="swatch" style="background:${color}" title="${['Canvas','Card','Text','Secondary text','Outline','Accent','Accent container'][i]} ${color}"></span>`).join('');
  const s=styleFor(direction);
  section.querySelector('.role-summary').textContent=settings.foundation==='selected'?'Selected mix: A type · B rounding · C solid icons · ≥48 px targets':`${s.shape[0]} px cards · ${s.shape[1]} px controls · ${s.shape[2]} px sheets · ${s.stroke} px icon stroke · ≥48 px targets`;
  let frame=section.querySelector('iframe');
  if(frame.dataset.surface!==surface){
   // Replacing the frame disposes observers and timers when changing surfaces.
   const next=document.createElement('iframe');next.title=frame.title;next.dataset.surface=surface;frame.replaceWith(next);frame=next;
   frame.addEventListener('load',async()=>{try{if(!frame.contentDocument)throw new Error('Same-origin preview required');await applyFrame(frame,direction,true);if(frame.contentDocument?.body.classList.contains('sample'))bindSample(frame);frame.dataset.ready='true'}catch(error){frame.dataset.error=error.message;const fallback=document.createElement('p');fallback.className='fallback';fallback.textContent='Open this comparison through the local preview server to load the accepted studies.';frame.after(fallback)}});
   if(['preferences','components'].includes(surface))frame.srcdoc=samples(surface);else frame.src=['post','comments'].includes(surface)?'details.html?foundation-preview=07':'index.html?foundation-preview=07';
  }else applyFrame(frame,direction);
 }
 byId('palette-note').hidden=settings.palette==='direction';
 byId('palette').options[0].textContent=settings.foundation==='selected'?'Fallbacks + wallpaper':'Direction palettes';
 for(const option of byId('compare').options){option.textContent=option.value==='all'?(settings.foundation==='selected'?'All three themes':'All three directions'):settings.foundation==='selected'?{stone:'Neutral fallback',hearth:'Warm fallback',grove:'Wallpaper fixture'}[option.value]:{stone:'A · Stone',hearth:'B · Hearth',grove:'C · Grove'}[option.value]}
}
for(const key of Object.keys(settings))byId(key).addEventListener('change',event=>{settings[key]=event.target.value;update()});
update();
