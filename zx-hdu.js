(function (Scratch) {
    'use strict';

    class CombinedDiscordExtension {
        constructor() {
            this.botToken = '';
            this.webhooks = Array(50).fill('');

            // use jsonbin.io to fetch chats from a server, use any bot hosting websites, recommended: botghost
            this.binId = 'YOUR_BIN_ID';
            this.apiKey = '';
            this.messages = [];
            this.lastTimestamp = null;

            // live gateway for bot checks
            this.gatewayWs = null;
            this.presenceCache = new Map(); 
            this.statusStartCache = new Map(); 
            this.customStatusCache = new Map(); 
            this.activeGuildId = null;

            // Cache for Widget fetching
            this.widgetCache = new Map(); // serverId -> { data, timestamp }
            this.WIDGET_CACHE_TTL = 10000;
        }

        getInfo() {
            return {
                id: 'holyDiscordUnemployment',
                name: 'holy discord unemployment',
                color1: '#5865F2',
                color2: '#4752C4',
                color3: '#3C45A5',

                blocks: [
                    // DC Checker, this requires a bot token! get the bot token from here: https://discord.com/developers/applications
                    {
                        opcode: 'setBotToken',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Server Checker: set bot token to [TOKEN]',
                        arguments: {
                            TOKEN: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'connectGateway',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Server Checker: start live tracker for server [SERVER_ID]',
                        arguments: {
                            SERVER_ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'checkUserStatusBot',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'Server Checker: user ID [USER_ID] status is [STATUS]?',
                        arguments: {
                            USER_ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                            STATUS: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'statusModes',
                                defaultValue: 'online'
                            }
                        }
                    },
                    {
                        opcode: 'getUserCustomStatus',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Server Checker: get user ID [USER_ID] custom status text',
                        arguments: {
                            USER_ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'getUserCustomStatusEmoji',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Server Checker: get user ID [USER_ID] custom status emoji',
                        arguments: {
                            USER_ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'getStatusDurationSeconds',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Server Checker: seconds user ID [USER_ID] has been in current status',
                        arguments: {
                            USER_ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },

                    '---',

                    
                    // widget server checker, you need no bots for this
                
                    {
                        opcode: 'fetchServerData',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Widget Checker: fetch [DATA_TYPE] from server [SERVER_ID] with [MEMBER_LIMIT] users',
                        arguments: {
                            DATA_TYPE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'dataTypes',
                                defaultValue: 'usernames'
                            },
                            SERVER_ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '123456789012345678'
                            },
                            MEMBER_LIMIT: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'memberLimits',
                                defaultValue: 'max'
                            }
                        }
                    },
                    {
                        opcode: 'isUserIdOnline',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'Widget Checker: is user ID [USER_ID] online in server [SERVER_ID]?',
                        arguments: {
                            USER_ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '123456789012345678'
                            },
                            SERVER_ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '123456789012345678'
                            }
                        }
                    },
                    {
                        opcode: 'isDisplayNameOnline',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'Widget Checker: display name [DISPLAY_NAME] online in server [SERVER_ID]?',
                        arguments: {
                            DISPLAY_NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Wumpus'
                            },
                            SERVER_ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '123456789012345678'
                            }
                        }
                    },
                    {
                        opcode: 'isUsernameOnline',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'Widget Checker: username [USERNAME] online in server [SERVER_ID]?',
                        arguments: {
                            USERNAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'wumpus_official'
                            },
                            SERVER_ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '123456789012345678'
                            }
                        }
                    },
                    {
                        opcode: 'isUserStatus',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'Widget Checker: is user ID [USER_ID] [STATUS] in server [SERVER_ID]?',
                        arguments: {
                            USER_ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '123456789012345678'
                            },
                            STATUS: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'statusModes',
                                defaultValue: 'online'
                            },
                            SERVER_ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '123456789012345678'
                            }
                        }
                    },

                    '---',

                    
                    // use Webhooks to message, go to Apps and then Integrations and then Webhooks to make a webhook.
                    
                    {
                        opcode: 'sendMessage',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Webhook Messager: send message [MESSAGE] to webhook [WEBHOOK]',
                        arguments: {
                            MESSAGE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Hello from PenguinMod!'
                            },
                            WEBHOOK: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'https://discord.com/api/webhooks/yourwebhook'
                            }
                        }
                    },
                    {
                        opcode: 'sendWebhookPing',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Webhook Messager: send ping to webhook [WEBHOOK_URL] user ID [USER_ID] with message [MESSAGE]',
                        arguments: {
                            WEBHOOK_URL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'https://discord.com/api/webhooks/...'
                            },
                            USER_ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '123456789012345678'
                            },
                            MESSAGE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Attention needed!'
                            }
                        }
                    },

                    '---',

                   
                    // 4. Use multiple webhooks at once to message! (This is sometimes buggy and doesn't work after 15+ webhooks together.
                    
                    {
                        opcode: 'setWebhookSlot',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Slot Manager: set webhook slot [SLOT] to URL [URL]',
                        arguments: {
                            SLOT: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            URL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'https://discord.com/api/webhooks/...'
                            }
                        }
                    },
                    {
                        opcode: 'sendMessageToSlot',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Slot Manager: send message [MESSAGE] to stored webhook slot [SLOT]',
                        arguments: {
                            MESSAGE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Hello from Scratch!'
                            },
                            SLOT: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    },
                    {
                        opcode: 'sendMessageToAllSlots',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Slot Manager: send message [MESSAGE] to ALL stored webhooks',
                        arguments: {
                            MESSAGE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Broadcast to all webhooks!'
                            }
                        }
                    },
                    {
                        opcode: 'getWebhookSlot',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Slot Manager: stored webhook in slot [SLOT]',
                        arguments: {
                            SLOT: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    },
                    {
                        opcode: 'clearAllWebhooks',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Slot Manager: clear all stored webhooks'
                    },

                    '---',

                   
                    // Code for fetching the chats
                    
                    {
                        opcode: 'setCredentials',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Chat Fetcher: set Bin ID [BIN_ID] and Access Key [KEY]',
                        arguments: {
                            BIN_ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'YOUR_BIN_ID'
                            },
                            KEY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'fetchHistory',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Chat Fetcher: fetch discord chat history'
                    },
                    {
                        opcode: 'getMessageCount',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Chat Fetcher: total messages count'
                    },
                    {
                        opcode: 'getItemAtIndex',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Chat Fetcher: [PROP] at index [INDEX]',
                        arguments: {
                            PROP: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'propertyMenu',
                                defaultValue: 'message'
                            },
                            INDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    },
                    {
                        opcode: 'getLatestProp',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Chat Fetcher: latest [PROP]',
                        arguments: {
                            PROP: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'propertyMenu',
                                defaultValue: 'username'
                            }
                        }
                    },
                    {
                        opcode: 'clearHistory',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Chat Fetcher: clear local message history'
                    }
                ],

                menus: {
                    statusModes: {
                        acceptReporters: true,
                        items: [
                            { text: 'online', value: 'online' },
                            { text: 'idle', value: 'idle' },
                            { text: 'do not disturb (dnd)', value: 'dnd' },
                            { text: 'offline', value: 'offline' }
                        ]
                    },
                    dataTypes: {
                        acceptReporters: true,
                        items: [
                            { text: 'all usernames', value: 'usernames' },
                            { text: 'avatar URLs', value: 'pfps' },
                            { text: 'display names', value: 'displaynames' },
                            { text: 'server name', value: 'servername' },
                            { text: 'all online members', value: 'onlinemembers' },
                            { text: 'channel names', value: 'channelnames' },
                            { text: 'number of channels', value: 'channelcount' }
                        ]
                    },
                    memberLimits: {
                        acceptReporters: true,
                        items: [
                            { text: '10', value: '10' },
                            { text: '25', value: '25' },
                            { text: '50', value: '50' },
                            { text: '100', value: '100' },
                            { text: '150', value: '150' },
                            { text: '200', value: '200' },
                            { text: '250', value: '250' },
                            { text: '300', value: '300' },
                            { text: '350', value: '350' },
                            { text: '400', value: '400' },
                            { text: '500', value: '500' },
                            { text: '600', value: '600' },
                            { text: '750', value: '750' },
                            { text: '900', value: '900' },
                            { text: '1000', value: '1000' },
                            { text: 'max', value: 'max' }
                        ]
                    },
                    propertyMenu: {
                        acceptReporters: true,
                        items: [
                            'message',
                            'username',
                            'pfp',
                            'server name',
                            'channel name',
                            'channel id',
                            'timestamp'
                        ]
                    }
                }
            };
        }

        // Extract the emojies and state of status.
        _parseCustomStatus(activities) {
            if (!Array.isArray(activities)) return { state: '', emoji: '' };
            
            const customActivity = activities.find(a => a && typeof a === 'object' && a.type === 4);
            if (!customActivity) return { state: '', emoji: '' };

            const state = customActivity.state || '';
            const emoji = customActivity.emoji ? (customActivity.emoji.name || '') : '';

            return { state, emoji };
        }

        // Start time, end time of recent moood
        _updateUserStatus(userId, newStatus) {
            const oldStatus = this.presenceCache.get(userId);
            if (oldStatus !== newStatus) {
                this.presenceCache.set(userId, newStatus);
                this.statusStartCache.set(userId, Date.now());
            }
        }

        
        // Bot gateway live connection
        
        setBotToken(args) {
            this.botToken = String(args.TOKEN).trim();
        }

        connectGateway(args) {
            const serverId = String(args.SERVER_ID).trim();
            if (!this.botToken || !serverId) return;

            this.activeGuildId = serverId;
            if (this.gatewayWs) {
                try { this.gatewayWs.close(); } catch(e) {}
            }

            try {
                this.gatewayWs = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');
            } catch (e) {
                return;
            }

            this.gatewayWs.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);

                    if (data.op === 10) {
                        this.gatewayWs.send(JSON.stringify({
                            op: 2,
                            d: {
                                token: this.botToken,
                                intents: 2 | 256, // GUILD_MEMBERS + GUILD_PRESENCES
                                properties: { os: 'browser', browser: 'PenguinMod', device: 'PenguinMod' }
                            }
                        }));
                    }

                    if (data.t === 'READY') {
                        this.gatewayWs.send(JSON.stringify({
                            op: 8,
                            d: {
                                guild_id: serverId,
                                query: '',
                                limit: 0,
                                presences: true,
                                user_ids: []
                            }
                        }));
                    }

                    // Chunk prescnece data thingy
                    if (data.t === 'GUILD_MEMBERS_CHUNK') {
                        const presences = data.d && Array.isArray(data.d.presences) ? data.d.presences : [];
                        presences.forEach(p => {
                            if (p && p.user && p.user.id) {
                                const uid = String(p.user.id);
                                this._updateUserStatus(uid, p.status || 'offline');
                                this.customStatusCache.set(uid, this._parseCustomStatus(p.activities));
                            }
                        });
                    }

                    // Live updates from discord to give input
                    if (data.t === 'PRESENCE_UPDATE') {
                        if (data.d && data.d.user && data.d.user.id) {
                            const uid = String(data.d.user.id);
                            this._updateUserStatus(uid, data.d.status || 'offline');
                            this.customStatusCache.set(uid, this._parseCustomStatus(data.d.activities));
                        }
                    }
                } catch (err) {}
            };
        }

        checkUserStatusBot(args) {
            if (!args || typeof args !== 'object') return false;
            const targetId = String(args.USER_ID || '').trim();
            const targetStatus = String(args.STATUS || '').toLowerCase().trim();
            
            const currentStatus = this.presenceCache.get(targetId) || 'offline';
            return currentStatus === targetStatus;
        }

        getUserCustomStatus(args) {
            if (!args || typeof args !== 'object') return '';
            const targetId = String(args.USER_ID || '').trim();
            if (!targetId || !this.customStatusCache) return '';
            
            const statusObj = this.customStatusCache.get(targetId);
            return statusObj && statusObj.state ? String(statusObj.state) : '';
        }

        getUserCustomStatusEmoji(args) {
            if (!args || typeof args !== 'object') return '';
            const targetId = String(args.USER_ID || '').trim();
            if (!targetId || !this.customStatusCache) return '';
            
            const statusObj = this.customStatusCache.get(targetId);
            return statusObj && statusObj.emoji ? String(statusObj.emoji) : '';
        }

        getStatusDurationSeconds(args) {
            if (!args || typeof args !== 'object') return 0;
            const targetId = String(args.USER_ID || '').trim();
            const startTime = this.statusStartCache.get(targetId);
            
            if (!startTime) return 0;
            return Math.floor((Date.now() - startTime) / 1000);
        }

        
        // Widget Checker for servers
       
        async _getWidgetData(serverId) {
            const now = Date.now();
            if (this.widgetCache.has(serverId)) {
                const cached = this.widgetCache.get(serverId);
                if (now - cached.timestamp < this.WIDGET_CACHE_TTL) {
                    return cached.data;
                }
            }

            try {
                const response = await fetch(`https://discord.com/api/v9/guilds/${serverId}/widget.json`);
                if (!response.ok) return null;
                const data = await response.json();
                this.widgetCache.set(serverId, { data, timestamp: now });
                return data;
            } catch (err) {
                return null;
            }
        }

        _extractData(widget, dataType) {
            if (!widget) return [];

            switch (dataType) {
                case 'usernames':
                    return widget.members ? widget.members.map(m => m.username) : [];
                case 'pfps':
                    return widget.members ? widget.members.map(m => m.avatar_url) : [];
                case 'displaynames':
                    return widget.members ? widget.members.map(m => m.username) : [];
                case 'servername':
                    return widget.name || '';
                case 'onlinemembers':
                    return widget.presence_count || (widget.members ? widget.members.length : 0);
                case 'channelnames':
                    return widget.channels ? widget.channels.map(c => c.name) : [];
                case 'channelcount':
                    return widget.channels ? widget.channels.length : 0;
                default:
                    return [];
            }
        }

        _formatOutput(data, format, title = 'Output') {
            const isArray = Array.isArray(data);
            return isArray ? data.join('\n') : String(data);
        }

        async fetchServerData(args) {
            const serverId = Scratch.Cast.toString(args.SERVER_ID).trim();
            const dataType = args.DATA_TYPE;
            const memberLimit = String(args.MEMBER_LIMIT || 'max').trim().toLowerCase();

            const widget = await this._getWidgetData(serverId);
            if (!widget) {
                return `Error: Could not fetch server widget for ID "${serverId}". Ensure "Server Widget" is enabled in Server Settings.`;
            }

            let rawData = this._extractData(widget, dataType);
            if (Array.isArray(rawData) && memberLimit !== 'max') {
                const limit = Math.max(1, Math.min(1000, Number(memberLimit) || 100));
                rawData = rawData.slice(0, limit);
            }

            return this._formatOutput(rawData, 'txt', dataType);
        }

        async isUserIdOnline(args) {
            const userId = Scratch.Cast.toString(args.USER_ID).trim();
            const serverId = Scratch.Cast.toString(args.SERVER_ID).trim();
            const widget = await this._getWidgetData(serverId);
            if (!widget || !widget.members) return false;
            return widget.members.some(member => String(member.id) === userId);
        }

        async isDisplayNameOnline(args) {
            const displayName = Scratch.Cast.toString(args.DISPLAY_NAME).toLowerCase().trim();
            const serverId = Scratch.Cast.toString(args.SERVER_ID).trim();
            const widget = await this._getWidgetData(serverId);
            if (!widget || !widget.members) return false;
            return widget.members.some(member => member.username && member.username.toLowerCase() === displayName);
        }

        async isUsernameOnline(args) {
            const username = Scratch.Cast.toString(args.USERNAME).toLowerCase().trim();
            const serverId = Scratch.Cast.toString(args.SERVER_ID).trim();
            const widget = await this._getWidgetData(serverId);
            if (!widget || !widget.members) return false;
            return widget.members.some(member => member.username && member.username.toLowerCase() === username);
        }

        async isUserStatus(args) {
            const userId = Scratch.Cast.toString(args.USER_ID).trim();
            const targetStatus = Scratch.Cast.toString(args.STATUS).toLowerCase().trim();
            const serverId = Scratch.Cast.toString(args.SERVER_ID).trim();
            const widget = await this._getWidgetData(serverId);

            if (!widget || !widget.members) {
                return targetStatus === 'offline';
            }

            const member = widget.members.find(m => String(m.id) === userId);

            if (!member) {
                return targetStatus === 'offline';
            }

            const currentStatus = String(member.status || 'online').toLowerCase();
            return currentStatus === targetStatus;
        }

        
        // Webhook Messager
        
        async sendMessage(args) {
            const message = args.MESSAGE;
            const webhook = args.WEBHOOK;

            try {
                await fetch(webhook, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: message })
                });
            } catch (err) {}
        }

        async sendWebhookPing(args) {
            const webhookUrl = String(args.WEBHOOK_URL).trim();
            const userId = String(args.USER_ID).trim();
            const message = args.MESSAGE;

            if (!webhookUrl.startsWith('https://discord.com/api/webhooks/') &&
                !webhookUrl.startsWith('https://canary.discord.com/api/webhooks/')) {
                return;
            }

            const content = `<@${userId}> ${message}`;

            try {
                await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        content: content,
                        allowed_mentions: { parse: ['users'] }
                    })
                });
            } catch (err) {}
        }

        // ==========================================
        // Methods: Webhook Slot Manager
        // ==========================================
        setWebhookSlot(args) {
            const slotIndex = Math.max(1, Math.min(50, Math.floor(Number(args.SLOT) || 1))) - 1;
            this.webhooks[slotIndex] = String(args.URL).trim();
        }

        getWebhookSlot(args) {
            const slotIndex = Math.max(1, Math.min(50, Math.floor(Number(args.SLOT) || 1))) - 1;
            return this.webhooks[slotIndex] || '';
        }

        clearAllWebhooks() {
            this.webhooks = Array(50).fill('');
        }

        async sendMessageToSlot(args) {
            const slotIndex = Math.max(1, Math.min(50, Math.floor(Number(args.SLOT) || 1))) - 1;
            const webhookUrl = this.webhooks[slotIndex];
            const messageText = String(args.MESSAGE);

            if (!webhookUrl) return;

            try {
                await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: messageText })
                });
            } catch (err) {}
        }

        async sendMessageToAllSlots(args) {
            const messageText = String(args.MESSAGE);

            for (let i = 0; i < this.webhooks.length; i++) {
                const url = this.webhooks[i];
                if (!url) continue;

                try {
                    await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ content: messageText })
                    });
                    await new Promise((resolve) => setTimeout(resolve, 200));
                } catch (err) {}
            }
        }

        
        // Discord chat fetcher using jsonbot.io
        
        setCredentials(args) {
            this.binId = Scratch.Cast.toString(args.BIN_ID).trim();
            this.apiKey = Scratch.Cast.toString(args.KEY).trim();
        }

        clearHistory() {
            this.messages = [];
            this.lastTimestamp = null;
        }

        async fetchHistory() {
            if (!this.binId || this.binId === 'YOUR_BIN_ID') return;

            const headers = {};
            if (this.apiKey) headers['X-Access-Key'] = this.apiKey;

            try {
                const response = await Scratch.fetch(`https://api.jsonbin.io/v3/b/${this.binId}/latest`, {
                    method: 'GET',
                    headers: headers
                });

                if (!response.ok) return;
                const data = await response.json();

                if (data && data.record) {
                    const rec = data.record;

                    if (Array.isArray(rec)) {
                        this.messages = rec;
                    } else if (rec.content || rec.username || rec.author) {
                        const currentTs = rec.timestamp || rec.content;
                        if (currentTs !== this.lastTimestamp) {
                            this.messages.push(rec);
                            this.lastTimestamp = currentTs;
                        }
                    }
                }
            } catch (err) {}
        }

        getMessageCount() {
            return this.messages.length;
        }

        getItemAtIndex(args) {
            const prop = Scratch.Cast.toString(args.PROP).toLowerCase();
            const index = Scratch.Cast.toNumber(args.INDEX) - 1;

            if (this.messages.length === 0 || index < 0 || index >= this.messages.length) {
                return '';
            }

            const item = this.messages[index];
            return this.extractProperty(item, prop);
        }

        getLatestProp(args) {
            const prop = Scratch.Cast.toString(args.PROP).toLowerCase();
            if (this.messages.length === 0) return '';
            const lastItem = this.messages[this.messages.length - 1];
            return this.extractProperty(lastItem, prop);
        }

        extractProperty(item, prop) {
            switch (prop) {
                case 'message': return item.content || '';
                case 'username': return item.username || item.author || '';
                case 'pfp': return item.pfp || '';
                case 'server name': return item.server || '';
                case 'channel name': return item.channel_name || item.channel || '';
                case 'channel id': return item.channel_id || '';
                case 'timestamp': return item.timestamp || '';
                default: return item.username || item.author || '';
            }
        }
    }

    Scratch.extensions.register(new CombinedDiscordExtension());

})(Scratch);
