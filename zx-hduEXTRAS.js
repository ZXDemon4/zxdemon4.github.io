(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This extension must run Unsandboxed to handle external fetches and costume management.');
  }

  class HDUExtras {
    constructor() {
      this.avatarCache = new Map();
    }

    getInfo() {
      return {
        id: 'hduextras',
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
            opcode: 'fetchWidgetAvatar',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get avatar URL from server widget [SERVER_ID] for user ID [USER_ID]',
            arguments: {
              SERVER_ID: { type: Scratch.ArgumentType.STRING, defaultValue: '123456789012345678' },
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

    /**
     * Standard avatar lookup using Lanyard API / Discord Default CDN fallback.
     */
    async _getAvatarUrl(userId) {
      userId = String(userId || '').trim();
      if (!userId) return '';

      if (this.avatarCache.has(userId)) {
        return this.avatarCache.get(userId);
      }

      let avatarUrl = '';

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

    /**
     * Widget API lookup: Fetches the server widget JSON (widget.json) 
     * to extract active member avatar URLs directly from a guild without Lanyard.
     */
    async fetchWidgetAvatar(args) {
      const serverId = String(args.SERVER_ID || '').trim();
      const userId = String(args.USER_ID || '').trim();

      if (!serverId || !userId) return '';

      const cacheKey = `widget_${serverId}_${userId}`;
      if (this.avatarCache.has(cacheKey)) {
        return this.avatarCache.get(cacheKey);
      }

      try {
        const response = await Scratch.fetch(`https://discord.com/api/guilds/${serverId}/widget.json`);
        if (response.ok) {
          const data = await response.json();
          if (data.members && Array.isArray(data.members)) {
            const member = data.members.find(m => String(m.id) === userId);
            if (member && member.avatar_url) {
              this.avatarCache.set(cacheKey, member.avatar_url);
              return member.avatar_url;
            }
          }
        }
      } catch (err) {
        console.warn('Discord Widget API error:', err);
      }

      // Fallback to primary avatar method if not found in active widget members
      return await this._getAvatarUrl(userId);
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
        const response = await Scratch.fetch(avatarUrl);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();

        const costumeName = `discord_${userId}`;
        const target = util.target;

        const existingIdx = target.sprite.costumes.findIndex(c => c.name === costumeName);
        if (existingIdx !== -1) {
          target.setCostume(existingIdx);
          return;
        }

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

        await Scratch.vm.addCostume(costumeObject.assetId, costumeObject, target.id);
        const newIndex = target.sprite.costumes.length - 1;
        target.setCostume(newIndex);
      } catch (err) {
        console.error('Failed to load avatar costume:', err);
      }
    }
  }

  Scratch.extensions.register(new HDUExtras());
})(Scratch);
