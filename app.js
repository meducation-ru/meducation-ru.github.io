import { score } from "./engine.js";
import { validate } from "./schema.js";
import { INSTRUMENTS } from "./instruments/index.js";

const SECTIONS = [["nos", "Нос"], ["gorlo", "Горло и гортань"], ["son", "Сон"], ["ushi", "Уши"], ["golova", "Головокружение"]];
const KIND = { questionnaire: "опросник", criteria: "критерии", classification: "классификация", scheme: "схема", memo: "памятка" };
const $ = id => document.getElementById(id);

// в набор попадает только то, что прошло проверку схемы
const TOOLS = INSTRUMENTS.filter(i => {
  const e = validate(i);
  if (e.length) console.warn(`«${i.id}» скрыт:`, e);
  return !e.length;
});
let current = null, answers = {};

function showSection(s) {
  for (const c of $("chips").children) c.setAttribute("aria-pressed", String(c.dataset.s === s));
  const list = $("list"); list.replaceChildren();
  const items = TOOLS.filter(t => t.section === s);
  if (!items.length) { const p = document.createElement("p"); p.className = "empty"; p.textContent = "Раздел готовится."; list.append(p); }
  for (const t of items) {
    const b = document.createElement("button"); b.className = t.kind === "memo" || t.kind === "scheme" ? "row memo" : "row";
    b.innerHTML = `<span class="name"></span><span class="tag"></span>`;
    b.querySelector(".name").textContent = t.name;
    const w = document.createElement("span"); w.className = "what"; w.textContent = t.purpose; b.querySelector(".name").append(w);
    b.querySelector(".tag").textContent = KIND[t.kind];
    b.addEventListener("click", () => { location.hash = t.id; });
    list.append(b);
  }
  try { localStorage.setItem("section", s); } catch {}
}

const fmt = v => String(Math.round(v * 100) / 100).replace(".", ",");

export function copyText(t, r) {
  const parts = t.items.map(it => `${it.text}: ${it.scale ? (answers[it.id] ?? "нет ответа") : it.options.find(o => o.value === answers[it.id])?.label ?? "нет ответа"}`);
  const subs = r.subscores ? ` (${Object.entries(r.subscores).map(([d, v]) => `${d} ${fmt(v)}`).join(", ")})` : "";
  const num = t.showScore === false ? "" : `${fmt(r.total)}${subs}`;
  const head = r.complete ? `${t.name}: ${[num, r.band?.label].filter(Boolean).join(". ")}.` : `${t.name}: заполнено не полностью.`;
  return `${head} ${parts.join("; ")}.`;
}

function renderResult() {
  const t = current, has = t.items.length > 0;
  $("result").hidden = !has;
  if (!has) return;
  const r = score(t, answers);
  const show = t.showScore !== false;   // у критериев с исходами (Paradise) числа нет
  $("score").textContent = r.complete && show ? fmt(r.total) : "";
  $("score-of").textContent = r.complete ? (show ? "баллов" : "") : `Ответьте ещё на ${r.missing}`;
  const subs = r.complete && r.subscores ? Object.entries(r.subscores).map(([d, v]) => `${d}: ${fmt(v)}`).join("; ") + ". " : "";
  $("interp").textContent = r.complete ? subs + (r.band ? `${r.band.label}. Источник: ${r.band.source}` : "") : "";
  $("copytext").value = copyText(t, r);
  $("copy").hidden = !r.complete;   // пока не заполнено, панель узкая и не закрывает ответы
  for (const b of $("questions").querySelectorAll(".opt")) b.setAttribute("aria-pressed", String(answers[b.dataset.q] === Number(b.dataset.v)));
}

