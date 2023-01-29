const getFromApi = async (path, method, body = {}) => {
    let res = await fetch(path, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            
        },
        body: method === 'GET' ? null : JSON.stringify(body)
    })
    return await res.json()
}