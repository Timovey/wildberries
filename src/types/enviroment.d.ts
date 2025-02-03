declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production';
			DB_HOST: string;
			DB_PORT: string;
			DB_NAME: string;
			DB_USER: string;
			DB_PSD: string;
			AUTH_WB: string;
			GOOGLE_PRIVATE_KEY: string;
			GOOGLE_SERVICE_ACCOUNT_EMAIL: string;
			GOOGLE_SHEET_ID: string;
		}
	}
}
export {};
