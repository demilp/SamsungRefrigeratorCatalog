export default {
  install(Vue) {
    let session = { events: [], id: "", dateTime: "" };
    Object.defineProperty(Vue.prototype, "$session", {
      get() {
        return session;
      },
      set(v) {
        session = v;
      }
    });
  }
};
