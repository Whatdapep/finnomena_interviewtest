import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FundActions } from "../store/actions/Fund.action";
import { RequestGetFund } from "../services/api";
import {
  convert_to_Thaidate,
  moment_datetime,
  number_format,
} from "../services/function";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ListRangeFunds() {
  const FundState = useSelector((state) => state.FundReducers);
  let listFund = [
    { label: "Day", data: "D" },
    { label: "Week", data: "W" },
    { label: "Month", data: "M" },
    { label: "Year", data: "Y" },
  ];

  const [SelectedData, setSelectedData] = useState();
  const [SelectedFund, setSelectedFund] = useState("Y");

  const [SelectedFundWord, setSelectedFundWord] = useState("Year");

  const [loading, setLoading] = useState(false);
  async function OnClickChangeRageFund(data) {
    // FundActions.OnChangeTab(data);
    setSelectedFund(data);
    setSelectedFundWord(selectRangeWord(data).en);
    setLoading(true);
    setSelectedData();
    const GetDataTab = await RequestGetFund(data);
    setSelectedData(GetDataTab);
    setLoading(false);
    console.log(GetDataTab);
  }
  // useEffect(() => {
  //   return () => {};
  // }, [FundState]);

  return (
    <>
      <div className="text-center py-2 mx-auto justify-center">
        <ul className=" mx-auto justify-center grid grid-cols-4 gap-2">
          {listFund.map((val, i) => {
            return (
              <li
                className="mx-2 sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1"
                key={i}
              >
                <button
                  className={` p-3 border-2 cursor-pointer hover:bg-sky-300 rounded-lg shadow w-36  ${
                    val.data == SelectedFund ? "bg-orange-300" : ""
                  } `}
                  onClick={() => {
                    OnClickChangeRageFund(val.data);
                  }}
                >
                  {val.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="my-2 p-2 rounded-lg shadow">
        <div className="grid grid-cols-12 gap-2">
          {SelectedData &&
            SelectedData.status &&
            SelectedData.status == true &&
            SelectedData.data &&
            SelectedData.data.map((val, i) => {
              let plusOrDown = val.avg_return < 0 ? true : false;
              {
                /* let Rangeis = selectRangeWord(SelectedFund); */
              }

              return (
                <div
                  key={i}
                  className="col-span-12 md:col-span-4 lg:col-span-3 border-2 border-gray-100 p-2 rounded-lg shadow"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <div className="px-1 col-span-1">
                      <h2 className="font-medium text-gray-800">
                        {val.thailand_fund_code}
                      </h2>
                      <h3
                        className={`${
                          plusOrDown == true ? "text-red-600" : "text-green-400"
                        }`}
                      >
                        <span>{plusOrDown == true ? "" : "+"}</span>
                        {val.avg_return}
                      </h3>
                      <h3 className="text-gray-600">
                        1&nbsp;{SelectedFundWord}
                      </h3>
                    </div>

                    <div className="px-1 text-right col-span-1">
                      <h3 className="text-gray-800 font-medium">
                        {number_format(val.nav)}
                      </h3>
                      <h3 className="text-gray-600">
                        {moment_datetime(val.nav_date)}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default ListRangeFunds;

function selectRangeWord(Range) {
  switch (Range) {
    case "D":
      return { en: "Day" };
    case "W":
      return { en: "Week" };
    case "M":
      return { en: "Month", th: "" };
    case "Y":
      return { en: "Year" };
    default:
      return "";
  }
}
