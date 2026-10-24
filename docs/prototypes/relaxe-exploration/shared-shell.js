/* Shared HTML shell fixture. No native navigation, preferences or Reddit requests. */
(function(){
'use strict';
const params=new URLSearchParams(location.search),embedded=params.has('embedded-search'),hosted=params.has('shell-host');
const destinations=[['home','Home'],['saved','Saved'],['search','Search'],['inbox','Inbox'],['profile','Profile']];
const paths={home:'M1 11 12 1l11 10h-4v11h-5v-8h-4v8H5V11Z',saved:'M5 2h14v21l-7-5-7 5V2Z',search:'M10 1a9 9 0 1 0 5.6 16l5.7 5.7 2-2-5.7-5.7A9 9 0 0 0 10 1Zm0 3a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z',inbox:'M2 3h20v18H2V3Zm3 3v2l7 5 7-5V6l-7 5-7-5Z',profile:'M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM3 22v-3c0-7 18-7 18 0v3H3Z'};
let context={account:'weekendreader',subreddit:'',user:'',palette:'blue',appearance:'light',text:'1',width:'390'},hidden=false,intentUntil=0,overlay=null,modal=false,origin=null;
const positions=new WeakMap(),mounted=new WeakSet();
function markup(){return destinations.map(([id,label])=>`<button type="button" data-destination="${id}" ${id==='search'?'class="center-search" aria-haspopup="dialog" aria-expanded="false"':''}><span class="nav-symbol"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" fill-rule="evenodd" d="${paths[id]}"/></svg></span><span class="nav-label">${label}</span></button>`).join('')}
function owners(){return [...document.querySelectorAll('.phone,#nav-phone')]}
function setHidden(value){if(modal)value=false;for(const owner of owners()){const nav=owner.querySelector('.shared-shell-nav');if(!nav)continue;if(value&&nav.contains(document.activeElement))return;nav.dataset.scrollHidden=String(value);nav.inert=value;owner.dataset.shellHidden=String(value)}hidden=value}
function show(){setHidden(false)}
function scrollPosition(target,y,intent){const previous=positions.get(target);positions.set(target,{y,direction:previous?.direction||0,total:previous?.total||0});if(y<=8){show();return}if(!previous||!intent)return;const delta=y-previous.y;if(Math.abs(delta)<1)return;const direction=Math.sign(delta),total=direction===previous.direction?previous.total+Math.abs(delta):Math.abs(delta);positions.set(target,{y,direction,total});if(direction>0&&total>=24)setHidden(true);else if(direction<0&&total>=12)show()}
function setInset(value){document.documentElement.style.setProperty('--shared-root-inset',value+'px')}
function sizeNav(nav,owner){const height=Math.ceil(nav.getBoundingClientRect().height);if(height){owner.style.setProperty('--shared-bar-height',height+'px');if(owner.id==='nav-phone')document.getElementById('shell-feed')?.contentWindow?.RelaxeShell?.setInset(height)}}
function mount(){if(embedded)return;for(const owner of owners()){
 const media=owner.querySelector('.media-chrome');owner.classList.add('shared-shell-owner');for(const scroll of owner.querySelectorAll('.scroll,.detail-scroll,.destination'))if(!scroll.hasAttribute('tabindex'))scroll.setAttribute('tabindex','0');if(hosted&&!media)continue;
 let nav=owner.querySelector('.shared-shell-nav');if(!nav){nav=owner.id==='nav-phone'?document.getElementById('shell-nav'):document.createElement('nav');nav.classList.add('shared-shell-nav');nav.setAttribute('aria-label','Main destinations');if(!nav.children.length)nav.innerHTML=markup();if(!nav.parentElement)owner.append(nav)}
 if(media&&nav.hidden!==media.hidden)nav.hidden=media.hidden;
 if(mounted.has(nav))continue;mounted.add(nav);owner.classList.add('shared-shell-owner');nav.dataset.scrollHidden=String(hidden);nav.inert=hidden;
 new ResizeObserver(()=>sizeNav(nav,owner)).observe(nav);sizeNav(nav,owner);
 nav.addEventListener('focusin',show);
 if(owner.id!=='nav-phone')nav.addEventListener('click',event=>{const button=event.target.closest('[data-destination]');if(!button)return;event.preventDefault();if(button.dataset.destination==='search')openSearch(owner,button);else go(button.dataset.destination)});
}}
function inertBackground(owner,results=false){for(const child of owner.children){if(child===overlay)continue;child.inert=results?!(child.classList.contains('shared-shell-nav')):true}}
function closeSearch(){if(!overlay)return;const owner=overlay.closest('.shared-shell-owner');overlay.remove();overlay=null;modal=false;for(const child of owner.children)child.inert=false;for(const nav of owner.querySelectorAll('.shared-shell-nav'))nav.querySelector('[data-destination="search"]')?.setAttribute('aria-expanded','false');show();if(origin?.isConnected)origin.focus({preventScroll:true})}
function currentContext(){const state=document.getElementById('detail-state');if(state)context.account=state.value==='guest'?'guest':'weekendreader';for(const key of ['text','width']){const control=document.getElementById(key);if(control)context[key]=control.value}const theme=document.getElementById('theme');if(theme)context.appearance=theme.value==='dark'&&context.appearance==='amoled'?'amoled':theme.value;return context}
function go(destination){const data=currentContext(),url=new URL('navigation.html?rev=16',location.href);url.searchParams.set('destination',destination);for(const key of ['account','palette','appearance','text','width'])url.searchParams.set(key,data[key]);if(hosted){parent.postMessage({type:'relaxe-shell-destination',destination},location.origin);return}top.location.href=url.href}
function themeTokens(owner){const style=getComputedStyle(owner),read=(key,fallback)=>style.getPropertyValue(key).trim()||style.getPropertyValue(fallback).trim();const tokens={};for(const key of ['--canvas','--card','--fg','--secondary','--outline','--accent','--container','--on-accent','--focus','--chrome','--on-chrome','--bottom-bg','--bottom-icon','--button-bg','--button-fg','--scale']){const fallback={'--canvas':'--bg','--card':'--bg','--secondary':'--muted','--outline':'--divider','--container':'--tint','--chrome':'--tint','--on-chrome':'--fg','--bottom-bg':'--bg','--bottom-icon':'--accent','--focus':'--accent'}[key];const value=read(key,fallback||key);if(value)tokens[key]=value}return tokens}
function openSearch(owner=owners()[0],button){if(!owner)return;show();origin=button||document.activeElement;document.querySelectorAll('video').forEach(video=>video.pause());if(overlay){delete overlay.dataset.results;modal=true;inertBackground(owner);overlay.contentWindow.postMessage({type:'relaxe-open-search'},location.origin);return}
 const data=currentContext(),url=new URL('navigation.html?rev=16',location.href);url.searchParams.set('embedded-search','1');for(const key of ['account','subreddit','user','palette','appearance','text','width'])if(data[key])url.searchParams.set(key,data[key]);
 overlay=document.createElement('iframe');overlay.className='shared-search-frame';overlay.title='Search and results';overlay.src=url.href;owner.append(overlay);modal=true;inertBackground(owner);owner.querySelector('[data-destination="search"]')?.setAttribute('aria-expanded','true');
}
window.addEventListener('message',event=>{if(event.origin!==location.origin)return;
 if(event.source===document.getElementById('shell-feed')?.contentWindow&&event.data?.type==='relaxe-shell-scroll'){scrollPosition(event.source,event.data.y,event.data.intent);return}
 if(!overlay||event.source!==overlay.contentWindow)return;const owner=overlay.closest('.shared-shell-owner');
 if(event.data?.type==='relaxe-shell-scroll'){scrollPosition(event.source,event.data.y,event.data.intent);return}
 if(event.data?.type==='relaxe-search-open'){modal=true;inertBackground(owner);owner.querySelector('[data-destination="search"]')?.setAttribute('aria-expanded','true');overlay.contentWindow.postMessage({type:'relaxe-shell-theme',tokens:themeTokens(owner),inset:owner.querySelector('.shared-shell-nav')?.offsetHeight||80},location.origin)}
 else if(event.data?.type==='relaxe-search-exit')closeSearch();
 else if(event.data?.type==='relaxe-search-results'){modal=false;overlay.dataset.results='true';inertBackground(owner,true);owner.querySelector('[data-destination="search"]')?.setAttribute('aria-expanded','false');show()}
 else if(event.data?.type==='relaxe-search-unmodal'){modal=false;overlay.dataset.results='true';inertBackground(owner,true);owner.querySelector('[data-destination="search"]')?.setAttribute('aria-expanded','false');show()}
});
for(const name of ['wheel','pointerdown','touchstart'])document.addEventListener(name,()=>{intentUntil=Date.now()+1600},{passive:true,capture:true});
document.addEventListener('pointermove',event=>{if(event.buttons)intentUntil=Date.now()+1600},{passive:true,capture:true});
document.addEventListener('keydown',event=>{if(['PageDown','PageUp','ArrowDown','ArrowUp','Home','End',' '].includes(event.key))intentUntil=Date.now()+1600;if(event.key==='Tab')show()},true);
document.addEventListener('focusin',event=>{if(event.target.closest('.shared-shell-nav'))show()});
document.addEventListener('scroll',event=>{const target=event.target;if(!target.matches?.('.scroll,.detail-scroll,.destination'))return;const intent=Date.now()<intentUntil;if(hosted||embedded){parent.postMessage({type:'relaxe-shell-scroll',y:target.scrollTop,intent},location.origin)}else scrollPosition(target,target.scrollTop,intent)},true);
window.RelaxeShell={markup,show,openSearch,closeSearch,setInset,setContext(data){context={...context,...data}},mount};
new MutationObserver(mount).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});mount();document.dispatchEvent(new Event('relaxe-shell-ready'));
})();
