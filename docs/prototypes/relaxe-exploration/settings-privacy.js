/* Relaxe for Reddit privacy-policy draft. Review artifact; not an effective published policy. */
(function(){
'use strict';
function el(tag,text){const node=document.createElement(tag);if(text!==undefined)node.textContent=text;return node}
const sections=[
 ['About this policy',[
  'Relaxe for Reddit is an independent client for accessing Reddit. This policy concerns data handled through the app. Reddit and other services have their own privacy policies for information they receive.',
  'Draft status: this text is based on the current application source and planned Relaxe for Reddit presentation. It is not an effective or published privacy policy. The released build and its data flows must be checked before this draft is finalized.'
 ]],
 ['Account access and actions',[
  'When you sign in, the app uses Reddit authorization to access your account and stores account names and authorization tokens on your device. Requests to Reddit can include your searches, selected posts and comments, and actions you choose, such as voting, saving, subscribing, posting or sending a private message. Background notification checks can access messages for signed-in accounts. Android notifications can display authors, titles and message content.',
  'Guest mode does not sign you into a Reddit account. Browsing and media requests still reach external services. Guest preferences and local records are kept separately from signed-in accounts.'
 ]],
 ['Information on your device',[
  'Local data can include account credentials and API configuration, preferences, subscriptions and saved users, filters, local saved items, read-post history, recently visited subreddits and users, search history, navigation positions, downloaded media and cached content. Which records are created depends on the features and settings you use.',
  'Turning off Recently Visited clears that account’s visited subreddit and user list. Turning off read-post recording does not itself clear previously recorded history. Existing account-data management, history limits, cache controls and diagnostic-log deletion handle different categories of local data.',
  'A settings backup can contain sensitive account and preference data, including authorization information. The current backup mechanism creates a password-encrypted archive in a destination you choose. Exported backups and downloaded files may remain in that destination after app data is cleared.'
 ]],
 ['External services and links',[
  'Reddit receives requests needed to browse and act on Reddit content. Media and other features may contact the host serving the content or a configured service. The current source includes integrations for providers such as Imgur, Redgifs and Streamable, and services for archived or recovered content. The final policy must list the integrations enabled in the released build and when each is contacted.',
  'External services can receive network information such as your IP address and the requested URL, plus request data needed for the feature. Opening a link in the in-app browser or another browser sends requests to that website. Sharing content sends the chosen content to the app or destination you select. A configured proxy can also handle your network traffic.',
  'Reddit’s own handling of information is described in its Privacy Policy. A third-party service’s policy governs its handling of information; this app’s policy does not replace those policies.'
 ]],
 ['Permissions and optional features',[
  'Features may request Android permissions, for example to take a photo, show notifications or access a download destination. Requests and access depend on the feature and Android version. You can manage permissions through Android settings. Forgetting a download folder clears its saved location; it does not delete files or by itself revoke an existing Android URI-access grant.',
  'This draft does not promise that all traffic is encrypted, all local storage is encrypted, or all providers avoid tracking. Those claims require a completed release-build and dependency review.'
 ]],
 ['Diagnostics and support',[
  'The current source provides stored crash reports that can be viewed and deleted. Choosing to export a report opens an external issue form with logs and device, Android and app-version details included in the URL. That transfer can occur when the form opens, before you submit an issue. Logs may contain sensitive information.',
  'The final Relaxe for Reddit support destination, exact diagnostic contents, dependency behavior and any automatic telemetry must be reviewed and disclosed before release. This draft makes no blanket claim that no data is collected or transmitted.'
 ]],
 ['Retention, deletion and requests',[
  'Local settings and records have different retention rules. Some remain until you change or clear them; histories and caches may be limited or trimmed. Recently Visited keeps up to 50 subreddits and 50 users per account under the current source behavior. The final policy must specify retention and deletion for each relevant data category.',
  'Removing local records does not delete content or an account held by Reddit, data already received by another service, or exported files outside app storage. Use the relevant service’s controls for its records. Use Guest keeps saved sign-ins available. Logging out or removing a saved sign-in removes its local account record and resume data; associated local records can also be removed, while some account preferences may remain. This does not delete your Reddit account or itself revoke authorization held by Reddit. Final deletion instructions and privacy-request handling must be checked against the release build.'
 ]],
 ['Operator and contact — pending',[
  'Developer or operator: not yet specified.',
  'Public privacy-contact address: not yet specified.',
  'Effective date: not set. No production policy URL has been selected.',
  'Before publication, complete the responsible operator and contact information, applicable privacy-request process, enabled-service and dependency disclosures, retention details, and review against the actual release build. This draft does not establish legal compliance.'
 ]]
];
window.RelaxePrivacyDraft={render(root){
 const notice=el('p','Draft for review · not effective · operator and contact pending');notice.className='compose-notice';root.append(notice);
 for(const [title,paragraphs]of sections){const section=el('section');section.className='settings-group privacy-copy';section.append(el('h3',title));const panel=el('div');panel.className='settings-rows privacy-panel';for(const text of paragraphs)panel.append(el('p',text));section.append(panel);root.append(section)}
 const links=el('section');links.className='settings-group privacy-copy';links.append(el('h3','Related policies'));const panel=el('div');panel.className='settings-rows privacy-panel';for(const [title,href]of [['Reddit Privacy Policy','https://www.reddit.com/policies/privacy-policy'],['Reddit User Agreement','https://redditinc.com/policies/user-agreement']]){const a=el('a',title);a.href=href;a.target='_blank';a.rel='noopener noreferrer';panel.append(a)}links.append(panel);root.append(links);
}};
})();
