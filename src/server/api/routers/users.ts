import { Role } from "@prisma/client";
import { z } from "zod";
import { configurationValidationSchema } from "../../../pages/configure";
import { addEmployeeValidationSchema } from "../../../pages/employees/add";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({

  isApproved: publicProcedure
  .input(z.object({ id: z.string() }))
  .query( async ({ ctx, input })  => {
    return await ctx.prisma.user.findUnique({
      where: {
        id: input.id
      }
    })
  }),

  configRequired: publicProcedure.query( async ({ ctx })  => {
    return await ctx.prisma.user.count() === 0;
  }),

  createSuperUser: publicProcedure
    .input(configurationValidationSchema)
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
    }),

    createUser: protectedProcedure
        .input(addEmployeeValidationSchema)
        .mutation(async ({ ctx, input }) => {
          if (ctx.session.user.role === Role.USER) throw new Error('You do not have permission to do this')
            const user = await ctx.prisma.user.create({
                data: {
                  name: input.name,
                  email: input.email,
                  role: input.role,
                  verified: true,
                },
            });
            return user;
        }),

    getUsers: protectedProcedure
        .query(async ({ ctx }) => {
            return await ctx.prisma.user.findMany();
        }),
});
