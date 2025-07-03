import Strapi from './Strapi.ts';

export type StockBySize = {
	readonly id: number;
	readonly name: string;
	stock: number;
}

export type Image = {
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
	readonly images: ReadonlyArray<Image>;
	readonly stockBySize: ReadonlyArray<StockBySize>;
	readonly productGroup: ReadonlyArray<ProductGroup>;
}

export type StrapiResponse = {
	readonly data: ProductData[];
	readonly meta: any;
	readonly error?: any;
}

export default class Product extends Strapi {

	private readonly collectionName: string; 
	private readonly productsCollection: any;
	private readonly productFields: Array<string>;
	private readonly productPopulate: Array<any>;

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

	async getProducts(productName?: string, productSlug?: string, categoryName?: string, sorting?: string, featured?: boolean) : Promise<StrapiResponse> {
		const params = {
			fields: this.productFields,
			filters: this.productFilters,
			populate: this.productPopulate,
		};
		// TODO: look for and implement a more accurate filter to get a single matching result for slug. maybe findOne()?
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
		} else {
			params.sort = ['price:asc']; 
		}

		return this.productsCollection.find(params);
	}

	async getRelatedProductsColors(documentId: string): string[] {
		const params = {
			fields: this.productFields,
			populate: this.productPopulate,
		};
		const productData = (await this.productsCollection.findOne(documentId, params)).data;
		const relatedProducts = productData.productsGroup.products;
		const relatedColorsHex = [];
		relatedProducts.forEach( product => {
			relatedColorsHex.push(product.color.hex);
		});

		return relatedColorsHex;
	}

	async getAllNames(): string[] {
		const products = await this.productsCollection.find();
		return products.data.map( p => p.name );
	}
	
	async getAllSlugs(): string[] {
		const products = await this.productsCollection.find();
		return products.data.map( p => p.slug );
	}

}

