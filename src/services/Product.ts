import Strapi from './Strapi.ts';

export default class Product extends Strapi {

	private collectionName: string; 
	private productsCollection: any;

	private constructor() {
		super();
		this.collectionName = 'products';
	}
		
	static async init() : Promise<Product> {
		const instance = new Product();
		instance.productsCollection = await instance.strapiClient.collection(instance.collectionName);
		return instance;
	}

	async searchByName(productName: string, sortBy?: string) : Promise<Response> {
		const params = {};
		params.filters = { name: { $containsi: productName } };

		if (!sortBy || sortBy === 'price:asc') {
			params.sort = { price: 'asc' }; 
		}

		return this.productsCollection.find(params);
	}
	
	async searchByCategory(categoryName: string, sortBy?: string) : Promise<Response> {
		return this.productsCollection.find({
			populate: {
				category: {
					fields: 'name'
				}
			},
			filters: {
				category: {
					name: {
						$contains: categoryName
					} 
				}
			}
		});
	}

}

