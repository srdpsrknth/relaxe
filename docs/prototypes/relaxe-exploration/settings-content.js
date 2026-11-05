/* Study 32 content settings and filter navigation. Synthetic state; no API or native writes. */
(function(){
'use strict';
const accounts=new Map();
const nsfwFields=[
 {key:'_nsfw',title:'Enable NSFW content',default:false,group:'NSFW'},
 {key:'_blur_nsfw',title:'Blur NSFW images',default:true,group:'NSFW'},
 {key:'do_not_blur_nsfw_in_nsfw_subreddits',title:'Do not blur NSFW images in NSFW subreddits',default:false,group:'NSFW'},
 {key:'_blur_spoiler',title:'Blur spoiler images',default:false,group:'Spoilers'}
];
function el(tag,cls,text){const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node}
function group(root,name){const section=el('section','settings-group');section.append(el('h3',null,name));const rows=el('div','settings-rows');section.append(rows);root.append(section);return rows}
function row(rows,title,summary,action){const button=el('button','settings-row');button.type='button';const copy=el('span');copy.append(el('strong',null,title));if(summary)copy.append(el('small',null,summary));const arrow=el('span',null,'›');arrow.setAttribute('aria-hidden','true');button.append(copy,arrow);button.addEventListener('click',action);rows.append(button);return button}
window.RelaxeContentSettings={render(root,account,goBack){
 if(!accounts.has(account))accounts.set(account,Object.fromEntries(nsfwFields.map(field=>[field.key,field.default])));const values=accounts.get(account),controls=new Map();
 root.append(el('p','field-help','Enable NSFW content to change its blur options. Your choices are kept while it is Off. Spoiler blurring is independent.'));
 const feedback=el('p','field-help');feedback.setAttribute('role','status');
 for(const name of ['NSFW','Spoilers']){const rows=group(root,name);for(const item of nsfwFields.filter(field=>field.group===name)){
  const container=el('div','video-setting'),copy=el('div','video-setting-copy'),label=el('label',null,item.title),input=el('button','video-toggle');label.id='content-label-'+item.key;label.htmlFor='content-'+item.key;input.id=label.htmlFor;input.type='button';input.setAttribute('role','switch');input.setAttribute('aria-labelledby',label.id);copy.append(label);container.append(copy,input);rows.append(container);controls.set(item.key,{input,container});
  input.addEventListener('click',()=>{values[item.key]=!values[item.key];sync();feedback.textContent=item.title+': '+(values[item.key]?'On':'Off')+' · preview only.'});
 }}root.append(feedback);
 function sync(){for(const item of nsfwFields){const {input,container}=controls.get(item.key),inactive=item.group==='NSFW'&&item.key!=='_nsfw'&&!values._nsfw;input.disabled=inactive;container.dataset.inactive=String(inactive);input.setAttribute('aria-checked',String(values[item.key]))}}sync();
 const dialog=el('dialog','content-warning');dialog.id='content-warning';dialog.setAttribute('aria-labelledby','content-warning-title');const title=el('h3',null,'Warning');title.id='content-warning-title';
 const message=el('p',null,'Relaxe for Reddit does not promote or recommend NSFW content. Content availability depends on Reddit’s access rules. You must follow the Reddit User Agreement. Review it and the Relaxe for Reddit Privacy Policy before changing these settings. The app’s privacy policy is currently a draft for review.');
 message.id='content-warning-description';dialog.setAttribute('aria-describedby',message.id);
 const links=el('p','content-warning-links');for(const [text,href]of [['Reddit User Agreement','https://redditinc.com/policies/user-agreement'],['Relaxe for Reddit Privacy Policy · draft','settings.html?rev=137&page=privacy&focus=1']]){const link=el('a',null,text);link.href=href;link.target='_blank';link.rel='noopener noreferrer';links.append(link)}
 const actions=el('div','dialog-actions'),decline=el('button',null,'Do not agree'),agree=el('button',null,'Agree');decline.type=agree.type='button';decline.autofocus=true;actions.append(decline,agree);dialog.append(title,message,links,actions);root.append(dialog);
 decline.addEventListener('click',()=>{dialog.close();goBack()});agree.addEventListener('click',()=>{dialog.close();controls.get('_nsfw').input.focus({preventScroll:true});feedback.textContent='Warning acknowledged for this preview only. No agreement or account setting was submitted.'});
 dialog.addEventListener('cancel',event=>event.preventDefault());dialog.addEventListener('keydown',event=>{if(event.key==='Escape')event.stopPropagation()});dialog.showModal();
}};
})();
