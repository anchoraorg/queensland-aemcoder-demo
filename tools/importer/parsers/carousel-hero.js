/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-hero. Base: carousel.
 * Source: https://www.queensland.com/au/en/home
 * Selectors from captured DOM: section#hero-banner-slider .swiper-slide
 * Model fields: media_image (reference), media_imageAlt (collapsed), content_text (richtext)
 */
export default function parse(element, { document }) {
  // Each swiper-slide is a carousel slide with bg image + text overlay
  const slides = element.querySelectorAll('.swiper-slide');
  const cells = [];

  slides.forEach((slide) => {
    // Image: first large img in figure (the hero background)
    const img = slide.querySelector('figure img[src]:not([src=""])');
    // Text content: heading (h1), optional subtitle, optional CTA link
    const heading = slide.querySelector('h1, h2');
    const ctaLink = slide.querySelector('a[href]');

    // Build image cell with field hint
    const imageCell = [];
    if (img) {
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(' field:media_image '));
      imgFrag.appendChild(img);
      imageCell.push(imgFrag);
    }

    // Build content cell with field hint
    const contentCell = [];
    const contentFrag = document.createDocumentFragment();
    contentFrag.appendChild(document.createComment(' field:content_text '));
    if (heading) contentFrag.appendChild(heading);
    if (ctaLink) contentFrag.appendChild(ctaLink);
    contentCell.push(contentFrag);

    if (imageCell.length || contentCell.length) {
      cells.push([imageCell.length ? imageCell : '', contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-hero', cells });
  element.replaceWith(block);
}
