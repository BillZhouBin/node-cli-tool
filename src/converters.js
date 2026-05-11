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
    const result = dayjs(ms).tz(tz).format(format);
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
    const date = dayjs.tz(dateStr, tz);
    
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
  timestampToDate,
  dateToTimestamp,
  getCurrentTimestamp,
};
