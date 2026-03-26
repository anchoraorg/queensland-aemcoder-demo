/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-newsletter. Base: hero.
 * Source: https://www.queensland.com/au/en/home
 * Selectors from captured DOM: section[id='-']
 * Model fields: image (reference), imageAlt (collapsed), text (richtext)
 * Newsletter signup section with background image, heading, description, CTA
 */
export default function parse(element, { document }) {
  const cells = [];

  // Image: background image from the figure
  const img = element.querySelector('figure img[src]:not([src=""])');

  // Text content: heading, description, CTA link
  const heading = element.querySelector('h3, h2, h1');
  const description = element.querySelector('p.sc-cOpnSz, .sc-cSMkSB p');
  const ctaLink = element.querySelector('a[href]');

  // Build image cell with field hint
  const imageCell = [];
  if (img) {
    const imgFrag = document.createDocumentFragment();
    imgFrag.appendChild(document.createComment(' field:image '));
    imgFrag.appendChild(img);
    imageCell.push(imgFrag);
  }

  // Build text cell with field hint
  const textCell = [];
  const textFrag = document.createDocumentFragment();
  textFrag.appendChild(document.createComment(' field:text '));
  if (heading) textFrag.appendChild(heading);
  if (description) textFrag.appendChild(description);
  if (ctaLink) {
    const newLink = document.createElement('a');
    newLink.href = ctaLink.href;
    newLink.textContent = ctaLink.textContent.trim();
    textFrag.appendChild(newLink);
  }
  textCell.push(textFrag);

  cells.push([imageCell.length ? imageCell : '', textCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-newsletter', cells });
  element.replaceWith(block);
}
