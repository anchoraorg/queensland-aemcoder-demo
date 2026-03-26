/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-circular. Base: cards.
 * Source: https://www.queensland.com/au/en/home
 * Selectors from captured DOM: #category-image-button-list_1472985754 .sc-gnVZno (circular image buttons)
 * Each button: circular image + icon overlay + h3 label + link
 * Model fields: image (reference), text (richtext)
 */
export default function parse(element, { document }) {
  // Find the circular button items
  const items = element.querySelectorAll('[class*="gnVZno"], [class*="ekwfDP"]');
  const cells = [];

  const processedItems = items.length > 0 ? items : [element];

  processedItems.forEach((item) => {
    // Circular thumbnail image (the larger background image, not the icon overlay)
    const imgs = item.querySelectorAll('img[src]:not([src=""])');
    const img = imgs.length > 0 ? imgs[0] : null;
    // Category label heading
    const heading = item.querySelector('h3, h4, h5');
    // Link wrapping the whole button
    const link = item.querySelector('a[href]');

    if (!heading && !link) return;

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
    if (heading) textFrag.appendChild(heading);
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.textContent = heading ? heading.textContent : link.textContent;
      textFrag.appendChild(newLink);
    }

    cells.push([imageCell.length ? imageCell : '', [textFrag]]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-circular', cells });
  element.replaceWith(block);
}
