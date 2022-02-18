export async function getData(url)
{
    const response = await fetch(url);
    if (response.ok)
    {
        return await response.json();
    }
    else
    {
        return response.statusText
    }
}