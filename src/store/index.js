import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
// https://registry.npmjs.org/
// GET·/-/v1/search
const npmApi = axios.create({
  baseURL: "https://registry.npmjs.org/-/v1/search"
});
Vue.use(Vuex);
export const mutations = {
  NEW_QUERY: "NEW_QUERY",
  FETCH_PACKAGE_LIST: "FETCH_PACKAGE_LIST"
};
export const actions = {
  NEW_QUERY: "NEW_QUERY"
};
const options = {
  state: {
    query: "",
    packages: []
  },
  mutations: {
    [mutations.NEW_QUERY]: function(state, newQuery) {
      state.query = newQuery;
      console.log("mutated", state.query);
    },
    [mutations.FETCH_PACKAGE_LIST]: function(state) {
      console.log("fetching", state.query);
      npmApi.get("?text=" + state.query).then(response => {
        console.log("got", state.query);
        console.log(response);
        // state.packages =
      });
    }
  },
  actions: {
    [actions.NEW_QUERY]: function(context, newQuery) {
      if (this.state.query !== newQuery) {
        this.commit(mutations.NEW_QUERY, newQuery);
        this.commit(mutations.FETCH_PACKAGE_LIST);
      }
    }
  },
  modules: {}
};
export default new Vuex.Store(options);
//# sourceMappingURL=index.js.map
