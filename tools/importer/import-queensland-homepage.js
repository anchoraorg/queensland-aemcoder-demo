/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import carouselHeroParser from './parsers/carousel-hero.js';
import carouselPortraitParser from './parsers/carousel-portrait.js';
import cardsInfoParser from './parsers/cards-info.js';
import cardsCircularParser from './parsers/cards-circular.js';
import cardsMasonryParser from './parsers/cards-masonry.js';
import columnsCtaParser from './parsers/columns-cta.js';
import heroNewsletterParser from './parsers/hero-newsletter.js';

// TRANSFORMER IMPORTS
import queenslandCleanupTransformer from './transformers/queensland-cleanup.js';
import queenslandSectionsTransformer from './transformers/queensland-sections.js';

// PARSER REGISTRY
const parsers = {
  'carousel-hero': carouselHeroParser,
  'carousel-portrait': carouselPortraitParser,
  'cards-info': cardsInfoParser,
  'cards-circular': cardsCircularParser,
  'cards-masonry': cardsMasonryParser,
  'columns-cta': columnsCtaParser,
  'hero-newsletter': heroNewsletterParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'queensland-homepage',
  urls: ['https://www.queensland.com/au/en/home'],
  description: 'Queensland Tourism homepage with hero carousel, seasonal info, category buttons, road trip carousels, image/video CTAs, masonry grids, events, destinations, and newsletter signup',
  blocks: [
    {
      name: 'carousel-hero',
      instances: ['section#hero-banner-slider'],
    },
    {
      name: 'carousel-portrait',
      instances: [
        'section#--wrapper:nth-of-type(1)',
        'section#region-map-carousel-container',
        'section#--wrapper:nth-of-type(2)',
        'section#---wrapper',
      ],
    },
    {
      name: 'cards-info',
      instances: ['section.sc-bEnJPI'],
    },
    {
      name: 'cards-circular',
      instances: ['#category-image-button-list_1472985754'],
    },
    {
      name: 'cards-masonry',
      instances: [
        'section#masonry-grid-category-wrapper',
        'section#masonry-grid-article-wrapper',
      ],
    },
    {
      name: 'columns-cta',
      instances: [
        'section#image-cta_391757186',
        'section#image-cta_1758896933',
      ],
    },
    {
      name: 'hero-newsletter',
      instances: ["section[id='-']"],
    },
  ],
  sections: [
    {
      id: 'section-2-hero-carousel',
      name: 'Hero Banner Carousel',
      selector: 'section#hero-banner-slider',
      style: 'dark',
      blocks: ['carousel-hero'],
      defaultContent: ['div.sc-dNFkOE h2', 'div.sc-dNFkOE p'],
    },
    {
      id: 'section-3-whats-on',
      name: 'Whats On in Queensland',
      selector: ['#editorial-description-wrapper:has(h2)', 'section.sc-bEnJPI'],
      style: null,
      blocks: ['cards-info'],
      defaultContent: ['#editorial-description-wrapper h2'],
    },
    {
      id: 'section-4-category-buttons',
      name: 'Category Image Buttons',
      selector: '#category-image-button-list_1472985754',
      style: null,
      blocks: ['cards-circular'],
      defaultContent: [],
    },
    {
      id: 'section-5-roadtrips',
      name: 'Roadtrips Carousel',
      selector: ["section[id='--wrapper']"],
      style: null,
      blocks: ['carousel-portrait'],
      defaultContent: ['#editorial-description-wrapper h2'],
    },
    {
      id: 'section-6-outback-cta',
      name: 'Outback Queensland CTA',
      selector: 'section#image-cta_391757186',
      style: null,
      blocks: ['columns-cta'],
      defaultContent: [],
    },
    {
      id: 'section-7-video-cta',
      name: 'Holiday Feeling Video CTA',
      selector: 'section#image-cta_1758896933',
      style: null,
      blocks: ['columns-cta'],
      defaultContent: [],
    },
    {
      id: 'section-8-map-destinations',
      name: 'Let Us Show You Around',
      selector: ['#editorial-description-wrapper:has(h2)', 'section#region-map-carousel-container'],
      style: 'dark',
      blocks: ['carousel-portrait'],
      defaultContent: ['#editorial-description-wrapper h2'],
    },
    {
      id: 'section-9-category-masonry',
      name: 'What Holiday Feeling Are You',
      selector: ['#editorial-description-wrapper:has(h2)', 'section#masonry-grid-category-wrapper'],
      style: null,
      blocks: ['cards-masonry'],
      defaultContent: ['#editorial-description-wrapper h2'],
    },
    {
      id: 'section-10-events',
      name: 'Be Our Plus One Events',
      selector: ["section[id='--wrapper']"],
      style: null,
      blocks: ['carousel-portrait'],
      defaultContent: ['#editorial-description-wrapper h2'],
    },
    {
      id: 'section-11-articles-masonry',
      name: 'Unlock More Queensland Magic',
      selector: ['#editorial-description-wrapper:has(h2)', 'section#masonry-grid-article-wrapper'],
      style: null,
      blocks: ['cards-masonry'],
      defaultContent: ['#editorial-description-wrapper h2'],
    },
    {
      id: 'section-12-destinations',
      name: 'Explore Our Destinations',
      selector: ["section[id='---wrapper']"],
      style: null,
      blocks: ['carousel-portrait'],
      defaultContent: ['#editorial-description-wrapper h2'],
    },
    {
      id: 'section-13-newsletter',
      name: 'Newsletter Signup',
      selector: "section[id='-']",
      style: 'dark',
      blocks: ['hero-newsletter'],
      defaultContent: [],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  queenslandCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1
    ? [queenslandSectionsTransformer]
    : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (section breaks + metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
