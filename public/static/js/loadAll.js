const loadItems = async ()=> {
    const dashdoardEl = document.querySelector('.items');

    const items = await (await fetch(`/api/dash/all`)).json();
    
    window.items = items;

    items.forEach(item => {
        const itemContainer = document.createElement('div');
        const itemTitle = document.createElement('h3');
        const itemDescription = document.createElement('p');

        itemTitle.innerHTML = item.title;
        itemDescription.innerHTML = item.description;

        itemContainer.appendChild(itemTitle);
        itemContainer.appendChild(itemDescription);

        if(item.image) itemContainer.style.backgroundImage = `url(${item.image})`;
        
        itemContainer.id = item.id;
        itemContainer.className = 'miniDash glass';
        itemContainer.onclick = openDash

        dashdoardEl.appendChild(itemContainer);
    })

}
loadItems();


const openDash = ({target}) => {
    const id = target.id;
    localStorage.setItem('dash', id);
    window.location.href = '/';
}