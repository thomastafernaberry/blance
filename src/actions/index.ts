import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {

  setSortingCookie: defineAction({
    sorting: z.string()
  }),

  handler: async (sorting) => {
    Astro.cookies.set('sorting', sorting)
  }

}

