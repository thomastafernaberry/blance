import { strapi } from '@strapi/client';

export default class Strapi {
	private strapiURL: string;
	private strapiToken: string;
	public strapiClient: any;
	
	constructor() {
		this.strapiURL = 'http://localhost:1337/api';
		this.strapiToken = '4a7ca82b935813a2e9c02c8764327477935ff9b8ea8098d456c6940382c6f62005e93b6b33e210822685e6ceab80e62806fbcce338f0d5f9a3d6a74d5aea21bbae46bc27663785d76406ffc56398407f38fa5c118271b8575154b518632277ab719bd4e57ea420ce4cfc776ea1de2d8e4038c848cf98f47b6dbd4464b73865ae';
		this.strapiClient = strapi({ 
			baseURL: this.strapiURL, 
			auth: this.strapiToken 
		});	
	}
}
