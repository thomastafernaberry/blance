import { ProductServiceParams } from '../../services/Product';
import Product from '../../services/Product';
import ProductCard from '../../components/ProductCard.astro';

export async function GET({params, request}): Response {
	const searchParams = new URL(request.url).searchParams;
	const productServiceParams = {
		productName: searchParams.get('name'),
		productSlug: searchParams.get('slug'),
		categoryName: searchParams.get('category'),
		sorting: await params.session?.get('sorting'),
		featured: searchParams.get('featured'),
		start: searchParams.get('start'),
		end: searchParams.get('end'),
	} as ProductServiceParams;

	const productService = await Product.init();
	const products = await productService.getProducts(productServiceParams);
	const productElements = [];
	for (const productData of products.data) {
		productElements.push(`<ProductCard productData=${productData} />`);
	}

	return new Response(productElements[0]);
}
