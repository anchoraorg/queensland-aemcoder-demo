/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Queensland sections.
 * Adds section breaks (<hr>) and section-metadata blocks from template sections.
 * Only runs in afterTransform hook.
 * Selectors from captured DOM of https://www.queensland.com/au/en/home
 * Handles duplicate IDs (e.g. two section[id="--wrapper"]) by tracking matched elements.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { document } = payload;
    const template = payload.template;
    if (!template || !template.sections || template.sections.length < 2) return;

    const sections = template.sections;
    const matchedElements = new Set();

    // First pass: find all section elements (forward order to handle duplicates correctly)
    const sectionElements = [];
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      let sectionEl = null;
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];

      for (const sel of selectors) {
        try {
          // Use querySelectorAll to handle duplicate selectors
          const candidates = element.querySelectorAll(sel);
          for (const candidate of candidates) {
            if (!matchedElements.has(candidate)) {
              sectionEl = candidate;
              matchedElements.add(candidate);
              break;
            }
          }
          if (sectionEl) break;
        } catch (e) {
          // Invalid selector, try next
        }
      }
      sectionElements.push({ section, el: sectionEl, index: i });
    }

    // Second pass: insert hrs and section-metadata in reverse order
    for (let i = sectionElements.length - 1; i >= 0; i--) {
      const { section, el } = sectionElements[i];
      if (!el) continue;

      // Add section-metadata block if section has a style
      if (section.style) {
        const metadataBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        el.parentNode.insertBefore(metadataBlock, el.nextSibling);
      }

      // Add <hr> before section (except the first section)
      if (i > 0) {
        const hr = document.createElement('hr');
        el.parentNode.insertBefore(hr, el);
      }
    }
  }
}
