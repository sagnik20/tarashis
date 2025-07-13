document.getElementById('searchInput').addEventListener('keyup', function() {
    let filter = this.value.toUpperCase();
    let booksContainer = document.getElementById('booksContainer');
    let books = booksContainer.getElementsByClassName('single-book');

    // Handle "other publisher" section
    let otherPublisherSection = document.querySelector('.other-publisher-section');
    let otherPublisherBooks = otherPublisherSection
        ? otherPublisherSection.getElementsByClassName('single-book')
        : [];

    // Track if any "other publisher" book matches
    let anyOtherPublisherVisible = false;

    // First, filter all books
    for (let i = 0; i < books.length; i++) {
        let img = books[i].getElementsByTagName('img')[0];
        let match = img && img.alt.toUpperCase().indexOf(filter) > -1;
        books[i].style.display = match ? "" : "none";
    }

    // Then, specifically check "other publisher" books
    for (let i = 0; i < otherPublisherBooks.length; i++) {
        if (otherPublisherBooks[i].style.display !== "none") {
            anyOtherPublisherVisible = true;
            break;
        }
    }

    // Show/hide the section based on matches
    if (otherPublisherSection) {
        otherPublisherSection.style.display = anyOtherPublisherVisible ? "" : "none";
    }
});