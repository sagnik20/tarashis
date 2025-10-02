document.getElementById('searchInput').addEventListener('keyup', function() {
    let filter = this.value.toUpperCase();
    let booksContainer = document.getElementById('booksContainer');
    let books = booksContainer.getElementsByClassName('single-book');

    // First, filter all books (including those in other-publisher-section)
    for (let i = 0; i < books.length; i++) {
        let img = books[i].getElementsByTagName('img')[0];
        let match = img && img.alt.toUpperCase().indexOf(filter) > -1;
        books[i].style.display = match ? "" : "none";
    }

    // Handle all ".other-publisher-section" elements
    let otherPublisherSections = document.querySelectorAll('.other-publisher-section');
    otherPublisherSections.forEach(function(section) {
        let sectionBooks = section.getElementsByClassName('single-book');
        let anyVisible = false;
        for (let i = 0; i < sectionBooks.length; i++) {
            if (sectionBooks[i].style.display !== "none") {
                anyVisible = true;
                break;
            }
        }
        section.style.display = anyVisible ? "" : "none";
    });
});