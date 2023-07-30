class Init {
  itemTypes = {
    COFFEE: "coffee",
    JUICE: "juice",
    FOOD: "food",
  };

  optionId = {
    COFFEE: 1,
    JUICE: 2,
    FOOD: 3,
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

  totalOrderPrice(price, itemoption, amount, option) {
    const orderExtra = option.extraPrice;
    const ordershot = option.shotPrice;
    const extraPrice = itemoption[0].extraPrice * orderExtra;
    const shotPrice = itemoption[0].shotPrice * ordershot;

    return (price + extraPrice + shotPrice) * amount;
  }
}
module.exports = Init;
