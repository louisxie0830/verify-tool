const PhoneNumber = require('awesome-phonenumber');


export default class Verify {
    constructor(prop) {
        this.input = prop;
        this.errorMessage = 'Success';
        this.pass = true;
    }

    data(input) {
        if (!this.pass) return this;

        this.input = input;
        return this;
    }

    isRequired(message) {
        if (!this.pass) return this

        if (
            /^\s*$/g.test(this.input) ||
            this.input === null ||
            this.input === undefined
        ) {
            this.errorMessage = message
            this.pass = false
        }
        return this
    }

    minLength(length, message) {
        if (!this.pass) return this

        if (this.input.length < length) {
            this.errorMessage = message
            this.pass = false
        }
        return this
    }

    maxLength(length, message) {
        if (!this.pass) return this;

        if (this.input.length > length) {
            this.errorMessage = message;
            this.pass = false;
        }
        return this;
    }

    requireFormat(formatArray, message) {
        if (!this.pass) return this;
        let formatMap = {
            number: 0,
            letter: 0,
            chinese: 0
        };

        Object.keys(formatMap).forEach(key => {
            if (formatArray.includes(key)) formatMap[key] = 1
        });

        const formatReg = new RegExp(
            `^[${formatMap.number ? '0-9' : ''}${
                formatMap.letter ? 'a-zA-Z' : ''
            }${formatMap.chinese ? '\u4e00-\u9fa5' : ''}]*$`
        );

        if (!formatReg.test(this.input)) {
            this.errorMessage = message;
            this.pass = false;
        }
        return this;
    }

    isEmail(message) {
        if (!this.pass) return this
        const emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        if (!emailReg.test(this.input)) {
            this.errorMessage = message;
            this.pass = false;
        }
        return this;
    }

    isURL(message) {
        if (!this.pass) return this

        const urlReg = new RegExp(
            '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
            'i'
        );
        if (!urlReg.test(this.input)) {
            this.errorMessage = message;
            this.pass = false;
        }
        return this;
    }
    
    isPhoneNumber(param, message) {
        if(!this.pass) return this;
        const {phone, countryCode} = param;
        const pn = new PhoneNumber(phone, countryCode || 'TW');
        if(!pn.isValid()) {
            this.errorMessage = message;
            this.pass = false;
        }
        return this;
    }
    
    isString(message) {
        if(!this.pass) return this;
        if(typeof this.input !== 'string') {
            this.errorMessage = message;
            this.pass;    
        }
        return this;
    }

    requireRegexp(reg, message) {
        if (!this.pass) return this;

        if (!reg.test(this.input)) {
            this.errorMessage = message;
            this.pass = false;
        }
        return this;
    }
}