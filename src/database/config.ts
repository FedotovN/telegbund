
export async function connectToDatabase() {
    try {

        console.log('Connected to Database');
    } catch (e) {
        console.error();
        process.exit(1);
    }
}