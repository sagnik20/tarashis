// List of generic search terms
const genericTerms = ['books', 'spiritual', 'tarashis', 'author', 'bengali', 'literature', 'collection', 'publications', 'writings', 'stories', 'novel'];

// Function to check if search query is generic
function isGenericSearch(query) {
    const lowerQuery = query.toLowerCase().trim();
    return genericTerms.some(term => lowerQuery === term || lowerQuery.includes(term + ' '));
}

// Function to extract specific (non-generic) terms from search query
function getSpecificTerms(query) {
    const words = query.toLowerCase().trim().split(/\s+/).filter(word => word.length > 0);
    const specificTerms = words.filter(word => !genericTerms.includes(word));
    return specificTerms;
}

// Function to perform book filtering
function filterBooks(searchQuery, isGeneric) {
    let booksContainer = document.getElementById('booksContainer');
    let books = booksContainer.getElementsByClassName('single-book');
    let matchCount = 0;

    // If generic search, show all books
    if (isGeneric) {
        for (let i = 0; i < books.length; i++) {
            books[i].style.display = "";
            matchCount++;
        }
    } else {
        // Get specific terms from search query
        const specificTerms = getSpecificTerms(searchQuery);
        
        // If no specific terms found, treat as generic and show all books
        if (specificTerms.length === 0) {
            for (let i = 0; i < books.length; i++) {
                books[i].style.display = "";
                matchCount++;
            }
        } else {
            // Filter books: show if ANY specific term matches (OR logic)
            for (let i = 0; i < books.length; i++) {
                let img = books[i].getElementsByTagName('img')[0];
                let altText = img ? img.alt.toUpperCase() : "";
                
                // Check if any specific term matches
                let match = specificTerms.some(term => altText.indexOf(term.toUpperCase()) > -1);
                
                books[i].style.display = match ? "" : "none";
                if (match) matchCount++;
            }
        }
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

    return matchCount;
}

// Function to show/hide banners
function updateBanners(searchQuery, matchCount, isGeneric) {
    let noMatchBanner = document.getElementById('noMatchBanner');
    let genericSearchBanner = document.getElementById('genericSearchBanner');

    // Hide both banners initially
    if (noMatchBanner) noMatchBanner.style.display = 'none';
    if (genericSearchBanner) genericSearchBanner.style.display = 'none';

    // Show appropriate banner based on search
    if (searchQuery.trim() === '') {
        // No search, hide all banners
        return;
    }

    // If at least one book matches, don't show any banner
    if (matchCount > 0) {
        return;
    }

    // If no matches found, show generic banner
    if (genericSearchBanner) {
        genericSearchBanner.style.display = 'block';
    }
}

// Event listener for search input
document.getElementById('searchInput').addEventListener('keyup', function() {
    let searchQuery = this.value;
    let isGeneric = isGenericSearch(searchQuery);
    let matchCount = filterBooks(searchQuery, isGeneric);
    updateBanners(searchQuery, matchCount, isGeneric);
});

// On page load, check for URL parameter ?q=
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookQuery = urlParams.get('q');

    if (bookQuery) {
        const searchInput = document.getElementById('searchInput');
        searchInput.value = decodeURIComponent(bookQuery);
        
        // Check if it's a generic search
        let isGeneric = isGenericSearch(searchInput.value);
        
        // Trigger the filter
        const matchCount = filterBooks(searchInput.value, isGeneric);
        updateBanners(searchInput.value, matchCount, isGeneric);
        
        // Scroll to search bar
        searchInput.focus();
    }
});