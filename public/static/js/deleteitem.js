let deleteActive = false;

const activateDelete = () => {
    deleteActive = !deleteActive;

    document.querySelectorAll('.item').forEach(item => {
        item.classList.toggle('shake');
    })
}

const deleteOrOpenLink = async (element) => {
    let id = element.target.id
    if (deleteActive) {
        fetch('/api/dash/item/'+id, {method: 'DELETE', headers:getAuthHeader()}).then(() => window.location.reload());
    }else{
        let link = window.items.filter(item => item._id == id)[0].link;
        window.top.location.href = link 
    }
}