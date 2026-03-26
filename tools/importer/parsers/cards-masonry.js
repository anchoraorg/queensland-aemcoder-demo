/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-masonry. Base: cards.
 * Source: https://www.queensland.com/au/en/home
 * Selectors from captured DOM: section#masonry-grid-category-wrapper, section#masonry-grid-article-wrapper
 * Each card: image + category/article title + link
 * Model fields: image (reference), text (richtext)
 */
export default function parse(element, { document }) {
  // Find masonry grid cards - each card is wrapped in an anchor
  const cardLinks = element.querySelectorAll('a[href][class*="dpouGB"], a[href][class*="eHqVIu"], a[href][class*="etsjJW"]');
  const cells = [];

  // If no specific card links found, try broader selection
  const items = cardLinks.length > 0 ? cardLinks : element.querySelectorAll('a[href]');

  items.forEach((card) => {
    // Card image
    const img = card.querySelector('img[src]:not([src=""])');
    // Card title
    const heading = card.querySelector('h3, h4, h5, h2');
    const titleSpan = card.querySelector('[class*="title"], [class*="fVHBlr"]');

    if (!img && !heading && !titleSpan) return;

    // Build image cell with field hint
    const imageCell = [];
    if (img) {
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(' field:image '));
      imgFrag.appendChild(img);
      imageCell.push(imgFrag);
    }

    // Build text cell with field hint
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));
    if (heading) {
      textFrag.appendChild(heading);
    } else if (titleSpan) {
      const h3 = document.createElement('h3');
      h3.textContent = titleSpan.textContent;
      textFrag.appendChild(h3);
    }
    // Add the link
    const newLink = document.createElement('a');
    newLink.href = card.href;
    newLink.textContent = (heading || titleSpan)?.textContent || 'Learn more';
    textFrag.appendChild(newLink);

    cells.push([imageCell.length ? imageCell : '', [textFrag]]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-masonry', cells });
  element.replaceWith(block);
}
