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

export type CartData = {
	cartData: CartProductData[];
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
			const amountItemsInCart = await context.session?.get('amount-items-in-cart') || 0;

			try {
				for (const cartProduct of cart) {
					if (cartProduct?.documentId === documentId && cartProduct?.size == size.toUpperCase()) {
						cartProduct.quantity++;	
						cartProduct.size = cartProduct.size.toUpperCase();
						await context.session?.set('cart', cart);
						await context.session?.set('amount-items-in-cart', amountItemsInCart + 1);
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
			await context.session?.set('cart', cart);
			await context.session?.set('amount-items-in-cart', amountItemsInCart + 1);
		}
	}),

	reduceCartProductQuantity: defineAction({
		input: z.object({
			documentId: z.string(),
			size: z.string(),
		}),
		handler: async (input, context): boolean => {
			const cart = await context.session?.get('cart');
			const amountItemsInCart = await context.session?.get('amount-items-in-cart') || 0;
			let isProductRemovedFromCart = false;
			try {
				for (const item of cart) {
					if (item.documentId === input.documentId && item.size === input.size) {
						if (item.quantity === 1) {
							cart.splice(cart.indexOf(item), 1);
							isProductRemovedFromCart = true;
						} 
						else {
							item.quantity--;
						}
					}
				}
			} catch (e) {
				console.error(e);
			}
			await context.session?.set('cart', cart);
			await context.session?.set('amount-items-in-cart', amountItemsInCart - 1);
			return isProductRemovedFromCart;
		}
	}),

	increaseCartProductQuantity: defineAction({
		input: z.object({
			documentId: z.string(),
			size: z.string(),
		}),
		handler: async (input, context): void => {
			const cart = await context.session?.get('cart');
			const amountItemsInCart = await context.session?.get('amount-items-in-cart') || 0;
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
			await context.session?.set('amount-items-in-cart', amountItemsInCart + 1);
		}
	}),

	getAmountItemsInCart: defineAction({
		handler: async (_input, context) => {
			return context.session?.get('amount-items-in-cart') || 0;
		}
	}),

}

