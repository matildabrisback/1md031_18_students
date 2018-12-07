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
    details: {x: 0, y: 0},
    lastOrder: 0,
    personalInformation: [],
  },
  created: function () {
    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));
  },
  methods: {
      markDone: function() {
          console.log("Button clicked!");
      },

      getNext: function () {
        this.lastOrder = this.lastOrder + 1
        return this.lastOrder;
      },

      addOrder: function (event) {
        if (this.checkedBurger.length  !== 0) {
        socket.emit("addOrder", { orderId: this.getNext(),
                                  details: this.details,
                                  orderItems: this.checkedBurger,
                                  personalItems: this.personalInformation,
                                });
                              }
      },
      displayOrder: function(event) {
        var offset = {x: event.currentTarget.getBoundingClientRect().left,
                      y: event.currentTarget.getBoundingClientRect().top};

        this.details= { x: event.clientX - 10 - offset.x,
                        y: event.clientY - 10 - offset.y };


  }
}
});
