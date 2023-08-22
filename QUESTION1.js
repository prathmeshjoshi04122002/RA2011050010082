const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8008;

app.get('/numbers', async (req, res) => {
    const urls = req.query.url;

    if (!urls || !Array.isArray(urls)) {
        return res.status(400).json({ error: 'Invalid URL list' });
    }

    const result = [];

    try {
        for (const url of urls) {
            try {
                const response = await axios.get(url);
                const data = response.data;

                if (Array.isArray(data.numbers)) {
                    result.push(...data.numbers);
                }
            } catch (error) {
                console.error(`Error fetching data from ${url}: ${error.message}`);
            }
        }

        return res.json({ numbers: result });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





curl "http://localhost:8008/numbers?url=http://20.244.56.144/numbers/primes&url=http://abc.com/fibo"

