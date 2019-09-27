<template>
  <div class="header">
    <div>
      <span v-for="r in routes" :key="r.route" class="header-route">
        <router-link :to="r.route" tag="span">{{r.text}}</router-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return { routes: [] };
  },
  created() {
    this.$root.$on("setheader", message => {
      this.routes = [];
      if (message.page == "category") {
        this.routes.push({ text: "INICIO", route: "/home/" + message.type });
        var n = { route: "/" + message.page + "/" + message.id };
        switch (message.id) {
          case "topfreezer":
            n.text = "FREEZER SUPERIOR";
            break;
          case "bottomfreezer":
            n.text = "FREEZER INFERIOR";
            break;
          case "sidebyside":
            n.text = "SIDE BY SIDE";
            break;
          case "frenchdoor":
            n.text = "FRENCH DOOR";
            break;
          case "frontload":
            n.text = "FRONT LOAD";
            break;
          case "topload":
            n.text = "TOP LOAD";
            break;
          case "frontloaddryer":
            n.text = "FRONT LOAD";
            break;
          case "toploaddryer":
            n.text = "SECADOR TOP LOAD";
            break;
          default:
            break;
        }
        this.routes.push(n);
      } else if (message.page == "product" || message.page == "comparison") {
        this.routes.push({ text: "INICIO", route: "/home/" + message.type });
        var j = { route: "/category/" + message.style };
        switch (message.style) {
          case "topfreezer":
            j.text = "FREEZER SUPERIOR";
            break;
          case "bottomfreezer":
            j.text = "FREEZER INFERIOR";
            break;
          case "sidebyside":
            j.text = "SIDE BY SIDE";
            break;
          case "frenchdoor":
            j.text = "FRENCH DOOR";
            break;
          case "frontload":
            j.text = "CARGA FRONTAL";
            break;
          case "topload":
            j.text = "CARGA SUPERIOR";
            break;
          case "frontloaddryer":
            j.text = "SECADOR CARGA FRONTAL";
            break;
          case "toploaddryer":
            j.text = "SECADOR CARGA SUPERIOR";
            break;
          default:
            break;
        }
        this.routes.push(j);
        var p = { route: "/product/" + message.id, text: message.id };
        this.routes.push(p);
        if (message.page == "comparison") {
          this.routes.push({
            route: "/comparison/" + message.id,
            text: "COMPARACÍON"
          });
        }
      } else if (message.page == "technology") {
        var t = "";
        if (message.id == "twincooling") {
          t = "TWIN COOLING";
        } else {
          t = "DIGITAL INVERTER";
        }
        var tec = { route: "/technology/" + message.id, text: t };
        this.routes.push(tec);
      }
    });
  }
};
</script>

<style scoped>
.header {
  margin: 30px;
  margin-top: 40px;
  font-size: 30px;
}
.header-route {
  font-family: samsung-medium;
}
span.header-route:not(:first-of-type)::before {
  content: " / ";
  color: black;
}
span.header-route:last-of-type {
  color: #1bd4ff;
}
</style>
