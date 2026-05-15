type ProjectMockupProps = {
  category: string;
};

function normalizeCategory(category: string) {
  return category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function BookingMockup() {
  return (
    <div className="grid h-full gap-3 rounded-2xl border border-white/15 bg-white/[0.08] p-4">
      <div className="rounded-xl bg-white p-3 text-ink">
        <div className="h-3 w-20 rounded-full bg-ocean/25" />
        <div className="mt-3 h-4 w-28 rounded-full bg-ink/20" />
        <div className="mt-2 h-3 w-20 rounded-full bg-slate-200" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className={`h-7 rounded-lg ${index === 5 ? "bg-mint" : "bg-white/20"}`}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <span className="rounded-full bg-white/20 px-2 py-1 text-center text-[10px] font-bold">
          09:00
        </span>
        <span className="rounded-full bg-mint px-2 py-1 text-center text-[10px] font-bold text-ink">
          11:30
        </span>
        <span className="rounded-full bg-white/20 px-2 py-1 text-center text-[10px] font-bold">
          15:00
        </span>
      </div>
      <div className="h-8 rounded-full bg-coral" />
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="grid h-full gap-3 rounded-2xl border border-white/15 bg-white/[0.08] p-4">
      <div className="grid grid-cols-3 gap-2">
        <div className="h-12 rounded-xl bg-mint" />
        <div className="h-12 rounded-xl bg-white/20" />
        <div className="h-12 rounded-xl bg-coral" />
      </div>
      <div className="flex h-24 items-end gap-2 rounded-xl bg-white/10 p-3">
        {[42, 68, 52, 84, 62, 92].map((height) => (
          <div
            key={height}
            className="flex-1 rounded-t-lg bg-mint"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="grid gap-2">
        <div className="h-3 rounded-full bg-white/25" />
        <div className="h-3 rounded-full bg-white/15" />
        <div className="h-3 rounded-full bg-white/15" />
      </div>
    </div>
  );
}

function AutomationMockup() {
  return (
    <div className="grid h-full place-items-center rounded-2xl border border-white/15 bg-white/[0.08] p-4">
      <div className="grid w-full gap-3">
        {["Carpeta origen", "Archivo Excel", "Proceso automático", "Reporte generado"].map(
          (item, index) => (
            <div key={item} className="flex items-center gap-3">
              <div className="rounded-xl bg-white px-3 py-2 text-xs font-black text-ink">
                {item}
              </div>
              {index < 3 ? (
                <div className="h-1 flex-1 rounded-full bg-mint" />
              ) : null}
            </div>
          ),
        )}
      </div>
    </div>
  );
}

function MobileMockup() {
  return (
    <div className="mx-auto h-full max-w-40 rounded-[1.7rem] border border-white/20 bg-white p-3 text-ink">
      <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-slate-300" />
      <div className="rounded-2xl bg-ink p-3">
        <div className="h-3 w-20 rounded-full bg-mint" />
        <div className="mt-4 grid gap-2">
          <div className="h-12 rounded-xl bg-white/20" />
          <div className="h-12 rounded-xl bg-white/10" />
          <div className="h-12 rounded-xl bg-white/10" />
        </div>
        <div className="mt-4 h-8 rounded-full bg-coral" />
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="h-2 rounded-full bg-mint" />
          <div className="h-2 rounded-full bg-white/20" />
          <div className="h-2 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
}

function ApiMockup() {
  return (
    <div className="grid h-full gap-3 rounded-2xl border border-white/15 bg-white/[0.08] p-4">
      <div className="grid grid-cols-[1fr_0.35fr_1fr] items-center gap-2">
        <div className="rounded-xl bg-white p-3 text-xs font-black text-ink">
          API
        </div>
        <div className="h-1 rounded-full bg-mint" />
        <div className="rounded-xl bg-mint p-3 text-xs font-black text-ink">
          DB
        </div>
      </div>
      <div className="grid gap-2">
        {["GET /projects", "POST /booking", "PUT /reports"].map((endpoint) => (
          <div
            key={endpoint}
            className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold"
          >
            {endpoint}
          </div>
        ))}
      </div>
    </div>
  );
}

function GenericMockup() {
  return (
    <div className="h-full rounded-2xl border border-white/15 bg-gradient-to-br from-white/20 via-mint/20 to-coral/20 p-5">
      <div className="mb-5 h-3 w-28 rounded-full bg-mint" />
      <div className="grid gap-4">
        <div className="h-12 rounded-2xl bg-white/20" />
        <div className="h-12 rounded-2xl bg-white/10" />
        <div className="h-24 rounded-2xl bg-white/10" />
      </div>
    </div>
  );
}

export function ProjectMockup({ category }: ProjectMockupProps) {
  const normalizedCategory = normalizeCategory(category);

  if (normalizedCategory.includes("reserva")) {
    return <BookingMockup />;
  }

  if (
    normalizedCategory.includes("dato") ||
    normalizedCategory.includes("analisis") ||
    normalizedCategory.includes("dashboard")
  ) {
    return <DashboardMockup />;
  }

  if (normalizedCategory.includes("automatizacion")) {
    return <AutomationMockup />;
  }

  if (normalizedCategory.includes("movil")) {
    return <MobileMockup />;
  }

  if (normalizedCategory.includes("api") || normalizedCategory.includes("base")) {
    return <ApiMockup />;
  }

  return <GenericMockup />;
}
