import type { ProductData } from './Product.ts';
import type { CategoryData } from './Category.ts';
import { strapi } from '@strapi/client';

const strapiURL = import.meta.env.PUBLIC_STRAPI_URL;
const strapiToken = import.meta.env.STRAPI_TOKEN;

export type StrapiResponse = {
  readonly data: ProductData | ProductData[] | CategoryData[];
  readonly meta: any;
  readonly error?: any;
}

export default class Strapi {
	private strapiURL: string;
	private strapiToken: string;
	public strapiClient: any;
	
	constructor() {
		this.strapiURL = strapiURL;
		this.strapiToken = strapiToken;
		this.strapiClient = strapi({ 
			baseURL: this.strapiURL, 
			auth: this.strapiToken 
		});	
	}
}
