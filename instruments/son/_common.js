import { CUSTOM } from "../../engine.js";
// Классификация по сторонам без суммы: итог «справа X, слева Y» (Бродский, Преображенский)
CUSTOM.perSide = (a, inst) => {
  const name = id => inst.items.find(i => i.id === id).options.find(o => o.value === a[id]).short;
  return { total: Math.max(a.r, a.l), band: { label: `Справа ${name("r")}, слева ${name("l")}`, source: inst.source.citation } };
};
export const one = (pairs, src) => ({   // классификация одним выбором: полоса на каждое значение
  options: pairs.map(([value, label]) => ({ value, label })),
  bands: pairs.map(([value, label, band]) => ({ min: value, max: value, label: band ?? label, source: src }))
});
