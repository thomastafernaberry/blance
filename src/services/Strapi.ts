import type { ProductData } from './Product.ts';
import type { CategoryData } from './Category.ts';
import { strapi } from '@strapi/client';

const env = import.meta.env;
const strapiToken = env.STRAPI_TOKEN;
const strapiBaseUrl = env.PUBLIC_STRAPI_BASE_URL;
const strapiApiEndpoint = env.PUBLIC_STRAPI_API_ENDPOINT;

export type StrapiResponse = {
	readonly data: ProductData | ProductData[] | CategoryData[];
	readonly meta: any;
	readonly error?: any;
}

export default class Strapi {
	private strapiToken: string;
	private strapiApiUrl: string;
	public strapiClient: any;
	
	constructor() {
		this.strapiToken = strapiToken;
		this.strapiApiUrl = strapiBaseUrl + strapiApiEndpoint;
		this.strapiClient = strapi({ 
			baseURL: this.strapiApiUrl, 
			auth: this.strapiToken 
		});
	}
}
