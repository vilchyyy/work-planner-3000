import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({

  configRequired: publicProcedure.query( async ({ ctx })  => {
    return await ctx.prisma.user.count() === 0;
  }),

  createSuperUser: publicProcedure
    .input(z.object({ 
        name: z.string(),
        email: z.string(),}))
    .mutation(async ({ ctx, input }) => {
      if (await ctx.prisma.user.count() === 0) {
        const user = await ctx.prisma.user.create({
            data: {
            name: input.name,
            email: input.email,
            role: 'SUPER',
            verified: true,
            },
        });
        return user;
      } else {
        throw new Error('There is already a super user');
      }
    })

});