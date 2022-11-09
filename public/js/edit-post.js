const editBtn = document.getElementById('update-post')
const deleteBtn = document.getElementById('delete-post')

const id = editBtn.closest('.card').getAttribute('data-post-id')

editBtn.addEventListener('click', async() => {
    const description = document.querySelector('#post-content').value.trim();
    const name = document.querySelector("#post-name").value.trim()
    await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({description, name}),
        headers: { 'Content-Type': 'application/json' },
      });
    document.location.replace('/dashboard')
})
deleteBtn.addEventListener('click', async() => {
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
    if (response.ok) {
        console.log("what the fucxk")
        document.location.replace('/dashboard/')
    } else console.log("ohono")

})