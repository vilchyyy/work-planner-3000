import { z } from "zod";
import { configurationValidationSchema } from "../../../pages/configure";
import { addEmployeeValidationSchema } from "../../../pages/employees/add";
import { editEmployeeSchema } from "../../../pages/employees/edit/[id]";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  editUser: protectedProcedure
    .input(editEmployeeSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.permissions || (ctx.session.user.permissions <= input.permissions))
        throw new Error("You do not have permission to do this");
      let perms = 0;
      if (input.role === "USER") perms = 1;
      if (input.role === "ADMIN") perms = 2;
      return await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          email: input.email,
          role: input.role,
          permissions: perms,
        },
      });
    }),

    deleteUser: protectedProcedure.
    input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        }
      })
      if (!user) throw new Error("User not found")
      if (ctx.session.user.permissions <= user.permissions)
        throw new Error("You do not have permission to do this"); 
      return await ctx.prisma.user.delete({
        where: {
          id: input.id,
        },
      });
    }),

  configRequired: publicProcedure.query(async ({ ctx }) => {
    return (await ctx.prisma.user.count()) === 0;
  }),

  createSuperUser: publicProcedure
    .input(configurationValidationSchema)
    .mutation(async ({ ctx, input }) => {
      if ((await ctx.prisma.user.count()) === 0) {
        const user = await ctx.prisma.user.create({
          data: {
            name: input.name,
            email: input.email,
            role: "SUPER",
            permissions: 3,
            verified: true,
          },
        });
        return user;
      } else {
        throw new Error("There is already a super user");
      }
    }),

  createUser: protectedProcedure
    .input(addEmployeeValidationSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.permissions < 2)
        throw new Error("You do not have permission to do this");
      let perms = 0;
      if (input.role === "USER") perms = 1;
      if (input.role === "ADMIN") perms = 2;
      if (input.role === "SUPER") perms = 3;
      const user = await ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          role: input.role,
          permissions: perms,
          verified: true,
        },
      });
      return user;
    }),

  getUsers: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany();
  }),

  getUser: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
