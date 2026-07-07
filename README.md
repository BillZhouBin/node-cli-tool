# timestool - Unix Timestamp ↔ Date Converter

A simple yet powerful CLI tool for converting between Unix timestamps and human-readable dates.

## Features

- ⚡ **Fast conversion** - Instantly convert timestamps ↔ dates
- 🛠️ **Flexible formats** - Support multiple date formats (YYYY-MM-DD, DD/MM/YYYY, etc.)
- 🌍 **Timezone support** - IANA city names and UTC+8/GMT+2 offset format support
- 📊 **Dual unit support** - Handle both seconds and milliseconds timestamps
- ✨ **Auto-detection** - Automatically detects timestamp format (seconds/milliseconds)
- 🎯 **Simple API** - Intuitive command-line interface
- 🌐 **Web Interface** - Visual timestamp conversion with browser-based UI
- 📋 **JSON Tools** - Format/minify JSON with fold view, line numbers, theme toggle
- 🎨 **Color Tools** - Parse and calculate color values with alpha transparency
- 📝 **Markdown Preview** - Markdown editor with live preview

## Installation

```bash
npm install
```

## Global Setup (Optional)

Enable `timestool` command to be used globally without `node bin/cli.js` prefix.

### Option 1: npm link (Recommended for development)

```bash
npm link
```

After running this, you can use the tool globally:
```bash
timestool now
timestool ts2date 1713787200
timestool --help
```

To uninstall the global link:
```bash
npm unlink
```

### Option 2: Global installation

```bash
npm install -g
```

### Verify installation

```bash
timestool --help
```

If help information is displayed, the setup is successful.

---

## Understanding the CLI Command Name

The global command name (`timestool`) is defined in `package.json` under the `bin` field:

```json
"bin": {
  "timestool": "bin/cli.js"
}
```

- **Key** (`timestool`) — The command name you'll type in terminal
- **Value** (`bin/cli.js`) — The actual script file to execute

### How to change the command name

Modify the `bin` field in `package.json`:

```json
"bin": {
  "mytool": "bin/cli.js"    // Change to your desired command name
}
```

After changing, re-run the setup:
```bash
npm link   # or npm install -g
```

### Common command name examples

| bin Configuration | Command |
|-------------------|---------|
| `"timestool": "bin/cli.js"` | `timestool` |
| `"ts": "bin/cli.js"` | `ts` |
| `"time": "bin/cli.js"` | `time` |
| `"unix": "bin/cli.js"` | `unix` |

## Usage

### 1. Convert timestamp to date

```bash
# Basic usage (default: YYYY-MM-DD HH:mm:ss, Asia/Shanghai timezone)
node bin/cli.js ts2date 1713787200

# Output: ✅ 2024-04-22 20:00:00

# Custom format
node bin/cli.js ts2date 1713787200 --format "YYYY/MM/DD"

# Output: ✅ 2024/04/22

# Different timezone
node bin/cli.js ts2date 1713787200 --timezone UTC

# Output: ✅ 2024-04-22 12:00:00

# Milliseconds timestamp
node bin/cli.js ts2date 1713787200000 --format "YYYY-MM-DD HH:mm:ss"

# Output: ✅ 2024-04-22 20:00:00
```

### 2. Convert date to timestamp

```bash
# Basic usage (returns seconds by default)
node bin/cli.js date2ts "2024-04-22"

# Output: ✅ 1713715200

# With specific timezone
node bin/cli.js date2ts "2024-04-22 20:00:00" --timezone "Asia/Shanghai"

# Output: ✅ 1713787200

# Get milliseconds instead of seconds
node bin/cli.js date2ts "2024-04-22" --unit milliseconds

# Output: ✅ 1713715200000
```

### 3. Get current timestamp

```bash
# Get current Unix timestamp (seconds)
node bin/cli.js now

# Output: ✅ 1776839019

# Get current timestamp in milliseconds
node bin/cli.js now --unit milliseconds

# Output: ✅ 1776839019123
```

### 4. View format examples

