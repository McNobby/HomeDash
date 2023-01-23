let deleteActive = false;

const activateDelete = () => {
    deleteActive = !deleteActive;

    document.querySelectorAll('.miniDash').forEach(item => {
        item.classList.toggle('shake');
    })
}

const deleteOrOpenLink = async (element) => {
    let id = element.target.id
    if (deleteActive) {
        fetch('/api/dash/'+id, {method: 'DELETE'}).then(() => window.location.reload());
    }else{
        localStorage.setItem('dash', id);
        window.location.href = '/';
    }
}