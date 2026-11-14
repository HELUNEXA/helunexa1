(() => {
'use strict';
const C=window.HELUNEXA_CONTENT,M=window.AccessModel;

// SUPABASE BAĞLANTISI
const _supabase = supabase.createClient('https://grbjmhknmlheoyknmyhd.supabase.co', 'sb_publishable_lA5YB8KySIyhrLseQV56Kw_cWLCWq7p');

const $=s=>document.querySelector(s),esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icons=['＋','↻','▤','◌','⌕','⌂','♡','▦'];
let state={view:'home',step:0,draft:M.draft(1),records:[],active:null,provider:'merkez',tab:'all',invitation:false};
const module=id=>C.modules.find(x=>x.id===id),draft=()=>state.draft,active=()=>state.records.find(r=>r.id===state.active);

function button(text,action,cls='',attrs=''){return `<button class="button ${cls}" data-action="${action}" ${attrs}>${text}</button>`}
function pill(status){return `<span class="pill ${status}">${M.labels[status]}</span>`}
function chips(label,items,value,key){return `<div class="choice"><span class="label">${label}</span><div class="chips" role="group" aria-label="${label}">${items.map(x=>{const a=typeof x==='string'?{id:x,name:x}:x;return button(esc(a.name),'choice',a.id===value?'chip selected':'chip',`data-key="${key}" data-value="${esc(a.id)}" aria-pressed="${a.id===value}"`)}).join('')}</div></div>`}
function toast(text){$('#toast').textContent=text;$('#toast').classList.add('show');clearTimeout(state.timer);state.timer=setTimeout(()=>$('#toast').classList.remove('show'),4500)}
function go(view){state.view=view;render();window.scrollTo({top:0,behavior:'instant'})}
function brand(){return '<span class="brand-mark">H</span><span>HELUNEXA</span>'}
function header(){const institution=state.view.startsWith('institution');return `<header><div class="header-inner"><a href="#" class="brand" data-action="home">${brand()}</a><nav aria-label="Ana menü">${button('Hizmetler','home',state.view==='home'?'nav active':'nav')}${button('Kurum Girişi','institution','nav secondary')}</nav></div></header>`}

function home(){return `<section class="home-intro"><div class="eyebrow">Sağlık hizmetine daha kolay erişin.</div><h1>Hangi konuda destek arıyorsunuz?</h1><p>Hizmetinizi seçin, size uygun kurumu bulun, talebinizi iletin.</p><div class="service-grid">${C.modules.map(m=>`<button class="service-tile" data-action="start" data-id="${m.id}"><span class="service-icon" aria-hidden="true">${icons[m.id-1]}</span><span>${esc(m.shortTitle)}</span><span class="arrow" aria-hidden="true"></span></button>`).join('')}</div></section><section class="home-feature"><div><div class="eyebrow">Sağlığınıza zaman ayırın.</div><h2>Size uygun hizmet,<br>tercih ettiğiniz yerde.</h2><p>Klinikte hizmet almayı veya uygun tetkikler için evde numune vermeyi tercih edin. Kurumsal programlarda iş yerinde numune alma seçeneğini de keşfedin.</p></div><div class="journey"><div><b>01</b><span>Hizmeti keşfedin</span></div><div><b>02</b><span>Kurumu ve yeri seçin</span></div><div><b>03</b><span>Randevunuzu takip edin</span></div></div></section><div class="home-notes"><p>Uzun form ve belge yükleme yok. Tıbbi değerlendirme ve kesin hizmet kapsamı, seçtiğiniz kurumun kendi sürecinde belirlenir.</p><details><summary>Bu demo nasıl çalışır?</summary><p>Hizmeti seçin, formu doldurun ve talebinizi gönderin. Hekimimiz sizinle iletişime geçecektir.</p></details></div>`}

function info(x){return x.education?`<details class="education"><summary>Neyi değerlendirir?</summary><p>${esc(x.education)}</p>${x.context?`<p class="context"><b>Kimler için görüşülebilir?</b><br>${esc(x.context)}</p>`:x.clinicalNote?`<p class="context">${esc(x.clinicalNote)}</p>`:''}${x.educationSource?`<a href="${esc(x.educationSource.url)}" target="_blank" rel="noopener noreferrer">${esc(x.educationSource.name)} ↗</a>`:''}</details>`:''}
function options(items){return items.map(x=>`<article class="option"><label class="check"><input type="checkbox" data-option="${esc(x.id)}" ${draft().selected.includes(x.id)?'checked':''}><span>${esc(x.name)}</span></label>${info(x)}</article>`).join('')}
function laboratory(){return `<details class="catalog"><summary>Tetkik seçeneklerini inceleyin <span class="quiet">· İsteğe bağlı</span></summary><p class="small muted">10 sağlık başlığında 50 değerlendirme seçeneği.</p>${C.catalogGroups.map(g=>`<details class="option-group"><summary>${esc(g)} <span class="quiet">${C.catalog.filter(x=>x.group===g).length}</span></summary>${options(C.catalog.filter(x=>x.group===g))}</details>`).join('')}</details>`}

function selection(){const d=draft(),m=module(d.moduleId);return `<div class="page-title"><div class="eyebrow">Hizmet seçimi</div><h1>${esc(m.title)}</h1><p>${esc(m.description)}</p></div>${steps()}<section class="panel">${d.moduleId===8?`<h2>Sağlığınıza zaman ayırın.</h2>${chips('Nasıl katılmak istersiniz?',[{id:'employee',name:'Çalışanım'},{id:'corporate',name:'Kurumum için planlıyorum'}],d.audience,'audience')}`:''}${d.moduleId===4?`<h2>Hangi alanlar ilginizi çekiyor?</h2><p class="small muted">İsterseniz seçin; ayrıntıları kurumunuzla görüşebilirsiniz.</p><div class="option-list">${options(C.longevityOptions)}</div>`:d.moduleId===5?`<h2>Tarama seçeneklerini keşfedin.</h2><p class="small muted">Seçtikleriniz kuruma talep olarak iletilir. Hangi taramanın uygun olduğu yaşınız, öykünüz ve önceki sonuçlarınızla birlikte kurumda değerlendirilir.</p>${options(C.cancerOptions)}`:C.quickOptions[d.moduleId]?`<h2>İlgilendiğiniz hizmet</h2><p class="small muted">Bir veya birkaç seçenek işaretleyebilir, seçim yapmadan da devam edebilirsiniz.</p>${options(C.quickOptions[d.moduleId])}`:''}${[1,2,4,8].includes(d.moduleId)?laboratory():''}${d.moduleId===3?'<p class="small muted">Bu başvuru rapor yenilendiği anlamına gelmez. Gerekli hekim değerlendirmesini ve resmî işlemleri kurum yürütür.</p>':''}<div class="selection-summary" aria-live="polite">${d.selected.length?d.selected.length+' seçenek işaretlediniz.':'Seçim yapmadan da kurumlara göz atabilirsiniz.'}</div><p class="small muted">Tetkik ve hizmet seçimleri, kesinleşmiş tıbbi istem değildir.</p></section>${bottom('Kurumları gör','next')}`}

function steps(){return `<ol class="steps">${['Hizmet','Kurum ve yer','Talep'].map((x,i)=>`<li class="${i<=state.step?'active':''}" ${i===state.step?'aria-current="step"':''}><span>${i+1}</span>${x}</li>`).join('')}</ol>`}
function bottom(label,action){return `<div class="bottom-actions">${button('Geri','back','ghost')}${button(label+' <span aria-hidden="true">→</span>',action,'primary')}</div>`}

function locationScreen(){const d=draft(),list=M.providers(C,d);return `<div class="page-title"><div class="eyebrow">${esc(module(d.moduleId).shortTitle)}</div><h1>Size uygun kurum ve yer.</h1><p>Tercihinize göre hizmet sunan örnek kurumları karşılaştırın.</p></div>${steps()}<section class="panel filters">${chips('Bulunduğunuz bölge',[{id:'Merkez',name:'Merkez'},{id:'Kuzey',name:'Kuzey'},{id:'Güney',name:'Güney'}],d.area,'area')}${chips(d.moduleId===6?'Hizmet yeri':'Hizmet / numune alma tercihi',M.modes(d.moduleId,d.audience).map(id=>({id,name:M.modeLabels[id]})),d.mode,'mode')}</section><div class="result-heading"><h2>${list.length} kurum seçeneği</h2></div><div class="provider-grid">${list.length?list.map(p=>`<article class="provider-card ${d.providerId===p.id?'chosen':''}"><div class="provider-top"><span class="provider-logo" aria-hidden="true">${p.name[0]}</span><span class="pill neutral">${esc(p.tag)}</span></div><h3>${esc(p.name)}</h3><p class="provider-location">${esc(p.area)} · Örnek uzaklık ${p.distances[d.area].toLocaleString('tr-TR')} km</p><div class="provider-facts"><div><span>Dönüş hedefi</span><strong>${esc(p.response)}</strong></div><div><span>Ücret</span><strong>${esc(p.fee)}</strong></div></div>${button(d.providerId===p.id?'Seçildi ✓':'Bu kurumu seç','provider',d.providerId===p.id?'primary full':'full',`data-id="${p.id}" aria-pressed="${d.providerId===p.id}"`)}</article>`).join(''):`<section class="panel"><h3>Bu tercihle örnek kurum bulunamadı.</h3><p>Bölgeyi veya hizmet yerini değiştirebilirsiniz.</p></section>`}</div>${bottom('Talebimi gözden geçir','next')}`}

function selectionTags(record){const names=M.allOptions(C,record.moduleId);return record.selected.length?`<div class="tags">${record.selected.map(id=>`<span>${esc(names.find(x=>x.id===id)?.name||id)}</span>`).join('')}</div>`:'<p class="small muted">Genel hizmet başvurusu · Ayrıntılar kurumla netleştirilecek.</p>'}

function requestScreen(){const d=draft(),p=C.providers.find(x=>x.id===d.providerId);return `<div class="page-title"><div class="eyebrow">Son adım</div><h1>Talebiniz hazır.</h1><p>Tercihinizi iletin; kurumunuz kapsamı ve randevuyu sizinle netleştirsin.</p></div>${steps()}<div class="two-col"><section class="panel"><div class="eyebrow">${esc(module(d.moduleId).shortTitle)}</div><h2>${esc(p.name)}</h2><p>${esc(M.modeLabels[d.mode])} · ${esc(d.area)}</p>${selectionTags(d)}${chips(d.audience==='corporate'?'Tercih edilen program günü':'Tercih ettiğiniz gün',[2,3,5].map(n=>({id:M.day(n),name:M.formatDate(M.day(n))})),d.day,'day')}${chips('Tercih ettiğiniz zaman',['Sabah','Öğleden sonra'],d.period,'period')}</section><aside class="panel soft"><h3>${d.audience==='corporate'?'İletişim yetkilisi':'Size nasıl ulaşalım?'}</h3><p class="small muted">Lütfen adınızı ve telefon numaranızı girin.</p><div class="contact-fields"><label for="contact-name">Ad soyad</label><input id="contact-name" data-contact="name" type="text" value="${esc(d.contact.name)}" placeholder="Örn. Deniz Örnek" required><label for="contact-phone">Telefon numarası</label><input id="contact-phone" data-contact="phone" type="tel" value="${esc(d.contact.phone)}" placeholder="05xx xxx xx xx" required><p id="contact-error" class="field-error" role="alert"></p></div></aside></div>${bottom('Talebimi ilet','submit')}`}

function booking(){return state.step===0?selection():state.step===1?locationScreen():requestScreen()}

function recordDetail(r){return `<div class="page-title"><div class="eyebrow">${esc(r.id)}</div><h1>Talebiniz Alındı!</h1><p>Kurumunuz en kısa sürede sizinle iletişime geçecek.</p></div><div class="two-col"><section class="panel">${pill(r.status)}<h2 class="mt">${esc(r.providerName)}</h2><p>${esc(M.modeLabels[r.mode])} · ${esc(r.area)}</p>${selectionTags(r)}</section><aside><section class="panel soft"><h3>İletişim</h3><p>${esc(r.person.name)}<br>${esc(r.person.phone)}</p></section></aside></div><div class="button-row">${button('Ana Sayfaya Dön','home','ghost')}</div>`}

function render(){clearTimeout(state.timer);$('#toast').classList.remove('show');let body=state.view==='home'?home():state.view==='booking'?booking():state.view==='detail'?recordDetail(active()):home();$('#app').innerHTML=header()+`<main id="main">${body}</main><footer><span>HELUNEXA · Kurgusal kurumlar ve veriler</span>${button('Demoyu sıfırla','reset','text')}</footer>`}
function update(fn){const r=active(),next=fn(r);state.records=state.records.map(x=>x.id===r.id?next:x);render()}
function start(id,audience){state.draft=M.draft(Number(id),Number(id)===8?(audience||'employee'):'individual');state.step=0;go('booking')}

document.addEventListener('click',e=>{
    const el=e.target.closest('[data-action]');if(!el)return;e.preventDefault();const a=el.dataset.action;
    try{
        if(a==='home')go('home');
        else if(a==='start')start(el.dataset.id);
        else if(a==='back'){if(state.step===0)go('home');else{state.step--;go('booking')}}
        else if(a==='next'){
            if(state.step===1&&!M.providers(C,draft()).some(p=>p.id===draft().providerId))throw Error('Devam etmek için bir kurum seçin.');
            state.step=Math.min(2,state.step+1);go('booking')
        }
        else if(a==='choice'){const k=el.dataset.key,v=el.dataset.value;state.draft=M.filter(C,draft(),{[k]:k==='groupSize'?Number(v):v});render()}
        else if(a==='provider'){state.draft={...draft(),providerId:el.dataset.id};render()}
        else if(a==='submit'){
            const error=document.getElementById('contact-error');if(error)error.textContent='';
            try{
                M.contactInfo(draft().contact); // Validasyon
                const r=M.request(C,draft(),state.records); // Model oluşturma
                
                // SUPABASE'E KAYIT (Eski formata uygun)
                el.disabled = true; el.textContent = 'Gönderiliyor...';
                window._supabase.from('applications').insert([{
                    fullname: r.person.name,
                    phone: r.person.phone,
                    service_type: module(draft().moduleId).title,
                    test_notes: draft().selected.length > 0 ? 'Seçilenler: ' + draft().selected.join(', ') : 'Genel Başvuru',
                    appointment_date: draft().day,
                    status: 'pending',
                    age: 30
                }]).then(({error})=>{
                    if(error){ alert('Supabase Hatası: ' + error.message); el.disabled = false; el.textContent = 'Talebimi ilet →'; return; }
                    
                    state.records.push(r);state.active=r.id;go('detail');
                    toast('Talebiniz başarıyla iletildi.');
                });
            }catch(err){
                if(error)error.textContent=err.message; throw err;
            }
        }
        else if(a==='reset'){if(confirm('Sıfırlansın mı?')){state.records=[];state.active=null;state.step=0;go('home')}}
    }catch(err){toast(err.message)}
});

document.addEventListener('input',e=>{const key=e.target.dataset.contact;if(!['name','phone'].includes(key))return;state.draft.contact[key]=e.target.value;const error=document.getElementById('contact-error');if(error)error.textContent='';});
document.addEventListener('change',e=>{if(!e.target.dataset.option)return;try{state.draft=M.option(C,draft(),e.target.dataset.option);document.querySelectorAll('[data-option]').forEach(x=>{if(x.dataset.option===e.target.dataset.option)x.checked=e.target.checked});document.querySelectorAll('.selection-summary').forEach(x=>x.textContent=draft().selected.length?draft().selected.length+' seçenek işaretlediniz.':'Seçim yapmadan da kurumlara göz atabilirsiniz.')}catch(err){toast(err.message)}});
render();
})();