import { defineAction } from 'astro:actions';

export const server = {

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
