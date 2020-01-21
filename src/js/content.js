import "../css/main.css";
import "../css/content.css";

new Vue({
  el: "#app",
  data: {
    loading: false,
    contentData: {}
  },
  created() {
    const parameter = {};
    decodeURIComponent(window.location.search)
      .substr(1)
      .split("&")
      .forEach(item => {
        parameter[item.split("=")[0]] = item.split("=")[1];
      });
    this.contentData = parameter;
  }
});
