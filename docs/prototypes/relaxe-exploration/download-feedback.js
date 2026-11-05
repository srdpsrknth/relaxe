/* Study 30: missing-location presentation only. No storage, settings writes or jobs. */
(function(){
'use strict';
const E=id=>document.getElementById(id),T=window.RelaxeStudyTheme,config={appearance:'light',palette:'blue',text:'1',width:'390'};
let showing=false;
function theme(){const settings={foundation:'selected',...config},direction=T.directions[0],phone=E('setup-phone');for(const [key,value]of Object.entries(T.tokens(direction,settings)))phone.style.setProperty(key,value);T.setStyleAttributes(phone,direction,settings);phone.style.setProperty('--w',config.width+'px');phone.style.setProperty('--h',({360:800,390:844,600:960,720:480}[config.width])+'px');phone.dataset.largeText=String(+config.text>=2);window.RelaxeShell?.setContext({account:E('setup-account').value,subreddit:'hiking',...config})}
function render(){
 const copy='Set the '+E('setup-location').value+' location in Settings, then try the download again.';
 E('setup-notice-copy').textContent=copy;
 E('setup-account-label').textContent=E('setup-account').value==='guest'?'Viewing as Guest':'Viewing as u/weekendreader';
 E('setup-notice').hidden=!showing;
}
function show(){showing=true;E('setup-result').hidden=true;render();E('setup-notice').scrollIntoView({block:'nearest'})}
function dismiss(){showing=false;render();E('setup-try').focus({preventScroll:true})}
function settings(){const destination=E('setup-location').value;dismiss();E('setup-result').hidden=false;E('setup-result').textContent='Route preview: Settings → Download locations ('+destination+'). No folder was set and no download was started.';E('setup-feedback').textContent=E('setup-result').textContent;E('setup-result').scrollIntoView({block:'nearest'})}
for(const [id,key]of [['setup-appearance','appearance'],['setup-palette','palette'],['setup-scale','text'],['setup-width','width']])E(id).addEventListener('change',event=>{config[key]=event.target.value;theme()});
for(const id of ['setup-location','setup-account'])E(id).addEventListener('change',()=>{E('setup-feedback').textContent='Inline missing-folder notice selected.';theme();show()});
E('setup-try').addEventListener('click',show);E('setup-dismiss').addEventListener('click',dismiss);E('setup-inline-settings').addEventListener('click',settings);
theme();show();document.addEventListener('relaxe-shell-ready',()=>{theme();render()},{once:true});
})();
