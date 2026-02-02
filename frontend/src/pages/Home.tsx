const services = [
  {
    title: "Digital Strategy",
    description:
      "Vision workshops, experience roadmaps, and measurable KPIs that align teams around growth.",
  },
  {
    title: "Product Engineering",
    description:
      "Full-stack delivery squads that design, build, and scale cloud-native platforms.",
  },
  {
    title: "Data & AI",
    description:
      "Analytics pipelines, dashboards, and AI enablement to move from data to decisions.",
  },
  {
    title: "Managed Growth",
    description:
      "Always-on optimization, performance tuning, and proactive governance for stability.",
  },
];

const industries = [
  "EdTech & Learning",
  "Healthcare",
  "FinTech",
  "Retail & Commerce",
  "Real Estate",
  "Logistics",
];

const outcomes = [
  {
    title: "Launch faster",
    value: "6-10 weeks",
    detail: "Typical MVP delivery window with agile squads.",
  },
  {
    title: "Retention uplift",
    value: "+28%",
    detail: "Average engagement lift after experience refresh.",
  },
  {
    title: "Cost optimization",
    value: "-32%",
    detail: "Infrastructure savings through cloud re-architecture.",
  },
];

const process = [
  {
    step: "01",
    title: "Discover",
    text: "Stakeholder interviews, product audit, and opportunity mapping.",
  },
  {
    step: "02",
    title: "Design",
    text: "UX prototypes, content systems, and rapid validation loops.",
  },
  {
    step: "03",
    title: "Deliver",
    text: "Agile sprints, QA automation, and release readiness.",
  },
  {
    step: "04",
    title: "Scale",
    text: "Performance tuning, analytics, and continuous improvement.",
  },
];

const insights = [
  {
    title: "Bridging the AI adoption gap",
    text: "How to operationalize AI initiatives without overwhelming teams.",
  },
  {
    title: "Designing for trust",
    text: "Why experience consistency is the new loyalty engine.",
  },
  {
    title: "Cloud modernization playbook",
    text: "Steps to reduce cloud spend while improving speed.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
              Innosphere Solutions
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight">
              Modern digital experiences that help ambitious teams launch, scale,
              and lead with confidence.
            </h1>
            <p className="mt-6 text-lg text-white/70">
              We partner with growth-focused businesses to craft human-centered
              products, strong data foundations, and resilient cloud platforms.
              Everything is delivered by senior strategists, designers, and
              engineers working as an extension of your team.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-white text-slate-900 px-6 py-3 font-semibold">
                Request a proposal
              </button>
              <button className="rounded-full border border-white/30 px-6 py-3 text-white/90">
                View case studies
              </button>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-6 text-sm text-white/70">
              <div>
                <div className="text-2xl font-semibold text-white">120+</div>
                Global client engagements
              </div>
              <div>
                <div className="text-2xl font-semibold text-white">8</div>
                Delivery studios worldwide
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-xl font-semibold">Brainstorming sprint</h2>
            <p className="mt-3 text-white/70">
              Align stakeholders, map priorities, and turn scattered ideas into a
              structured product roadmap.
            </p>
            <ul className="mt-6 space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400"></span>
                Vision & goal alignment workshops
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400"></span>
                Experience audits and usability reviews
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400"></span>
                90-day delivery plan with milestones
              </li>
            </ul>
            <div className="mt-8 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 p-6 text-sm text-white/80">
              "They helped us restructure our offering in days and shipped a
              launch-ready roadmap in two weeks."
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">
              Services
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Built for clarity and momentum</h2>
          </div>
          <p className="text-white/70 max-w-xl">
            From early discovery to long-term optimization, we deliver the
            strategic, design, and engineering capabilities needed to transform
            ideas into measurable outcomes.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 text-white/70">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="industries" className="bg-white/5">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">
                Industries
              </p>
              <h2 className="mt-3 text-3xl font-semibold">Sector expertise that feels local</h2>
              <p className="mt-4 text-white/70">
                We blend global delivery with industry-specific insights to help
                organizations tackle complex journeys and regulatory realities.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-white/80">
                {industries.map((item) => (
                  <div key={item} className="rounded-xl border border-white/10 px-4 py-3">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-6">
              {outcomes.map((outcome) => (
                <div
                  key={outcome.title}
                  className="rounded-2xl bg-slate-950 border border-white/10 p-6"
                >
                  <div className="text-sm uppercase tracking-[0.3em] text-white/50">
                    {outcome.title}
                  </div>
                  <div className="mt-2 text-3xl font-semibold text-cyan-300">
                    {outcome.value}
                  </div>
                  <p className="mt-3 text-white/70 text-sm">{outcome.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">
              Process
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Structured collaboration, zero chaos</h2>
          </div>
          <p className="text-white/70 max-w-lg">
            Our delivery framework keeps stakeholders aligned, removes
            bottlenecks, and gives teams a clear line of sight from ideation to
            launch.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {process.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="text-cyan-300 text-sm font-semibold">{item.step}</div>
              <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-white/70">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="insights" className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">
                Insights
              </p>
              <h2 className="mt-3 text-3xl font-semibold">What we are building now</h2>
            </div>
            <button className="rounded-full border border-white/30 px-5 py-2 text-sm">
              Explore resources
            </button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {insights.map((insight) => (
              <div
                key={insight.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-xl font-semibold">{insight.title}</h3>
                <p className="mt-3 text-white/70">{insight.text}</p>
                <a href="#contact" className="mt-6 inline-flex text-cyan-300 text-sm">
                  Read more →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Let’s shape the next release together</h2>
            <p className="mt-4 text-white/70">
              Share your goals, and we will craft a project plan with scope,
              timeline, and a dedicated delivery team within 48 hours.
            </p>
            <div className="mt-8 grid gap-4 text-sm text-white/70">
              <div>
                <div className="text-white font-semibold">Email</div>
                hello@innospheresolutions.in
              </div>
              <div>
                <div className="text-white font-semibold">Phone</div>
                +91 98765 43210
              </div>
              <div>
                <div className="text-white font-semibold">Locations</div>
                Bengaluru · Dubai · Singapore · Austin
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-xl font-semibold">Start a project</h3>
            <p className="mt-3 text-white/70 text-sm">
              Tell us about your product, timeline, and success metrics.
            </p>
            <div className="mt-6 space-y-4 text-sm">
              <input
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white"
                placeholder="Name"
              />
              <input
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white"
                placeholder="Work email"
              />
              <input
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white"
                placeholder="Company"
              />
              <textarea
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white"
                placeholder="Project goals"
                rows={4}
              />
            </div>
            <button className="mt-6 w-full rounded-full bg-cyan-400 text-slate-900 px-6 py-3 font-semibold">
              Send message
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-white/60">
          <div>© 2024 Innosphere Solutions. All rights reserved.</div>
          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Terms</span>
            <span>LinkedIn</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
