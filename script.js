// TikTok Beta page
function openTTBeta(){
  document.getElementById('ttbetaPage').style.display='block';
  document.body.style.overflow='hidden';
}
function closeTTBeta(){
  document.getElementById('ttbetaPage').style.display='none';
  document.body.style.overflow='';
}
// Nav
window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('scrolled',scrollY>60),{passive:true});

// Mobile menu
function openMob(){document.getElementById('mob').classList.add('open');document.body.style.overflow='hidden'}
function closeMob(){document.getElementById('mob').classList.remove('open');document.body.style.overflow=''}

// Tab filter
function ft(cat,btn){
  document.getElementById('searchInput').value='';
  document.querySelectorAll('.tab').forEach(b=>b.classList.remove('on'));btn.classList.add('on');
  document.querySelectorAll('.prod-card').forEach(c=>{
    if(c.classList.contains('co-hidden'))return;
    const show=cat==='all'||c.dataset.c===cat;
    if(show){c.style.display='';requestAnimationFrame(()=>{c.style.opacity='1';c.style.transform='none'})}
    else{c.style.opacity='0';c.style.transform='translateY(10px)';setTimeout(()=>{if(c.style.opacity==='0')c.style.display='none'},260)}
  });
  const cr=document.getElementById('viewCoursesRow');
  if(cr)cr.style.display=(cat==='all'||cat==='co')?'':'none';
}

// Search products
function searchProducts(q){
  const s=q.toLowerCase().trim();
  if(!s){document.querySelectorAll('.prod-card:not(.co-hidden)').forEach(c=>c.style.display='');return;}
  document.querySelectorAll('.prod-card:not(.co-hidden)').forEach(c=>{
    const title=(c.querySelector('.prod-title')||{}).textContent||'';
    const cat=(c.querySelector('.prod-cat')||{}).textContent||'';
    const desc=(c.querySelector('.prod-desc')||{}).textContent||'';
    const match=title.toLowerCase().includes(s)||cat.toLowerCase().includes(s)||desc.toLowerCase().includes(s);
    c.style.display=match?'':'none';
  });
}

// Show all 17 courses
function showAllCourses(){
  document.querySelectorAll('.co-hidden').forEach((el,i)=>{
    setTimeout(()=>{
      el.classList.remove('co-hidden');
      el.style.display='';
      el.classList.add('rv');
      requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('in')));
    },i*55);
  });
  const r=document.getElementById('viewCoursesRow');if(r)r.style.display='none';
}

// Payment modal
function openPay(name,price){
  document.getElementById('modalName').textContent=name;
  document.getElementById('modalPrice').textContent=price;
  const msg=`Salam KuzeyAcademy! 💳 I have completed payment for *${name}* (${price}). Please find proof of payment attached. Kindly confirm my order. Thank you! 🙏`;
  document.getElementById('modalWaBtn').onclick=()=>window.open('https://wa.me/212699780703?text='+encodeURIComponent(msg),'_blank');
  document.getElementById('modalBg').classList.add('open');
  document.body.style.overflow='hidden';
}
function closePay(e){
  if(!e||e.target===document.getElementById('modalBg')){
    document.getElementById('modalBg').classList.remove('open');
    document.body.style.overflow='';
  }
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closePay()});

// Copy
function copyText(txt,btn){
  navigator.clipboard.writeText(txt).catch(()=>{
    const t=document.createElement('textarea');t.value=txt;document.body.appendChild(t);t.select();document.execCommand('copy');document.body.removeChild(t);
  });
  if(btn){const orig=btn.textContent;btn.textContent='✓';setTimeout(()=>btn.textContent=orig,1500)}
}

// Review submit
function subReview(){
  const n=document.getElementById('rn').value.trim();
  const co=document.getElementById('rcn').value.trim();
  const pr=document.getElementById('rp').value;
  const tx=document.getElementById('rtx').value.trim();
  const re=document.querySelector('input[name="rt"]:checked');
  if(!n||!tx||!re){alert('Please fill name, rating, and review.');return}
  const r=parseInt(re.value);
  const st='★'.repeat(r)+'☆'.repeat(5-r);
  const init=n.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
  const card=document.createElement('div');card.className='rev-card rv in';
  card.innerHTML=`<div class="stars">${st}</div><p class="rev-text">"${tx}${pr?' — Bought: '+pr:''}"</p><div class="rev-author"><div class="rev-av">${init}</div><div><div class="rev-name">${n}</div><div class="rev-loc">${co||'Anonymous'}</div></div></div>`;
  document.getElementById('rc').prepend(card);
  ['rn','rcn','rtx'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('rp').value='';
  document.querySelectorAll('input[name="rt"]').forEach(r=>r.checked=false);
  const ok=document.getElementById('ok');ok.style.display='block';setTimeout(()=>ok.style.display='none',3500);
}

// View more reviews
function showMoreReviews(){
  document.querySelectorAll('.rev-hidden').forEach((el,i)=>{
    setTimeout(()=>{
      el.classList.remove('rev-hidden');
      el.classList.add('rv');
      requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('in')));
    },i*80);
  });
  document.getElementById('viewMoreBtn').closest('.view-more-wrap').style.display='none';
}

