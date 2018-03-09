const second = 1000;
const minute = 60 * second;
const hours = 60 * minute;
const day = 24 * hours;
const timeframe = {second, minute, hours, day};
const breakpoints = {
  second: 60,
  minute: 60,
  hour: 24,
  day: 30
};

const toDate = timeStampString => new Date(timeStampString);

const getDiff = (timestamp, now) => toDate(now) - toDate(timestamp);

const isUnderTime = (diff, timeframe, time) => diff / timeframe < time;

const diffOverTimeframe = (diff, timeframe) => Math.floor(diff/timeframe);

const printResult = (result, timeframeName) =>
  `${result} ${timeframeName + ((result > 1) ? "s": "")}`;

const checkDate = (diff, timeframeName, underTime, timeframe) =>
  (isUnderTime(diff, timeframe[timeframeName], underTime))
    ? printResult(diffOverTimeframe(diff, timeframe[timeframeName]), timeframeName)
    : null;

const printFullDate = dateTime => 
  `${dateTime.getMonth() + 1}/${dateTime.getDate()}/${dateTime.getFullYear()}`;

const lessThanAMinute = timestring =>
  (timestring.match(/seconds/))
    ? "less than a minute"
    : timestring + ' ago';

const _checkNext = (result, callback) =>
  (result)
    ? lessThanAMinute(result)
    : callback();

const checkNext = ([tfName, ...rest], timeframe, timestamp, now) =>
  _checkNext(
    checkDate(getDiff(timestamp, now), tfName, breakpoints[tfName], timeframe),
    () => howLongAgo(rest, timeframe, timestamp, now)
  );

const howLongAgo = (remainingTimeframe, timeframe, timestamp, now) =>
  (!remainingTimeframe.length)
    ? printFullDate(toDate(timestamp))
    : checkNext(remainingTimeframe, timeframe, timestamp, now);

export const ago = (timestamp, now = new Date().toString()) =>
  howLongAgo(Object.keys(timeframe), timeframe, timestamp, now);