const applyData = async () => {

    let data = null;

    if (localStorage.getItem('dash')) {
        data = await (await fetch(`/api/dash/${localStorage.getItem('dash')}`)).json();
    
    }
    else {
        let humanName = prompt('Please the key for your dashboard');
        data = await (await fetch('/api/dash/humanName/'+humanName)).json();
        localStorage.setItem('dash', data.id)
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