// Scroll reveal
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -24px 0px'});
document.querySelectorAll('.rv').forEach(el=>ro.observe(el));

// Counters
function cnt(el,t,s){let v=0;const st=Math.ceil(t/55);const iv=setInterval(()=>{v=Math.min(v+st,t);el.textContent=v.toLocaleString()+s;if(v>=t)clearInterval(iv)},28)}
const cobs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){cnt(document.getElementById('c1'),2000,'+');cnt(document.getElementById('c2'),13,'');cnt(document.getElementById('c3'),30,'+');cobs.disconnect()}})},{threshold:.3});
const hs=document.querySelector('.hero-stats');if(hs)cobs.observe(hs);

// Toast
const toastData=[
  {name:'Ahmed M.',loc:'Casablanca 🇲🇦',product:'Netflix Premium',init:'AM',mins:2},
  {name:'Sara K.',loc:'Rabat 🇲🇦',product:'ChatGPT Plus',init:'SK',mins:5},
  {name:'Youssef B.',loc:'Marrakech 🇲🇦',product:'Canva Pro Lifetime',init:'YB',mins:1},
  {name:'Fatima Z.',loc:'Casablanca 🇲🇦',product:'Spotify Premium',init:'FZ',mins:8},
  {name:'Khalid R.',loc:'Agadir 🇲🇦',product:'NordVPN',init:'KR',mins:3},
  {name:'Nadia H.',loc:'Tangier 🇲🇦',product:'CapCut Pro',init:'NH',mins:6},
  {name:'Omar S.',loc:'Fes 🇲🇦',product:'IPTV Premium',init:'OS',mins:4},
  {name:'Imane L.',loc:'Oujda 🇲🇦',product:'TOD TV',init:'IL',mins:2},
  {name:'Anas T.',loc:'Meknes 🇲🇦',product:'TikTok 10K Account',init:'AT',mins:7},
  {name:'Zineb A.',loc:'Tetouan 🇲🇦',product:'Gemini Pro',init:'ZA',mins:3},
  {name:'Hamza D.',loc:'Safi 🇲🇦',product:'Shahid VIP',init:'HD',mins:5},
  {name:'Loubna M.',loc:'Kenitra 🇲🇦',product:'TikTok 50K Account',init:'LM',mins:1},
  {name:'Rachid O.',loc:'Dubai 🇦🇪',product:'ChatGPT Plus',init:'RO',mins:9},
  {name:'Hind B.',loc:'Paris 🇫🇷',product:'Netflix Premium',init:'HB',mins:4},
  {name:'Mehdi C.',loc:'Casablanca 🇲🇦',product:'Dropshipping Course',init:'MC',mins:6},
  {name:'Samia N.',loc:'Rabat 🇲🇦',product:'CapCut Pro',init:'SN',mins:2},
  {name:'Bilal Y.',loc:'Marrakech 🇲🇦',product:'Canva Pro Lifetime',init:'BY',mins:3},
  {name:'Kenza F.',loc:'Agadir 🇲🇦',product:'NordVPN',init:'KF',mins:8},
];
let toastIdx=0;
const toastEl=document.getElementById('toastPopup');
function showToast(){
  const d=toastData[toastIdx%toastData.length];toastIdx++;
  document.getElementById('toastAv').textContent=d.init;
  document.getElementById('toastName').textContent=d.name+' · '+d.loc;
  document.getElementById('toastProduct').textContent=d.product;
  document.getElementById('toastTime').textContent=d.mins+'m ago';
  // Update the href so clicking opens correct WA message
  const msg='Salam KuzeyAcademy! 👋 I saw someone just bought *'+d.product+'*. I\'m also interested! Please send me details and pricing. Thank you!';
  toastEl.href='https://wa.me/212648036662?text='+encodeURIComponent(msg);
  toastEl.classList.add('show');
  setTimeout(()=>toastEl.classList.remove('show'),4500);
}
setTimeout(()=>{showToast();setInterval(showToast,20000)},4000);
