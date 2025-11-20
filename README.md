# Poi加密解密工具 - JavaScript版本

一个纯浏览器端的Poi加密解密工具，基于poi和nico的简单加密算法，可以将任意文本转换为poi/nico格式的字符串。

## 功能特点

- 🚀 **纯浏览器端运行** - 无需服务器，不产生中间文件
- 🔒 **本地加密解密** - 数据完全在用户浏览器中处理
- 📱 **响应式设计** - 支持桌面和移动设备
- ⌨️ **键盘快捷键** - Ctrl+Enter 加密，Ctrl+D 解密
- 📊 **实时统计** - 显示原始长度和处理后长度对比
- 📋 **一键复制** - 方便复制结果到剪贴板

## 使用方法

### 在线使用
直接打开 `index.html` 文件即可使用

### 加密文本
1. 在输入框中输入要加密的文本
2. 点击"加密 (Encode)"按钮或按 Ctrl+Enter
3. 加密结果将显示在结果区域

### 解密文本
1. 在输入框中输入要解密的poi/nico格式文本
2. 点击"解密 (Decode)"按钮或按 Ctrl+D
3. 解密结果将显示在结果区域

## 文件说明

- `index.html` - 主界面文件，包含完整的用户界面和JavaScript代码
- `test.html` - 功能测试页面，用于验证加密解密算法的正确性
- `poi-encoder.js` - 独立的编码器类（已内联到index.html）
- `poi-decoder.js` - 独立的解码器类（已内联到index.html）

## 技术实现

### 加密算法原理
1. 将输入文本转换为ASCII码
2. 将每个ASCII码转换为8位二进制
3. 统计连续的0和1的出现次数
4. 使用poi表示0，nico表示1
5. 使用符号表示数字（如：) = 0, ! = 1, @ = 2 等）

### 示例
- 输入：`hello`
- 加密结果：`poi~#~nico~$~poi~#~nico~$~poi~#~nico~$~poi~#~nico~$~poi~#~nico~$~`

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 算法原作者

算法原作者：Angelic47  
GitHub: https://github.com/Angelic47

## 许可证

GPLv3
