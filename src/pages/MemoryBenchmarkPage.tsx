import { Fragment, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";
import {
    fullSuite,
    smallSuite,
    type BenchmarkRow,
} from "@/data/memory-benchmark";

type Suite = "full" | "small";
type Filter = "all" | "open" | "clean" | "budget";
type Mode = "valid" | "adjusted";
type SortKey =
    | "score"
    | "valid"
    | "coverage"
    | "precision"
    | "state"
    | "hard"
    | "extreme"
    | "falseWrites"
    | "cost";

const reveal = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.5 },
};

function splitModel(model: string) {
    const i = model.indexOf("/");
    return i === -1
        ? { org: "", name: model }
        : { org: model.slice(0, i + 1), name: model.slice(i + 1) };
}

function formatCost(cost: number | null) {
    if (cost === null) return "n/a";
    if (cost === 0) return "$0";
    return cost < 0.1 ? `$${cost.toFixed(4)}` : `$${cost.toFixed(2)}`;
}

function scoreTone(score: number) {
    if (score >= 90) return "text-primary";
    if (score >= 80) return "text-white/85";
    if (score >= 70) return "text-white/55";
    return "text-red-300/80";
}

function displayScore(row: BenchmarkRow, mode: Mode) {
    return mode === "valid" ? row.score : row.adjusted;
}

function Eyebrow({ children }: { children: string }) {
    return (
        <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-primary/40" />
            <span className="text-primary text-[11px] font-semibold uppercase tracking-[0.2em]">
                {children}
            </span>
        </div>
    );
}

function SectionHead({
    eyebrow,
    title,
    accent,
    lead,
}: {
    eyebrow: string;
    title: string;
    accent: string;
    lead?: string;
}) {
    return (
        <div className="mb-8">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                {title}{" "}
                <span className="font-display italic text-primary">{accent}</span>
            </h2>
            {lead && (
                <p className="text-[15px] text-white/35 leading-[1.7] max-w-2xl">
                    {lead}
                </p>
            )}
        </div>
    );
}

function Pill({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            onClick={onClick}
            className={`shrink-0 px-3.5 py-1.5 text-[13px] font-medium rounded-full border transition-colors ${
                active
                    ? "text-white bg-white/[0.08] border-white/[0.12]"
                    : "text-white/40 border-white/[0.06] hover:text-white/60 hover:border-white/[0.1]"
            }`}
        >
            {children}
        </button>
    );
}

const stats = [
    { value: "100", label: "Fictional chats" },
    { value: "123", label: "Extraction windows" },
    { value: "8", label: "Languages" },
    { value: "36", label: "Models" },
    { value: "2,974", label: "Blind-graded runs" },
    { value: "$13.99", label: "Total API spend" },
];

const picks = [
    {
        label: "Best overall",
        model: "google/gemini-4-neon",
        figures: [
            { value: "94.04", label: "Score" },
            { value: "95.8%", label: "Precision" },
            { value: "1", label: "False write" },
        ],
        text: "Highest score with the tightest write discipline: 407 writes across 100 chats, 12 of them noise. First on Easy and Medium.",
    },
    {
        label: "Hardest cases, no false writes",
        model: "google/gemini-4-carbon",
        figures: [
            { value: "95.94", label: "Extreme" },
            { value: "98.4%", label: "State" },
            { value: "0", label: "False writes" },
        ],
        text: "Second overall, first on Extreme and on retiring stale records. Not a single false memory in 100 chats, at less than half the cost of neon.",
    },
    {
        label: "Best value",
        model: "deepseek/deepseek-v4.1-flash-1017",
        figures: [
            { value: "90.82", label: "Score" },
            { value: "97.3%", label: "Coverage" },
            { value: "$0.014", label: "100 chats" },
        ],
        text: "96.6% of the top score at 1/146 of its cost. Strong on Extreme, with small attribution slips on casual chats.",
    },
    {
        label: "Best small model",
        model: "google/gemma-4-31b-it",
        figures: [
            { value: "84.20", label: "Score" },
            { value: "100%", label: "State" },
            { value: "0", label: "False writes" },
        ],
        text: "Tested on the 50-chat subset. Zero false writes, perfect retain and retire decisions, and within 1.3 points of qwen3.8-27b.",
    },
];

function MetricBar({ label, value }: { label: string; value: number }) {
    return (
        <div>
            <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-[12px] text-white/40">{label}</span>
                <span className={`text-[13px] font-semibold tabular-nums ${scoreTone(value)}`}>
                    {value.toFixed(2)}
                </span>
            </div>
            <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
                <div
                    className="h-full rounded-full bg-primary/70"
                    style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
                />
            </div>
        </div>
    );
}

