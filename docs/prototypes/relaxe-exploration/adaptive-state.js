/* Study 40 / revision 140. Readability heuristics, not Android dp breakpoints or persistence. */
(function(root){
'use strict';
function layout({width,height,text=1,ime=0,hinge=0,selected=null,media=false,mediaReader=false,family='compact',preferredColumns=2,hideNavigation=false}){
 const scale=Math.max(1,Math.min(2,Number(text)||1)),w=Math.max(0,Number(width)||0),h=Math.max(0,(Number(height)||0)-(Number(ime)||0));
 const rail=!media&&!hideNavigation&&w>=720&&h>=420,navWidth=rail?(scale>=1.5?112:88):0,content=Math.max(0,w-navWidth-Math.max(0,hinge));
 const feedMin=Math.round(360*(1+(scale-1)*.55)),readerMin=Math.round(480*(1+(scale-1)*.65));
 const split=!!selected&&!media&&family!=='vertical'&&content>=feedMin+readerMin+24&&h>=520+80*(scale-1);
 const feedWidth=split?Math.max(feedMin,Math.min(content*.42,560)):content;
 const columns=family==='gallery'?Math.max(2,preferredColumns):feedWidth>=2*feedMin+16?preferredColumns:1;
 return {rail,split,content,feedWidth,readerWidth:split?content-feedWidth-24:content,columns,feedVisible:media&&!mediaReader||!selected||split,readerVisible:!!selected&&(!media||mediaReader),height:h,navWidth,reason:media?'Focused media/reader':!selected?'Choose a post to open the reader':split?'Feed and reader fit side by side':'One screen preserves readable space'};
}
function create(initial={}){let value={width:1280,height:900,text:1,ime:0,hinge:0,selected:null,media:false,family:'compact',preferredColumns:2,opens:0,...initial};return {configure(patch){const selected=value.selected,opens=value.opens;value={...value,...patch,selected,opens};return this.snapshot()},open(post){if(!['p1','p2','p3','p4','p5'].includes(post))return this.snapshot();value.selected=post;value.mediaReader=!!value.media;value.opens++;return this.snapshot()},close(){value.selected=null;value.mediaReader=false;return this.snapshot()},snapshot(){return {...value,effective:layout(value)}}}}
root.RelaxeAdaptiveState={layout,create};
})(typeof window==='undefined'?globalThis:window);
