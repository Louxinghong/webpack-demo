import "../css/main.css";
import "../css/form.css";

new Vue({
  el: "#app",
  data: {
    loading: false,
    form: {
      brand: "",
      itemNumber: "",
      material: "",
      yearMonth: ""
    },
    show: false,
    qrUrl: ""
  },
  methods: {
    onSubmit() {
      this.loading = true;
      axios
        .get("http://www.chuncongcong.com:8888/product/zxing", {
          params: {
            brand: this.form.brand,
            itemNumber: this.form.itemNumber,
            material: this.form.material,
            yearMonth: this.form.yearMonth
          }
        })
        .then(res => {
          this.loading = false;
          this.qrUrl = res.data;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
      this.show = true;
    },
    onRest() {
      this.$refs.form.resetFields();
    },
    onClose() {
      this.show = false;
    }
  }
});
