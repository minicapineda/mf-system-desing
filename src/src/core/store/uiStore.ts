import { create } from "zustand";

interface UIState {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
	isSidebarOpen: true, // Empieza abierto
	toggleSidebar: () =>
		set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
