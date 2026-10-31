import Image from "next/image";

const RING = "Student · Builder · Engineer · Writer · Student · Builder · Engineer · Writer · ";

/**
 * Black-and-white circular portrait with a slowly rotating ring of words around it.
 * Pure SVG + CSS (spin speeds up on hover), no JS. Colors follow the theme tokens.
 */
export function PortraitRing() {
  return (
    <div className="portrait-ring">
      <svg className="portrait-ring-text" viewBox="0 0 300 300" aria-hidden="true">
        <defs>
          <path id="portrait-ring-path" d="M150,150 m-132,0 a132,132 0 1,1 264,0 a132,132 0 1,1 -264,0" />
        </defs>
        <text>
          <textPath href="#portrait-ring-path" textLength="826" lengthAdjust="spacing">{RING}</textPath>
        </text>
      </svg>
      <div className="portrait-ring-photo">
        <Image src="/avatar-1.webp" alt="Abhijit Dalal" fill priority sizes="200px" style={{ objectFit: "cover", objectPosition: "center top" }} />
      </div>
    </div>
  );
}
