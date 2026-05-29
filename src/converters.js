/**
 * 核心转换函数 - 时间戳 ↔ 日期
 */

const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const { detectTimestampType, normalizeToMilliseconds } = require('./utils');

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * 将 UTC+2/GMT-5 等偏移格式转为 IANA Etc/GMT 时区名
 * dayjs timezone 插件只识别 IANA 时区名，不直接支持 UTC+2 格式
 * 注意：Etc/GMT 的符号与常规相反（POSIX 标准），东2区是 Etc/GMT-2
 * @param {string} tz - 时区字符串
 * @returns {string} 转换后的时区名
 */
function normalizeTimezone(tz) {
  // 匹配 UTC+2, UTC-5, GMT+8, GMT-3 等格式
  const match = tz.match(/^(UTC|GMT)([+-])(\d{1,2})(?::(\d{2}))?$/i);
  if (match) {
    const offset = parseInt(match[3]);
    const minutes = match[4] ? parseInt(match[4]) : 0;
    // Etc/GMT 符号相反
    const sign = match[2] === '+' ? '-' : '+';
    const totalHours = offset + minutes / 60;
    return `Etc/GMT${sign}${totalHours}`;
  }
  // 也支持 Etc/GMT+2 直传（符号反的）
  if (/^Etc\/(GMT|UTC)[+-]\d+$/i.test(tz)) {
    return tz.replace(/^etc\//i, 'Etc/').replace(/utc/i, 'GMT');
  }
  return tz;
}

/**
 * 时间戳转日期
 * @param {string|number} timestamp - 时间戳（秒级或毫秒级）
 * @param {object} options - 选项
 * @param {string} options.format - 输出格式，默认 'YYYY-MM-DD HH:mm:ss'
 * @param {string} options.timezone - 时区，默认 'UTC'
 * @returns {string} 转换后的日期字符串
 * @throws {Error} 如果输入无效
 */
function timestampToDate(timestamp, options = {}) {
  const { format = 'YYYY-MM-DD HH:mm:ss', timezone: tz = 'Asia/Shanghai' } = options;
  
  // 检测时间戳类型
  const detection = detectTimestampType(timestamp);
  if (!detection.isValid) {
    throw new Error(`Invalid timestamp: ${timestamp}`);
  }
  
  // 标准化为毫秒级
  const ms = normalizeToMilliseconds(timestamp, detection.type);
  
  // 转换
  try {
    const normalizedTz = normalizeTimezone(tz);
    const result = dayjs(ms).tz(normalizedTz).format(format);
    return result;
  } catch (err) {
    throw new Error(`Format error: ${err.message}`);
  }
}

/**
 * 日期转时间戳
 * @param {string} dateStr - 日期字符串
 * @param {object} options - 选项
 * @param {string} options.timezone - 时区，默认 'Asia/Shanghai'
 * @param {string} options.unit - 返回单位 ('seconds'|'milliseconds')，默认 'seconds'
 * @returns {number} Unix 时间戳
 * @throws {Error} 如果输入无效
 */
function dateToTimestamp(dateStr, options = {}) {
  const { timezone: tz = 'Asia/Shanghai', unit = 'seconds' } = options;
  
  try {
    // 使用 dayjs 解析并指定时区
    const normalizedTz = normalizeTimezone(tz);
    const date = dayjs.tz(dateStr, normalizedTz);
    
    if (!date.isValid()) {
      throw new Error(`Invalid date format: ${dateStr}`);
    }
    
    // 返回指定单位的时间戳
    const timestamp = date.unix(); // 默认返回秒级
    
    if (unit === 'milliseconds') {
      return timestamp * 1000;
    }
    
    return timestamp;
  } catch (err) {
    throw new Error(`Date parsing error: ${err.message}`);
  }
}

/**
 * 获取当前时间戳
 * @param {object} options - 选项
 * @param {string} options.unit - 返回单位 ('seconds'|'milliseconds')，默认 'seconds'
 * @returns {number}
 */
function getCurrentTimestamp(options = {}) {
  const { unit = 'seconds' } = options;
  const now = dayjs();
  
  if (unit === 'milliseconds') {
    return now.valueOf();
  }
  
  return now.unix();
}

module.exports = {
  normalizeTimezone,
  timestampToDate,
  dateToTimestamp,
  getCurrentTimestamp,
};
