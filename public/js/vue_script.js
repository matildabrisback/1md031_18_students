var socket = io();

var orders = new Vue({
  el: '#array',
  data: {
    Orderdetails: [],
    selectedGender: '',
    selectedPayment: '',
    checkedBurger: [],
    losburger: "Choose a burger",
    menu: food,
    orders: {},
  },
  created: function () {
    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('currentQueue', function (data) {
      this.orders = data.orders;
    }.bind(this));
  },
  methods: {
      markDone: function() {
          console.log("Button clicked!");
      },

      getNext: function () {
        var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
          return Math.max(last, next);
        }, 0);
        return lastOrder + 1;
      },
      addOrder: function (event) {
        var offset = {x: event.currentTarget.getBoundingClientRect().left,
                      y: event.currentTarget.getBoundingClientRect().top};
        socket.emit("addOrder", { orderId: this.getNext(),
                                  details: { x: event.clientX - 10 - offset.x,
                                             y: event.clientY - 10 - offset.y },
                                  orderItems: ["Beans", "Curry"]
                                });
      },
      displayOrder: function(event) {
        var offset = {x: event.currentTarget.getBoundingClientRect().left,
                      y: event.currentTarget.getBoundingClientRect().top};
      socket.emit("addOrder", { orderId: "T",
                                details: { x: event.clientX - 10 - offset.x,
                                           y: event.clientY - 10 - offset.y },
                                orderItems: ["Beans", "Curry"]
                              });

  }
}
});
