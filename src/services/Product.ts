import type { StrapiResponse } from './Strapi';
import Strapi from './Strapi';

export type StockBySize = {
	readonly id: number;
	readonly name: string;
	stock: number;
}

export type ProductImage = {
	readonly documentId: string;
	readonly url: string;
}

type Category = {
	readonly documentId: string;
	readonly name: string;
}

type Color = {
	readonly documentId: string;
	readonly hex: string;
}

type ProductGroup = {
	readonly documentId: string;
	readonly name: string;
	readonly products: ReadonlyArray<ProductData>;
}

export type ProductData = {
	readonly kind: "product";
	readonly documentId: string;
	readonly slug: string;
	readonly name: string;
	readonly price: number;
	readonly description: string;
	readonly composition: string;
	readonly isPopular: boolean;
	readonly isVisible: boolean;
	readonly isNew: boolean;
	readonly category: Category;
	readonly color: Color;
	readonly images: ReadonlyArray<ProductImage>;
	readonly stockBySize: ReadonlyArray<StockBySize>;
	readonly productsGroup: ProductGroup;
}

type ProductFilters = {
	name?: any;
	slug?: any;
	category?: any;
	$or?: any[];
	isVisible?: any;
}

type ProductPopulate = {
	images?: any;
	category?: any;
	color?: any;
	stockBySize?: any;
	productsGroup?: any;
}

export default class Product extends Strapi {

	private readonly collectionName: string; 
	private readonly productFields: string[];
	private readonly productFilters: ProductFilters;
	private readonly productPopulate: ProductPopulate;
	private productsCollection: any;

	private constructor() {
		super();
		this.collectionName = 'products';
		this.productFields = ['name', 'price', 'description', 'composition', 'slug', 'isVisible', 'isNew', 'isPopular'];
		this.productFilters = { isVisible: { $eq: true } };
		this.productPopulate = {
			images: { 
				fields: 'url',
			},
			category: { 
				fields: 'name',
			},
			color: { 
				fields: 'hex',
			},
			stockBySize: { 
				fields: ['name', 'stock'],
			},
			productsGroup: { 
				populate: { 
					products: {
						fields: ['documentId', 'slug'],
						populate: {
							color: {
								fields: 'hex',
							}
						}
					}
				}
			},
		};
	}
		
	static async init() : Promise<Product> {
		const instance = new Product();
		instance.productsCollection = await instance.strapiClient.collection(instance.collectionName);
		return instance;
	}

	async getProducts(productName?: string, productSlug?: string, categoryName?: string, sorting?: string, featured?: boolean, page?: number): Promise<StrapiResponse> {
		const params = {
			pagination: {
				pageSize: 6,
			},
			fields: this.productFields,
			filters: this.productFilters,
			populate: this.productPopulate,
			sort: ['price:asc'],
		};

		// TODO: implement a more accurate filter to get a single matching result for slug. maybe findOne()?
		if (productName) {
			params.filters.name = { $containsi: productName };
		} else if (productSlug) {
			params.filters.slug = { $containsi: productSlug };
		} else if (categoryName) {
			params.filters.category = { name: { $containsi: categoryName } };
		} else if (featured) {
			params.filters.$or = [ { isPopular: { $eq: true } }, { isNew: { $eq: true } } ];
		}

		if (sorting === 'desc') {
			params.sort = ['price:desc'];
		}

		if (page) {
			// TODO: implement pagination
		}

		return this.productsCollection.find(params);
	}

}

