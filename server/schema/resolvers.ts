import { Item } from './../models/Item';
//const prismaClient = require('@prisma/client');
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const resolvers = {
    Query: {
        getAllItems() {
            const allItems = prisma.item.findMany();
            return allItems;
        },
    },

    Mutation: {
         createItem(parent: any, args: any) {
            const newItem = args;
            // insert item into db
            return prisma.item.create({data: newItem});
        },
        createUser(parent: any, args: any) {
            const newUser = args;
            // insert user into db
            return prisma.user.create({data: newUser});
        }
    }
}
