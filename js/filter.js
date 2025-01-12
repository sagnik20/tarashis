document.getElementById('searchInput').addEventListener('keyup', function() {
    let filter = this.value.toUpperCase();
    let booksContainer = document.getElementById('booksContainer');
    let books = booksContainer.getElementsByClassName('single-book');

    for (let i = 0; i < books.length; i++) {
        let img = books[i].getElementsByTagName('img')[0];
        if (img.alt.toUpperCase().indexOf(filter) > -1) {
            books[i].style.display = "";
        } else {
            books[i].style.display = "none";
        }
    }
});