import { FundConstants } from "../constants/Fund.constants";

const initialState = {
  fetching: false,
  fetchSuccess: false,
  fetchFailure: false,
  data: [],
  CurrentTab: "Y",
};

export function FundReducers(state = initialState, action) {
  const { type, payload, payloadRange } = action;

  switch (type) {
    case FundConstants.FEED_REQUEST:
      return {
        fetching: true,
        fetchSuccess: false,
        fetchFailure: false,
        CurrentTab: payloadRange,
      };
    case FundConstants.FEED_SUCCESS:
      return {
        fetchSuccess: true,
        fetching: false,
        fetchFailure: false,
        data: payload,
        CurrentTab: payloadRange,
      };
    case FundConstants.FEED_FAILURE:
      return {
        fetching: false,
        fetchSuccess: false,
        fetchFailure: true,
        CurrentTab: payloadRange,
      };
    default:
      return state;
  }
}
