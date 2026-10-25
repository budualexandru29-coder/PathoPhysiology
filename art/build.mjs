// Generează src/js/31-art.generated.js din desenele din art/*.mjs.
// Desenele care nu au încă generator (rămase din versiunea veche) se păstrează din fișierul existent.
// Rulare: node art/build.mjs && node build.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DEFS } from "./lib/an.mjs";
import * as circ from "./circ.mjs";
import * as head from "./head.mjs";

const FIGS = { circ, head };

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "src/js/31-art.generated.js");
const old = fs.readFileSync(out, "utf8");
const m = old.match(/const ART = (\{.*\});/);
const ART = m ? JSON.parse(m[1]) : {};
for (const [key, mod] of Object.entries(FIGS)) ART[key] = mod.build();

const js = `/* generat de art/*.mjs cu kitul skill-ului anima; nu edita de mână */
const ART = ${JSON.stringify(ART)};
/* gradienții comuni ai desenelor (volumul organelor), puși o singură dată în pagină */
(function () {
  if (typeof document === 'undefined') return;
  const add = () => { if (!document.querySelector('svg.an-defs')) document.body.insertAdjacentHTML('afterbegin', ${JSON.stringify(DEFS.replace(/\n/g, ""))}); };
  if (document.body) add(); else document.addEventListener('DOMContentLoaded', add);
})();
`;
fs.writeFileSync(out, js);
console.log("31-art.generated.js", (Buffer.byteLength(js) / 1024).toFixed(1) + " KB", Object.keys(FIGS).join(", "));
