const { options } = require("../models");

class OptionRepository {
  createOption = async (extraPrice, shotPrice, hot) => {
    const option = await options.create({
      extraPrice,
      shotPrice,
      hot,
    });
    return option;
  };

  viewOption = async () => {
    const option = await options.findAll();
    return option;
  };

  findOndOption = async (id) => {
    const option = await options.findOne({
      where: { id },
    });
    return option;
  };

  updateOption = async (id, extraPrice, shotPrice, hot) => {
    const option = await options.update(
      { extraPrice, shotPrice, hot },
      {
        where: { id },
      }
    );
    return option;
  };

  deleteOption = async (id) => {
    const option = await options.destroy({
      where: { id },
    });
    return option;
  };
}

module.exports = OptionRepository;
