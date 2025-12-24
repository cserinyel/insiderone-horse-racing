import { createStore } from "vuex";
import raceStore from "./modules/raceStore";

const store = createStore({
  modules: {
    raceStore,
  },
});

export default store;
