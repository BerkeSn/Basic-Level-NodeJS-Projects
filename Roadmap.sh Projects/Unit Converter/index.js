const http = require('http');
const fs = require('fs').promises;

const unitOptions = {
    length: `
        <option value="m">Meter</option>
        <option value="km">Kilometer</option>
        <option value="cm">Centimeter</option>
    `,
    weight: `
        <option value="kg">Kilogram</option>
        <option value="g">Gram</option>
        <option value="lb">Pound</option>
    `,
    temp: `
        <option value="c">Celsius</option>
        <option value="f">Fahrenheit</option>
        <option value="k">Kelvin</option>
    `
};

const LENGTH_RATES = {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,
    inch: 0.0254,
    ft: 0.3048
};

const WEIGHT_RATES = {
    kg: 1,
    g: 0.001,
    mg: 0.000001,
    lb: 0.45359237,
    oz: 0.0283495
};

function convertLinear(value, from, to, rates) {
    if (!rates[from] || !rates[to]) return null;
    const inBase = value * rates[from];
    return inBase / rates[to];
}

function convertTemperature(value, from, to) {
    if (from === to) return value;

    let inCelsius;
    if (from === 'c') inCelsius = value;
    else if (from === 'f') inCelsius = (value - 32) * (5 / 9);
    else if (from === 'k') inCelsius = value - 273.15;
    else return null;

    if (to === 'c') return inCelsius;
    if (to === 'f') return (inCelsius * (9 / 5)) + 32;
    if (to === 'k') return inCelsius + 273.15;
    return null;
}

async function gettingPage(pageAdress, type = 'length') {
    let content = await fs.readFile(pageAdress, "utf-8");
    const options = unitOptions[type] || unitOptions.length;
    content = content.replaceAll('<!--OPTIONS-->', options);
    let urladress;
    if (type == 'length') {
        urladress = '/convertLength';
    }
    if (type == 'weight') {
        urladress = '/convertWeight';
    } if (type == 'temp') {
        urladress = '/convertTempature';
    }
    content = content.replaceAll('parametre', urladress,);
    return content;
}

const server = http.createServer(async (req, res) => {
    try {
        // HomePage
        if (req.url == '/') {
            const content = await gettingPage('index.html', 'length');
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(content);
        }

        // Converting Length
        else if (req.url == '/convertLength' && req.method == "GET") {
            const content = await gettingPage('index.html', 'length');
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(content);
        }

        // Convert button in Converting Length Page
        else if (req.url == '/convertLength' && req.method == "POST") {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk.toString();
            })

            req.on('end', () => {
                const params = new URLSearchParams(body);
                const input = params.get('input');
                const convertFrom = params.get('convertFrom');
                const convertTo = params.get('convertTo');

                if (!input || !convertFrom || !convertTo) {
                    console.log("Please input all the areas");
                    res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
                    return res.end(JSON.stringify({ error: 'Please input all areas' }));
                }

                const val = Number(input);
                const result = convertLinear(val, convertFrom, convertTo, LENGTH_RATES);

                res.writeHead(200, { "Content-type": 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    input: val,
                    convertFrom,
                    convertTo,
                    result: Number(result.toFixed(4))
                }));
            })
        }

        else if (req.url == '/convertWeight' && req.method == "GET") {
            const page = await gettingPage('index.html', 'weight');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(page);
        }

        else if (req.url == '/convertWeight' && req.method == 'POST') {

            let body = '';

            req.on('data', (chunk) => {
                body += chunk;
            })

            req.on('end', () => {
                const params = new URLSearchParams(body)
                const input = params.get('input');
                const convertFrom = params.get('convertFrom');
                const convertTo = params.get('convertTo');

                if (!input || !convertFrom || !convertTo) {
                    console.log("ConvertWeight, please input all the areas");
                    res.writeHead(403, { 'Content-Type': 'text-plain' });
                    res.end('Please input all the areas');
                }

                const val = Number(input);
                const result = convertLinear(val, convertFrom, convertTo, WEIGHT_RATES);

                res.writeHead(200, { "Content-type": 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    input: val,
                    convertFrom,
                    convertTo,
                    result: Number(result.toFixed(4))
                }));
            })
        }

        else if (req.url == '/convertTempature' && req.method == "GET") {
            const page = await gettingPage('index.html', 'temp');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(page);
        }

        else if (req.url == '/convertTempature' && req.method == 'POST') {

            let body = '';

            req.on('data', (chunk) => {
                body += chunk;
            })

            req.on('end', () => {
                const params = new URLSearchParams(body)
                const input = params.get('input');
                const convertFrom = params.get('convertFrom');
                const convertTo = params.get('convertTo');

                if (!input || !convertFrom || !convertTo) {
                    console.log("ConvertWeight, please input all the areas");
                    res.writeHead(403, { 'Content-Type': 'text-plain' });
                    res.end('Please input all the areas');
                }

                const val = Number(input);
                const result = convertTemperature(val, convertFrom, convertTo);

                res.writeHead(200, { "Content-type": 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    input: val,
                    convertFrom,
                    convertTo,
                    result: Number(result.toFixed(2))
                }));
            })
        }

        else {
            res.end(`${req.url} not found`);
        }
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
});

const PORT = 8000;

server.listen(PORT, () => {
    console.log(`Server running on => ${PORT}`);
})