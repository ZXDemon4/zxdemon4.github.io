(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This extension must run Unsandboxed to handle cross-origin assets and canvas skins.');
  }

  class HolyDiscordHDU {
    constructor() {
      this.imageCache = new Map();
      this.avatarCache = new Map();
      this.lastBinaryString = '';
      this.isProcessing = false;
      this.offscreenCanvas = document.createElement('canvas');
      this.offscreenCtx = this.offscreenCanvas.getContext('2d');
    }

    getInfo() {
      return {
        id: 'holydiscordhdu',
        name: 'Holy Discord Unemployment (HDU)',
        color1: '#5865F2',
        color2: '#4752C4',
        blocks: [
          {
            opcode: 'fetchDiscordAvatar',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get discord avatar URL for user ID [USER_ID]',
            arguments: {
              USER_ID: { type: Scratch.ArgumentType.STRING, defaultValue: '123456789012345678' }
            }
          },
          {
            opcode: 'blendFromBinaryOptimized',
            blockType: Scratch.BlockType.COMMAND,
            text: 'blend backgrounds fast string [CHAR_STRING] blur [BLUR] width [WIDTH] height [HEIGHT] skin [SKIN_NAME]',
            arguments: {
              CHAR_STRING: { 
                type: Scratch.ArgumentType.STRING, 
                defaultValue: '00000100000000000000010000000' 
              },
              BLUR: { type: Scratch.ArgumentType.NUMBER, defaultValue: 60 },
              WIDTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1290 },
              HEIGHT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 600 },
              SKIN_NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'blendedSkin' }
            }
          }
        ]
      };
    }

    /**
     * Fetches live user data from Lanyard API to get the user's current avatar hash.
     * Returns direct CDN URL for PNG avatar.
     */
    async fetchDiscordAvatar(args) {
      const userId = String(args.USER_ID || '').trim();
      if (!userId) return '';

      if (this.avatarCache.has(userId)) {
        return this.avatarCache.get(userId);
      }

      try {
        const response = await Scratch.fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const json = await response.json();

        if (json.success && json.data && json.data.discord_user) {
          const avatarHash = json.data.discord_user.avatar;
          if (avatarHash) {
            const isAnimated = avatarHash.startsWith('a_');
            const ext = isAnimated ? 'gif' : 'png';
            const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${ext}?size=256`;
            this.avatarCache.set(userId, avatarUrl);
            return avatarUrl;
          }
        }
      } catch (err) {
        console.warn('Failed to fetch live Discord avatar:', err);
      }

      // Default fallback avatar if not found on live tracker
      return `https://cdn.discordapp.com/embed/avatars/${BigInt(userId || 0) % 5n}.png`;
    }

    _loadCostumeCached(target, index) {
      const costumes = target.sprite.costumes;
      const costume = costumes[index] || costumes[0];
      if (!costume) return Promise.resolve(null);

      const cacheKey = costume.asset.assetId || costume.name;
      if (this.imageCache.has(cacheKey)) {
        return Promise.resolve(this.imageCache.get(cacheKey));
      }

      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
          this.imageCache.set(cacheKey, img);
          resolve(img);
        };
        img.onerror = () => resolve(null);
        img.src = costume.asset.encodeDataURI();
      });
    }

    _drawSmartCoverWithBlurredFill(ctx, img, canvasWidth, canvasHeight) {
      const imgWidth = img.naturalWidth || img.width || 1;
      const imgHeight = img.naturalHeight || img.height || 1;

      // Fit width & height proportionately based on canvas size
      const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const drawWidth = imgWidth * scale;
      const drawHeight = imgHeight * scale;

      // Center image precisely
      const mainX = (canvasWidth - drawWidth) / 2;
      const mainY = (canvasHeight - drawHeight) / 2;

      // 1. Draw blurred 200% scaling backdrop layer to fill transparent gaps
      const fillScale = scale * 1.25;
      const bgDrawW = imgWidth * fillScale;
      const bgDrawH = imgHeight * fillScale;
      const bgX = (canvasWidth - bgDrawW) / 2;
      const bgY = (canvasHeight - bgDrawH) / 2;

      ctx.save();
      ctx.filter = 'blur(30px)';
      ctx.drawImage(img, bgX, bgY, bgDrawW, bgDrawH);
      ctx.restore();

      // 2. Draw centered un-distorted original image
      ctx.drawImage(img, mainX, mainY, drawWidth, drawHeight);
    }

    async blendFromBinaryOptimized(args, util) {
      const rawString = String(args.CHAR_STRING || '');

      if (rawString === this.lastBinaryString) return;
      if (this.isProcessing) return;

      const activeIndices = [];
      for (let i = 0; i < rawString.length; i++) {
        if (rawString.charAt(i) === '1') {
          activeIndices.push(i);
        }
      }

      if (activeIndices.length === 0) {
        this.lastBinaryString = rawString;
        return;
      }

      this.isProcessing = true;
      const target = util.target;
      const images = [];

      for (const costumeIdx of activeIndices) {
        const img = await this._loadCostumeCached(target, costumeIdx);
        if (img) images.push(img);
      }

      if (images.length === 0) {
        this.isProcessing = false;
        return;
      }

      const canvasWidth = Math.max(1, Number(args.WIDTH) || Scratch.vm.runtime.stageWidth || 480);
      const canvasHeight = Math.max(1, Number(args.HEIGHT) || Scratch.vm.runtime.stageHeight || 360);

      this.offscreenCanvas.width = canvasWidth;
      this.offscreenCanvas.height = canvasHeight;
      const finalCtx = this.offscreenCtx;
      finalCtx.clearRect(0, 0, canvasWidth, canvasHeight);

      const count = images.length;
      const sliceWidth = canvasWidth / count;
      const blurRadius = Math.max(1, Number(args.BLUR) || 60);

      const layerCanvas = document.createElement('canvas');
      layerCanvas.width = canvasWidth;
      layerCanvas.height = canvasHeight;
      const layerCtx = layerCanvas.getContext('2d');

      const maskCanvas = document.createElement('canvas');
      maskCanvas.width = canvasWidth;
      maskCanvas.height = canvasHeight;
      const maskCtx = maskCanvas.getContext('2d');

      images.forEach((img, index) => {
        layerCtx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        this._drawSmartCoverWithBlurredFill(layerCtx, img, canvasWidth, canvasHeight);

        if (index > 0) {
          maskCtx.clearRect(0, 0, canvasWidth, canvasHeight);

          const sliceX = index * sliceWidth;
          const startX = Math.max(0, sliceX - blurRadius / 2);
          const endX = Math.min(canvasWidth, sliceX + blurRadius / 2);

          const grad = maskCtx.createLinearGradient(startX, 0, endX, 0);
          grad.addColorStop(0, 'rgba(0,0,0,0)');
          grad.addColorStop(0.5, 'rgba(0,0,0,0.5)');
          grad.addColorStop(1, 'rgba(0,0,0,1)');

          maskCtx.fillStyle = grad;
          maskCtx.fillRect(0, 0, canvasWidth, canvasHeight);

          layerCtx.globalCompositeOperation = 'destination-in';
          layerCtx.drawImage(maskCanvas, 0, 0);
          layerCtx.globalCompositeOperation = 'source-over';
        }

        finalCtx.globalCompositeOperation = 'source-over';
        finalCtx.drawImage(layerCanvas, 0, 0);
      });

      const renderer = Scratch.vm.runtime.renderer;
      if (renderer) {
        if (!window.TurboSkins) window.TurboSkins = {};
        if (!window.TurboSkins.skins) window.TurboSkins.skins = new Map();

        const newSkinId = renderer.createBitmapSkin(this.offscreenCanvas);
        window.TurboSkins.skins.set(args.SKIN_NAME, newSkinId);

        if (target.drawableID !== null && target.drawableID !== undefined) {
          renderer.updateDrawableSkinId(target.drawableID, newSkinId);
        }
      }

      this.lastBinaryString = rawString;
      this.isProcessing = false;
    }
  }

  Scratch.extensions.register(new HolyDiscordHDU());
})(Scratch);
