/* Shared, page-memory preset library. Native preferences and active snapshots stay elsewhere. */
(function(){
'use strict';
const copy=value=>JSON.parse(JSON.stringify(value));
window.RelaxeLayoutLibrary={create(definitions){
 let sequence=0;const entries=new Map(),sources=new Map();
 function project(family,settings){if(!definitions[family])throw Error('Unknown layout family');return Object.fromEntries(Object.entries(definitions[family]).map(([key,value])=>[key,settings[key]??value]))}
 function nameError(name,family,except){if(!name.trim())return 'Enter a layout name.';if(name.trim().length>64)return 'Use 64 characters or fewer.';if([...entries.values()].some(item=>item.id!==except&&item.family===family&&item.title.toLocaleLowerCase()===name.trim().toLocaleLowerCase()))return 'That layout name is already used in this family.';return ''}
 return{
  list(){return copy([...entries.values()])},get(id){return entries.has(id)?copy(entries.get(id)):null},
  save(name,family,settings){const error=nameError(name,family);if(error)throw Error(error);const snapshot=project(family,settings),id='layout-copy-'+(++sequence),item={id,title:name.trim(),family,settings:snapshot};entries.set(id,item);return copy(item)},
  rename(id,name){const item=entries.get(id);if(!item)throw Error('This saved layout is unavailable.');const error=nameError(name,item.family,id);if(error)throw Error(error);item.title=name.trim();return copy(item)},
  remove(id){if(!entries.delete(id))throw Error('This saved layout is unavailable.');for(const [key,source]of sources)if(source===id)sources.delete(key)},
  mark(key,id){if(id&&entries.has(id))sources.set(key,id);else sources.delete(key)},
  label(key,settings){const item=entries.get(sources.get(key));if(!item)return 'Custom appearance';return Object.keys(definitions[item.family]).every(key=>settings[key]===item.settings[key])?item.title:'Custom appearance'},
  project
 }
}};
window.RelaxeLayoutLibraryView={render(root,options){
 const section=document.createElement('section');section.className='settings-group';section.dataset.group='Saved layouts';
 const title=document.createElement('h3');title.textContent='Saved layouts';section.append(title);
 const help=document.createElement('p');help.className='field-help';help.textContent='Shared on this device · including Guest. Open a copy to preview; Use layout applies only to '+options.target+'.';section.append(help);
 const rows=document.createElement('div');rows.className='settings-rows layout-library-rows';section.append(rows);
 for(const item of options.entries){
  const row=document.createElement('div');row.className='layout-library-row';
  const open=document.createElement('button');open.type='button';open.className='settings-row';open.dataset.category=item.id;open.dataset.layoutOpen=item.id;
  const copy=document.createElement('span'),name=document.createElement('strong'),description=document.createElement('small');name.textContent=item.title;description.textContent=options.familyName(item.family)+' · Preview and customize';copy.append(name,description);open.append(copy);open.addEventListener('click',()=>options.open(item.id));
  const manage=document.createElement('button');manage.type='button';manage.className='layout-library-options';manage.textContent='Options';manage.dataset.layoutOptions=item.id;manage.setAttribute('aria-label','Options for '+item.title);manage.setAttribute('aria-haspopup','dialog');manage.setAttribute('aria-controls','layout-library-dialog');manage.addEventListener('click',()=>options.manage(item.id));row.append(open,manage);rows.append(row);
 }
 if(!options.entries.length){const empty=document.createElement('p');empty.className='field-help';empty.textContent='No saved layouts. Open a family and choose Save as layout to create one.';rows.append(empty)}
 root.append(section);
}};
})();
