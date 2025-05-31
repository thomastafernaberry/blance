import { strapi } from '@strapi/client';

export default class Strapi {
	private strapiURL: string;
	private strapiToken: string;
	public strapiClient: any;
	
	constructor() {
		this.strapiURL = 'http://localhost:1337/api';
		this.strapiToken = '6031cbfee033dd02a388254bd028e2cd2af74f2924bf60a4a142822b4357c95e1323d6a105a1220a09a191855b4316f84def1fda7430b37e0add2e04885489834b8b592094f5cf9d304363367b03db4882c64da5907aa5f4c3914e3c29b537c9ba1905b77409732a3bdc08bb7879268df87e82d819c8ef3ad95fa0d1778f15a9';
		this.strapiClient = strapi({ 
			baseURL: this.strapiURL, 
			auth: this.strapiToken 
		});	
	}
}
