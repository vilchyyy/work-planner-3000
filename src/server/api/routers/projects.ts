import { z } from "zod";
import { addProjectSchema } from "../../../pages/projects/add";
import { editProjectSchema } from "../../../pages/projects/edit/[id]";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const projectsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany();
  }),

  getOne: protectedProcedure.input(z.object({ id: z.string().cuid() })).query(({ ctx, input }) => {
    return ctx.prisma.project.findUnique({
      where: {
        id: input.id,
      },
      include: {
        members: true,
      }
    });
  }),
  editOne: protectedProcedure
  .input(editProjectSchema)
  .mutation(({ ctx, input }) => {
    if (ctx.session.user.permissions <= 1) 
      throw new Error("You don't have permission to do this");
    console.log(input);
    return ctx.prisma.project.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        start: input.start,
        end: input.end,
        members: {
          set: input.members && input.members.map((member) => ({ email: member })),
        }
      }
    });
  }),

  addOne: protectedProcedure
  .input(addProjectSchema)
  .mutation(({ ctx, input }) => {
    if (ctx.session.user.permissions <= 1) 
      throw new Error("You don't have permission to do this");
    return ctx.prisma.project.create({
      data: {
        name: input.name,
        start: input.start,
        end: input.end,
        members: {
          connect: input.members && input.members.map((member) => ({ email: member })),
        }
      },
    });
  }),
  deleteOne: protectedProcedure
  .input(z.object({ id: z.string().cuid() }))
  .mutation(({ ctx, input }) => {
    if (ctx.session.user.permissions <= 1) 
      throw new Error("You don't have permission to do this");
    return ctx.prisma.project.delete({
      where: {
        id: input.id,
      },
    });
  }),
});
