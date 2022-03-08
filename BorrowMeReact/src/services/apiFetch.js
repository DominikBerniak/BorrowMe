export async function getData(url) {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        return await response.json();
    } else if (response.status === 400) {
        return await response.json()
    } else {
        return response.statusText
    }
}

export async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    if (response.ok) {
        return await response.json();
    } else {
        return response.statusText
    }
}

export async function postFormData(url, formData) {
    const response = await fetch(url, {
        method: 'POST',
        body: formData,
    })
    if (response.ok) {
        return await response.json();
    } else {
        return response.statusText
    }
}