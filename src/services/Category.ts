import type { StrapiResponse } from './Strapi.ts';
import type { ProductData } from './Product.ts';
import Strapi from './Strapi.ts';

export type CategoryData = {
	readonly kind: "category";
	readonly documentId: string;
	readonly name: string;
	readonly products: ProductData[];
}

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
		const strapiResponse = await this.categoryCollection.find() as StrapiResponse;
		const categoryData = strapiResponse.data as CategoryData[];
		return categoryData.map((c) => c.name);
	}

}
