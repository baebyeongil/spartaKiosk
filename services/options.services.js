const OptionRepository = require("../repositories/options.repositories");

class OptionrService {
  optionRepository = new OptionRepository();

  createOption = async (extraPrice, shotPrice, hot) => {
    try {
      if (extraPrice == undefined) {
        return {
          status: 400,
          message: "extraPrice가 없습니다.",
        };
      } else if (extraPrice == undefined) {
        return {
          status: 400,
          message: "shotPrice가 없습니다.",
        };
      } else if (extraPrice == undefined) {
        return {
          status: 400,
          message: "hot이 없습니다.",
        };
      } else if (typeof extraPrice == Number && typeof shotPrice == Number) {
        return {
          status: 400,
          message: "extraPrice, shotPrice 는 숫자로 입력해주세요.",
        };
      } else if (hot !== true || hot !== false) {
        return {
          status: 400,
          message: "hot의 조건은 true or false 입니다.",
        };
      }
      const option = await this.optionRepository.createOption(extraPrice, shotPrice, hot);
      if (!option) {
        return {
          status: 400,
          message: "option이 없습니다.",
        };
      }
      return {
        status: 200,
        message: "option 생성",
      };
    } catch (err) {
      return { status: 500, message: "Server Error" };
    }
  };

  viewOption = async () => {
    try {
      const option = await this.optionRepository.viewOption();
      return {
        status: 200,
        message: option,
      };
    } catch (err) {
      return { status: 500, message: "Server Error" };
    }
  };

  updateOption = async (id, extraPrice, shotPrice, hot) => {
    try {
      if (!id) {
        return {
          status: 400,
          message: "옵션 id를 정해주세요.",
        };
      } else if (!extraPrice) {
        return {
          status: 400,
          message: "extraPrice를 정해주세요.",
        };
      } else if (!shotPrice) {
        return {
          status: 400,
          message: "shotPrice를 정해주세요.",
        };
      } else if (!hot) {
        return {
          status: 400,
          message: "hot을 정해주세요.",
        };
      } else if (typeof extraPrice !== "number" || typeof shotPrice !== "number") {
        return {
          status: 400,
          message: "extraPrice, shotPrice 는 숫자로 입력해주세요.",
        };
      }
      if (hot !== true && hot !== false) {
        return {
          status: 400,
          message: "hot의 조건은 true or false 입니다.",
        };
      }
      const optionId = await this.optionRepository.findOndOption(id);
      if (!optionId) {
        return {
          status: 400,
          message: "옵션을 찾을 수 없습니다.",
        };
      }
      const option = await this.optionRepository.updateOption(id, extraPrice, shotPrice, hot);
      if (!option) {
        return {
          status: 400,
          message: "옵션 수정 실패",
        };
      }
      return {
        status: 200,
        message: "옵션 수정 완료",
      };
    } catch (err) {
      return { status: 500, message: "Server Error" };
    }
  };

  deleteOption = async (id) => {
    try {
      if (!id) {
        return {
          status: 400,
          message: "옵션 id를 입력해주세요.",
        };
      }
      const option = await this.optionRepository.deleteOption(id);
      if (!option) {
        return {
          status: 400,
          message: "옵션 삭제 실패",
        };
      }
      return {
        status: 200,
        message: "옵션 삭제",
      };
    } catch (err) {
      return { status: 500, message: "Server Error" };
    }
  };
}

module.exports = OptionrService;
