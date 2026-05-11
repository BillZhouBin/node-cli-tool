/**
 * 工具函数 - 输入验证和格式检测
 */

/**
 * 判断是否为有效的时间戳
 * @param {string|number} value - 输入值
 * @returns {object} { isValid: boolean, type: 'seconds'|'milliseconds'|null }
 */
function detectTimestampType(value) {
  const num = Number(value);
  
  if (isNaN(num) || !Number.isInteger(num)) {
    return { isValid: false, type: null };
  }
  
  // Unix 时间戳（秒级）：10位数字，范围约 1970-2286
  if (num >= 0 && num <= 9999999999) {
    return { isValid: true, type: 'seconds' };
  }
  
  // 毫秒级：13位数字，范围约 1970-2286
  if (num >= 0 && num <= 9999999999999) {
    return { isValid: true, type: 'milliseconds' };
  }
  
  return { isValid: false, type: null };
}

/**
 * 验证日期字符串是否有效
 * @param {string} dateStr - 日期字符串
 * @returns {boolean}
 */
function isValidDateString(dateStr) {
  if (typeof dateStr !== 'string') return false;
  
  // ISO 8601 格式或常见日期格式
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

/**
 * 标准化时间戳为毫秒级
 * @param {string|number} value - 时间戳
 * @param {string} type - 时间戳类型 ('seconds'|'milliseconds')
 * @returns {number}
 */
function normalizeToMilliseconds(value, type) {
  const num = Number(value);
  
  if (type === 'seconds') {
    return num * 1000;
  }
  
  return num;
}

module.exports = {
  detectTimestampType,
  isValidDateString,
  normalizeToMilliseconds,
};
