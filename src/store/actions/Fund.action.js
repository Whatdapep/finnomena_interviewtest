import { RequestGetFund } from "../../services/api";
import { FundConstants } from "../constants/Fund.constants";

function OnChangeTab(Range) {
  return (dispatch) => {
    dispatch(fetching(true, Range));
    RequestGetFund(Range).then(
      (data) => {
        dispatch(fetchSuccess(data, Range));
      },
      (err) => dispatch(fetchFailure(true, Range))
    );
  };
}

const fetching = (bool, Range) => {
  console.log("in fetching", Range);
  return {
    type: FundConstants.FEED_REQUEST,
    fetching: bool,
    payloadRange: Range,
  };
};

const fetchSuccess = (data, Range) => {
  return {
    type: FundConstants.FEED_SUCCESS,
    payload: data,
    payloadRange: Range,
  };
};

const fetchFailure = (bool, Range) => {
  return {
    type: FundConstants.FEED_FAILURE,
    payload: bool,
    payloadRange: Range,
  };
};

export const FundActions = {
  OnChangeTab,
  // feedHomepage,
};
