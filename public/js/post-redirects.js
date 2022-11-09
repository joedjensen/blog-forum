const cards = document.querySelectorAll('.post-card')

cards.forEach(card => {
    card.addEventListener('click', async (e) => {
      const id = e.target.closest('.post-card').getAttribute('data-project-id')
      document.location = `/posts/${id}`;
  }
    )
}
)
