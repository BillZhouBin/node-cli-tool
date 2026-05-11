#!/usr/bin/env node

/**
 * 命令行工具主入口
 * 时间戳与日期转换工具
 */

const { program } = require('commander');
const {
  timestampToDate,
  dateToTimestamp,
  getCurrentTimestamp,
} = require('../src/converters');
const { formatError, formatSuccess, getFormatExamples } = require('../src/formatters');

const VERSION = '1.0.0';

// 主程序配置
program
  .name('timestool')
  .description('Unix timestamp ↔ Date conversion CLI tool')
  .version(VERSION);

// 子命令：时间戳转日期
program
  .command('ts2date <timestamp>')
  .description('Convert Unix timestamp to date')
  .option('-f, --format <format>', 'date format (e.g., YYYY-MM-DD HH:mm:ss)', 'YYYY-MM-DD HH:mm:ss')
  .option('-z, --timezone <timezone>', 'timezone (e.g., Asia/Shanghai, UTC)', 'Asia/Shanghai')
  .action((timestamp, options) => {
    try {
      const result = timestampToDate(timestamp, {
        format: options.format,
        timezone: options.timezone,
      });
      console.log(formatSuccess(result));
    } catch (err) {
      console.error(formatError(err.message));
      process.exit(1);
    }
  });

// 子命令：日期转时间戳
program
  .command('date2ts <date>')
  .description('Convert date to Unix timestamp')
  .option('-z, --timezone <timezone>', 'timezone (e.g., Asia/Shanghai, UTC)', 'Asia/Shanghai')
  .option('-u, --unit <unit>', 'timestamp unit (seconds|milliseconds)', 'seconds')
  .action((date, options) => {
    try {
      const result = dateToTimestamp(date, {
        timezone: options.timezone,
        unit: options.unit,
      });
      console.log(formatSuccess(result));
    } catch (err) {
      console.error(formatError(err.message));
      process.exit(1);
    }
  });

// 子命令：获取当前时间戳
program
  .command('now')
  .description('Get current Unix timestamp')
  .option('-u, --unit <unit>', 'timestamp unit (seconds|milliseconds)', 'seconds')
  .action((options) => {
    try {
      const result = getCurrentTimestamp({ unit: options.unit });
      console.log(formatSuccess(result));
    } catch (err) {
      console.error(formatError(err.message));
      process.exit(1);
    }
  });

// 子命令：显示格式示例
program
  .command('formats')
  .description('Show common date format examples')
  .action(() => {
    console.log(getFormatExamples());
  });

// 解析命令行参数
program.parse(process.argv);

// 如果没有提供任何命令，显示帮助信息
if (process.argv.length < 3) {
  program.help();
}