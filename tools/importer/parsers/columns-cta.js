/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-cta. Base: columns.
 * Source: https://www.queensland.com/au/en/home
 * Selectors from captured DOM: section#image-cta_391757186, section#image-cta_1758896933
 * Two-column layout: image/video | text + CTA
 * Columns blocks do NOT require HTML field comments (per xwalk rules)
 */
export default function parse(element, { document }) {
  // Find the two column areas
  const columnDivs = element.querySelectorAll(':scope > div > div > div');
  const cells = [];

  // Column 1: Image or video
  const col1Content = [];
  const img = element.querySelector('figure img[src]:not([src=""]), img[alt][src]:not([src=""])');
  const videoIframe = element.querySelector('iframe[src*="youtube"], iframe[src*="vimeo"]');
  const videoPlayer = element.querySelector('[class*="plyr"], [class*="video"]');

  if (img) {
    col1Content.push(img);
  } else if (videoIframe) {
    const videoLink = document.createElement('a');
    videoLink.href = videoIframe.src.replace('/embed/', '/watch?v=');
    videoLink.textContent = videoIframe.src;
    col1Content.push(videoLink);
  } else if (videoPlayer) {
    // Look for YouTube video ID in the player
    const ytIframe = videoPlayer.querySelector('iframe');
    if (ytIframe && ytIframe.src) {
      const videoLink = document.createElement('a');
      const src = ytIframe.src;
      const videoId = src.match(/embed\/([^?]+)/);
      videoLink.href = videoId ? 'https://www.youtube.com/watch?v=' + videoId[1] : src;
      videoLink.textContent = videoLink.href;
      col1Content.push(videoLink);
    }
  }

  // Column 2: Text + CTA
  const col2Content = [];
  const heading = element.querySelector('h1, h2, h3');
  const textDiv = element.querySelector('[class*="dNFkOE"], [class*="bkdVmD"]');
  const paragraphs = textDiv ? textDiv.querySelectorAll('p') : element.querySelectorAll('.sc-gNwFIu p, .sc-jJRqov p');
  const ctaLink = element.querySelector('a[class*="hWabDA"], a[class*="iIvHqT"], a[class*="iHzoZi"]');

  if (heading) col2Content.push(heading);
  if (paragraphs.length > 0) {
    paragraphs.forEach((p) => col2Content.push(p));
  }
  if (ctaLink) {
    const newLink = document.createElement('a');
    newLink.href = ctaLink.href;
    newLink.textContent = ctaLink.textContent.trim();
    col2Content.push(newLink);
  }

  cells.push([col1Content.length ? col1Content : '', col2Content.length ? col2Content : '']);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-cta', cells });
  element.replaceWith(block);
}
