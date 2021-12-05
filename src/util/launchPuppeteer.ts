import puppeteer from 'puppeteer';

const defaultOptions = {
	headless: true,
	executablePath: process.env.CHROME_BIN || null,
	args: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage'],
}

export default async (options: puppeteer.LaunchOptions = defaultOptions) => {
	const browser = await puppeteer.launch(options);
	return browser;
}
