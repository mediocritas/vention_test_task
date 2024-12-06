import { commandHandler } from './src/command-handler'

const main = async () => {

    let shouldContinue: boolean;

    do {
        console.log('Please enter a command:');
        const input = await new Promise<string>((resolve) => {
            process.stdin.once('data', (data) => resolve(data.toString()));
        });

        shouldContinue = !(await commandHandler(input));
    } while (shouldContinue);

    process.exit(0);
};

main().catch((err) => {
    console.error('An error occurred:', err);
    process.exit(1);
});