```bash
node bin/cli.js formats

# Output:
# Common date formats:
#   YYYY-MM-DD              2026-04-22
#   YYYY-MM-DD HH:mm:ss     2026-04-22 15:30:45
#   DD/MM/YYYY              22/04/2026
#   MM/DD/YYYY              04/22/2026
#   YYYY/MM/DD              2026/04/22
#   YYYY-MM-DDTHH:mm:ssZ    2026-04-22T15:30:45Z (ISO 8601)
```

### 5. Help

```bash
node bin/cli.js --help
node bin/cli.js ts2date --help
node bin/cli.js date2ts --help
```

## Command Reference

### `ts2date <timestamp>`

Convert Unix timestamp to readable date.

**Options:**
- `-f, --format <format>` — Date output format (default: `YYYY-MM-DD HH:mm:ss`)
- `-z, --timezone <timezone>` — Timezone for conversion (default: `Asia/Shanghai`)

**Examples:**
```bash
node bin/cli.js ts2date 1713787200
node bin/cli.js ts2date 1713787200 --format "YYYY-MM-DD"
node bin/cli.js ts2date 1713787200 --timezone UTC
```

### `date2ts <date>`

Convert readable date to Unix timestamp.

**Options:**
- `-z, --timezone <timezone>` — Timezone for parsing (default: `Asia/Shanghai`)
- `-u, --unit <unit>` — Return unit: `seconds` or `milliseconds` (default: `seconds`)

**Examples:**
```bash
node bin/cli.js date2ts "2024-04-22"
node bin/cli.js date2ts "2024-04-22 20:00:00" --timezone "Asia/Shanghai"
node bin/cli.js date2ts "2024-04-22" --unit milliseconds
```

### `now`

Get current Unix timestamp.

**Options:**
- `-u, --unit <unit>` — Return unit: `seconds` or `milliseconds` (default: `seconds`)

**Examples:**
```bash
node bin/cli.js now
node bin/cli.js now --unit milliseconds
```

### `formats`

Display common date format examples.

### `web`

Launch a web-based visual interface for timestamp conversion.

**Options:**
- `-p, --port <port>` — Port number for the web server (default: `3000`)
- `-n, --no-open` — Do not open browser automatically

**Examples:**
```bash
nodetools web                    # Launch web interface with default port (3000)
nodetools web --port 8080        # Use custom port
nodetools web --no-open          # Start server without opening browser
```

**Features:**
- Visual timestamp ↔ date conversion
- Real-time current timestamp display
- 34 timezone options (UTC-12 to UTC+14, including half-hour offsets)
- Time difference calculator (shows start/end times and full D/H/M/S format)
- JSON beautify/minify with fold view, line numbers, theme toggle
- Color value parsing and alpha calculation
- Markdown editor with live preview (fullscreen mode supported)
- One-click copy results

**Usage:**
```bash
nodetools web
# Output: ✅ Web interface is running at: http://localhost:3000
# Browser will open automatically
```

### Web Interface Features

The web interface includes:

1. **Timestamp ↔ Date Conversion**
   - Real-time current timestamp display
   - 34 timezone options (UTC-12 to UTC+14, auto-detect local timezone)
   - Custom format support

2. **Time Difference Calculator**
   - Calculate time differences between two timestamps
   - Shows parsed start/end times with full D/H/M/S breakdown
   - Supported input formats:
     - **Unix timestamps**: `1713787200` (seconds) or `1713787200000` (milliseconds)
     - **Date-only**: `2025-12-21`
     - **Date + time**: `2024-04-22 20:00:00`
     - **Slash format**: `2024/04/22 20:00:00`
     - **ISO 8601**: `2025-05-21T10:30:00`

3. **JSON Tools**
   - JSON beautify (pretty print with indentation)
   - JSON minify (compress)
   - Code folding for `{}` and `[]` ranges after beautify
   - Line numbers for easy error location
   - Fold view ↔ edit mode toggle
   - Syntax validation with line-level error messages
   - Light/dark theme toggle
   - Fullscreen editing mode
   - One-click copy and clear

4. **Color Tools**
   - Parse color values (`#ff000000` or `0xFF000000`)
   - Calculate color with alpha transparency (hex or percentage)
   - Display color preview and RGBA values

