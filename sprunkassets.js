(function (Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('sporunki sprunki sprunki getg funkly funky funky');
  }

  const ICON_URI = 'https://raw.githubusercontent.com/ZXDemon4/zxdemon4.github.io/refs/heads/main/sprunkassetsicon.svg';
  const BG_URI = 'https://raw.githubusercontent.com/ZXDemon4/zxdemon4.github.io/refs/heads/main/sprunkassetsbg.svg';
  const BG_TOP = '20%';
  const BLOCK_COLOR = '#7232ba';
  const BLOCK_BORDER = '#5a2794';
  const DROPDOWN_COLOR = '#de5dde';

  const WIKIS = {
    official: { name: 'Sprunki (Official)', domain: 'incredibox-sprunki.fandom.com' },
    sprunki_fanon: { name: 'Sprunki Fanon', domain: 'sprunki-fanon.fandom.com' },
    sprunki_remastered: { name: 'Sprunki: REMASTERED', domain: 'sprunki-remastered.fandom.com' },
    pyramixed_fanon: { name: 'Sprunki Pyramixed Fanon', domain: 'incredibox-sprunki-pyramixed-fanon.fandom.com' },
    pyramixed_canon: { name: 'Sprunki Pyramixed Canon', domain: 'sprunki-pyramixed.fandom.com' },
    retake: { name: 'Sprunki Retake', domain: 'incredibox-sprunki-retake-official.fandom.com' },
    sprunked: { name: 'Sprunked', domain: 'sprunked.fandom.com' },
    spruted: { name: 'Spruted', domain: 'cutespruted.fandom.com' },
    simons_realm: { name: "Simon's Realm", domain: 'sprunki-simons-realm.fandom.com' },
    parodybox: { name: 'Parodybox', domain: 'incredibox-parody-sprunki.fandom.com' },
    ssst_phase_3: { name: 'SSST Phase 3', domain: 'ssstp3.fandom.com' },
    ssst: { name: 'SSST', domain: 'skiyak.fandom.com' },
    pinkis_heaven: { name: "Pinki's Heaven", domain: 'pinkis-heaven-retake.fandom.com' },
    sprunksters: { name: 'Sprunksters', domain: 'incredibox-sprunksters.fandom.com' },
    sprunki_1996: { name: 'Sprunki 1996', domain: 'sprunki-for-free-charming-musical-monsters.fandom.com' },
    sprunki_2013: { name: 'Sprunki 2013', domain: 'sprunki-2013-unofficial-website.fandom.com' },
    yabosm: { name: 'YABOSM', domain: 'incredibox-yet-another-boring-old-sprunki-mod.fandom.com' },
    sprunki_swapped: { name: 'Sprunki Swapped', domain: 'sprunki-swapped.fandom.com' },
    sprunki_msi: { name: 'Sprunki MSI', domain: 'sprunkimsiwikii.fandom.com' },
    acidex_stuff: { name: 'acidex stuff', domain: 'pyrabox2.fandom.com' },
    sprunki_fnf: { name: 'Sprunki FNF', domain: 'fridaynightfunking.fandom.com' },
    sprunki_logos_previews: { name: 'Sprunki Logos n` Previews', domain: 'incredibox-sprunki.fandom.com' },
    footdih_lachospred: { name: 'FOOTDIH LACHOS RARESHIFTED IF YOU TRY THIS YOUR GAY', domain: 'sprunki-mod.fandom.com' },
    shifted_phase_1_5: {
      name: 'Shifted Phase 1.5',
      domain: 'sp-shifted.fandom.com',
      hubPage: 'Genesis_(Phase_1.5)',
      phaseScope: 'phase_1_5',
      phaseRegex: /genesis|phase[\s_-]*1\.?5|1po5/i,
      otherPhaseRegex: /phase[\s_-]*2|ameneurosis|phase[\s_-]*3|regretful|spru[\s_-]*shifte|world[\s_-]*rewritten/i
    },
    shifted_phase_2: {
      name: 'Shifted Phase 2',
      domain: 'sp-shifted.fandom.com',
      hubPage: '"Phase_2"',
      phaseScope: 'phase_2',
      phaseRegex: /\bphase[\s_-]*2\b|v[1-7]/i,
      otherPhaseRegex: /genesis|phase[\s_-]*1\.?5|ameneurosis|phase[\s_-]*3|regretful|spru[\s_-]*shifte|world[\s_-]*rewritten/i
    },
    shifted_phase_3: {
      name: 'Shifted Phase 3',
      domain: 'sp-shifted.fandom.com',
      hubPage: 'AMENEUROSIS',
      phaseScope: 'phase_3',
      phaseRegex: /ameneurosis|phase[\s_-]*3/i,
      otherPhaseRegex: /genesis|phase[\s_-]*1\.?5|\bphase[\s_-]*2\b|regretful|spru[\s_-]*shifte|world[\s_-]*rewritten/i
    },
    shifted_regretful: {
      name: 'Shifted Regretful',
      domain: 'sp-shifted.fandom.com',
      hubPage: 'Regretful/spru_shifte',
      phaseScope: 'regretful',
      phaseRegex: /regretful|spru[\s_-]*shifte/i,
      otherPhaseRegex: /genesis|phase[\s_-]*1\.?5|\bphase[\s_-]*2\b|ameneurosis|phase[\s_-]*3|world[\s_-]*rewritten/i
    },
    shifted_world_rewritten: {
      name: 'Shifted (a world rewritten)',
      domain: 'sp-shifted.fandom.com',
      hubPage: 'Sprunki_shifted_~_A_WORLD_REWRITTEN!',
      phaseScope: 'world_rewritten',
      phaseRegex: /world[\s_-]*rewritten|rewritten/i,
      otherPhaseRegex: /genesis|phase[\s_-]*1\.?5|\bphase[\s_-]*2\b|ameneurosis|phase[\s_-]*3|regretful|spru[\s_-]*shifte/i
    }
  };

  function wikiUrls(key) {
    const w = WIKIS[key];
    return { api: `https://${w.domain}/api.php`, page: `https://${w.domain}/wiki/` };
  }

  function isShiftedWiki(key) {
    return !!WIKIS[key]?.phaseScope;
  }

  const BITMAP_FORMATS = ['png', 'jpg', 'bmp', 'webp', 'gif'];
  const SOUND_FORMATS = ['mp3', 'wav', 'ogg', 'm4a'];
  const IMAGE_MIMES = {
    'image/svg+xml': 'svg',
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/gif': 'gif',
    'image/webp': 'webp'
  };
  const MIME_TO_FORMAT = {
    'image/png': 'png', 'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/jfif': 'jpg',
    'image/bmp': 'bmp', 'image/webp': 'webp', 'image/gif': 'gif', 'image/svg+xml': 'svg',
    'audio/mpeg': 'mp3', 'audio/mp3': 'mp3', 'audio/wav': 'wav', 'audio/x-wav': 'wav',
    'audio/ogg': 'ogg', 'audio/mp4': 'm4a', 'audio/x-m4a': 'm4a'
  };

  const SKIP_SECTIONS = /gallery|trivia|history|media|video|screenshot|quote|fan|gameplay|notes?|references?|see also/i;
  const SKIP_CLASS = /gallery|reference|navbox|hatnote|mw-references|ambox|warning|trivia/i;
  const SKIP_TEXT = /sensitive|may contain|trypophobia|excess or mild profanity|taboo|another page/i;

function injectStyle() {
  const old = document.getElementById('sprunkassets-style');
  if (old) old.remove();

  const style = document.createElement('style');
  style.id = 'sprunkassets-style';
  style.textContent = `
    g.blocklyDraggable:has(path[fill="${BLOCK_COLOR}"]) text.blocklyText:not(g.blocklyEditableText text) {
      fill: #ffffff !important;
      stroke: none !important;
      stroke-width: 0 !important;
      paint-order: normal !important;
    }
    g.blocklyDraggable:has(path[fill="${BLOCK_COLOR}"]) g.blocklyEditableText text.blocklyText {
      fill: #575e75 !important;
      stroke: none !important;
    }

    @media (max-width: 760px) {
      #sprunkassets-wiki, #sprunkassets-logo, #sprunkassets-preview, #sprunkassets-support {
        left: 6px !important; right: 6px !important; top: 6px !important; bottom: auto !important;
        width: auto !important; min-width: 0 !important; max-width: calc(100vw - 12px) !important;
        height: calc(100vh - 12px) !important; height: calc(100dvh - 12px) !important;
        max-height: calc(100dvh - 12px) !important; resize: none !important;
      }
      .sa-float {
        left: 6px !important; right: 6px !important; top: 56px !important; width: auto !important;
        min-width: 0 !important; max-width: calc(100vw - 12px) !important;
        height: auto !important; max-height: 60dvh !important; resize: none !important;
      }
      .sa-body-row, .sa-preview-body {
        flex-direction: column !important; overflow-y: auto !important;
      }
      .sa-side-col { width: auto !important; border-left: none !important; padding-left: 0 !important; overflow: visible !important; }
      .sa-grid2 { grid-template-columns: 1fr !important; }
      .sa-canvas-box { height: 180px !important; flex: none !important; }
      .sa-preview-left { flex: none !important; }
      .sa-preview-canvas-box { height: 40dvh !important; flex: none !important; }
      .sa-preview-right {
        width: auto !important; flex: 1 1 auto !important; min-height: 0 !important;
        border-left: none !important; border-top: 1px solid #333;
      }
      button { min-height: 36px; }
      input, select, textarea { font-size: 16px !important; }
    }
  `;
  document.head.appendChild(style);
}

  function sniffFormat(bytes) {
    const text = (start, len) => String.fromCharCode(...bytes.subarray(start, start + len));
    if (bytes[0] === 0x89 && text(1, 3) === 'PNG') return 'png';
    if (bytes[0] === 0xFF && bytes[1] === 0xD8) return 'jpg';
    if (text(0, 4) === 'GIF8') return 'gif';
    if (text(0, 4) === 'RIFF' && text(8, 4) === 'WEBP') return 'webp';
    if (text(0, 4) === 'RIFF' && text(8, 4) === 'WAVE') return 'wav';
    if (text(0, 2) === 'BM') return 'bmp';
    if (text(0, 4) === 'OggS') return 'ogg';
    if (text(0, 3) === 'ID3' || (bytes[0] === 0xFF && (bytes[1] & 0xE0) === 0xE0)) return 'mp3';
    if (text(4, 4) === 'ftyp') return 'm4a';
    const head = new TextDecoder().decode(bytes.subarray(0, 4096));
    if (/<svg[\s>]/i.test(head)) return 'svg';
    return null;
  }

  function resolveFormat(bytes, mime, url) {
    const sniffed = sniffFormat(bytes);
    if (sniffed) return sniffed;
    if (MIME_TO_FORMAT[mime]) return MIME_TO_FORMAT[mime];
    const m = /\.([a-z0-9]+)(?:[?#]|$)/i.exec(url);
    if (m) return m[1].toLowerCase() === 'jpeg' ? 'jpg' : m[1].toLowerCase();
    return null;
  }

function fandomUrlCandidates(url) {
  const u = String(url || '');
  const out = [];
  const add = x => { if (x && !out.includes(x)) out.push(x); };
  const noQuery = u.split('#')[0].split('?')[0];
  add(noQuery.replace(/\/revision\/[^/]+$/i, ''));
  add(u);
  if (/static\.wikia\.nocookie\.net/i.test(noQuery)) {
    add(noQuery.replace('static.wikia.nocookie.net', 'vignette.wikia.nocookie.net').replace(/\/revision\/[^/]+$/i, ''));
  }
  return out;
}

async function download(url) {
  let lastErr = null;
  for (const candidate of fandomUrlCandidates(url)) {
    try {
      const res = await fetch(candidate);
      if (!res.ok) { lastErr = new Error(`HTTP ${res.status} for ${candidate}`); continue; }
      const buffer = await res.arrayBuffer();
      if (!buffer || buffer.byteLength < 8) { lastErr = new Error('empty response'); continue; }
      const mime = (res.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
      return { buffer, bytes: new Uint8Array(buffer), mime, url: candidate };
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error('download failed for ' + url);
}

  async function imageSize(buffer, format) {
    const type = format === 'svg' ? 'image/svg+xml' : 'image/' + (format === 'jpg' ? 'jpeg' : format);
    const objectUrl = URL.createObjectURL(new Blob([buffer], { type }));
    try {
      const img = new Image();
      await new Promise((ok, fail) => {
        img.onload = ok;
        img.onerror = () => fail(new Error('could not read the image size'));
        img.src = objectUrl;
      });
      return { w: img.naturalWidth || 64, h: img.naturalHeight || 64 };
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  }

  async function addAssetToTarget(url, mime, kind, name, targetId) {
    const vm = Scratch.vm;
    const { buffer, bytes, mime: serverMime } = await download(url);
    const format = resolveFormat(bytes, mime || serverMime, url);
    const { AssetType, createAsset } = vm.runtime.storage;

    if (kind === 'image') {
      const isVector = format === 'svg';
      if (!isVector && !BITMAP_FORMATS.includes(format)) throw new Error('not an image: ' + url);
      const asset = createAsset(isVector ? AssetType.ImageVector : AssetType.ImageBitmap,
        format, new Uint8Array(buffer), null, true);
      const md5ext = asset.assetId + '.' + asset.dataFormat;
      const size = await imageSize(buffer, format);
      await vm.addCostume(md5ext, {
        asset, md5ext, assetId: asset.assetId, dataFormat: asset.dataFormat,
        name: String(name || 'costume'), bitmapResolution: 1,
        rotationCenterX: size.w / 2, rotationCenterY: size.h / 2
      }, targetId);
    } else {
      if (!SOUND_FORMATS.includes(format)) throw new Error('not a supported sound: ' + url);
      const asset = createAsset(AssetType.Sound, format, new Uint8Array(buffer), null, true);
      const md5ext = asset.assetId + '.' + asset.dataFormat;
      await vm.addSound({
        asset, md5: md5ext, md5ext,
        name: String(name || 'sound'), dataFormat: asset.dataFormat
      }, targetId);
    }
  }

  const cache = {};

  async function api(wiki, params) {
    const { api: base } = wikiUrls(wiki);
    const qs = new URLSearchParams({ format: 'json', origin: '*', ...params });
    const res = await fetch(`${base}?${qs}`);
    if (!res.ok) throw new Error('wiki HTTP ' + res.status);
    return res.json();
  }

  function normFile(name) {
    return String(name || '')
      .replace(/^(file|image):/i, '')
      .replace(/_/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  async function findTitle(wiki, name) {
    if (wiki === 'sprunki_logos_previews') {
      return { title: 'Logos_and_Previews', related: true };
    }

    const q = String(name ?? '').trim();
    if (!q) return null;

    const exact = await api(wiki, { action: 'query', titles: q, redirects: '1' });
    const page = Object.values(exact.query?.pages || {})[0];
    if (page && !('missing' in page) && page.pageid !== undefined) {
      return { title: page.title, related: true };
    }

    const stripped = q.replace(/^sprunki\s+/i, '').trim();
    if (stripped && stripped.toLowerCase() !== q.toLowerCase()) {
      const exactStripped = await api(wiki, { action: 'query', titles: stripped, redirects: '1' });
      const pageStripped = Object.values(exactStripped.query?.pages || {})[0];
      if (pageStripped && !('missing' in pageStripped) && pageStripped.pageid !== undefined) {
        return { title: pageStripped.title, related: true };
      }
    }

    const searchQuery = isShiftedWiki(wiki)
      ? `${stripped || q} ${WIKIS[wiki].name}`
      : (stripped || q);
    const search = await api(wiki, { action: 'query', list: 'search', srsearch: searchQuery, srlimit: '3' });
    const hits = search.query?.search || [];
    const hit = hits.find(h => !WIKIS[wiki]?.otherPhaseRegex?.test(h.title)) || hits[0];
    if (!hit) return null;

    const squash = s => normFile(s).replace(/[^a-z0-9]/g, '');
    const qWhole = squash(stripped || q);
    const tTitle = squash(hit.title);
    if (!tTitle) return null;
    const words = normFile(q).split(' ').map(squash).filter(w => w.length >= 3 && w !== 'sprunki');
    const related = (qWhole && (tTitle.includes(qWhole) || (qWhole.length >= 3 && qWhole.includes(tTitle)))) ||
      words.some(w => tTitle.includes(w));
    return { title: hit.title, related: !!related };
  }

  function safeDecode(s) {
    try { return decodeURIComponent(s); } catch (e) { return s; }
  }

  function isSkipBox(el) {
    const cls = typeof el.className === 'string' ? el.className : '';
    if (SKIP_CLASS.test(cls + ' ' + (el.id || ''))) return true;
    return !!el.querySelector('img') && SKIP_TEXT.test(el.textContent.slice(0, 400));
  }

  const FILE_IN_TEXT = /([^\/\\"'?#&=<>\s|]+\.(?:svg|png|jpe?g|gif|webp|wav|mp3|ogg|m4a))(?![\w])/i;

  function fileFromValue(value) {
    const v = safeDecode(String(value || ''));
    if (!v || v.startsWith('data:')) return null;
    const m = v.match(FILE_IN_TEXT);
    if (!m) return null;
    return m[1].replace(/^\d+px-/, '');
  }

  function namesInBlock(block, names) {
    const add = value => {
      const n = fileFromValue(value);
      if (n) names.add(normFile(n));
    };
    const nodes = [block, ...block.querySelectorAll('img, a')];
    nodes.forEach(node => {
      if (node.tagName === 'IMG') {
        ['data-image-name', 'data-file-name', 'data-image-key', 'data-src', 'src', 'alt', 'srcset']
          .forEach(attr => add(node.getAttribute(attr)));
      } else if (node.tagName === 'A') {
        const href = node.getAttribute('href') || '';
        const m = href.match(/File:([^/?#]+)/i);
        if (m) add(m[1]);
      }
    });
  }

  function matchesPhaseScope(wiki, textOrFileName) {
    const cfg = WIKIS[wiki];
    if (!cfg || !cfg.phaseScope) return true;
    const clean = normFile(textOrFileName || '');
    if (cfg.phaseRegex && cfg.phaseRegex.test(clean)) return true;
    if (cfg.otherPhaseRegex && cfg.otherPhaseRegex.test(clean)) return false;
    return true;
  }

  async function fileNamesOnPage(wiki, title, prog) {
    const names = new Set();
    prog(2.5);

    if (wiki === 'sprunki_logos_previews') {
      const allImgs = await api(wiki, { action: 'parse', page: title, prop: 'images', redirects: '1' });
      (allImgs.parse?.images || []).forEach(n => names.add(normFile(n)));
      prog(50);
      return names;
    }

    const introHtml = await api(wiki, { action: 'parse', page: title, prop: 'text', section: '0', redirects: '1' });
    prog(12.0);
    const doc = new DOMParser().parseFromString(introHtml.parse?.text?.['*'] ?? '', 'text/html');
    const introRoot = doc.body;

    const inWarningBox = img => {
      let n = img.parentElement;
      while (n && n !== introRoot) {
        if (isSkipBox(n) && !n.querySelector('.portable-infobox, .infobox')) return true;
        n = n.parentElement;
      }
      return false;
    };

    const keep = new Set();
    const drop = new Set();
    doc.querySelectorAll('img').forEach(img => {
      const bucket = new Set();
      namesInBlock(img, bucket);
      bucket.forEach(n => {
        if (!matchesPhaseScope(wiki, n)) return;
        (inWarningBox(img) ? drop : keep).add(n);
      });
    });

    const intro = await api(wiki, { action: 'parse', page: title, prop: 'images', section: '0', redirects: '1' });
    (intro.parse?.images || []).forEach(n => {
      const key = normFile(n);
      if (!matchesPhaseScope(wiki, key)) return;
      if (keep.has(key) || !drop.has(key)) names.add(key);
    });
    keep.forEach(n => names.add(n));

    const sec = await api(wiki, { action: 'parse', page: title, prop: 'sections', redirects: '1' });
    const sections = sec.parse?.sections || [];
    const total = sections.length + 1;
    let done = 1;
    prog(15 + (done / total) * 65);

    let skipLevel = 0;
    let activePhaseMatched = false;

    for (const s of sections) {
      done++;
      prog(15 + (done / total) * 65);

      const lvl = Number(s.level);
      if (skipLevel && lvl > skipLevel) continue;
      skipLevel = SKIP_SECTIONS.test(s.line) ? lvl : 0;
      if (skipLevel) continue;

      if (isShiftedWiki(wiki)) {
        const cfg = WIKIS[wiki];
        if (cfg.otherPhaseRegex && cfg.otherPhaseRegex.test(s.line) && !(cfg.phaseRegex && cfg.phaseRegex.test(s.line))) {
          continue;
        }
        if (cfg.phaseRegex && cfg.phaseRegex.test(s.line)) {
          activePhaseMatched = true;
        } else if (activePhaseMatched && lvl <= 2) {
          activePhaseMatched = false;
        }
      }

      const r = await api(wiki, { action: 'parse', page: title, prop: 'images', section: s.index, redirects: '1' });
      (r.parse?.images || []).forEach(n => {
        const key = normFile(n);
        if (isShiftedWiki(wiki)) {
          const cfg = WIKIS[wiki];
          if (cfg.otherPhaseRegex && cfg.otherPhaseRegex.test(key) && !(cfg.phaseRegex && cfg.phaseRegex.test(key))) {
            return;
          }
          if (activePhaseMatched || (cfg.phaseRegex && cfg.phaseRegex.test(key)) || !cfg.otherPhaseRegex?.test(key)) {
            names.add(key);
          }
        } else {
          names.add(key);
        }
      });
    }

    return names;
  }

  async function pageImageInfo(wiki, title, allowed) {
    const out = [];
    let cont = {};
    do {
      const res = await api(wiki, {
        action: 'query', generator: 'images', titles: title, gimlimit: 'max',
        prop: 'imageinfo', iiprop: 'url|mime|size', ...cont
      });
      Object.values(res.query?.pages || {}).forEach(p => {
        if (p.imageinfo?.[0] && (wiki === 'sprunki_logos_previews' || allowed.has(normFile(p.title)))) {
          out.push({ title: p.title, info: p.imageinfo[0] });
        }
      });
      cont = res.continue || null;
    } while (cont);
    return out;
  }

  function keepIconFile(fileTitle, searchName, wiki) {
    if (wiki === 'sprunki_logos_previews') return true;
    const file = String(fileTitle || '').toLowerCase().replace(/[\s_-]/g, '');
    if (!/icon/i.test(file)) return true;
    const words = String(searchName || '').toLowerCase().split(/\s+/)
      .filter(w => w.length >= 2 && w !== 'sprunki');
    return words.length === 0 || words.some(w => file.includes(w.replace(/[\s_-]/g, '')));
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' Bytes';
    const kb = bytes / 1024;
    if (kb > 1024) return (kb / 1024).toFixed(2) + ' MB';
    return kb.toFixed(1) + ' KB';
  }

  async function loadSingleQuery(wiki, name, prog = () => {}) {
    const q = String(name ?? '').trim();
    if (!q && wiki !== 'sprunki_logos_previews') return null;

    const found = await findTitle(wiki, q);
    if (!found) return null;
    if (!found.related && wiki !== 'sprunki_logos_previews') return null;
    const title = found.title;

    prog(5.0);
    const names = await fileNamesOnPage(wiki, title, prog);
    prog(85.0);
    const images = await pageImageInfo(wiki, title, names);
    prog(95.0);

    const files = images
      .filter(({ title: fTitle }) => wiki === 'sprunki_logos_previews' || !/triviafact/i.test(fTitle))
      .filter(({ title: fTitle }) => keepIconFile(fTitle, q, wiki))
      .map(({ info }) => {
        const mime = (info.mime || '').toLowerCase();
        let kind = null;
        if (IMAGE_MIMES[mime]) kind = 'image';
        else if (mime.startsWith('audio/')) kind = 'audio';
        const base = info.url.split('/revision/')[0].split('?')[0];
        const sizeStr = formatSize(info.size || 0);
        const fileName = safeDecode(base.split('/').pop() || 'file');
        const isGif = mime === 'image/gif' || /\.gif$/i.test(fileName);
        return kind ? { url: base || info.url, mime, kind, isGif, name: fileName, sizeStr, urlAlt: info.url } : null;
      })
      .filter(Boolean);

    prog(100);
    const displayTitle = wiki === 'sprunki_logos_previews' ? 'Logos and Previews' : title;
    const debug = `${WIKIS[wiki].name}: ${names.size} file name(s) in the article, ${files.length} total`;
    return {
      title: displayTitle,
      url: wikiUrls(wiki).page + title.replace(/ /g, '_'),
      files,
      debug,
      paginate: wiki === 'sprunki_logos_previews'
    };
  }

  async function loadFiles(wiki, name, prog = () => {}, similar = false) {
    const q = String(name ?? '').trim();
    if (!q && wiki !== 'sprunki_logos_previews') return null;

    const key = wiki === 'sprunki_logos_previews'
      ? wiki + '|all'
      : wiki + '|' + q.toLowerCase() + (similar ? '|similar' : '');

    if (cache[key]) return cache[key];

    prog(0);

    if (similar) {
      const searchQuery = isShiftedWiki(wiki) ? `${q} ${WIKIS[wiki].name}` : q;
      const search = await api(wiki, { action: 'query', list: 'search', srsearch: searchQuery, srlimit: '1' });
      const hit = search.query?.search?.[0];
      if (!hit) return null;
      const names = await fileNamesOnPage(wiki, hit.title, prog);
      const images = await pageImageInfo(wiki, hit.title, names);
      const files = images
        .map(({ info }) => {
          const mime = (info.mime || '').toLowerCase();
          let kind = null;
          if (IMAGE_MIMES[mime]) kind = 'image';
          else if (mime.startsWith('audio/')) kind = 'audio';
          const base = info.url.split('/revision/')[0].split('?')[0];
          const sizeStr = formatSize(info.size || 0);
          const fileName = safeDecode(base.split('/').pop() || 'file');
          const isGif = mime === 'image/gif' || /\.gif$/i.test(fileName);
          return kind ? { url: base || info.url, mime, kind, isGif, name: fileName, sizeStr, urlAlt: info.url } : null;
        })
        .filter(Boolean);
      const data = {
        title: hit.title,
        url: wikiUrls(wiki).page + hit.title.replace(/ /g, '_'),
        files,
        debug: `${WIKIS[wiki].name}: ${files.length} total`,
        paginate: false
      };
      cache[key] = data;
      return data;
    }

    let result = await loadSingleQuery(wiki, q, prog);

    if ((!result || !result.files.length) && isShiftedWiki(wiki) && /^oren$/i.test(q)) {
      const fallbackOrixin = await loadSingleQuery(wiki, 'orixin', prog);
      if (fallbackOrixin && fallbackOrixin.files.length) {
        fallbackOrixin.debug += ' (fallback: orixin)';
        result = fallbackOrixin;
      } else {
        const fallbackOxirin = await loadSingleQuery(wiki, 'oxirin', prog);
        if (fallbackOxirin && fallbackOxirin.files.length) {
          fallbackOxirin.debug += ' (fallback: oxirin)';
          result = fallbackOxirin;
        }
      }
    }

    if (!result) return { unrelated: true };
    cache[key] = result;
    return result;
  }

  const MIN_BOX = 8;
  const HANDLE_R = 3.5;  
  const KNOB_PX = 14;    
  const HIT_PX = 7;     
  const TAN_MAX = 1.7;  

  function clampT(v) { return Math.max(-TAN_MAX, Math.min(TAN_MAX, v)); }

  function skewFwd(x, y, tx, ty) {
    return { x: x + tx * y, y: y + ty * x };
  }
  function skewInv(x, y, tx, ty) {
    let d = 1 - tx * ty;
    if (Math.abs(d) < 1e-3) d = 1e-3;
    return { x: (x - tx * y) / d, y: (y - ty * x) / d };
  }

  function rotLocal(box, mx, my) {
    const dx = mx - box.cx, dy = my - box.cy;
    const r = -(box.rot || 0) * Math.PI / 180;
    return { x: dx * Math.cos(r) - dy * Math.sin(r), y: dx * Math.sin(r) + dy * Math.cos(r) };
  }

  function localOf(box, mx, my) {
    const p = rotLocal(box, mx, my);
    return skewInv(p.x, p.y, box.tx || 0, box.ty || 0);
  }

  function worldOf(box, lx, ly) {
    const s = skewFwd(lx, ly, box.tx || 0, box.ty || 0);
    const r = (box.rot || 0) * Math.PI / 180;
    return {
      x: box.cx + s.x * Math.cos(r) - s.y * Math.sin(r),
      y: box.cy + s.x * Math.sin(r) + s.y * Math.cos(r)
    };
  }

  function pointInBox(box, mx, my) {
    const p = localOf(box, mx, my);
    return Math.abs(p.x) <= box.w / 2 && Math.abs(p.y) <= box.h / 2;
  }

  function unitsPerPx(canvas, unitsW) {
    const w = canvas ? (canvas.getBoundingClientRect().width || canvas.clientWidth || canvas.offsetWidth) : 0;
    return w > 0 ? unitsW / w : 1;
  }

  function handleSpots(box, k) {
    const hw = box.w / 2, hh = box.h / 2;
    const spots = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]]
      .map(([sx, sy]) => ({
        sx, sy, x: sx * hw, y: sy * hh,
        kind: (sx && sy) ? 'resize' : 'edge',
        axis: sy === 0 ? 'x' : 'y'
      }));
    spots.push({ sx: 0, sy: 0, x: 0, y: -hh - KNOB_PX * k, kind: 'rotate', axis: null });
    return spots;
  }

  function hitBoxHandle(box, mx, my, k) {
    const r = HIT_PX * k;
    return handleSpots(box, k).find(s => {
      const w = worldOf(box, s.x, s.y);
      return Math.hypot(mx - w.x, my - w.y) <= r;
    }) || null;
  }

  function drawBoxHandles(ctx, box, k) {
    const hw = box.w / 2, hh = box.h / 2;
    const P = (x, y) => worldOf(box, x, y);
    ctx.save();
    ctx.strokeStyle = '#de5dde';
    ctx.lineWidth = 1 * k;
    ctx.setLineDash([4 * k, 3 * k]);
    const c0 = P(-hw, -hh), c1 = P(hw, -hh), c2 = P(hw, hh), c3 = P(-hw, hh);
    ctx.beginPath();
    ctx.moveTo(c0.x, c0.y);
    ctx.lineTo(c1.x, c1.y);
    ctx.lineTo(c2.x, c2.y);
    ctx.lineTo(c3.x, c3.y);
    ctx.closePath();
    ctx.stroke();
    ctx.setLineDash([]);

    const top = P(0, -hh), knob = P(0, -hh - KNOB_PX * k);
    ctx.beginPath();
    ctx.moveTo(top.x, top.y);
    ctx.lineTo(knob.x, knob.y);
    ctx.stroke();

    handleSpots(box, k).forEach(s => {
      const q = P(s.x, s.y);
      const r = (s.kind === 'rotate' ? HANDLE_R * 1.2 : HANDLE_R) * k;
      ctx.beginPath();
      ctx.arc(q.x, q.y, r, 0, Math.PI * 2);
      ctx.fillStyle = s.kind === 'rotate' ? '#de5dde' : '#ffffff';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1 * k;
      ctx.fill();
      ctx.stroke();
    });
    ctx.restore();
  }

  function startBoxDrag(box, spot, mx, my, mods) {
    let mode = 'resize';
    if (spot.kind === 'rotate') mode = 'rotate';
    else if (spot.kind === 'edge' && mods && mods.ctrl) mode = spot.axis === 'y' ? 'skewX' : 'skewY';
    return {
      spot,
      mode,
      alt: !!(mods && mods.alt),
      start: {
        cx: box.cx, cy: box.cy, w: box.w, h: box.h,
        rot: box.rot || 0, tx: box.tx || 0, ty: box.ty || 0
      },
      startAngle: Math.atan2(my - box.cy, mx - box.cx)
    };
  }


  function boxFromDrag(drag, mx, my) {
    const s = drag.start, sp = drag.spot;

    if (drag.mode === 'rotate') {
      const deg = (Math.atan2(my - s.cy, mx - s.cx) - drag.startAngle) * 180 / Math.PI;
      return { ...s, rot: s.rot + deg };
    }

    if (drag.mode === 'skewX') {
      const r = rotLocal(s, mx, my);
      const edge = sp.sy * s.h / 2;
      if (Math.abs(edge) < 1e-6) return { ...s };
      return { ...s, tx: clampT(r.x / edge) };
    }

    if (drag.mode === 'skewY') {
      const r = rotLocal(s, mx, my);
      const edge = sp.sx * s.w / 2;
      if (Math.abs(edge) < 1e-6) return { ...s };
      return { ...s, ty: clampT(r.y / edge) };
    }

    const p = localOf(s, mx, my);
    const hw = s.w / 2, hh = s.h / 2;
    let w = s.w, h = s.h, lcx = 0, lcy = 0;
    if (sp.sx !== 0) {
      if (drag.alt) {
        w = Math.max(MIN_BOX, 2 * Math.abs(p.x));
      } else {
        const anchor = -sp.sx * hw;
        w = Math.max(MIN_BOX, sp.sx * (p.x - anchor));
        lcx = anchor + sp.sx * w / 2;
      }
    }
    if (sp.sy !== 0) {
      if (drag.alt) {
        h = Math.max(MIN_BOX, 2 * Math.abs(p.y));
      } else {
        const anchor = -sp.sy * hh;
        h = Math.max(MIN_BOX, sp.sy * (p.y - anchor));
        lcy = anchor + sp.sy * h / 2;
      }
    }
    const c = worldOf(s, lcx, lcy);
    return { cx: c.x, cy: c.y, w, h, rot: s.rot, tx: s.tx, ty: s.ty };
  }

  let win = null;
  let status = null;
  let list = null;
  let pager = null;
  let articleLabel = null;
  let warningBanner = null;
  let stage = null;
  let stageText = null;
  let stageBar = null;
  let stageBarFill = null;
  let stageSubText = null;
  let stageBtn = null;
  let mainBody = null;
  let packPanel = null;
  let playing = null;
  let searchStartTime = 0;

  let currentData = null;
  let currentPage = 0;
  let currentFilter = 'all';
  const PAGE_SIZE = 25;

  const BTN = {
    background: '#141416', color: '#ffffff', border: '1.5px solid #ffffff',
    borderRadius: '6px', padding: '4px 10px', fontSize: '12px',
    fontFamily: "'Rubik', sans-serif", cursor: 'pointer'
  };

  function el(tag, css, text) {
    const e = document.createElement(tag);
    if (css) Object.assign(e.style, css);
    if (text != null) e.textContent = text;
    return e;
  }

  function button(label, onClick) {
    const b = el('button', BTN, label);
    b.addEventListener('click', e => { e.stopPropagation(); onClick(); });
    return b;
  }

  function setStatus(msg) {
    if (status) status.textContent = msg || '';
  }

  function getWifiEstimateText(pct) {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const downlink = conn && typeof conn.downlink === 'number' && conn.downlink > 0 ? conn.downlink : null;
    const elapsedSec = (performance.now() - searchStartTime) / 1000;

    let estSec;
    if (pct > 5 && elapsedSec > 0.2) {
      const rateBasedRemaining = (elapsedSec / pct) * (100 - pct);
      const speedFactor = downlink ? Math.max(0.4, Math.min(2.5, 10 / downlink)) : 1;
      estSec = rateBasedRemaining * (downlink ? 0.7 + 0.3 * speedFactor : 1);
    } else {
      const baseTotalSec = downlink ? Math.max(1.2, Math.min(15, 22 / downlink)) : 3.5;
      estSec = baseTotalSec * ((100 - pct) / 100);
    }

    const formattedSec = Math.max(0.1, estSec).toFixed(1);
    return `estimated time: ~${formattedSec}s`;
  }

  function showLoading(pct) {
    if (!stage) return;
    const clampedPct = Math.max(0, Math.min(100, Number(pct) || 0));
    stage.style.display = 'flex';
    stageText.textContent = `loading ${clampedPct.toFixed(2)}%`;
    stageBar.style.display = 'block';
    stageBarFill.style.width = clampedPct + '%';
    stageSubText.style.display = 'block';
    stageSubText.textContent = getWifiEstimateText(clampedPct);
    stageBtn.style.display = 'none';
  }

  function showUnrelated(wiki, name, filter) {
    if (!stage) return;
    stage.style.display = 'flex';
    stageText.textContent = "This isn't here.. You wanna show similar stuff?";
    stageBar.style.display = 'none';
    stageSubText.style.display = 'none';
    stageBtn.style.display = 'inline-block';
    stageBtn.onclick = e => {
      e.stopPropagation();
      runSearch(wiki, name, filter, true);
    };
  }

  function clearStage() {
    if (stage) stage.style.display = 'none';
  }

  async function downloadFile(f) {
    try {
      const { buffer } = await download(f.urlAlt || f.url);
      const blob = new Blob([buffer], { type: f.mime || 'application/octet-stream' });
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = f.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      setStatus('downloaded ' + f.name);
    } catch (e) {
      const openUrl = f.urlAlt || f.url;
      window.open(openUrl, '_blank');
      setStatus('opened ' + f.name + ' in a new tab');
    }
  }

  async function addFileToSprite(f) {
    const target = Scratch.vm.editingTarget;
    if (!target) return setStatus('no sprite selected');
    setStatus('adding ' + f.name + '...');
    try {
      const baseName = f.name.replace(/\.[a-z0-9]+$/i, '');
      await addAssetToTarget(f.url, f.mime, f.kind, baseName, target.id);
      setStatus('added ' + f.name + ' to ' + target.getName());
    } catch (e) {
      console.error('[sprunkassets] add to sprite failed:', e);
      setStatus('error: ' + (e.message || e));
    }
  }

  function imageCard(f) {
    const card = el('div', {
      border: '1.5px dashed #555', borderRadius: '8px', padding: '8px',
      display: 'flex', flexDirection: 'column', gap: '6px', background: 'transparent'
    });
    const img = el('img', {
      maxWidth: '100%', maxHeight: '140px', objectFit: 'contain',
      background: 'transparent', alignSelf: 'center'
    });
    img.loading = 'lazy';
    img.src = f.url;
    img.alt = f.name;
img.onerror = () => { if (f.urlAlt && img.src !== f.urlAlt) img.src = f.urlAlt; };

    const name = el('div', { fontSize: '11px', opacity: '0.7', wordBreak: 'break-all' }, f.name);
    const row = el('div', { display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' });
    const sizeTag = el('span', { fontSize: '11px', opacity: '0.8', fontWeight: 'bold', marginLeft: '4px' }, f.sizeStr);
    row.append(button('Download', () => downloadFile(f)), button('Add to sprite', () => addFileToSprite(f)), sizeTag);
    card.append(img, name, row);
    return card;
  }

  function stopPlaying() {
    if (playing) {
      if (playing.timer) clearInterval(playing.timer);
      playing.audio.pause();
      playing.audio.currentTime = 0;
      if (playing.reset) playing.reset();
      playing = null;
    }
  }

  function audioCard(f) {
    const card = el('div', {
      border: '1.5px dashed #555', borderRadius: '8px', padding: '8px',
      display: 'flex', flexDirection: 'column', gap: '6px'
    });
    const name = el('div', { fontSize: '12px', wordBreak: 'break-all' }, f.name);

    const audio = new Audio(f.url);
    audio.preload = 'metadata';
    let timerInterval = null;

    const reset = () => {
      play.textContent = '▶ Play';
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    };

    const durationTag = el('span', { fontSize: '11px', opacity: '0.8', fontWeight: 'bold', marginLeft: '6px' }, '0.00s ---------------- ...');

    audio.addEventListener('loadedmetadata', () => {
      if (audio.duration && !isNaN(audio.duration)) {
        durationTag.textContent = `0.00s ---------------- ${audio.duration.toFixed(2)}s`;
      }
    });

    const play = button('▶ Play', () => {
      if (playing && playing.audio === audio) {
        stopPlaying();
        return;
      }
      stopPlaying();

      audio.play().then(() => {
        const totalDur = audio.duration && !isNaN(audio.duration) ? audio.duration : 0;

        timerInterval = setInterval(() => {
          const curr = audio.currentTime || 0;
          durationTag.textContent = `${curr.toFixed(2)}s ---------------- ${totalDur ? totalDur.toFixed(2) + 's' : '...'}`;
        }, 50);

        playing = { audio, reset, timer: timerInterval };
        play.textContent = '■ Stop';
      }).catch(e => setStatus('could not play: ' + e.message));
    });

    audio.addEventListener('ended', () => {
      if (playing && playing.audio === audio) {
        playing = null;
      }
      reset();
      if (audio.duration && !isNaN(audio.duration)) {
        durationTag.textContent = `0.00s ---------------- ${audio.duration.toFixed(2)}s`;
      }
    });

    const row = el('div', { display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' });
    const sizeTag = el('span', { fontSize: '11px', opacity: '0.8', fontWeight: 'bold', marginLeft: '4px' }, f.sizeStr);
    row.append(play, button('Download', () => downloadFile(f)), button('Add to sprite', () => addFileToSprite(f)), sizeTag, durationTag);
    card.append(name, row);
    return card;
  }

  function buildWindow() {
    const old = document.getElementById('sprunkassets-wiki');
    if (old) old.remove();

    win = el('div', {
      position: 'fixed', top: '80px', right: '80px', width: '420px', height: '420px',
      minWidth: '280px', minHeight: '200px', background: '#000000',
      border: '2px solid #ffffff', borderRadius: '8px', zIndex: '999999',
      display: 'none', flexDirection: 'column', resize: 'both', overflow: 'hidden',
      boxSizing: 'border-box', boxShadow: '0px 10px 30px rgba(0,0,0,0.75)',
      fontFamily: "'Rubik', sans-serif", userSelect: 'none', color: '#ffffff'
    });
    win.id = 'sprunkassets-wiki';

    const bgImg = el('img', {
      position: 'absolute', top: BG_TOP, left: '0', width: '100%', height: `calc(100% - ${BG_TOP})`,
      objectFit: 'contain', opacity: '0.3', pointerEvents: 'none', zIndex: '0'
    });
    bgImg.src = BG_URI;
    bgImg.alt = '';

    const header = el('div', {
      background: '#141416', padding: '6px 12px', cursor: 'move', display: 'flex',
      justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333',
      flexShrink: '0', boxSizing: 'border-box', position: 'relative', zIndex: '1'
    });
    const icon = el('img', { height: '26px', width: '26px', objectFit: 'contain', pointerEvents: 'none' });
    icon.src = ICON_URI;
    icon.alt = 'sprunkassets';

    const headerTitle = el('span', {
      fontSize: '13px', fontWeight: '700', color: '#ffffff', marginLeft: '8px', flex: '1'
    }, 'sprunkassets');

    const btns = el('div', { display: 'flex', gap: '6px', alignItems: 'center' });
    const minBtn = el('button', {
      background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer',
      fontSize: '14px', padding: '0 4px', outline: 'none'
    }, '🗕');
    let minimized = false;
    let savedHeight = '420px';
    minBtn.addEventListener('click', e => {
      e.stopPropagation();
      minimized = !minimized;
      if (minimized) {
        savedHeight = win.style.height;
        body.style.display = 'none';
        win.style.height = 'auto';
        win.style.resize = 'none';
      } else {
        body.style.display = 'flex';
        win.style.height = savedHeight;
        win.style.resize = 'both';
      }
    });
    const closeBtn = el('div', {
      width: '20px', height: '20px', backgroundColor: '#8b0000', border: '1px solid #ffffff',
      borderRadius: '50%', color: '#ffffff', fontSize: '11px', fontWeight: 'bold',
      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
    }, 'X');
    closeBtn.setAttribute('data-sa-close', '1');
    closeBtn.addEventListener('click', e => {
      e.stopPropagation();
      hideWindow();
    });
    btns.append(minBtn, closeBtn);
    header.append(icon, headerTitle, btns);

    const body = el('div', {
      flex: '1', display: 'flex', flexDirection: 'column', gap: '8px',
      padding: '10px', minHeight: '0', boxSizing: 'border-box', position: 'relative', zIndex: '1'
    });
    mainBody = body;

    warningBanner = el('div', {
      background: '#2b1a1a', border: '1px solid #ff4444', color: '#ff8888',
      fontSize: '11px', padding: '6px 8px', borderRadius: '6px', lineHeight: '1.3',
      flexShrink: '0'
    }, 'Other files may be shown in every wiki and especially in Sprunki Pyramixed Fanon and Canon');

    articleLabel = el('div', { fontSize: '15px', fontWeight: '700', flexShrink: '0' }, '');
    list = el('div', {
      flex: '1', overflowY: 'auto', minHeight: '0', display: 'flex',
      flexDirection: 'column', gap: '8px', paddingRight: '4px'
    });
    pager = el('div', {
      display: 'none', justifyContent: 'space-between', alignItems: 'center',
      gap: '8px', flexShrink: '0', paddingTop: '4px', borderTop: '1px solid #333'
    });
    status = el('div', { fontSize: '11px', opacity: '0.7', flexShrink: '0', minHeight: '14px' }, '');

    stage = el('div', {
      position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', zIndex: '2',
      display: 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: '8px', background: '#000000', padding: '20px', boxSizing: 'border-box',
      textAlign: 'center', fontSize: '24px', fontWeight: '700', lineHeight: '1.3'
    });
    stageText = el('div', {}, '');

    stageBar = el('div', {
      width: '70%', maxWidth: '360px', height: '12px', marginTop: '6px',
      background: '#222222', border: '1.5px solid #ffffff', borderRadius: '8px',
      overflow: 'hidden', display: 'none'
    });
    stageBarFill = el('div', {
      width: '0%', height: '100%', background: '#ffffff',
      transition: 'width 0.2s linear'
    });
    stageBar.append(stageBarFill);

    stageSubText = el('div', {
      fontSize: '12px', fontWeight: '400', color: '#888888', display: 'none'
    }, '');
    stageBtn = el('button', {
      background: '#141416', color: '#ffffff', border: '1.5px solid #ffffff',
      borderRadius: '8px', padding: '8px 26px', fontSize: '16px', marginTop: '10px',
      fontFamily: "'Rubik', sans-serif", cursor: 'pointer', display: 'none'
    }, 'show');
    stage.append(stageText, stageBar, stageSubText, stageBtn);

    body.append(warningBanner, articleLabel, list, pager, status, stage);

    win.append(bgImg, header, body);
    document.body.appendChild(win);

    makeDraggable(header, win);
  }

  function showWindow() {
    if (!win || !document.body.contains(win)) buildWindow();
    win.style.display = 'flex';
  }

  function hideWindow() {
    if (win) win.style.display = 'none';
    stopPlaying();
  }

  function clearList() {
    articleLabel.textContent = '';
    list.textContent = '';
    if (pager) {
      pager.style.display = 'none';
      pager.textContent = '';
    }
  }

  function renderPage(pageIdx) {
    if (!currentData) return;
    stopPlaying();
    currentPage = pageIdx;
    list.textContent = '';
    list.scrollTop = 0;

    let filteredFiles = currentData.files;
    if (currentFilter === 'images') {
      filteredFiles = filteredFiles.filter(f => f.kind === 'image' && !f.isGif);
    } else if (currentFilter === 'audios') {
      filteredFiles = filteredFiles.filter(f => f.kind === 'audio');
    } else if (currentFilter === 'gifs') {
      filteredFiles = filteredFiles.filter(f => f.kind === 'image' && f.isGif);
    }

    const totalPages = Math.max(1, Math.ceil(filteredFiles.length / PAGE_SIZE));
    const slice = currentData.paginate
      ? filteredFiles.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
      : filteredFiles;

    const images = slice.filter(f => f.kind === 'image');
    const audio = slice.filter(f => f.kind === 'audio');

    images.forEach(f => list.appendChild(imageCard(f)));
    audio.forEach(f => list.appendChild(audioCard(f)));

    if (currentData.paginate && totalPages > 1) {
      pager.style.display = 'flex';
      pager.textContent = '';

      const prevBtn = button('◀ Prev', () => {
        if (currentPage > 0) renderPage(currentPage - 1);
      });
      prevBtn.disabled = currentPage === 0;
      prevBtn.style.opacity = currentPage === 0 ? '0.4' : '1';

      const pageInfo = el('span', { fontSize: '12px', fontWeight: '700' }, `Page ${currentPage + 1} / ${totalPages}`);

      const nextBtn = button('Next ▶', () => {
        if (currentPage < totalPages - 1) renderPage(currentPage + 1);
      });
      nextBtn.disabled = currentPage >= totalPages - 1;
      nextBtn.style.opacity = currentPage >= totalPages - 1 ? '0.4' : '1';

      pager.append(prevBtn, pageInfo, nextBtn);
    } else {
      pager.style.display = 'none';
    }

    const totalImages = filteredFiles.filter(f => f.kind === 'image').length;
    const totalAudio = filteredFiles.filter(f => f.kind === 'audio').length;
    setStatus(`${totalImages} filtered item(s), ${totalAudio} audio file(s). ${currentData.debug || ''}`);
  }

  function renderFiles(data) {
    currentData = data;
    currentPage = 0;
    articleLabel.textContent = data.title;
    list.textContent = '';

    if (!data.files.length) {
      pager.style.display = 'none';
      list.appendChild(el('div', { opacity: '0.7' }, 'no files found in the main article'));
      setStatus(data.debug || '0 files');
      return;
    }

    renderPage(0);
  }

  async function runSearch(wiki, name, filter, similar) {
    clearList();
    setStatus('');
    currentFilter = filter || 'all';
    searchStartTime = performance.now();
    showLoading(0);
    try {
      const data = await loadFiles(wiki, name, showLoading, similar);
      if (!data) {
        clearStage();
        setStatus('nothing similar found for "' + name + '" on ' + WIKIS[wiki].name);
        return;
      }
      if (data.unrelated) {
        clearList();
        showUnrelated(wiki, name, currentFilter);
        return;
      }
      clearStage();
      renderFiles(data);
    } catch (e) {
      console.error('[sprunkassets] wiki check failed:', e);
      clearStage();
      setStatus('error: ' + (e.message || e));
    }
  }

  const PACKS = {
    splunko_bloodpack: { title: 'splunko bloodpack', sprite: 'splunko blood pack', url: 'https://files.catbox.moe/2ovpkf.warps' },
    garden: { title: 'garden.pms pack', sprite: 'garden.pms pack', url: 'https://files.catbox.moe/a0xoiu.warps' },
    unnamed_blood_pack1: { title: 'unnamed blood pack1', sprite: 'unnamed blood pack1', url: 'https://files.catbox.moe/uo8zv2.warps' },
    acidex_blood_pack: { title: 'acidex blood pack ig', sprite: 'acidex blood pack ig', url: 'https://files.catbox.moe/xm734w.warps' }
  };
  const DEFAULT_PACK = 'splunko_bloodpack';
  const JSZIP_URI = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';

  const PACK_MIMES = {
    svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
    gif: 'image/gif', webp: 'image/webp', bmp: 'image/bmp'
  };

  const packCache = {};
  let packKey = DEFAULT_PACK;
  const packEls = {};
  const packState = { index: 0 };

  function packEntry(key) {
    if (!packCache[key]) packCache[key] = { raw: null, costumes: null, blocks: null, loading: null };
    return packCache[key];
  }

  function loadJSZip() {
    return new Promise((resolve, reject) => {
      if (window.JSZip) return resolve();
      const s = document.createElement('script');
      s.src = JSZIP_URI;
      s.onload = resolve;
      s.onerror = () => reject(new Error('could not load JSZip'));
      document.head.appendChild(s);
    });
  }

  async function fetchPack(key) {
    const entry = packEntry(key);
    if (entry.raw) return entry.raw;
    const res = await fetch(PACKS[key].url);
    if (!res.ok) throw new Error('pack HTTP ' + res.status);
    entry.raw = await res.arrayBuffer();
    return entry.raw;
  }

  async function inspectPack(key) {
    const entry = packEntry(key);
    if (entry.costumes) return entry;
    if (entry.loading) return entry.loading;

    entry.loading = (async () => {
      const raw = await fetchPack(key);
      await loadJSZip();
      const zip = await window.JSZip.loadAsync(raw).catch(() => null);
      if (!zip) throw new Error('pack is not a zip archive');

      let data = null;
      const spriteFile = zip.file('sprite.json');
      const projectFile = zip.file('project.json');
      if (spriteFile) {
        data = JSON.parse(await spriteFile.async('string'));
      } else if (projectFile) {
        const proj = JSON.parse(await projectFile.async('string'));
        data = (proj.targets || []).find(t => !t.isStage) || null;
      }
      if (!data) throw new Error('no sprite data found in the pack');

      const costumes = [];
      for (const c of data.costumes || []) {
        const md5ext = c.md5ext || (c.assetId + '.' + c.dataFormat);
        const file = zip.file(md5ext);
        if (!file) continue;
        const bytes = new Uint8Array(await file.async('uint8array'));
        const format = String(c.dataFormat || md5ext.split('.').pop() || '').toLowerCase();
        const mime = PACK_MIMES[format] || 'application/octet-stream';
        const previewUrl = URL.createObjectURL(new Blob([bytes], { type: mime }));
        costumes.push({
          name: c.name || 'costume',
          md5ext,
          bytes,
          format,
          previewUrl,
          bitmapResolution: c.bitmapResolution || 1,
          rotationCenterX: c.rotationCenterX || 0,
          rotationCenterY: c.rotationCenterY || 0
        });
      }
      if (!costumes.length) throw new Error('no costumes found in the pack');

      entry.costumes = costumes;
      entry.blocks = data.blocks || {};
      return entry;
    })();

    try {
      return await entry.loading;
    } finally {
      entry.loading = null;
    }
  }

  async function addCostumesTo(targetId, costumes) {
    const vm = Scratch.vm;
    const { AssetType, createAsset } = vm.runtime.storage;
    for (const c of costumes) {
      const isVector = c.format === 'svg';
      const asset = createAsset(isVector ? AssetType.ImageVector : AssetType.ImageBitmap,
        c.format, new Uint8Array(c.bytes), null, true);
      const md5ext = asset.assetId + '.' + asset.dataFormat;
      await vm.addCostume(md5ext, {
        asset, md5ext, assetId: asset.assetId, dataFormat: asset.dataFormat,
        name: c.name, bitmapResolution: c.bitmapResolution,
        rotationCenterX: c.rotationCenterX, rotationCenterY: c.rotationCenterY
      }, targetId);
    }
  }

  async function addWholeSprite(key) {
    const raw = await fetchPack(key);
    await Scratch.vm.addSprite(raw.slice(0));
  }

  function buildPackWindow() {
    if (packPanel) packPanel.remove();

    packPanel = el('div', {
      flex: '1', minHeight: '0', display: 'none', flexDirection: 'column', gap: '8px',
      boxSizing: 'border-box'
    });

    packEls.title = el('div', { fontSize: '15px', fontWeight: '700', flexShrink: '0' }, '');

    const previewBox = el('div', {
      flex: '1', minHeight: '0', border: '1.5px dashed #555', borderRadius: '8px',
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
    });
    packEls.img = el('img', { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' });
    previewBox.append(packEls.img);

    const nav = el('div', { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', flexShrink: '0' });
    packEls.prev = button('<', () => goPackPage(packState.index - 1));
    packEls.counter = el('span', { fontSize: '13px', fontWeight: '700' }, '');
    packEls.next = button('>', () => goPackPage(packState.index + 1));
    nav.append(packEls.prev, packEls.counter, packEls.next);

    packEls.label = el('div', { fontSize: '11px', opacity: '0.7', wordBreak: 'break-all', flexShrink: '0' }, '');

    const actions = el('div', { display: 'flex', gap: '6px', flexWrap: 'wrap', flexShrink: '0' });
    actions.append(
      button('Add selected costume', () => runPackAction(async () => {
        const c = packCache[packKey].costumes[packState.index];
        await addCostumesTo(Scratch.vm.editingTarget.id, [c]);
        return `added ${c.name} to ${Scratch.vm.editingTarget.getName()}`;
      })),
      button('Add all costumes', () => runPackAction(async () => {
        const all = packCache[packKey].costumes;
        await addCostumesTo(Scratch.vm.editingTarget.id, all);
        return `added ${all.length} costumes to ${Scratch.vm.editingTarget.getName()}`;
      })),
      button('Add as new sprite', () => runPackAction(async () => {
        await addWholeSprite(packKey);
        return `created sprite "${PACKS[packKey].sprite}"`;
      })),
      button('Download', () => runPackAction(async () => {
        const key = packKey;
        const raw = await fetchPack(key);
        const url = URL.createObjectURL(new Blob([raw]));
        const a = document.createElement('a');
        a.href = url;
        a.download = PACKS[key].title + '.warps';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        return 'downloaded ' + PACKS[key].title + '.warps';
      }))
    );

    packEls.status = el('div', { fontSize: '11px', opacity: '0.7', flexShrink: '0', minHeight: '14px' }, '');

    packPanel.append(packEls.title, previewBox, nav, packEls.label, actions, packEls.status);
    mainBody.append(packPanel);
  }

  function goPackPage(i) {
    const entry = packCache[packKey];
    const n = entry && entry.costumes ? entry.costumes.length : 0;
    if (!n || i < 0 || i >= n) return;
    packState.index = i;
    renderPackPage();
  }

  function renderPackPage() {
    const entry = packCache[packKey];
    if (!entry || !entry.costumes) return;
    const c = entry.costumes[packState.index];
    packEls.img.src = c.previewUrl;
    packEls.counter.textContent = `< ${packState.index + 1} / ${entry.costumes.length} >`;
    packEls.label.textContent = c.name;
    packEls.prev.disabled = packState.index === 0;
    packEls.next.disabled = packState.index === entry.costumes.length - 1;
  }

  async function runPackAction(job) {
    const entry = packCache[packKey];
    if (!entry || !entry.costumes) return;
    if (!Scratch.vm.editingTarget) {
      packEls.status.textContent = 'no sprite selected';
      return;
    }
    packEls.status.textContent = 'working...';
    try {
      packEls.status.textContent = await job();
    } catch (e) {
      console.error('[sprunkassets] pack action failed:', e);
      packEls.status.textContent = 'error: ' + (e.message || e);
    }
  }

  function showPackPanel() {
    [warningBanner, articleLabel, list, pager, status, stage].forEach(e => {
      if (e) e.style.display = 'none';
    });
    packPanel.style.display = 'flex';
  }

  function hidePackPanel() {
    if (packPanel) packPanel.style.display = 'none';
    if (warningBanner) warningBanner.style.display = 'block';
    if (articleLabel) articleLabel.style.display = 'block';
    if (list) list.style.display = 'flex';
    if (status) status.style.display = 'block';
  }

  async function openPackWindow(key) {
    packKey = key;
    showWindow();
    if (!packPanel || !mainBody.contains(packPanel)) buildPackWindow();
    showPackPanel();
    packEls.title.textContent = PACKS[key].title;
    packEls.counter.textContent = '';
    packEls.label.textContent = '';
    packEls.img.removeAttribute('src');
    packEls.status.textContent = 'loading pack...';

    try {
      await inspectPack(key);
      if (packKey !== key) return;
      const entry = packCache[key];
      packState.index = 0;
      packEls.status.textContent = `${entry.costumes.length} costumes loaded`;
      renderPackPage();
    } catch (e) {
      console.error('[sprunkassets] pack load failed:', e);
      if (packKey === key) packEls.status.textContent = 'error: ' + (e.message || e);
    }
  }

  const LOGO_W = 800;
  const LOGO_H = 400;
  const OPENTYPE_URI = 'https://cdnjs.cloudflare.com/ajax/libs/opentype.js/1.3.4/opentype.min.js';

  const HOSTED_FONTS = [
    { name: 'Serif', url: 'https://zxdemon4.github.io/serif.otf' },
    { name: 'Technological', url: 'https://zxdemon4.github.io/8d83d454d2c42614a203322393c23a5b.ttf' },
    { name: 'Pixel', url: 'https://zxdemon4.github.io/87a3a62c0627e925b92d3ede2f62b04f.ttf' },
    { name: 'Arcade', url: 'https://zxdemon4.github.io/74496d9086d97aaeeafb3085e9957668.ttf' },
    { name: 'Handwriting', url: 'https://zxdemon4.github.io/64bcfe1f13fce38e2ea26280157ff2ce.ttf' },
    { name: 'Playful', url: 'https://zxdemon4.github.io/5f46c8dc3b8cc2296eb73f013dfce3db.ttf' },
    { name: 'Archivo', url: 'https://zxdemon4.github.io/4c768843c9fa6593074231cd762b83f8.ttf' },
    { name: 'Archivo Black', url: 'https://zxdemon4.github.io/48d66af328a669a1c84c5dc87a4e9a3b.ttf' },
    { name: 'Bits and Bytes', url: 'https://zxdemon4.github.io/368c582b289e75a3c5299e954c2ad735.ttf' },
    { name: 'Marker', url: 'https://zxdemon4.github.io/3682b35e452a7f4a5a61167d1632e24a.ttf' },
    { name: 'Branches', url: 'https://zxdemon4.github.io/bb59f04e7f0aabe8e142ac1607a03dd6.otf' },
    { name: 'Sans Serif', url: 'https://zxdemon4.github.io/9ec3449723269a806ec6eaba0f8f6cef.ttf' }
  ].map(f => ({ ...f, family: 'sk-' + f.name, kind: 'hosted' }));

  const GOOGLE_FONTS = [
    { name: 'Allan', family: 'Allan', kind: 'google' },
    { name: 'Rubik', family: 'Rubik', kind: 'google' },
    { name: '中文', family: 'Noto Sans SC', kind: 'google' },
    { name: 'Nunito', family: 'Nunito', kind: 'google' },
    { name: 'Inter', family: 'Inter', kind: 'google' }
  ];

  const LOGO_FONTS = [...HOSTED_FONTS, ...GOOGLE_FONTS];

  const SEP_PALETTE = ['#ff3b30', '#ff9500', '#ffcc00', '#34c759', '#00c7be', '#007aff', '#af52de', '#ff2d55'];
  const INPUT_CSS = {
    background: '#141416', color: '#ffffff', border: '1.5px solid #ffffff', borderRadius: '6px',
    padding: '4px 8px', fontSize: '12px', fontFamily: "'Rubik', sans-serif",
    boxSizing: 'border-box', width: '100%', outline: 'none'
  };

  const customFonts = [];
  const parsedFontCache = {};
  const googleLoaded = new Set();
  const measureCtx = document.createElement('canvas').getContext('2d');

  const logo = {
    text: 'SPRUNKI',
    font: 'Allan',
    colorMode: 'all',
    color: '#ffffff',
    bg: '#000000',
    sep: [],
    stops: [{ pos: 0, color: '#ff0000' }, { pos: 100, color: '#8000ff' }],
    outline: { on: false, color: '#000000', opacity: 1, width: 2 },
    bold: false,
    italic: false,
    glow: false,
    blur: false,
    selected: -1,
    letters: [],
    devtools: false,
    devSide: false
  };
  let logoWin = null;
  const logoEls = {};
  let fontToken = 0;
  let letterDrag = null;

  function defaultLetter() {
    return {
      rot: 0, scaleX: 1, scaleY: 1, font: '', dx: 0, dy: 0,
      glow: false, blur: false, blurAmt: 3,
      outline: false, outlineColor: '#000000', outlineOpacity: 1, outlineWidth: 2
    };
  }

  function syncLetters() {
    const n = [...logo.text].length;
    while (logo.letters.length < n) logo.letters.push(defaultLetter());
    if (logo.letters.length > n) logo.letters.length = n;
    if (logo.selected >= n) logo.selected = n ? n - 1 : -1;
  }

  function letterAt(i) {
    syncLetters();
    return logo.letters[i] || defaultLetter();
  }

  function allLogoFonts() { return [...LOGO_FONTS, ...customFonts]; }
  function fontByFamily(family) { return allLogoFonts().find(f => f.family === family || f.name === family) || LOGO_FONTS[0]; }
  function cssFamily(family) { return family === 'serif' || family === 'sans-serif' ? family : `"${family}"`; }
  function sepColor(i) { return logo.sep[i] || SEP_PALETTE[i % SEP_PALETTE.length]; }
  function sortedStops() { return [...logo.stops].sort((a, b) => a.pos - b.pos); }
  function googleParam(family) { return encodeURIComponent(family).replace(/%20/g, '+'); }

  function loadOpenType() {
    return new Promise((resolve, reject) => {
      if (window.opentype) return resolve(window.opentype);
      const s = document.createElement('script');
      s.src = OPENTYPE_URI;
      s.onload = () => resolve(window.opentype);
      s.onerror = () => reject(new Error('could not load opentype.js'));
      document.head.appendChild(s);
    });
  }

  function ensureGoogleFont(family) {
    if (googleLoaded.has(family)) return;
    googleLoaded.add(family);
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${googleParam(family)}:ital,wght@0,400;0,700;1,400;1,700&display=swap`;
    document.head.appendChild(link);
  }

  const hostedBuffers = {};
  let hostedReady = null;

  function addPreconnect() {
    ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'].forEach(href => {
      if (document.querySelector(`link[rel="preconnect"][href="${href}"]`)) return;
      const l = document.createElement('link');
      l.rel = 'preconnect';
      l.href = href;
      l.crossOrigin = 'anonymous';
      document.head.appendChild(l);
    });
  }

  function startHostedFonts() {
    if (hostedReady) return hostedReady;
    addPreconnect();
    loadOpenType().catch(() => {});
    hostedReady = Promise.allSettled(HOSTED_FONTS.map(async f => {
      const buf = await (await fetch(f.url)).arrayBuffer();
      hostedBuffers[f.family] = buf;
      const face = new FontFace(f.family, buf.slice(0));
      await face.load();
      document.fonts.add(face);
    }));
    return hostedReady;
  }

  async function ensureFontReady(family) {
    const f = fontByFamily(family);
    if (f.kind === 'google') {
      ensureGoogleFont(f.family);
    } else {
      await startHostedFonts();
    }
    try { await document.fonts.load(`64px ${cssFamily(f.family)}`); } catch (e) { /* fallback font */ }
  }

  async function getParsedOpenTypeFont(f) {
    if (parsedFontCache[f.family] !== undefined) return parsedFontCache[f.family];
    if (f.kind === 'google') return null;
    try {
      await startHostedFonts();
      const buf = f.kind === 'hosted' ? hostedBuffers[f.family] : f.rawBuffer;
      if (!buf) {
        parsedFontCache[f.family] = null;
        return null;
      }
      const ot = await loadOpenType();
      const parsed = ot.parse(buf.slice(0));
      parsedFontCache[f.family] = parsed;
      return parsed;
    } catch (e) {
      console.warn('[sprunkassets] opentype parse failed:', e);
      parsedFontCache[f.family] = null;
      return null;
    }
  }

  function familyFromGoogleLink(text) {
    const s = String(text || '').trim();
    if (!s) return '';
    const m = s.match(/family=([^:&]+)/i);
    let raw = m ? m[1] : s;
    try { raw = decodeURIComponent(raw); } catch (e) { /* keep as typed */ }
    return raw.replace(/\+/g, ' ').trim();
  }

  function addGoogleFont(text) {
    const family = familyFromGoogleLink(text);
    if (!family) return null;
    if (!allLogoFonts().some(f => f.family === family)) {
      customFonts.push({ name: family, family, googleName: family, kind: 'google' });
    }
    return family;
  }

  async function importFontFile(file) {
    const buf = await file.arrayBuffer();
    const family = 'sprunk-font-' + Math.random().toString(36).slice(2, 8);
    const face = new FontFace(family, buf);
    await face.load();
    document.fonts.add(face);
    customFonts.push({
      name: file.name.replace(/\.[^.]+$/, ''),
      family,
      kind: 'file',
      rawBuffer: buf
    });
    logo.font = family;
  }

  function fontCss(size, fam) {
    const style = logo.italic ? 'italic' : 'normal';
    const weight = logo.bold ? '700' : '400';
    return `${style} ${weight} ${size}px ${fam}`;
  }

  function famForLetter(i) {
    const lt = letterAt(i);
    if (lt.font) {
      const f = fontByFamily(lt.font);
      return cssFamily(f.family);
    }
    return cssFamily(fontByFamily(logo.font).family);
  }

  function logoLines() {
    return String(logo.text ?? '').split('\n');
  }

  function grp() {
    if (!logo.group) logo.group = { ox: 0, oy: 0, sx: 1, sy: 1, rot: 0, tx: 0, ty: 0 };
    return logo.group;
  }

  function normRot(r) {
    return ((r + 180) % 360 + 360) % 360 - 180;
  }

  function layoutPt(p, g) {
    const vx = (p.x - LOGO_W / 2) * g.sx, vy = (p.y - LOGO_H / 2) * g.sy;
    const s = skewFwd(vx, vy, g.tx || 0, g.ty || 0);
    const r = g.rot * Math.PI / 180;
    return {
      x: LOGO_W / 2 + s.x * Math.cos(r) - s.y * Math.sin(r),
      y: LOGO_H / 2 + s.x * Math.sin(r) + s.y * Math.cos(r)
    };
  }

  function layoutToCanvas(p) {
    const g = grp();
    const q = layoutPt(p, g);
    return { x: q.x + g.ox, y: q.y + g.oy };
  }

  function canvasToLayout(p) {
    const g = grp();
    const ux = p.x - LOGO_W / 2 - g.ox, uy = p.y - LOGO_H / 2 - g.oy;
    const r = -g.rot * Math.PI / 180;
    const rx = ux * Math.cos(r) - uy * Math.sin(r), ry = ux * Math.sin(r) + uy * Math.cos(r);
    const k = skewInv(rx, ry, g.tx || 0, g.ty || 0);
    return { x: LOGO_W / 2 + k.x / (g.sx || 1), y: LOGO_H / 2 + k.y / (g.sy || 1) };
  }

  function applyGroupXform(ctx) {
    const g = grp();
    ctx.translate(g.ox, g.oy);
    ctx.translate(LOGO_W / 2, LOGO_H / 2);
    ctx.rotate(g.rot * Math.PI / 180);
    ctx.transform(1, g.ty || 0, g.tx || 0, 1, 0, 0);
    ctx.scale(g.sx, g.sy);
    ctx.translate(-LOGO_W / 2, -LOGO_H / 2);
  }

  function logoGroupBox(L) {
    const g = grp();
    const c = layoutToCanvas(L.c0);
    return { cx: c.x, cy: c.y, w: L.w0 * g.sx, h: L.h0 * g.sy, rot: g.rot, tx: g.tx || 0, ty: g.ty || 0 };
  }

  function letterCanvasBox(L, p) {
    const g = grp();
    const c = layoutToCanvas({ x: p.cx, y: p.cy });
    return {
      cx: c.x, cy: c.y,
      w: p.w * p.scaleX * g.sx, h: p.h * p.scaleY * g.sy,
      rot: g.rot + p.rot, tx: g.tx || 0, ty: g.ty || 0
    };
  }

  function currentLogoBox(L) {
    if (logo.devtools) {
      const p = L.pos[logo.selected];
      return p ? { box: letterCanvasBox(L, p), letter: logo.selected } : null;
    }
    return { box: logoGroupBox(L), letter: -1 };
  }

  function logoScale() {
    return unitsPerPx(logoEls.canvas, LOGO_W);
  }

  function drawLogoHandles(ctx, L) {
    const cur = currentLogoBox(L);
    if (cur) drawBoxHandles(ctx, cur.box, logoScale());
  }

  function setGroupCenter(L, cx, cy) {
    const g = grp();
    g.ox = 0;
    g.oy = 0;
    const base = layoutToCanvas(L.c0);
    g.ox = cx - base.x;
    g.oy = cy - base.y;
  }

  function applyGroupBox(L, nb) {
    const g = grp();
    g.sx = Math.max(MIN_BOX, nb.w) / L.w0;
    g.sy = Math.max(MIN_BOX, nb.h) / L.h0;
    g.rot = nb.rot;
    g.tx = nb.tx || 0;
    g.ty = nb.ty || 0;
    setGroupCenter(L, nb.cx, nb.cy);
  }

  function applyLetterBox(L, idx, nb) {
    const g = grp();
    const p = L.pos[idx];
    const lt = letterAt(idx);
    const lc = canvasToLayout({ x: nb.cx, y: nb.cy });
    lt.scaleX = Math.max(MIN_BOX, nb.w) / (p.w * g.sx);
    lt.scaleY = Math.max(MIN_BOX, nb.h) / (p.h * g.sy);
    lt.rot = normRot(nb.rot - g.rot);
    lt.dx = lc.x - p.bcx;
    lt.dy = lc.y - p.bcy;
    fillLetterControls();
  }

  function computeLogoLayout() {
    syncLetters();
    const ctx = measureCtx;
    const lines = logoLines();
    const baseFam = cssFamily(fontByFamily(logo.font).family);
    const REF = 200;
    let widest = 1;
    lines.forEach(line => {
      ctx.font = fontCss(REF, baseFam);
      const w = ctx.measureText(line || ' ').width || REF * 0.5;
      if (w > widest) widest = w;
    });
    const size = REF * Math.min(1, (LOGO_W * 0.85) / widest);
    const lineGap = size * 0.15;
    const lineHeight = size * 0.95 + lineGap;
    const totalH = lines.length * lineHeight - lineGap;
    const startY = LOGO_H / 2 - totalH / 2 + size * 0.72;

    const pos = [];
    let globalIdx = 0;
    lines.forEach((line, li) => {
      const chars = [...line];
      let lineWidth = 0;
      chars.forEach((ch, ci) => {
        ctx.font = fontCss(size, famForLetter(globalIdx + ci));
        lineWidth += ctx.measureText(ch).width || size * 0.5;
      });
      let cursor = (LOGO_W - lineWidth) / 2;
      const yBase = startY + li * lineHeight;
      chars.forEach((ch, ci) => {
        const gi = globalIdx + ci;
        const fam = famForLetter(gi);
        ctx.font = fontCss(size, fam);
        const w = ctx.measureText(ch).width || size * 0.5;
        const lt = letterAt(gi);
        const bcx = cursor + w / 2;
        cursor += w;
        const bcy = yBase - size * 0.37;
        pos.push({
          ch, i: gi, w, h: size * 0.8, bcx, bcy,
          cx: bcx + (lt.dx || 0), cy: bcy + (lt.dy || 0),
          rot: lt.rot || 0,
          scaleX: lt.scaleX == null ? 1 : lt.scaleX,
          scaleY: lt.scaleY == null ? 1 : lt.scaleY,
          fam
        });
      });
      globalIdx += line.length;
    });

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    pos.forEach(p => {
      minX = Math.min(minX, p.cx - p.w / 2); maxX = Math.max(maxX, p.cx + p.w / 2);
      minY = Math.min(minY, p.cy - p.h / 2); maxY = Math.max(maxY, p.cy + p.h / 2);
    });
    if (!pos.length) { minX = 0; maxX = LOGO_W; minY = 0; maxY = LOGO_H; }
    return {
      size, lineHeight, pos,
      c0: { x: (minX + maxX) / 2, y: (minY + maxY) / 2 },
      w0: Math.max(1, maxX - minX),
      h0: Math.max(1, maxY - minY)
    };
  }

  function drawOneLetter(ctx, p, L, fillStyle) {
    const lt = letterAt(p.i);
    const useGlow = !!(logo.glow || lt.glow);
    const useBlur = !!(logo.blur || lt.blur);
    const blurAmt = lt.blur ? Math.max(0, Number(lt.blurAmt) || 3) : (logo.blur ? 3 : 0);
    const strokeOn = !!(lt.outline || logo.outline.on);
    const oColor = lt.outline ? (lt.outlineColor || '#000000') : logo.outline.color;
    const oOp = lt.outline ? (lt.outlineOpacity == null ? 1 : Number(lt.outlineOpacity)) : logo.outline.opacity;
    const oW = lt.outline ? (Number(lt.outlineWidth) || 2) : logo.outline.width;

    ctx.save();
    ctx.font = fontCss(L.size, p.fam);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.miterLimit = 2;
    if (useBlur && blurAmt > 0) ctx.filter = `blur(${blurAmt}px)`;
    if (useGlow) {
      ctx.shadowColor = logo.colorMode === 'all' ? logo.color : '#ffffff';
      ctx.shadowBlur = 28;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }

    ctx.translate(p.cx, p.cy);
    ctx.rotate((p.rot * Math.PI) / 180);
    ctx.scale(p.scaleX, p.scaleY);
    ctx.translate(-p.w / 2, L.size * 0.37);

    if (strokeOn && oW > 0) {
      ctx.save();
      ctx.globalAlpha = oOp;
      ctx.strokeStyle = oColor;
      ctx.lineWidth = oW * 2;
      ctx.strokeText(p.ch, 0, 0);
      ctx.restore();
    }

    ctx.fillStyle = typeof fillStyle === 'function' ? fillStyle(p) : fillStyle;
    ctx.fillText(p.ch, 0, 0);
    ctx.restore();
  }

  function drawLogoCanvas(opts) {
    if (!logoEls.ctx) return;
    const forExport = !!(opts && opts.export);
    const ctx = logoEls.ctx;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, LOGO_W, LOGO_H);
    if (!forExport) {
      ctx.fillStyle = logo.bg || '#000000';
      ctx.fillRect(0, 0, LOGO_W, LOGO_H);
    }
    if (!logo.text) return;

    const L = computeLogoLayout();
    ctx.save();
    applyGroupXform(ctx);
    if (logo.colorMode === 'gradient') {
      const x0 = L.c0.x - L.w0 / 2, x1 = L.c0.x + L.w0 / 2;
      const gradFor = p => {
        const ox = p.cx - p.w / 2;
        const gr = ctx.createLinearGradient(x0 - ox, 0, x1 - ox, 0);
        sortedStops().forEach(s => gr.addColorStop(s.pos / 100, s.color));
        return gr;
      };
      L.pos.forEach(p => drawOneLetter(ctx, p, L, gradFor));
    } else {
      L.pos.forEach((p, i) => drawOneLetter(ctx, p, L, logo.colorMode === 'separate' ? sepColor(i) : logo.color));
    }
    ctx.restore();

    if (!forExport) drawLogoHandles(ctx, L);
  }

  function hitTestLetter(L, mx, my) {
    for (let i = L.pos.length - 1; i >= 0; i--) {
      if (pointInBox(letterCanvasBox(L, L.pos[i]), mx, my)) return i;
    }
    return -1;
  }

  async function buildLogoSvg(scale = 1) {
    const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const L = computeLogoLayout();
    const g = grp();
    const strokeW = logo.outline.on && logo.outline.width > 0 ? logo.outline.width * 2 : 0;
    const strokeAttrs = strokeW > 0
      ? ` stroke="${logo.outline.color}" stroke-opacity="${logo.outline.opacity}" stroke-width="${strokeW}" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="2" paint-order="stroke fill"`
      : '';

    const defs = [];
    const parts = [];
    const x0 = L.c0.x - L.w0 / 2, x1 = L.c0.x + L.w0 / 2;
    for (let i = 0; i < L.pos.length; i++) {
      const p = L.pos[i];
      let fill;
      if (logo.colorMode === 'separate') {
        fill = sepColor(i);
      } else if (logo.colorMode === 'gradient') {
        const ox = p.cx - p.w / 2;
        const stops = sortedStops().map(s => `<stop offset="${s.pos / 100}" stop-color="${s.color}"/>`).join('');
        defs.push(`<linearGradient id="lg${i}" gradientUnits="userSpaceOnUse" x1="${x0 - ox}" y1="0" x2="${x1 - ox}" y2="0">${stops}</linearGradient>`);
        fill = `url(#lg${i})`;
      } else {
        fill = logo.color;
      }
      const transform = `translate(${p.cx} ${p.cy}) rotate(${p.rot}) scale(${p.scaleX} ${p.scaleY}) translate(${-p.w / 2} ${L.size * 0.37})`;

      let pathD = '';
      try {
        const famKey = letterAt(i).font || logo.font;
        const ot = await getParsedOpenTypeFont(fontByFamily(famKey));
        if (ot) pathD = ot.getPath(p.ch, 0, 0, L.size).toPathData(2) || '';
      } catch (e) { /* fall back to text */ }

      if (pathD) {
        parts.push(`<g transform="${transform}"><path d="${pathD}" fill="${fill}"${strokeAttrs}/></g>`);
      } else {
        const fam = esc(p.fam.replace(/"/g, ''));
        parts.push(
          `<g transform="${transform}"><text x="0" y="0" font-family="${fam}" font-size="${L.size}" ` +
          `font-weight="${logo.bold ? '700' : '400'}" font-style="${logo.italic ? 'italic' : 'normal'}" ` +
          `xml:space="preserve" fill="${fill}"${strokeAttrs}>${esc(p.ch)}</text></g>`
        );
      }
    }

    const groupT = `translate(${g.ox} ${g.oy}) translate(${LOGO_W / 2} ${LOGO_H / 2}) rotate(${g.rot}) matrix(1 ${g.ty || 0} ${g.tx || 0} 1 0 0) scale(${g.sx} ${g.sy}) translate(${-LOGO_W / 2} ${-LOGO_H / 2})`;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${LOGO_W * scale}" height="${LOGO_H * scale}" viewBox="0 0 ${LOGO_W} ${LOGO_H}">` +
      (defs.length ? `<defs>${defs.join('')}</defs>` : '') +
      `<g transform="${groupT}">${parts.join('')}</g></svg>`;
  }

  function saveBlob(blob, name) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function logoFileBase() {
    return (logo.text || 'logo').replace(/[\\/:*?"<>|]/g, '').slice(0, 40) || 'logo';
  }

  function canvasBlob() {
    return new Promise((res, rej) => {
      logoEls.canvas.toBlob(b => (b ? res(b) : rej(new Error('could not make the png'))), 'image/png');
    });
  }

  const logoLog = [];

  let creationsPanel = null;
  let creationsOpen = false;

  function renderCreations() {
    if (!creationsPanel) return;
    const listBox = creationsPanel.querySelector('.sa-creations-list');
    const countEl = creationsPanel.querySelector('.sa-creations-count');
    listBox.textContent = '';
    countEl.textContent = logoLog.length ? `${logoLog.length} saved` : 'nothing yet';

    if (!logoLog.length) {
      listBox.append(el('div', { fontSize: '11px', opacity: '0.6', padding: '6px' },
        'logos you download or add to a sprite appear here'));
      return;
    }

    logoLog.forEach(item => {
      const row = el('div', {
        display: 'flex', alignItems: 'center', gap: '8px', padding: '4px',
        border: '1px solid #333', borderRadius: '6px'
      });
      const thumb = el('img', {
        width: '64px', height: '32px', objectFit: 'contain',
        background: '#111', borderRadius: '4px', flexShrink: '0'
      });
      thumb.src = item.dataUrl;
      const meta = el('div', { flex: '1', minWidth: '0' });
      meta.append(
        el('div', { fontSize: '11px', fontWeight: '700', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }, item.name),
        el('div', { fontSize: '10px', opacity: '0.6' }, `${item.kind.toUpperCase()} · ${item.action} · ${new Date(item.time).toLocaleTimeString()}`)
      );
      const del = button('×', () => {
        const idx = logoLog.findIndex(x => x.id === item.id);
        if (idx >= 0) logoLog.splice(idx, 1);
        renderCreations();
      });
      row.append(thumb, meta, del);
      listBox.appendChild(row);
    });
  }

function buildCreationsPanel() {
  if (creationsPanel) return;
  creationsPanel = el('div', {
    position: 'fixed', top: '120px', left: '700px', width: '300px', maxHeight: '420px',
    background: '#000', border: '2px solid #fff', borderRadius: '8px', zIndex: '999999',
    display: 'none', flexDirection: 'column', overflow: 'hidden',
    fontFamily: "'Rubik', sans-serif", color: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.75)'
  });
  creationsPanel.className = 'sa-float';
  creationsPanel.id = 'sa-creations';
  const head = el('div', {
    background: '#141416', padding: '6px 10px', display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', borderBottom: '1px solid #333', flexShrink: '0'
  });
  head.append(
    el('span', { fontSize: '13px', fontWeight: '700' }, 'my creations'),
    button('clear all', () => { logoLog.length = 0; renderCreations(); })
  );
  const countEl = el('div', { fontSize: '11px', opacity: '0.7', padding: '4px 10px' }, '');
  countEl.className = 'sa-creations-count';
  const listBox = el('div', {
    flex: '1', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px', padding: '8px', minHeight: '0'
  });
  listBox.className = 'sa-creations-list';
  creationsPanel.append(head, countEl, listBox);
  document.body.appendChild(creationsPanel);
}

  function toggleCreations() {
    buildCreationsPanel();
    creationsOpen = !creationsOpen;
    creationsPanel.style.display = creationsOpen ? 'flex' : 'none';
    if (creationsOpen) renderCreations();
  }

  async function captureLogoDataUrl(kind) {
    if (kind === 'svg') {
      const svg = await buildLogoSvg(1);
      return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }
    drawLogoCanvas({ export: true });
    const blob = await canvasBlob();
    scheduleRedraw();
    return await new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.onerror = () => rej(new Error('could not read logo'));
      r.readAsDataURL(blob);
    });
  }

  async function logLogoExport(kind, action) {
    try {
      const dataUrl = await captureLogoDataUrl(kind);
      logoLog.unshift({
        id: Date.now() + '-' + Math.random().toString(36).slice(2, 7),
        name: logoFileBase(),
        kind,
        action,
        dataUrl,
        time: Date.now()
      });
      if (logoLog.length > 40) logoLog.length = 40;
      if (creationsOpen) renderCreations();
    } catch (e) {
      console.warn('[sprunkassets] logo log failed:', e);
    }
  }

  async function downloadLogo(kind) {
    if (kind === 'svg') {
      if (!canExportSvg()) throw new Error('SVG only works with the built-in hosted fonts');
      await logLogoExport('svg', 'download');
      saveBlob(new Blob([await buildLogoSvg(1)], { type: 'image/svg+xml' }), logoFileBase() + '.svg');
      return 'downloaded ' + logoFileBase() + '.svg';
    }
    await logLogoExport('png', 'download');
    drawLogoCanvas({ export: true });
    saveBlob(await canvasBlob(), logoFileBase() + '.png');
    scheduleRedraw();
    return 'downloaded ' + logoFileBase() + '.png';
  }

  async function addLogoToSprite(kind) {
    const target = Scratch.vm.editingTarget;
    if (!target) throw new Error('no sprite selected');
    const { AssetType, createAsset } = Scratch.vm.runtime.storage;
    let asset, bitmapResolution, rotX, rotY;
    if (kind === 'svg') {
      if (!canExportSvg()) throw new Error('SVG only works with the built-in hosted fonts');
      await logLogoExport('svg', 'sprite');
      const svg = await buildLogoSvg(0.5);
      asset = createAsset(AssetType.ImageVector, 'svg', new TextEncoder().encode(svg), null, true);
      bitmapResolution = 1;
      rotX = (LOGO_W * 0.5) / 2;
      rotY = (LOGO_H * 0.5) / 2;
    } else {
      await logLogoExport('png', 'sprite');
      drawLogoCanvas({ export: true });
      const bytes = new Uint8Array(await (await canvasBlob()).arrayBuffer());
      scheduleRedraw();
      asset = createAsset(AssetType.ImageBitmap, 'png', bytes, null, true);
      bitmapResolution = 2;
      rotX = LOGO_W / 2;
      rotY = LOGO_H / 2;
    }
    const md5ext = asset.assetId + '.' + asset.dataFormat;
    await Scratch.vm.addCostume(md5ext, {
      asset, md5ext, assetId: asset.assetId, dataFormat: asset.dataFormat,
      name: logoFileBase(), bitmapResolution,
      rotationCenterX: rotX, rotationCenterY: rotY
    }, target.id);
    return `added ${logoFileBase()} to ${target.getName()}`;
  }

  function setLogoStatus(msg) {
    if (logoEls.status) logoEls.status.textContent = msg || '';
  }

  function hasGlowOrBlur() {
    if (logo.glow || logo.blur) return true;
    syncLetters();
    return logo.letters.some(lt => lt.glow || lt.blur);
  }

  function canExportSvg() {
    if (hasGlowOrBlur()) return false;
    const f = fontByFamily(logo.font);
    return f && (f.kind === 'hosted' || (f.kind === 'file' && !!f.rawBuffer));
  }

  function updateSvgButtons() {
    const show = canExportSvg();
    if (logoEls.btnSvg) logoEls.btnSvg.style.display = show ? '' : 'none';
    if (logoEls.btnAddSvg) logoEls.btnAddSvg.style.display = show ? '' : 'none';
  }

  async function runLogoAction(job) {
    setLogoStatus('working...');
    try {
      setLogoStatus(await job());
    } catch (e) {
      console.error('[sprunkassets] logo action failed:', e);
      setLogoStatus('error: ' + (e.message || e));
    }
  }

  let redrawTimer = null;
  function syncLogoSkewInputs() {
    const g = grp();
    if (logoEls.skewXInput && document.activeElement !== logoEls.skewXInput) {
      logoEls.skewXInput.value = String(Math.round((g.tx || 0) * 100));
    }
    if (logoEls.skewYInput && document.activeElement !== logoEls.skewYInput) {
      logoEls.skewYInput.value = String(Math.round((g.ty || 0) * 100));
    }
  }
  function scheduleRedraw() {
    syncLogoSkewInputs();
    if (redrawTimer) return;
    redrawTimer = requestAnimationFrame(() => { redrawTimer = null; drawLogoCanvas(); });
  }

  async function redrawWithFont() {
    const my = ++fontToken;
    await ensureFontReady(logo.font);
    syncLetters();
    for (const lt of logo.letters) {
      if (lt.font) await ensureFontReady(lt.font);
    }
    if (my === fontToken) drawLogoCanvas();
  }

  function field(labelText, control) {
    const wrap = el('div', { display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0' });
    wrap.append(el('div', { fontSize: '12px', fontWeight: '700' }, labelText), control);
    return wrap;
  }

  function textInput(value, onInput) {
    const i = el('input', INPUT_CSS);
    i.type = 'text';
    i.value = value;
    i.addEventListener('input', () => onInput(i.value));
    i.addEventListener('keydown', e => e.stopPropagation());
    return i;
  }

  function numberInput(min, max, value, onInput) {
    const i = el('input', Object.assign({}, INPUT_CSS, { width: '74px', textAlign: 'center', fontWeight: '700' }));
    i.type = 'number';
    i.min = String(min);
    i.max = String(max);
    i.step = '1';
    i.value = String(value);
    i.addEventListener('input', () => {
      const n = Math.max(min, Math.min(max, Number(i.value) || 0));
      onInput(n);
    });
    i.addEventListener('keydown', e => e.stopPropagation());
    return i;
  }

  function makeSelect(items, onChange) {
    const s = el('select', INPUT_CSS);
    items.forEach(it => {
      const o = document.createElement('option');
      o.value = it.value;
      o.textContent = it.text;
      s.appendChild(o);
    });
    s.addEventListener('change', () => onChange(s.value));
    return s;
  }

  function colorInput(value, onInput) {
    const box = el('label', {
      display: 'inline-block',
      width: '38px',
      height: '26px',
      backgroundColor: value,
      border: '1.5px solid #ffffff',
      borderRadius: '4px',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      flexShrink: '0',
      boxSizing: 'border-box'
    });
    const c = document.createElement('input');
    c.type = 'color';
    c.value = value;
    Object.assign(c.style, {
      opacity: '0',
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      cursor: 'pointer',
      border: 'none',
      padding: '0',
      margin: '0'
    });
    c.addEventListener('input', () => {
      box.style.backgroundColor = c.value;
      onInput(c.value);
    });
    box.appendChild(c);
    box.setColor = hex => {
      c.value = hex;
      box.style.backgroundColor = hex;
    };
    return box;
  }

  function rangeInput(min, max, step, value, onInput, css) {
    const r = el('input', Object.assign({ width: '100%', accentColor: '#de5dde', cursor: 'pointer' }, css || {}));
    r.type = 'range';
    r.min = String(min);
    r.max = String(max);
    r.step = String(step);
    r.value = String(value);
    r.addEventListener('input', () => onInput(Number(r.value)));
    return r;
  }

function makeDraggable(handle, target) {
  handle.style.touchAction = 'none';
  let drag = null;
  handle.addEventListener('pointerdown', e => {
    if (e.target.closest('button, a, input, select, textarea, [data-sa-close]')) return;
    const r = target.getBoundingClientRect();
    drag = { dx: e.clientX - r.left, dy: e.clientY - r.top, w: r.width, h: r.height, id: e.pointerId };
    if (handle.setPointerCapture) handle.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  handle.addEventListener('pointermove', e => {
    if (!drag || e.pointerId !== drag.id) return;
    const x = Math.max(0, Math.min(Math.max(0, window.innerWidth - drag.w), e.clientX - drag.dx));
    const y = Math.max(0, Math.min(Math.max(0, window.innerHeight - drag.h), e.clientY - drag.dy));
    target.style.left = x + 'px';
    target.style.top = y + 'px';
    target.style.right = 'auto';
    target.style.bottom = 'auto';
  });
  const end = () => { drag = null; };
  handle.addEventListener('pointerup', end);
  handle.addEventListener('pointercancel', end);
}

  function refreshFontOptions() {
    const sel = logoEls.fontSelect;
    if (!sel) return;
    sel.textContent = '';
    allLogoFonts().forEach(f => {
      const o = document.createElement('option');
      o.value = f.family;
      o.textContent = f.name;
      sel.appendChild(o);
    });
    sel.value = logo.font;
    if (logoEls.fillLtFonts) logoEls.fillLtFonts();
  }

  function applyModeVisibility() {
    logoEls.allSec.style.display = logo.colorMode === 'all' ? 'flex' : 'none';
    logoEls.sepSec.style.display = logo.colorMode === 'separate' ? 'flex' : 'none';
    logoEls.gradSec.style.display = logo.colorMode === 'gradient' ? 'flex' : 'none';
  }

  function rebuildSeparateRows() {
    const box = logoEls.sepRows;
    if (!box) return;
    box.textContent = '';
    const lines = logoLines();
    if (!lines.some(l => l.length)) {
      box.append(el('div', { fontSize: '11px', opacity: '0.6' }, 'type a name to pick colours'));
      return;
    }
    let gi = 0;
    lines.forEach((line, li) => {
      if (lines.length > 1) {
        box.append(el('div', { fontSize: '10px', opacity: '0.5', marginTop: li ? '4px' : '0' }, 'line ' + (li + 1)));
      }
      [...line].forEach((ch, ci) => {
        const i = gi + ci;
        const row = el('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' });
        row.append(
          el('span', { fontSize: '14px', fontWeight: '700' }, ch === ' ' ? '␣' : ch),
          colorInput(sepColor(i), v => { logo.sep[i] = v; scheduleRedraw(); })
        );
        box.appendChild(row);
      });
      gi += line.length;
    });
  }

  function rebuildStopRows() {
    const box = logoEls.stopRows;
    if (!box) return;
    box.textContent = '';
    logo.stops.forEach((s, i) => {
      const row = el('div', { display: 'flex', alignItems: 'center', gap: '6px' });
      const pct = el('span', { fontSize: '11px', minWidth: '36px', textAlign: 'right' }, s.pos + '%');
      const c = colorInput(s.color, v => { s.color = v; scheduleRedraw(); });
      const r = rangeInput(0, 100, 1, s.pos, v => {
        s.pos = v;
        pct.textContent = v + '%';
        scheduleRedraw();
      }, { flex: '1', minWidth: '0' });
      const rm = button('×', () => {
        if (logo.stops.length <= 2) return setLogoStatus('a gradient needs at least 2 points');
        logo.stops.splice(i, 1);
        rebuildStopRows();
        scheduleRedraw();
      });
      row.append(c, r, pct, rm);
      box.appendChild(row);
    });
  }

  function syncLogoControls() {
    logoEls.nameInput.value = logo.text;
    refreshFontOptions();
    logoEls.modeSelect.value = logo.colorMode;
    if (logoEls.allColorSwatch) logoEls.allColorSwatch.setColor(logo.color);
    logoEls.outlineCb.checked = logo.outline.on;
    logoEls.outlineSub.style.display = logo.outline.on ? 'flex' : 'none';
    if (logoEls.outlineColorSwatch) logoEls.outlineColorSwatch.setColor(logo.outline.color);
    if (logoEls.outlineWidthInput) logoEls.outlineWidthInput.value = String(logo.outline.width);
    ['bold', 'italic', 'glow', 'blur'].forEach(k => {
      if (logoEls['style_' + k]) logoEls['style_' + k].paint();
    });
    if (logoEls.bgSwatch) logoEls.bgSwatch.setColor(logo.bg || '#000000');
    rebuildSeparateRows();
    rebuildStopRows();
    applyModeVisibility();
    updateSvgButtons();
    syncDevtoolsPanel();
  }

  function applyDevtoolsLayout() {
    if (!logoWin || !logoEls.devPanel || !logoEls.mainCol || !logoEls.sideCol) return;
    if (logoEls.devSideBtn) {
      logoEls.devSideBtn.style.background = logo.devSide ? '#de5dde' : '#141416';
    }
    if (logo.devtools && logo.devSide) {
      logoWin.style.width = '860px';
      logoWin.style.minWidth = '700px';
      if (logoEls.bodyRow) logoEls.bodyRow.style.flexDirection = 'row';
      logoEls.sideCol.style.display = 'flex';
      logoEls.sideCol.appendChild(logoEls.devPanel);
      logoEls.devPanel.style.display = 'flex';
      logoEls.devPanel.style.flex = '1';
      logoEls.devPanel.style.maxHeight = 'none';
      logoEls.devPanel.style.overflowY = 'auto';
    } else {
      logoWin.style.width = '520px';
      logoWin.style.minWidth = '380px';
      if (logoEls.bodyRow) logoEls.bodyRow.style.flexDirection = 'column';
      logoEls.sideCol.style.display = 'none';
      if (logoEls.devHost) logoEls.devHost.appendChild(logoEls.devPanel);
      logoEls.devPanel.style.display = logo.devtools ? 'flex' : 'none';
      logoEls.devPanel.style.flex = '';
    }
  }

  function syncDevtoolsPanel() {
    if (!logoEls.devPanel) return;
    if (logoEls.devToggleBtn) {
      logoEls.devToggleBtn.style.background = logo.devtools ? '#de5dde' : '#141416';
    }
    applyDevtoolsLayout();
    syncLetters();
    const chars = [...logo.text];
    if (logoEls.letterSelect) {
      const sel = logoEls.letterSelect;
      const prev = logo.selected;
      sel.textContent = '';
      chars.forEach((ch, i) => {
        const o = document.createElement('option');
        o.value = String(i);
        o.textContent = i + ': ' + (ch === ' ' ? '␣' : ch);
        sel.appendChild(o);
      });
      if (prev >= 0 && prev < chars.length) {
        sel.value = String(prev);
        logo.selected = prev;
      } else if (chars.length) {
        logo.selected = 0;
        sel.value = '0';
      } else {
        logo.selected = -1;
      }
    }
    fillLetterControls();
  }

  function fillLetterControls() {
    const i = logo.selected;
    const disabled = i < 0;
    const lt = disabled ? defaultLetter() : letterAt(i);
    const setNum = (el, v) => { if (el) { el.value = String(v); el.disabled = disabled; } };
    setNum(logoEls.ltRot, lt.rot);
    setNum(logoEls.ltSX, Math.round((lt.scaleX || 1) * 100));
    setNum(logoEls.ltSY, Math.round((lt.scaleY || 1) * 100));
    setNum(logoEls.ltDX, lt.dx || 0);
    setNum(logoEls.ltDY, lt.dy || 0);
    setNum(logoEls.ltBlurAmt, lt.blurAmt == null ? 3 : lt.blurAmt);
    setNum(logoEls.ltOutW, lt.outlineWidth == null ? 2 : lt.outlineWidth);
    setNum(logoEls.ltOutOp, Math.round((lt.outlineOpacity == null ? 1 : lt.outlineOpacity) * 100));
    if (logoEls.ltFont) {
      logoEls.ltFont.disabled = disabled;
      logoEls.ltFont.value = lt.font || '';
    }
    if (logoEls.ltGlowBtn) {
      logoEls.ltGlowBtn.disabled = disabled;
      logoEls.ltGlowBtn.style.background = lt.glow ? '#de5dde' : '#141416';
    }
    if (logoEls.ltBlurBtn) {
      logoEls.ltBlurBtn.disabled = disabled;
      logoEls.ltBlurBtn.style.background = lt.blur ? '#de5dde' : '#141416';
    }
    if (logoEls.ltOutBtn) {
      logoEls.ltOutBtn.disabled = disabled;
      logoEls.ltOutBtn.style.background = lt.outline ? '#de5dde' : '#141416';
    }
    if (logoEls.ltOutColor) {
      logoEls.ltOutColor.style.pointerEvents = disabled ? 'none' : 'auto';
      logoEls.ltOutColor.style.opacity = disabled ? '0.5' : '1';
      if (logoEls.ltOutColor.setColor) logoEls.ltOutColor.setColor(lt.outlineColor || '#000000');
    }
    if (logoEls.ltBlurAmt) logoEls.ltBlurAmt.disabled = disabled || !lt.blur;
    if (logoEls.ltOutW) logoEls.ltOutW.disabled = disabled || !lt.outline;
    if (logoEls.ltOutOp) logoEls.ltOutOp.disabled = disabled || !lt.outline;
  }

  function applyLetterField(key, value) {
    if (logo.selected < 0) return;
    syncLetters();
    const lt = logo.letters[logo.selected];
    lt[key] = value;
    if (key === 'font' && value) {
      ensureFontReady(value).then(() => scheduleRedraw());
    } else {
      scheduleRedraw();
    }
    if (key === 'glow' || key === 'blur' || key === 'blurAmt' || key === 'outline' || key === 'outlineWidth' || key === 'outlineOpacity' || key === 'outlineColor') {
      fillLetterControls();
      updateSvgButtons();
    }
  }

function canvasToLogo(e) {
  const r = logoEls.canvas.getBoundingClientRect();
  return {
    x: (e.clientX - r.left) * (LOGO_W / (r.width || LOGO_W)),
    y: (e.clientY - r.top) * (LOGO_H / (r.height || LOGO_H))
  };
}

  function buildLogoWindow() {
    if (logoWin) logoWin.remove();

    logoWin = el('div', {
      position: 'fixed', top: '90px', left: '140px', width: '520px', height: '560px',
      minWidth: '380px', minHeight: '400px', background: '#000000',
      border: '2px solid #ffffff', borderRadius: '8px', zIndex: '999999',
      display: 'none', flexDirection: 'column', resize: 'both', overflow: 'hidden',
      boxSizing: 'border-box', boxShadow: '0px 10px 30px rgba(0,0,0,0.75)',
      fontFamily: "'Rubik', sans-serif", userSelect: 'none', color: '#ffffff'
    });
    logoWin.id = 'sprunkassets-logo';

    const header = el('div', {
      background: '#141416', padding: '6px 12px', cursor: 'move', display: 'flex',
      justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333',
      flexShrink: '0', boxSizing: 'border-box'
    });
    const icon = el('img', { height: '26px', width: '26px', objectFit: 'contain', pointerEvents: 'none' });
    icon.src = ICON_URI;
    icon.alt = 'sprunkassets';
    const title = el('span', { fontSize: '13px', fontWeight: '700', color: '#ffffff', marginLeft: '8px', flex: '1' }, 'sprunkassets');
    const closeBtn = el('div', {
      width: '20px', height: '20px', backgroundColor: '#8b0000', border: '1px solid #ffffff',
      borderRadius: '50%', color: '#ffffff', fontSize: '11px', fontWeight: 'bold',
      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
    }, 'X');
    closeBtn.setAttribute('data-sa-close', '1');
    closeBtn.addEventListener('click', e => {
      e.stopPropagation();
      logoWin.style.display = 'none';
    });
    header.append(icon, title, closeBtn);

    const body = el('div', {
      flex: '1', minHeight: '0', overflowY: 'auto', display: 'flex', flexDirection: 'column',
      gap: '10px', padding: '10px', boxSizing: 'border-box'
    });

    body.append(el('div', { fontSize: '24px', fontWeight: '700', flexShrink: '0' }, 'logo editor'));

    const previewBox = el('div', {
      flexShrink: '0', height: '200px', border: '1.5px dashed #555', borderRadius: '8px',
      background: logo.bg || '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
    });
    logoEls.previewBox = previewBox;
previewBox.className = 'sa-canvas-box';
    logoEls.canvas = document.createElement('canvas');
    logoEls.canvas.width = LOGO_W;
    logoEls.canvas.height = LOGO_H;
    Object.assign(logoEls.canvas.style, {
      maxWidth: '100%', maxHeight: '100%', cursor: 'default', touchAction: 'none'
    });
    logoEls.ctx = logoEls.canvas.getContext('2d');
    previewBox.append(logoEls.canvas);
    body.append(previewBox);

    let logoDrag = null;
    logoEls.canvas.addEventListener('pointerdown', e => {
      const L = computeLogoLayout();
      const pt = canvasToLogo(e);
      const cur = currentLogoBox(L);
      if (cur) {
        const spot = hitBoxHandle(cur.box, pt.x, pt.y, logoScale());
        if (spot) {
          const drag = startBoxDrag(cur.box, spot, pt.x, pt.y, { ctrl: e.ctrlKey, alt: e.altKey });
          if (cur.letter >= 0 && drag.mode.startsWith('skew')) drag.mode = 'resize';
          logoDrag = { mode: 'box', letter: cur.letter, drag };
          logoEls.canvas.setPointerCapture(e.pointerId);
          e.preventDefault();
          return;
        }
      }
      if (logo.devtools) {
        const hit = hitTestLetter(L, pt.x, pt.y);
        if (hit < 0) return;
        logo.selected = hit;
        syncDevtoolsPanel();
        logoDrag = { mode: 'letter-move', letter: hit, sx: pt.x, sy: pt.y, dx0: letterAt(hit).dx || 0, dy0: letterAt(hit).dy || 0 };
        logoEls.canvas.setPointerCapture(e.pointerId);
        e.preventDefault();
        scheduleRedraw();
      } else if (cur && pointInBox(cur.box, pt.x, pt.y)) {
        const g = grp();
        logoDrag = { mode: 'group-move', sx: pt.x, sy: pt.y, ox0: g.ox, oy0: g.oy };
        logoEls.canvas.setPointerCapture(e.pointerId);
        e.preventDefault();
      }
    });
    logoEls.canvas.addEventListener('pointermove', e => {
      if (!logoDrag) return;
      const pt = canvasToLogo(e);
      if (logoDrag.mode === 'box') {
        const L = computeLogoLayout();
        const nb = boxFromDrag(logoDrag.drag, pt.x, pt.y);
        if (logoDrag.letter < 0) applyGroupBox(L, nb);
        else applyLetterBox(L, logoDrag.letter, nb);
      } else if (logoDrag.mode === 'group-move') {
        const g = grp();
        g.ox = logoDrag.ox0 + (pt.x - logoDrag.sx);
        g.oy = logoDrag.oy0 + (pt.y - logoDrag.sy);
      } else if (logoDrag.mode === 'letter-move') {
        const g = grp();
        const dxC = pt.x - logoDrag.sx, dyC = pt.y - logoDrag.sy;
        const r = -g.rot * Math.PI / 180;
        const vx = (dxC * Math.cos(r) - dyC * Math.sin(r)) / g.sx;
        const vy = (dxC * Math.sin(r) + dyC * Math.cos(r)) / g.sy;
        const lt = letterAt(logoDrag.letter);
        lt.dx = Math.round(logoDrag.dx0 + vx);
        lt.dy = Math.round(logoDrag.dy0 + vy);
        fillLetterControls();
      }
      scheduleRedraw();
    });
const releaseLogoDrag = e => {
  if (logoDrag && e && e.pointerId != null && logoEls.canvas.hasPointerCapture?.(e.pointerId)) {
    logoEls.canvas.releasePointerCapture(e.pointerId);
  }
  logoDrag = null;
};
logoEls.canvas.addEventListener('pointerup', releaseLogoDrag);
logoEls.canvas.addEventListener('pointercancel', releaseLogoDrag);

    logoEls.fileInput = document.createElement('input');
    logoEls.fileInput.type = 'file';
    logoEls.fileInput.accept = '.ttf,.otf,.woff,.woff2';
    logoEls.fileInput.style.display = 'none';
    logoEls.fileInput.addEventListener('change', () => {
      const f = logoEls.fileInput.files && logoEls.fileInput.files[0];
      logoEls.fileInput.value = '';
      if (!f) return;
      runLogoAction(async () => {
        await importFontFile(f);
        refreshFontOptions();
        updateSvgButtons();
        await redrawWithFont();
        return 'imported font ' + f.name;
      });
    });
    logoWin.appendChild(logoEls.fileInput);

    const grid = el('div', { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', flexShrink: '0' });
grid.className = 'sa-grid2';

    const left = el('div', { display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '0' });

    logoEls.nameInput = document.createElement('textarea');
    Object.assign(logoEls.nameInput.style, INPUT_CSS, {
      resize: 'vertical', minHeight: '54px', maxHeight: '110px', lineHeight: '1.3'
    });
    logoEls.nameInput.value = logo.text;
    logoEls.nameInput.addEventListener('input', () => {
      const v = logoEls.nameInput.value.replace(/\r/g, '').slice(0, 200);
      logo.text = v;
      syncLetters();
      rebuildSeparateRows();
      syncDevtoolsPanel();
      scheduleRedraw();
    });
    logoEls.nameInput.addEventListener('keydown', e => e.stopPropagation());
    left.append(field('Name the logo', logoEls.nameInput));

    logoEls.fontSelect = makeSelect([], v => {
      logo.font = v;
      updateSvgButtons();
      redrawWithFont();
    });
    left.append(field('Font', logoEls.fontSelect));

    left.append(button('import font file', () => logoEls.fileInput.click()));

    const styleRow = el('div', { display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' });
    function styleToggle(key, label, cssExtra) {
      const b = el('button', Object.assign({
        background: '#141416', color: '#ffffff', border: '1.5px solid #ffffff', borderRadius: '6px',
        padding: '4px 10px', fontSize: '12px', fontFamily: "'Rubik', sans-serif", cursor: 'pointer',
        fontWeight: '700', minWidth: '32px', lineHeight: '1.2'
      }, cssExtra || {}));
      b.type = 'button';
      b.textContent = label;
      const paint = () => {
        b.style.background = logo[key] ? '#de5dde' : '#141416';
        b.style.color = '#ffffff';
      };
      paint();
      b.addEventListener('click', () => {
        logo[key] = !logo[key];
        paint();
        scheduleRedraw();
        if (key === 'glow' || key === 'blur') updateSvgButtons();
      });
      logoEls['style_' + key] = { el: b, paint };
      return b;
    }
    styleRow.append(
      styleToggle('bold', 'B', { fontWeight: '900' }),
      styleToggle('italic', 'I', { fontStyle: 'italic', fontFamily: 'Georgia, serif' }),
      styleToggle('glow', 'Glow'),
      styleToggle('blur', 'Blur')
    );
    left.append(styleRow);

    logoEls.bgSwatch = colorInput(logo.bg || '#000000', v => {
      logo.bg = v;
      if (logoEls.previewBox) logoEls.previewBox.style.background = v;
      scheduleRedraw();
    });
    left.append(field('Preview background', logoEls.bgSwatch));

    const gInput = textInput('', () => {});
    gInput.placeholder = 'google fonts link or name';
    const gBtn = button('load google font', () => runLogoAction(async () => {
      const fam = addGoogleFont(gInput.value);
      if (!fam) return 'paste a google fonts link or a font name';
      logo.font = fam;
      refreshFontOptions();
      updateSvgButtons();
      await redrawWithFont();
      return 'loaded ' + fam + ' (if the name is wrong, a normal font is used)';
    }));
    left.append(field('Google font', gInput), gBtn);

    const fontUrlInput = textInput('', () => {});
    fontUrlInput.placeholder = 'https://…/font.ttf or .otf';
    const fontUrlBtn = button('add font from url', () => runLogoAction(async () => {
      const u = fontUrlInput.value.trim();
      if (!/^https?:\/\//i.test(u)) return 'paste a direct font file url (https://…/font.ttf)';
      const res = await fetch(u);
      if (!res.ok) throw new Error('font url answered HTTP ' + res.status);
      const buf = await res.arrayBuffer();
      const family = 'sprunk-url-' + Math.random().toString(36).slice(2, 8);
      const face = new FontFace(family, buf.slice(0));
      await face.load();
      document.fonts.add(face);
      customFonts.push({
        name: (u.split('/').pop() || 'url font').split('?')[0],
        family, kind: 'file', rawBuffer: buf
      });
      logo.font = family;
      refreshFontOptions();
      updateSvgButtons();
      await redrawWithFont();
      return 'added font from url';
    }));
    left.append(field('Font file URL', fontUrlInput), fontUrlBtn);

    const right = el('div', { display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '0' });

    logoEls.modeSelect = makeSelect([
      { text: 'all', value: 'all' },
      { text: 'separate', value: 'separate' },
      { text: 'gradient', value: 'gradient' }
    ], v => {
      logo.colorMode = v;
      applyModeVisibility();
      scheduleRedraw();
    });
    right.append(field('Color Mode', logoEls.modeSelect));

    logoEls.allSec = el('div', { display: 'flex', flexDirection: 'column', gap: '6px' });
    logoEls.allColorSwatch = colorInput(logo.color, v => {
      logo.color = v;
      scheduleRedraw();
    });
    logoEls.allSec.append(field('Color Logo', logoEls.allColorSwatch));
    right.append(logoEls.allSec);

    logoEls.sepSec = el('div', { display: 'none', flexDirection: 'column', gap: '6px' });
    logoEls.sepRows = el('div', {
      display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '130px', overflowY: 'auto',
      border: '1.5px solid #ffffff', borderRadius: '6px', padding: '6px', boxSizing: 'border-box'
    });
    logoEls.sepSec.append(el('div', { fontSize: '12px', fontWeight: '700' }, 'Color Separate Mode'), logoEls.sepRows);
    right.append(logoEls.sepSec);

    logoEls.gradSec = el('div', { display: 'none', flexDirection: 'column', gap: '6px' });
    logoEls.stopRows = el('div', {
      display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '130px', overflowY: 'auto',
      border: '1.5px solid #ffffff', borderRadius: '6px', padding: '6px', boxSizing: 'border-box'
    });
    const addPoint = button('+ add point', () => {
      logo.stops.push({ pos: 50, color: '#ffffff' });
      rebuildStopRows();
      scheduleRedraw();
    });
    logoEls.gradSec.append(el('div', { fontSize: '12px', fontWeight: '700' }, 'Gradient'), logoEls.stopRows, addPoint);
    right.append(logoEls.gradSec);

    const outlineRow = el('div', { display: 'flex', alignItems: 'center', gap: '6px' });
    logoEls.outlineCb = document.createElement('input');
    logoEls.outlineCb.type = 'checkbox';
    logoEls.outlineCb.checked = logo.outline.on;
    outlineRow.append(logoEls.outlineCb, el('span', { fontSize: '12px', fontWeight: '700' }, 'Outline'));
    logoEls.outlineSub = el('div', { display: logo.outline.on ? 'flex' : 'none', flexDirection: 'column', gap: '6px' });

    logoEls.outlineColorSwatch = colorInput(logo.outline.color, v => {
      logo.outline.color = v;
      scheduleRedraw();
    });
    logoEls.outlineWidthInput = numberInput(0, 100, logo.outline.width, v => {
      logo.outline.width = v;
      scheduleRedraw();
    });

    const outlineTopRow = el('div', { display: 'flex', alignItems: 'center', gap: '10px' });
    outlineTopRow.append(
      field('Outline Color', logoEls.outlineColorSwatch),
      field('Outline Size', logoEls.outlineWidthInput)
    );

    logoEls.outlineSub.append(
      outlineTopRow,
      field('Opacity', rangeInput(0, 100, 1, Math.round(logo.outline.opacity * 100), v => {
        logo.outline.opacity = v / 100;
        scheduleRedraw();
      }))
    );
    logoEls.outlineCb.addEventListener('change', () => {
      logo.outline.on = logoEls.outlineCb.checked;
      logoEls.outlineSub.style.display = logo.outline.on ? 'flex' : 'none';
      scheduleRedraw();
    });
    right.append(outlineRow, logoEls.outlineSub);

    grid.append(left, right);
    body.append(grid);

    const actions = el('div', { display: 'flex', gap: '6px', flexWrap: 'wrap', flexShrink: '0' });
    logoEls.btnPng = button('Download .png', () => runLogoAction(() => downloadLogo('png')));
    logoEls.btnSvg = button('Download .svg', () => runLogoAction(() => downloadLogo('svg')));
    logoEls.btnAddPng = button('Add to Sprite (png)', () => runLogoAction(() => addLogoToSprite('png')));
    logoEls.btnAddSvg = button('Add to Sprite (svg)', () => runLogoAction(() => addLogoToSprite('svg')));
    logoEls.devToggleBtn = button('DevTools', () => {
      logo.devtools = !logo.devtools;
      if (logo.devtools && logo.selected < 0 && logo.text.length) logo.selected = 0;
      syncDevtoolsPanel();
      scheduleRedraw();
    });
    logoEls.devSideBtn = button('Side panel', () => {
      logo.devSide = !logo.devSide;
      if (logo.devSide) logo.devtools = true;
      if (logo.devtools && logo.selected < 0 && logo.text.length) logo.selected = 0;
      syncDevtoolsPanel();
      scheduleRedraw();
    });
    const resetSkewBtn = button('reset skew', () => {
      const g = grp();
      g.tx = 0;
      g.ty = 0;
      if (logoEls.skewXInput) logoEls.skewXInput.value = '0';
      if (logoEls.skewYInput) logoEls.skewYInput.value = '0';
      scheduleRedraw();
    });
    logoEls.skewXInput = numberInput(-170, 170, 0, v => {
      grp().tx = clamp(v / 100, -TAN_MAX, TAN_MAX);
      scheduleRedraw();
    });
    logoEls.skewYInput = numberInput(-170, 170, 0, v => {
      grp().ty = clamp(v / 100, -TAN_MAX, TAN_MAX);
      scheduleRedraw();
    });
    const skewRow = row(
      field('Skew X', logoEls.skewXInput),
      field('Skew Y', logoEls.skewYInput),
      resetSkewBtn
    );
    actions.append(logoEls.btnPng, logoEls.btnSvg, logoEls.btnAddPng, logoEls.btnAddSvg, logoEls.devToggleBtn, logoEls.devSideBtn);
    body.append(actions);
    body.append(skewRow);

    logoEls.devPanel = el('div', {
      display: 'none', flexDirection: 'column', gap: '8px', flexShrink: '0',
      border: '1.5px solid #555', borderRadius: '8px', padding: '10px', boxSizing: 'border-box'
    });
    logoEls.devPanel.append(el('div', { fontSize: '13px', fontWeight: '700' }, 'DevTools'));

    logoEls.letterSelect = makeSelect([], v => {
      logo.selected = Number(v);
      fillLetterControls();
      scheduleRedraw();
    });
    logoEls.devPanel.append(field('Letter', logoEls.letterSelect));

    const ltGrid = el('div', { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' });

    logoEls.ltRot = numberInput(-180, 180, 0, v => applyLetterField('rot', v));
    logoEls.ltSX = numberInput(10, 300, 100, v => applyLetterField('scaleX', v / 100));
    logoEls.ltSY = numberInput(10, 300, 100, v => applyLetterField('scaleY', v / 100));
    logoEls.ltDX = numberInput(-400, 400, 0, v => applyLetterField('dx', v));
    logoEls.ltDY = numberInput(-400, 400, 0, v => applyLetterField('dy', v));
    logoEls.ltBlurAmt = numberInput(0, 30, 3, v => applyLetterField('blurAmt', v));
    logoEls.ltOutW = numberInput(0, 40, 2, v => applyLetterField('outlineWidth', v));
    logoEls.ltOutOp = numberInput(0, 100, 100, v => applyLetterField('outlineOpacity', v / 100));

    logoEls.ltFont = makeSelect([{ text: '(same as logo)', value: '' }], v => applyLetterField('font', v));
    const fillLtFonts = () => {
      const sel = logoEls.ltFont;
      if (!sel) return;
      const cur = sel.value;
      sel.textContent = '';
      const none = document.createElement('option');
      none.value = '';
      none.textContent = '(same as logo)';
      sel.appendChild(none);
      allLogoFonts().forEach(f => {
        const o = document.createElement('option');
        o.value = f.family;
        o.textContent = f.name;
        sel.appendChild(o);
      });
      sel.value = cur || '';
    };
    logoEls.fillLtFonts = fillLtFonts;

    const fxRow = el('div', { display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' });
    logoEls.ltGlowBtn = button('Glow', () => {
      if (logo.selected < 0) return;
      applyLetterField('glow', !letterAt(logo.selected).glow);
    });
    logoEls.ltBlurBtn = button('Blur', () => {
      if (logo.selected < 0) return;
      applyLetterField('blur', !letterAt(logo.selected).blur);
    });
    logoEls.ltOutBtn = button('Outline', () => {
      if (logo.selected < 0) return;
      applyLetterField('outline', !letterAt(logo.selected).outline);
    });
    logoEls.ltOutColor = colorInput('#000000', v => applyLetterField('outlineColor', v));
    fxRow.append(logoEls.ltGlowBtn, logoEls.ltBlurBtn, logoEls.ltOutBtn, logoEls.ltOutColor);

    ltGrid.append(
      field('Rotation °', logoEls.ltRot),
      field('Width %', logoEls.ltSX),
      field('Height %', logoEls.ltSY),
      field('X offset', logoEls.ltDX),
      field('Y offset', logoEls.ltDY),
      field('Font', logoEls.ltFont),
      field('Blur intensity', logoEls.ltBlurAmt),
      field('Outline size', logoEls.ltOutW),
      field('Outline opacity %', logoEls.ltOutOp)
    );
    logoEls.devPanel.append(ltGrid, field('Effects', fxRow));

    const resetRow = el('div', { display: 'flex', gap: '6px', flexWrap: 'wrap' });
    resetRow.append(
      button('reset this letter', () => {
        if (logo.selected < 0) return;
        logo.letters[logo.selected] = defaultLetter();
        fillLetterControls();
        updateSvgButtons();
        scheduleRedraw();
      }),
      button('reset everything', () => {
        logo.letters = [];
        syncLetters();
        logo.selected = logo.text.length ? 0 : -1;
        fillLetterControls();
        syncDevtoolsPanel();
        updateSvgButtons();
        scheduleRedraw();
      })
    );
    logoEls.devPanel.append(resetRow);

    logoEls.devHost = el('div', { display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: '0' });
    logoEls.devHost.appendChild(logoEls.devPanel);
    body.append(logoEls.devHost);

    logoEls.status = el('div', { fontSize: '11px', opacity: '0.7', flexShrink: '0', minHeight: '14px' }, '');
    body.append(logoEls.status);

    logoEls.mainCol = el('div', {
      flex: '1', minWidth: '0', minHeight: '0', overflowY: 'auto', display: 'flex',
      flexDirection: 'column', gap: '10px', boxSizing: 'border-box'
    });
    while (body.firstChild) logoEls.mainCol.appendChild(body.firstChild);

    logoEls.sideCol = el('div', {
      display: 'none', flexDirection: 'column', width: '320px', flexShrink: '0',
      minHeight: '0', overflowY: 'auto', borderLeft: '1px solid #333', paddingLeft: '8px',
      boxSizing: 'border-box', gap: '8px'
    });
logoEls.sideCol.className = 'sa-side-col';


    logoEls.bodyRow = el('div', {
      flex: '1', minHeight: '0', display: 'flex', flexDirection: 'column',
      gap: '10px', padding: '10px', boxSizing: 'border-box', overflow: 'hidden'
    });
    logoEls.bodyRow.append(logoEls.mainCol, logoEls.sideCol);
logoEls.bodyRow.className = 'sa-body-row';

    logoWin.append(header, logoEls.bodyRow);
    document.body.appendChild(logoWin);
    makeDraggable(header, logoWin);

    syncLogoControls();
  }

  async function openLogoWindow() {
    if (!logoWin || !document.body.contains(logoWin)) buildLogoWindow();
    syncLogoControls();
    logoWin.style.display = 'flex';
    await redrawWithFont();
  }

  const ASPECTS = {
    '16:9': { w: 640, h: 360 },
    '4:3': { w: 480, h: 360 },
    '1:1': { w: 360, h: 360 }
  };
  let PREV_W = 640;
  let PREV_H = 360;

  function defaultFx() { return { opacity: 1, blur: 0, grain: 0, distort: 0 }; }
  function defaultGlobal() {
    return {
      vignette: 0, blur: 0, bloom: 0, contrast: 100, saturation: 100, brightness: 100,
      sepia: 0, hue: 0, rgb: { r: 0, g: 0, b: 0 }, invert: false,
      pixelate: 0, chroma: 0, grain: 0, distort: 0, scanlines: 0,
      ascii: 0, posterize: 0, threshold: 0, emboss: false
    };
  }

  const PRESETS = {
    'retro VHS': { grain: 30, scanlines: 40, chroma: 4, vignette: 40, saturation: 130, sepia: 10 },
    'blurry': { blur: 6, bloom: 8 },
    'dreamy': { blur: 3, bloom: 16, brightness: 110, saturation: 120 },
    'heaven': { brightness: 120, bloom: 14, saturation: 80, rgb: { r: 20, g: 20, b: 0 }, vignette: -40 },
    'hell': { rgb: { r: 60, g: -20, b: -40 }, contrast: 140, vignette: 60, saturation: 150, grain: 10 },
    'golden': { sepia: 40, saturation: 140, brightness: 108, rgb: { r: 30, g: 15, b: -20 } },
    'noir': { saturation: 0, contrast: 150, vignette: 50, grain: 15 },
    'neon': { contrast: 160, saturation: 200, bloom: 12, vignette: 50 },
    'cursed': { hue: 180, distort: 10, chroma: 3, grain: 20 },
    'glitch': { distort: 18, grain: 40, chroma: 6, scanlines: 20 },
    'comic': { posterize: 4, saturation: 160, contrast: 130 },
    'ascii': { ascii: 8 },
    'emboss': { emboss: true, saturation: 0 },
    'high contrast': { threshold: 128, contrast: 140 }
  };

  const preview = {
    bg: '#000000',
    aspect: '16:9',
    base: { img: null, scale: 100, rot: 0, fx: defaultFx(), fxOn: true },
    layers: [],   // { kind: 'image' | 'logo', img, name, x, y, scale, rot, sx, sy, tx, ty, fx }
    texts: [],    // { text, font, bold, italic, size, color, x, y, rot, sx, sy, tx, ty, fx }
    shapes: [],   // { kind:'rect'|'circle'|'triangle'|'oval'|'line', ... }
    drawStrokes: [], // { points:[{x,y}], color, opacity, size, erase }
    drawTool: { color: '#ffffff', opacity: 1, size: 8, erase: false, active: false },
    sel: null,    // { type: 'layer' | 'text' | 'shape', index }
    overlay: null,
    global: defaultGlobal()
  };

  let prevWin = null;
  const prevEls = {};
  const refreshers = [];
  let drawQueued = false;
  let dragState = null;

  function regRefresh(fn) { refreshers.push(fn); }
  function refreshAll() { refreshers.forEach(fn => fn()); }
  function setPrevStatus(msg) { if (prevEls.status) prevEls.status.textContent = msg || ''; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function scheduleDraw() {
    if (drawQueued) return;
    drawQueued = true;
    requestAnimationFrame(() => { drawQueued = false; drawPreview(); });
  }

  function selectedText() {
    const s = preview.sel;
    return s && s.type === 'text' ? (preview.texts[s.index] || null) : null;
  }
  function selectedLayer(kind) {
    const s = preview.sel;
    if (!s || s.type !== 'layer') return null;
    const L = preview.layers[s.index];
    return L && L.kind === kind ? L : null;
  }

  function textFontCss(T) {
    return `${T.italic ? 'italic' : 'normal'} ${T.bold ? 700 : 400} ${T.size || 48}px ${cssFamily(fontByFamily(T.font || 'Allan').family)}`;
  }

  function safePixels(fn) {
    try { fn(); } catch (e) { /* tainted canvas: skip this effect */ }
  }

  function grainPass(canvas, amt) {
    if (!amt) return;
    const W = canvas.width, H = canvas.height;
    const ctx = canvas.getContext('2d');
    const img = ctx.getImageData(0, 0, W, H);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] === 0) continue;
      const n = (Math.random() - 0.5) * amt * 2;
      d[i] = clamp(d[i] + n, 0, 255);
      d[i + 1] = clamp(d[i + 1] + n, 0, 255);
      d[i + 2] = clamp(d[i + 2] + n, 0, 255);
    }
    ctx.putImageData(img, 0, 0);
  }

  function distortPass(canvas, amt) {
    if (!amt) return;
    const W = canvas.width, H = canvas.height;
    const ctx = canvas.getContext('2d');
    const src = ctx.getImageData(0, 0, W, H).data;
    const out = ctx.createImageData(W, H);
    const o = out.data;
    const seed = Math.random() * Math.PI * 2;
    for (let y = 0; y < H; y++) {
      const shift = Math.round(Math.sin(y * 0.05 + seed) * amt + (Math.random() - 0.5) * amt * 0.3);
      for (let x = 0; x < W; x++) {
        const sx = x - shift;
        if (sx < 0 || sx >= W) continue;
        const si = (y * W + sx) * 4;
        const oi = (y * W + x) * 4;
        o[oi] = src[si];
        o[oi + 1] = src[si + 1];
        o[oi + 2] = src[si + 2];
        o[oi + 3] = src[si + 3];
      }
    }
    ctx.putImageData(out, 0, 0);
  }

  function colorPass(canvas, g) {
    const hueOn = !!g.hue;
    const rgbOn = !!(g.rgb.r || g.rgb.g || g.rgb.b);
    const chromaOn = g.chroma > 0;
    if (!hueOn && !rgbOn && !g.invert && !chromaOn && !g.grain) return;

    const W = canvas.width, H = canvas.height;
    const ctx = canvas.getContext('2d');
    const img = ctx.getImageData(0, 0, W, H);
    const d = img.data;
    const src = chromaOn ? new Uint8ClampedArray(d) : null;
    const c = Math.round(g.chroma || 0);

    let m = null;
    if (hueOn) {
      const hr = (g.hue % 360) * Math.PI / 180;
      const cos = Math.cos(hr), sin = Math.sin(hr);
      m = [
        0.213 + cos * 0.787 - sin * 0.213, 0.715 - cos * 0.715 - sin * 0.715, 0.072 - cos * 0.072 + sin * 0.928,
        0.213 - cos * 0.213 + sin * 0.143, 0.715 + cos * 0.285 + sin * 0.140, 0.072 - cos * 0.072 - sin * 0.283,
        0.213 - cos * 0.213 - sin * 0.787, 0.715 - cos * 0.715 + sin * 0.715, 0.072 + cos * 0.928 + sin * 0.072
      ];
    }

    for (let p = 0; p < W * H; p++) {
      const i = p * 4;
      if (d[i + 3] === 0) continue;
      let r = d[i], gr = d[i + 1], b = d[i + 2];

      if (chromaOn) {
        const x = p % W;
        const xl = Math.max(0, x - c), xr = Math.min(W - 1, x + c);
        r = src[(p - x + xl) * 4];
        b = src[(p - x + xr) * 4 + 2];
      }
      if (m) {
        const nr = r * m[0] + gr * m[1] + b * m[2];
        const ng = r * m[3] + gr * m[4] + b * m[5];
        const nb = r * m[6] + gr * m[7] + b * m[8];
        r = nr; gr = ng; b = nb;
      }
      if (rgbOn) {
        r += g.rgb.r; gr += g.rgb.g; b += g.rgb.b;
      }
      if (g.invert) {
        r = 255 - r; gr = 255 - gr; b = 255 - b;
      }
      if (g.grain) {
        const n = (Math.random() - 0.5) * g.grain * 2;
        r += n; gr += n; b += n;
      }
      d[i] = clamp(r, 0, 255);
      d[i + 1] = clamp(gr, 0, 255);
      d[i + 2] = clamp(b, 0, 255);
    }
    ctx.putImageData(img, 0, 0);
  }

  function pixelateCanvas(canvas, px) {
    if (!px || px < 2) return;
    const W = canvas.width, H = canvas.height;
    const t = document.createElement('canvas');
    t.width = Math.max(1, Math.round(W / px));
    t.height = Math.max(1, Math.round(H / px));
    t.getContext('2d').drawImage(canvas, 0, 0, t.width, t.height);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, W, H);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(t, 0, 0, W, H);
    ctx.imageSmoothingEnabled = true;
  }

  function renderElement(fx, drawFn) {
    const c = document.createElement('canvas');
    c.width = PREV_W;
    c.height = PREV_H;
    const ctx = c.getContext('2d');
    if (fx.blur > 0) ctx.filter = `blur(${fx.blur}px)`;
    drawFn(ctx);
    ctx.filter = 'none';
    if (fx.distort) safePixels(() => distortPass(c, fx.distort));
    if (fx.grain) safePixels(() => grainPass(c, fx.grain));
    return c;
  }

  function drawImgAt(c, img, x, y, w, h, rot, tx, ty) {
    c.save();
    c.translate(x, y);
    c.rotate((rot || 0) * Math.PI / 180);
    if (tx || ty) c.transform(1, ty || 0, tx || 0, 1, 0, 0);
    c.drawImage(img, -w / 2, -h / 2, w, h);
    c.restore();
  }

  function drawBaseOn(c) {
    const b = preview.base;
    if (!b.img) return;
    const img = b.img;
    const fit = Math.min(PREV_W / img.naturalWidth, PREV_H / img.naturalHeight);
    const s = fit * (b.scale / 100);
    drawImgAt(c, img, PREV_W / 2, PREV_H / 2, img.naturalWidth * s, img.naturalHeight * s, b.rot);
  }

  function getTextLines(T) {
    if (!Array.isArray(T.lines) || !T.lines.length) {
      T.lines = [typeof T.text === 'string' ? T.text : 'Text'];
    }
    return T.lines;
  }

  function measureTextBlock(c, T) {
    const lines = getTextLines(T);
    const size = T.size || 48;
    const lineHeight = size * (T.lineHeight || 1.2);
    c.save();
    c.font = textFontCss(T);
    let maxW = 10;
    const widths = lines.map(ln => {
      const w = c.measureText(ln || ' ').width;
      if (w > maxW) maxW = w;
      return w;
    });
    c.restore();
    return {
      lines,
      widths,
      w: maxW,
      h: Math.max(size, lines.length * lineHeight),
      lineHeight
    };
  }

  function drawTextOn(c, T) {
    c.save();
    c.font = textFontCss(T);
    c.textBaseline = 'middle';
    c.fillStyle = T.color || '#ffffff';
    c.translate(T.x, T.y);
    c.rotate((T.rot || 0) * Math.PI / 180);
    c.transform(1, T.ty || 0, T.tx || 0, 1, 0, 0);
    c.scale(T.sx || 1, T.sy || 1);

    const { lines, widths, w: maxW, h: totalH, lineHeight } = measureTextBlock(c, T);
    const align = T.align || 'center';
    const startY = -totalH / 2 + lineHeight / 2;

    if (T.outline && (T.outlineWidth || 0) > 0) {
      c.strokeStyle = T.outlineColor || '#000000';
      c.lineWidth = T.outlineWidth * 2;
      c.lineJoin = 'round';
      c.lineCap = 'round';
    }

    lines.forEach((line, idx) => {
      const y = startY + idx * lineHeight;
      const words = line.trim().split(/\s+/);

      if (align === 'justify' && words.length > 1 && lines.length > 1) {
        c.textAlign = 'left';
        const wordWidths = words.map(wd => c.measureText(wd).width);
        const totalWordsW = wordWidths.reduce((a, b) => a + b, 0);
        const spaceGap = (maxW - totalWordsW) / (words.length - 1);
        let curX = -maxW / 2;
        words.forEach((wd, wi) => {
          if (T.outline && (T.outlineWidth || 0) > 0) c.strokeText(wd, curX, y);
          c.fillText(wd, curX, y);
          curX += wordWidths[wi] + spaceGap;
        });
      } else {
        let drawX = 0;
        if (align === 'left') { c.textAlign = 'left'; drawX = -maxW / 2; }
        else if (align === 'right') { c.textAlign = 'right'; drawX = maxW / 2; }
        else { c.textAlign = 'center'; drawX = 0; }
        if (T.outline && (T.outlineWidth || 0) > 0) c.strokeText(line, drawX, y);
        c.fillText(line, drawX, y);
      }
    });

    c.restore();
  }

function drawShapeOn(sc, S) {
  sc.save();
  sc.globalAlpha = clamp(S.opacity == null ? 1 : S.opacity, 0, 1);
  sc.strokeStyle = S.color || '#ffffff';
  sc.fillStyle = S.fill || 'transparent';
  sc.lineWidth = Math.max(1, S.strokeWidth || 3);
  sc.lineCap = S.lineCap || 'round';
  sc.lineJoin = S.lineJoin || 'round';
  if (S.dash && S.dash > 0) sc.setLineDash([S.dash, S.gap == null ? S.dash : S.gap]);
  else sc.setLineDash([]);
  if (S.dashOffset) sc.lineDashOffset = S.dashOffset;
  const hasFill = S.fill && S.fill !== 'transparent';

  if (S.kind === 'line') {
    const pts = S.points || [];
    if (pts.length >= 2) {
      sc.beginPath();
      sc.moveTo(pts[0].x, pts[0].y);
      if (S.curve && pts.length >= 3) {
        for (let i = 1; i < pts.length - 1; i++) {
          const xc = (pts[i].x + pts[i + 1].x) / 2, yc = (pts[i].y + pts[i + 1].y) / 2;
          sc.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
        }
        const last = pts[pts.length - 1];
        sc.lineTo(last.x, last.y);
      } else {
        for (let i = 1; i < pts.length; i++) sc.lineTo(pts[i].x, pts[i].y);
      }
      sc.stroke();
    }
  } else {
    sc.translate(S.x, S.y);
    sc.rotate((S.rot || 0) * Math.PI / 180);
    const w = Math.max(10, S.w || 40), h = Math.max(10, S.h || 40);
    sc.beginPath();
    if (S.kind === 'rect') {
      const x = -w / 2, y = -h / 2;
      const r = Math.max(0, Math.min(S.corners || 0, Math.min(w, h) / 2));
      sc.moveTo(x + r, y);
      sc.arcTo(x + w, y, x + w, y + h, r);
      sc.arcTo(x + w, y + h, x, y + h, r);
      sc.arcTo(x, y + h, x, y, r);
      sc.arcTo(x, y, x + w, y, r);
      sc.closePath();
    } else if (S.kind === 'circle' || S.kind === 'oval') {
      const rx = w / 2, ry = S.kind === 'circle' ? rx : h / 2;
      sc.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    } else if (S.kind === 'triangle') {
      sc.moveTo(0, -h / 2);
      sc.lineTo(w / 2, h / 2);
      sc.lineTo(-w / 2, h / 2);
      sc.closePath();
    }
    if (hasFill) sc.fill();
    sc.stroke();
  }
  sc.restore();
}

function drawStrokeLayer() {
  const c = document.createElement('canvas');
  c.width = PREV_W;
  c.height = PREV_H;
  const sc = c.getContext('2d');
  (preview.drawStrokes || []).forEach(stroke => {
    const pts = stroke.points || [];
    if (!pts.length) return;
    sc.save();
    sc.globalCompositeOperation = stroke.erase ? 'destination-out' : 'source-over';
    sc.strokeStyle = stroke.erase ? '#000000' : (stroke.color || '#ffffff');
    sc.globalAlpha = stroke.erase ? 1 : clamp(stroke.opacity == null ? 1 : stroke.opacity, 0, 1);
    sc.lineWidth = Math.max(1, stroke.size || 8);
    sc.lineCap = 'round';
    sc.lineJoin = 'round';
    sc.beginPath();
    sc.moveTo(pts[0].x, pts[0].y);
    if (pts.length === 1) sc.lineTo(pts[0].x + 0.01, pts[0].y + 0.01);
    for (let i = 1; i < pts.length; i++) sc.lineTo(pts[i].x, pts[i].y);
    sc.stroke();
    sc.restore();
  });
  return c;
}

function buildScene(fxWanted, skipBg) {
  const scene = document.createElement('canvas');
  scene.width = PREV_W;
  scene.height = PREV_H;
  const sc = scene.getContext('2d');
  if (!skipBg) {
    sc.fillStyle = preview.bg || '#000000';
    sc.fillRect(0, 0, PREV_W, PREV_H);
  }

  const take = o => !o || (o.fxOn !== false) === fxWanted;

  const put = (fx, drawFn) => {
    const e = renderElement(fx, drawFn);
    sc.save();
    sc.globalAlpha = clamp(fx.opacity, 0, 1);
    sc.drawImage(e, 0, 0);
    sc.restore();
  };

  if (preview.base.img && take(preview.base)) put(preview.base.fx, drawBaseOn);

  preview.layers.forEach(L => {
    if (!L.img || !take(L)) return;
    const w = L.img.naturalWidth * L.scale / 100 * (L.sx || 1);
    const h = L.img.naturalHeight * L.scale / 100 * (L.sy || 1);
    put(L.fx, c => drawImgAt(c, L.img, L.x, L.y, w, h, L.rot, L.tx, L.ty));
  });

  preview.texts.forEach(T => { if (take(T)) put(T.fx, c => drawTextOn(c, T)); });

  if (preview.overlay && preview.overlay.img && take(preview.overlay)) {
    const o = preview.overlay.img;
    const os = Math.min(PREV_W / o.naturalWidth, PREV_H / o.naturalHeight);
    sc.save();
    sc.globalAlpha = preview.overlay.opacity == null ? 0.5 : preview.overlay.opacity;
    sc.drawImage(o, (PREV_W - o.naturalWidth * os) / 2, (PREV_H - o.naturalHeight * os) / 2,
      o.naturalWidth * os, o.naturalHeight * os);
    sc.restore();
  }

  if (fxWanted) {
    (preview.shapes || []).forEach(S => { if (S) drawShapeOn(sc, S); });
    sc.drawImage(drawStrokeLayer(), 0, 0);
  }
  return scene;
}

  function posterizePass(canvas, levels) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const img = ctx.getImageData(0, 0, W, H);
    const d = img.data;
    const step = 255 / Math.max(1, levels - 1);
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] === 0) continue;
      d[i] = Math.round(Math.round(d[i] / step) * step);
      d[i + 1] = Math.round(Math.round(d[i + 1] / step) * step);
      d[i + 2] = Math.round(Math.round(d[i + 2] / step) * step);
    }
    ctx.putImageData(img, 0, 0);
  }

  function thresholdPass(canvas, t) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const img = ctx.getImageData(0, 0, W, H);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] === 0) continue;
      const lum = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
      const v = lum >= t ? 255 : 0;
      d[i] = d[i + 1] = d[i + 2] = v;
    }
    ctx.putImageData(img, 0, 0);
  }

  function embossPass(canvas) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const s = ctx.getImageData(0, 0, W, H).data;
    const out = ctx.createImageData(W, H);
    const o = out.data;
    for (let i = 0; i < s.length; i++) o[i] = s[i];
    const k = [-2, -1, 0, -1, 1, 1, 0, 1, 2];
    for (let y = 1; y < H - 1; y++) {
      for (let x = 1; x < W - 1; x++) {
        let sum = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = ((y + ky) * W + (x + kx)) * 4;
            const lum = (s[idx] + s[idx + 1] + s[idx + 2]) / 3;
            sum += lum * k[(ky + 1) * 3 + (kx + 1)];
          }
        }
        const v = clamp(sum + 128, 0, 255);
        const oi = (y * W + x) * 4;
        o[oi] = o[oi + 1] = o[oi + 2] = v;
      }
    }
    ctx.putImageData(out, 0, 0);
  }

  function asciiPass(canvas, cell) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const cols = Math.max(1, Math.floor(W / cell));
    const rows = Math.max(1, Math.floor(H / cell));
    const small = document.createElement('canvas');
    small.width = cols;
    small.height = rows;
    const sc = small.getContext('2d');
    sc.drawImage(canvas, 0, 0, cols, rows);
    const px = sc.getImageData(0, 0, cols, rows).data;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, W, H);
    ctx.font = `${cell}px monospace`;
    ctx.textBaseline = 'top';
    const ramp = ' .:-=+*#%@';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = (r * cols + c) * 4;
        if (px[i + 3] === 0) continue;
        const lum = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
        const ch = ramp[Math.min(ramp.length - 1, Math.floor((lum / 256) * ramp.length))];
        ctx.fillStyle = `rgb(${px[i]},${px[i + 1]},${px[i + 2]})`;
        ctx.fillText(ch, c * cell, r * cell);
      }
    }
  }

  function drawVignette(ctx, v) {
    const a = clamp(Math.abs(v) / 100, 0, 1);
    const col = v > 0 ? `rgba(0,0,0,${a})` : `rgba(255,255,255,${a})`;
    const cx = PREV_W / 2, cy = PREV_H / 2, r = Math.hypot(cx, cy);
    const grad = ctx.createRadialGradient(cx, cy, r * 0.35, cx, cy, r);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, col);
    ctx.save();
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, PREV_W, PREV_H);
    ctx.restore();
  }

  function drawScanlines(ctx, amt) {
    ctx.save();
    ctx.fillStyle = `rgba(0,0,0,${clamp(amt / 100, 0, 1) * 0.5})`;
    for (let y = 0; y < PREV_H; y += 3) ctx.fillRect(0, y, PREV_W, 1);
    ctx.restore();
  }

  function previewBoxOf(o, isText) {
    if (isText) {
      const m = measureTextBlock(prevEls.ctx, o);
      return {
        cx: o.x, cy: o.y, w: m.w * (o.sx || 1), h: m.h * (o.sy || 1),
        rot: o.rot || 0, tx: o.tx || 0, ty: o.ty || 0
      };
    }
    return {
      cx: o.x, cy: o.y,
      w: o.img.naturalWidth * o.scale / 100 * (o.sx || 1),
      h: o.img.naturalHeight * o.scale / 100 * (o.sy || 1),
      rot: o.rot || 0, tx: o.tx || 0, ty: o.ty || 0
    };
  }

  function shapeBoxOf(S) {
    if (!S) return { cx: 0, cy: 0, w: 40, h: 40, rot: 0, tx: 0, ty: 0 };
    if (S.kind === 'line') {
      const pts = S.points || [];
      if (!pts.length) {
        return { cx: S.x || PREV_W / 2, cy: S.y || PREV_H / 2, w: 40, h: 40, rot: 0, tx: 0, ty: 0 };
      }
      let minX = pts[0].x, maxX = pts[0].x, minY = pts[0].y, maxY = pts[0].y;
      pts.forEach(p => {
        minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
        minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
      });
      const w = Math.max(24, maxX - minX);
      const h = Math.max(24, maxY - minY);
      return { cx: (minX + maxX) / 2, cy: (minY + maxY) / 2, w, h, rot: 0, tx: 0, ty: 0 };
    }
    return {
      cx: S.x || 0,
      cy: S.y || 0,
      w: Math.max(10, S.w || 40),
      h: Math.max(10, S.h || 40),
      rot: S.rot || 0,
      tx: 0,
      ty: 0
    };
  }

  function applyShapeBox(S, nb) {
    if (!S || !nb) return;
    if (S.kind === 'line') {
      const old = shapeBoxOf(S);
      const sx = nb.w / Math.max(1, old.w);
      const sy = nb.h / Math.max(1, old.h);
      const dRot = ((nb.rot || 0) - (old.rot || 0)) * Math.PI / 180;
      const cos = Math.cos(dRot), sin = Math.sin(dRot);
      S.points = (S.points || []).map(p => {
        let lx = (p.x - old.cx) * sx;
        let ly = (p.y - old.cy) * sy;
        const rx = lx * cos - ly * sin;
        const ry = lx * sin + ly * cos;
        return { x: nb.cx + rx, y: nb.cy + ry };
      });
      S.x = Math.round(nb.cx);
      S.y = Math.round(nb.cy);
      S.w = Math.max(10, nb.w);
      S.h = Math.max(10, nb.h);
      S.rot = 0;
      return;
    }
    S.x = Math.round(nb.cx);
    S.y = Math.round(nb.cy);
    S.w = Math.max(10, nb.w);
    S.h = Math.max(10, S.kind === 'circle' ? nb.w : nb.h);
    if (S.kind === 'circle') S.h = S.w;
    S.rot = nb.rot || 0;
  }

  function selectedPreviewBox() {
    const s = preview.sel;
    if (!s || !prevEls.ctx) return null;
    if (s.type === 'shape') {
      const o = preview.shapes[s.index];
      if (!o) return null;
      return { o, isText: false, isShape: true, box: shapeBoxOf(o) };
    }
    const isText = s.type === 'text';
    const o = isText ? preview.texts[s.index] : preview.layers[s.index];
    if (!o || (!isText && !o.img)) return null;
    return { o, isText, isShape: false, box: previewBoxOf(o, isText) };
  }

  function previewScale() {
    return unitsPerPx(prevEls.canvas, PREV_W);
  }

  function applyPreviewBox(o, isText, nb) {
    o.x = Math.round(nb.cx);
    o.y = Math.round(nb.cy);
    o.rot = nb.rot;
    o.tx = nb.tx || 0;
    o.ty = nb.ty || 0;
    if (isText) {
      const m = measureTextBlock(prevEls.ctx, o);
      o.sx = nb.w / m.w;
      o.sy = nb.h / m.h;
    } else {
      o.sx = nb.w / (o.img.naturalWidth * o.scale / 100);
      o.sy = nb.h / (o.img.naturalHeight * o.scale / 100);
    }
  }

  function hitTest(mx, my) {
    if (!prevEls.ctx) return null;
    const padded = (o, isText) => {
      const b = previewBoxOf(o, isText);
      b.w += 12;
      b.h += 12;
      return b;
    };
    for (let i = (preview.shapes || []).length - 1; i >= 0; i--) {
      const S = preview.shapes[i];
      const b = shapeBoxOf(S);
      b.w += 16;
      b.h += 16;
      if (pointInBox(b, mx, my)) return { type: 'shape', index: i };
    }
    for (let i = preview.texts.length - 1; i >= 0; i--) {
      if (pointInBox(padded(preview.texts[i], true), mx, my)) return { type: 'text', index: i };
    }
    for (let i = preview.layers.length - 1; i >= 0; i--) {
      const L = preview.layers[i];
      if (!L.img) continue;
      if (pointInBox(padded(L, false), mx, my)) return { type: 'layer', index: i };
    }
    return null;
  }

  function drawSelection(ctx) {
    const s = selectedPreviewBox();
    if (s) drawBoxHandles(ctx, s.box, previewScale());
  }

  function turnDrawOff() {
    if (preview.drawTool && preview.drawTool.active) {
      preview.drawTool.active = false;
      refreshAll();
    }
  }

  function deleteSelectedPreviewItem() {
    const s = preview.sel;
    if (!s) return false;
    if (s.type === 'text') {
      preview.texts.splice(s.index, 1);
      preview.sel = preview.texts.length ? { type: 'text', index: Math.min(s.index, preview.texts.length - 1) } : null;
    } else if (s.type === 'shape') {
      preview.shapes.splice(s.index, 1);
      preview.sel = preview.shapes.length ? { type: 'shape', index: Math.min(s.index, preview.shapes.length - 1) } : null;
    } else if (s.type === 'layer') {
      preview.layers.splice(s.index, 1);
      preview.sel = preview.layers.length ? { type: 'layer', index: Math.min(s.index, preview.layers.length - 1) } : null;
    } else {
      return false;
    }
    refreshAll();
    scheduleDraw();
    setPrevStatus('deleted');
    return true;
  }

  function onPreviewKeyDown(e) {
    if (!prevWin || prevWin.style.display === 'none') return;
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (deleteSelectedPreviewItem()) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }
  if (!window.__sprunkassetsPreviewKeyBound) {
    window.__sprunkassetsPreviewKeyBound = true;
    window.addEventListener('keydown', onPreviewKeyDown, true);
  }

  function drawPreview(opts) {
    if (!prevEls.ctx) return;
    const forExport = !!(opts && opts.export);
    const ctx = prevEls.ctx;
    const g = preview.global;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, PREV_W, PREV_H);

    const empty = !preview.base.img && !preview.layers.length && !preview.texts.length && !preview.shapes.length && !preview.drawStrokes.length;
    if (empty && !forExport) {
      ctx.fillStyle = preview.bg || '#000000';
      ctx.fillRect(0, 0, PREV_W, PREV_H);
      ctx.fillStyle = '#888888';
      ctx.font = '18px Rubik, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Open a picture from the Picture group', PREV_W / 2, PREV_H / 2);
      return;
    }

    const scene = buildScene(true);

    safePixels(() => colorPass(scene, g));
    if (g.distort) safePixels(() => distortPass(scene, g.distort));
    if (g.pixelate) pixelateCanvas(scene, g.pixelate);
    if (g.posterize) safePixels(() => posterizePass(scene, g.posterize));
    if (g.threshold) safePixels(() => thresholdPass(scene, g.threshold));
    if (g.emboss) safePixels(() => embossPass(scene));
    if (g.ascii) safePixels(() => asciiPass(scene, g.ascii));

    const filters = [];
    if (g.blur > 0) filters.push(`blur(${g.blur}px)`);
    if (g.contrast !== 100) filters.push(`contrast(${g.contrast}%)`);
    if (g.saturation !== 100) filters.push(`saturate(${g.saturation}%)`);
    if (g.brightness !== 100) filters.push(`brightness(${g.brightness}%)`);
    if (g.sepia > 0) filters.push(`sepia(${g.sepia}%)`);
    ctx.save();
    ctx.filter = filters.length ? filters.join(' ') : 'none';
    ctx.drawImage(scene, 0, 0);
    ctx.restore();

    ctx.drawImage(buildScene(false, true), 0, 0);

    if (g.bloom > 0) {
      ctx.save();
      ctx.globalAlpha = Math.min(1, g.bloom / 20);
      ctx.filter = `blur(${6 + g.bloom}px) brightness(1.4)`;
      ctx.drawImage(scene, 0, 0);
      ctx.restore();
    }

    if (g.scanlines) drawScanlines(ctx, g.scanlines);
    if (g.vignette) drawVignette(ctx, g.vignette);
    if (!forExport) drawSelection(ctx);
  }

  function canvasToPrev(e) {
    const r = prevEls.canvas.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (PREV_W / r.width),
      y: (e.clientY - r.top) * (PREV_H / r.height)
    };
  }

const TAINT_MSG = 'ts picture comes from another website just p ls save it and put here or im gonna be very angy!!! ';

function decodeImg(src, tainted) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => { img.sprunkTainted = tainted; resolve(img); };
    img.onerror = () => reject(new Error('could not load image'));
    img.src = src;
  });
}

async function loadImgEl(url) {
  try {
    const res = await fetch(url);
    if (res.ok) {
      const blob = await res.blob();
      return await decodeImg(URL.createObjectURL(blob), false);
    }
  } catch (e) { /* blocked by the site, fall through */ }
  return decodeImg(url, true);
}

  async function setBaseFromUrl(url, name) {
    const img = await loadImgEl(url);
    preview.base.img = img;
    preview.base.scale = 100;
    preview.base.rot = 0;
    refreshAll();
    scheduleDraw();
    setPrevStatus('loaded ' + (name || 'picture'));
  }

  function addLayer(img, name, kind) {
    const pct = Math.round(Math.min(100, (PREV_W * 0.5) / img.naturalWidth * 100));
    preview.layers.push({
      kind, img, name, x: PREV_W / 2, y: PREV_H / 2,
      scale: Math.max(5, pct), rot: 0, sx: 1, sy: 1, tx: 0, ty: 0,
      fx: defaultFx(), fxOn: true
    });
    preview.sel = { type: 'layer', index: preview.layers.length - 1 };
    refreshAll();
    scheduleDraw();
    setPrevStatus((kind === 'logo' ? 'logo' : 'image') + ' added, drag it on the preview');
  }

  function hiddenFile(accept, onFile) {
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = accept;
    inp.style.display = 'none';
    inp.addEventListener('change', () => {
      const f = inp.files && inp.files[0];
      inp.value = '';
      if (f) onFile(f);
    });
    if (prevWin) prevWin.appendChild(inp);
    return () => inp.click();
  }

  function row(...kids) {
    const r = el('div', { display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' });
    r.append(...kids);
    return r;
  }

  function numInput2(min, max, get, set, enabled) {
    const i = numberInput(min, max, 0, v => {
      if (enabled && !enabled()) return;
      set(v);
      scheduleDraw();
    });
    regRefresh(() => {
      const ok = !enabled || enabled();
      i.disabled = !ok;
      if (ok && document.activeElement !== i) i.value = String(Math.round(get()));
    });
    return i;
  }

  function propNum(label, min, max, get, set, enabled) {
    return field(label, numInput2(min, max, get, set, enabled));
  }

  function fontSelect(onPick) {
    const s = makeSelect([], v => onPick(v));
    s._fill = () => {
      const cur = s.value;
      s.textContent = '';
      allLogoFonts().forEach(f => {
        const o = document.createElement('option');
        o.value = f.family;
        o.textContent = f.name;
        s.appendChild(o);
      });
      if (cur) s.value = cur;
    };
    s._fill();
    return s;
  }

  function presetButton(getFx, enabled) {
    const toggle = (label, key, value) => button(label, () => {
      if (enabled && !enabled()) return setPrevStatus('nothing selected');
      const f = getFx();
      f[key] = f[key] ? 0 : value;
      refreshAll();
      scheduleDraw();
    });
    return row(toggle('distorted', 'distort', 18), toggle('grainy', 'grain', 40));
  }

  function fxFields(getFx, enabled) {
    const grid = el('div', { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' });
    grid.append(
      propNum('Opacity %', 0, 100, () => getFx().opacity * 100, v => { getFx().opacity = v / 100; }, enabled),
      propNum('Blur', 0, 30, () => getFx().blur, v => { getFx().blur = v; }, enabled),
      propNum('Grain', 0, 120, () => getFx().grain, v => { getFx().grain = v; }, enabled),
      propNum('Distort', 0, 80, () => getFx().distort, v => { getFx().distort = v; }, enabled)
    );
    return grid;
  }

  function fxOnBtn(getObj) {
    const b = button('effects: ON', () => {
      const o = getObj();
      if (!o) return setPrevStatus('nothing selected');
      o.fxOn = o.fxOn === false;
      refreshAll();
      scheduleDraw();
    });
    regRefresh(() => {
      const o = getObj();
      const on = o ? o.fxOn !== false : false;
      b.disabled = !o;
      b.textContent = 'effects: ' + (on ? 'ON' : 'OFF');
      b.style.background = on ? '#de5dde' : '#141416';
    });
    return b;
  }

  function makeGroup(title, build) {
    const wrap = el('div', {
      display: 'flex', flexDirection: 'column', border: '1.5px solid #555', borderRadius: '8px',
      overflow: 'hidden', flexShrink: '0'
    });
    const head = el('button', Object.assign({}, BTN, {
      width: '100%', textAlign: 'left', borderRadius: '0', border: 'none',
      borderBottom: '1px solid #555', fontWeight: '700', fontSize: '13px', padding: '8px 10px',
      background: '#141416'
    }));
    head.textContent = '▸ ' + title;
    const body = el('div', {
      display: 'none', flexDirection: 'column', gap: '8px', padding: '8px', boxSizing: 'border-box'
    });
    build(body);
    head.addEventListener('click', () => {
      const open = body.style.display === 'none';
      body.style.display = open ? 'flex' : 'none';
      head.textContent = (open ? '▾ ' : '▸ ') + title;
    });
    wrap.append(head, body);
    return wrap;
  }

  function gcd(a, b) { return b ? gcd(b, a % b) : a; }
  function ratioText(w, h) { const g = gcd(w, h) || 1; return `${w / g}:${h / g}`; }

  function setPreviewSize(w, h) {
    PREV_W = clamp(Math.round(w), 64, 2000);
    PREV_H = clamp(Math.round(h), 64, 2000);
    preview.aspect = Object.keys(ASPECTS).find(k => ASPECTS[k].w === PREV_W && ASPECTS[k].h === PREV_H) || 'custom';
    if (prevEls.canvas) {
      prevEls.canvas.width = PREV_W;
      prevEls.canvas.height = PREV_H;
    }
    scheduleDraw();
  }

  function setPreviewAspect(key) {
    const a = ASPECTS[key];
    if (a) setPreviewSize(a.w, a.h);
  }

  function buildLayerSelect(kind) {
    const sel = makeSelect([], v => {
      const idx = Number(v);
      const item = preview.layers[idx];
      if (!item || item.kind !== kind) return;
      preview.sel = { type: 'layer', index: idx };
      refreshAll();
      scheduleDraw();
    });
    regRefresh(() => {
      sel.textContent = '';
      const idxs = [];
      preview.layers.forEach((item, i) => { if (item.kind === kind) idxs.push(i); });
      if (!idxs.length) {
        const o = document.createElement('option');
        o.value = '';
        o.textContent = '(none yet)';
        sel.appendChild(o);
        sel.disabled = true;
        return;
      }
      sel.disabled = false;
      idxs.forEach((i, n) => {
        const o = document.createElement('option');
        o.value = String(i);
        o.textContent = `${kind === 'logo' ? 'Logo' : 'Image'} ${n + 1}: ${(preview.layers[i].name || '').slice(0, 18)}`;
        sel.appendChild(o);
      });
      const cur = preview.sel && preview.sel.type === 'layer' ? preview.sel.index : -1;
      if (idxs.includes(cur)) {
        sel.value = String(cur);
      } else {
        const o = document.createElement('option');
        o.value = '';
        o.textContent = '(pick one)';
        sel.insertBefore(o, sel.firstChild);
        sel.value = '';
      }
    });
    return field(kind === 'logo' ? 'Select Logo' : 'Select Image', sel);
  }

  function buildPictureGroup(b) {
    const openBase = hiddenFile('image/*', f => {
      loadImgEl(URL.createObjectURL(f))
        .then(img => { preview.base.img = img; preview.base.scale = 100; preview.base.rot = 0; refreshAll(); scheduleDraw(); setPrevStatus('loaded ' + f.name); })
        .catch(e => setPrevStatus('error: ' + e.message));
    });
    const openOverlay = hiddenFile('image/*', f => {
      loadImgEl(URL.createObjectURL(f))
        .then(img => { preview.overlay = { img, opacity: 0.5, fxOn: true }; refreshAll(); scheduleDraw(); setPrevStatus('overlay added'); })
        .catch(e => setPrevStatus('error: ' + e.message));
    });

    b.append(row(
      button('template menu', () => openTemplateMenu()),
      button('from sprite or stage', () => openSpriteStagePicker()),
      button('pick image from file', openBase),
      button('clear picture', () => { preview.base.img = null; refreshAll(); scheduleDraw(); })
    ));

    const hasBase = () => !!preview.base.img;
    b.append(row(
      propNum('Scale %', 5, 300, () => preview.base.scale, v => { preview.base.scale = v; }, hasBase),
      propNum('Rotation °', -180, 180, () => preview.base.rot, v => { preview.base.rot = v; }, hasBase)
    ));
    b.append(fxFields(() => preview.base.fx, hasBase));
    b.append(row(
      presetButton(() => preview.base.fx, hasBase),
      button('clear picture effects', () => { preview.base.fx = defaultFx(); refreshAll(); scheduleDraw(); })
    ));
    b.append(row(
      fxOnBtn(() => preview.base.img ? preview.base : null),
      el('span', { fontSize: '11px', opacity: '0.7' }, 'picture effects from the Effects tab')
    ));

    const overlayOp = propNum('Overlay %', 0, 100,
      () => (preview.overlay ? preview.overlay.opacity * 100 : 50),
      v => { if (preview.overlay) preview.overlay.opacity = v / 100; },
      () => !!preview.overlay);
    b.append(row(
      button('add overlay', openOverlay),
      button('clear overlay', () => { preview.overlay = null; refreshAll(); scheduleDraw(); }),
      overlayOp,
      fxOnBtn(() => preview.overlay ? preview.overlay : null)
    ));

    const aspectRow = row(el('span', { fontSize: '12px', fontWeight: '700' }, 'Resolution'));
    ['16:9', '4:3', '1:1'].forEach(key => {
      const bt = button(key, () => {
        setPreviewAspect(key);
        refreshAll();
      });
      bt.style.background = key === preview.aspect ? '#de5dde' : '#141416';
      regRefresh(() => { bt.style.background = key === preview.aspect ? '#de5dde' : '#141416'; });
      aspectRow.append(bt);
    });
    b.append(aspectRow);

    const resW = numberInput(64, 2000, PREV_W, () => {});
    const resH = numberInput(64, 2000, PREV_H, () => {});
    resW.style.width = '84px';
    resH.style.width = '84px';
    const ratioLbl = el('span', { fontSize: '11px', opacity: '0.85', fontWeight: '700' }, '');
    const applyRes = button('apply size', () => {
      const w = Number(resW.value), h = Number(resH.value);
      if (!(w > 0 && h > 0)) return setPrevStatus('enter a width and height');
      setPreviewSize(w, h);
      refreshAll();
    });
    b.append(row(
      el('span', { fontSize: '12px', fontWeight: '700' }, 'Custom size'),
      resW, el('span', { fontSize: '12px' }, '×'), resH, applyRes
    ));
    b.append(row(ratioLbl));
    regRefresh(() => {
      if (document.activeElement !== resW) resW.value = String(PREV_W);
      if (document.activeElement !== resH) resH.value = String(PREV_H);
      ratioLbl.textContent = `${PREV_W} × ${PREV_H} · ratio ${ratioText(PREV_W, PREV_H)}`;
    });

    const bgSw = colorInput(preview.bg, v => {
      preview.bg = v;
      if (prevEls.previewBox) prevEls.previewBox.style.background = v;
      scheduleDraw();
    });
    regRefresh(() => { bgSw.setColor(preview.bg); });
    b.append(field('Background colour', bgSw));
  }

  function buildLayerGroup(b, kind) {
    const L = () => selectedLayer(kind);
    const on = () => !!L();

    b.append(row(buildLayerSelect(kind)));

    if (kind === 'image') {
      const openFile = hiddenFile('image/*', f => {
        loadImgEl(URL.createObjectURL(f))
          .then(img => addLayer(img, f.name, 'image'))
          .catch(e => setPrevStatus('error: ' + e.message));
      });
      const urlIn = textInput('', () => {});
      urlIn.placeholder = 'image link (https://…)';
      b.append(row(button('add image layer', openFile)));
      b.append(field('Image URL', urlIn));
      b.append(row(button('add from url', () => {
        const u = urlIn.value.trim();
        if (!/^https?:\/\//i.test(u)) return setPrevStatus('paste a direct image link (https://…)');
        setPrevStatus('loading image…');
        loadImgEl(u)
          .then(img => addLayer(img, (u.split('/').pop() || 'image').split('?')[0], 'image'))
          .catch(e => setPrevStatus('error: ' + e.message));
      })));
    } else {
      b.append(row(button('add your logo', () => openLogoLogPicker())));
    }

    b.append(row(
      propNum('Scale %', 5, 300, () => L().scale, v => { L().scale = v; }, on),
      propNum('Rotation °', -180, 180, () => L().rot, v => { L().rot = v; }, on)
    ));
    b.append(fxFields(() => L().fx, on));
    b.append(row(fxOnBtn(L)));
    b.append(row(
      presetButton(() => L().fx, on),
      button('clear effects', () => { const o = L(); if (o) { o.fx = defaultFx(); refreshAll(); scheduleDraw(); } }),
      button('reset skew', () => { const o = L(); if (o) { o.tx = 0; o.ty = 0; refreshAll(); scheduleDraw(); } }),
      button('remove selected', () => {
        const s = preview.sel;
        if (!L() || !s) return setPrevStatus('no ' + kind + ' selected');
        preview.layers.splice(s.index, 1);
        preview.sel = null;
        refreshAll();
        scheduleDraw();
      })
    ));
  }

  function buildTextGroup(b) {
    const T = () => selectedText();
    const on = () => !!T();

    b.append(row(
      button('add text', () => {
        turnDrawOff();
        preview.texts.push({
          lines: ['Text'],
          selectedLine: 0,
          align: 'center',
          lineHeight: 1.2,
          font: logo.font || 'Allan',
          bold: false,
          italic: false,
          size: 48,
          color: '#ffffff',
          outline: false,
          outlineColor: '#000000',
          outlineWidth: 2,
          x: PREV_W / 2,
          y: PREV_H / 2,
          rot: 0,
          sx: 1,
          sy: 1,
          tx: 0,
          ty: 0,
          fx: defaultFx(),
          fxOn: true
        });
        preview.sel = { type: 'text', index: preview.texts.length - 1 };
        ensureFontReady(preview.texts[preview.texts.length - 1].font).then(() => scheduleDraw());
        refreshAll();
        scheduleDraw();
      }),
      button('remove text', () => {
        const s = preview.sel;
        if (!T() || !s) return setPrevStatus('no text selected');
        preview.texts.splice(s.index, 1);
        preview.sel = preview.texts.length ? { type: 'text', index: preview.texts.length - 1 } : null;
        refreshAll();
        scheduleDraw();
      })
    ));

    const textSelect = makeSelect([], v => {
      const idx = Number(v);
      if (!isNaN(idx) && preview.texts[idx]) {
        preview.sel = { type: 'text', index: idx };
        refreshAll();
        scheduleDraw();
      }
    });
    regRefresh(() => {
      textSelect.textContent = '';
      if (!preview.texts.length) {
        const o = document.createElement('option');
        o.value = '';
        o.textContent = '(no texts)';
        textSelect.appendChild(o);
        textSelect.disabled = true;
        return;
      }
      textSelect.disabled = false;
      preview.texts.forEach((item, idx) => {
        const lines = getTextLines(item);
        const label = (lines[0] || 'Text').slice(0, 18);
        const o = document.createElement('option');
        o.value = String(idx);
        o.textContent = `Text ${idx + 1}: ${label}`;
        textSelect.appendChild(o);
      });
      const curIdx = preview.sel && preview.sel.type === 'text' ? preview.sel.index : 0;
      textSelect.value = String(curIdx);
    });
    b.append(field('Select Text', textSelect));

    const lineSelect = makeSelect([], v => {
      const t = T();
      if (!t) return;
      t.selectedLine = Number(v) || 0;
      refreshAll();
    });
    regRefresh(() => {
      const t = T();
      lineSelect.textContent = '';
      if (!t) {
        lineSelect.disabled = true;
        return;
      }
      const lines = getTextLines(t);
      if (t.selectedLine == null || t.selectedLine >= lines.length) t.selectedLine = 0;
      lineSelect.disabled = false;
      lines.forEach((ln, idx) => {
        const o = document.createElement('option');
        o.value = String(idx);
        o.textContent = `Line ${idx + 1}: ${(ln || '(empty)').slice(0, 20)}`;
        lineSelect.appendChild(o);
      });
      lineSelect.value = String(t.selectedLine);
    });

    const addLineBtn = button('+ add line', () => {
      const t = T();
      if (!t) return setPrevStatus('no text selected');
      const lines = getTextLines(t);
      lines.push('New line');
      t.selectedLine = lines.length - 1;
      refreshAll();
      scheduleDraw();
    });

    const remLineBtn = button('- remove line', () => {
      const t = T();
      if (!t) return setPrevStatus('no text selected');
      const lines = getTextLines(t);
      if (lines.length <= 1) return setPrevStatus('a text needs at least 1 line');
      lines.splice(t.selectedLine || 0, 1);
      t.selectedLine = Math.max(0, Math.min(t.selectedLine || 0, lines.length - 1));
      refreshAll();
      scheduleDraw();
    });

    b.append(field('Select Line', lineSelect), row(addLineBtn, remLineBtn));

    const txt = textInput('', v => {
      const t = T();
      if (!t) return;
      const lines = getTextLines(t);
      const li = t.selectedLine || 0;
      lines[li] = v.slice(0, 80);
      if (lineSelect.options[li]) {
        lineSelect.options[li].textContent = `Line ${li + 1}: ${(lines[li] || '(empty)').slice(0, 20)}`;
      }
      if (textSelect.options[preview.sel.index] && li === 0) {
        textSelect.options[preview.sel.index].textContent = `Text ${preview.sel.index + 1}: ${(lines[0] || 'Text').slice(0, 18)}`;
      }
      scheduleDraw();
    });
    regRefresh(() => {
      const t = T();
      txt.disabled = !t;
      if (t && document.activeElement !== txt) {
        const lines = getTextLines(t);
        txt.value = lines[t.selectedLine || 0] ?? '';
      }
    });
    b.append(field('Line Text', txt));

    const alignRow = row();
    const alignBtns = {};
    [
      { label: 'Left', val: 'left' },
      { label: 'Center', val: 'center' },
      { label: 'Right', val: 'right' },
      { label: 'Justify', val: 'justify' }
    ].forEach(a => {
      const btn = button(a.label, () => {
        const t = T();
        if (!t) return;
        t.align = a.val;
        refreshAll();
        scheduleDraw();
      });
      alignBtns[a.val] = btn;
      alignRow.append(btn);
    });
    regRefresh(() => {
      const t = T();
      const cur = (t && t.align) || 'center';
      Object.entries(alignBtns).forEach(([val, btn]) => {
        btn.disabled = !t;
        btn.style.background = t && cur === val ? '#de5dde' : '#141416';
      });
    });
    b.append(field('Alignment', alignRow));

    const fs = fontSelect(v => {
      const t = T();
      if (!t) return;
      t.font = v;
      ensureFontReady(v).then(() => scheduleDraw());
      scheduleDraw();
    });
    regRefresh(() => {
      const t = T();
      fs._fill();
      fs.disabled = !t;
      if (t) fs.value = t.font || 'Allan';
    });
    b.append(field('Font', fs));

    const boldBtn = button('B', () => { const t = T(); if (t) { t.bold = !t.bold; refreshAll(); scheduleDraw(); } });
    boldBtn.style.fontWeight = '900';
    const italicBtn = button('I', () => { const t = T(); if (t) { t.italic = !t.italic; refreshAll(); scheduleDraw(); } });
    italicBtn.style.fontStyle = 'italic';
    regRefresh(() => {
      const t = T();
      boldBtn.disabled = !t;
      italicBtn.disabled = !t;
      boldBtn.style.background = t && t.bold ? '#de5dde' : '#141416';
      italicBtn.style.background = t && t.italic ? '#de5dde' : '#141416';
    });

    const colorSw = colorInput('#ffffff', v => {
      const t = T();
      if (t) { t.color = v; scheduleDraw(); }
    });
    regRefresh(() => {
      const t = T();
      colorSw.style.pointerEvents = t ? 'auto' : 'none';
      colorSw.style.opacity = t ? '1' : '0.5';
      if (t) colorSw.setColor(t.color || '#ffffff');
    });
    b.append(row(boldBtn, italicBtn, field('Colour', colorSw)));

    const outBtn = button('Outline', () => {
      const t = T();
      if (!t) return;
      t.outline = !t.outline;
      if (t.outline && (!t.outlineColor || t.outlineColor === '#000000') && preview.bg === '#000000') {
        t.outlineColor = '#de5dde';
      }
      refreshAll();
      scheduleDraw();
    });
    regRefresh(() => {
      const t = T();
      outBtn.disabled = !t;
      outBtn.style.background = t && t.outline ? '#de5dde' : '#141416';
    });
    const outColorSw = colorInput('#000000', v => {
      const t = T();
      if (t) { t.outlineColor = v; scheduleDraw(); }
    });
    regRefresh(() => {
      const t = T();
      outColorSw.style.pointerEvents = t ? 'auto' : 'none';
      outColorSw.style.opacity = t ? '1' : '0.5';
      if (t) outColorSw.setColor(t.outlineColor || '#000000');
    });
    b.append(row(
      outBtn,
      field('Outline colour', outColorSw),
      propNum('Outline width', 1, 40, () => T().outlineWidth || 2, v => { T().outlineWidth = v; }, on),
      fxOnBtn(T)
    ));

    b.append(row(
      propNum('Size', 8, 300, () => T().size, v => { T().size = v; }, on),
      propNum('Line gap %', 80, 250, () => Math.round((T().lineHeight || 1.2) * 100), v => { T().lineHeight = v / 100; }, on),
      propNum('Rotation °', -180, 180, () => T().rot, v => { T().rot = v; }, on)
    ));
    b.append(row(
      button('reset skew', () => { const t = T(); if (t) { t.tx = 0; t.ty = 0; refreshAll(); scheduleDraw(); } })
    ));
    b.append(fxFields(() => T().fx, on));
    b.append(presetButton(() => T().fx, on));
  }

  function applyPreset(p) {
    const d = defaultGlobal();
    Object.assign(d, p);
    Object.assign(preview.global, d);
    refreshAll();
    scheduleDraw();
    setPrevStatus('preset applied');
  }

  function openPresetMenu() {
    if (prevEls.presetWin) prevEls.presetWin.remove();
    const panel = makeFloatingPanel({
      title: 'presets', width: '300px', height: '420px', top: '120px', right: '40px'
    });
    prevEls.presetWin = panel.win;
    const grid = el('div', { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' });
    Object.entries(PRESETS).forEach(([name, p]) => {
      grid.append(button(name, () => applyPreset(p)));
    });
    grid.append(button('reset', () => applyPreset({})));
    panel.body.append(grid);
    panel.body.append(el('div', { fontSize: '11px', opacity: '0.7', marginTop: '8px' },
      'Presets change the whole picture. Adjust the sliders afterwards.'));
  }


  function selectedShape() {
    const s = preview.sel;
    return s && s.type === 'shape' ? (preview.shapes[s.index] || null) : null;
  }

  function defaultShape(kind) {
    const base = {
      kind, x: PREV_W / 2, y: PREV_H / 2, w: 160, h: 100,
      color: '#ffffff', fill: 'transparent', opacity: 1,
      strokeWidth: 3, corners: 0, dash: 0, gap: 0, dashOffset: 0,
      lineCap: 'round', lineJoin: 'round', curve: false,
      points: []
    };
    if (kind === 'line') {
      base.points = [
        { x: PREV_W * 0.25, y: PREV_H * 0.5 },
        { x: PREV_W * 0.75, y: PREV_H * 0.5 }
      ];
    }
    if (kind === 'circle') { base.w = 120; base.h = 120; }
    return base;
  }

  function buildShapesGroup(b) {
    const kinds = [
      ['line', 'Line'],
      ['rect', 'Rectangle'],
      ['circle', 'Circle'],
      ['oval', 'Oval'],
      ['triangle', 'Triangle']
    ];
    const addRow = row();
    kinds.forEach(([k, label]) => {
      addRow.append(button(label, () => {
        turnDrawOff();
        preview.shapes.push(defaultShape(k));
        preview.sel = { type: 'shape', index: preview.shapes.length - 1 };
        refreshAll();
        scheduleDraw();
        setPrevStatus('added ' + label.toLowerCase());
      }));
    });
    b.append(addRow);

    const S = () => selectedShape();
    const on = () => !!S();

    const sel = makeSelect([], v => {
      const idx = Number(v);
      if (!isNaN(idx) && preview.shapes[idx]) {
        turnDrawOff();
        preview.sel = { type: 'shape', index: idx };
        refreshAll();
        scheduleDraw();
      }
    });
    regRefresh(() => {
      const cur = preview.sel && preview.sel.type === 'shape' ? preview.sel.index : -1;
      sel.textContent = '';
      if (!preview.shapes.length) {
        const o = document.createElement('option');
        o.value = '';
        o.textContent = '(no shapes)';
        sel.appendChild(o);
        sel.disabled = true;
        return;
      }
      sel.disabled = false;
      preview.shapes.forEach((item, idx) => {
        const o = document.createElement('option');
        o.value = String(idx);
        o.textContent = `${idx + 1}: ${item.kind}`;
        sel.appendChild(o);
      });
      if (cur >= 0) sel.value = String(cur);
    });
    b.append(field('Selected', sel));

    b.append(row(
      button('remove selected', () => {
        const s = preview.sel;
        if (!s || s.type !== 'shape') return setPrevStatus('no shape selected');
        preview.shapes.splice(s.index, 1);
        preview.sel = preview.shapes.length ? { type: 'shape', index: Math.min(s.index, preview.shapes.length - 1) } : null;
        refreshAll();
        scheduleDraw();
      }),
      button('toggle curve (line)', () => {
        const sh = S();
        if (!sh || sh.kind !== 'line') return setPrevStatus('select a line');
        sh.curve = !sh.curve;
        if (sh.curve && (!sh.points || sh.points.length < 3)) {
          const a = sh.points[0], c = sh.points[sh.points.length - 1];
          sh.points = [a, { x: (a.x + c.x) / 2, y: (a.y + c.y) / 2 - 40 }, c];
        }
        refreshAll();
        scheduleDraw();
      })
    ));

    const colorSw = colorInput('#ffffff', v => { const sh = S(); if (sh) { sh.color = v; scheduleDraw(); } });
    regRefresh(() => { const sh = S(); colorSw.style.pointerEvents = sh ? 'auto' : 'none'; if (sh) colorSw.setColor(sh.color || '#ffffff'); });
    const fillSw = colorInput('#000000', v => { const sh = S(); if (sh) { sh.fill = v; scheduleDraw(); } });
    regRefresh(() => { const sh = S(); fillSw.style.pointerEvents = sh ? 'auto' : 'none'; if (sh) fillSw.setColor(sh.fill && sh.fill !== 'transparent' ? sh.fill : '#000000'); });

    b.append(row(field('Stroke', colorSw), field('Fill', fillSw)));
    b.append(row(
      button('clear fill', () => { const sh = S(); if (sh) { sh.fill = 'transparent'; scheduleDraw(); } })
    ));

    b.append(row(
      propNum('Opacity %', 0, 100, () => (S() ? (S().opacity == null ? 1 : S().opacity) * 100 : 100), v => { if (S()) S().opacity = v / 100; }, on),
      propNum('Stroke W', 1, 40, () => (S() ? S().strokeWidth || 3 : 3), v => { if (S()) S().strokeWidth = v; }, on)
    ));
    b.append(row(
      propNum('Width', 10, 800, () => (S() ? S().w || 100 : 100), v => { if (S()) S().w = v; }, on),
      propNum('Height', 10, 800, () => (S() ? S().h || 100 : 100), v => { if (S()) S().h = v; }, on)
    ));
    b.append(row(
      propNum('Corners', 0, 200, () => (S() ? S().corners || 0 : 0), v => { if (S()) S().corners = v; }, () => on() && S().kind === 'rect')
    ));
    b.append(row(
      propNum('Dash', 0, 80, () => (S() ? S().dash || 0 : 0), v => { if (S()) S().dash = v; }, on),
      propNum('Gap', 0, 80, () => (S() ? S().gap || 0 : 0), v => { if (S()) S().gap = v; }, on),
      propNum('Offset', -80, 80, () => (S() ? S().dashOffset || 0 : 0), v => { if (S()) S().dashOffset = v; }, on)
    ));

    const endsRow = row(el('span', { fontSize: '12px', fontWeight: '700' }, 'Ends'));
    ['butt', 'round', 'square'].forEach(cap => {
      const label = cap === 'butt' ? 'Flat' : (cap.charAt(0).toUpperCase() + cap.slice(1));
      const bt = button(label, () => { const sh = S(); if (!sh) return; sh.lineCap = cap; refreshAll(); scheduleDraw(); });
      regRefresh(() => {
        const sh = S();
        bt.disabled = !sh;
        bt.style.background = sh && sh.lineCap === cap ? '#de5dde' : '#141416';
      });
      endsRow.append(bt);
    });
    b.append(endsRow);

    b.append(row(
      propNum('X', 0, 2000, () => (S() ? S().x || 0 : 0), v => { if (S()) S().x = v; }, on),
      propNum('Y', 0, 2000, () => (S() ? S().y || 0 : 0), v => { if (S()) S().y = v; }, on)
    ));
  }

  function buildDrawGroup(b) {
    const tool = () => preview.drawTool;
    b.append(el('div', { fontSize: '12px', opacity: '0.8' }, 'Draw on the preview canvas. Toggle Draw / Erase, then drag.'));

    const colorSw = colorInput('#ffffff', v => { tool().color = v; refreshAll(); });
    regRefresh(() => colorSw.setColor(tool().color || '#ffffff'));
    b.append(field('Color', colorSw));
    b.append(row(
      propNum('Opacity %', 0, 100, () => (tool().opacity == null ? 1 : tool().opacity) * 100, v => { tool().opacity = v / 100; }, null),
      propNum('Size', 1, 80, () => tool().size || 8, v => { tool().size = v; }, null)
    ));

    const drawBtn = button('Draw', () => { tool().active = true; tool().erase = false; refreshAll(); setPrevStatus('draw mode on'); });
    const eraseBtn = button('Erase', () => { tool().active = true; tool().erase = true; refreshAll(); setPrevStatus('erase mode on'); });
    const offBtn = button('Off', () => { tool().active = false; refreshAll(); setPrevStatus('draw mode off'); });
    regRefresh(() => {
      drawBtn.style.background = tool().active && !tool().erase ? '#de5dde' : '#141416';
      eraseBtn.style.background = tool().active && tool().erase ? '#de5dde' : '#141416';
      offBtn.style.background = !tool().active ? '#de5dde' : '#141416';
    });
    b.append(row(drawBtn, eraseBtn, offBtn));
    b.append(row(
      button('clear drawings', () => {
        preview.drawStrokes = [];
        scheduleDraw();
        setPrevStatus('drawings cleared');
      })
    ));
  }

  let supportWin = null;
  function openSupportWindow() {
    if (supportWin && document.body.contains(supportWin)) {
      supportWin.style.display = 'flex';
      return;
    }
    supportWin = el('div', {
      position: 'fixed', top: '80px', left: '120px', width: '420px', height: '520px',
      minWidth: '320px', minHeight: '360px', background: '#000000',
      border: '2px solid #ffffff', borderRadius: '10px', zIndex: '1000001',
      display: 'flex', flexDirection: 'column', overflow: 'hidden', resize: 'both',
      boxSizing: 'border-box', boxShadow: '0px 10px 30px rgba(0,0,0,0.75)',
      fontFamily: "'Rubik', sans-serif", color: '#ffffff'
    });
    supportWin.id = 'sprunkassets-support';
    const head = el('div', {
      background: '#141416', padding: '8px 12px', cursor: 'move', display: 'flex',
      justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', flexShrink: '0'
    });
    const icon = el('img', { height: '22px', width: '22px', objectFit: 'contain' });
    icon.src = ICON_URI;
    const title = el('span', { fontSize: '13px', fontWeight: '700', marginLeft: '8px', flex: '1' }, 'sprunkassets');
    const closeBtn = el('div', {
      width: '20px', height: '20px', backgroundColor: '#8b0000', border: '1px solid #ffffff',
      borderRadius: '50%', color: '#ffffff', fontSize: '11px', fontWeight: 'bold',
      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
    }, 'X');
    closeBtn.setAttribute('data-sa-close', '1');
    closeBtn.addEventListener('click', e => {
      e.stopPropagation();
      supportWin.style.display = 'none';
    });
    head.append(icon, title, closeBtn);

    const body = el('div', {
      flex: '1', minHeight: '0', overflowY: 'auto', padding: '16px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', textAlign: 'center'
    });

    const hero = el('div', { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' });
    const heal = el('img', { maxWidth: '100%', height: 'auto', maxHeight: '200px', width: '340px', objectFit: 'contain' });
    heal.src = 'https://raw.githubusercontent.com/ZXDemon4/zxdemon4.github.io/refs/heads/main/healxilnk.svg';
    heal.alt = 'sprunkassets';
    hero.append(heal);
    body.append(hero);

    const supportRow = el('div', {
      display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center'
    });
    supportRow.append(el('span', { fontSize: '16px', fontWeight: '600' }, 'support me on'));

    function supportIconLink(href, src, alt, extraCss) {
      const a = el('a', {
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        textDecoration: 'none', transition: 'transform 0.15s ease'
      });
      a.href = href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      const img = el('img', Object.assign({
        height: '40px', width: '40px', objectFit: 'contain',
        transition: 'transform 0.15s ease', display: 'block'
      }, extraCss || {}));
      img.src = src;
      img.alt = alt;
      a.append(img);
      a.addEventListener('mouseenter', () => { a.style.transform = 'scale(1.12)'; });
      a.addEventListener('mouseleave', () => { a.style.transform = 'scale(1)'; });
      return a;
    }

    const di = supportIconLink(
      'https://dimod.org/profile/ZXDemon',
      'https://dimod.org/dimodExtended.png',
      'Dimod'
    );
    const yt = supportIconLink(
      'https://www.youtube.com/@zx_demon',
      'https://www.youtube.com/s/desktop/90fc6e41/img/favicon_144x144.png',
      'YouTube',
      { borderRadius: '8px' }
    );
    const itch = supportIconLink(
      'https://zxdemon.itch.io/',
      'https://static.itch.io/images/itchio-textless-black.svg',
      'itch.io',
      { filter: 'brightness(0) invert(1)' }
    );

    supportRow.append(di, yt, itch);
    body.append(supportRow);

    const foot = el('div', {
      fontFamily: "'Rubik', sans-serif", fontSize: '13px', opacity: '0.95', lineHeight: '1.4', maxWidth: '340px'
    });
    const gal = el('a', { color: '#de5dde', fontWeight: '600' }, 'dimod gallery extensions');
    gal.href = 'https://greenybomb.github.io/Dimod-Extension-Gallery/';
    gal.target = '_blank';
    gal.rel = 'noopener noreferrer';
    foot.append(document.createTextNode('or just check out some of my extensions on ('), gal, document.createTextNode(')'));
    body.append(foot);

    supportWin.append(head, body);
    document.body.appendChild(supportWin);
    makeDraggable(head, supportWin);
  }

  function buildEffectsGroup(b) {
    const g = preview.global;
    const gNum = (label, min, max, key) =>
      propNum(label, min, max, () => g[key], v => { g[key] = v; }, null);
    const gRgb = ch =>
      propNum('RGB ' + ch.toUpperCase(), -255, 255, () => g.rgb[ch], v => { g.rgb[ch] = v; }, null);

    const invBtn = button('Invert', () => { g.invert = !g.invert; refreshAll(); scheduleDraw(); });
    regRefresh(() => {
      invBtn.style.background = g.invert ? '#de5dde' : '#141416';
    });

    const embBtn = button('Emboss', () => { g.emboss = !g.emboss; refreshAll(); scheduleDraw(); });
    regRefresh(() => {
      embBtn.style.background = g.emboss ? '#de5dde' : '#141416';
    });

    const grid = el('div', { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' });
    grid.append(
      gNum('Vignette', -100, 100, 'vignette'),
      gNum('Blur', 0, 30, 'blur'),
      gNum('Bloom', 0, 30, 'bloom'),
      gNum('Contrast', 0, 200, 'contrast'),
      gNum('Saturation', 0, 200, 'saturation'),
      gNum('Brightness', 0, 200, 'brightness'),
      gNum('Sepia', 0, 100, 'sepia'),
      gNum('Hue °', -180, 180, 'hue'),
      gRgb('r'),
      gRgb('g'),
      gRgb('b'),
      gNum('Pixelate', 0, 40, 'pixelate'),
      gNum('Chroma split', 0, 20, 'chroma'),
      gNum('Grain', 0, 120, 'grain'),
      gNum('Distort', 0, 80, 'distort'),
      gNum('Scanlines', 0, 100, 'scanlines'),
      gNum('ASCII cell', 0, 30, 'ascii'),
      gNum('Posterize levels', 0, 16, 'posterize'),
      gNum('Threshold', 0, 255, 'threshold')
    );
    b.append(grid);

    b.append(row(
      invBtn,
      embBtn,
      button('presets', openPresetMenu),
      button('reset effects', () => {
        Object.assign(preview.global, defaultGlobal());
        refreshAll();
        scheduleDraw();
      })
    ));
  }

  function previewFileBase() {
    return 'preview';
  }

function previewCanvasBlob() {
  return new Promise((res, rej) => {
    if (!prevEls.canvas) return rej(new Error('no preview canvas'));
    try {
      prevEls.canvas.toBlob(b => (b ? res(b) : rej(new Error(TAINT_MSG))), 'image/png');
    } catch (e) {
      rej(new Error(TAINT_MSG));
    }
  });
}

  async function downloadPreviewPng() {
    drawPreview({ export: true });
    const blob = await previewCanvasBlob();
    saveBlob(blob, previewFileBase() + '.png');
    scheduleDraw();
    setPrevStatus('downloaded ' + previewFileBase() + '.png');
  }

  async function addPreviewToSpritePng() {
    const target = Scratch.vm.editingTarget;
    if (!target) {
      setPrevStatus('no sprite selected');
      return;
    }
    drawPreview({ export: true });
    const bytes = new Uint8Array(await (await previewCanvasBlob()).arrayBuffer());
    scheduleDraw();
    const { AssetType, createAsset } = Scratch.vm.runtime.storage;
    const asset = createAsset(AssetType.ImageBitmap, 'png', bytes, null, true);
    const md5ext = asset.assetId + '.' + asset.dataFormat;
    await Scratch.vm.addCostume(md5ext, {
      asset, md5ext, assetId: asset.assetId, dataFormat: asset.dataFormat,
      name: previewFileBase(), bitmapResolution: 1,
      rotationCenterX: PREV_W / 2, rotationCenterY: PREV_H / 2
    }, target.id);
    setPrevStatus('added ' + previewFileBase() + ' to ' + target.getName());
  }

function makeFloatingPanel(opts) {
  const w = el('div', {
    position: 'fixed', top: opts.top || '80px', right: opts.right || '40px', left: opts.left || 'auto',
    width: opts.width || '360px', height: opts.height || '420px',
    minWidth: '240px', minHeight: '200px',
    background: '#000', border: '2px solid #fff', borderRadius: '8px', zIndex: '1000000',
    display: 'flex', flexDirection: 'column', overflow: 'hidden', resize: 'both',
    fontFamily: "'Rubik', sans-serif", color: '#fff', boxSizing: 'border-box'
  });
  w.className = 'sa-float';
  const head = el('div', {
      padding: '8px 10px', background: '#141416', borderBottom: '1px solid #333',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'move', flexShrink: '0'
    });
    head.append(el('span', { fontWeight: '700', fontSize: '13px' }, opts.title || ''));
    const x = el('div', {
      width: '20px', height: '20px', background: '#8b0000', border: '1px solid #fff',
      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', flexShrink: '0'
    }, 'X');
    x.setAttribute('data-sa-close', '1');
    x.addEventListener('click', e => { e.stopPropagation(); w.remove(); });
    head.append(x);
    const body = el('div', { flex: '1', minHeight: '0', overflowY: 'auto', padding: '8px', boxSizing: 'border-box' });
    w.append(head, body);
    document.body.appendChild(w);
    makeDraggable(head, w);
    return { win: w, head, body };
  }

  function thumbCard(src, label, onClick) {
    const card = el('div', {
      border: '1px solid #555', borderRadius: '6px', overflow: 'hidden', cursor: 'pointer', background: '#141416'
    });
    const thumb = el('img', { width: '100%', height: '90px', objectFit: 'contain', display: 'block', background: '#222' });
    thumb.src = src;
    const lab = el('div', {
      fontSize: '10px', padding: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
    }, label);
    card.append(thumb, lab);
    card.addEventListener('click', onClick);
    return card;
  }

  async function openTemplateMenu() {
    setPrevStatus('loading templates from Logos and Previews...');
    try {
      const data = await loadFiles('sprunki_logos_previews', '', pct => {
        setPrevStatus('loading templates… ' + Math.round(pct) + '%');
      }, false);
      const images = data && data.files ? data.files.filter(f => f.kind === 'image') : [];
      if (!images.length) return setPrevStatus('no template images found');
      if (prevEls.tplWin) prevEls.tplWin.remove();
      const panel = makeFloatingPanel({ title: 'template menu', width: '380px', height: '460px', top: '70px', right: '30px' });
      prevEls.tplWin = panel.win;
      const list = el('div', { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' });
      images.forEach(f => {
        list.appendChild(thumbCard(f.url, f.name || 'image', async () => {
          try {
            setPrevStatus('loading ' + (f.name || 'image') + '…');
            await setBaseFromUrl(f.url, f.name);
            panel.win.remove();
          } catch (e) { setPrevStatus('error: ' + (e.message || e)); }
        }));
      });
      panel.body.appendChild(list);
      setPrevStatus(images.length + ' templates');
    } catch (e) {
      console.error(e);
      setPrevStatus('template load failed: ' + (e.message || e));
    }
  }

  function openSpriteStagePicker() {
    if (prevEls.spWin) prevEls.spWin.remove();
    const panel = makeFloatingPanel({ title: 'from sprite or stage', width: '300px', height: '420px', top: '90px', right: '50px' });
    prevEls.spWin = panel.win;

    (Scratch.vm.runtime.targets || []).forEach(t => {
      const name = t.isStage ? 'Stage' : (t.getName ? t.getName() : 'Sprite');
      const costumes = (t.sprite && t.sprite.costumes) || [];
      const sec = el('div', { display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' });
      let open = true;
      const headerBtn = el('button', Object.assign({}, BTN, { width: '100%', textAlign: 'left', fontWeight: '700' }), name + ' (Hide)');
      const body = el('div', { display: 'flex', flexDirection: 'column', gap: '4px' });
      headerBtn.addEventListener('click', () => {
        open = !open;
        body.style.display = open ? 'flex' : 'none';
        headerBtn.textContent = name + (open ? ' (Hide)' : ' (Show)');
      });
      costumes.forEach(c => {
        const row2 = el('div', {
          border: '1px solid #555', borderRadius: '6px', padding: '4px', cursor: 'pointer',
          display: 'flex', gap: '6px', alignItems: 'center', background: '#141416'
        });
        const thumb = el('canvas', { width: '48px', height: '48px', background: '#222', flexShrink: '0' });
        try {
          if (c.asset && c.asset.encodeDataURI) {
            const im = new Image();
            im.onload = () => {
              const cc = thumb.getContext('2d');
              const s = Math.min(48 / im.width, 48 / im.height);
              cc.drawImage(im, (48 - im.width * s) / 2, (48 - im.height * s) / 2, im.width * s, im.height * s);
            };
            im.src = c.asset.encodeDataURI();
          }
        } catch (e) { /* ignore */ }
        row2.append(thumb, el('span', { fontSize: '11px' }, c.name || 'costume'));
        row2.addEventListener('click', async () => {
          try {
            if (!c.asset) throw new Error('no asset');
            await setBaseFromUrl(c.asset.encodeDataURI(), c.name);
            panel.win.remove();
          } catch (e) { setPrevStatus('error: ' + (e.message || e)); }
        });
        body.append(row2);
      });
      sec.append(headerBtn, body);
      panel.body.appendChild(sec);
    });
  }

  function openLogoLogPicker() {
    if (prevEls.logoLogWin) prevEls.logoLogWin.remove();
    const panel = makeFloatingPanel({ title: 'add your logo', width: '360px', height: '400px', top: '80px', right: '40px' });
    prevEls.logoLogWin = panel.win;
    if (!logoLog.length) {
      panel.body.append(el('div', { fontSize: '12px', opacity: '0.7', padding: '12px' },
        'No logos yet. Download or Add to Sprite from the logo editor first.'));
      return;
    }
    const list = el('div', { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' });
    logoLog.forEach(entry => {
      list.appendChild(thumbCard(entry.dataUrl, entry.name + ' (' + entry.kind + ')', async () => {
        try {
          const img = await loadImgEl(entry.dataUrl);
          addLayer(img, entry.name, 'logo');
          panel.win.remove();
        } catch (e) { setPrevStatus('error: ' + (e.message || e)); }
      }));
    });
    panel.body.appendChild(list);
  }

function itemFor(hit) {
  if (!hit) return null;
  if (hit.type === 'text') return preview.texts[hit.index] || null;
  if (hit.type === 'shape') return preview.shapes[hit.index] || null;
  return preview.layers[hit.index] || null;
}

function makeMoveState(hit, o, pt) {
  const isLine = hit.type === 'shape' && o.kind === 'line';
  const c = isLine ? shapeBoxOf(o) : { cx: o.x || 0, cy: o.y || 0 };
  return {
    mode: 'move', type: hit.type, index: hit.index,
    ox: pt.x - c.cx, oy: pt.y - c.cy,
    lineOrigin: isLine ? (o.points || []).map(p => ({ x: p.x, y: p.y })) : null,
    startX: pt.x, startY: pt.y
  };
}

function startStroke(pt, e) {
  const t = preview.drawTool;
  const stroke = {
    points: [{ x: pt.x, y: pt.y }],
    color: t.color || '#ffffff',
    opacity: t.opacity == null ? 1 : t.opacity,
    size: t.size || 8,
    erase: !!t.erase
  };
  preview.drawStrokes.push(stroke);
  dragState = { mode: 'draw', stroke };
  prevEls.canvas.setPointerCapture(e.pointerId);
  e.preventDefault();
  scheduleDraw();
}

function onPreviewPointerDown(e) {
  const pt = canvasToPrev(e);
  if (preview.drawTool && preview.drawTool.active) {
    const hitFirst = hitTest(pt.x, pt.y);
    if (!hitFirst) { startStroke(pt, e); return; }
    turnDrawOff();
  }
  const sel = selectedPreviewBox();
  if (sel) {
    const spot = hitBoxHandle(sel.box, pt.x, pt.y, previewScale());
    if (spot) {
      dragState = {
        mode: 'xf',
        type: sel.isShape ? 'shape' : (sel.isText ? 'text' : 'layer'),
        index: preview.sel.index,
        drag: startBoxDrag(sel.box, spot, pt.x, pt.y, { ctrl: e.ctrlKey, alt: e.altKey })
      };
      prevEls.canvas.setPointerCapture(e.pointerId);
      e.preventDefault();
      return;
    }
  }
  const hit = hitTest(pt.x, pt.y);
  preview.sel = hit;
  if (hit) {
    const o = itemFor(hit);
    if (o) {
      dragState = makeMoveState(hit, o, pt);
      prevEls.canvas.setPointerCapture(e.pointerId);
    }
  }
  refreshAll();
  scheduleDraw();
  e.preventDefault();
}

function onPreviewPointerMove(e) {
  if (!dragState) return;
  const pt = canvasToPrev(e);
  if (dragState.mode === 'draw') {
    dragState.stroke.points.push({ x: pt.x, y: pt.y });
    scheduleDraw();
    return;
  }
  const o = itemFor({ type: dragState.type, index: dragState.index });
  if (!o) return;
  if (dragState.mode === 'xf') {
    const nb = boxFromDrag(dragState.drag, pt.x, pt.y);
    if (dragState.type === 'shape') applyShapeBox(o, nb);
    else applyPreviewBox(o, dragState.type === 'text', nb);
    refreshAll();
  } else if (dragState.lineOrigin) {
    const dx = pt.x - dragState.startX, dy = pt.y - dragState.startY;
    o.points = dragState.lineOrigin.map(p => ({ x: p.x + dx, y: p.y + dy }));
    const c = shapeBoxOf(o);
    o.x = Math.round(c.cx);
    o.y = Math.round(c.cy);
  } else {
    o.x = Math.round(pt.x - dragState.ox);
    o.y = Math.round(pt.y - dragState.oy);
  }
  scheduleDraw();
}

function endPreviewDrag() { dragState = null; }

function buildPreviewWindow() {
  if (prevWin) prevWin.remove();
  refreshers.length = 0;

  prevWin = el('div', {
    position: 'fixed', top: '60px', left: '90px', width: '940px', height: '580px',
    minWidth: '320px', minHeight: '380px', background: '#000000',
    border: '2px solid #ffffff', borderRadius: '8px', zIndex: '999999',
    display: 'none', flexDirection: 'column', resize: 'both', overflow: 'hidden',
    boxSizing: 'border-box', boxShadow: '0px 10px 30px rgba(0,0,0,0.75)',
    fontFamily: "'Rubik', sans-serif", userSelect: 'none', color: '#ffffff'
  });
  prevWin.id = 'sprunkassets-preview';

  const header = el('div', {
    background: '#141416', padding: '6px 12px', cursor: 'move', display: 'flex',
    justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333',
    flexShrink: '0', boxSizing: 'border-box'
  });
  const icon = el('img', { height: '26px', width: '26px', objectFit: 'contain', pointerEvents: 'none' });
  icon.src = ICON_URI;
  icon.alt = 'sprunkassets';
  const title = el('span', { fontSize: '13px', fontWeight: '700', marginLeft: '8px', flex: '1' }, 'sprunkassets');
  const closeBtn = el('div', {
    width: '20px', height: '20px', backgroundColor: '#8b0000', border: '1px solid #ffffff',
    borderRadius: '50%', color: '#ffffff', fontSize: '11px', fontWeight: 'bold',
    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
  }, 'X');
  closeBtn.setAttribute('data-sa-close', '1');
  closeBtn.addEventListener('click', e => {
    e.stopPropagation();
    prevWin.style.display = 'none';
  });
  header.append(icon, title, closeBtn);

  const previewBox = el('div', {
    flex: '1', minHeight: '0', border: '1.5px dashed #555', borderRadius: '8px',
    background: preview.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden', position: 'relative'
  });
  previewBox.className = 'sa-preview-canvas-box';
  prevEls.previewBox = previewBox;
  prevEls.canvas = document.createElement('canvas');
  prevEls.canvas.width = PREV_W;
  prevEls.canvas.height = PREV_H;
  Object.assign(prevEls.canvas.style, { maxWidth: '100%', maxHeight: '100%', touchAction: 'none' });
  prevEls.ctx = prevEls.canvas.getContext('2d');
  previewBox.append(prevEls.canvas);

  prevEls.canvas.addEventListener('pointerdown', onPreviewPointerDown);
  prevEls.canvas.addEventListener('pointermove', onPreviewPointerMove);
  prevEls.canvas.addEventListener('pointerup', endPreviewDrag);
  prevEls.canvas.addEventListener('pointercancel', endPreviewDrag);

  prevEls.status = el('div', { fontSize: '11px', opacity: '0.7', minHeight: '14px', flexShrink: '0' }, '');

  const leftCol = el('div', {
    flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '8px',
    padding: '10px', boxSizing: 'border-box'
  });
  leftCol.className = 'sa-preview-left';
  leftCol.append(el('div', { fontSize: '22px', fontWeight: '700', flexShrink: '0' }, 'preview editor'), previewBox, prevEls.status);

  const rightCol = el('div', {
    width: '360px', flexShrink: '0', display: 'flex', flexDirection: 'column', gap: '8px',
    overflowY: 'auto', padding: '10px', boxSizing: 'border-box', borderLeft: '1px solid #333'
  });
  rightCol.className = 'sa-preview-right';
  rightCol.append(
    makeGroup('Picture', buildPictureGroup),
    makeGroup('Image', b => buildLayerGroup(b, 'image')),
    makeGroup('shapes n` lines', buildShapesGroup),
    makeGroup('draw', buildDrawGroup),
    makeGroup('Text', buildTextGroup),
    makeGroup('Effects', buildEffectsGroup),
    makeGroup('Logo', b => buildLayerGroup(b, 'logo')),
    row(
      button('Download', () => {
        downloadPreviewPng().catch(e => setPrevStatus('error: ' + (e.message || e)));
      }),
      button('Add to Sprite (png)', () => {
        addPreviewToSpritePng().catch(e => setPrevStatus('error: ' + (e.message || e)));
      })
    )
  );

  const bodyRow = el('div', { flex: '1', minHeight: '0', display: 'flex', flexDirection: 'row', overflow: 'hidden' });
  bodyRow.className = 'sa-preview-body';
  bodyRow.append(leftCol, rightCol);

  prevWin.append(header, bodyRow);
  document.body.appendChild(prevWin);
  makeDraggable(header, prevWin);
  refreshAll();
  scheduleDraw();
}

  async function openPreviewWindow() {
    if (!prevWin || !document.body.contains(prevWin)) buildPreviewWindow();
    prevWin.style.display = 'flex';
    refreshAll();
    scheduleDraw();
  }


  const MOD_ITEMS = Object.entries(WIKIS).map(([key, w]) => ({ text: w.name, value: key }));
  const PACK_ITEMS = Object.entries(PACKS).map(([key, p]) => ({ text: p.title, value: key }));
  const ASSET_FILTER_ITEMS = [
    { text: 'all', value: 'all' },
    { text: 'images', value: 'images' },
    { text: 'audios', value: 'audios' },
    { text: 'gifs', value: 'gifs' }
  ];

  class sprunkassets {
    get vm() { return Scratch.vm; }

    getInfo() {
      injectStyle();
      startHostedFonts();
      return {
        id: 'sprunkassets',
        name: 'sprunkassets',
        blockIconURI: ICON_URI,
        menuIconURI: ICON_URI,
        color1: BLOCK_COLOR,
        color2: BLOCK_BORDER,
        color3: DROPDOWN_COLOR,
        blocks: [
          {
            opcode: 'checkWiki',
            text: 'check the wiki for [NAME] in the mod [MOD] only for [FILTER]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'oren' },
              MOD: { type: Scratch.ArgumentType.STRING, menu: 'MODS_MENU', defaultValue: 'official' },
              FILTER: { type: Scratch.ArgumentType.STRING, menu: 'ASSET_FILTER_MENU', defaultValue: 'all' }
            }
          },
          {
            opcode: 'addPack',
            text: 'add [PACK]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              PACK: { type: Scratch.ArgumentType.STRING, menu: 'PACK_MENU', defaultValue: DEFAULT_PACK }
            }
          },
          {
            opcode: 'makeLogo',
            text: 'make a logo',
            blockType: Scratch.BlockType.COMMAND
          },
          {
            opcode: 'makePreview',
            text: 'make a preview',
            blockType: Scratch.BlockType.COMMAND
          },
          {
            opcode: 'supportThisGuy',
            text: 'support this guy!',
            blockType: Scratch.BlockType.COMMAND
          }
        ],
        menus: {
          MODS_MENU: {
            acceptReporters: true,
            items: MOD_ITEMS
          },
          PACK_MENU: {
            acceptReporters: true,
            items: PACK_ITEMS
          },
          ASSET_FILTER_MENU: {
            acceptReporters: true,
            items: ASSET_FILTER_ITEMS
          }
        }
      };
    }

    async checkWiki(args) {
      showWindow();
      hidePackPanel();
      const wiki = WIKIS[String(args.MOD || '').trim()] ? String(args.MOD).trim() : 'official';
      const filter = String(args.FILTER || 'all').trim();
      await runSearch(wiki, args.NAME, filter, false);
    }

    async addPack(args) {
      const key = PACKS[String(args.PACK || '').trim()] ? String(args.PACK).trim() : DEFAULT_PACK;
      await openPackWindow(key);
    }

    async makeLogo() {
      try {
        await openLogoWindow();
      } catch (e) {
        console.error('[sprunkassets] make a logo failed:', e);
      }
    }

    async makePreview() {
      try {
        await openPreviewWindow();
      } catch (e) {
        console.error('[sprunkassets] make a preview failed:', e);
      }
    }

    async supportThisGuy() {
      try {
        openSupportWindow();
      } catch (e) {
        console.error('[sprunkassets] support this guy failed:', e);
      }
    }
  }

  Scratch.extensions.register(new sprunkassets());
})(Scratch);
