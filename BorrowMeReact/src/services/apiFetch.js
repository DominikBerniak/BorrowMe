export async function getData(url)
{
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok)
    {
        return await response.json();
    }
    else if (response.status === 400)
    {
        return await response.json()
    }
    else
    {
        return response.statusText
    }
}