# XPath Debugger Chrome Extension

一个用于在网页上测试和调试 XPath 表达式的 Chrome 扩展程序。

A Chrome extension for testing and debugging XPath expressions on web pages.

## 浏览器兼容性 / Browser Compatibility

- 最低 Chrome 版本要求：88+ / Minimum required Chrome version: 88+
- 推荐 Chrome 版本：100+ / Recommended Chrome version: 100+
- 使用 Manifest V3 和现代 Chrome APIs / Uses Manifest V3 and modern Chrome APIs
- 不兼容旧版本 Chrome（88版本以下）/ Not compatible with older Chrome versions (pre-88)
- 支持所有兼容 Manifest V3 的 Chromium 内核浏览器 / Works on all Chromium-based browsers that support Manifest V3

## 功能特点 / Features

- 实时测试 XPath 表达式 / Test XPath expressions in real-time
- 显示匹配元素数量 / Display the number of matching elements
- 展示每个匹配元素的详细信息 / Show detailed information for each matched element
- 支持所有网页 / Works on all websites
- 简单直观的用户界面 / Simple and intuitive user interface

## 安装说明 / Installation

1. 确保 Chrome 版本在 88 或以上（在 chrome://version/ 查看）/ Ensure Chrome version 88 or higher (check at chrome://version/)
2. 下载此仓库到本地 / Clone this repository
3. 打开 Chrome 浏览器，进入扩展程序页面 (chrome://extensions/) / Open Chrome and navigate to chrome://extensions/
4. 启用"开发者模式" / Enable "Developer mode"
5. 点击"加载已解压的扩展程序"，选择项目文件夹 / Click "Load unpacked" and select the project folder

## 使用方法 / Usage

1. 点击 Chrome 工具栏中的扩展图标 / Click the extension icon in the Chrome toolbar
2. 在输入框中输入 XPath 表达式 / Enter your XPath expression in the input field
3. 点击"Evaluate"按钮 / Click the "Evaluate" button
4. 查看匹配结果 / View the results:
   - 匹配元素数量 / Number of matches
   - 每个匹配元素的文本内容和标签类型 / Text content and tag type for each match

## 权限说明 / Permissions

- `activeTab`: 访问当前标签页 / Access the current tab's content
- `scripting`: 执行内容脚本 / Execute content scripts for XPath evaluation

## 技术栈 / Tech Stack

- Manifest V3
- Chrome Extensions API
- JavaScript
- HTML/CSS

## 开发说明 / Development

项目结构 / Project structure:

```
chrome_xpath/
├── manifest.json      # 扩展配置文件 / Extension configuration
├── popup.html        # 弹出窗口界面 / Popup interface
├── popup.js         # 弹出窗口逻辑 / Popup logic
├── content.js       # 内容脚本 / Content script
└── images/         # 图标资源 / Icon resources
    └── icon16.png
```

## 注意事项 / Notes

- 确保输入有效的 XPath 表达式 / Ensure valid XPath expressions
- 某些网站可能限制内容脚本执行 / Some websites may have Content Security Policies that restrict content script execution
- 刷新页面后重新测试可能会得到更准确的结果 / Refresh the page for more accurate results

## 贡献 / Contributing

欢迎提交 Pull Request 来改进这个项目！/ Contributions are welcome! Please feel free to submit a Pull Request.

## 许可证 / License

MIT