(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This extension must run Unsandboxed to manage sprite costumes and external fetch.');
  }

  class HolyDiscordHDU {
    constructor() {
      this.avatarCache = new Map();
    }

    getInfo() {
      return {
        id: 'holydiscordhdu',
        name: 'HDU-EXTRAS',
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
            opcode: 'loadAvatarAsCostume',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set costume to discord avatar of user ID [USER_ID]',
            arguments: {
              USER_ID: { type: Scratch.ArgumentType.STRING, defaultValue: '123456789012345678' }
            }
          }
        ]
      };
    }

    async _getAvatarUrl(userId) {
      userId = String(userId || '').trim();
      if (!userId) return '';

      if (this.avatarCache.has(userId)) {
        return this.avatarCache.get(userId);
      }

      let avatarUrl = '';

      // 1. Try fetching live presence data from Lanyard API
      try {
        const response = await Scratch.fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        if (response.ok) {
          const json = await response.json();
          if (json.success && json.data && json.data.discord_user) {
            const user = json.data.discord_user;
            if (user.avatar) {
              const ext = user.avatar.startsWith('a_') ? 'gif' : 'png';
              avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${user.avatar}.${ext}?size=256`;
            }
          }
        }
      } catch (err) {
        console.warn('Lanyard API error:', err);
      }

      // 2. Fallback to Discord default embed avatar if live tracking isn't active for the user
      if (!avatarUrl) {
        try {
          const index = Number(BigInt(userId) % 5n);
          avatarUrl = `https://cdn.discordapp.com/embed/avatars/${index}.png`;
        } catch (e) {
          avatarUrl = 'https://cdn.discordapp.com/embed/avatars/0.png';
        }
      }

      this.avatarCache.set(userId, avatarUrl);
      return avatarUrl;
    }

    async fetchDiscordAvatar(args) {
      return await this._getAvatarUrl(args.USER_ID);
    }

    async loadAvatarAsCostume(args, util) {
      const userId = String(args.USER_ID || '').trim();
      if (!userId) return;

      const avatarUrl = await this._getAvatarUrl(userId);
      if (!avatarUrl) return;

      try {
        // Fetch image raw arrayBuffer
        const response = await Scratch.fetch(avatarUrl);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();

        const costumeName = `discord_${userId}`;
        const target = util.target;

        // Check if costume already exists on this sprite
        const existingIdx = target.sprite.costumes.findIndex(c => c.name === costumeName);
        if (existingIdx !== -1) {
          target.setCostume(existingIdx);
          return;
        }

        // Add dynamically loaded PNG to VM assets
        const asset = new Scratch.vm.runtime.storage.Asset(
          Scratch.vm.runtime.storage.AssetType.ImageBitmap,
          null,
          Scratch.vm.runtime.storage.DataFormat.PNG,
          new Uint8Array(arrayBuffer),
          true
        );

        const costumeObject = {
          name: costumeName,
          asset: asset,
          assetId: asset.assetId,
          dataFormat: 'png',
          bitmapResolution: 1,
          rotationCenterX: 128,
          rotationCenterY: 128
        };

        // Add costume and set target costume index
        await Scratch.vm.addCostume(costumeObject.assetId, costumeObject, target.id);
        const newIndex = target.sprite.costumes.length - 1;
        target.setCostume(newIndex);
      } catch (err) {
        console.error('Failed to load avatar costume:', err);
      }
    }
  }

  Scratch.extensions.register(new HolyDiscordHDU());
})(Scratch);
