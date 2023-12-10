const axios = require("axios");
const cheerio = require("cheerio");
const express = require('express')
const app = express()
const port = 4010

app.get('/download/:id', async (req, res) => {
    var { id } = req.params
    console.log(id)
    var url
    try {
        url = await getDirectUrl(id)
    } catch (error) {
        return res.status(500).end()
    }
    res.redirect(url)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

async function getDirectUrl(id) {
    const url = `https://uploadhaven.com/download/${id}`
    var html = await (await axios.get(url, {
        headers: {
            'authority': 'uploadhaven.com',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'no-cache',
            'cookie': '_ga=GA1.1.1449128505.1702227289; _ga_40Y7JFT57E=GS1.1.1702227289.1.1.1702228275.0.0.0; XSRF-TOKEN=eyJpdiI6ImNveUIyN2NxazBVKy9SN2phVHpTMXc9PSIsInZhbHVlIjoiV3czZ0YvS2tldGpBNXlUSktrazgycUVQejd3VlhuM0lDejJPUlVWU0UwZS9yVzlzN2tmMEVtZWJRVlRNbDN6Vm1WQU1kMEN1ZmRsVWtxbmw0aE9aYjdSd3NaTlczL3Bnc093Rk41aTlQWFhqZ0wxV1BtYVpXbFlFd0NWZk0yUE8iLCJtYWMiOiI0MGM3NWY5MjU5NmQzMDEwNzgxOTNjMWY5YmZiYjRiZDk1YTJjYTFmODAxZTA5YzQxY2IwZTc3OTRmYjM2YzUyIiwidGFnIjoiIn0%3D; uploadhaven_session=eyJpdiI6InpFd3VuQUdKYnM0YXIxTkJRZUtEZkE9PSIsInZhbHVlIjoiTFdsY1RuditORDBnQ2U4bU9mcXVPcFlweGlrK3U1b2N2ek1jOGxKUTFPTktydFdJYUl0cldRYmZUck53aTJIZGtBVjhuMEtvem45RXdPakxKNmROTWpkNDdIenVOWUdiN0NhOHpZVVZOeXRRcVphS3grMkwyWnpqaEZOVEZ2YmMiLCJtYWMiOiIzNWNmOGY2YjNlMmM1NDg1YjBjMzk4M2E0NDAxZGU3NzM1MDQ0MjM0OWJkZDg1MjUyNWViYmRkYTYyOGFhMDMxIiwidGFnIjoiIn0%3D',
            'dnt': '1',
            'pragma': 'no-cache',
            'referer': 'https://steamunlocked.net/',
            'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'cross-site',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
        }
    })).data

    var $ = cheerio.load(html)
    var downloadForm = $("#form-download")
    var key = $(downloadForm).find('input[name="key"]').attr("value")
    var time = $(downloadForm).find('input[name="time"]').attr("value")
    var hash = $(downloadForm).find('input[name="hash"]').attr("value")
    var token = $('meta[name="csrf-token"]').attr("content")

    await new Promise(r => setTimeout(r, 5000));

    var html = await (await axios.post(url,
        new URLSearchParams({
            '_token': token,
            'key': key,
            'time': time,
            'hash': hash,
            'type': 'free'
        }),
        {
            headers: {
                'authority': 'uploadhaven.com',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'no-cache','dnt': '1',
                'origin': 'https://uploadhaven.com',
                'pragma': 'no-cache',
                'referer': url,
                'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
            }
        }
    )).data

    var $ = cheerio.load(html)

    var link = $(".download-timer a").attr("href")

    return link
}