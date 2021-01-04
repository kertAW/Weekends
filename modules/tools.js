const tools = {
    expressValidator: {
        isEmpty(val) {
            check(val, 'Введите id').isEmpty()
        }
    }
}

module.exports = tools;