"use client";
const { create } = require("zustand");

const userStore = create((set) => ({
  uid: null,
  setUID: (uid) => set((state) => ({ uid })),
  clearUID: () => set({ uid: null }),
}));

export default userStore;
