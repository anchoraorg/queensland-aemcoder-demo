/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-portrait. Base: carousel.
 * Source: https://www.queensland.com/au/en/home
 * Selectors from captured DOM: section[id="--wrapper"] .swiper-slide, section#region-map-carousel-container .swiper-slide, section[id="---wrapper"] .swiper-slide
 * Each slide: portrait image + text overlay (label + title + link)
 * Model fields: media_image (reference), media_imageAlt (collapsed), content_text (richtext)
 */
export default function parse(element, { document }) {
  const slides = element.querySelectorAll('.swiper-slide');
  const cells = [];

  slides.forEach((slide) => {
    // Portrait image
    const img = slide.querySelector('img[src]:not([src=""])');
    // Text content: label paragraph, heading (h1, h5), and the wrapping link
    const label = slide.querySelector('p');
    const heading = slide.querySelector('h1, h5, h3, h2');
    const link = slide.querySelector('a[href]');

    if (!img && !heading) return;

    // Build image cell with field hint
    const imageCell = [];
    if (img) {
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(' field:media_image '));
      imgFrag.appendChild(img);
      imageCell.push(imgFrag);
    }

    // Build content cell with field hint
    const contentFrag = document.createDocumentFragment();
    contentFrag.appendChild(document.createComment(' field:content_text '));
    if (label) contentFrag.appendChild(label);
    if (heading) contentFrag.appendChild(heading);
    if (link && link !== heading?.closest('a')) {
      contentFrag.appendChild(link);
    } else if (link) {
      // If the whole card is wrapped in an <a>, create a standalone link
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.textContent = heading ? heading.textContent : link.textContent;
      contentFrag.appendChild(newLink);
    }

    cells.push([imageCell.length ? imageCell : '', [contentFrag]]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-portrait', cells });
  element.replaceWith(block);
}
