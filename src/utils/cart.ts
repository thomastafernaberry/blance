import type { CartData } from '../actions/index';

export function getProductsCost(cartData: CartData): number {
	let productsCost = 0;
	for (const item of cartData) {
		productsCost += (item.unitPrice * item.quantity) ;
	}
	return productsCost;
}

export function getShippingCost(): number {
	return 2500;
}

