type TimeType = "YYYY-MM-DD hh:ss:mm" | "YYYY-MM-DD";

function formatTime(date: string | number, type: TimeType) {
  switch (type) {
    case "YYYY-MM-DD hh:ss:mm":
      return timeTypeOne(date);
    case "YYYY-MM-DD":
      return timeTypeTwo(date);
  }
}

// 格式化时间：YYYY-MM-DD hh:ss:mm
function timeTypeOne(date: string | number): string {
  const year = new Date(date).getFullYear();
  let month: number | string = new Date(date).getMonth() + 1;
  let day: number | string = new Date(date).getDate();

  let hour: number | string = new Date(date).getHours();
  let minute: number | string = new Date(date).getMinutes();
  let second: number | string = new Date(date).getSeconds();
  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  hour = hour >= 10 ? hour : "0" + hour;
  minute = minute >= 10 ? minute : "0" + minute;
  second = second >= 10 ? second : "0" + second;
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

// 格式化时间：YYYY-MM-DD
function timeTypeTwo(date: string | number): string {
  const year = new Date(date).getFullYear();
  let month: number | string = new Date(date).getMonth() + 1;
  let day: number | string = new Date(date).getDate();
  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  return `${year}-${month}-${day}`;
}

// 获取两个时间戳之间的天数差
function getDisDay(time1: number, time2: number) {
  const day = 1000 * 60 * 60 * 24;
  const d1 = new Date(time1).getTime();
  const d2 = new Date(time2).getTime();

  const diff = Math.round(Math.abs(d2 - d1) / day);
  return diff;
}

// 时间距离转换
function getTimeDis(date: string) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  console.log(seconds);
  let intervalType, intervalValue;
  if (seconds < 60) {
    intervalType = "秒";
    intervalValue = seconds;
  } else if (seconds < 3600) {
    intervalType = "分";
    intervalValue = Math.floor(seconds / 60);
  } else if (seconds < 86400) {
    intervalType = "小时";
    intervalValue = Math.floor(seconds / 3600);
  } else if (seconds < 604800) {
    intervalType = "天";
    intervalValue = Math.floor(seconds / 86400);
  } else if (seconds < 2629800) {
    intervalType = "周";
    intervalValue = Math.floor(seconds / 604800);
  } else if (seconds < 31557600) {
    intervalType = "月";
    intervalValue = Math.floor(seconds / 2629800);
  } else {
    intervalType = "年";
    intervalValue = Math.floor(seconds / 31557600);
  }

  return `${intervalValue}${intervalType}前`;
}

export { formatTime, getDisDay, getTimeDis };
