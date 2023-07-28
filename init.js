class Init {
  itemTypes = {
    COFFEE: "coffee",
    JUICE: "juice",
    FOOD: "food",
  };

  orderItemState = {
    ORDERED: 0,
    PENDING: 1,
    COMPLETED: 2,
    CANCELED: 3,
  };

  orderCustomerState = {
    주문완료: true,
    주문취소: false,
  };

  orderPirce(Itemprice, amount) {
    const totalPrcie = Itemprice * amount;
    return totalPrcie;
  }
}
module.exports = Init;
