/* Shared local study fixtures and role adapter. Not an Android theme engine. */
(function(global){
"use strict";
const directions=[
 {id:'stone',name:'Stone',label:'A / CRISP NEUTRAL',description:'Warm white and charcoal. Sans-serif titles, fine outline icons and nearly square cards. Quiet, precise controls.',shape:[4,4,12,2],heading:'"Segoe UI",Roboto,sans-serif',weight:650,title:550,stroke:1.5,space:12},
 {id:'hearth',name:'Hearth',label:'B / WARM EDITORIAL',description:'Oat canvas, cream cards and terracotta accents. Serif post titles and headings; familiar sans-serif comments and body text.',shape:[12,12,24,6],heading:'Georgia,"Times New Roman",serif',weight:500,title:600,stroke:1.8,space:16},
 {id:'grove',name:'Grove',label:'C / SAGE & EXPRESSIVE',description:'Sage canvas and a solid evergreen toolbar. Bold sans-serif titles, filled icons, round cards and pill controls.',shape:[24,24,32,12],heading:'"Segoe UI",Roboto,sans-serif',weight:800,title:700,stroke:2.4,space:20}
];
// Palette order: canvas, card, ink, secondary, outline, accent, container, on-accent.
const colors={
 stone:{light:['#eeede9','#fffefa','#242725','#5d605b','#7b7f77','#343c37','#e1e4df','#ffffff'],dark:['#181a19','#252725','#f0f1ed','#bec4bd','#838a80','#d2dbd0','#354035','#182019']},
 hearth:{light:['#e9d8c4','#fff6e7','#3a281d','#76523c','#89694f','#984323','#f7dfc2','#ffffff'],dark:['#281b13','#3a281d','#fff0da','#e3c09e','#b88e66','#ffc08e','#654025','#361d0d']},
 grove:{light:['#d9e5c9','#f6ffeb','#1c3425','#466148','#6c825f','#254f36','#c9e7b5','#ffffff'],dark:['#0e2119','#193b2b','#edffe4','#b7d7ad','#789f6a','#b8e697','#29542f','#123216']},
 blue:{light:['#eef0f5','#fafbff','#252c38','#586273','#77849a','#3c5a86','#dce6fa','#ffffff'],dark:['#181d26','#232b36','#e8eef9','#bbc6d8','#7d8ca3','#b2cbf5','#304768','#12243e']},
 rose:{light:['#f6eded','#fff9f8','#372a2c','#735b60','#98747e','#8a4358','#f8dde4','#ffffff'],dark:['#24191d','#32242a','#f9e7ec','#d7bbc4','#a08491','#f1b4c8','#643447','#341620']},
 amber:{light:['#f5eedf','#fffaf0','#332d1f','#6a6047','#8d7e56','#755612','#f3e4b4','#ffffff'],dark:['#211d13','#30291a','#f7eed9','#d0c09c','#9a8961','#e7c46d','#554419','#302504']}
};
const selectedFoundation={shape:[12,12,24,6],heading:'"Segoe UI",Roboto,sans-serif',weight:650,title:550,stroke:2.4,space:16};
function styleFor(direction,settings){return settings.foundation==='selected'?{...direction,...selectedFoundation}:direction}
const paths={up:'M12 20V4m-6 6 6-6 6 6',down:'M12 4v16m-6-6 6 6 6-6',more:'M12 5h.01M12 12h.01M12 19h.01',comments:'M4 4h16v12H9l-5 4V4Z',external:'M14 4h6v6m0-6L10 14M10 4H4v16h16v-6',save:'M6 3h12v18l-6-4-6 4V3Z',search:'M15 15l6 6M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0',home:'m3 10 9-7 9 7M5 9v12h5v-7h4v7h5V9',grid:'M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h7v7h-7v-7Z',back:'M20 12H4m7-7-7 7 7 7',close:'m5 5 14 14M19 5 5 19'};
const solidPaths={up:'M10 21v-9H4l8-10 8 10h-6v9Z',down:'M10 3v9H4l8 10 8-10h-6V3Z',save:'M5 2h14v21l-7-5-7 5V2Z',comments:'M2 3h20v14H9l-7 5V3Z',home:'M1 11 12 1l11 10h-4v11h-5v-8h-4v8H5V11Z',grid:'M2 2h8v8H2V2Zm12 0h8v8h-8V2ZM2 14h8v8H2v-8Zm12 0h8v8h-8v-8Z',search:'M10 1a9 9 0 1 0 5.6 16l5.7 5.7 2-2-5.7-5.7A9 9 0 0 0 10 1Zm0 3a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z'};
function icon(name){return `<svg class="foundation-icon" data-has-solid="${Boolean(solidPaths[name])}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path class="outline-icon" d="${paths[name]||paths.more}"/>${solidPaths[name]?`<path class="solid-icon" fill-rule="evenodd" d="${solidPaths[name]}"/>`:''}</svg>`}
function paletteFor(direction,settings){const key=settings.palette==='direction'?(settings.foundation==='selected'&&direction.id==='grove'?'blue':direction.id):settings.palette;const p=[...colors[key][settings.appearance==='light'?'light':'dark']];if(settings.appearance==='amoled'){p[0]='#000000';p[1]='#10110f'}return p}
// Synthetic values named after existing CustomTheme fields; no Android extraction or storage.
function themeFixtureFor(direction,settings){const p=paletteFor(direction,settings),dark=settings.appearance!=='light';return {
 backgroundColor:p[0],cardViewBackgroundColor:p[1],readPostCardViewBackgroundColor:p[1],commentBackgroundColor:p[1],
 primaryTextColor:p[2],secondaryTextColor:p[3],postTitleColor:p[2],postContentColor:p[2],readPostTitleColor:p[3],readPostContentColor:p[3],commentColor:p[2],
 postIconAndInfoColor:p[3],commentIconAndInfoColor:p[3],dividerColor:p[4],colorAccent:p[5],colorPrimary:p[6],colorPrimaryLightTheme:p[5],buttonTextColor:p[7],
 toolbarPrimaryTextAndIconColor:p[2],bottomAppBarBackgroundColor:p[6],bottomAppBarIconColor:p[5],primaryIconColor:p[5],linkColor:p[5],flairTextColor:p[5],
 upvoted:dark?'#ffc09a':'#9b2d07',downvoted:dark?'#c4c0ff':'#424384',mediaIndicatorBackgroundColor:'#101413',mediaIndicatorIconColor:'#ffffff'
}}
function tokens(direction,settings,fixture){const p=paletteFor(direction,settings),t=fixture||themeFixtureFor(direction,settings),s=styleFor(direction,settings),dark=settings.appearance!=='light';return {
 '--canvas':t.backgroundColor,'--card':t.cardViewBackgroundColor,'--ink-token':t.primaryTextColor,'--fg':t.primaryTextColor,'--secondary':t.secondaryTextColor,'--outline':t.dividerColor,'--accent-token':t.colorAccent,'--accent':t.colorAccent,'--container':t.colorPrimary,'--on-accent':t.buttonTextColor,'--focus':t.colorAccent,
 '--post-title':t.postTitleColor,'--post-content':t.postContentColor,'--read-title':t.readPostTitleColor,'--read-content':t.readPostContentColor,'--read-card':t.readPostCardViewBackgroundColor,'--comment-card':t.commentBackgroundColor,'--comment-text':t.commentColor,'--post-info':t.postIconAndInfoColor,'--comment-info':t.commentIconAndInfoColor,'--link':t.linkColor,'--flair-text':t.flairTextColor,'--upvote':t.upvoted,'--downvote':t.downvoted,'--button-bg':t.colorPrimaryLightTheme,'--button-fg':t.buttonTextColor,'--media-badge':t.mediaIndicatorBackgroundColor,'--media-badge-text':t.mediaIndicatorIconColor,
 '--error':dark?'#ffb4a8':'#a32d21','--error-container':dark?'#49251f':'#ffede8','--scheme':dark?'dark':'light',
 '--card-radius':s.shape[0]+'px','--control-radius':s.shape[1]+'px','--sheet-radius':s.shape[2]+'px','--thumb-radius':s.shape[3]+'px',
 '--heading-font':s.heading,'--heading-weight':s.weight,'--title-weight':s.title,'--icon-stroke':s.stroke,'--section-space':s.space+'px','--scale':settings.text,
 '--title-font':s.heading,'--title-size':settings.foundation==='original'&&direction.id==='hearth'?'16px':'15px','--title-leading':settings.foundation==='original'&&direction.id==='hearth'?'1.2':'1.28',
 '--chrome':settings.foundation==='selected'?t.colorPrimary:direction.id==='grove'?p[5]:p[1],'--on-chrome':settings.foundation==='selected'?t.toolbarPrimaryTextAndIconColor:direction.id==='grove'?p[7]:p[2],
 '--bottom-bg':settings.foundation==='selected'?t.bottomAppBarBackgroundColor:direction.id==='grove'?p[5]:p[1],'--bottom-icon':settings.foundation==='selected'?t.bottomAppBarIconColor:direction.id==='grove'?p[7]:p[2]
}}
function setStyleAttributes(root,direction,settings){root.dataset.foundation=direction.id;root.dataset.foundationMode=settings.foundation;root.dataset.iconStyle=settings.foundation==='selected'||direction.id==='grove'?'solid':direction.id==='stone'?'outline-square':'outline'}
const iconActions={'vote-up':'up','post-vote-up':'up','comment-vote-up':'up','vote-down':'down','post-vote-down':'down','comment-vote-down':'down','post-details':'comments','external':'external','more-row':'more','options':'more','post-more':'more','comment-more':'more','search':'search','back':'back','exit-media':'back','hide-controls':'close','close-composer':'close'};
function decorate(doc){
 // Replace icon-only artwork, retaining button labels, semantics and all event handlers.
 for(const button of doc.querySelectorAll('[data-action]')){
  if(button.dataset.foundationIcon)continue;
  const action=button.dataset.action,key=iconActions[action];
  const toolbar=button.closest('.row-toolbar');
  const nav=button.querySelector('.nav-icon');
  let chosen=key;
  if(toolbar&&action==='save')chosen='save';
  if(nav)chosen={home:'home',communities:'grid',saved:'save'}[action];
  if(!chosen)continue;
  // Keep text alongside icons on media, comment and post actions. Collapse −/+ stays intact.
  const iconOnly=toolbar||nav||['search','back','exit-media','hide-controls','options','post-more','comment-more','close-composer'].includes(action);
  if(nav)nav.innerHTML=icon(chosen);
  else if(iconOnly)button.innerHTML=icon(chosen);
  button.dataset.foundationIcon='true';
 }
}
global.RelaxeStudyTheme={decorate,directions,colors,selectedFoundation,styleFor,icon,paletteFor,themeFixtureFor,tokens,setStyleAttributes};
})(window);
