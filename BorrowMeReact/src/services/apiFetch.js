export async function getImage(url) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'image/jpeg'
            }
        })
        const blob = await response.blob();
        return [URL.createObjectURL(blob), null];
    }
    catch (error) {
        console.error(`error occurred ${error}`);
        return [null, error]
    }
}