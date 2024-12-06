import { Command } from './commands.enum';
import { addUser } from './commands/command-add'
import { updateUser } from './commands/command-update';
import { deleteUser } from './commands/command-delete';

export async function commandHandler(input: string): Promise<boolean> {
    const [command, ...arg] = input.trim().split(' ');
    const args = arg.join(' ')

    switch (command) {
        case Command.Add:
            try {
                const newUser = addUser.validate(args);
                await addUser.execute(newUser);
            } catch (err) {
                console.error(err)
            }
            console.log('User added successfully')
            break;
        case Command.Delete:
            try {
                deleteUser.validate(args)
                await deleteUser.execute(args)
            } catch (err) {
                console.error(err)
            }
            console.log('User deleted successfully')
            break;
        case Command.Update:
            try {
                const updtUser = updateUser.validate(args);
                await updateUser.execute(updtUser);
            } catch (err) {
                console.error(err)
            }
            console.log('User updated successfully')
            break;
        case Command.Quit:
            console.log('Exiting program');
            return true;
        default:
            console.log(`Unknown command: ${command}`);
    }

    return false;

};
