import Strapi from './Strapi.ts';

export default class Category extends Strapi {

	private collectionName: string;
	private categoryCollection: any;
	
	private constructor() {
		super();
		this.collectionName = 'categories';
	}
	
	static async init() : Promise<Category> {
		const instance = new Category();
		instance.categoryCollection = await instance.strapiClient.collection(instance.collectionName);
		return instance;
	}

	async getAllNames() : Promise<string[]> {
		const collection = await this.categoryCollection.find();
		return collection.data.map(c => c.name);
	}

}
