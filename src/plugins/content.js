export default {
  install(Vue) {
    let content = { product: null, technology: null, video: null };
    Object.defineProperty(Vue.prototype, "$content", {
      get() {
        return content;
      },
      set(v) {
        content = v;
      }
    });
  }
};