function WriteBreakdown({ row }: { row: BenchmarkRow }) {
    const useful = Math.max(0, row.writes - row.noise - row.duplicates - row.falseWrites);
    const parts = [
        { label: "Useful", value: useful, className: "bg-primary/70" },
        { label: "Noise", value: row.noise, className: "bg-white/30" },
        { label: "Duplicate", value: row.duplicates, className: "bg-white/15" },
        { label: "False", value: row.falseWrites, className: "bg-red-400/80" },
    ];
    const total = Math.max(1, row.writes);
    return (
        <div>
            <div className="flex items-baseline justify-between mb-2">
                <span className="text-[12px] text-white/40">Memory writes</span>
                <span className="text-[13px] font-semibold tabular-nums text-white/80">
                    {row.writes}
                </span>
            </div>
            <div className="flex h-2 rounded-full overflow-hidden bg-white/[0.05]">
                {parts.map((p) =>
                    p.value > 0 ? (
                        <div
                            key={p.label}
                            className={p.className}
                            style={{ width: `${(p.value / total) * 100}%` }}
                        />
                    ) : null
                )}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2.5">
                {parts.map((p) => (
                    <span key={p.label} className="flex items-center gap-1.5 text-[12px] text-white/40">
                        <span className={`w-2 h-2 rounded-sm ${p.className}`} />
                        {p.label}
                        <span className="tabular-nums text-white/70">{p.value}</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

const ERROR_LABELS: Record<string, string> = {
    "parse/tool": "Tool or JSON parse failure",
    "http/provider": "Provider HTTP error",
    timeout: "Timed out",
    skipped_by_user: "Skipped",
};

function RowDetail({ row }: { row: BenchmarkRow }) {
    const errors = Object.entries(row.errors);
    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.4fr)] px-5 py-6">
            <div className="space-y-3.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/30">
                    By difficulty
                </p>
                <MetricBar label="Easy" value={row.easy} />
                <MetricBar label="Medium" value={row.medium} />
                <MetricBar label="Hard" value={row.hard} />
                <MetricBar label="Extreme" value={row.extreme} />
            </div>
            <div className="space-y-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/30">
                    Write discipline
                </p>
                <WriteBreakdown row={row} />
                <div className="flex items-baseline justify-between">
                    <span className="text-[12px] text-white/40">Category accuracy</span>
                    <span className="text-[13px] font-semibold tabular-nums text-white/80">
                        {row.category.toFixed(1)}%
                    </span>
                </div>
                {errors.length > 0 && (
                    <div>
                        <p className="text-[12px] text-white/40 mb-1.5">
                            Failed chats ({row.total - row.valid})
                        </p>
                        <ul className="space-y-1">
                            {errors.map(([kind, count]) => (
                                <li key={kind} className="flex justify-between text-[13px] text-white/60">
                                    <span>{ERROR_LABELS[kind] ?? kind}</span>
                                    <span className="tabular-nums">{count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/30 mb-3.5">
                    Grader notes
                </p>
                {row.notes.length === 0 ? (
                    <p className="text-sm text-white/35">No notes recorded.</p>
                ) : (
                    <ul className="space-y-3">
                        {row.notes.map((note, i) => (
                            <li key={i} className="flex gap-3 text-[13px] leading-relaxed text-white/55">
                                <span className="shrink-0 h-5 px-1.5 rounded border border-white/[0.08] bg-white/[0.03] font-mono text-[11px] leading-5 text-white/45">
                                    {note.case || "-"}
                                </span>
                                <span>{note.text}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

const columns: { key: SortKey; label: string; title: string }[] = [
    { key: "valid", label: "Valid", title: "Chats that returned a usable result" },
    { key: "score", label: "Score", title: "Weighted case score" },
    { key: "coverage", label: "Coverage", title: "Expected facts captured" },
    { key: "precision", label: "Precision", title: "Share of writes that were useful; false writes count twice" },
    { key: "state", label: "State", title: "Retired what changed, kept what should stay" },
    { key: "hard", label: "Hard", title: "Score on hard chats" },
    { key: "extreme", label: "Extreme", title: "Score on multi-window extreme chats" },
    { key: "falseWrites", label: "False", title: "Memories that state something untrue" },
    { key: "cost", label: "Cost", title: "OpenRouter spend for the run" },
];

function sortValue(row: BenchmarkRow, key: SortKey, mode: Mode) {
    if (key === "score") return displayScore(row, mode);
    if (key === "cost") return row.cost ?? Number.POSITIVE_INFINITY;
    return row[key];
}

function MobileList({
    rows,
    ranks,
    mode,
    sortKey,
    onSortKey,
    expanded,
    setExpanded,
}: {
    rows: BenchmarkRow[];
    ranks: Map<string, number>;
    mode: Mode;
    sortKey: SortKey;
    onSortKey: (key: SortKey) => void;
    expanded: string | null;
    setExpanded: (model: string | null) => void;
}) {
    return (
        <div className="md:hidden">
            <label className="flex items-center justify-between gap-3 mb-3 text-[12px] text-white/40">
                Sort by
                <select
                    value={sortKey}
                    onChange={(e) => onSortKey(e.target.value as SortKey)}
                    className="h-8 rounded-lg border border-white/[0.08] bg-[#0a0a0a] px-2.5 text-[13px] text-white/80"
                >
                    {columns.map((col) => (
                        <option key={col.key} value={col.key}>
                            {col.label}
                        </option>
                    ))}
                </select>
            </label>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] overflow-hidden">
                {rows.map((row) => {
                    const { org, name } = splitModel(row.model);
                    const open = expanded === row.model;
                    const score = displayScore(row, mode);
                    return (
                        <div key={row.model} className="border-b border-white/[0.05] last:border-b-0">
                            <button
                                onClick={() => setExpanded(open ? null : row.model)}
                                className={`w-full text-left px-4 py-3.5 transition-colors ${open ? "bg-white/[0.03]" : ""}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="w-5 shrink-0 text-[12px] font-semibold tabular-nums text-white/25">
                                        {ranks.get(row.model)}
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-mono text-[11px] text-white/30 truncate">{org.slice(0, -1)}</p>
                                        <p className="font-mono text-[13px] text-white/90 truncate">{name}</p>
                                    </div>
                                    <span className={`text-lg font-semibold tabular-nums ${scoreTone(score)}`}>
                                        {score.toFixed(2)}
                                    </span>
                                </div>
                                <div className="grid grid-cols-4 gap-2 mt-2.5 pl-8 text-[11px]">
                                    <span className="text-white/35">
                                        Prec <span className="tabular-nums text-white/70">{row.precision.toFixed(0)}%</span>
                                    </span>
                                    <span className="text-white/35">
                                        State <span className="tabular-nums text-white/70">{row.state.toFixed(0)}%</span>
                                    </span>
                                    <span className="text-white/35">
                                        False{" "}
                                        <span className={`tabular-nums ${row.falseWrites === 0 ? "text-primary" : "text-white/70"}`}>
                                            {row.falseWrites}
                                        </span>
                                    </span>
                                    <span className="text-right tabular-nums text-white/50">{formatCost(row.cost)}</span>
                                </div>
                                {(row.valid < row.total || row.openWeights || row.baseline) && (
                                    <div className="flex flex-wrap gap-1.5 mt-2 pl-8">
                                        {row.valid < row.total && (
                                            <span className="text-[10px] font-medium text-amber-300/80 border border-amber-300/20 rounded px-1.5 leading-4">
                                                {row.valid}/{row.total} valid
                                            </span>
                                        )}
                                        {row.openWeights && (
                                            <span className="text-[10px] font-medium text-white/40 border border-white/[0.08] rounded px-1.5 leading-4">
                                                open
                                            </span>
                                        )}
                                        {row.baseline && (
                                            <span className="text-[10px] font-medium text-primary/80 border border-primary/20 rounded px-1.5 leading-4">
                                                baseline
                                            </span>
                                        )}
                                    </div>
                                )}
                            </button>
                            {open && (
                                <div className="border-t border-white/[0.05] bg-white/[0.015] [&>div]:px-4">
                                    <RowDetail row={row} />
                                </div>
                            )}
                        </div>
                    );
                })}
                {rows.length === 0 && (
                    <p className="py-10 text-center text-sm text-white/35">
                        No model in this suite matches the filter.
                    </p>
                )}
            </div>
        </div>
    );
}

function Leaderboard({
    suite,
    setSuite,
}: {
    suite: Suite;
    setSuite: (suite: Suite) => void;
}) {
    const [filter, setFilter] = useState<Filter>("all");
    const [mode, setMode] = useState<Mode>("valid");
    const [sortKey, setSortKey] = useState<SortKey>("score");
    const [sortDesc, setSortDesc] = useState(true);
    const [expanded, setExpanded] = useState<string | null>(null);

    const source = suite === "full" ? fullSuite : smallSuite;

    const ranks = useMemo(() => {
        const ordered = [...source].sort(
            (a, b) => displayScore(b, mode) - displayScore(a, mode)
        );
        return new Map(ordered.map((r, i) => [r.model, i + 1]));
    }, [source, mode]);

    const rows = useMemo(() => {
        const filtered = source.filter((r) => {
            if (filter === "open") return r.openWeights;
            if (filter === "clean") return r.falseWrites === 0 && r.valid > 0;
            if (filter === "budget") return r.cost !== null && r.cost < 0.1;
            return true;
        });
        return filtered.sort((a, b) => {
            const diff = sortValue(a, sortKey, mode) - sortValue(b, sortKey, mode);
            return sortDesc ? -diff : diff;
        });
    }, [source, filter, sortKey, sortDesc, mode]);

    const onSort = (key: SortKey) => {
        if (key === sortKey) {
            setSortDesc(!sortDesc);
        } else {
            setSortKey(key);
            setSortDesc(key !== "falseWrites" && key !== "cost");
        }
    };

    const chatCount = suite === "full" ? 100 : 50;

    return (
        <div>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-5">
                <div className="inline-flex p-1 rounded-lg border border-white/[0.06] bg-white/[0.01] self-start">
                    {(
                        [
                            ["full", "Full suite", "24 models, 100 chats"],
                            ["small", "Small and local", "15 models, 50 chats"],
                        ] as const
                    ).map(([key, label, sub]) => (
                        <button
                            key={key}
                            onClick={() => {
                                setSuite(key);
                                setExpanded(null);
                            }}
                            className={`px-4 py-2 rounded-md text-left transition-colors ${
                                suite === key
                                    ? "bg-white/[0.07] text-white"
                                    : "text-white/40 hover:text-white/70"
                            }`}
                        >
                            <span className="block text-[13px] font-semibold">{label}</span>
                            <span className="block text-[11px] text-white/35">{sub}</span>
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap">
                    <Pill active={filter === "all"} onClick={() => setFilter("all")}>
                        All
                    </Pill>
                    <Pill active={filter === "open"} onClick={() => setFilter("open")}>
                        Open weights
                    </Pill>
                    <Pill active={filter === "clean"} onClick={() => setFilter("clean")}>
                        Zero false writes
                    </Pill>
                    <Pill active={filter === "budget"} onClick={() => setFilter("budget")}>
                        Under $0.10
                    </Pill>
                    <span className="shrink-0 w-px h-5 bg-white/[0.08] mx-1" />
                    <Pill active={mode === "valid"} onClick={() => setMode("valid")}>
                        Valid only
                    </Pill>
                    <Pill active={mode === "adjusted"} onClick={() => setMode("adjusted")}>
                        Completion-adjusted
                    </Pill>
                </div>
            </div>

            <MobileList
                rows={rows}
                ranks={ranks}
                mode={mode}
                sortKey={sortKey}
                onSortKey={(key) => {
                    setSortKey(key);
                    setSortDesc(key !== "falseWrites" && key !== "cost");
                }}
                expanded={expanded}
                setExpanded={setExpanded}
            />

            <div className="hidden md:block rounded-xl border border-white/[0.06] bg-white/[0.01] overflow-x-auto">
                <table className="w-full min-w-[980px] text-left">
                    <thead>
                        <tr className="border-b border-white/[0.06]">
                            <th className="sticky left-0 z-10 bg-[#080808] py-3 pl-5 pr-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30 w-[340px]">
                                Model
                            </th>
                            {columns.map((col) => {
                                const active = sortKey === col.key;
                                return (
                                    <th key={col.key} className="py-3 px-3 text-right" title={col.title}>
                                        <button
                                            onClick={() => onSort(col.key)}
                                            className={`inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                                                active ? "text-white" : "text-white/30 hover:text-white/60"
                                            }`}
                                        >
                                            {col.label}
                                            {active &&
                                                (sortDesc ? (
                                                    <ArrowDown className="w-3 h-3" />
                                                ) : (
                                                    <ArrowUp className="w-3 h-3" />
                                                ))}
                                        </button>
                                    </th>
                                );
                            })}
                            <th className="w-10" />
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => {
                            const { org, name } = splitModel(row.model);
                            const open = expanded === row.model;
                            const score = displayScore(row, mode);
                            return (
                                <Fragment key={row.model}>
                                    <tr
                                        onClick={() => setExpanded(open ? null : row.model)}
                                        className={`group cursor-pointer border-b border-white/[0.04] transition-colors ${
                                            open ? "bg-white/[0.03]" : "hover:bg-white/[0.02]"
                                        }`}
                                    >
                                        <td
                                            className={`sticky left-0 z-10 py-3 pl-5 pr-3 transition-colors ${
                                                open ? "bg-[#0d0d0d]" : "bg-[#080808] group-hover:bg-[#0b0b0b]"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="w-6 shrink-0 text-[13px] font-semibold tabular-nums text-white/25">
                                                    {ranks.get(row.model)}
                                                </span>
                                                <div className="min-w-0 flex items-center gap-2">
                                                    <div className="font-mono text-[13px] truncate">
                                                        <span className="text-white/30">{org}</span>
                                                        <span className="text-white/90">{name}</span>
                                                    </div>
                                                    <div className="flex gap-1.5 shrink-0">
                                                        {row.openWeights && (
                                                            <span className="text-[10px] font-medium text-white/40 border border-white/[0.08] rounded px-1.5 leading-4">
                                                                open
                                                            </span>
                                                        )}
                                                        {row.baseline && (
                                                            <span className="text-[10px] font-medium text-primary/80 border border-primary/20 rounded px-1.5 leading-4">
                                                                baseline
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-3 text-right text-[13px] tabular-nums">
                                            <span className={row.valid < row.total ? "text-amber-300/80" : "text-white/45"}>
                                                {row.valid}
                                            </span>
                                            <span className="text-white/20">/{row.total}</span>
                                        </td>
                                        <td className="py-3 px-3 text-right">
                                            <span className={`text-[15px] font-semibold tabular-nums ${scoreTone(score)}`}>
                                                {score.toFixed(2)}
                                            </span>
                                        </td>
                                        <td className="py-3 px-3 text-right text-[13px] tabular-nums text-white/60">
                                            {row.coverage.toFixed(1)}%
                                        </td>
                                        <td className="py-3 px-3 text-right text-[13px] tabular-nums text-white/60">
                                            {row.precision.toFixed(1)}%
                                        </td>
                                        <td className="py-3 px-3 text-right text-[13px] tabular-nums text-white/60">
                                            {row.state.toFixed(1)}%
                                        </td>
                                        <td className={`py-3 px-3 text-right text-[13px] tabular-nums ${scoreTone(row.hard)}`}>
                                            {row.hard.toFixed(2)}
                                        </td>
                                        <td className={`py-3 px-3 text-right text-[13px] tabular-nums ${scoreTone(row.extreme)}`}>
                                            {row.extreme.toFixed(2)}
                                        </td>
                                        <td className="py-3 px-3 text-right text-[13px] tabular-nums">
                                            <span
                                                className={
                                                    row.falseWrites === 0
                                                        ? "text-primary"
                                                        : row.falseWrites >= 30
                                                          ? "text-red-300/80"
                                                          : "text-white/60"
                                                }
                                            >
                                                {row.falseWrites}
                                            </span>
                                        </td>
                                        <td
                                            className="py-3 px-3 text-right text-[13px] tabular-nums text-white/45"
                                            title={row.cost === null ? "Reused from the full-suite run" : undefined}
                                        >
                                            {formatCost(row.cost)}
                                        </td>
                                        <td className="py-3 pr-4 text-right">
                                            <ChevronDown
                                                className={`w-4 h-4 text-white/20 transition-transform ${open ? "rotate-180" : ""}`}
                                            />
                                        </td>
                                    </tr>
                                    {open && (
                                        <tr className="border-b border-white/[0.06] bg-white/[0.015]">
                                            <td colSpan={columns.length + 2} className="p-0">
                                                <AnimatePresence initial>
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -4 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <RowDetail row={row} />
                                                    </motion.div>
                                                </AnimatePresence>
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            );
                        })}
                        {rows.length === 0 && (
                            <tr>
                                <td colSpan={columns.length + 2} className="py-10 text-center text-sm text-white/35">
                                    No model in this suite matches the filter.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <p className="mt-3 text-[12px] text-white/30 leading-relaxed max-w-3xl">
                Click a row for difficulty scores, write breakdown and grader notes. Valid-only scores
                are computed over each model's usable results out of {chatCount} chats.
                Completion-adjusted multiplies by the share that completed, so failed chats count
                against the model.
                {suite === "small" &&
                    " Baselines were reused from the full-suite run on the same 50 chats, so no separate cost is listed."}
            </p>
        </div>
    );
}

function CostChart({ suite }: { suite: Suite }) {
    const [hover, setHover] = useState<string | null>(null);
    const source = suite === "full" ? fullSuite : smallSuite;
    const points = source.filter((r) => r.cost !== null && r.cost > 0 && r.valid > 0);

    const W = 1000;
    const H = 440;
    const pad = { l: 56, r: 28, t: 24, b: 48 };

    const costs = points.map((p) => p.cost as number);
    const minLog = Math.floor(Math.log10(Math.min(...costs)));
    const maxLog = Math.ceil(Math.log10(Math.max(...costs)));
    const minScore = Math.floor(Math.min(...points.map((p) => p.score)) / 10) * 10;
    const maxScore = 100;

    const x = (cost: number) =>
        pad.l + ((Math.log10(cost) - minLog) / (maxLog - minLog)) * (W - pad.l - pad.r);
    const y = (score: number) =>
        pad.t + (1 - (score - minScore) / (maxScore - minScore)) * (H - pad.t - pad.b);

    const frontier: BenchmarkRow[] = [];
    let best = -1;
    for (const p of [...points]
        .filter((p) => p.valid === p.total)
        .sort((a, b) => (a.cost as number) - (b.cost as number))) {
        if (p.score > best) {
            frontier.push(p);
            best = p.score;
        }
    }
    const frontierSet = new Set(frontier.map((p) => p.model));

    const xTicks: number[] = [];
    for (let e = minLog; e <= maxLog; e++) xTicks.push(10 ** e);
    const yTicks: number[] = [];
    for (let s = minScore; s <= maxScore; s += 10) yTicks.push(s);

    const labelPlacement = (index: number, p: BenchmarkRow) => {
        const cx = x(p.cost as number);
        const next = frontier[index + 1];
        const prev = frontier[index - 1];
        const crowdedRight = next && x(next.cost as number) - cx < 160;
        const crowdedLeft = prev && cx - x(prev.cost as number) < 160;
        const below = index % 2 === 1;
        const anchorEnd =
            cx > W - pad.r - 160 || (crowdedRight && !crowdedLeft && cx - pad.l > 180);
        return {
            x: anchorEnd ? cx - 10 : cx + 10,
            y: below ? y(p.score) + 20 : y(p.score) - 10,
            anchor: anchorEnd ? ("end" as const) : ("start" as const),
        };
    };

    const hovered = points.find((p) => p.model === hover);

    return (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-4 sm:p-6">
            <div className="relative">
                <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Score against cost per model">
                    {yTicks.map((s) => (
                        <g key={s}>
                            <line x1={pad.l} x2={W - pad.r} y1={y(s)} y2={y(s)} stroke="rgba(255,255,255,0.05)" />
                            <text x={pad.l - 12} y={y(s) + 4} textAnchor="end" fontSize="12" fill="rgba(255,255,255,0.3)">
                                {s}
                            </text>
                        </g>
                    ))}
                    {xTicks.map((c) => (
                        <g key={c}>
                            <line x1={x(c)} x2={x(c)} y1={pad.t} y2={H - pad.b} stroke="rgba(255,255,255,0.04)" />
                            <text x={x(c)} y={H - pad.b + 22} textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.3)">
                                {c >= 1 ? `$${c}` : `$${c.toFixed(Math.max(0, -Math.log10(c)))}`}
                            </text>
                        </g>
                    ))}
                    <text x={W - pad.r} y={H - 8} textAnchor="end" fontSize="12" fill="rgba(255,255,255,0.3)">
                        Cost for the run, log scale
                    </text>

                    <polyline
                        points={frontier.map((p) => `${x(p.cost as number)},${y(p.score)}`).join(" ")}
                        fill="none"
                        stroke="var(--color-primary)"
                        strokeOpacity="0.45"
                        strokeWidth="1.5"
                        strokeDasharray="5 5"
                    />

                    {points.map((p) => {
                        const cx = x(p.cost as number);
                        const cy = y(p.score);
                        const failed = p.valid < p.total;
                        const clean = p.falseWrites === 0;
                        const active = hover === p.model;
                        return (
                            <g
                                key={p.model}
                                onMouseEnter={() => setHover(p.model)}
                                onMouseLeave={() => setHover(null)}
                                className="cursor-default"
                            >
                                <circle cx={cx} cy={cy} r="14" fill="transparent" />
                                <circle
                                    cx={cx}
                                    cy={cy}
                                    r={active ? 7 : 5.5}
                                    fill={failed ? "transparent" : clean ? "var(--color-primary)" : "rgba(255,255,255,0.55)"}
                                    stroke={failed ? "rgba(252,165,165,0.8)" : "rgba(5,5,5,0.9)"}
                                    strokeWidth={failed ? 1.5 : 1}
                                />
                                {frontierSet.has(p.model) && (
                                    <text
                                        {...(() => {
                                            const l = labelPlacement(
                                                frontier.findIndex((f) => f.model === p.model),
                                                p
                                            );
                                            return { x: l.x, y: l.y, textAnchor: l.anchor };
                                        })()}
                                        fontSize="12"
                                        fill="rgba(255,255,255,0.6)"
                                        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                                    >
                                        {splitModel(p.model).name}
                                    </text>
                                )}
                            </g>
                        );
                    })}
                </svg>
                {hovered && (
                    <div
                        className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-white/[0.1] bg-[#0b0b0b]/95 px-3 py-2 shadow-xl"
                        style={{
                            left: `${(x(hovered.cost as number) / W) * 100}%`,
                            top: `calc(${(y(hovered.score) / H) * 100}% - 12px)`,
                        }}
                    >
                        <p className="font-mono text-[12px] text-white whitespace-nowrap">{hovered.model}</p>
                        <p className="text-[12px] text-white/45 tabular-nums whitespace-nowrap">
                            {hovered.score.toFixed(2)} score, {formatCost(hovered.cost)}, {hovered.falseWrites} false
                            {hovered.valid < hovered.total && `, ${hovered.valid}/${hovered.total} valid`}
                        </p>
                    </div>
                )}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 pl-1 text-[12px] text-white/40">
                <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" /> No false writes
                </span>
                <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/55" /> Some false writes
                </span>
                <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full border border-red-300/80" /> Failed one or more chats
                </span>
                <span className="flex items-center gap-2">
                    <span className="w-4 border-t border-dashed border-primary/60" /> Best score for the money
                </span>
            </div>
        </div>
    );
}

const tiers = [
    { tier: "Easy", chats: 30, facts: "0.93", writes: "4.34", state: "0/30", precision: "69.0%", noise: "23.6%" },
    { tier: "Medium", chats: 30, facts: "1.23", writes: "4.47", state: "5/30", precision: "84.6%", noise: "6.1%" },
    { tier: "Hard", chats: 30, facts: "1.97", writes: "5.09", state: "16/30", precision: "94.6%", noise: "0.2%" },
    { tier: "Extreme", chats: 10, facts: "3.70", writes: "11.89", state: "10/10", precision: "91.5%", noise: "2.1%" },
];

const failureModes = [
    {
        title: "Stale present tense",
        model: "anthropic/claude-sonnet-5.5",
        caseId: "X07",
        quote: "R-19 holds the original Foxbridge seal and E-19 holds the study cast",
        text: "Written in the second window and left pinned after the third window moved both objects. The record was true when written and wrong by the end of the chat. The same pattern showed up in X02 after a suspect was cleared.",
    },
    {
        title: "Wrong person",
        model: "deepseek/deepseek-v4.1-flash-1017",
        caseId: "E22",
        quote: "Marcos's brother left a tin box beside the boat",
        text: "Marcos said \"tu hermano\" about Dalia's relative. The model scored 92.84 on Extreme and still slipped on who did what in short casual chats.",
    },
    {
        title: "Leaked context",
        model: "x-ai/grok-4.7",
        caseId: "X02",
        quote: "The goal rule is exactly five percent with no rounding",
        text: "A rule from nowhere, written into a harbor archive roleplay. Nothing in the transcript mentions percentages or exits.",
    },
    {
        title: "Role reversal",
        model: "tencent/hy4",
        caseId: "E06",
        quote: "the user",
        text: "First on Hard at 97.89 and 77.23 on Easy, with 33 false writes. It kept labelling the character it was playing as the user, in E06, E21 and E28.",
    },
];

const fullFailures = [
    {
        model: "mistralai/mistral-large-4-0",
        count: 21,
        text: "15 empty or invalid structured fallbacks and 6 truncated JSON responses. It failed 7 of 10 Extreme chats, so its Hard and Extreme scores come from the chats it survived.",
    },
    {
        model: "aion-labs/aion-3.5-mini",
        count: 7,
        text: "5 invalid structured fallbacks and 2 truncated JSON responses. Half of the Extreme chats failed.",
    },
    {
        model: "nvidia/nemotron-3.5-lightning",
        count: 6,
        text: "6 empty or invalid structured fallbacks. Half of the Extreme chats failed.",
    },
    {
        model: "tencent/hy4",
        count: 2,
        text: "One provider HTTP 400 and one empty structured fallback.",
    },
    {
        model: "z-ai/glm-5.3-flash",
        count: 1,
        text: "One structured fallback with an invalid operation.",
    },
];

const weights = [
    { label: "Fact coverage", value: 50, className: "bg-primary/80" },
    { label: "Write precision", value: 20, className: "bg-primary/55" },
    { label: "Category", value: 15, className: "bg-primary/35" },
    { label: "Retain and retire", value: 15, className: "bg-primary/20" },
];


export function MemoryBenchmarkPage() {
    const [suite, setSuite] = useState<Suite>("full");

    return (
        <>
            <SEO
                title="Roleplay Memory Benchmark"
                description="36 models tested on how well they write and update long-term memory in roleplay: 100 fictional chats in 8 languages, graded blind for coverage, false writes and stale records."
                path="/benchmarks/memory"
                jsonLd={buildBreadcrumbSchema([
                    { name: "Home", path: "/" },
                    { name: "Memory benchmark", path: "/benchmarks/memory" },
                ])}
            />
            <main className="min-h-screen bg-[#050505] pt-28 pb-24">
                <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
                    <motion.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-14"
                    >
                        <Eyebrow>Memory benchmark</Eyebrow>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 max-w-3xl">
                            Which models{" "}
                            <span className="font-display italic text-primary">remember</span>{" "}
                            the right things
                        </h1>
                        <p className="text-[15px] text-white/35 leading-[1.7] max-w-2xl">
                            LettuceAI's dynamic memory asks a model to read the latest part of a chat and
                            decide what to keep, what to update and what to let go. We gave 36 models the
                            same 100 roleplay chats and the same memory prompt the app uses, then graded
                            every memory they wrote without knowing which model wrote it.
                        </p>
                    </motion.header>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 rounded-xl border border-white/[0.06] bg-white/[0.01] mb-16 overflow-hidden"
                    >
                        {stats.map((s, i) => (
                            <div
                                key={s.label}
                                className={`px-5 py-5 border-white/[0.06] ${i > 0 ? "border-l" : ""} ${
                                    i >= 2 ? "max-sm:border-t" : ""
                                } ${i % 2 === 0 ? "max-sm:border-l-0" : ""} ${
                                    i >= 3 ? "sm:max-lg:border-t" : ""
                                } ${i % 3 === 0 ? "sm:max-lg:border-l-0" : ""}`}
                            >
                                <div className="text-2xl font-bold text-white tabular-nums tracking-tight">
                                    {s.value}
                                </div>
                                <div className="text-[12px] text-white/35 mt-1">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.section {...reveal} className="mb-20">
                        <SectionHead eyebrow="Results" title="Four" accent="standouts" />
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {picks.map((pick) => {
                                const { org, name } = splitModel(pick.model);
                                return (
                                    <div
                                        key={pick.model}
                                        className="flex flex-col rounded-xl border border-white/[0.06] bg-white/[0.01] p-6 hover:border-white/[0.1] transition-colors"
                                    >
                                        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/90 mb-3">
                                            {pick.label}
                                        </span>
                                        <p className="font-mono text-[14px] mb-5 break-all">
                                            <span className="text-white/30">{org}</span>
                                            <span className="text-white">{name}</span>
                                        </p>
                                        <div className="grid grid-cols-3 gap-3 mb-5">
                                            {pick.figures.map((f) => (
                                                <div key={f.label}>
                                                    <div className="text-xl font-bold text-white tabular-nums tracking-tight">
                                                        {f.value}
                                                    </div>
                                                    <div className="text-[11px] text-white/35">{f.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-sm text-white/40 leading-relaxed mt-auto">{pick.text}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.section>

                    <motion.section {...reveal} className="mb-20">
                        <SectionHead
                            eyebrow="Leaderboard"
                            title="Every model,"
                            accent="every number"
                            lead="Small and local-class models ran on a stratified 50-chat subset: 15 easy, 15 medium, 15 hard and 5 extreme. Three models from the full run were scored on the same subset as anchors."
                        />
                        <Leaderboard suite={suite} setSuite={setSuite} />
                    </motion.section>

                    <motion.section {...reveal} className="mb-20">
                        <SectionHead
                            eyebrow="Cost"
                            title="Score against"
                            accent="price"
                            lead={
                                suite === "full"
                                    ? "OpenRouter spend for all 100 chats. The dashed line connects models that beat everything cheaper than them while completing every chat."
                                    : "OpenRouter spend for the 50-chat subset. Baselines reused from the full run have no separate cost and are left out."
                            }
                        />
                        <CostChart suite={suite} />
                    </motion.section>

                    <motion.section {...reveal} className="mb-20 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                        <div>
                            <SectionHead eyebrow="Difficulty" title="Why easy chats" accent="score lower" />
                            <div className="space-y-4 text-[15px] text-white/40 leading-[1.75]">
                                <p>
                                    Difficulty describes how tangled a chat is: how many windows it spans, how
                                    many conditional rules it holds and how often the state changes. It does not
                                    predict the average score, and across the full suite Easy is the lowest tier.
                                </p>
                                <p>
                                    Easy chats are short and casual, with less than one durable fact on average.
                                    Models still write more than four memories per chat, and almost a quarter of
                                    them are passing scene details. On the two chats where the right answer is to
                                    write nothing, 45 of 47 runs wrote something anyway.
                                </p>
                                <p>
                                    A single mistake also weighs more on a short chat. When there is nothing to
                                    learn, precision is the whole score, so one noise write out of two drops the
                                    chat from 100 to 50. A category mix-up costs 17.6 points on a one-fact chat
                                    and 4.4 on a four-fact extreme chat.
                                </p>
                            </div>
                        </div>
                        <div className="lg:pt-[92px]">
                            <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] overflow-x-auto">
                                <table className="w-full min-w-[560px] text-left">
                                    <thead>
                                        <tr className="border-b border-white/[0.06] text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30">
                                            <th className="py-3 pl-5 pr-3">Tier</th>
                                            <th className="py-3 px-3 text-right">Facts / chat</th>
                                            <th className="py-3 px-3 text-right">Writes / chat</th>
                                            <th className="py-3 px-3 text-right">State cases</th>
                                            <th className="py-3 px-3 text-right">Precision</th>
                                            <th className="py-3 pl-3 pr-5 text-right">Noise</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tiers.map((t) => (
                                            <tr key={t.tier} className="border-b border-white/[0.04] last:border-b-0 text-[13px] tabular-nums">
                                                <td className="py-3.5 pl-5 pr-3">
                                                    <span className="font-medium text-white/85">{t.tier}</span>
                                                    <span className="text-white/30 ml-2">{t.chats}</span>
                                                </td>
                                                <td className="py-3.5 px-3 text-right text-white/60">{t.facts}</td>
                                                <td className="py-3.5 px-3 text-right text-white/60">{t.writes}</td>
                                                <td className="py-3.5 px-3 text-right text-white/60">{t.state}</td>
                                                <td className="py-3.5 px-3 text-right text-white/60">{t.precision}</td>
                                                <td className="py-3.5 pl-3 pr-5 text-right text-white/60">{t.noise}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-3 text-[12px] text-white/30 leading-relaxed">
                                gemini-4-carbon scored 95.94 on Extreme, with six perfect chats, and 88.69 on
                                Easy. It did not miss Easy facts: one noise write on each of the two empty chats
                                scored 50, and single-fact category differences carried full weight.
                            </p>
                        </div>
                    </motion.section>

                    <motion.section {...reveal} className="mb-20">
                        <SectionHead
                            eyebrow="Mistakes"
                            title="What going wrong"
                            accent="looks like"
                            lead="A false memory is worse than a missing one. The character keeps acting on it in every later reply."
                        />
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {failureModes.map((f) => (
                                <div key={f.title} className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-6">
                                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                                        <h3 className="text-[15px] font-semibold text-white">{f.title}</h3>
                                        <span className="font-mono text-[12px] text-white/35">
                                            {f.model} <span className="text-white/20">in</span> {f.caseId}
                                        </span>
                                    </div>
                                    <p className="font-display italic text-[17px] text-white/75 leading-snug border-l-2 border-red-300/40 pl-4 mb-4">
                                        "{f.quote}"
                                    </p>
                                    <p className="text-sm text-white/40 leading-relaxed">{f.text}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    <motion.section {...reveal} className="mb-20 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                        <div>
                            <SectionHead eyebrow="Reliability" title="Chats that" accent="failed" />
                            <div className="space-y-4 text-[15px] text-white/40 leading-[1.75]">
                                <p>
                                    37 of 2,400 model and chat pairs in the full suite returned nothing usable.
                                    19 models completed all 100 chats, and five models account for every failure.
                                    Failed chats are left out of content grading and shown separately.
                                </p>
                                <p>
                                    In the small suite, ling-3.0-tiny timed out on every chat it reached and
                                    lfm-3-1.7b failed 49 of 50 on tool and schema compliance.
                                </p>
                            </div>
                        </div>
                        <div className="lg:pt-[92px]">
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-5 sm:p-6">
                            {fullFailures.map((f) => (
                                <div key={f.model} className="flex gap-5 py-4 first:pt-0 last:pb-0 border-b border-white/[0.06] last:border-b-0">
                                    <span className="w-8 shrink-0 text-xl font-bold tabular-nums text-white/80">{f.count}</span>
                                    <div>
                                        <p className="font-mono text-[13px] text-white/80 mb-1">{f.model}</p>
                                        <p className="text-sm text-white/40 leading-relaxed">{f.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        </div>
                    </motion.section>

                    <motion.section {...reveal} className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                        <div>
                            <SectionHead eyebrow="Method" title="How it" accent="works" />
                            <div className="space-y-4 text-[15px] text-white/40 leading-[1.75]">
                                <p>
                                    The corpus is 100 original, fictional chats with 100 lead characters and 609
                                    messages: prose roleplay, companion messages, text threads, letters,
                                    screenplay, group dialogue and dispatch logs, in English, Turkish, Spanish,
                                    German, French, Japanese, Italian and Portuguese.
                                </p>
                                <p>
                                    Easy chats isolate one memory decision. Hard chats add similar names,
                                    misleading assumptions, conditional permissions and old records that should
                                    survive a change. Extreme chats run over two or three windows: a rule that
                                    changes and reverts, a photo permission that covers one crop but not another,
                                    a reading that arrives after a decision was already made.
                                </p>
                                <p>
                                    Each window is wrapped in the app's Standard memory prompt with one tool round,
                                    the same as the app. Later windows see the memories the model actually kept.
                                    Graders saw the answer key but not the model names, rated every expected fact
                                    as full, partial or missing, and labelled every write as useful, noise,
                                    duplicate or false.
                                </p>
                                <p>
                                    It measures memory extraction and updates against a simulated store. Retrieval,
                                    the summarizer and the full in-app memory cycle are not part of it.
                                </p>
                            </div>
                        </div>
                        <div className="lg:pt-[92px]">
                            <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-5 sm:p-6">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/30 mb-4">
                                    Case score
                                </p>
                                <div className="flex h-2.5 rounded-full overflow-hidden mb-4">
                                    {weights.map((w) => (
                                        <div key={w.label} className={w.className} style={{ width: `${w.value}%` }} />
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {weights.map((w) => (
                                        <div key={w.label} className="flex items-center gap-2.5 text-[13px]">
                                            <span className={`w-2.5 h-2.5 rounded-sm ${w.className}`} />
                                            <span className="text-white/55">{w.label}</span>
                                            <span className="ml-auto tabular-nums text-white/80">{w.value}%</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[13px] text-white/35 leading-relaxed mt-4">
                                    Dimensions that do not apply to a chat are dropped and the rest are
                                    renormalized. False writes count twice against precision.
                                </p>
                            </div>
                        </div>
                    </motion.section>
                </div>
            </main>
        </>
    );
}
