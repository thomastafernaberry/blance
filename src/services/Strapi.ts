import { strapi } from '@strapi/client';

export default class Strapi {
	private strapiURL: string;
	private strapiToken: string;
	public strapiClient: any;
	
	constructor() {
		this.strapiURL = 'http://localhost:1337/api';
		this.strapiToken = '9dbef15e6c8c06dd0b7596cb18f47a36617f5077bd62bdfc2a9efb86a5e6b5bbf39906659e1232ad0d46559c1eddc2abfb1c6ce8c1453e0f48632f3faee38309d48af53a5c684a793d67c2ba00a18c03eaa80a415b7561c427fdf456bc31c1060d0f836862e1d528298fbaf3b0f4d6d6fa3a49f11a418d5a4c3bfb90f92a85c4';
		this.strapiClient = strapi({ 
			baseURL: this.strapiURL, 
			auth: this.strapiToken 
		});	
	}
}
