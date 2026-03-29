import { useEffect, useState } from "react";

import { clearHistoryEntries, loadHistoryEntries, removeHistoryEntry, saveHistoryEntry } from "../lib/history";
import type { StoredProposal } from "../types/proposals";

export function useProposalHistory() {
  const [entries, setEntries] = useState<StoredProposal[]>([]);

  useEffect(() => {
    setEntries(loadHistoryEntries());
  }, []);

  const saveEntry = (entry: StoredProposal) => {
    const nextEntries = saveHistoryEntry(entry);
    setEntries(nextEntries);
  };

  const removeEntry = (id: string) => {
    const nextEntries = removeHistoryEntry(id);
    setEntries(nextEntries);
  };

  const clearEntries = () => {
    clearHistoryEntries();
    setEntries([]);
  };

  return {
    entries,
    saveEntry,
    removeEntry,
    clearEntries,
  };
}

