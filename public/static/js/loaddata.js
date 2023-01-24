const applyData = async () => {

    if(!localStorage.getItem('token') && window.location.pathname !== '/login.html') {

        return window.location.href = '/login.html';
    }

    let data = null;

    if (localStorage.getItem('dash')) {
        data = await (await fetch(`/api/dash/${localStorage.getItem('dash')}`, {headers: getAuthHeader()})).json()
        .catch(err => {
            console.log(err);
            localStorage.removeItem('dash');
            return;
        })
    }
    else {
        return;
    }

    
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    
    if(data.image) {
        document.body.style.backgroundImage = `url(${data.image})`;
    }

    if(!title || !description) return;

    title.innerHTML = data.title;
    description.innerHTML = data.description;
    
    if(loadItems) loadItems();
}

const getAuthHeader = () => {
    return { 'Authorization': `Bearer ${localStorage.getItem('token')}`}
}



applyData()

