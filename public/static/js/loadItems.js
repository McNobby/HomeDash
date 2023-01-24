const loadItems = async ()=> {
    id = localStorage.getItem('dash');

    const items = await (await fetch(`/api/dash/${id}/items`)).json();
    window.items = items;
    items.forEach(item => {
        const itemTextWrap = document.createElement('div');
        const itemContainer = document.createElement('div');''
        const itemTitle = document.createElement('h3');
        const itemDescription = document.createElement('p');
        const imageEl = document.createElement('img')

        imageEl.src = item.image || ''
        

        itemTitle.innerHTML = item.title;
        itemDescription.innerHTML = item.description;

        item.image && itemContainer.appendChild(imageEl)
        
        itemTextWrap.appendChild(itemTitle);
        itemTextWrap.appendChild(itemDescription);
        itemContainer.appendChild(itemTextWrap)

        itemContainer.id = item._id;
        itemContainer.className = 'item glass';
        itemContainer.onclick = deleteOrOpenLink;

        document.querySelector('.items').appendChild(itemContainer);
    })
}
