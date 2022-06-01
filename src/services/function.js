import * as moment from "moment";
export const number_format = (val, digit = 2) => {
  var nf = new Intl.NumberFormat("th", {
    minimumFractionDigits: digit,
  });
  return nf.format(val);
};

export const convert_to_Thaidate = (
  val,
  format = "ll",
  fm = "YYYY-MM-DD",
  thaiyear = true
) => {
  let date = moment(val, fm, "th", true);
  if (date.isValid()) {
    if (thaiyear) {
      date.add(543, "years");
    }
    return date.format(format);
  }
};

export const moment_datetime = (val) => {
  if (val != null) {
    if (val.toString() == "0000-00-00 00:00:00") {
      return " - ";
    }
    let datetime = val;
    // return datetime;
    let dateval = datetime.toString().slice(0, 10);
    let timeval = datetime.toString().slice(11, 19);
    const regextime = /:/g;
    const regexdate = /-/g;
    const datenow = moment().format("YYYY-MM-DD");
    const timenow = moment().format("HH:mm:ss");

    const caltimenow = timenow.replace(regextime, "");
    const caldatenow = datenow.replace(regexdate, "");
    const caltimeval = timeval.replace(regextime, "");
    const caldataval = dateval.replace(regexdate, "");
    const fullcaldatetimeval = caldataval + caltimeval;

    let week = getWeekNumber(new Date());
    week = week * 7;
    var result = "";
    // 1100
    let dateCal = parseInt(caldatenow) - parseInt(caldataval);
    if (dateCal == 0) {
      return moment(caltimeval, "HHmmss", "th", true).fromNow();
    } else if (dateCal == 1) {
      let daycal =
        parseInt(caltimeval.slice(0, 4)) - parseInt(caltimenow.slice(0, 4));
      if (daycal <= 700) {
        let ok =
          moment(fullcaldatetimeval, "YYYYMMDDHHmmss", "th", true).fromNow() +
          " เวลา " +
          timeval.slice(0, 5) +
          " น.";
        // let ok = moment(fullcaldatetimeval,"YYYYMMDD",'th',true).fromNow()+' เวลา '+timeval.slice(0,5)+' น.';
        return ok;
      } else {
        let ok =
          moment(fullcaldatetimeval, "YYYYMMDDHHmmss", "th", true).calendar() +
          " เวลา " +
          timeval.slice(0, 5) +
          " น.";
        // let ok = moment(fullcaldatetimeval,'YYYYMMDD','th',true).calendar()+' เวลา '+timeval.slice(0,5)+' น.';
        return ok;
      }
    } else if (dateCal > 1 && dateCal <= 7) {
      // let ok = moment(fullcaldatetimeval,'YYYYMMDDHHmmss','th',true).calendar()+' น.';
      let ok =
        caldataval.slice(6, 8) +
        "  " +
        thai_month(caldataval.slice(4, 6)) +
        " เวลา " +
        timeval.slice(0, 5) +
        " น.";
      return ok;
    } else if (dateCal > 7 && dateCal < week) {
      // return moment(caldataval, 'YYYYMMDD','th',true).calendar();
      // let ok = thai_month(caldataval.slice(4,6))+'  '+caldataval.slice(6,8)+' เวลา '+timeval.slice(0,5)+' น.';
      let ok =
        caldataval.slice(6, 8) +
        "  " +
        thai_month(caldataval.slice(4, 6)) +
        " เวลา " +
        timeval.slice(0, 5) +
        " น.";
      return ok;
    } else {
      let date = moment(caldataval, "YYYYMMDD", "th", true);
      if (date.isValid()) {
        date.add(543, "years");
        return date.format("LL");
      }
    }
  } else {
    return " - ";
  }
};

export const getWeekNumber = (d) => {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  // Return array of year and week number
  // return [d.getUTCFullYear(), weekNo];
  return weekNo;
};

let thai_month = (ag_month = 0, format = "sub") => {
  if (ag_month.substring(0, 1) == 0) {
    ag_month = ag_month.trim();
  }
  let full_day = [
    "จันทร์",
    "อังคาร",
    "พุธ",
    "พฤหัสบดี",
    "ศุกค์",
    "เสาร์",
    "อาทิตย์",
  ];
  let full_month_th = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฏาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];
  let sub_month_th = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค",
    "เม.ย.",
    "พ.ค",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];
  if (format == "sub") {
    return sub_month_th[ag_month - 1];
  } else if (format == "full") {
    return full_month_th[ag_month - 1];
  }
};
