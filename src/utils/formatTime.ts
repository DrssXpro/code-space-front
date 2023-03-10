type TimeType = "YYYY-MM-DD hh:ss:mm" | "YYYY-MM-DD";

function formatTime(date: string, type: TimeType) {
  switch (type) {
    case "YYYY-MM-DD hh:ss:mm":
      return timeTypeOne(date);
  }
}

// 格式化时间
function timeTypeOne(date: string): string {
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

// 获取两个时间戳之间的天数差
function getDisDay(time1: number, time2: number) {
  const day = 1000 * 60 * 60 * 24;
  const d1 = new Date(time1).getTime();
  const d2 = new Date(time2).getTime();

  const diff = Math.round(Math.abs(d2 - d1) / day);
  return diff;
}

export { formatTime, getDisDay };
