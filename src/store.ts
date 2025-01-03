import { create } from "zustand";

interface TaskState {
    filter: 'all' | 'pending' | 'completed';
    setFilter: (filter: 'all' | 'pending' | 'completed') => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    filter: 'all',
    setFilter: (filter) => set({ filter }),
}));