const axios = require("axios").default;

const Djson = require("../data/fund-ranking-1D.json");
const Wjson = require("../data/fund-ranking-1W.json");
const Mjson = require("../data/fund-ranking-1M.json");
const Yjson = require("../data/fund-ranking-1Y.json");

// const NODE_ENV = "localhost";


const NODE_ENV = "production";



const API_END_POINT = `https://storage.googleapis.com/finno-ex-re-v2-static-staging/recruitment-test/fund-ranking-1`;

export function RequestGetFund(range = "Y") {
  // console.log(range);

  if (NODE_ENV == "localhost") {
    switch (range) {
      case "D":
        return Djson;
        break;
      case "W":
        return Wjson;
        break;
      case "M":
        return Mjson;
        break;
      case "Y":
        return Yjson;
        break;

      default:
        return Yjson;
    }
  } else {
    let extension = `.json`;
    let apiEndPoint;
    switch (range) {
      case "D":
        apiEndPoint = API_END_POINT + "D" + extension;
        break;
      case "W":
        apiEndPoint = API_END_POINT + "W" + extension;
        break;
      case "M":
        apiEndPoint = API_END_POINT + "M" + extension;
        break;
      case "Y":
        apiEndPoint = API_END_POINT + "Y" + extension;
        break;

      default:
        apiEndPoint = API_END_POINT + "Y" + extension;
    }
    return axios
      .get(apiEndPoint, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        crossdomain: true,
      })
      .then(function (response) {
        // handle success
        // console.log(response);
        return response.data;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        return error;
      })
      .then(function () {
        // always executed
      });
  }
}
