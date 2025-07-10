// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  vite: { plugins: [tailwindcss()], },
  adapter: node({
    mode: 'standalone',
  }),
  image: {
  	domains: ["strapi.blance.ar"],
		// Sharp is used by astro:assets <Image />
		// it does not support server's CPU model
		// it cant be used so we disable image optimization
		service: passthroughImageService(),
  },
  server: {
  	allowedHosts: ['blance.ar'],
  },
});
