/*
 AERØ / OLDWEB MVP
 Os cartões são placeholders de layout, não artes atribuídas ao artista.
 Para trocar os dados, edite o array projects abaixo.
*/
const projects = [
  {id:"001",title:"LIVERY FILE 001",category:"livery",categoryLabel:"LIVERY DESIGN",vehicle:"VEHICLE / TO BE ADDED",year:"",description:"Espaço reservado para uma livery original. Adicione aqui o título, o veículo e a descrição reais do trabalho.",status:"EXAMPLE / AWAITING ART",image:""},
  {id:"002",title:"VIRTUAL FILE 002",category:"virtual",categoryLabel:"VIRTUAL TUNING",vehicle:"VEHICLE / TO BE ADDED",year:"",description:"Espaço reservado para uma montagem ou projeto de virtual tuning original.",status:"EXAMPLE / AWAITING ART",image:""},
  {id:"003",title:"CONCEPT FILE 003",category:"concept",categoryLabel:"CONCEPT / EXPERIMENTAL",vehicle:"VEHICLE / TO BE ADDED",year:"",description:"Espaço reservado para um conceito automotivo original ou experimento visual.",status:"EXAMPLE / AWAITING ART",image:""}
];

const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const nav = $("#mainNav");
const menuToggle = $("#menuToggle");
const dialog = $("#projectDialog");
let currentProjectIndex = 0;
let currentFilter = "all";
let toastTimer;

function placeholderMarkup(project, extraClass="") {
  if (project.image) return `<img class="art-image ${extraClass}" src="${escapeHTML(project.image)}" alt="${escapeHTML(project.alt || project.title)}" loading="lazy">`;
  return `<div class="art-placeholder card-art ${extraClass}" role="img" aria-label="Espaço reservado para ${escapeHTML(project.title)}">
    <div class="placeholder-cross">＋</div><div class="placeholder-label">${escapeHTML(project.title)}</div>
    <div class="placeholder-sub">${escapeHTML(project.status)}</div><div class="placeholder-grid"></div>
  </div>`;
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
}
function cardMarkup(project, index) {
  return `<button class="work-card" type="button" data-project="${index}" aria-label="Abrir ${escapeHTML(project.title)}">
    ${placeholderMarkup(project)}
    <div class="card-copy"><div class="card-topline"><span>FILE / ${project.id}</span><span>↗ OPEN</span></div>
      <h3>${escapeHTML(project.title)}</h3><p>${escapeHTML(project.categoryLabel)} / ${escapeHTML(project.vehicle)}</p>
    </div>
  </button>`;
}
function renderCards() {
  const visible = projects.map((project,index)=>({project,index})).filter(({project})=>currentFilter==="all"||project.category===currentFilter);
  $("#archiveGrid").innerHTML = visible.map(({project,index})=>cardMarkup(project,index)).join("");
  $("#featuredGrid").innerHTML = projects.slice(0,3).map((project,index)=>cardMarkup(project,index)).join("");
  $$(".work-card").forEach(card=>card.addEventListener("click",()=>openProject(Number(card.dataset.project))));
  const allFilter = $('.filter-button[data-filter="all"]');
  if(allFilter) allFilter.innerHTML = `ALL FILES <i>${String(projects.length).padStart(2,"0")}</i>`;
  renderCollection("liveryGrid", "livery");
  renderCollection("virtualGrid", "virtual");
}
function renderCollection(id, category) {
  const target = document.getElementById(id);
  if (!target) return;
  target.innerHTML = projects.map((project,index)=>({project,index})).filter(({project})=>project.category===category).map(({project,index})=>cardMarkup(project,index)).join("");
  $$(".work-card", target).forEach(card=>card.addEventListener("click",()=>openProject(Number(card.dataset.project))));
}
function setView(id) {
  const target = document.getElementById(id) ? id : "home";
  $$(".view").forEach(view=>view.classList.toggle("active",view.id===target));
  $$("[data-nav]").forEach(link=>link.classList.toggle("active",link.dataset.nav===target));
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded","false");
  menuToggle.querySelector("span").textContent="＋";
  if(["works","livery","virtual"].includes(target)) renderCards();
  window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
}
function routeFromHash() { setView((location.hash||"#home").slice(1)); }
function openProject(index) {
  currentProjectIndex = (index + projects.length) % projects.length;
  const project = projects[currentProjectIndex];
  $("#dialogIndex").textContent = `FILE / ${project.id} — ${project.status}`;
  $("#dialogCategory").textContent = `${project.categoryLabel} / DIGITAL ART`;
  $("#dialogTitle").textContent = project.title;
  $("#dialogDescription").textContent = project.description;
  $("#dialogArt").setAttribute("aria-label", project.alt || `Espaço reservado para ${project.title}`);
  $("#dialogArt").innerHTML = project.image ? `<img class="art-image" src="${escapeHTML(project.image)}" alt="${escapeHTML(project.alt || project.title)}">` : `<div class="placeholder-cross">＋</div><div class="placeholder-label">${escapeHTML(project.title)}</div><div class="placeholder-sub">${escapeHTML(project.status)}</div><div class="placeholder-grid"></div>`;
  $("#prevProject").disabled = projects.length<2;
  $("#nextProject").disabled = projects.length<2;
  if(!dialog.open) dialog.showModal();
  $("#dialogArt").classList.remove("glitch");
  void $("#dialogArt").offsetWidth;
  $("#dialogArt").classList.add("glitch");
}
function showToast(message) {
  const toast=$("#toast"); toast.textContent=message; toast.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove("show"),2400);
}
menuToggle.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",String(open));
  menuToggle.querySelector("span").textContent=open?"×":"＋";
});
$$("[data-nav]").forEach(link=>link.addEventListener("click",event=>{
  event.preventDefault(); const id=link.dataset.nav; history.pushState(null,"",`#${id}`); setView(id);
}));
$$('a[href^="#"]').filter(link=>!link.hasAttribute("data-nav")).forEach(link=>link.addEventListener("click",event=>{
  const id=link.getAttribute("href").slice(1);
  if(document.getElementById(id)?.classList.contains("view")) {
    event.preventDefault(); history.pushState(null,"",`#${id}`); setView(id);
  }
}));
window.addEventListener("hashchange",routeFromHash);
window.addEventListener("popstate",routeFromHash);
$$(".filter-button").forEach(button=>button.addEventListener("click",()=>{
  currentFilter=button.dataset.filter;
  $$(".filter-button").forEach(item=>item.classList.toggle("active",item===button));
  renderCards();
}));
$("#closeDialog").addEventListener("click",()=>dialog.close());
$("#prevProject").addEventListener("click",()=>openProject(currentProjectIndex-1));
$("#nextProject").addEventListener("click",()=>openProject(currentProjectIndex+1));
dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close()});
document.addEventListener("keydown",event=>{
  if(!dialog.open)return;
  if(event.key==="ArrowRight")openProject(currentProjectIndex+1);
  if(event.key==="ArrowLeft")openProject(currentProjectIndex-1);
});
$("#year").textContent=new Date().getFullYear();
renderCards();
routeFromHash();
