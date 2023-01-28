const loadAll = async ()=> {
    const dashdoardEl = document.querySelector('.items');

    const items = await (await fetch(`/api/dash/`, {
        headers: getAuthHeader()
    })).json();
    
    window.dashes = items;
    console.log(items.dashboards);

    items.dashboards.forEach(item => {
        const itemContainer = document.createElement('div');
        const itemTitle = document.createElement('h3');
        const itemDescription = document.createElement('p');

        itemTitle.innerHTML = item.title;
        itemDescription.innerHTML = item.description;

        itemContainer.appendChild(itemTitle);
        itemContainer.appendChild(itemDescription);

        if(item.image) itemContainer.style.backgroundImage = `url(${item.image})`;
        
        itemContainer.id = item._id;
        itemContainer.className = 'miniDash glass';
        itemContainer.onclick = deleteOrOpenLink

        dashdoardEl.appendChild(itemContainer);
    })

}
loadAll();


const openDash = ({target}) => {
    const id = target.id;
    localStorage.setItem('dash', id);
    window.location.href = '/';
} 