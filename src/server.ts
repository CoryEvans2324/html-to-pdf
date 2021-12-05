import express, {Request, Response} from 'express';
import puppeteer from 'puppeteer';
import launchPuppeteer from './util/launchPuppeteer';


const app = express();
const PORT = process.env.PORT || 3000;

(async () => {
	const browser = await launchPuppeteer()

	const renderPDF = async (url: string, format: puppeteer.PDFFormat) => {
		const page = await browser.newPage();
		page.setViewport({width: 1920, height: 1080});
		await page.goto(url, { waitUntil: ['networkidle0' , 'domcontentloaded'] });
		const pdf = await page.pdf({
			format,
			margin: {
				top: '1cm',
				right: '1cm',
				bottom: '1cm',
				left: '1cm'
			},
		});
		await page.close();
		return pdf;
	}

	app.get('/', async (req: Request, res: Response) => {
		if (!('url' in req.query)) {
			res.status(400).send('Missing url parameter');
			return;
		}

		const url = req.query.url as string;
		const format = req.query.format as puppeteer.PDFFormat;
		const pdf = await renderPDF(url, format);
		res.setHeader('Content-Type', 'application/pdf');
		res.send(pdf);
	});

	await app.listen(PORT);
	console.log(`Server listening on port ${PORT}`);
})()