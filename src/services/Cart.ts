export default class Cart {

	private cart;

	constructor() {
		this.cart = [];
	}
	
	addProduct(product) {
		this.cart.push(product);	
	}

	getProducts() {
		return this.cart;
	}
	
	static removeProduct(product) {
		// 
	}
	
}
