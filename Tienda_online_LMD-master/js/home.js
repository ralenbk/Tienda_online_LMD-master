document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const caption = document.getElementById('caption');
    const closeBtn = document.querySelector('.close');

    document.querySelectorAll('.product-image').forEach(image => {
        image.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImg.src = image.src;
            caption.textContent = image.alt;
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', event => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
