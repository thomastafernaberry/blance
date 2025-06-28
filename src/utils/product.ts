import type { ProductData } from '../services/Product.ts';

export function getProductsColors(productData: ProductData): Array<string> {
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
