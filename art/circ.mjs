// Î1 · Circulația în hipertermia cu temperatura centrală sub 39 °C.
// Anatomie schematică a circulației sistemice, vedere anterioară: inima cu marile vase, crosa aortei cu cele trei
// ramuri, emisfera cerebrală dreaptă (carotida comună dreaptă → artera cerebrală medie în șanțul lateral; jugulara
// internă dreaptă → vena cavă superioară), un bloc de piele în secțiune hrănit dintr-o ramură parietală a aortei,
// rinichiul stâng (vena renală stângă trece prin fața aortei spre vena cavă inferioară) și monitorul unei linii arteriale.
import { smooth, sampleSmooth, along, poly, ribbon } from "./lib/geo.mjs";
import { vessels, cutEnd, organ } from "./lib/an.mjs";
import { skinBlock } from "./parts/skin-block.mjs";
import { heart } from "./parts/heart.mjs";
import { brainLat } from "./parts/brain-lat.mjs";
import { kidney } from "./parts/kidney.mjs";

export const W = 420, H = 432;

export function build() {
  const HT = heart({ origin: [54, 168], s: 1.1 });
  const BR = brainLat({ origin: [2, 2], s: 1.04, mirror: true });
  const KD = kidney({ origin: [6, 318], s: 0.98, mirror: true });
  const SB = skinBlock({ origin: [240.6, 8], scale: 1.126, uid: "__U__" });

  /* ---------- traseele vaselor mari (linii mediane) ---------- */
  const A = HT.anchors, B = BR.anchors, K = KD.anchors, Sa = SB.anchors;
  const aoTop = HT.aoAsc[HT.aoAsc.length - 1];
  const arch = [HT.aoAsc[0], HT.aoAsc[1], HT.aoAsc[2], aoTop, [121, 163], [130, 154], [145, 150], [162, 152], [173, 160.5], [178.5, 175], [180, 195]];
  const desc = [[180, 195], [180.1, 250], [180, 320], [179.8, 380], [179.6, 420]];
  const aorta = [...arch.slice(0, -1), [180, 200], [180.1, 250], [180, 320], [179.8, 380], [179.6, 420]];   // o singură bucată, fără treaptă
  const at = (pts, t) => along(sampleSmooth(pts, false, 10), t).p;
  const bct = [[134, 152.5], [128, 140], [122, 128], [117, 119]];                 // trunchiul brahiocefalic
  const rcca = [[117, 119], [116, 108], [115.6, 97], B.carotid];                  // carotida comună dreaptă → creier
  const rsa = [[117, 119], [104, 116], [90, 115.5], [77, 117]];                   // subclavia dreaptă (spre brațul drept, secționată)
  const lcca = [[148, 150], [149, 137], [150, 125], [151, 114]];                  // carotida comună stângă (secționată)
  const lsa = [[160, 151], [166, 140], [175, 131], [186, 124.5]];                 // subclavia stângă (secționată)
  const parA = [[180.1, 250], [205, 250.5], [232, 250.5], [252, 249], [Sa.artIn[0], 236], Sa.artIn];   // ramură parietală → piele
  const renA = [[179.8, 367], [150, 367.5], [120, 367.5], [90, 367], K.hilumA];        // artera renală dreaptă: prin spatele venei cave
  // vene
  const svc = [[84, 158], [83.5, 172], [84.5, 185], A.svcIn];
  const rbcv = [[66, 131], [73, 141], [80, 150.5], [84, 158]];
  const rijv = [B.jug, [40, 106], [47, 118], [58, 126.5], [66, 131]];
  const rscv = [[12, 141], [32, 141.5], [51, 138], [66, 131]];
  const lbcv = [[197, 132], [177, 139.5], [157, 145], [137, 149.5], [113, 154], [93, 157], [84, 158]];     // trece prin fața ramurilor crosei
  const ivc = [[98, 420], [98.2, 380], [98, 336], [97, 302], [93, 289], A.ivcIn];
  const skinV = [Sa.venOut, [Sa.venOut[0] + 0.3, 270], [Sa.venOut[0], 302], [Sa.venOut[0] - 5, 318], [Sa.venOut[0] - 22, 326], [230, 327], [180, 327], [140, 327], [98.1, 327]];
  const renV = [K.hilumV, [72, 375], [86, 375.5], [98.1, 375.5]];

  // artera cerebrală medie: iese din șanțul lateral și se ramifică pe fața laterală (desen în oglindă)
  const mca = BR.mca;

  const renArt = vessels([{ pts: renA, w: 3.6, k: "a", cls: "orgf" }]);
  const art = vessels([
    { pts: aorta, w: 10, k: "a" },
    { pts: parA, w: 3.2, k: "a", cls: "skf" },
    { pts: bct, w: 5.6, k: "a" },
    { pts: rcca, w: 4.2, k: "a", cls: "orgf" },
    { pts: rsa, w: 4, k: "a" },
    { pts: lcca, w: 4.2, k: "a" },
    { pts: lsa, w: 4.6, k: "a" },
  ]);
  const mcaSvg = vessels(mca.map((p, i) => ({ pts: p, w: i ? 1.1 : 2.2, k: "a", cls: "orgf mca" })));
  const ven = vessels([
    { pts: ivc, w: 10, k: "v", cls: "vol" },
    { pts: skinV, w: 4, k: "v", cls: "vol" },
  ]);
  const renVen = vessels([{ pts: renV, w: 4.2, k: "v", cls: "vol" }]);
  const venTop = vessels([
    { pts: rijv, w: 5, k: "v", cls: "vol" },
    { pts: rscv, w: 4.6, k: "v", cls: "vol" },
    { pts: rbcv, w: 6.4, k: "v", cls: "vol" },
    { pts: svc, w: 8.4, k: "v", cls: "vol" },
  ]);
  const lbcvSvg = vessels([{ pts: lbcv, w: 5.6, k: "v", cls: "vol" }]);
  const PTt = HT.pt.top;
  const ptL = [PTt, [PTt[0] + 7, PTt[1] - 1.5], [PTt[0] + 15, PTt[1] + 0.5], [PTt[0] + 21, PTt[1] + 3]];
  const ptR = [PTt, [PTt[0] - 5, PTt[1] - 2.6], [PTt[0] - 10, PTt[1] - 2.4], [PTt[0] - 14, PTt[1] - 0.6]];
  const pt = vessels([{ pts: HT.pt.axis, w: 9.6, k: "p" }, { pts: ptL, w: 6, k: "p" }, { pts: ptR, w: 6, k: "p" }]);
  const ptBranches = "";
  const cuts = [
    cutEnd(rsa[rsa.length - 1], [-1, 0.06], 4, "a"), cutEnd(lcca[lcca.length - 1], [0.12, -1], 4.2, "a"), cutEnd(lsa[lsa.length - 1], [0.8, -0.5], 4.6, "a"),
    cutEnd(rscv[0], [-1, 0.05], 4.6, "v"), cutEnd(lbcv[0], [1, -0.25], 5.6, "v"),
    cutEnd(desc[desc.length - 1], [0, 1], 10, "a"), cutEnd(ivc[0], [0, 1], 10, "v"),
    cutEnd(ptL[ptL.length - 1], [1, 0.4], 6, "p"), cutEnd(ptR[ptR.length - 1], [-1, 0.4], 6, "p"),
  ].join("");

  /* ---------- monitorul liniei arteriale ---------- */
  const MON = { x: 290, y: 300, w: 122, h: 84 };
  const scr = { x: MON.x + 7, y: MON.y + 16, w: MON.w - 14, h: MON.h - 26 };
  let grid = "";
  for (let gx = scr.x + 10; gx < scr.x + scr.w; gx += 10) grid += `M${gx} ${scr.y}V${scr.y + scr.h}`;
  for (let gy = scr.y + 10; gy < scr.y + scr.h; gy += 10) grid += `M${scr.x} ${gy}H${scr.x + scr.w}`;
  const monitor = `<g class="mon-g"><rect class="mon-shadow" x="${MON.x + 2}" y="${MON.y + 3}" width="${MON.w}" height="${MON.h}" rx="9"/>`
    + `<rect class="mon-body" x="${MON.x}" y="${MON.y}" width="${MON.w}" height="${MON.h}" rx="9"/><rect class="mon-bevel" x="${MON.x + 3}" y="${MON.y + 3}" width="${MON.w - 6}" height="${MON.h - 6}" rx="7"/>`
    + `<rect class="mon-scr" x="${scr.x}" y="${scr.y}" width="${scr.w}" height="${scr.h}" rx="3"/><path class="mon-grid" d="${grid}"/>`
    + `<text class="mon-t" x="${scr.x + 3}" y="${MON.y + 11.5}" data-ui>ART · presiune arterială</text>`
    + `<circle class="mon-led" cx="${MON.x + MON.w - 10}" cy="${MON.y + 8.5}" r="2"/>`
    + `</g>`;

  /* ---------- zone apăsabile și insigne ---------- */
  const C = SB.anchors.corner;
  const hits = {
    dil: { x: C.fbl[0] + 4, y: C.ftl[1] - 2, w: 92, h: 44 },
    sweat: [{ cx: SB.anchors.glands[0][0], cy: SB.anchors.glands[0][1], r: 12 }, { cx: SB.anchors.glands[1][0], cy: SB.anchors.glands[1][1], r: 12 }, { cx: SB.anchors.pores[0][0], cy: SB.anchors.pores[0][1] - 3, r: 9 }],
    vol: [{ x: 70, y: 130, w: 26, h: 58 }, { x: 186, y: 319, w: 70, h: 16 }],
    vr: { x: 84, y: 284, w: 28, h: 72 },
    heart: { x: A.box.x, y: A.box.y, w: A.box.w, h: A.box.h },
    bp: { x: MON.x, y: MON.y, w: MON.w, h: MON.h },
    org: [{ x: 4, y: 2, w: 142, h: 92 }, { x: K.box.x, y: K.box.y, w: K.box.w, h: K.box.h }],
  };
  const badges = {
    dil: [C.fbl[0] - 2, C.ftl[1] + 22], sweat: [SB.anchors.glands[1][0] + 18, SB.anchors.glands[1][1] - 6], vol: [66, 166], vr: [116, 346],
    heart: [A.box.x - 4, A.box.y + 58], bp: [MON.x - 6, MON.y + 10], org: [12, 104], org2: [K.box.x + K.box.w + 4, K.box.y + 6],
  };

  /* ---------- fluxul (punctele care curg) ---------- */
  const flow = {
    art: [smooth(aorta.slice(2)), smooth([...bct, ...rcca.slice(1)]), smooth(parA), smooth(renA), ...mca.slice(0, 1).map((p) => smooth(p))],
    ven: [smooth([...rijv, ...rbcv.slice(1), ...svc.slice(1, -1)]), smooth([...rscv, ...rbcv.slice(1)]), smooth(ivc.slice(0, -1)), smooth(skinV), smooth(renV), smooth(lbcv)],
    // ce flux aparține organelor (se rărește la hipoperfuzie): art 1, 3, 4
    org: [1, 3, 4],
  };

  const L = {
    skin: SB.halo + SB.body + SB.vess + SB.outline + SB.top,
    renArt, renVen, vessBack: art,
    heart: HT.svg, pt: pt + ptBranches, brain: BR.svg + mcaSvg, kidney: KD.svg, monitor,
    venBack: ven, venTop, lbcv: lbcvSvg, cuts,
  };
  return {
    W, H, L,
    defs: SB.defs + HT.defs + BR.defs,
    flow, hits, badges,
    heartC: A.center, mon: scr,
    anchors: { skin: SB.anchors.plexus, pores: SB.anchors.pores },
  };
}

/* previzualizare fără aplicație: node art/preview.mjs art/circ.mjs */
export function preview() {
  const A = build();
  const s = (x) => x.replaceAll("__U__", "pv");
  const L = A.L;
  return { viewBox: `0 0 ${W} ${H}`, svg: s(`<defs>${A.defs}</defs>${L.skin}${L.renArt}${L.renVen}${L.kidney}${L.vessBack}${L.venBack}${L.venTop}${L.pt}${L.heart}${L.lbcv}${L.cuts}${L.brain}${L.monitor}`) };
}
export { poly, ribbon, organ };
