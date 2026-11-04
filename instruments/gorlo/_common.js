// Общие заготовки раздела «Горло и гортань».
export const DRAFT = { verified: { proverka: "full PASS", accepted: null } };   // proverka full 02.11.2026; accepted ставится после приёмки
export const yn = [{ label: "Да", value: 1 }, { label: "Нет", value: 0 }];
export const likert = labels => labels.map((label, value) => ({ label, value }));
export const seven = labels => labels.map((label, i) => ({ label, value: i + 1 }));   // LCQ: первый вариант 1 балл, последний 7
