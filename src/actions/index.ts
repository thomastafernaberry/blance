import { defineAction } from 'astro:actions';
import Product from '../services/Product.ts';

export const server = {
	
	getProducts: defineAction({
		handler: async (input) => {
			const productService = await Product.init();
			return productService.getProducts(
				input.productName, 
				input.productSlug, 
				input.categoryName, 
				input.sorting, 
				input.featured,
				input.page,
			);
		}
	}),

	setSorting: defineAction({
		handler: async (input, context) => {
			context?.session?.set('sorting', input);
		}
	}),
	
	getSorting: defineAction({
		handler: async (_input, context) => {
			return context?.session?.get('sorting');
		}
	}),

}
