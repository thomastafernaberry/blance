// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  vite: { plugins: [tailwindcss()], },
  adapter: node({
    mode: 'standalone',
  }),
	output: 'server',
  image: {
  	domains: ["strapi.blance.ar"],
		// astro:assets <Image /> use Sharp
		// Sharp does not support server's CPU model
		// line below disable image optimization
		service: passthroughImageService(),
  },
  server: {
  	allowedHosts: ['blance.ar'],
  },
});
