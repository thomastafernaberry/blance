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

	async searchByName(productName: string, sorting?: string) : Promise<Response> {
		const params = {};
		params.filters = { name: { $containsi: productName } };

		if (sorting === 'desc') {
			params.sort = { price: 'desc' }; 
		} else {
			params.sort = { price: 'asc' }; 
		}

		return this.productsCollection.find(params);
	}
	
	async searchByCategory(categoryName: string, sorting?: string) : Promise<Response> {
		const params = {};
		params.populate = { category: { fields: 'name' } };
		params.filters = { category: { name: { $containsi: categoryName } } };

		if (sorting === 'desc') {
			params.sort = { price: 'desc' }; 
		} else {
			params.sort = { price: 'asc' }; 
		}

		return this.productsCollection.find(params);
	}

	async getAllNames() {
		const products = await this.productsCollection.find();
		return products.data.map( p => p.name );
	}

}

