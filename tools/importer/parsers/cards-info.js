/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-info. Base: cards.
 * Source: https://www.queensland.com/au/en/home
 * Selectors from captured DOM: section.sc-bEnJPI .sc-gafIqh (seasonal info tiles)
 * Each tile: icon image + h6 label + description text + date range
 * Model fields: image (reference), text (richtext)
 */
export default function parse(element, { document }) {
  // Find the info tiles (seasonal data sections)
  const tiles = element.querySelectorAll('section, [class*="gafIqh"], [class*="GeEZf"]');
  const cells = [];

  // If no sub-tiles found, treat the whole element as a single card
  const items = tiles.length > 1 ? tiles : [element];

  items.forEach((tile) => {
    // Icon image
    const img = tile.querySelector('img[src]:not([src=""])');
    // Text content: h6 label, description paragraphs
    const heading = tile.querySelector('h6, h5, h4');
    const paragraphs = tile.querySelectorAll('p');

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
    paragraphs.forEach((p) => textFrag.appendChild(p));

    cells.push([imageCell.length ? imageCell : '', [textFrag]]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-info', cells });
  element.replaceWith(block);
}
