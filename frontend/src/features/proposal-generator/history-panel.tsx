import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import type { StoredProposal } from "../../types/proposals";

type HistoryPanelProps = {
  entries: StoredProposal[];
  selectedId: string | null;
  onLoad: (entry: StoredProposal) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
};

export function HistoryPanel({ entries, selectedId, onLoad, onDelete, onClear }: HistoryPanelProps) {
  return (
    <Card>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl text-ink">Saved history</h2>
          <p className="mt-1 text-sm text-muted">Stored in your browser only. The most recent 10 proposals are kept.</p>
        </div>
        <Button disabled={entries.length === 0} onClick={onClear} type="button" variant="ghost">
          Clear
        </Button>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-[24px] border border-dashed border-line bg-white/70 p-5 text-sm text-muted">
          Your generated proposals will appear here after the first successful run.
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={`rounded-[24px] border p-4 transition ${
                selectedId === entry.id ? "border-ink bg-ink text-white" : "border-line bg-white"
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                        selectedId === entry.id ? "bg-white/20 text-white" : "bg-canvas text-muted"
                      }`}
                    >
                      {entry.experienceLevel}
                    </span>
                    <span className={`text-xs ${selectedId === entry.id ? "text-white/80" : "text-muted"}`}>
                      {new Date(entry.generatedAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-6">{entry.hookLine}</p>
                  <p className={`mt-2 text-sm leading-6 ${selectedId === entry.id ? "text-white/80" : "text-muted"}`}>
                    {entry.proposalPreview}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    className={selectedId === entry.id ? "border-white/20 bg-white/10 text-white hover:bg-white/20" : ""}
                    onClick={() => onLoad(entry)}
                    type="button"
                    variant={selectedId === entry.id ? "ghost" : "secondary"}
                  >
                    Load
                  </Button>
                  <Button
                    className={selectedId === entry.id ? "border-white/20 bg-transparent text-white hover:bg-white/10" : ""}
                    onClick={() => onDelete(entry.id)}
                    type="button"
                    variant="ghost"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

