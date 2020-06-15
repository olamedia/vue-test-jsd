import Vue from "vue";
import Vuex, { ActionContext, StoreOptions } from "vuex";
import axios from "axios";

// https://registry.npmjs.org/
// GET·/-/v1/search
const npmApi = axios.create({
  baseURL: "/search"
});

// https://data.jsdelivr.com/v1

// const jsdApi = axios.create({
//   baseURL: "https://data.jsdelivr.com/v1"
// });

Vue.use(Vuex);

export const mutations = {
  NEW_QUERY: "NEW_QUERY",
  FETCH_PACKAGE_LIST: "FETCH_PACKAGE_LIST"
};

export const actions = {
  NEW_QUERY: "NEW_QUERY"
};

type packageContact = {
  email: string;
  username: string;
};

type packageAuthor = {
  name: string;
} & packageContact;

type packageInfo = {
  package: {
    author: packageAuthor;
    date: string;
    description: string;
    keywords?: string[];
    links: {
      npm: string;
      [x: string]: string;
    };
    maintainers: packageContact[];
    name: string;
    publishers: packageContact[];
    scope: string;
    version: string;
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    [x: string]: any;
  };
  score: {
    detail: {
      maintenance: number;
      popularity: number;
      quality: number;
    };
    final: number;
  };
  searchScore: number;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  [x: string]: any;
};

type packagesList = {
  objects: packageInfo[];
  time: string;
  total: number;
};

type storeState = {
  query: string;
  packages: packageInfo[];
  totalPackages: number;
};

class Throttler {
  releaseDelay = 1500;
  repeatDelay = 500;
  waiting = false;
  deferredMethod?: Function = undefined;
  timer?: ReturnType<typeof setTimeout> = undefined;
  wait() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (!this.waiting && this.deferredMethod !== undefined) {
        try {
          this.execute(this.deferredMethod);
          return;
        } catch (e) {
          // do nothing
        }
      }
      setTimeout(() => {
        this.wait();
      }, this.repeatDelay);
    }, 500);
  }
  execute(method: Function) {
    if (!this.waiting) {
      this.waiting = true;
      const result = method.call(this);
      setTimeout(() => {
        this.waiting = false;
      }, this.releaseDelay);
      return result;
    }
    throw new Error("Waiting");
  }
  throttle(method: Function) {
    try {
      this.execute(method);
    } catch (e) {
      this.deferredMethod = method;
      this.wait();
    }
  }
}

const fetchThrottler = new Throttler();

const options: StoreOptions<storeState> = {
  state: {
    query: "",
    packages: [],
    totalPackages: 0
  },
  mutations: {
    [mutations.NEW_QUERY]: function(state, newQuery: string) {
      state.query = newQuery;
    },
    [mutations.FETCH_PACKAGE_LIST]: function(state) {
      fetchThrottler.throttle(() => {
        console.log("fetching", state.query);
        npmApi.get("?text=" + state.query).then(response => {
          const data = response.data as packagesList;
          state.packages = data.objects;
          state.totalPackages = data.total;
        });
      });
    }
  },
  actions: {
    [actions.NEW_QUERY]: function(
      context: ActionContext<storeState, storeState>,
      newQuery: string
    ) {
      if (this.state.query !== newQuery) {
        this.commit(mutations.NEW_QUERY, newQuery);
        this.commit(mutations.FETCH_PACKAGE_LIST);
      }
    }
  },
  modules: {}
};

export default new Vuex.Store(options);
