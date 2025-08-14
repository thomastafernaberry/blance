import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import Product from '../services/Product';

export type CartProductData = {
	documentId: string;
	name: string;
	size: string;
	unitPrice: number;
	quantity: number;
	firstImageSrc: string;
}

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
				input.documentIdArray,
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

	getCart: defineAction({
		handler: async (_input, context) => {
			return context?.session?.get('cart');
		}
	}),

	addCartProduct: defineAction({
		accept: 'form',
		input: z.object({
			documentId: z.string(),
			name: z.string(),
			size: z.string(),
			unitPrice: z.number(),
			firstImageSrc: z.string(),
		}),
		handler: async ({documentId, name, size, unitPrice, quantity, firstImageSrc}, context) => {
			const cart = await context.session?.get('cart') || [];

			try {
				for (const cartProduct of cart) {
					if (cartProduct?.documentId === documentId && cartProduct?.size == size.toUpperCase()) {
						cartProduct.quantity++;	
						cartProduct.size = cartProduct.size.toUpperCase();
						context.session?.set('cart', cart);
						return;
					}
				}
			} catch (e) {
				console.error(e);
			}

			const product: CartProductData = {
				documentId: documentId,
				name: name,
				size: size.toUpperCase(),
				unitPrice: unitPrice,
				quantity: 1,
				firstImageSrc: firstImageSrc,
			}
			cart.push(product);	
			context.session?.set('cart', cart);
		}
	}),

	removeCartProduct: defineAction({
		handler: async (input, context) => {
			const cart = await context.session?.get('cart');
			if (typeof cart === 'undefined') {
				console.log('cart is undefined. nothing to do');
				return;
			}
			const productCartIndex = cart.indexOf(product.documentId);
			cart.splice(productCartIndex, 1);
			console.log(`product ${product.documentId} removed`);
		}
	}),

	reduceCartProductQuantity: defineAction({
		input: z.object({
			documentId: z.string(),
			size: z.string(),
		}),
		handler: async (input, context) => {
			console.log(input);
			const cart = await context.session?.get('cart');
			try {
				for (const item of cart) {
					if (item.documentId === input.documentId && item.size === input.size) {
						if (item.quantity === 1) {
							cart.splice(cart.indexOf(item), 1);
						} 
						else {
							item.quantity--;
						}
					}
				}
			} catch (e) {
				console.error(e)
			}
			await context.session?.set('cart', cart);
		}
	}),

	increaseCartProductQuantity: defineAction({
		input: z.object({
			documentId: z.string(),
			size: z.string(),
		}),
		handler: async (input, context) => {
			console.log('hi');
			const cart = await context.session?.get('cart');
			try {
				for (const item of cart) {
					if (item.documentId === input.documentId && item.size === input.size) {
							item.quantity++;
					}
				}
			} catch (e) {
				console.error(e)
			}
			await context.session?.set('cart', cart);
		}
	}),

}

