export default function Nav() {
  const links = [
    { label: "Services", href: "#services" },
    { label: "Industries", href: "#industries" },
    { label: "Process", href: "#process" },
    { label: "Insights", href: "#insights" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <a href="/" className="text-xl font-semibold tracking-tight">
          Innosphere Solutions
        </a>
        <nav className="flex flex-wrap items-center gap-4 text-sm">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-white/80 hover:text-white">
              {link.label}
            </a>
          ))}
          <button className="rounded-full bg-white text-slate-900 px-4 py-2 text-sm font-semibold">
            Schedule a call
          </button>
        </nav>
      </div>
    </header>
  );
}
