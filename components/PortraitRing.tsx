import { Fragment } from "react";
import Image from "next/image";

const WORDS = ["Student", "Builder", "Engineer", "Writer"];

/**
 * Circular colour portrait with a slowly rotating ring of words around it. Kept plain on purpose.
 * Pure SVG + CSS (spin speeds up on hover), no JS. Colours follow the theme tokens.
 */
export function PortraitRing() {
  const ring = [...WORDS, ...WORDS];
  return (
    <div className="portrait-ring">
      <svg className="portrait-ring-text" viewBox="0 0 300 300" aria-hidden="true">
        <defs>
          <path id="portrait-ring-path" d="M150,150 m-132,0 a132,132 0 1,1 264,0 a132,132 0 1,1 -264,0" />
        </defs>
        <text>
          <textPath href="#portrait-ring-path" textLength="826" lengthAdjust="spacing">
            {ring.map((w, i) => (
              <Fragment key={i}>
                {w}
                {" · "}
              </Fragment>
            ))}
          </textPath>
        </text>
      </svg>
      <div className="portrait-ring-photo">
        <Image src="/avatar-1.webp" alt="Abhijit Dalal" fill priority sizes="200px" style={{ objectFit: "cover", objectPosition: "center top" }} />
      </div>
    </div>
  );
}
