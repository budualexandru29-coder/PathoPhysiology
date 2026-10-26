// Previzualizare rapidă a unui desen, fără aplicație: node art/preview.mjs <modul> [out.html] [--light] [--state k=v,...]
// Modulul exportă preview() -> { svg, viewBox, style } . Pagina încarcă stilurile aplicației ca desenul să arate ca în ea.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { DEFS } from "./lib/an.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const mod = await import(pathToFileURL(path.resolve(args[0])).href);
const out = args[1] && !args[1].startsWith("--") ? args[1] : path.join(root, "shots", "preview.html");
const light = args.includes("--light");
const st = (args[args.indexOf("--state") + 1] || "");
const state = args.includes("--state") ? Object.fromEntries(st.split(",").map((kv) => kv.split("="))) : {};
const { svg, viewBox, style = "", attrs = "" } = mod.preview(state);
const css = ["src/css/00-app.css", "src/css/10-fx.css", "src/css/20-anima.css", "src/css/30-atlas.css", "src/css/31-cells.css"].map((p) => fs.readFileSync(path.join(root, p), "utf8")).join("\n");
const html = `<!doctype html><html${light ? ' data-theme="light"' : ' data-theme="dark"'}><head><meta charset="utf-8"><style>${css}
body{padding:16px} .pv{max-width:900px;margin:0 auto}</style></head><body>${DEFS}
<div class="pv"><figure class="fig xfig" data-anim="1"><div class="pvs" style="${Object.entries(state).map(([k, v]) => `--${k}:${v}`).join(";")};${style}" ${attrs} ${Object.entries(state).map(([k, v]) => `data-${k}="${v}"`).join(" ")}><svg class="iso-svg" viewBox="${viewBox}">${svg}</svg></div></figure></div></body></html>`;
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log(out);
