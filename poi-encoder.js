// Poi Encoder Class - JavaScript Version
// Licensed under WTFPL
// Author: Angelic47 http://www.angelic47.com
// JavaScript Adaptation: AI Assistant

class PoiEncoder {
    constructor() {
        this.currectNumber = 1;
        this.finalString = '';
        this.currectBit = false;
        this.already = false;
    }

    numberToSymbol(num) {
        if (num <= 0) {
            throw new Error('Illegal argument exception while number to symbol which shouldn\'t happen');
        }
        
        const symbolMap = {
            '0': ')', '1': '!', '2': '@', '3': '#', '4': '$', 
            '5': '%', '6': '^', '7': '&', '8': '*', '9': '('
        };
        
        const numStr = num.toString();
        let resultStr = '';
        
        for (let i = 0; i < numStr.length; i++) {
            const digit = numStr[i];
            if (symbolMap[digit]) {
                resultStr += symbolMap[digit];
            } else {
                throw new Error('Invalid digit in number: ' + digit);
            }
        }
        
        return resultStr;
    }

    bitWriteWorker(bit, len) {
        switch (bit) {
            case 0:
                this.finalString += 'poi~';
                break;
            case 1:
                this.finalString += 'nico~';
                break;
            default:
                throw new Error('Mismatch bit exception while covering bit which shouldn\'t happen');
        }
        
        this.finalString += this.numberToSymbol(len);
        this.finalString += '~';
    }

    addBit(bit) {
        if (this.currectBit === false) {
            this.currectBit = bit;
            this.currectNumber = 1;
            return;
        }
        
        if (this.currectBit !== bit) {
            this.bitWriteWorker(this.currectBit, this.currectNumber);
            this.currectBit = bit;
            this.currectNumber = 1;
            return;
        }
        
        this.currectNumber++;
    }

    doneEncode() {
        if (this.currectBit !== false) {
            this.bitWriteWorker(this.currectBit, this.currectNumber);
        }
    }

    addByte(byte) {
        // 将字符转换为ASCII码
        const charCode = byte.charCodeAt(0);
        
        // 处理8位二进制
        for (let i = 0; i < 8; i++) {
            // 从最高位开始处理
            const bitMask = 0x80 >> i;
            const bit = (charCode & bitMask) > 0 ? 1 : 0;
            this.addBit(bit);
        }
    }

    getEncode(text) {
        if (this.already) {
            return this.finalString;
        }

        if (typeof text !== 'string') {
            throw new Error('Input must be a string');
        }

        // 重置状态（允许重复使用）
        this.currectNumber = 1;
        this.finalString = '';
        this.currectBit = false;
        this.already = false;

        const contentLength = text.length;
        
        for (let i = 0; i < contentLength; i++) {
            this.addByte(text[i]);
        }
        
        this.doneEncode();
        this.already = true;
        
        return this.finalString;
    }
}

// 导出供浏览器使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PoiEncoder;
}