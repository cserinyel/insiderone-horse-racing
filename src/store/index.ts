import { createStore, useStore as baseUseStore } from "vuex";
import raceStore from "./modules/raceStore";
import type { TypedStore } from "./types";

const store = createStore({
  modules: {
    raceStore,
  },
});

// Typed useStore hook - use this everywhere instead of vuex's useStore
export function useStore(): TypedStore {
  return baseUseStore() as TypedStore;
}

export default store;
