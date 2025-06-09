import { defineAction } from 'astro:actions';
import Product from '../services/Product.ts';

export const server = {
	
	getProducts: defineAction({
		handler: async (input, context) => {
			const productService = await Product.init();
			const products = await productService.getProducts(input.productName, input.categoryName, input.sorting);
			return products;
		}
	}),

	setSorting: defineAction({
		handler: async (input, context) => {
			await context.session.set('sorting', input);
		}
	}),
	
	getSorting: defineAction({
		handler: async (input, context) => {
			return context.session.get('sorting');
		}
	})

}
