/**
 * 格式化和显示相关函数
 */

/**
 * 格式化控制台输出
 * @param {string} label - 标签
 * @param {string|number} value - 值
 * @returns {string}
 */
function formatOutput(label, value) {
  return `${label}: ${value}`;
}

/**
 * 格式化错误信息
 * @param {string} message - 错误信息
 * @returns {string}
 */
function formatError(message) {
  return `❌ Error: ${message}`;
}

/**
 * 格式化成功信息
 * @param {string} message - 成功信息
 * @returns {string}
 */
function formatSuccess(message) {
  return `✅ ${message}`;
}

/**
 * 获取预定义的格式列表（帮助信息）
 * @returns {string}
 */
function getFormatExamples() {
  return `
Common date formats:
  YYYY-MM-DD              2026-04-22
  YYYY-MM-DD HH:mm:ss     2026-04-22 15:30:45
  DD/MM/YYYY              22/04/2026
  MM/DD/YYYY              04/22/2026
  YYYY/MM/DD              2026/04/22
  YYYY-MM-DDTHH:mm:ssZ    2026-04-22T15:30:45Z (ISO 8601)
  `;
}

module.exports = {
  formatOutput,
  formatError,
  formatSuccess,
  getFormatExamples,
};
