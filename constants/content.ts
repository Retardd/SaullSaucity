export const server = { name:'Ꚃ𝑜𝓊𝓁     Ꚃ𝑜𝒸𝒾𝑒𝓉𝓎 | ࣪ ִֶָ☾.', tagline:'A quiet realm for souls who choose their own path.', invite:'https://discord.gg/p9YpD7f5p5', online:'1,284', members:'8,621' };
export const nav = [{href:'/',label:'Home'},{href:'/rules',label:'Rules'},{href:'/staff',label:'Staff'},{href:'/members',label:'Souls'},{href:'/join',label:'Discord'},{href:'/faq',label:'FAQ'}];
export const stats = [{value:'8.6K',label:'kindred souls'},{value:'1.2K',label:'online now'},{value:'24/7',label:'sanctuary open'}];
export const features = [{title:'A refined circle',text:'Conversations with patience, intention, and a little mystery.'},{title:'Events with soul',text:'Quiet screenings, games, and gatherings made to remember.'},{title:'A place to belong',text:'Find your division, your people, and room to become more.'}];
export const rules = [
  {title:'🤝・1. Respect Everyone',text:'Treat everyone with kindness and respect. Harassment, hate speech, discrimination, or personal attacks are not tolerated.'},
  {title:'💬・2. Keep It Friendly',text:"Friendly banter is encouraged, but don't take it too far. Know your limits and respect others."},
  {title:'🚫・3. No Spam',text:"Don't spam messages, emojis, GIFs, mentions, or voice channels."},
  {title:'🗂️・4. Use the Correct Channels',text:'Keep conversations in the appropriate channels to help keep the server organized.'},
  {title:'🔞・5. Keep It Safe',text:'No NSFW, gore, or other inappropriate content. Keep the server comfortable for everyone.'},
  {title:'📢・6. No Advertising',text:"Don't promote other Discord servers, social media, or businesses without staff approval."},
  {title:'🛡️・7. No Scams or Malicious Content',text:'No phishing, scams, malicious links, or anything that could harm other members.'},
  {title:'🎙️・8. Voice Chat Etiquette',text:'Avoid screaming, mic spamming, soundboards, loud music, or intentionally disturbing others.'},
  {title:'📖・9. Follow Discord ToS',text:"All members must follow Discord's Terms of Service and Community Guidelines."},
  {title:'👮・10. Respect the Staff',text:'Please listen to moderators and admins. If you have concerns, discuss them respectfully in DMs or through a support ticket.'}
];
export type StaffMember = { name:string; user:string; description:string; role:string; tone:string; avatar:string | null };
export const staff: StaffMember[] = [
  {name:'K3',user:'@krishdesh.k3',description:'Ichigo of our community',role:'Owner',tone:'from-violet-300 to-fuchsia-700',avatar:'/Pics/k3.jpg'},
  {name:'Luffy',user:'@l_l_anup__007',description:'Yoruichi of our community',role:'Shadow Owner',tone:'from-slate-200 to-violet-700',avatar:'/Pics/luffy.jpg'},
  {name:'Sevann',user:'@Kaiiner.fr',description:'Rukia lover',role:'Shadow Founder',tone:'from-pink-200 to-purple-800',avatar:'/Pics/Sevann.jpg'},
  {name:'Chachaa',user:'@devcreative01',description:'Yhwach of our community',role:'Sr. Admin',tone:'from-purple-200 to-violet-800',avatar:'/Pics/chachaa.jpg'},
  {name:'Prime',user:'@realprim3_',description:'Shunsui of our community',role:'Admin',tone:'from-zinc-200 to-purple-800',avatar:'/Pics/Prime.jpg'},
  {name:'Law',user:'@*veryweird',description:'Kenpachi of our community',role:'Moderator',tone:'from-violet-200 to-fuchsia-900',avatar:'/Pics/Law.jpg'},
];
export type Soul = { name:string; user:string; description:string; role:'Special Souls'; tone:string; avatar:string | null };
export const members: Soul[] = [
  {name:'Abhinav',user:'@Abhi_nav148',description:'',role:'Special Souls',tone:'from-violet-300 to-fuchsia-700',avatar:'/Pics/abhinav.jpg'},
  {name:'Alone Boy',user:'@js_alone07',description:'',role:'Special Souls',tone:'from-slate-200 to-violet-700',avatar:'/Pics/aloneboy.jpg'},
  {name:'Speedy',user:'@anshhh0069',description:'',role:'Special Souls',tone:'from-pink-200 to-purple-800',avatar:'/Pics/Speedy.jpg'},
  {name:'Redox',user:'@ur._.redox',description:'',role:'Special Souls',tone:'from-purple-200 to-violet-800',avatar:'/Pics/redox.jpg'},
  {name:'Moon',user:'@uskimau',description:'',role:'Special Souls',tone:'from-zinc-200 to-purple-800',avatar:'/Pics/moon.jpg'},
  {name:'Kartik',user:'@Kartik207',description:'',role:'Special Souls',tone:'from-violet-200 to-fuchsia-900',avatar:'/Pics/kartik.jpg'},
  {name:'Jahil doshi',user:'@Jainil_doshi',description:'',role:'Special Souls',tone:'from-indigo-200 to-violet-800',avatar:'/Pics/jahildoshi.jpg'},
  {name:'Srikar',user:'@srikar_293199',description:'',role:'Special Souls',tone:'from-rose-200 to-fuchsia-800',avatar:'/Pics/srikar.jpg'},
  {name:'Jay',user:'@ur._.zexo',description:'',role:'Special Souls',tone:'from-slate-100 to-indigo-800',avatar:'/Pics/Jay.jpg'},
];
export const faqs = [{q:'Who is this community for?',a:'For people who want a thoughtful, welcoming Discord space with an appreciation for anime, art, and genuine conversation.'},{q:'How do I join?',a:'Use the invitation on the Join Us page, read the rules, and introduce yourself when you arrive.'},{q:'Is the server active?',a:'Yes. Our placeholder live widget will be connected to Discord in a future integration phase.'},{q:'How can I contact staff?',a:'Open a support ticket and a member of the team will meet you there.'}];
