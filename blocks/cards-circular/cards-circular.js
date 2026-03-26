import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Convert links whose href looks like an image URL into <img> elements.
 * AEM content delivery sometimes converts external image URLs to <a> tags.
 */
function convertImageLinks(container) {
  container.querySelectorAll('a').forEach((a) => {
    const href = a.getAttribute('href') || '';
    if (/\.(png|jpg|jpeg|gif|svg|webp)/i.test(href) || /scene7\.com/i.test(href)) {
      const img = document.createElement('img');
      img.src = href;
      img.alt = a.textContent.trim().substring(0, 50) || '';
      img.loading = 'lazy';
      const p = a.closest('p') || a.parentElement;
      if (p) {
        p.replaceChild(img, a);
      }
    }
  });
}

export default function decorate(block) {
  // Fix image links before processing
  convertImageLinks(block);

  const ul = document.createElement('ul');
  const rows = [...block.children];

  // Process rows in pairs: odd = background photo + heading, even = icon overlay
  for (let i = 0; i < rows.length; i += 2) {
    const mainRow = rows[i];
    const iconRow = rows[i + 1];

    const li = document.createElement('li');
    moveInstrumentation(mainRow, li);

    // Move main row children into li
    while (mainRow.firstElementChild) li.append(mainRow.firstElementChild);

    // Classify main row children
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && (div.querySelector('picture') || div.querySelector('img'))) {
        div.className = 'cards-circular-card-image';
      } else {
        div.className = 'cards-circular-card-body';
      }
    });

    // Extract icon from the paired row and add as overlay
    if (iconRow) {
      const iconImg = iconRow.querySelector('img');
      if (iconImg) {
        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'cards-circular-card-icon';
        const iconPicture = iconImg.closest('picture');
        iconWrapper.append(iconPicture || iconImg);
        li.append(iconWrapper);
      }
    }

    ul.append(li);
  }

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(ul);
}
