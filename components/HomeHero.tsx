import { PortraitRing } from "./PortraitRing";
import { RESUME_URL } from "@/lib/resume";

const GITHUB_PATH = "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z";

const socials = [
  {
    label: "GitHub",
    brand: "github",
    href: "https://github.com/abhijitdalal26",
    icon: <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={GITHUB_PATH} /></svg>,
  },
  {
    label: "X",
    brand: "x",
    href: "https://x.com/abhijitdalal26",
    icon: <svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  },
  {
    label: "Substack",
    brand: "substack",
    href: "https://abhijitdalal.substack.com/",
    icon: <svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" /></svg>,
  },
  {
    label: "Email",
    brand: "email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=agdalal_b23@el.vjti.ac.in",
    icon: <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 8l10 7 10-7" /></svg>,
  },
];

/**
 * Homepage hero: name (with a hand-drawn swoosh under "Dalal"), plain intro text, a "connect" group (CV as the main action + brand-badged
 * social buttons), and the colour portrait ring. Sits over a faint dot grid + glow.
 */
export function HomeHero() {
  return (
    <div className="hero-shell">
      <section className="page-wrap hero">
        <div className="hero-text">
          <h1 className="hero-name">
            Abhijit{" "}
            <span className="hero-name-accent">
              Dalal
              <svg className="hero-swoosh" viewBox="0 0 220 24" preserveAspectRatio="none" aria-hidden="true">
                <path d="M4 17 C 48 7, 112 4, 216 11" pathLength={1} />
              </svg>
            </span>
          </h1>

          <p className="hero-intro">
            Hello, I&apos;m a final year engineer student at VJTI, Mumbai. I love
            working with neural networks, training models, and solving
            real world problems.
          </p>

          <div className="hero-connect">
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="cv-btn">
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h4" />
              </svg>
              View CV
              <span className="cv-btn-arrow" aria-hidden="true">↗</span>
            </a>

            <nav className="hero-links" aria-label="Social links">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={`hero-link hero-link-${s.brand}`}>
                  <span className="hero-link-badge">{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="hero-portrait">
          <PortraitRing />
        </div>
      </section>
    </div>
  );
}
