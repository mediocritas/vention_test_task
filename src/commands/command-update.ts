import { User } from '../users/user.interface'
import * as fs from 'fs';
import * as path from 'path';

export const updateUser = {

    validate: (input: string): User => {
        const commandPattern = /^(\S+)\s+(\S+)\s+(\S+)$/;
        const match = input.match(commandPattern);
        if (match) {
            const [, userId, username, userpassword] = match
            const user: User = {
                userId: userId,
                username: username,
                userpassword: userpassword
            }
            return user
        } else {
            throw new Error('wrong input for command "update"')
        }
    },

    execute: async (user: User) => {
        const filePath = path.resolve('', 'users.json')
        let users: User[] = []
        try {
            if (fs.existsSync(filePath)) {
                const data = await fs.promises.readFile(filePath, 'utf-8');
                users = JSON.parse(data);
            } 
            const userToUpdate = users.findIndex(usr => user.userId == usr.userId)
            users.splice(userToUpdate, 1, user);

            await fs.promises.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
        }
        catch (err) {
            console.error('update command error', err)
        }
    }
}