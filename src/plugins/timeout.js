export default {
  install(Vue) {
    let t = {
      id: null,
      callback: null,
      startTime: null,
      start: function(time) {
        this.startTime = new Date().getTime();
        this.id = setTimeout(() => {
          if (this.callback != null) this.callback();
        }, time);
      },
      stop: function() {
        clearTimeout(this.id);
      }
    };
    Vue.prototype.$timeout = t;
  }
};
