import type { ProductData } from '../services/Product';
import type { StrapiResponse } from '../services/Strapi';


type ProductColors = {
	readonly productSlugs: readonly string[];
	readonly availableColors: readonly string[];
}

export function getProductColors(productData: ProductData): ProductColors {
	const relatedProducts = productData?.productsGroup?.products;
	const productSlugs = [];
	const availableColors = [];
	try {
		for (const product of relatedProducts) {
			const slug = product.slug;
			const hex = product.color.hex;
			productSlugs.push(slug);
			availableColors.push(hex);
		}
	} catch (e) {
		console.error(e);
	}
	
	return { productSlugs, availableColors };
}

export function getProductSizes(productData: ProductData): Array<string> {
	const availableSizes = [];
	try {
		for (const size of productData.stockBySize) {
			if (size.stock > 0) {
				availableSizes.push(size.name);
			}
		}
	} catch (e) {
		console.error(e);
	}

	return availableSizes;
}

export function getFeaturedProducts(strapiResponse: StrapiResponse) {
	const products = strapiResponse.data as ProductData[];
	const popularProducts = [] as ProductData[];
	const newProducts = [] as ProductData[];

	try {
		products?.forEach((p: ProductData) => {
			p.isPopular ? popularProducts.push(p) : newProducts.push(p);
		});
	} catch (e) {
		console.error(e);
	}

	return { popularProducts, newProducts };
}

