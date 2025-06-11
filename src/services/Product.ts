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

	async getProducts(productName?: string, categoryName?: string, sorting?: string) : Promise<Response> {
		const params = {};
		params.filters = { name: { $containsi: productName } };
		params.fields = ['name', 'price'];
		params.sort = ['price:asc']; 
		params.populate = { 
			category: { fields: ['name'] },
			colors: { fields: ['hex'] }, 
			images: { fields: ['url'] },
			sizesAndStock:  { fields: ['*'] }
		};

		if (sorting === 'desc') {
			params.sort = ['price:desc']; 
		}
		
		if (categoryName) {
			params.filters = { category: { name: { $containsi: categoryName } } };
		}

		return this.productsCollection.find(params);
	}

	async getAllNames() {
		const products = await this.productsCollection.find();
		return products.data.map( p => p.name );
	}

}

