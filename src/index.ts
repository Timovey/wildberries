import wildberries from './services/wildberries';
import 'dotenv/config';
import spreadSheet from './services/spreadSheet';
import nodeCron from 'node-cron';
async function start() {
	try {
		nodeCron.schedule('23 * * * *', async () => {
			wildberries();
		});
		nodeCron.schedule('25 * * * *', async () => {
			spreadSheet();
		});
	} catch (error: any) {
		console.log('О нет', error);
	}
}
start();
