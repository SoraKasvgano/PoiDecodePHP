// Poi Decoder Class - JavaScript Version
// Licensed under WTFPL
// Author: Angelic47 http://www.angelic47.com
// JavaScript Adaptation: AI Assistant

class PoiDecoder {
    constructor(data) {
        if (typeof data !== 'string') {
            throw new Error('Input data must be a string');
        }
        
        this.poiedContents = data;
        this.bitBufferLen = 0;
        this.bitBuffer = 0;
        this.finalStr = '';
        this.already = false;
        this.poiStruct = [];
    }

    symbolToNumber(symbol) {
        const symbolMap = {
            ')': '0', '!': '1', '@': '2', '#': '3', '$': '4',
            '%': '5', '^': '6', '&': '7', '*': '8', '(': '9'
        };
        
        let resultStr = '';
        
        for (let i = 0; i < symbol.length; i++) {
            const char = symbol[i];
            if (symbolMap[char]) {
                resultStr += symbolMap[char];
            } else {
                throw new Error('Invalid symbol character: ' + char);
            }
        }
        
        return parseInt(resultStr, 10);
    }

    decodePoiStruct() {
        // 使用~分割字符串
        const parts = this.poiedContents.split('~');
        this.poiStruct = [];
        
        for (let i = 0; i < parts.length; i++) {
            const value = parts[i];
            
            // 跳过空字符串
            if (value === '') {
                continue;
            }
            
            switch (value) {
                case 'poi':
                    this.poiStruct.push(0);
                    break;
                case 'nico':
                    this.poiStruct.push(1);
                    break;
                default:
                    // 处理数字符号
                    this.poiStruct.push(this.symbolToNumber(value));
                    break;
            }
        }
    }

    bitWorker(bit, times) {
        for (let i = 0; i < times; i++) {
            // 将bit放入缓冲区
            this.bitBuffer |= bit << (7 - this.bitBufferLen);
            this.bitBufferLen++;
            
            // 当缓冲区满8位时，输出一个字节
            if (this.bitBufferLen >= 8) {
                this.bitBufferLen = 0;
                this.finalStr += String.fromCharCode(this.bitBuffer);
                this.bitBuffer = 0;
            }
        }
    }

    getDecode() {
        if (this.already) {
            return this.finalStr;
        }

        // 重置状态（允许重复使用）
        this.bitBufferLen = 0;
        this.bitBuffer = 0;
        this.finalStr = '';
        this.already = false;

        this.decodePoiStruct();
        
        let i = 0;
        let bit = 0;
        let times = 0;
        
        for (let j = 0; j < this.poiStruct.length; j++) {
            const value = this.poiStruct[j];
            
            switch (i) {
                case 0:
                    bit = value;
                    break;
                case 1:
                    times = value;
                    this.bitWorker(bit, times);
                    i = -1; // 重置状态机
                    break;
                default:
                    throw new Error('Arrived at default while decoding poi struct which shouldn\'t happen');
            }
            i++;
        }
        
        // 检查缓冲区是否为空
        if (this.bitBufferLen !== 0) {
            throw new Error('Origin data was broken exception - buffer not empty');
        }
        
        this.already = true;
        return this.finalStr;
    }
}

// 导出供浏览器使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PoiDecoder;
}