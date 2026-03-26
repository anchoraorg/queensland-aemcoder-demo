var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-queensland-homepage.js
  var import_queensland_homepage_exports = {};
  __export(import_queensland_homepage_exports, {
    default: () => import_queensland_homepage_default
  });

  // tools/importer/parsers/carousel-hero.js
  function parse(element, { document }) {
    const slides = element.querySelectorAll(".swiper-slide");
    const cells = [];
    slides.forEach((slide) => {
      const img = slide.querySelector('figure img[src]:not([src=""])');
      const heading = slide.querySelector("h1, h2");
      const ctaLink = slide.querySelector("a[href]");
      const imageCell = [];
      if (img) {
        const imgFrag = document.createDocumentFragment();
        imgFrag.appendChild(document.createComment(" field:media_image "));
        imgFrag.appendChild(img);
        imageCell.push(imgFrag);
      }
      const contentCell = [];
      const contentFrag = document.createDocumentFragment();
      contentFrag.appendChild(document.createComment(" field:content_text "));
      if (heading) contentFrag.appendChild(heading);
      if (ctaLink) contentFrag.appendChild(ctaLink);
      contentCell.push(contentFrag);
      if (imageCell.length || contentCell.length) {
        cells.push([imageCell.length ? imageCell : "", contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-portrait.js
  function parse2(element, { document }) {
    const slides = element.querySelectorAll(".swiper-slide");
    const cells = [];
    slides.forEach((slide) => {
      const img = slide.querySelector('img[src]:not([src=""])');
      const label = slide.querySelector("p");
      const heading = slide.querySelector("h1, h5, h3, h2");
      const link = slide.querySelector("a[href]");
      if (!img && !heading) return;
      const imageCell = [];
      if (img) {
        const imgFrag = document.createDocumentFragment();
        imgFrag.appendChild(document.createComment(" field:media_image "));
        imgFrag.appendChild(img);
        imageCell.push(imgFrag);
      }
      const contentFrag = document.createDocumentFragment();
      contentFrag.appendChild(document.createComment(" field:content_text "));
      if (label) contentFrag.appendChild(label);
      if (heading) contentFrag.appendChild(heading);
      if (link && link !== (heading == null ? void 0 : heading.closest("a"))) {
        contentFrag.appendChild(link);
      } else if (link) {
        const newLink = document.createElement("a");
        newLink.href = link.href;
        newLink.textContent = heading ? heading.textContent : link.textContent;
        contentFrag.appendChild(newLink);
      }
      cells.push([imageCell.length ? imageCell : "", [contentFrag]]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-portrait", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-info.js
  function parse3(element, { document }) {
    const tiles = element.querySelectorAll('section, [class*="gafIqh"], [class*="GeEZf"]');
    const cells = [];
    const items = tiles.length > 1 ? tiles : [element];
    items.forEach((tile) => {
      const img = tile.querySelector('img[src]:not([src=""])');
      const heading = tile.querySelector("h6, h5, h4");
      const paragraphs = tile.querySelectorAll("p");
      const imageCell = [];
      if (img) {
        const imgFrag = document.createDocumentFragment();
        imgFrag.appendChild(document.createComment(" field:image "));
        imgFrag.appendChild(img);
        imageCell.push(imgFrag);
      }
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      if (heading) textFrag.appendChild(heading);
      paragraphs.forEach((p) => textFrag.appendChild(p));
      cells.push([imageCell.length ? imageCell : "", [textFrag]]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-info", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-circular.js
  function parse4(element, { document }) {
    const items = element.querySelectorAll('[class*="gnVZno"], [class*="ekwfDP"]');
    const cells = [];
    const processedItems = items.length > 0 ? items : [element];
    processedItems.forEach((item) => {
      const imgs = item.querySelectorAll('img[src]:not([src=""])');
      const img = imgs.length > 0 ? imgs[0] : null;
      const heading = item.querySelector("h3, h4, h5");
      const link = item.querySelector("a[href]");
      if (!heading && !link) return;
      const imageCell = [];
      if (img) {
        const imgFrag = document.createDocumentFragment();
        imgFrag.appendChild(document.createComment(" field:image "));
        imgFrag.appendChild(img);
        imageCell.push(imgFrag);
      }
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      if (heading) textFrag.appendChild(heading);
      if (link) {
        const newLink = document.createElement("a");
        newLink.href = link.href;
        newLink.textContent = heading ? heading.textContent : link.textContent;
        textFrag.appendChild(newLink);
      }
      cells.push([imageCell.length ? imageCell : "", [textFrag]]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-circular", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-masonry.js
  function parse5(element, { document }) {
    const cardLinks = element.querySelectorAll('a[href][class*="dpouGB"], a[href][class*="eHqVIu"], a[href][class*="etsjJW"]');
    const cells = [];
    const items = cardLinks.length > 0 ? cardLinks : element.querySelectorAll("a[href]");
    items.forEach((card) => {
      var _a;
      const img = card.querySelector('img[src]:not([src=""])');
      const heading = card.querySelector("h3, h4, h5, h2");
      const titleSpan = card.querySelector('[class*="title"], [class*="fVHBlr"]');
      if (!img && !heading && !titleSpan) return;
      const imageCell = [];
      if (img) {
        const imgFrag = document.createDocumentFragment();
        imgFrag.appendChild(document.createComment(" field:image "));
        imgFrag.appendChild(img);
        imageCell.push(imgFrag);
      }
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      if (heading) {
        textFrag.appendChild(heading);
      } else if (titleSpan) {
        const h3 = document.createElement("h3");
        h3.textContent = titleSpan.textContent;
        textFrag.appendChild(h3);
      }
      const newLink = document.createElement("a");
      newLink.href = card.href;
      newLink.textContent = ((_a = heading || titleSpan) == null ? void 0 : _a.textContent) || "Learn more";
      textFrag.appendChild(newLink);
      cells.push([imageCell.length ? imageCell : "", [textFrag]]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-masonry", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-cta.js
  function parse6(element, { document }) {
    const columnDivs = element.querySelectorAll(":scope > div > div > div");
    const cells = [];
    const col1Content = [];
    const img = element.querySelector('figure img[src]:not([src=""]), img[alt][src]:not([src=""])');
    const videoIframe = element.querySelector('iframe[src*="youtube"], iframe[src*="vimeo"]');
    const videoPlayer = element.querySelector('[class*="plyr"], [class*="video"]');
    if (img) {
      col1Content.push(img);
    } else if (videoIframe) {
      const videoLink = document.createElement("a");
      videoLink.href = videoIframe.src.replace("/embed/", "/watch?v=");
      videoLink.textContent = videoIframe.src;
      col1Content.push(videoLink);
    } else if (videoPlayer) {
      const ytIframe = videoPlayer.querySelector("iframe");
      if (ytIframe && ytIframe.src) {
        const videoLink = document.createElement("a");
        const src = ytIframe.src;
        const videoId = src.match(/embed\/([^?]+)/);
        videoLink.href = videoId ? "https://www.youtube.com/watch?v=" + videoId[1] : src;
        videoLink.textContent = videoLink.href;
        col1Content.push(videoLink);
      }
    }
    const col2Content = [];
    const heading = element.querySelector("h1, h2, h3");
    const textDiv = element.querySelector('[class*="dNFkOE"], [class*="bkdVmD"]');
    const paragraphs = textDiv ? textDiv.querySelectorAll("p") : element.querySelectorAll(".sc-gNwFIu p, .sc-jJRqov p");
    const ctaLink = element.querySelector('a[class*="hWabDA"], a[class*="iIvHqT"], a[class*="iHzoZi"]');
    if (heading) col2Content.push(heading);
    if (paragraphs.length > 0) {
      paragraphs.forEach((p) => col2Content.push(p));
    }
    if (ctaLink) {
      const newLink = document.createElement("a");
      newLink.href = ctaLink.href;
      newLink.textContent = ctaLink.textContent.trim();
      col2Content.push(newLink);
    }
    cells.push([col1Content.length ? col1Content : "", col2Content.length ? col2Content : ""]);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-cta", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-newsletter.js
  function parse7(element, { document }) {
    const cells = [];
    const img = element.querySelector('figure img[src]:not([src=""])');
    const heading = element.querySelector("h3, h2, h1");
    const description = element.querySelector("p.sc-cOpnSz, .sc-cSMkSB p");
    const ctaLink = element.querySelector("a[href]");
    const imageCell = [];
    if (img) {
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(" field:image "));
      imgFrag.appendChild(img);
      imageCell.push(imgFrag);
    }
    const textCell = [];
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(" field:text "));
    if (heading) textFrag.appendChild(heading);
    if (description) textFrag.appendChild(description);
    if (ctaLink) {
      const newLink = document.createElement("a");
      newLink.href = ctaLink.href;
      newLink.textContent = ctaLink.textContent.trim();
      textFrag.appendChild(newLink);
    }
    textCell.push(textFrag);
    cells.push([imageCell.length ? imageCell : "", textCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-newsletter", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/queensland-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        '[class*="cookie"]',
        '[class*="consent"]',
        ".sc-fKEBWA",
        '[id*="drift"]',
        '[id*="chat"]'
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header#header-menu2",
        "header",
        "footer.sc-ggOjCS",
        "footer",
        "nav",
        '[class*="breadcrumb"]',
        "iframe",
        "link",
        "noscript",
        "script"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("data-track");
        el.removeAttribute("onclick");
        el.removeAttribute("data-analytics");
      });
    }
  }

  // tools/importer/transformers/queensland-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { document } = payload;
      const template = payload.template;
      if (!template || !template.sections || template.sections.length < 2) return;
      const sections = template.sections;
      const matchedElements = /* @__PURE__ */ new Set();
      const sectionElements = [];
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        let sectionEl = null;
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        for (const sel of selectors) {
          try {
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
          }
        }
        sectionElements.push({ section, el: sectionEl, index: i });
      }
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { section, el } = sectionElements[i];
        if (!el) continue;
        if (section.style) {
          const metadataBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          el.parentNode.insertBefore(metadataBlock, el.nextSibling);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          el.parentNode.insertBefore(hr, el);
        }
      }
    }
  }

  // tools/importer/import-queensland-homepage.js
  var parsers = {
    "carousel-hero": parse,
    "carousel-portrait": parse2,
    "cards-info": parse3,
    "cards-circular": parse4,
    "cards-masonry": parse5,
    "columns-cta": parse6,
    "hero-newsletter": parse7
  };
  var PAGE_TEMPLATE = {
    name: "queensland-homepage",
    urls: ["https://www.queensland.com/au/en/home"],
    description: "Queensland Tourism homepage with hero carousel, seasonal info, category buttons, road trip carousels, image/video CTAs, masonry grids, events, destinations, and newsletter signup",
    blocks: [
      {
        name: "carousel-hero",
        instances: ["section#hero-banner-slider"]
      },
      {
        name: "carousel-portrait",
        instances: [
          "section#--wrapper:nth-of-type(1)",
          "section#region-map-carousel-container",
          "section#--wrapper:nth-of-type(2)",
          "section#---wrapper"
        ]
      },
      {
        name: "cards-info",
        instances: ["section.sc-bEnJPI"]
      },
      {
        name: "cards-circular",
        instances: ["#category-image-button-list_1472985754"]
      },
      {
        name: "cards-masonry",
        instances: [
          "section#masonry-grid-category-wrapper",
          "section#masonry-grid-article-wrapper"
        ]
      },
      {
        name: "columns-cta",
        instances: [
          "section#image-cta_391757186",
          "section#image-cta_1758896933"
        ]
      },
      {
        name: "hero-newsletter",
        instances: ["section[id='-']"]
      }
    ],
    sections: [
      {
        id: "section-2-hero-carousel",
        name: "Hero Banner Carousel",
        selector: "section#hero-banner-slider",
        style: "dark",
        blocks: ["carousel-hero"],
        defaultContent: ["div.sc-dNFkOE h2", "div.sc-dNFkOE p"]
      },
      {
        id: "section-3-whats-on",
        name: "Whats On in Queensland",
        selector: ["#editorial-description-wrapper:has(h2)", "section.sc-bEnJPI"],
        style: null,
        blocks: ["cards-info"],
        defaultContent: ["#editorial-description-wrapper h2"]
      },
      {
        id: "section-4-category-buttons",
        name: "Category Image Buttons",
        selector: "#category-image-button-list_1472985754",
        style: null,
        blocks: ["cards-circular"],
        defaultContent: []
      },
      {
        id: "section-5-roadtrips",
        name: "Roadtrips Carousel",
        selector: ["section[id='--wrapper']"],
        style: null,
        blocks: ["carousel-portrait"],
        defaultContent: ["#editorial-description-wrapper h2"]
      },
      {
        id: "section-6-outback-cta",
        name: "Outback Queensland CTA",
        selector: "section#image-cta_391757186",
        style: null,
        blocks: ["columns-cta"],
        defaultContent: []
      },
      {
        id: "section-7-video-cta",
        name: "Holiday Feeling Video CTA",
        selector: "section#image-cta_1758896933",
        style: null,
        blocks: ["columns-cta"],
        defaultContent: []
      },
      {
        id: "section-8-map-destinations",
        name: "Let Us Show You Around",
        selector: ["#editorial-description-wrapper:has(h2)", "section#region-map-carousel-container"],
        style: "dark",
        blocks: ["carousel-portrait"],
        defaultContent: ["#editorial-description-wrapper h2"]
      },
      {
        id: "section-9-category-masonry",
        name: "What Holiday Feeling Are You",
        selector: ["#editorial-description-wrapper:has(h2)", "section#masonry-grid-category-wrapper"],
        style: null,
        blocks: ["cards-masonry"],
        defaultContent: ["#editorial-description-wrapper h2"]
      },
      {
        id: "section-10-events",
        name: "Be Our Plus One Events",
        selector: ["section[id='--wrapper']"],
        style: null,
        blocks: ["carousel-portrait"],
        defaultContent: ["#editorial-description-wrapper h2"]
      },
      {
        id: "section-11-articles-masonry",
        name: "Unlock More Queensland Magic",
        selector: ["#editorial-description-wrapper:has(h2)", "section#masonry-grid-article-wrapper"],
        style: null,
        blocks: ["cards-masonry"],
        defaultContent: ["#editorial-description-wrapper h2"]
      },
      {
        id: "section-12-destinations",
        name: "Explore Our Destinations",
        selector: ["section[id='---wrapper']"],
        style: null,
        blocks: ["carousel-portrait"],
        defaultContent: ["#editorial-description-wrapper h2"]
      },
      {
        id: "section-13-newsletter",
        name: "Newsletter Signup",
        selector: "section[id='-']",
        style: "dark",
        blocks: ["hero-newsletter"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_queensland_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_queensland_homepage_exports);
})();
