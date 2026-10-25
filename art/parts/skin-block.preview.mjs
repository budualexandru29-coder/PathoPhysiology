import { skinBlock } from "./skin-block.mjs";
export function preview() {
  const b = skinBlock({ origin: [40, 70], scale: 1.0, uid: "pv" });
  return { viewBox: "0 0 260 260", svg: `<defs>${b.defs}</defs>${b.halo}${b.body}${b.vess}${b.top}${b.outline}` };
}
