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
            let updatedItem: Item = {
                id: '',
                billName: '',
                dueDate: '',
                hasAutoDraft: null,
                amount: '',
            }
            updatedItem.id = args.id;
            const id = parseInt(args.id);
            const item = await prisma.item.findUnique({
                where: {
                    id
                }
            });
            console.log(item);
            for(const prop in args) {
                if(Object(item).hasOwnProperty(prop)) {
                    if(prop !== 'id') {
                        console.log('contains ' + prop);
                        updatedItem[prop] = args[prop];
                        console.log(item[prop]);
                    }
                    
                } else {
                    updatedItem[prop] = item[prop];
                }
            };
            console.log('updatedItem', updatedItem);
            // const id = parseInt(args.id);
            // const updatedItem = prisma.item.update({
            //     where: {
            //         id
            //     },
            //     data: {

            //     }
            // });
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
