export const getAuthUser = async() => {
    const response = await fetch("/authentication/user",{
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    });
    return await response.json();
}