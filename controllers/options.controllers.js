const OptionrService = require("../services/options.services");
// const NodeCache = require("node-cache");
// const myCache = new NodeCache({ stdTTL: 0, checkperiod: 1000 });

class OptionController {
  optionrService = new OptionrService();

  createOption = async (req, res) => {
    const { extraPrice, shotPrice, hot } = req.body;
    const result = await this.optionrService.createOption(extraPrice, shotPrice, hot);
    return res.status(result.status).json(result.message);
  };

  viewOption = async (req, res) => {
    const result = await this.optionrService.viewOption();

    // await myCache.set("option", result.message);
    // const test = await myCache.get("option");

    return res.status(result.status).json(result.message);
  };

  updateOption = async (req, res) => {
    const { id } = req.params;
    const { extraPrice, shotPrice, hot } = req.body;
    const result = await this.optionrService.updateOption(id, extraPrice, shotPrice, hot);
    return res.status(result.status).json(result.message);
  };

  deleteOption = async (req, res) => {
    const { id } = req.params;
    const result = await this.optionrService.deleteOption(id);
    return res.status(result.status).json(result.message);
  };
}

module.exports = OptionController;
