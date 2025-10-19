const articles = [
      {
        id:1,
        title:"Alimentación Consciente",
        category:"Alimentación",
        date:"15 de marzo, 2024",
        excerpt:"Descubre cómo transformar tus comidas en momentos de conexión y nutrición real, sin dietas restrictivas ni sentimientos de culpa.",
        author:"Ana Martínez",
        readTime:"8 min",
        comments:24,
        featured:true
      },
      { id:2, title:"El arte de desconectar: rutinas para un descanso profundo", category:"Descanso", date:"8 de marzo, 2024", excerpt:"Aprende técnicas efectivas para mejorar la calidad de tu sueño y recuperación.",  author:"Carlos Rodríguez", readTime:"6 min", comments:18, },
      { id:3, title:"Organización sostenible: menos es más", category:"Organización", date:"1 de marzo, 2024", excerpt:"Sistemas simples que te ayudan a vivir con menos estrés y más propósito.", author:"Laura Gómez", readTime:"7 min", comments:32},
      { id:4, title:"Ocio significativo en la era digital", category:"Ocio", date:"23 de febrero, 2024", excerpt:"Cómo encontrar actividades que nutran tu alma en un mundo hiperconectado.", author:"Miguel Torres", readTime:"5 min", comments:15},
      { id:5, title:"Prevención emocional diaria", category:"Prevención", date:"16 de febrero, 2024", excerpt:"Herramientas prácticas para cuidar tu salud mental antes de que surjan crisis.", author:"Elena Sánchez", readTime:"9 min", comments:41},
      { id:6, title:"Recetas equilibradas para toda la semana", category:"Alimentación", date:"9 de febrero, 2024", excerpt:"Menú semanal con recetas sostenibles y nutritivas que se adaptan a tu vida real.", author:"Ana Martínez", readTime:"12 min", comments:28},
      { id:7, title:"Microhábitos para productividad consciente", category:"Organización", date:"3 de febrero, 2024", excerpt:"Pequeños cambios con gran impacto en tu flujo y energía diaria.", author:"Laura Gómez", readTime:"6 min", comments:11},
      { id:8, title:"Rituales previos al sueño", category:"Descanso", date:"27 de enero, 2024", excerpt:"Rituales sencillos que indican a tu cuerpo que es hora de descansar.", author:"Carlos Rodríguez", readTime:"5 min", comments:9},
      { id:9, title:"Planes de fin de semana que recargan", category:"Ocio", date:"19 de enero, 2024", excerpt:"Actividades cortas que te devuelven energía real sin desplazar responsabilidades.", author:"Miguel Torres", readTime:"7 min", comments:6},
      // add more to test pagination
      { id:10, title:"Alimentos para el sistema inmune", category:"Alimentación", date:"10 de enero, 2024", excerpt:"Alimentos accesibles para nutrir tu sistema inmune durante todo el año.", author:"Ana Martínez", readTime:"9 min", comments:2},
      { id:11, title:"Espacios que invitan a la calma", category:"Organización", date:"2 de enero, 2024", excerpt:"Organiza tu hogar para que apoye tu bienestar mental.", author:"Laura Gómez", readTime:"8 min", comments:4},
      { id:12, title:"Descanso en días ocupados", category:"Descanso", date:"20 de diciembre, 2023", excerpt:"Mini-pausas que sí suman cuando el calendario está lleno.", author:"Carlos Rodríguez", readTime:"4 min", comments:3},
      { id:13, title:"Detox digital responsable", category:"Prevención", date:"12 de diciembre, 2023", excerpt:"Cómo establecer límites digitales sin perder oportunidades importantes.", author:"Elena Sánchez", readTime:"6 min", comments:7},
      { id:14, title:"Picnic consciente: menú y actividades", category:"Ocio", date:"3 de diciembre, 2023", excerpt:"Ideas y recetas para un plan al aire libre que repone energía.", author:"Miguel Torres", readTime:"10 min", comments:12}
    ];

    // categories
    const categories = ["Todos los artículos","Alimentación","Descanso","Ocio","Prevención","Organización"];

    // state
    let activeCategory = "Todos los artículos";
    let currentPage = 1;
    const perPage = 6;

    // DOM nodes
    const filtersEl = document.getElementById('categoryFilters');
    const mainGrid = document.getElementById('mainGrid');
    const pagerEl = document.getElementById('pager');

    // create filter buttons
    function renderFilters(){
      filtersEl.innerHTML = '';
      categories.forEach(cat=>{
        const btn = document.createElement('button');
        btn.className = 'pill' + (cat === activeCategory ? ' active' : '');
        btn.innerText = cat;
        btn.onclick = () => {
          activeCategory = cat;
          currentPage = 1;
          renderFilters();
          renderMain();
        };
        filtersEl.appendChild(btn);
      });
    }

    // filter & pagination logic
    function getFiltered(){
      if(activeCategory === "Todos los artículos") return articles;
      return articles.filter(a=>a.category === activeCategory);
    }
    function getPageItems(list){
      const start = (currentPage-1)*perPage;
      return list.slice(start,start+perPage);
    }

    // render main grid: featured + cards
    function renderMain(){
      mainGrid.innerHTML = '';
      const filtered = getFiltered();

      // featured: first item that has featured=true and matches filter, otherwise first item
      let featured = filtered.find(a=>a.featured) || filtered[0];
      // ensure featured not duplicated in cards list
      const rest = filtered.filter(a=>a.id !== (featured?featured.id:null));

      // create featured markup
      if(featured){
        const f = document.createElement('div');
        f.className = 'featured';
        f.innerHTML = `
          <div class="badge">★ Destacado</div>
          <div class="title">${featured.title}</div>
          <div class="meta">
            <span class="tag";">${featured.category.toUpperCase()}</span>
            <div style="flex:1"></div>
            <div class="muted-small">${featured.date}</div>
          </div>
        `;
        mainGrid.appendChild(f);
      }

      // Pagination for cards: apply pagination to 'rest'
      const paged = getPageItems(rest);

      // Cards container
      const cardsWrap = document.createElement('div');
      cardsWrap.className = 'cards';
      if(paged.length === 0){
        cardsWrap.innerHTML = '<div style="grid-column:1/-1;padding:24px;color:#666">No hay artículos en esta categoría.</div>';
      } else {
        paged.forEach(a=>{
          const c = document.createElement('article');
          c.className = 'card';
          const coverColor = getCoverColor(a.category);
          c.innerHTML = `
            <div class="cover square" style="background:${coverColor.background};color:${coverColor.text};">
              ${a.title}
            </div>
            <div class="category-badge" style="margin-bottom:8px; background-color:${coverColor.badge_color};"> <img
                    src="./icons/${coverColor.icon}.svg"
                    width="14"
                    height="14"
                /> ${a.category.toUpperCase()}</div>
            <h3>${a.title}</h3>
            <p class="lead">${a.excerpt}</p>
            <div class="author">
              <div class="avatar">${initials(a.author)}</div>
              <div style="line-height:1.4">
                <div style="font-weight:700">${a.author}</div>
                <div class="muted-small">${a.date}</div>
              </div>
            </div>
            <div class="meta-row">
              <div class="muted-small">⏱ ${a.readTime} • 💬 ${a.comments} comentarios</div>
              <a class="read-more" href="#" data-id="${a.id}">Leer artículo completo →</a>
            </div>
          `;
          cardsWrap.appendChild(c);
        });
      }

      mainGrid.appendChild(cardsWrap);
      renderPager(rest.length);
      // attach read handlers
      document.querySelectorAll('.read-more').forEach(el=>{
        el.addEventListener('click', (e)=>{
          e.preventDefault();
          const id = e.currentTarget.getAttribute('data-id');
          openArticle(id);
        });
      });
    }

    function renderPager(totalItems){
      pagerEl.innerHTML = '';
      // total pages over 'rest' (excluding featured)
      const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
      // previous
      const prev = document.createElement('button');
      prev.innerHTML = '‹';
      prev.disabled = currentPage === 1;
      prev.onclick = ()=>{ if(currentPage>1){ currentPage--; renderMain(); } };
      pagerEl.appendChild(prev);

      // page numbers (limit shown)
      const maxButtons = 5;
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxButtons - 1);
      if(end - start < maxButtons - 1) start = Math.max(1, end - maxButtons + 1);

      for(let i=start;i<=end;i++){
        const b = document.createElement('button');
        b.innerText = i;
        b.className = (i===currentPage ? 'active' : '');
        b.onclick = ()=>{ currentPage = i; renderMain(); };
        pagerEl.appendChild(b);
      }

      // next
      const next = document.createElement('button');
      next.innerHTML = '›';
      next.disabled = currentPage === totalPages;
      next.onclick = ()=>{ if(currentPage<totalPages){ currentPage++; renderMain(); } };
      pagerEl.appendChild(next);
    }

    // helper for colors similar to mock
    function getCoverColor(category){
      switch(category){
        case "Alimentación": return {background:'linear-gradient(180deg,#0f2a22,#12382f)', text:'#fff', badge_color: "rgb(135 190 160)", icon:"apple-transparent"};
        case "Descanso": return {background: 'var(--muted)', text:'#163022',badge_color: "rgb(45 210 190)", icon:"moon-transparent"};
        case "Organización": return {background:'#113427', text:'#fff',badge_color: "rgb(95 165 250)", icon:"date-transparent"};
        case "Ocio": return {background:'#e6dccf', text:'#163022', badge_color: "rgb(250 190 35)", icon:"heart-transparent"};
        case "Prevención": return {background:'#dcd1f5', text:'#163022', badge_color: "rgb(165 135 250)", icon: "shield-transparent"};
        default: return {background:'#eef0ee', text:'#163022', icon: "book"};
      }
    }

    function initials(name){
      return name.split(' ').slice(0,2).map(n=>n[0]).join('').toUpperCase();
    }

    // demo open article (simple modal)
    function openArticle(id){
      const a = articles.find(x=>x.id==id);
      if(!a) return;
      const modal = document.createElement('div');
      modal.style.position='fixed';
      modal.style.inset=0;
      modal.style.background='rgba(0,0,0,0.4)';
      modal.style.display='flex';
      modal.style.alignItems='center';
      modal.style.justifyContent='center';
      modal.style.zIndex=999;
      modal.innerHTML = `
        <div style="width:min(900px,94%);background:#fff;border-radius:12px;padding:22px;box-shadow:0 14px 40px rgba(0,0,0,0.25);max-height:86vh;overflow:auto">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <h2 style="margin:0;font-family:Merriweather,serif">${a.title}</h2>
            <button id="closeModal" style="background:transparent;border:none;font-size:20px;cursor:pointer">✕</button>
          </div>
          <div style="color:#6b6b6b;margin-top:8px">${a.category} • ${a.date} • ${a.readTime}</div>
          <hr style="margin:16px 0;border:none;border-top:1px solid #eee"/>
          <p style="line-height:1.6;color:#444">${a.excerpt} <em>(Texto de ejemplo — reemplaza con contenido real desde tu CMS)</em></p>
          <p style="color:#666">Autor: <strong>${a.author}</strong></p>
          <div style="margin-top:16px;display:flex;justify-content:flex-end;gap:10px">
            <button id="close2" style="padding:8px 12px;border-radius:8px;border:1px solid rgba(0,0,0,0.06);background:#fff;cursor:pointer">Cerrar</button>
            <a href="#" style="padding:8px 12px;border-radius:8px;background:var(--accent);color:#fff;text-decoration:none">Leer en la app</a>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      modal.querySelectorAll('#closeModal, #close2').forEach(b=>b.addEventListener('click', ()=>modal.remove()));
      modal.addEventListener('click', (e)=>{ if(e.target===modal) modal.remove(); });
    }

    // init
    renderFilters();
    renderMain();

    // small keyboard shortcuts (corporate power-user touch)
    document.addEventListener('keydown',(e)=>{
      if(e.key === 'f'){ // focus first filter
        const first = filtersEl.querySelector('button');
        if(first) first.focus();
      }
      if(e.key === 'p'){ // go to next page
        currentPage++;
        renderMain();
      }
    });