function openTool(t) {
  current = t; answers = {};
  $("home").hidden = true; $("tool").hidden = false;
  $("t-name").textContent = t.name; $("t-purpose").textContent = t.purpose;
  const mode = $("t-mode");
  const doctorMemo = t.kind === "memo" || t.kind === "scheme";
  mode.hidden = !doctorMemo && !t.items.length;
  mode.textContent = doctorMemo ? "Памятка для врача: не назначение и не замена осмотра" : t.patientMode ? "Можно дать пациенту" : "Только для расспроса врачом";
  mode.classList.toggle("ok", !doctorMemo && !!t.patientMode);
  const body = $("t-body"); body.replaceChildren(); body.className = "tool body";
  for (const b of t.body ?? []) {
    if (b.type === "gallery") {   // кадры с подписями: items [{ src, label, caption }], credit после сетки
      const g = document.createElement("div"); g.className = "gallery";
      for (const f of b.items) {
        const fig = document.createElement("figure");
        const im = document.createElement("img"); im.src = f.src; im.alt = `${f.label}: ${f.caption}`; im.loading = "lazy";
        const cap = document.createElement("figcaption"), lb = document.createElement("b");
        lb.textContent = f.label; cap.append(lb, ` ${f.caption}`);
        fig.append(im, cap); g.append(fig);
      }
      body.append(g);
      if (b.credit) { const c = document.createElement("p"); c.className = "credit"; c.textContent = b.credit; body.append(c); }
      continue;
    }
    const el = document.createElement(b.type === "img" ? "img" : b.type === "list" ? "ul" : b.type === "h" ? "h3" : "p");
    if (b.type === "img") { el.src = b.src; el.alt = b.alt ?? ""; }
    else if (b.type === "list") for (const x of b.items) { const li = document.createElement("li"); li.textContent = x; el.append(li); }
    else el.textContent = b.text;
    body.append(el);
  }
  const qs = $("questions"); qs.replaceChildren();
  let group = null;   // подзаголовок над группой вопросов (Лунд-Маккей: справа, слева)
  for (const it of t.items) {
    if (it.group && it.group !== group) { const h = document.createElement("h3"); h.className = "group"; h.textContent = it.group; qs.append(h); }
    group = it.group ?? null;
    const fs = document.createElement("fieldset"); fs.className = "q";
    const lg = document.createElement("legend"); lg.textContent = it.text; fs.append(lg);
    if (it.scale) {   // ВАШ: ползунок, пока не тронут, ответа нет
      const { min, max, left, right } = it.scale;
      const w = document.createElement("div"); w.className = "vas";
      w.innerHTML = `<input type="range" step="1"><input type="number" inputmode="numeric" step="1" placeholder="не отмечено"><span class="end l"></span><span class="end r"></span>`;
      const [inp, num] = w.querySelectorAll("input");
      Object.assign(inp, { min, max, value: Math.round((min + max) / 2), id: `o-${it.id}` });
      Object.assign(num, { min, max });
      inp.setAttribute("aria-label", it.text); num.setAttribute("aria-label", `${it.text}, число от ${min} до ${max}`);
      w.querySelector(".l").textContent = `${min}: ${left}`; w.querySelector(".r").textContent = `${max}: ${right}`;
      inp.addEventListener("input", () => { answers[it.id] = Number(inp.value); num.value = inp.value; renderResult(); });
      num.addEventListener("input", () => {   // вне диапазона или дробь: ответа нет, а не обрезанное значение
        const v = num.value === "" ? NaN : Number(num.value);
        if (Number.isInteger(v) && v >= min && v <= max) { answers[it.id] = v; inp.value = v; } else delete answers[it.id];
        renderResult();
      });
      fs.append(w); qs.append(fs); continue;
    }
    const opts = document.createElement("div");
    const long = it.options.length > 3 || it.options.some(o => o.label.length > 14);
    opts.className = long ? "opts stack" : "opts";
    it.options.forEach((o, i) => {
      const b = document.createElement("button"); b.className = "opt"; b.id = `o-${it.id}-${i}`; b.type = "button";
      b.textContent = o.label; b.dataset.q = it.id; b.dataset.v = o.value;
      b.addEventListener("click", () => { answers[it.id] = o.value; renderResult(); });
      opts.append(b);
    });
    fs.append(opts); qs.append(fs);
  }
  const fl = $("t-flags"); fl.hidden = !t.redFlags?.length;
  if (t.redFlags?.length) fl.innerHTML = `<h3>Красные флаги</h3><ul>${t.redFlags.map(() => "<li></li>").join("")}</ul>`, fl.querySelectorAll("li").forEach((li, i) => li.textContent = t.redFlags[i]);
  const src = $("t-src"); src.replaceChildren();
  const line = (label, text, url) => { const d = document.createElement("div"); d.textContent = `${label}: ${text} `;
    if (url) { const a = document.createElement("a"); a.href = url; a.target = "_blank"; a.rel = "noopener"; a.textContent = url; d.append(a); } src.append(d); };
  line("Источник", `${t.source.citation}${t.source.id ? `, ${t.source.id}` : ""}.`, t.source.url);
  if (t.kind !== "classification") line("Русская версия", t.ruVersion ? t.ruVersion.citation : (t.kind === "criteria" ? "перевод наш." : "наш перевод, на пациентах не валидирован; для расспроса врачом."), t.ruVersion?.url);
  line("Права", t.license);
  $("copied").hidden = true; $("copytext").hidden = true;
  renderResult(); window.scrollTo(0, 0);
}

function route() {
  const t = TOOLS.find(x => x.id === location.hash.slice(1));
  if (t) return openTool(t);
  current = null; $("tool").hidden = true; $("home").hidden = false;
}

for (const [s, label] of SECTIONS) {
  const c = document.createElement("button"); c.className = "chip"; c.dataset.s = s; c.textContent = label;
  c.addEventListener("click", () => showSection(s)); $("chips").append(c);
}
$("back").addEventListener("click", () => { history.length > 1 && location.hash ? history.back() : (location.hash = ""); });
$("copy").addEventListener("click", () => {
  const box = $("copytext");
  const manual = () => { box.hidden = false; box.focus(); box.select(); };
  try {
    navigator.clipboard.writeText(box.value).then(() => { $("copied").hidden = false; setTimeout(() => $("copied").hidden = true, 1500); }, manual);
  } catch { manual(); }
});
window.addEventListener("hashchange", route);
let start = "gorlo"; try { start = localStorage.getItem("section") || start; } catch {}
showSection(start); route();
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(e => console.warn("офлайн недоступен:", e));
