#!/usr/bin/env node

/**
 * 命令行工具主入口
 * 时间戳与日期转换工具
 */

const { program } = require('commander');
const chalk = require('chalk');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const {
  timestampToDate,
  dateToTimestamp,
  getCurrentTimestamp,
} = require('../src/converters');
const { formatError, formatSuccess, getFormatExamples } = require('../src/formatters');

const VERSION = '1.0.0';

// 主程序配置
program
  .name('nodetools')
  .description('Unix timestamp ↔ Date conversion CLI tool')
  .version(VERSION)
  .addHelpText('after', `
${chalk.bold.cyan('Quick Start:')}
  $ nodetools ts2date 1690000000
  $ nodetools date2ts "2024-01-01 12:00:00"
  $ nodetools now
  $ nodetools web

${chalk.bold.cyan('Timezone Formats:')}
  - IANA city names:   ${chalk.yellow('Asia/Shanghai')}, ${chalk.yellow('America/New_York')}, ${chalk.yellow('Europe/London')}
  - UTC/GMT offset:    ${chalk.yellow('UTC+8')}, ${chalk.yellow('UTC-5')}, ${chalk.yellow('GMT+2')}, ${chalk.yellow('GMT-5:30')}
  - Etc/GMT format:    ${chalk.yellow('Etc/GMT-8')}, ${chalk.yellow('Etc/GMT+5')}

${chalk.bold.cyan('Date Format Tokens:')}
  ${chalk.green('YYYY')}  - 4-digit year         ${chalk.green('HH')}    - 24-hour hour
  ${chalk.green('MM')}    - month (01-12)         ${chalk.green('mm')}    - minute
  ${chalk.green('DD')}    - day (01-31)           ${chalk.green('ss')}    - second
  ${chalk.green('H')}     - 24-hour hour          ${chalk.green('SSS')}   - millisecond

${chalk.bold.cyan('Get help for a specific command:')}
  $ nodetools ts2date --help
  $ nodetools date2ts --help
  $ nodetools web --help`);

// 子命令：时间戳转日期
program
  .command('ts2date <timestamp>')
  .description('Convert Unix timestamp to a human-readable date string')
  .summary('Timestamp → Date')
  .option('-f, --format <format>', 'output date format (e.g., YYYY-MM-DD HH:mm:ss)', 'YYYY-MM-DD HH:mm:ss')
  .option('-z, --timezone <timezone>', 'target timezone (e.g., Asia/Shanghai, UTC, UTC+8)', 'Asia/Shanghai')
  .addHelpText('after', `
${chalk.bold.cyan('Examples:')}
  $ nodetools ts2date ${chalk.yellow('1690000000')}
  $ nodetools ts2date ${chalk.yellow('1690000000')} -f ${chalk.green('"YYYY/MM/DD"')}
  $ nodetools ts2date ${chalk.yellow('1690000000')} -z ${chalk.magenta('UTC')}
  $ nodetools ts2date ${chalk.yellow('1690000000')} -z ${chalk.magenta('UTC+8')} -f ${chalk.green('"YYYY-MM-DD HH:mm:ss"')}`)
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
  .description('Convert a date string to Unix timestamp')
  .summary('Date → Timestamp')
  .option('-z, --timezone <timezone>', 'timezone of the input date (e.g., Asia/Shanghai, UTC, UTC+8)', 'Asia/Shanghai')
  .option('-u, --unit <unit>', 'output unit: seconds or milliseconds', 'seconds')
  .addHelpText('after', `
${chalk.bold.cyan('Examples:')}
  $ nodetools date2ts ${chalk.yellow('"2024-01-01 12:00:00"')}
  $ nodetools date2ts ${chalk.yellow('"2024-01-01"')} -z ${chalk.magenta('UTC')}
  $ nodetools date2ts ${chalk.yellow('"2024-01-01 12:00:00"')} -u ${chalk.green('milliseconds')}
  $ nodetools date2ts ${chalk.yellow('"2024-01-01 12:00:00"')} -z ${chalk.magenta('UTC+8')} -u ${chalk.green('seconds')}`)
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
  .description('Get the current Unix timestamp')
  .summary('Current timestamp')
  .option('-u, --unit <unit>', 'output unit: seconds or milliseconds', 'seconds')
  .addHelpText('after', `
${chalk.bold.cyan('Examples:')}
  $ nodetools now
  $ nodetools now -u ${chalk.green('milliseconds')}`)
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
  .description('Show common date format examples for reference')
  .summary('Format reference')
  .addHelpText('after', `
${chalk.bold.cyan('Examples:')}
  $ nodetools formats`)
  .action(() => {
    console.log(getFormatExamples());
  });

// 子命令：启动网页版
program
  .command('web')
  .description('Launch a local web server with a visual timestamp/date converter UI')
  .summary('Launch web UI')
  .option('-p, --port <port>', 'HTTP server port (default: 3000)', '3000')
  .option('-n, --no-open', 'do not open browser automatically')
  .addHelpText('after', `
${chalk.bold.cyan('Examples:')}
  $ nodetools web
  $ nodetools web -p ${chalk.yellow('8080')}
  $ nodetools web -n
  $ nodetools web -p ${chalk.yellow('8080')} -n`)
  .action((options) => {
    const port = options.port;
    const webPath = path.join(__dirname, '..', 'web');
    const indexPath = path.join(webPath, 'index.html');

    // 检查 web 目录是否存在
    if (!fs.existsSync(indexPath)) {
      console.error(formatError('Web interface not found. Please ensure the web folder exists.'));
      process.exit(1);
    }

    // 创建 HTTP 服务器
    const server = http.createServer((req, res) => {
      let filePath = path.join(webPath, req.url === '/' ? 'index.html' : req.url);

      const extname = path.extname(filePath);
      const contentTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
      };

      const contentType = contentTypes[extname] || 'application/octet-stream';

      fs.readFile(filePath, (err, content) => {
        if (err) {
          if (err.code === 'ENOENT') {
            res.writeHead(404);
            res.end('404 Not Found');
          } else {
            res.writeHead(500);
            res.end('Server Error');
          }
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content, 'utf-8');
        }
      });
    });

    server.listen(port, () => {
      const url = `http://localhost:${port}`;
      console.log(formatSuccess(`Web interface is running at: ${url}`));
      console.log(`Press Ctrl+C to stop the server.`);

      // 自动打开浏览器
      if (options.open !== false) {
        const openCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
        exec(`${openCmd} ${url}`);
      }
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(formatError(`Port ${port} is already in use. Try a different port with --port <number>`));
      } else {
        console.error(formatError(err.message));
      }
      process.exit(1);
    });
  });

// 解析命令行参数
program.parse(process.argv);

// 如果没有提供任何命令，显示帮助信息
if (process.argv.length < 3) {
  program.help();
}