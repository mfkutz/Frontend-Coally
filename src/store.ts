import { create } from "zustand";

interface TaskState {
    filter: 'all' | 'active' | 'completed';
    setFilter: (filter: 'all' | 'active' | 'completed') => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    filter: 'all',
    setFilter: (filter) => set({ filter }),
}));