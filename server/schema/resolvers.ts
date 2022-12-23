import { PrismaClient } from "@prisma/client";
import { Item } from "../models/Item";

const prisma = new PrismaClient();
export const resolvers = {
    Query: {
        getAllItems() {
            const allItems = prisma.item.findMany();
            return allItems;
        },
    },

    // TODO implement error handling
    Mutation: {
        /***** ITEM Mutations *****/
         createItem(parent: any, args: any) {
            const newItem = args;
            // insert item into db
            return prisma.item.create({data: newItem});
        },

        async updateItem(parent: any, args: any) {
            console.log(args);
            let updatedItem = new Item(args.id, '', '', '', null);
            const id = parseInt(updatedItem.id);
            const item = await prisma.item.findUnique({
                where: {
                    id
                }
            }) as unknown as Item;
            for (const prop in item) {
                if (prop !== 'id') {
                    if(Object(args).hasOwnProperty(prop)) {
                        updatedItem[prop] = args[prop];
                    } else {
                        updatedItem[prop] = item[prop]
                    }
                }
                
            };
            const updated = await prisma.item.update({
                where: {
                    id: id
                },
                data: {
                    id: parseInt(updatedItem.id),
                    billName: updatedItem.billName,
                    amount: updatedItem.amount,
                    dueDate: updatedItem.dueDate,
                    hasAutoDraft: updatedItem.hasAutoDraft
                }
            });

            return updatedItem;
        },

        deleteItem(parent: any, args: any) {
           const id = parseInt(args.id);
            const deletedItem = prisma.item.delete({
                where: {
                    id
                }
            });
            prisma.$transaction([deletedItem]);
            return 'Successfully deleted!';
        },
        /***** USER Mutations *****/
        createUser(parent: any, args: any) {
            const newUser = args;
            // insert user into db
            return prisma.user.create({data: newUser});
        }
    }
}
