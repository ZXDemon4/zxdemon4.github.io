(function(Scratch) {
    'use strict';

    class CountdownPlus {
        constructor() {
            this.targetTime = 0;
            
            // Conversion rates to milliseconds
            this.unitMultipliers = {
                'milliseconds': 1,
                'seconds': 1000,
                'minutes': 60000,
                'hours': 3600000,
                'days': 86400000,
                'weeks': 604800000,
                'months': 2592000000,
                'years': 31536000000
            };
        }

        getInfo() {
            return {
                id: 'countdownplus',
                name: 'Countdown+ (by ZX)',
                color1: '#FF6680',
                color2: '#FF4D6A',
                blocks: [
                    {
                        opcode: 'startCountdown',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'make a countdown from years [Y] months [M] weeks [W] days [D] hours [H] minutes [MIN] seconds [S] milliseconds [MS]',
                        arguments: {
                            Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            M: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            D: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            MIN: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            S: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            MS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
                        }
                    },
                    {
                        opcode: 'addTimeToCountdown',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'add [AMOUNT] [UNIT] to countdown',
                        arguments: {
                            AMOUNT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                            UNIT: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'timeUnits',
                                defaultValue: 'milliseconds'
                            }
                        }
                    },
                    {
                        opcode: 'removeTimeFromCountdown',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'remove [AMOUNT] [UNIT] from countdown',
                        arguments: {
                            AMOUNT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                            UNIT: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'timeUnits',
                                defaultValue: 'milliseconds'
                            }
                        }
                    },
                    {
                        opcode: 'resetCountdown',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'reset countdown'
                    },
                    {
                        opcode: 'getTimeRemaining',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'time from countdown?'
                    }
                ],
                menus: {
                    timeUnits: {
                        acceptReporters: true,
                        items: [
                            'years',
                            'months',
                            'weeks',
                            'days',
                            'hours',
                            'minutes',
                            'seconds',
                            'milliseconds'
                        ]
                    }
                }
            };
        }

        startCountdown(args) {
            const years = Scratch.Cast.toNumber(args.Y);
            const months = Scratch.Cast.toNumber(args.M);
            const weeks = Scratch.Cast.toNumber(args.W);
            const days = Scratch.Cast.toNumber(args.D);
            const hours = Scratch.Cast.toNumber(args.H);
            const minutes = Scratch.Cast.toNumber(args.MIN);
            const seconds = Scratch.Cast.toNumber(args.S);
            const milliseconds = Scratch.Cast.toNumber(args.MS);

            const totalMs = 
                (years * 31536000000) +
                (months * 2592000000) +
                (weeks * 604800000) +
                (days * 86400000) +
                (hours * 3600000) +
                (minutes * 60000) +
                (seconds * 1000) +
                milliseconds;

            this.targetTime = Date.now() + totalMs;
        }

        addTimeToCountdown(args) {
            if (!this.targetTime) return;
            const amount = Scratch.Cast.toNumber(args.AMOUNT);
            const unit = Scratch.Cast.toString(args.UNIT).toLowerCase();
            const multiplier = this.unitMultipliers[unit] || 1;

            this.targetTime += amount * multiplier;
        }

        removeTimeFromCountdown(args) {
            if (!this.targetTime) return;
            const amount = Scratch.Cast.toNumber(args.AMOUNT);
            const unit = Scratch.Cast.toString(args.UNIT).toLowerCase();
            const multiplier = this.unitMultipliers[unit] || 1;

            this.targetTime -= amount * multiplier;
            
            // Prevent timer target from dropping into the past below 0 remaining
            if (this.targetTime < Date.now()) {
                this.targetTime = Date.now();
            }
        }

        resetCountdown() {
            this.targetTime = 0;
        }

        getTimeRemaining() {
            if (!this.targetTime) {
                return '00:00';
            }

            const remainingMs = Math.max(0, this.targetTime - Date.now());
            let totalSeconds = Math.ceil(remainingMs / 1000);

            if (totalSeconds <= 0) {
                return '00:00';
            }

            const yrs = Math.floor(totalSeconds / 31536000);
            totalSeconds %= 31536000;

            const mths = Math.floor(totalSeconds / 2592000);
            totalSeconds %= 2592000;

            const wks = Math.floor(totalSeconds / 604800);
            totalSeconds %= 604800;

            const dys = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;

            const hrs = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;

            const mins = Math.floor(totalSeconds / 60);
            const secs = totalSeconds % 60;

            const pad = (num) => String(num).padStart(2, '0');

            const parts = [];
            if (yrs > 0) parts.push(pad(yrs));
            if (mths > 0 || parts.length > 0) parts.push(pad(mths));
            if (wks > 0 || parts.length > 0) parts.push(pad(wks));
            if (dys > 0 || parts.length > 0) parts.push(pad(dys));
            if (hrs > 0 || parts.length > 0) parts.push(pad(hrs));

            parts.push(pad(mins));
            parts.push(pad(secs));

            return parts.join(':');
        }
    }

    Scratch.extensions.register(new CountdownPlus());
})(Scratch);
