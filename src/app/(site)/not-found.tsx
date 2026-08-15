import Link from "next/link";

export default function NotFound() {
  return (
    <section className="simple-state section">
      <div className="shell">
        <p className="eyebrow">404 · Page not found</p>
        <h1>This page has moved on.</h1>
        <p>Let’s get you back to a familiar place.</p>
        <Link className="button" href="/">Return home</Link>
      </div>
    </section>
  );
}
