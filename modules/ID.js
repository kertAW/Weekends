function createID(is) {
    if (typeof is !== 'number') {
        return new TypeError('Function takes a number');
    }
    if (is > 1 || is < 0) {
        return new TypeError('Function takes a number in range 0 - 1');
    }
    const timestamp = Date.now();
    const randomNumber = () => { return Math.floor(Math.random() * 10) };
    const numsCenter = `${randomNumber()}${randomNumber()}${randomNumber()}`;
    return `${is}x${numsCenter}x${timestamp}`;
}

const validator = {
    identifierValidator: /^[0-1]x\d{1,3}x\d{13}$/,
}

module.exports = { createID, validator }