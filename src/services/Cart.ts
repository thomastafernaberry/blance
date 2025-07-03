import type { ProductData } from '../services/Product.ts';

export default class Cart {

	private cart: ProductData[];

	constructor() {
		this.cart = [];
	}
	
	addProductToCart(product: ProductData): void {
		this.cart.push(product);	
	}

	getCartProducts(): ProductData[] {
		return this.cart;
	}
	
	removeProduct(product: ProductData): boolean {
		if (product.name) {
			return true;
		} else {
			return false;
		}
	}

}
