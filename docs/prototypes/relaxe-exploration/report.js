/* Study 25. Category-first report fixture. No requests, native payloads or persistence. */
(function(){
'use strict';
const E=id=>document.getElementById(id),T=window.RelaxeStudyTheme;
const config={appearance:'light',palette:'blue',text:'1',width:'390'};
// Representative categories from Continuum's four general reasons plus subreddit rules.
// Spam sub-reasons illustrate the selected flow; native API mappings are unimplemented.
const categories=[
  {id:'rules',label:'Subreddit rules',description:'Choose the r/hiking rule this content breaks.'},
  {id:'spam',label:'Spam',description:'Unwanted or repeated content that disrupts participation.',choices:[['reposting','Excessive reposting'],['advertising','Unwanted advertising'],['other-spam','Other spam']]},
  {id:'abuse',label:'Abusive content',description:'Content that harasses, threatens or directs abuse at others.'},
  {id:'child-abuse',label:'Sexual content involving minors',description:'Content involving the sexual abuse or exploitation of minors.'},
  {id:'copyright',label:'Copyright issue',description:'Content you believe infringes copyright. This report preview is separate from a formal legal takedown request.'}
];
const rules=[['relevant','Keep posts relevant to hiking'],['respect','Be respectful'],['personal','Do not share personal information']];
let stage='category',category=null,selected=null,open=false,target='post',completedReason='';
function theme(){const settings={foundation:'selected',...config},direction=T.directions[0],phone=E('report-phone');for(const [key,value]of Object.entries(T.tokens(direction,settings)))phone.style.setProperty(key,value);T.setStyleAttributes(phone,direction,settings);phone.style.setProperty('--w',config.width+'px');phone.style.setProperty('--h',({360:800,390:844,600:960,720:480}[config.width])+'px');phone.dataset.largeText=String(+config.text>=2);window.RelaxeShell?.setContext({account:'weekendreader',subreddit:'hiking',...config})}
function clearError(){E('report-error').hidden=true;E('report-error').textContent=''}
function headingFocus(){E('report-scroll').scrollTop=0;E('report-instruction').focus({preventScroll:true})}
function addParagraph(text,className='report-description'){const p=document.createElement('p');p.className=className;p.textContent=text;E('report-reasons').append(p)}
function renderChoices(title,items){
  const group=document.createElement('fieldset');group.className='report-reason-group';const legend=document.createElement('legend');legend.textContent=title;group.append(legend);
  for(const [id,text]of items){const label=document.createElement('label');label.className='report-reason';const input=document.createElement('input');input.type='checkbox';input.value=id;input.checked=selected===id;const span=document.createElement('span');span.textContent=text;label.append(input,span);group.append(label);input.addEventListener('change',()=>{selected=input.checked?id:null;for(const choice of group.querySelectorAll('input'))choice.checked=selected===choice.value;clearError()})}
  E('report-reasons').append(group);
}
function render(){
  E('report-phone').dataset.reportStage=stage;E('report-reasons').replaceChildren();
  E('report-back').hidden=stage!=='details';E('report-submit').hidden=stage==='category';
  E('report-submit').textContent=stage==='complete'?'Done':'Submit report';
  E('report-title').textContent=stage==='complete'?'Report preview':'Report '+target;
  E('report-step').textContent=stage==='category'?'Choose a category':stage==='details'?'Review your reason':'Confirmation';
  if(stage==='category'){
    E('report-instruction').textContent='Why are you reporting this '+target+'?';
    const pills=document.createElement('div');pills.className='report-categories';pills.setAttribute('aria-label','Report categories');
    for(const item of categories){const button=document.createElement('button');button.type='button';button.className='report-category';button.dataset.category=item.id;button.textContent=item.label;button.addEventListener('click',()=>{if(category?.id!==item.id)selected=null;category=item;stage='details';clearError();render();headingFocus()});pills.append(button)}
    E('report-reasons').append(pills);addParagraph('Choose the closest match. You can go back and change it before submitting.','report-rule-status');
  }else if(stage==='details'){
    E('report-instruction').textContent=category.label;addParagraph(category.description);
    if(category.id==='rules'){
      if(E('report-rules').value==='ready')renderChoices('Select one rule',rules);
      else addParagraph(({loading:'Loading subreddit rules…',error:'Could not load subreddit rules.',empty:'No subreddit rules returned.'})[E('report-rules').value]+' You can go back to choose a different category.','report-rule-status');
    }else if(category.choices)renderChoices('Which best describes it?',category.choices);
    else addParagraph('Submit this reason, or go back to choose another category.');
  }else{
    E('report-instruction').textContent='Report preview complete';addParagraph('Reason: '+completedReason);addParagraph('Nothing was sent. In the app, a successful submission would be followed by confirmation.');
  }
}
function setOpen(value){open=value;E('report-overlay').hidden=!open;E('report-open').setAttribute('aria-expanded',String(open));for(const child of E('report-phone').children)if(child!==E('report-overlay'))child.inert=open;(open?E('report-close'):E('report-open')).focus({preventScroll:true})}
function start(){stage='category';category=null;selected=null;completedReason='';clearError();E('report-result').hidden=true;render();setOpen(true);E('report-scroll').scrollTop=0}
function changeTarget(){target=E('report-target').value;E('report-open').textContent='Report '+target;E('report-target-title').textContent=target==='post'?'A quiet loop after the rain':'The lower trail is open again. Please stay on the marked path.';E('report-target-author').textContent=(target==='post'?'Post':'Comment')+' by u/trailnotes';start()}
function back(){if(stage!=='details')return;const previous=category.id;stage='category';clearError();render();E('report-scroll').scrollTop=0;E('report-reasons').querySelector('[data-category="'+previous+'"]').focus({preventScroll:true})}
for(const [id,key]of [['report-appearance','appearance'],['report-palette','palette'],['report-scale','text'],['report-width','width']])E(id).addEventListener('change',event=>{config[key]=event.target.value;theme()});
E('report-target').addEventListener('change',changeTarget);
E('report-rules').addEventListener('change',()=>{if(category?.id==='rules'&&E('report-rules').value!=='ready')selected=null;clearError();render()});
E('report-back').innerHTML=T.icon('back');E('report-back').addEventListener('click',back);
E('report-close').innerHTML=T.icon('close');E('report-close').addEventListener('click',()=>setOpen(false));
E('report-open').addEventListener('click',start);
E('report-submit').addEventListener('click',()=>{
  if(stage==='complete'){setOpen(false);return}if(stage!=='details')return;
  if((category.id==='rules'||category.choices)&&!selected){E('report-error').hidden=false;E('report-error').textContent=category.id==='rules'?'Choose a subreddit rule before submitting.':'Choose a more specific reason before submitting.';(E('report-reasons').querySelector('input')||E('report-instruction')).focus();return}
  if(E('report-outcome').value==='error'){E('report-error').hidden=false;E('report-error').textContent='Demo failure: report could not be submitted. Your reason is retained. Nothing was sent.';return}
  const choices=category.id==='rules'?rules:category.choices;
  completedReason=category.label+(choices?' · '+choices.find(([id])=>id===selected)[1]:'');
  stage='complete';clearError();render();headingFocus();E('report-result').textContent='Report preview complete. Nothing was sent.';E('report-result').hidden=false;E('report-feedback').textContent='Confirmation preview reached. No report request was sent; native service side effects are not simulated.';
});
E('report-overlay').addEventListener('click',event=>{if(event.target===E('report-overlay'))setOpen(false)});
E('report-overlay').addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();if(stage==='details')back();else setOpen(false)}if(event.key!=='Tab')return;const items=[...E('report-panel').querySelectorAll('button,input,[tabindex="0"]')].filter(el=>!el.disabled&&el.getClientRects().length),first=items[0],last=items.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}});
const params=new URLSearchParams(location.search);if(params.get('target')==='comment')E('report-target').value='comment';
theme();changeTarget();document.addEventListener('relaxe-shell-ready',()=>{theme();for(const child of E('report-phone').children)if(child!==E('report-overlay'))child.inert=open},{once:true});
})();
