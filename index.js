const express = require('express');
const app = express();
const port = process.env.PORT || 80;
const puppeteer = require('puppeteer');

var browser = null;

const renderPDF = async (url, format='A4') => {
	const page = await browser.newPage();
	await page.setJavaScriptEnabled(process.env.JAVASCRIPT_ENABLED === 'true');
	await page.goto(url);
	const pdf = await page.pdf({ format });
	return pdf;
}

app.get('/', async (req, res) => {
	if (!('url' in req.query)) {
		res.status(400).send('Missing url parameter');
		return;
	}
	var format = 'A4';
	if ('format' in req.query) {
		format = req.query.format;
	}

	const url = req.query.url;
	const pdf = await renderPDF(url, format);
	res.setHeader('Content-Type', 'application/pdf');
	res.send(pdf);
});

(async () => {
	browser = await puppeteer.launch({
		headless: true,
		executablePath: process.env.CHROME_BIN || null,
		args: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage']
	});
	app.listen(port, () => console.log(`Example app listening on port ${port}!`));
})()