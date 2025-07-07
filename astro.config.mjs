// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  vite: { plugins: [tailwindcss()], },
	prefetch: {
		defaultStrategy: 'viewport',
		prefetchAll: true,
	},
  adapter: node({
    mode: 'standalone'
  }),
  image: {
  	domains: ["strapi-production-1baa.up.railway.app"],
  },
  server: {
  	allowedHosts: ['blance.ar'],
  },
});
