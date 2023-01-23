const applyData = async () => {

    let data = null;

    if (localStorage.getItem('dash')) {
        data = await (await fetch(`/api/dash/${localStorage.getItem('dash')}`)).json()
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
applyData()