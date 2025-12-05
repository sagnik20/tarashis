// Generate JSON-LD schema for individual books
document.addEventListener('DOMContentLoaded', function() {
    const booksContainer = document.getElementById('booksContainer');
    const books = booksContainer.getElementsByClassName('single-book');
    const booksSchema = [];

    for (let i = 0; i < books.length; i++) {
        const book = books[i];
        const img = book.getElementsByTagName('img')[0];
        const titleElement = book.getElementsByClassName('single-book__title')[0];
        const priceElement = book.getElementsByClassName('single-book__price')[0];
        const buyButtons = book.getElementsByClassName('brand-button-books');

        if (img && titleElement && priceElement) {
            const altText = img.alt || '';
            const title = titleElement.textContent.trim().replace(/<br\s*\/?>/gi, ' ');
            const priceText = priceElement.textContent.trim();
            const price = priceText.replace('₹ ', '').trim();
            const imageUrl = img.src;

            // Determine if book is available based on button availability
            const hasEbook = Array.from(buyButtons).some(btn => btn.textContent.includes('Ebook'));
            const hasHardcopy = Array.from(buyButtons).some(btn => btn.textContent.includes('Hard Copy'));

            // Build availability array
            const availability = [];
            if (hasEbook) {
                availability.push({
                    "@type": "Offer",
                    "priceCurrency": "INR",
                    "price": price,
                    "availability": "https://schema.org/InStock",
                    "name": "Ebook Edition",
                    "url": "https://www.tarashisgangopadhyay.in/allbook.html"
                });
            }
            if (hasHardcopy) {
                availability.push({
                    "@type": "Offer",
                    "priceCurrency": "INR",
                    "price": price,
                    "availability": "https://schema.org/InStock",
                    "name": "Hard Copy Edition",
                    "description": "20% discount available at checkout",
                    "url": "https://www.tarashisgangopadhyay.in/allbook.html"
                });
            }

            // Create Book Schema
            const bookSchema = {
                "@type": "Book",
                "name": title,
                "author": {
                    "@type": "Person",
                    "name": "Tarashis Gangopadhyay",
                    "url": "https://www.tarashisgangopadhyay.in/about.html"
                },
                "image": "https://www.tarashisgangopadhyay.in/" + imageUrl.replace('./', ''),
                "description": "A spiritual book by Tarashis Gangopadhyay. " + altText,
                "inLanguage": "bn",
                "isPartOf": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": "https://www.tarashisgangopadhyay.in/"
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Books",
                            "item": "https://www.tarashisgangopadhyay.in/allbook.html"
                        }
                    ]
                },
                "offers": availability.length > 0 ? availability : [{
                    "@type": "Offer",
                    "priceCurrency": "INR",
                    "price": price,
                    "availability": "https://schema.org/InStock",
                    "url": "https://www.tarashisgangopadhyay.in/allbook.html"
                }]
            };

            booksSchema.push(bookSchema);
        }
    }

    // Insert schemas into the page
    if (booksSchema.length > 0) {
        const schemaScript = document.getElementById('booksSchema');
        schemaScript.textContent = JSON.stringify(booksSchema);
    }
});