5. **Markdown Preview**
   - Markdown syntax editing
   - Live preview rendering (split-pane layout)
   - Fullscreen preview mode (Esc to close)
   - Copy HTML output, clear content

## Supported Date Formats

When specifying custom formats with `--format`, use dayjs format tokens:

| Token | Description | Example |
|-------|-------------|---------|
| YYYY | 4-digit year | 2026 |
| MM | 2-digit month | 04 |
| DD | 2-digit day | 22 |
| HH | 24-hour | 15 |
| mm | Minutes | 30 |
| ss | Seconds | 45 |
| YYYY-MM-DD | ISO date | 2026-04-22 |
| YYYY-MM-DD HH:mm:ss | ISO datetime | 2026-04-22 15:30:45 |

See [dayjs documentation](https://day.js.org/docs/en/display/format) for more format options.

## Supported Timezones

Three timezone formats are supported:

### 1. IANA City Names (Recommended)

| Timezone | Description |
|----------|-------------|
| `Asia/Shanghai` | China Standard Time (default) |
| `UTC` | Coordinated Universal Time |
| `Asia/Tokyo` | Japan Standard Time |
| `America/New_York` | US Eastern Time |
| `Europe/London` | UK Time |
| `Australia/Sydney` | Australian Eastern Time |

### 2. UTC/GMT Offset Format

Use offset directly for convenience:

```bash
node bin/cli.js ts2date 1713787200 -z UTC+8   # UTC+8 (Beijing time)
node bin/cli.js ts2date 1713787200 -z UTC+2   # UTC+2
node bin/cli.js ts2date 1713787200 -z UTC-5   # UTC-5 (New York time)
node bin/cli.js ts2date 1713787200 -z GMT+8   # Same as UTC+8
```

### 3. Etc/GMT Format

```bash
node bin/cli.js ts2date 1713787200 -z Etc/GMT-8  # Note: sign is reversed
```

For a complete list, see [IANA timezone database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

## Project Structure

```
node_tool/
├── bin/
│   └── cli.js              # CLI entry point
├── src/
│   ├── converters.js       # Core conversion functions
│   ├── formatters.js       # Output formatting functions
│   └── utils.js            # Utility functions & validation
├── web/
│   └── index.html          # Web interface (visual tool)
├── package.json            # Project metadata and dependencies
├── README.md               # English documentation
└── README_zh.md            # Chinese documentation
```

## Dependencies

- **[commander](https://www.npmjs.com/package/commander)** — CLI framework with argument parsing
- **[dayjs](https://www.npmjs.com/package/dayjs)** — Lightweight date library with timezone support

## Tips

### Common Use Cases

**Convert current time to Beijing time:**
```bash
node bin/cli.js ts2date $(node bin/cli.js now | grep -oE '[0-9]+') --timezone Asia/Shanghai
```

**Convert multiple timestamps:**
```bash
for ts in 1713787200 1713787300 1713787400; do
  node bin/cli.js ts2date $ts
done
```

**Batch convert with custom format:**
```bash
node bin/cli.js ts2date 1713787200 --format "DD/MM/YYYY HH:mm"
```

## Troubleshooting

**Q: Invalid timestamp error**
- Ensure your timestamp is a valid Unix timestamp (seconds: 10 digits, milliseconds: 13 digits)
- Example valid timestamps: `1713787200` (seconds) or `1713787200000` (milliseconds)

**Q: Invalid date format error**
- Check that your date string follows a valid format (e.g., `2024-04-22`, `04/22/2024`)
- Use quotes around dates with spaces: `"2024-04-22 20:00:00"`

**Q: Timezone difference**
- The default timezone is `Asia/Shanghai`. Use `--timezone UTC` for UTC time
- Verify the timezone name from [IANA database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

## Future Enhancements

- [x] Time difference calculation
- [ ] REPL interactive mode
- [ ] Batch conversion from file input
- [ ] Configuration file support (`.timestool.json`)
- [ ] Relative time output (e.g., "2 hours ago")
- [ ] NPM package publishing
- [ ] More language support

## License

ISC

## Contributing

Feel free to open issues or submit pull requests for improvements!

---

**Enjoy fast and easy timestamp conversions!** ⚡
