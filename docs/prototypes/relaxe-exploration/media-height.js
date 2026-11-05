/* Isolated visual comparison: no settings storage, account state or API actions. */
(function(){
'use strict';
const T=RelaxeStudyTheme,root=document.querySelector('.height-comparison'),feeds=[...document.querySelectorAll('.comparison-feed')];
for(const [index,feed]of feeds.entries()){
 const id='height-post-'+index;
 feed.innerHTML='<div class="layout-live-preview"><article aria-labelledby="'+id+'"><div class="sample-copy"><h4 id="'+id+'">A river through the mountains</h4><p>r/Illustration · u/riverlines · 2h</p></div><img class="sample-media" src="assets/tall-landscape.svg" width="600" height="1200" alt="Tall illustration: sun above mountains, a winding river, and trees at the bottom"><div class="sample-toolbar" aria-label="Illustrative post actions"><span>'+T.icon('up')+'248</span><span>'+T.icon('down')+'</span><span>'+T.icon('comments')+'32</span><span>'+T.icon('save')+'</span><span>'+T.icon('more')+'</span></div></article></div><div class="layout-live-preview"><article aria-labelledby="'+id+'-next"><div class="sample-copy"><h4 id="'+id+'-next">What made your morning a little better?</h4><p>r/CasualConversation · u/slowmornings · 1h</p><p class="sample-text">The first cup of coffee, an unhurried walk, and a little time to read made my morning better. What small moment made a difference to your day?</p></div></article></div>';
}
function update(){
 const settings={foundation:'selected',appearance:document.querySelector('#comparison-theme').value,palette:'blue',text:document.querySelector('#comparison-text').value},direction=T.directions[0],tall=document.querySelector('#comparison-image').value==='tall';
 root.dataset.text=settings.text;
 for(const frame of document.querySelectorAll('.feed-frame')){for(const [key,value]of Object.entries(T.tokens(direction,settings)))frame.style.setProperty(key,value);T.setStyleAttributes(frame,direction,settings)}
 for(const feed of feeds){const image=feed.querySelector('img');image.width=tall?600:1000;image.height=tall?1200:667;image.src='assets/'+(tall?'tall-landscape.svg':'mountain.jpg');image.alt=tall?'Tall illustration: sun above mountains, a winding river, and trees at the bottom':'Wide photograph of snowy mountains above clouds';feed.scrollTop=0}
}
for(const control of document.querySelectorAll('.controls select'))control.addEventListener('change',update);
update();
})();
