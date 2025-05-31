import Strapi from './Strapi.ts';

interface Response {
	data: any;
	meta: object;
	error: object;
}

export default class Product extends Strapi {

	private strapiCollectionName: string; 
	private strapiCollection: any;

	constructor() {
		super();
		this.strapiCollectionName = 'products';
		this.strapiCollection = this.strapiClient.collection(this.strapiCollectionName);
	}

	async searchByName(name: string) : Promise<Response> {
		return this.strapiCollection.find({
			filters: {
				name: {
					$containsi: name
				}
			}
		});
	}
	
	async searchByCategory(category: string) : Promise<Response> {
		return this.strapiCollection.find({
			filters: {
				category: {
					$containsi: category
				}
			}
		});
	}

}

