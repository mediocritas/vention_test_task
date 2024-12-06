import { User } from '../users/user.interface'
import * as fs from 'fs';
import * as path from 'path';

export const deleteUser = {

    validate: (input: string) => {
        const commandPattern = /^(\S+)$/;
        const match = input.match(commandPattern);
        if (!match) {
            throw new Error('wrong input for command "delete"')
        }
    },

    execute: async (userId: string) => {
        const filePath = path.resolve('', 'users.json')
        let users: User[] = []
        try {
            if (fs.existsSync(filePath)) {
                const data = await fs.promises.readFile(filePath, 'utf-8');
                users = JSON.parse(data);
            }
            const userToDelete = users.findIndex(user => user.userId == userId)
            users.splice(userToDelete, 1);

            await fs.promises.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
        }
        catch (err) {
            console.error('add command error', err)
        }
    }
}