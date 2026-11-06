(function (Scratch) {
  'use strict';

  if (!document.getElementById('dimod-rubik-font')) {
    const fontLink = document.createElement('link');
    fontLink.id = 'dimod-rubik-font';
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap';
    document.head.appendChild(fontLink);
  }
const ICON_URI = 'https://raw.githubusercontent.com/ZXDemon4/zxdemon4.github.io/main/difetchplus-icon.png';
 const ICON_SIZE = '128px';

  const ICON_URLS = new Set([
    'https://dimod.org/silk/color_wheel.png',
    'https://dimod.org/silk/html.png',
    'https://dimod.org/silk/font.png',
    'https://content.67jukes.org/stuff/bubket.png',
    'https://dimod.org/silk/weather_sun.png',
    'https://dimod.org/silk/lightbulb.png',
    'https://dimod.org/silk/pencil.png',
    'https://dimod.org/silk/calendar.png',
    'https://dimod.org/silk/cog.png',
    'https://dimod.org/silk/coins.png',
    'https://dimod.org/silk/magnifier.png',
    'https://content.67jukes.org/site-art/c200d8e0-1459-44e2-b311-4b0fc44da730.webp',
    'https://dimod.org/silk/eye.png',
    'https://dimod.org/silk/world.png',
    'https://dimod.org/silk/pin.png',
    'https://dimod.org/silk/shield.png',
    'https://content.67jukes.org/stuff/youtube.png?v=1'
  ]);

  const HALLOWEEN_URLS = [
    'https://content.67jukes.org/occasion-themes/299c4555-72d6-4120-8b62-1dbcecc7091d.webp',
    'https://content.67jukes.org/occasion-themes/a047d5fe-5edb-4391-9598-99405d878e95.webp',
    'https://content.67jukes.org/occasion-themes/557bc395-26f5-48a7-b5db-a98ab0deaff4.webp',
    'https://content.67jukes.org/occasion-themes/58a8d0e3-0c2a-444a-81a8-83d5573bb052.webp',
    'https://content.67jukes.org/occasion-themes/76d2e28c-a48c-4c3e-a06d-17852a7f8859.webp',
    'https://content.67jukes.org/occasion-themes/14b3e13d-fe8f-4c13-bbc1-e1f71d7866d4.webp',
    'https://content.67jukes.org/occasion-themes/bf1d9545-a18e-4fff-af7b-2ab4c1c82b19.webp',
    'https://content.67jukes.org/occasion-themes/139a8400-8f78-45b9-a778-cb7af108841c.webp',
    'https://content.67jukes.org/occasion-themes/a4849b0f-8ef7-4af4-8920-28a52da72a7e.webp',
    'https://content.67jukes.org/occasion-themes/93c0fab0-c196-421d-82f6-25e4d0fadd5e.webp',
    'https://content.67jukes.org/occasion-themes/075a5ff1-828a-43c7-8794-0ed5647271cc.webp',
    'https://content.67jukes.org/occasion-themes/23023cd3-5368-4b50-85f3-a5090b6bdbad.webp',
    'https://content.67jukes.org/occasion-themes/8432bf7c-1007-4615-a242-bb50f43e89a7.webp',
    'https://content.67jukes.org/occasion-themes/0a77e55c-d40b-403d-bedc-38161b8ee28b.webp',
    'https://content.67jukes.org/occasion-themes/a64137b3-abd6-45b5-bbcb-7c680bd297c9.webp',
    'https://content.67jukes.org/occasion-themes/cddbd577-ab0e-4ed1-9eff-79f3a61ec562.webp'
  ];

  const BANNER_URLS = [
    'https://content.67jukes.org/homepage-banners/5e485c2f-c4b1-4d51-8258-0c199c05fdd2.webp',
    'https://content.67jukes.org/homepage-banners/a0fab225-b53d-4d40-b936-a2563d6ddf1f.webp',
    'https://content.67jukes.org/homepage-banners/98c54fb8-9975-46e0-b611-a84b06ce4aa2.webp',
    'https://content.67jukes.org/homepage-banners/d6910db0-7a27-454b-9768-30953cf6ef3b.webp',
    'https://content.67jukes.org/homepage-banners/c0fdc258-4e80-49cf-9598-c58bbd77917f.webp',
    'https://content.67jukes.org/homepage-banners/808c8fc0-4701-4b9b-b2bc-e779339460e2.webp',
    'https://content.67jukes.org/homepage-banners/5d3da676-3fdd-4b5d-9559-50ca482ac6cf.webp',
    'https://content.67jukes.org/homepage-banners/815a8454-b4b7-4321-aa21-a84a411a8064.webp',
    'https://content.67jukes.org/homepage-banners/5fade6c5-88bb-4cad-8439-d72870e3c33a.webp',
    'https://content.67jukes.org/homepage-banners/f9ab79a2-cbea-4667-9848-906e1395bd20.webp',
    'https://content.67jukes.org/homepage-banners/76ecfc05-4302-4955-9a37-ae97be8c3c93.webp',
    'https://content.67jukes.org/homepage-banners/f9e271ba-1639-4014-8060-425745d29892.webp',
    'https://content.67jukes.org/homepage-banners/9c8544d0-c5f2-4b22-bde4-cbce30c6c171.webp',
    'https://content.67jukes.org/homepage-banners/89260d4b-6398-4017-b9b5-6f63171c0094.webp',
    'https://content.67jukes.org/homepage-banners/81bbe52f-ed94-4320-af53-ca38d4968bc4.webp',
    'https://content.67jukes.org/homepage-banners/a8db4000-aaa7-41f0-aa5a-5ee9e1b75bcd.webp',
    'https://content.67jukes.org/homepage-banners/b496129b-d273-4104-86d9-41842d95d9d4.webp',
    'https://content.67jukes.org/homepage-banners/de18b98d-3b37-4c4d-b131-8baeec13670a.webp',
    'https://content.67jukes.org/homepage-banners/afb53d09-cd9d-417f-9134-e648b30e3398.webp',
    'https://content.67jukes.org/homepage-banners/de38afac-791b-4987-b271-3799d62a68c7.webp',
    'https://content.67jukes.org/homepage-banners/8df57466-daf6-4dc7-923f-a1a46dd96a55.webp',
    'https://content.67jukes.org/homepage-banners/427d45c5-6116-432f-ab0d-82fe00de0d40.webp',
    'https://content.67jukes.org/homepage-banners/e390b4ad-d2b9-4082-8f13-952f7e0b8902.webp',
    'https://content.67jukes.org/homepage-banners/ff4e5c2f-b199-47f4-8064-38ab23321b88.webp',
    'https://content.67jukes.org/homepage-banners/f39ffd90-eafa-4192-80ce-16b135f1c8d1.webp',
    'https://content.67jukes.org/homepage-banners/d3060fbc-91fb-4766-afb5-6bcb42edf916.webp',
    'https://content.67jukes.org/homepage-banners/207da9cd-b608-440d-8df6-1acfd7190f9f.webp',
    'https://content.67jukes.org/homepage-banners/814161f6-55ed-4bec-9947-58bb195ed67c.webp',
    'https://content.67jukes.org/homepage-banners/e2f2571d-0139-459c-92a7-974d92ce7007.webp',
    'https://content.67jukes.org/homepage-banners/17644ec0-03d2-4377-93a8-ea3db0b88bb5.webp',
    'https://content.67jukes.org/homepage-banners/0618df29-8e60-4173-9cab-bab2b2f5fb22.webp',
    'https://content.67jukes.org/homepage-banners/33b96292-4d4d-47b2-8df4-a5209f4e22e9.webp'
  ];

  const BADGE_MAP = [
    { id: '44dee8c3-26dd-4b02-9a9d-d86187315acd', name: 'Good at speling', shorthand: 'spel' },
    { id: '655cb3f1-047f-4607-baff-f3c617a56908', name: 'The Hometown Butcher', shorthand: 'htb' },
    { id: 'f6aaa8f6-de46-47b4-9864-34080ea56131', name: 'based', shorthand: 'basd' },
    { id: '087ae7d9-4283-4e4f-a1b4-2ebba25c545b', name: 'bot', shorthand: 'bot' },
    { id: 'a7d9167f-783e-4877-8673-11f30ceb50d9', name: 'bugsquisher', shorthand: 'bug' },
    { id: '120a3225-835e-4617-bc0b-af8fd2ffff33', name: 'canmod', shorthand: 'yc' },
    { id: 'ae75db6d-2173-4028-b7e1-d8eba60cce24', name: 'discord linked', shorthand: 'discord' },
    { id: '9baabb3c-c8d9-4a79-b377-161002e1710d', name: 'donor', shorthand: 'd♥' },
    { id: 'a7c14f7f-de2a-4f7d-824b-61aced9dfaf7', name: 'draker', shorthand: 'hi' },
    { id: '74ce709f-9f14-470e-b522-a83484965cfc', name: 'expression wizard', shorthand: 'wizard' },
    { id: '1ccc4ab0-02f7-4f8e-9f60-9f3fbed6c8ca', name: 'figglehorn', shorthand: 'f' },
    { id: '08c8a5b2-f1b2-41b4-af99-79d778fb5caa', name: 'forum wizard', shorthand: 'forum wiz' },
    { id: 'b3455cfa-5fde-40de-aca8-ed81d31c40f1', name: 'gerard', shorthand: 'gerard' },
    { id: '6db4c596-04fa-42d4-8ec7-2c813688f24f', name: 'gg', shorthand: 'gg' },
    { id: '8355e403-e893-4a02-83ac-3e1e32da7eb6', name: 'goodie', shorthand: 'g' },
    { id: 'd2f26bc5-b61e-41e9-96b1-872cbbc73b71', name: 'gubd', shorthand: 'gubd' },
    { id: '49aab285-7618-4017-805c-bc879eab8728', name: 'hi guys', shorthand: 'hgys' },
    { id: '64302241-4045-46dc-8d7c-0aa411d73bfd', name: 'lolbit', shorthand: 'lbit' },
    { id: 'fbb7cb85-a77c-4f4c-ad1b-87686e5bce84', name: 'm2000', shorthand: '2000' },
    { id: '36dd51b4-88db-424a-bc6e-1d13832941ba', name: 'mascotter', shorthand: 'mw' },
    { id: 'c8f9d158-5614-476f-a063-1daf2f9c80b7', name: 'member #100', shorthand: 'm100' },
    { id: '0cb4bc69-2eba-4278-ab96-aa83c9a5ff6f', name: 'member #1000', shorthand: 'm1000' },
    { id: '5c01db40-d61c-4ce6-9510-97308dbec1fe', name: 'member #200', shorthand: 'm200' },
    { id: '1b552ea7-37d1-4f6d-badb-ec7a28ef5087', name: 'member #250', shorthand: 'm250' },
    { id: '5badb6ed-1d91-4698-b5e4-c78d651cb386', name: 'member #300', shorthand: 'm300' },
    { id: '5cc11b22-1a2b-4d64-99b8-adb8795026d7', name: 'member #400', shorthand: 'm400' },
    { id: '0ac6de30-92b9-4a7a-b047-aca8e2db0aba', name: 'member #500', shorthand: 'm500' },
    { id: '96f12047-ae9e-4f3d-a5b3-19d89dd657fd', name: 'member #600', shorthand: 'm600' },
    { id: '561f040e-9702-47f3-a39f-466878e10ef4', name: 'member #700', shorthand: 'm700' },
    { id: 'ec71b3f5-c0a3-47aa-ab22-bdd2b29116a2', name: 'member #750', shorthand: 'm750' },
    { id: '28c3ebf3-fe7f-4d1d-9ac4-6a77f9d67f7f', name: 'member #770', shorthand: 'm770' },
    { id: '3685890b-ce66-4820-b07a-5dacbcca702e', name: 'member #800', shorthand: 'm800' },
    { id: '38a2bcb0-10cf-4bfc-81f8-2e526a38c719', name: 'member #900', shorthand: 'm900' },
    { id: '9b0b8ebb-4147-4ba6-b237-f56e0abf9bcf', name: 'minimod', shorthand: 'mmod' },
    { id: 'eba75ae5-1d76-49b7-b30e-489aec55098c', name: 'mortal', shorthand: 'm' },
    { id: '1c66076a-603d-4098-88cc-4b73e3d2c795', name: 'musk', shorthand: 'pp' },
    { id: 'ce9dcf0a-3494-45de-902a-db1f024d6237', name: 'polo', shorthand: 'polo' },
    { id: 'eb688b76-8a4f-4dfe-ae9b-f0a466c76694', name: 'saint', shorthand: 'saint' },
    { id: '01d3c12f-3139-4775-a490-c0f8b99aee6d', name: 'supporter', shorthand: 'sp♥' },
    { id: '3f8327a3-e2b4-435d-80a6-559ac86eeb5d', name: 'test', shorthand: 't' },
    { id: 'e7362b9b-4d34-4a3d-a2a4-af164cb24120', name: 'test user', shorthand: '[test]' },
    { id: '387c5854-0cc1-4fd7-af2d-840dc4d9e674', name: 'trusted', shorthand: 'trusted' },
    { id: '5695ae97-ce9b-4c48-a114-c053a4783d53', name: 'winner', shorthand: '#1' }
  ];

  class DifetchPlusMerged {
    constructor() {
      this.menuContainer = null;
      this.imageElement = null;
      this.placeholderText = null;
      this.contentArea = null;
      this.urlInput = null;
      this.sliderRow = null;
      this.sliderLabel = null;
      this.slider = null;
      this.sliderNum = null;
      this.currentUrl = '';
      this.currentMode = null;
      this.isMinimized = false;
      this.savedHeight = '360px';
      this._ensureUI();

      window.difetchPreview = {
        showHalloween: (n) => this._showHalloween(Math.round(Number(n)) - 1),
        showBanner: (n) => this._showBanner(Math.round(Number(n)) - 1),
        showRandomBanner: () => this._showRandomBanner(),
        show: () => this.showImagePreview(),
        hide: () => this.hideImagePreview()
      };
    }

    getInfo() {
      return {
        id: 'difetchplus',
        name: 'Difetch+',
        blockIconURI: ICON_URI || undefined,
        menuIconURI: ICON_URI || undefined,
        color1: '#795299',
        color2: '#623f7d',
        color3: '#4d2f63',
        blocks: [
          { blockType: Scratch.BlockType.LABEL, text: 'User API' },
          {
            opcode: 'dmf_fetch_user_full',
            text: 'get user info of [USER]',
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true,
            allowDropAnywhere: true,
            arguments: { USER: { type: Scratch.ArgumentType.STRING, defaultValue: 'byte' } }
          },
          {
            opcode: 'dmf_fetch_user_data',
            text: 'get [QUERY] of user [USER]',
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true,
            allowDropAnywhere: true,
            arguments: {
              USER: { type: Scratch.ArgumentType.STRING, defaultValue: 'byte' },
              QUERY: { type: Scratch.ArgumentType.STRING, menu: 'user_data', defaultValue: 'dit_balance' }
            }
          },
          {
            opcode: 'dmf_fetch_user_booleans',
            text: 'is user [USER] [QUERY]?',
            blockType: Scratch.BlockType.BOOLEAN,
            disableMonitor: true,
            allowDropAnywhere: true,
            arguments: {
              USER: { type: Scratch.ArgumentType.STRING, defaultValue: 'byte' },
              QUERY: { type: Scratch.ArgumentType.STRING, menu: 'user_booleans', defaultValue: 'is_trusted' }
            }
          },

          { blockType: Scratch.BlockType.LABEL, text: 'Game API' },
          {
            opcode: 'dmf_fetch_game_full',
            text: 'get project info of [GAME] by user [USER]',
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true,
            allowDropAnywhere: true,
            arguments: {
              GAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'dizzysweeper' },
              USER: { type: Scratch.ArgumentType.STRING, defaultValue: 'byte' }
            }
          },
          {
            opcode: 'dmf_fetch_game_data',
            text: 'get [QUERY] of [GAME] by [USER]',
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true,
            allowDropAnywhere: true,
            arguments: {
              GAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'dizzysweeper' },
              USER: { type: Scratch.ArgumentType.STRING, defaultValue: 'byte' },
              QUERY: { type: Scratch.ArgumentType.STRING, menu: 'game_data', defaultValue: 'play_count' }
            }
          },
          {
            opcode: 'dmf_fetch_game_booleans',
            text: 'is [GAME] by [USER] [QUERY]?',
            blockType: Scratch.BlockType.BOOLEAN,
            disableMonitor: true,
            allowDropAnywhere: true,
            arguments: {
              GAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'dizzysweeper' },
              USER: { type: Scratch.ArgumentType.STRING, defaultValue: 'byte' },
              QUERY: { type: Scratch.ArgumentType.STRING, menu: 'game_booleans', defaultValue: 'featured' }
            }
          },

          { blockType: Scratch.BlockType.LABEL, text: 'Badges & Preview' },
          {
            opcode: 'getAllBadges',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get all badges from [TEXT]',
            arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'byte' } }
          },
          {
            opcode: 'userHasBadge',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'user [USER] has [BADGE] badge?',
            arguments: {
              USER: { type: Scratch.ArgumentType.STRING, defaultValue: 'byte' },
              BADGE: { type: Scratch.ArgumentType.STRING, menu: 'BADGES_MENU', defaultValue: 'trusted' }
            }
          },
          '---',
          {
            opcode: 'showImagePreview',
            blockType: Scratch.BlockType.COMMAND,
            text: 'show image preview'
          },
          {
            opcode: 'hideImagePreview',
            blockType: Scratch.BlockType.COMMAND,
            text: 'hide image preview'
          },
          {
            opcode: 'setImageAsset',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set image preview asset [ASSET]',
            arguments: {
              ASSET: {
                type: Scratch.ArgumentType.STRING,
                menu: 'ASSET_MENU',
                defaultValue: 'https://content.67jukes.org/stuff/dit.png'
              }
            }
          },
          {
            opcode: 'setUserPreview',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set user preview to [QUERY] of user [USER]',
            arguments: {
              QUERY: { type: Scratch.ArgumentType.STRING, menu: 'USER_PREVIEW_QUERY', defaultValue: 'avatar_url' },
              USER: { type: Scratch.ArgumentType.STRING, defaultValue: 'byte' }
            }
          },
          {
            opcode: 'randomBannerPreview',
            blockType: Scratch.BlockType.COMMAND,
            text: 'random banner preview'
          },
          {
            opcode: 'setBannerPreview',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set banner preview [N]',
            arguments: {
              N: { type: Scratch.ArgumentType.STRING, menu: 'BANNER_SLIDER_MENU', defaultValue: '1' }
            }
          },
          {
            opcode: 'setHalloweenPreview',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set halloween assets preview [N]',
            arguments: {
              N: { type: Scratch.ArgumentType.STRING, menu: 'HALLOWEEN_MENU', defaultValue: '1' }
            }
          }
        ],
        menus: {
          user_data: {
            acceptReporters: true,
            items: [
              { text: 'ID', value: 'id' },
              { text: 'username', value: 'username' },
              { text: 'bio', value: 'bio' },
              { text: 'custom CSS', value: 'custom_css' },
              { text: 'role', value: 'role' },
              { text: 'join date', value: 'created_at' },
              { text: 'profile picture URL', value: 'avatar_url' },
              { text: 'profile banner URL', value: 'banner_url' },
              { text: 'custom name color', value: 'name_color' },
              { text: 'custom name HTML', value: 'name_html' },
              { text: 'custom title', value: 'custom_title' },
              { text: 'dits', value: 'dit_balance' },
              { text: 'followers', value: 'follower_count' },
              { text: 'following', value: 'following_count' },
              { text: 'badge list', value: 'badges' },
              { text: 'credibility', value: 'credibility_score' }
            ]
          },
          user_booleans: {
            acceptReporters: true,
            items: [
              { text: 'trusted', value: 'is_trusted' },
              { text: 'banned', value: 'is_banned' }
            ]
          },
          game_data: {
            acceptReporters: true,
            items: [
              { text: 'ID', value: 'id' },
              { text: 'owner ID', value: 'owner_id' },
              { text: 'owner name', value: 'owner_username' },
              { text: 'title', value: 'name' },
              { text: 'tags', value: 'tags' },
              { text: 'play count', value: 'play_count' },
              { text: 'remix_count', value: 'remix_count' },
              { text: 'description', value: 'description' },
              { text: 'custom CSS', value: 'custom_CSS' },
              { text: 'thumbnail URL', value: 'thumbnail_URL' },
              { text: 'thumbnail key', value: 'thumbnail_key' },
              { text: 'project screenshots', value: 'screenshots' },
              { text: 'visibility', value: 'visibility' },
              { text: 'creation date', value: 'created_at' },
              { text: 'last updated', value: 'updated_at' },
              { text: 'search vector', value: 'search_vector' },
              { text: 'slug', value: 'slug' },
              { text: 'content warnings', value: 'content_flags' },
              { text: 'kind', value: 'kind' },
              { text: 'comment count', value: 'comment_count' },
              { text: 'current version', value: 'current_version' },
              { text: 'version history', value: 'version_history' }
            ]
          },
          game_booleans: {
            acceptReporters: true,
            items: [
              { text: 'featured', value: 'featured' },
              { text: 'allow remixes', value: 'allow_remix' },
              { text: 'cloud project', value: 'is_cloud' },
              { text: 'auto-thumbnail', value: 'thumbnail_is_auto' },
              { text: 'comments open', value: 'comments_open' },
              { text: 'owner unrestricted', value: 'owner_unrestricted' }
            ]
          },
          BADGES_MENU: {
            acceptReporters: true,
            items: BADGE_MAP.map(b => ({ text: b.name, value: b.shorthand }))
          },
          HALLOWEEN_MENU: {
            acceptReporters: true,
            items: HALLOWEEN_URLS.map((url, idx) => ({ text: `halloween [${idx + 1}]`, value: String(idx + 1) }))
          },
          BANNER_SLIDER_MENU: {
            acceptReporters: true,
            items: BANNER_URLS.map((url, idx) => ({ text: `banner [${idx + 1}]`, value: String(idx + 1) }))
          },
          USER_PREVIEW_QUERY: {
            acceptReporters: true,
            items: [
              { text: 'profile picture URL', value: 'avatar_url' },
              { text: 'profile banner URL', value: 'banner_url' }
            ]
          },
          ASSET_MENU: {
            acceptReporters: true,
            items: [
              { text: 'dit', value: 'https://content.67jukes.org/stuff/dit.png' },
              { text: 'preview', value: 'https://draker.8os.space/dimodBanner.jpg' },
              { text: 'dimod title', value: 'https://dimod.org/dimodExtended.png' },
              { text: 'halloween title', value: 'https://content.67jukes.org/occasion-themes/cddbd577-ab0e-4ed1-9eff-79f3a61ec562.webp' },
              { text: 'color wheel', value: 'https://dimod.org/silk/color_wheel.png' },
              { text: 'html', value: 'https://dimod.org/silk/html.png' },
              { text: 'custom title', value: 'https://dimod.org/silk/font.png' },
              { text: 'bucket', value: 'https://content.67jukes.org/stuff/bubket.png' },
              { text: 'weather sun (dit boost)', value: 'https://dimod.org/silk/weather_sun.png' },
              { text: 'lightbulb (spotlight)', value: 'https://dimod.org/silk/lightbulb.png' },
              { text: 'pencil (username rename)', value: 'https://dimod.org/silk/pencil.png' },
              { text: 'calendar', value: 'https://dimod.org/silk/calendar.png' },
              { text: 'cog (settings)', value: 'https://dimod.org/silk/cog.png' },
              { text: 'coins', value: 'https://dimod.org/silk/coins.png' },
              { text: 'magnifier', value: 'https://dimod.org/silk/magnifier.png' },
              { text: 'warp', value: 'https://content.67jukes.org/site-art/c200d8e0-1459-44e2-b311-4b0fc44da730.webp' },
              { text: 'eye (view game)', value: 'https://dimod.org/silk/eye.png' },
              { text: 'world (public)', value: 'https://dimod.org/silk/world.png' },
              { text: 'pin (unlisted)', value: 'https://dimod.org/silk/pin.png' },
              { text: 'shield (private)', value: 'https://dimod.org/silk/shield.png' },
              { text: 'youtube', value: 'https://content.67jukes.org/stuff/youtube.png?v=1' }
            ]
          }
        }
      };
    }

    // --- Dimod Fetch Handlers ---
    async dmf_fetch_user_full(args) {
      if (args.USER != null && args.USER !== '') {
        try {
          const response = await fetch(`https://api.dimod.org/api/users/${args.USER}/`);
          if (!response.ok) throw new Error('HTTP error:' + response.status);
          const data = await response.json();
          return JSON.stringify(data);
        } catch (error) {
          console.error('aw man! fetching didnt work', error);
          return '';
        }
      } else {
        console.error('ERROR!!! you need to input a user buddy');
        return '';
      }
    }

    async dmf_fetch_user_data(args) {
      if (args.USER != null && args.USER !== '') {
        try {
          const response = await fetch(`https://api.dimod.org/api/users/${args.USER}/`);
          if (!response.ok) throw new Error('HTTP error:' + response.status);
          const data = await response.json();
          if (args.QUERY !== 'badges') {
            return data[args.QUERY] !== undefined ? data[args.QUERY] : '';
          } else {
            return JSON.stringify(data[args.QUERY] || []);
          }
        } catch (error) {
          console.error('aw man! fetching didnt work', error);
          return '';
        }
      } else {
        console.error('ERROR!!! you need to input a user buddy');
        return '';
      }
    }

    async dmf_fetch_user_booleans(args) {
      const result = await this.dmf_fetch_user_data(args);
      return result ? Boolean(result) : false;
    }

    async dmf_fetch_game_full(args) {
      if (args.USER != null && args.USER !== '' && args.GAME != null && args.GAME !== '') {
        try {
          const response = await fetch(`https://api.dimod.org/api/users/${args.USER}/${args.GAME}/`);
          if (!response.ok) throw new Error('HTTP error:' + response.status);
          const data = await response.json();
          return JSON.stringify(data);
        } catch (error) {
          console.error('aw man! fetching didnt work', error);
          return '';
        }
      } else {
        console.error('ERROR!!! you need to input both a game AND a user buddy');
        return '';
      }
    }

    async dmf_fetch_game_data(args) {
      if (args.USER != null && args.USER !== '' && args.GAME != null && args.GAME !== '') {
        try {
          const response = await fetch(`https://api.dimod.org/api/users/${args.USER}/${args.GAME}/`);
          if (!response.ok) throw new Error('HTTP error:' + response.status);
          const data = await response.json();
          const complexQueries = ['tags', 'content_flags', 'current_version', 'version_history', 'screenshots'];
          if (!complexQueries.includes(args.QUERY)) {
            return data[args.QUERY] !== undefined ? data[args.QUERY] : '';
          } else {
            return JSON.stringify(data[args.QUERY] || []);
          }
        } catch (error) {
          console.error('aw man! fetching didnt work', error);
          return '';
        }
      } else {
        console.error('ERROR!!! you need to input both a game AND a user buddy');
        return '';
      }
    }

    async dmf_fetch_game_booleans(args) {
      const result = await this.dmf_fetch_game_data(args);
      return result ? Boolean(result) : false;
    }

    // ---------- badges ----------
    // fetches a user's full info, or returns null if it fails
    async _fetchUserInfo(name) {
      const user = String(name ?? '').trim();
      if (!user) return null;
      try {
        const response = await fetch(`https://api.dimod.org/api/users/${encodeURIComponent(user)}/`);
        if (!response.ok) throw new Error('HTTP error:' + response.status);
        return await response.json();
      } catch (error) {
        console.error('aw man! fetching didnt work', error);
        return null;
      }
    }

    _extractBadges(text) {
      if (typeof text !== 'string') text = String(text || '');
      const foundBadges = [];

      try {
        const parsed = JSON.parse(text);
        let badgeList = [];
        if (Array.isArray(parsed)) badgeList = parsed;
        else if (parsed && Array.isArray(parsed.badges)) badgeList = parsed.badges;

        if (badgeList.length > 0) {
          for (const item of badgeList) {
            if (typeof item === 'string') {
              foundBadges.push(item);
            } else if (item && typeof item === 'object') {
              if (item.shorthand) foundBadges.push(item.shorthand);
              if (item.id) {
                const match = BADGE_MAP.find(b => b.id === item.id);
                if (match && !foundBadges.includes(match.shorthand)) foundBadges.push(match.shorthand);
              }
            }
          }
          return foundBadges;
        }
      } catch (e) {}

      const lowerText = text.toLowerCase();
      for (const badge of BADGE_MAP) {
        if (
          lowerText.includes(badge.id.toLowerCase()) ||
          lowerText.includes(`"${badge.shorthand}"`) ||
          lowerText.includes(`'${badge.shorthand}'`) ||
          lowerText.includes(`shorthand":"${badge.shorthand}"`)
        ) {
          if (!foundBadges.includes(badge.shorthand)) foundBadges.push(badge.shorthand);
        }
      }
      return foundBadges;
    }

    // accepts either a username or the output of get user info of [USER]
    async getAllBadges(args) {
      const text = String(args.TEXT ?? '').trim();
      if (!text) return '[]';
      const looksLikeJson = text.startsWith('{') || text.startsWith('[');
      if (looksLikeJson) {
        return JSON.stringify(this._extractBadges(text));
      }
      const info = await this._fetchUserInfo(text);
      if (!info) return '[]';
      return JSON.stringify(this._extractBadges(JSON.stringify(info)));
    }

    // user [name] has [badge] badge?  -- badge can be the name or the shorthand
    async userHasBadge(args) {
      const info = await this._fetchUserInfo(args.USER);
      if (!info) return false;

      const wanted = String(args.BADGE ?? '').trim().toLowerCase();
      if (!wanted) return false;

      const match = BADGE_MAP.find(b =>
        b.name.toLowerCase() === wanted || b.shorthand.toLowerCase() === wanted
      );
      const target = match ? match.shorthand.toLowerCase() : wanted;

      const owned = this._extractBadges(JSON.stringify(info)).map(b => b.toLowerCase());
      return owned.includes(target);
    }

    // ---------- ui ----------
    _ensureUI() {
      if (this.menuContainer && document.body.contains(this.menuContainer)) return;

      const existing = document.getElementById('difetch-plus-menu');
      if (existing) existing.remove();

      const w = (this.menuContainer = document.createElement('div'));
      w.id = 'difetch-plus-menu';
      Object.assign(w.style, {
        position: 'fixed',
        top: '80px',
        right: '80px',
        width: '480px',
        height: '360px',
        minWidth: '320px',
        minHeight: '220px',
        background: '#000000',
        border: '2px solid #ffffff',
        borderRadius: '8px',
        zIndex: '999999',
        display: 'none',
        flexDirection: 'column',
        resize: 'both',
        overflow: 'hidden',
        boxSizing: 'border-box',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.75)',
        fontFamily: "'Rubik', sans-serif",
        userSelect: 'none',
        willChange: 'width, height'
      });

      const header = document.createElement('div');
      Object.assign(header.style, {
        background: '#141416',
        color: '#fff',
        padding: '8px 12px',
        cursor: 'move',
        userSelect: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #333',
        flexShrink: '0',
        boxSizing: 'border-box'
      });

      const titleWrap = document.createElement('div');
      titleWrap.style.display = 'flex';
      titleWrap.style.alignItems = 'center';
      titleWrap.style.gap = '8px';

      const titleText = document.createElement('span');
      titleText.textContent = 'Image Preview:';
      Object.assign(titleText.style, {
        color: '#7b52ab',
        fontSize: '12px',
        fontWeight: '500',
        fontFamily: "'Rubik', sans-serif"
      });
      titleWrap.appendChild(titleText);

      const btnContainer = document.createElement('div');
      btnContainer.style.display = 'flex';
      btnContainer.style.gap = '6px';
      btnContainer.style.alignItems = 'center';

      const minBtn = document.createElement('button');
      minBtn.textContent = '🗕';
      Object.assign(minBtn.style, {
        background: 'transparent',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '14px',
        padding: '0 4px',
        outline: 'none'
      });
      minBtn.title = 'Minimize / Restore';
      minBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.isMinimized = !this.isMinimized;
        if (this.isMinimized) {
          this.savedHeight = w.style.height || `${w.offsetHeight}px`;
          this.contentArea.style.display = 'none';
          w.style.height = 'auto';
          w.style.minHeight = '0';
          w.style.resize = 'none';
        } else {
          this.contentArea.style.display = 'flex';
          w.style.height = this.savedHeight;
          w.style.minHeight = '220px';
          w.style.resize = 'both';
        }
      });

      const closeBtn = document.createElement('div');
      closeBtn.textContent = 'X';
      Object.assign(closeBtn.style, {
        width: '20px',
        height: '20px',
        backgroundColor: '#8b0000',
        border: '1px solid #ffffff',
        borderRadius: '50%',
        color: '#ffffff',
        fontSize: '11px',
        fontWeight: 'bold',
        fontFamily: "'Rubik', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      });
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.hideImagePreview();
      });

      btnContainer.appendChild(minBtn);
      btnContainer.appendChild(closeBtn);
      header.appendChild(titleWrap);
      header.appendChild(btnContainer);
      w.appendChild(header);

      const contentArea = document.createElement('div');
      this.contentArea = contentArea;
      Object.assign(contentArea.style, {
        flexGrow: '1',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        gap: '8px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        minHeight: '0',
        minWidth: '0'
      });

      const previewArea = document.createElement('div');
      Object.assign(previewArea.style, {
        flex: '1',
        border: '2px dashed #ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        background: '#0a0a0c',
        minHeight: '0',
        minWidth: '0'
      });

      const placeholder = document.createElement('div');
      placeholder.textContent = 'Image preview will be here';
      Object.assign(placeholder.style, {
        color: '#888',
        fontSize: '16px',
        textAlign: 'center',
        fontFamily: "'Rubik', sans-serif"
      });

      const img = document.createElement('img');
      Object.assign(img.style, {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
        display: 'none'
      });

      previewArea.appendChild(placeholder);
      previewArea.appendChild(img);
      contentArea.appendChild(previewArea);

      const sliderRow = document.createElement('div');
      this.sliderRow = sliderRow;
      Object.assign(sliderRow.style, {
        display: 'none',
        alignItems: 'center',
        gap: '8px',
        flexShrink: '0',
        boxSizing: 'border-box',
        fontFamily: "'Rubik', sans-serif",
        color: '#ffb366',
        fontSize: '13px'
      });

      const sliderLabel = document.createElement('span');
      this.sliderLabel = sliderLabel;

      const slider = document.createElement('input');
      this.slider = slider;
      slider.type = 'range';
      slider.min = '1';
      slider.step = '1';
      slider.value = '1';
      Object.assign(slider.style, {
        flexGrow: '1',
        minWidth: '0',
        cursor: 'pointer',
        accentColor: '#ff8c1a'
      });
      slider.addEventListener('input', () => {
        if (this.currentMode === 'halloween') {
          this._showHalloween(Number(slider.value) - 1);
        } else if (this.currentMode === 'banner') {
          this._showBanner(Number(slider.value) - 1);
        }
      });

      const sliderNum = document.createElement('span');
      this.sliderNum = sliderNum;
      sliderNum.style.minWidth = '52px';
      sliderNum.style.textAlign = 'right';

      sliderRow.append(sliderLabel, slider, sliderNum);
      contentArea.appendChild(sliderRow);

      const bottomBar = document.createElement('div');
      Object.assign(bottomBar.style, {
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        flexShrink: '0',
        boxSizing: 'border-box'
      });

      const downloadBtn = document.createElement('button');
      downloadBtn.textContent = 'Download';
      Object.assign(downloadBtn.style, {
        background: '#141416',
        color: '#ffffff',
        border: '1.5px solid #ffffff',
        borderRadius: '6px',
        padding: '6px 12px',
        fontSize: '13px',
        fontFamily: "'Rubik', sans-serif",
        cursor: 'pointer',
        fontWeight: '500',
        outline: 'none',
        whiteSpace: 'nowrap'
      });
      downloadBtn.addEventListener('click', () => {
        if (!this.currentUrl) return;
        const a = document.createElement('a');
        a.href = this.currentUrl;
        a.download = 'image.png';
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });

      const copyBtn = document.createElement('button');
      copyBtn.textContent = 'Copy Link';
      Object.assign(copyBtn.style, {
        background: '#141416',
        color: '#ffffff',
        border: '1.5px solid #ffffff',
        borderRadius: '6px',
        padding: '6px 12px',
        fontSize: '13px',
        fontFamily: "'Rubik', sans-serif",
        cursor: 'pointer',
        fontWeight: '500',
        outline: 'none',
        whiteSpace: 'nowrap'
      });
      copyBtn.addEventListener('click', () => {
        if (!this.currentUrl) return;
        navigator.clipboard.writeText(this.currentUrl).then(() => {
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy Link'; }, 1500);
        });
      });

      const urlInput = document.createElement('input');
      this.urlInput = urlInput;
      urlInput.type = 'text';
      urlInput.readOnly = true;
      urlInput.value = '(link of image here)';
      Object.assign(urlInput.style, {
        flexGrow: '1',
        minWidth: '0',
        background: '#141416',
        color: '#aaaaaa',
        border: '1.5px solid #333333',
        borderRadius: '6px',
        padding: '6px 10px',
        fontSize: '13px',
        fontFamily: "'Rubik', sans-serif",
        outline: 'none',
        boxSizing: 'border-box',
        textOverflow: 'ellipsis'
      });

      bottomBar.appendChild(downloadBtn);
      bottomBar.appendChild(copyBtn);
      bottomBar.appendChild(urlInput);
      contentArea.appendChild(bottomBar);

      w.appendChild(contentArea);
      document.body.appendChild(w);

      this.imageElement = img;
      this.placeholderText = placeholder;

      this._setupSmoothDrag(header, w);
    }

    _setupSmoothDrag(header, el) {
      let isDragging = false;
      let startX = 0, startY = 0;
      let currentX = 0, currentY = 0;
      let rafId = null;

      header.addEventListener('mousedown', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.style.borderRadius === '50%') return;
        isDragging = true;
        startX = e.clientX - el.offsetLeft;
        startY = e.clientY - el.offsetTop;
        e.preventDefault();
      });

      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
        currentX = Math.max(0, Math.min(currentX, window.innerWidth - el.offsetWidth));
        currentY = Math.max(0, Math.min(currentY, window.innerHeight - el.offsetHeight));

        if (!rafId) {
          rafId = requestAnimationFrame(() => {
            el.style.left = currentX + 'px';
            el.style.top = currentY + 'px';
            el.style.right = 'auto';
            el.style.bottom = 'auto';
            rafId = null;
          });
        }
      });

      document.addEventListener('mouseup', () => {
        isDragging = false;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      });
    }

    showImagePreview() {
      this._ensureUI();
      if (this.menuContainer) this.menuContainer.style.display = 'flex';
    }

    hideImagePreview() {
      if (this.menuContainer) this.menuContainer.style.display = 'none';
    }

    _showUrl(url) {
      this._ensureUI();
      this.currentUrl = url;

      const hIdx = HALLOWEEN_URLS.indexOf(url);
      const bIdx = BANNER_URLS.indexOf(url);

      if (hIdx >= 0) {
        this.currentMode = 'halloween';
        this.sliderRow.style.display = 'flex';
        this.sliderLabel.textContent = 'Halloween';
        this.slider.min = '1';
        this.slider.max = String(HALLOWEEN_URLS.length);
        this.slider.value = String(hIdx + 1);
        this.sliderNum.textContent = `${hIdx + 1}/${HALLOWEEN_URLS.length}`;
      } else if (bIdx >= 0) {
        this.currentMode = 'banner';
        this.sliderRow.style.display = 'flex';
        this.sliderLabel.textContent = 'Banner';
        this.slider.min = '1';
        this.slider.max = String(BANNER_URLS.length);
        this.slider.value = String(bIdx + 1);
        this.sliderNum.textContent = `${bIdx + 1}/${BANNER_URLS.length}`;
      } else {
        this.currentMode = null;
        this.sliderRow.style.display = 'none';
      }

      if (!url) {
        this.imageElement.style.display = 'none';
        this.placeholderText.style.display = 'block';
        if (this.urlInput) {
          this.urlInput.value = '(link of image here)';
          this.urlInput.style.color = '#aaaaaa';
        }
        return;
      }

      this.imageElement.src = url;
      this.imageElement.style.display = 'block';
      this.placeholderText.style.display = 'none';

      const isIcon = ICON_URLS.has(url);
      this.imageElement.style.width = isIcon ? ICON_SIZE : '';
      this.imageElement.style.height = isIcon ? ICON_SIZE : '';
      this.imageElement.style.maxWidth = isIcon ? 'none' : '100%';
      this.imageElement.style.maxHeight = isIcon ? 'none' : '100%';

      if (this.urlInput) {
        this.urlInput.value = url;
        this.urlInput.style.color = '#ffffff';
      }
    }

    _showHalloween(index) {
      const count = HALLOWEEN_URLS.length;
      const idx = ((index % count) + count) % count;
      this._showUrl(HALLOWEEN_URLS[idx]);
    }

    _showBanner(index) {
      const count = BANNER_URLS.length;
      const idx = ((index % count) + count) % count;
      this._showUrl(BANNER_URLS[idx]);
    }

    _showRandomBanner() {
      const url = BANNER_URLS[Math.floor(Math.random() * BANNER_URLS.length)];
      this._showUrl(url);
    }

    setImageAsset(args) {
      this._showUrl(Scratch.Cast.toString(args.ASSET || '').trim());
    }

    async setUserPreview(args) {
      this.showImagePreview();
      const user = Scratch.Cast.toString(args.USER || '').trim();
      const query = Scratch.Cast.toString(args.QUERY || 'avatar_url').trim();

      const imageUrl = await this.dmf_fetch_user_data({ USER: user, QUERY: query });
      if (typeof imageUrl === 'string' && imageUrl.startsWith('http')) {
        this._showUrl(imageUrl);
      } else {
        this._showUrl('');
      }
    }

    randomBannerPreview() {
      this.showImagePreview();
      this._showRandomBanner();
    }

    setBannerPreview(args) {
      this.showImagePreview();
      const n = Number(args.N) || 1;
      this._showBanner(n - 1);
    }

    setHalloweenPreview(args) {
      this.showImagePreview();
      const n = Number(args.N) || 1;
      this._showHalloween(n - 1);
    }
  }

  Scratch.extensions.register(new DifetchPlusMerged());
})(Scratch);
