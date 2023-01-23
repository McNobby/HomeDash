const loadItems = async ()=> {
    id = localStorage.getItem('dash');

    const items = await (await fetch(`/api/dash/${id}/items`)).json();
    window.items = items;
    items.forEach(item => {
        const itemContainer = document.createElement('div');
        const itemTitle = document.createElement('h3');
        const itemDescription = document.createElement('p');

        itemTitle.innerHTML = item.title;
        itemDescription.innerHTML = item.description;

        itemContainer.appendChild(itemTitle);
        itemContainer.appendChild(itemDescription);
        itemContainer.id = item._id;
        itemContainer.className = 'item glass';
        itemContainer.onclick = deleteOrOpenLink;

        document.querySelector('.items').appendChild(itemContainer);
    })
}
