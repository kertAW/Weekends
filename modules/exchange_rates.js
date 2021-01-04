const fetch = require('node-fetch');
const Exchange_rates = require('../models/Exchange_rates');

const links = {
    BTC: 'https://blockchain.info/ru/ticker',
    other: 'https://www.cbr-xml-daily.ru/daily_json.js'
};

function exchange_rates(links) {
    for (const link in links) {
        fetch(links[link])
            .then(res => res.json())
            .then(async res => {
                const candidate = await Exchange_rates.findOne({ rates: link });
                if (!candidate) {
                    const rates = new Exchange_rates({
                        rates: link,
                        json: res
                    });
                    return await rates.save();
                }
                return await Exchange_rates.updateOne({ rates: link }, { json: res });
            });
    }
}

const s = 1000;
const m = s * 60;

setInterval(exchange_rates, m * 3, links)