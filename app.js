(() => {
'use strict';
const C=window.HELUNEXA_CONTENT,M=window.AccessModel;

// SUPABASE BAĞLANTISI
const _supabase = supabase.createClient('https://grbjmhknmlheoyknmyhd.supabase.co', 'sb_publishable_lA5YB8KySIyhrLseQV56Kw_cWLCWq7p');

const $=s=>document.querySelector(s),esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icons=['＋','↻','▤','◌','⌕','⌂','♡','▦'];
let state={view:'home',step:0,draft:M.draft(1),records:[],active:null,provider:'merkez'};
const module=id=>C.modules.find(x=>x.id===id),draft=()=>state.draft,active=()=>state.records.find(r=>r.id===state.active);

function button(text,action,cls='',attrs=''){return `<button class="button ${cls}" data-action="${action}" ${attrs}>${text}</button>`}
function chips(label,items,value,key){return `<div style="margin:15px 0;"><span style="display:block;font-weight:bold;margin-bottom:8px;">${label}</span><div style="display:flex;gap:10px;flex-wrap:wrap;">${items.map(x=>button(esc(x.name),'choice',x.id===value?'button chip selected':'button chip',`data-key="${key}" data-value="${esc(x.id)}"`)).join('')}</div></div>`}
function toast(t){$('#toast').textContent=t;$('#toast').style.display='block';setTimeout(()=>$('#toast').style.display='none',3000)}
function go(v){state.view=v;render();window.scrollTo(0,0)}

// SADECE SOLDaki LOGO VE SAĞDAKİ HEKİM GİRİŞİ (Hizmetler yazısı silindi)
function header(){return `<header style="display:flex; justify-content:space-between; align-items:center; padding:15px 30px; background:#ffffff; border-bottom:1px solid #e2e8f0;"><a href="#" data-action="home"><img src="logo.png" alt="HELUNEXA" style="height:55px;"></a><nav>${button('Hekim Girişi','institution','button nav secondary')}</nav></header>`}

function home(){return `<main><section class="home-intro"><div style="text-align:center;margin-bottom:20px;"><img src="logo.png" alt="HELUNEXA" style="height:100px;"></div><div class="eyebrow" style="text-align:center; color:var(--green-dark); font-weight:700;">Sağlık hizmetine daha kolay erişin.</div><h1 style="text-align:center; color:var(--green-dark); font-size:32px;">Hangi konuda destek arıyorsunuz?</h1><p style="text-align:center;margin-bottom:30px;">Hizmetinizi seçin, size uygun kurumu bulun, talebinizi iletin.</p><div class="service-grid">${C.modules.map(m=>`<button class="service-tile" data-action="start" data-id="${m.id}"><span class="service-icon">${icons[m.id-1]}</span><span>${esc(m.shortTitle)}</span><span class="arrow"></span></button>`).join('')}</div></section></main>`}

function options(items){return items.map(x=>`<div style="margin-bottom:10px;"><label class="check"><input type="checkbox" data-option="${esc(x.id)}" ${draft().selected.includes(x.id)?'checked':''}><span>${esc(x.name)}</span></label></div>`).join('')}

function selection(){const d=draft(),m=module(d.moduleId);return `<main><div class="eyebrow" style="color:var(--green-dark);">${esc(m.shortTitle)}</div><h1 style="color:var(--green-dark);">${esc(m.title)}</h1><div class="steps"><li class="active"><span>1</span>Hizmet</li><li><span>2</span>Kurum</li><li><span>3</span>Talep</li></div><div class="panel"><h2>Seçenekler</h2>${d.moduleId===4?options(C.longevityOptions):d.moduleId===5?options(C.cancerOptions):C.quickOptions[d.moduleId]?options(C.quickOptions[d.moduleId]):''}${[1,2,4,8].includes(d.moduleId)?`<details style="margin-top:20px;"><summary>Tetkik kataloğu</summary><div style="margin-top:10px;">${options(C.catalog)}</div></details>`:''}</div><div class="bottom-actions">${button('Geri','back','ghost')}${button('Devam Et →','next','primary')}</div></main>`}

function locationScreen(){const d=draft(),list=M.providers(C,d);return `<main><div class="eyebrow" style="color:var(--green-dark);">${esc(module(d.moduleId).shortTitle)}</div><h1 style="color:var(--green-dark);">Size uygun kurum ve yer.</h1><div class="steps"><li class="active"><span>1</span>Hizmet</li><li class="active"><span>2</span>Kurum</li><li><span>3</span>Talep</li></div><div class="panel soft">${chips('Bölge',[{id:'Merkez',name:'Merkez'},{id:'Kuzey',name:'Kuzey'},{id:'Güney',name:'Güney'}],d.area,'area')}</div><div class="provider-card"><h3>${list[0]?.name || 'Kurum Bulunamadı'}</h3><p class="provider-location">${list[0]?.area} Bölgesi</p>${list[0]?button('Bu Kurumu Seç','provider','primary full',`data-id="${list[0].id}"`):''}</div><div class="bottom-actions">${button('Geri','back','ghost')}${button('Devam Et →','next','primary')}</div></main>`}

function requestScreen(){const d=draft(),p=C.providers.find(x=>x.id===d.providerId);return `<main><div class="eyebrow" style="color:var(--green-dark);">Son Adım</div><h1 style="color:var(--green-dark);">Talebiniz hazır.</h1><div class="steps"><li class="active"><span>1</span>Hizmet</li><li class="active"><span>2</span>Kurum</li><li class="active"><span>3</span>Talep</li></div><div class="two-col"><div class="panel"><h2>${esc(p?.name || 'Kurum')}</h2><p>Seçilen Hizmet: ${esc(module(d.moduleId).title)}</p></div><div class="panel soft"><h3>Size nasıl ulaşalım?</h3><div class="contact-fields"><label>Ad Soyad</label><input id="contact-name" data-contact="name" value="${esc(d.contact.name)}" placeholder="Adınız"><label>Telefon</label><input id="contact-phone" data-contact="phone" value="${esc(d.contact.phone)}" placeholder="05xx xxx xx xx"><p id="contact-error" style="color:red;font-size:12px;"></p></div></div></div><div class="bottom-actions">${button('Geri','back','ghost')}${button('Talebimi İlet →','submit','primary')}</div></main>`}

function booking(){return state.step===0?selection():state.step===1?locationScreen():requestScreen()}

function render(){
    let body = state.view==='home' ? home() : state.view==='booking' ? booking() : home();
    $('#app').innerHTML = header() + body + `<footer style="color:var(--green-dark);">© 2026 HELUNEXA · Tüm Hakları Saklıdır.</footer>`;
}

document.addEventListener('click',e=>{
    const el=e.target.closest('[data-action]'); if(!el) return; e.preventDefault(); const a=el.dataset.action;
    try{
        if(a==='home') go('home');
        else if(a==='institution') window.location.href = 'admin.html';
        else if(a==='start'){state.draft=M.draft(Number(el.dataset.id));state.step=0;go('booking');}
        else if(a==='back'){if(state.step===0)go('home');else{state.step--;go('booking')}}
        else if(a==='next'){state.step=Math.min(2,state.step+1);go('booking')}
        else if(a==='choice'){state.draft=M.filter(C,draft(),{[el.dataset.key]:el.dataset.value});render()}
        else if(a==='provider'){state.draft={...draft(),providerId:el.dataset.id};render()}
        else if(a==='submit'){
            try {
                M.contactInfo(draft().contact);
            } catch (e) { alert(e.message); return; }

            if (!draft().providerId) { alert('Lütfen bir kurum seçin.'); return; }

            el.disabled = true; el.textContent = 'Gönderiliyor...';
            const r=M.request(C,draft(),[]);
            
            // SUPABASE KAYIT
            _supabase.from('applications').insert([{
                fullname: r.person.name, 
                phone: r.person.phone, 
                service_type: module(draft().moduleId).title,
                test_notes: draft().selected.join(', '), 
                status: 'pending', 
                age: 30,
                email: 'anonim@helunexa.com' 
            }]).then(({error})=>{
                if(error){ alert('Veritabanı Hatası: ' + error.message); el.disabled = false; el.textContent = 'Talebimi İlet →'; return; }
                alert('✅ Talebiniz Alındı! Hekimimiz sizi arayacak.'); go('home');
            }).catch(err => {
                alert('Bağlantı hatası: ' + err.message); el.disabled = false; el.textContent = 'Talebimi İlet →';
            });
        }
    }catch(err){ alert(err.message); }
});

document.addEventListener('input',e=>{const k=e.target.dataset.contact;if(k)state.draft.contact[k]=e.target.value;});
document.addEventListener('change',e=>{if(e.target.dataset.option)state.draft=M.option(C,draft(),e.target.dataset.option);});
render();
})();