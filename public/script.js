var app = new Vue({
  el: '#app',
  data: {
    items: [],
    shoppingcart: [],
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
    submitpurchase() {
      console.log("In submitpurchase");
      for (var item of this.items) {
        console.log(item);
        if (item.selected) {
          this.addorder(item);
          this.shoppingcart.push(item);
        }
      }
    },
    addorder(item) {
      var url = "http://cs260.bclarson.com:8080/midterm2/" + item._id + "/addorder";
      console.log("addorder URL " + url);
      axios.put(url)
        .then(response => {
          console.log(response.data.orders);
          item.orders = response.data.orders;
        })
        .catch(e => {
          console.log(e);
        });
    },
  }
});
