// Подсчёт баллов. Неполные ответы балла не дают: неполный балл похож на настоящий.

export const CUSTOM = {};   // нестандартные правила подсчёта по имени (Berlin, Лунд-Маккей и т.п.)

const METHODS = {
  sum: (inst, a) => inst.items.reduce((s, it) => s + a[it.id], 0) * (inst.scoring.multiplier ?? 1),
  domain_mean_sum: (inst, a) => {
    const dom = {};
    for (const it of inst.items) (dom[it.domain] ??= []).push(a[it.id]);
    const subscores = Object.fromEntries(Object.entries(dom).map(([d, v]) => [d, v.reduce((s, x) => s + x, 0) / v.length]));
    return { total: Object.values(subscores).reduce((s, x) => s + x, 0), subscores };
  },
  domain_sum: (inst, a) => {
    const subscores = {};
    for (const it of inst.items) subscores[it.domain] = (subscores[it.domain] ?? 0) + a[it.id];
    return { total: Object.values(subscores).reduce((s, x) => s + x, 0), subscores };
  },
  proportion: (inst, a) => inst.items.reduce((s, it) => s + a[it.id], 0) / inst.items.length,
  custom: (inst, a) => {
    const f = CUSTOM[inst.scoring.custom];
    if (!f) throw new Error(`нет правила подсчёта «${inst.scoring.custom}»`);
    return f(a, inst);
  }
};

export function score(inst, answers) {
  const method = METHODS[inst.scoring.method];
  if (!method) throw new Error(`неизвестный метод подсчёта «${inst.scoring.method}»`);
  const missing = inst.items.filter(it => answers[it.id] === null || answers[it.id] === undefined).length;
  if (missing) return { complete: false, missing, total: null, subscores: null, band: null };
  const r = method(inst, answers);
  const { total, subscores = null, band: own = null } = typeof r === "number" ? { total: r } : r;
  const band = own ?? (inst.bands ?? []).find(b => total >= b.min && total <= b.max) ?? null;
  return { complete: true, missing: 0, total, subscores, band };
}
