(function (Scratch) {
  'use strict';

  const BlockType = Scratch.BlockType;
  const ArgumentType = Scratch.ArgumentType;

  const COLOR_1 = '#618187';
  const COLOR_2 = '#7fa6ad';
  const COLOR_3 = '#ad81b3';
  const COLOR_4 = '#996e9c';
  const COLOR_5 = '#cfc98f';
  const COLOR_6 = '#96e09a';
  const COLOR_7 = '#b59c74';

  const OPERATIONS = [
    'add', 'subtract', 'multiply', 'divide', 
    'plusminus', 'minusplus', 'exponent', 
    'sqrt', 'squared', 'percent', 'permille'
  ];

  function executeMath(op, num1, num2) {
    switch (op) {
      case 'add': return num1 + num2;
      case 'subtract': return num1 - num2;
      case 'multiply': return num1 * num2;
      case 'divide': return num2 !== 0 ? num1 / num2 : 0;
      case 'plusminus': return `(${num1 + num2}, ${num1 - num2})`;
      case 'minusplus': return `(${num1 - num2}, ${num1 + num2})`;
      case 'exponent': return Math.pow(num1, num2);
      case 'sqrt': return `${Math.sqrt(num1)}, ${Math.sqrt(num2)}`;
      case 'squared': return `${Math.pow(num1, 2)}, ${Math.pow(num2, 2)}`;
      case 'percent': return (num1 / 100) * num2;
      case 'permille': return (num1 / 1000) * num2;
      default: return num1 + num2;
    }
  }

  function getUnreliableOp(intendedOp) {
    if (Math.random() < 0.10) {
      return intendedOp;
    }
    const otherOps = OPERATIONS.filter(op => op !== intendedOp);
    const randomIndex = Math.floor(Math.random() * otherOps.length);
    return otherOps[randomIndex];
  }

  class MostUsefulExtension {
    getInfo() {
      return {
        id: 'mostusefulextension',
        name: 'most usefulest extension TRUST',
        color1: COLOR_1,
        color2: COLOR_1,
        color3: COLOR_1,
        blocks: [
          {
            opcode: 'labelIdentity',
            blockType: BlockType.LABEL,
            text: 'useful sensing stuff'
          },
          {
            opcode: 'getNameFromName',
            blockType: BlockType.REPORTER,
            text: 'get name from [NAME]',
            color1: COLOR_1,
            arguments: {
              NAME: { type: ArgumentType.STRING, defaultValue: 'John' }
            }
          },
          {
            opcode: 'getWebsiteFromUrl',
            blockType: BlockType.REPORTER,
            text: 'get website from [URL]',
            color1: COLOR_1,
            arguments: {
              URL: { type: ArgumentType.STRING, defaultValue: 'https://scratch.mit.edu' }
            }
          },
          {
            opcode: 'changeSpriteName',
            blockType: BlockType.COMMAND,
            text: 'change name of sprite to [NAME]',
            color1: COLOR_1,
            arguments: {
              NAME: { type: ArgumentType.STRING, defaultValue: 'CoolSprite' }
            }
          },
          {
            opcode: 'whichScratch',
            blockType: BlockType.REPORTER,
            text: 'which scratch?',
            color1: COLOR_1
          },
          {
            opcode: 'whatAreYouOnRn',
            blockType: BlockType.REPORTER,
            text: 'what are you on rn?',
            color1: COLOR_1
          },
          {
            opcode: 'isAnythingReal',
            blockType: BlockType.REPORTER,
            text: 'is [THING] real?',
            color1: COLOR_1,
            arguments: {
              THING: { type: ArgumentType.STRING, defaultValue: 'anything' }
            }
          },
          {
            opcode: 'touchingSomething',
            blockType: BlockType.BOOLEAN,
            text: 'touching something?',
            color1: COLOR_1
          },
          {
            opcode: 'blueyIsGay',
            blockType: BlockType.BOOLEAN,
            text: 'bluey is gay?',
            color1: COLOR_1
          },
          {
            opcode: 'dontSetDragMode',
            blockType: BlockType.COMMAND,
            text: 'don\'t set drag mode [MODE]',
            color1: COLOR_1,
            arguments: {
              MODE: { type: ArgumentType.STRING, menu: 'dragModeMenu', defaultValue: 'draggable' }
            }
          },
          {
            opcode: 'daysSinceToday',
            blockType: BlockType.REPORTER,
            text: 'days since today',
            color1: COLOR_1
          },
          '---',
          {
            opcode: 'labelVisuals',
            blockType: BlockType.LABEL,
            text: 'useful looks stuff'
          },
          {
            opcode: 'changeEffectBy',
            blockType: BlockType.COMMAND,
            text: 'change [EFFECT] effect by [VALUE]',
            color1: COLOR_2,
            arguments: {
              EFFECT: { type: ArgumentType.STRING, menu: 'effectsMenu', defaultValue: 'hue' },
              VALUE: { type: ArgumentType.NUMBER, defaultValue: 25 }
            }
          },
          {
            opcode: 'setEffectTo',
            blockType: BlockType.COMMAND,
            text: 'set [EFFECT] effect to [VALUE]',
            color1: COLOR_2,
            arguments: {
              EFFECT: { type: ArgumentType.STRING, menu: 'effectsMenu', defaultValue: 'hue' },
              VALUE: { type: ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'dontSayForSec',
            blockType: BlockType.COMMAND,
            text: 'don\'t say [TEXT] for [SEC] seconds',
            color1: COLOR_2,
            arguments: {
              TEXT: { type: ArgumentType.STRING, defaultValue: 'Hello!' },
              SEC: { type: ArgumentType.NUMBER, defaultValue: 2 }
            }
          },
          {
            opcode: 'dontSay',
            blockType: BlockType.COMMAND,
            text: 'don\'t say [TEXT]',
            color1: COLOR_2,
            arguments: {
              TEXT: { type: ArgumentType.STRING, defaultValue: 'Hello!' }
            }
          },
          {
            opcode: 'dontThinkForSec',
            blockType: BlockType.COMMAND,
            text: 'don\'t think [TEXT] for [SEC] seconds',
            color1: COLOR_2,
            arguments: {
              TEXT: { type: ArgumentType.STRING, defaultValue: 'Hmm...' },
              SEC: { type: ArgumentType.NUMBER, defaultValue: 2 }
            }
          },
          {
            opcode: 'dontThink',
            blockType: BlockType.COMMAND,
            text: 'don\'t think [TEXT]',
            color1: COLOR_2,
            arguments: {
              TEXT: { type: ArgumentType.STRING, defaultValue: 'Hmm...' }
            }
          },
          {
            opcode: 'speakBlock',
            blockType: BlockType.COMMAND,
            text: 'speak',
            color1: COLOR_2
          },
          {
            opcode: 'dontChangeSizeBy',
            blockType: BlockType.COMMAND,
            text: 'don\'t change size by [SIZE]',
            color1: COLOR_2,
            arguments: {
              SIZE: { type: ArgumentType.NUMBER, defaultValue: 10 }
            }
          },
          {
            opcode: 'dontSetSizeTo',
            blockType: BlockType.COMMAND,
            text: 'don\'t set size to [SIZE] %',
            color1: COLOR_2,
            arguments: {
              SIZE: { type: ArgumentType.NUMBER, defaultValue: 100 }
            }
          },
          {
            opcode: 'dontSetStretchTo',
            blockType: BlockType.COMMAND,
            text: 'don\'t set stretch to x: [X] y: [Y]',
            color1: COLOR_2,
            arguments: {
              X: { type: ArgumentType.NUMBER, defaultValue: 100 },
              Y: { type: ArgumentType.NUMBER, defaultValue: 100 }
            }
          },
          {
            opcode: 'dontChangeStretchBy',
            blockType: BlockType.COMMAND,
            text: 'don\'t change stretch by x: [X] y: [Y]',
            color1: COLOR_2,
            arguments: {
              X: { type: ArgumentType.NUMBER, defaultValue: 15 },
              Y: { type: ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'dontShow',
            blockType: BlockType.COMMAND,
            text: 'don\'t show',
            color1: COLOR_2
          },
          {
            opcode: 'dontHide',
            blockType: BlockType.COMMAND,
            text: 'don\'t hide',
            color1: COLOR_2
          },
          {
            opcode: 'dontGoToLayer',
            blockType: BlockType.COMMAND,
            text: 'don\'t go to [LAYER] layer',
            color1: COLOR_2,
            arguments: {
              LAYER: { type: ArgumentType.STRING, menu: 'layerMenu', defaultValue: 'front' }
            }
          },
          '---',
          {
            opcode: 'labelMotion',
            blockType: BlockType.LABEL,
            text: 'useful motion stuff'
          },
          {
            opcode: 'dontMoveSteps',
            blockType: BlockType.COMMAND,
            text: 'don\'t move [STEPS] steps',
            color1: COLOR_3,
            arguments: {
              STEPS: { type: ArgumentType.NUMBER, defaultValue: 10 }
            }
          },
          {
            opcode: 'dontGoToTarget',
            blockType: BlockType.COMMAND,
            text: 'don\'t go to [TARGET]',
            color1: COLOR_3,
            arguments: {
              TARGET: { type: ArgumentType.STRING, menu: 'gotoMenu', defaultValue: 'random position' }
            }
          },
          {
            opcode: 'dontGoToXY',
            blockType: BlockType.COMMAND,
            text: 'don\'t go to x: [X] y: [Y]',
            color1: COLOR_3,
            arguments: {
              X: { type: ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'dontChangeXYBy',
            blockType: BlockType.COMMAND,
            text: 'don\'t change by x: [X] y: [Y]',
            color1: COLOR_3,
            arguments: {
              X: { type: ArgumentType.NUMBER, defaultValue: 10 },
              Y: { type: ArgumentType.NUMBER, defaultValue: 10 }
            }
          },
          {
            opcode: 'dontPointInDirection',
            blockType: BlockType.COMMAND,
            text: 'don\'t point in direction [DIR]',
            color1: COLOR_3,
            arguments: {
              DIR: { type: ArgumentType.NUMBER, defaultValue: 90 }
            }
          },
          {
            opcode: 'dontPointTowardsMenu',
            blockType: BlockType.COMMAND,
            text: 'don\'t point towards [TARGET]',
            color1: COLOR_3,
            arguments: {
              TARGET: { type: ArgumentType.STRING, menu: 'pointTowardsMenu', defaultValue: 'mouse-pointer' }
            }
          },
          {
            opcode: 'dontPointTowardsXY',
            blockType: BlockType.COMMAND,
            text: 'don\'t point towards x: [X] y: [Y]',
            color1: COLOR_3,
            arguments: {
              X: { type: ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'dontChangeXBy',
            blockType: BlockType.COMMAND,
            text: 'don\'t change x by [X]',
            color1: COLOR_3,
            arguments: {
              X: { type: ArgumentType.NUMBER, defaultValue: 10 }
            }
          },
          {
            opcode: 'dontSetXTo',
            blockType: BlockType.COMMAND,
            text: 'don\'t set x to [X]',
            color1: COLOR_3,
            arguments: {
              X: { type: ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'dontChangeYBy',
            blockType: BlockType.COMMAND,
            text: 'don\'t change y by [Y]',
            color1: COLOR_3,
            arguments: {
              Y: { type: ArgumentType.NUMBER, defaultValue: 10 }
            }
          },
          {
            opcode: 'dontSetYTo',
            blockType: BlockType.COMMAND,
            text: 'don\'t set y to [Y]',
            color1: COLOR_3,
            arguments: {
              Y: { type: ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'movePreciseX',
            blockType: BlockType.COMMAND,
            text: 'move [NUM] point [DECIMAL] x',
            color1: COLOR_3,
            arguments: {
              NUM: { type: ArgumentType.NUMBER, defaultValue: 0 },
              DECIMAL: { type: ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'movePreciseY',
            blockType: BlockType.COMMAND,
            text: 'move [NUM] point [DECIMAL] y',
            color1: COLOR_3,
            arguments: {
              NUM: { type: ArgumentType.NUMBER, defaultValue: 0 },
              DECIMAL: { type: ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'turnLeftPrecise',
            blockType: BlockType.COMMAND,
            text: 'turn left [NUM] point [DECIMAL] degrees',
            color1: COLOR_3,
            arguments: {
              NUM: { type: ArgumentType.NUMBER, defaultValue: 15 },
              DECIMAL: { type: ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'turnRightPrecise',
            blockType: BlockType.COMMAND,
            text: 'turn right [NUM] point [DECIMAL] degrees',
            color1: COLOR_3,
            arguments: {
              NUM: { type: ArgumentType.NUMBER, defaultValue: 15 },
              DECIMAL: { type: ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          '---',
          {
            opcode: 'labelSound',
            blockType: BlockType.LABEL,
            text: 'useful sound stuff'
          },
          {
            opcode: 'dontStartSound',
            blockType: BlockType.COMMAND,
            text: 'don\'t start sound [SOUND]',
            color1: COLOR_4,
            arguments: {
              SOUND: { type: ArgumentType.STRING, defaultValue: 'Squawk' }
            }
          },
          {
            opcode: 'dontStopSound',
            blockType: BlockType.COMMAND,
            text: 'don\'t stop sound [SOUND]',
            color1: COLOR_4,
            arguments: {
              SOUND: { type: ArgumentType.STRING, defaultValue: 'Squawk' }
            }
          },
          {
            opcode: 'dontChangeVolumeBy',
            blockType: BlockType.COMMAND,
            text: 'don\'t change volume by [VOL]',
            color1: COLOR_4,
            arguments: {
              VOL: { type: ArgumentType.NUMBER, defaultValue: -10 }
            }
          },
          {
            opcode: 'dontSetVolumeTo',
            blockType: BlockType.COMMAND,
            text: 'don\'t set volume to [VOL] %',
            color1: COLOR_4,
            arguments: {
              VOL: { type: ArgumentType.NUMBER, defaultValue: 100 }
            }
          },
          {
            opcode: 'dontChangePitchBy',
            blockType: BlockType.COMMAND,
            text: 'don\'t change pitch by [PITCH]',
            color1: COLOR_4,
            arguments: {
              PITCH: { type: ArgumentType.NUMBER, defaultValue: 10 }
            }
          },
          {
            opcode: 'dontSetPitchTo',
            blockType: BlockType.COMMAND,
            text: 'don\'t set pitch to [PITCH]',
            color1: COLOR_4,
            arguments: {
              PITCH: { type: ArgumentType.NUMBER, defaultValue: 100 }
            }
          },
          '---',
          {
            opcode: 'labelControl',
            blockType: BlockType.LABEL,
            text: 'useful events stuff'
          },
          {
            opcode: 'runFlag',
            blockType: BlockType.COMMAND,
            text: 'run flag',
            color1: COLOR_5
          },
          {
            opcode: 'whenIDontReceive',
            blockType: BlockType.HAT,
            text: 'when I don\'t receive [BROADCAST]',
            isEdgeActivated: false,
            color1: COLOR_5,
            arguments: {
              BROADCAST: { type: ArgumentType.STRING, menu: 'broadcastMenu' }
            }
          },
          {
            opcode: 'neverBlock',
            blockType: BlockType.CONDITIONAL,
            text: 'never',
            branchCount: 1,
            color1: COLOR_5
          },
          {
            opcode: 'ifNotNotElse',
            blockType: BlockType.CONDITIONAL,
            text: 'if not',
            branchCount: 1,
            color1: COLOR_5
          },
          {
            opcode: 'dontRepeat',
            blockType: BlockType.CONDITIONAL,
            text: 'don\'t repeat [TIMES]',
            branchCount: 1,
            color1: COLOR_5,
            arguments: {
              TIMES: { type: ArgumentType.NUMBER, defaultValue: 10 }
            }
          },
          {
            opcode: 'dontWait',
            blockType: BlockType.COMMAND,
            text: 'don\'t wait [SEC] seconds',
            color1: COLOR_5,
            arguments: {
              SEC: { type: ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          {
            opcode: 'dontWaitUntil',
            blockType: BlockType.COMMAND,
            text: 'don\'t wait until [COND]',
            color1: COLOR_5,
            arguments: {
              COND: { type: ArgumentType.BOOLEAN }
            }
          },
          {
            opcode: 'dontStopSprite',
            blockType: BlockType.COMMAND,
            text: 'don\'t stop sprite [SPRITE]',
            color1: COLOR_5,
            arguments: {
              SPRITE: { type: ArgumentType.STRING, defaultValue: 'Sprite1' }
            }
          },
          {
            opcode: 'dontStopAll',
            blockType: BlockType.COMMAND,
            text: 'don\'t stop all',
            color1: COLOR_5
          },
          '---',
          {
            opcode: 'labelMath',
            blockType: BlockType.LABEL,
            text: 'useful operations'
          },
          {
            opcode: 'mathAdd',
            blockType: BlockType.REPORTER,
            text: '[NUM1] + [NUM2]',
            color1: COLOR_6,
            arguments: {
              NUM1: { type: ArgumentType.NUMBER, defaultValue: 2 },
              NUM2: { type: ArgumentType.NUMBER, defaultValue: 2 }
            }
          },
          {
            opcode: 'mathSubtract',
            blockType: BlockType.REPORTER,
            text: '[NUM1] - [NUM2]',
            color1: COLOR_6,
            arguments: {
              NUM1: { type: ArgumentType.NUMBER, defaultValue: 5 },
              NUM2: { type: ArgumentType.NUMBER, defaultValue: 2 }
            }
          },
          {
            opcode: 'mathMultiply',
            blockType: BlockType.REPORTER,
            text: '[NUM1] * [NUM2]',
            color1: COLOR_6,
            arguments: {
              NUM1: { type: ArgumentType.NUMBER, defaultValue: 3 },
              NUM2: { type: ArgumentType.NUMBER, defaultValue: 4 }
            }
          },
          {
            opcode: 'mathDivide',
            blockType: BlockType.REPORTER,
            text: '[NUM1] / [NUM2]',
            color1: COLOR_6,
            arguments: {
              NUM1: { type: ArgumentType.NUMBER, defaultValue: 10 },
              NUM2: { type: ArgumentType.NUMBER, defaultValue: 2 }
            }
          },
          {
            opcode: 'mathPlusMinus',
            blockType: BlockType.REPORTER,
            text: '[NUM1] ± [NUM2]',
            color1: COLOR_6,
            arguments: {
              NUM1: { type: ArgumentType.NUMBER, defaultValue: 2 },
              NUM2: { type: ArgumentType.NUMBER, defaultValue: 2 }
            }
          },
          {
            opcode: 'mathMinusPlus',
            blockType: BlockType.REPORTER,
            text: '[NUM1] ∓ [NUM2]',
            color1: COLOR_6,
            arguments: {
              NUM1: { type: ArgumentType.NUMBER, defaultValue: 2 },
              NUM2: { type: ArgumentType.NUMBER, defaultValue: 2 }
            }
          },
          {
            opcode: 'mathExponent',
            blockType: BlockType.REPORTER,
            text: '[NUM1] ^ [NUM2]',
            color1: COLOR_6,
            arguments: {
              NUM1: { type: ArgumentType.NUMBER, defaultValue: 2 },
              NUM2: { type: ArgumentType.NUMBER, defaultValue: 3 }
            }
          },
          {
            opcode: 'mathSqrt',
            blockType: BlockType.REPORTER,
            text: 'sqrt [NUM1] , [NUM2]',
            color1: COLOR_6,
            arguments: {
              NUM1: { type: ArgumentType.NUMBER, defaultValue: 16 },
              NUM2: { type: ArgumentType.NUMBER, defaultValue: 25 }
            }
          },
          {
            opcode: 'mathSquared',
            blockType: BlockType.REPORTER,
            text: 'square [NUM1] , [NUM2]',
            color1: COLOR_6,
            arguments: {
              NUM1: { type: ArgumentType.NUMBER, defaultValue: 4 },
              NUM2: { type: ArgumentType.NUMBER, defaultValue: 5 }
            }
          },
          {
            opcode: 'mathPercent',
            blockType: BlockType.REPORTER,
            text: '[NUM1] % of [NUM2]',
            color1: COLOR_6,
            arguments: {
              NUM1: { type: ArgumentType.NUMBER, defaultValue: 50 },
              NUM2: { type: ArgumentType.NUMBER, defaultValue: 200 }
            }
          },
          {
            opcode: 'mathPermille',
            blockType: BlockType.REPORTER,
            text: '[NUM1] ‰ of [NUM2]',
            color1: COLOR_6,
            arguments: {
              NUM1: { type: ArgumentType.NUMBER, defaultValue: 50 },
              NUM2: { type: ArgumentType.NUMBER, defaultValue: 1000 }
            }
          },
          {
            opcode: 'dynamicInvertedJoin',
            blockType: BlockType.REPORTER,
            text: 'join [STR1] [STR2]',
            color1: COLOR_6,
            arguments: {
              STR1: { type: ArgumentType.STRING, defaultValue: 'apple' },
              STR2: { type: ArgumentType.STRING, defaultValue: 'banana' }
            }
          },
          {
            opcode: 'stringContains',
            blockType: BlockType.BOOLEAN,
            text: '[STR1] contains [STR2] ?',
            color1: COLOR_6,
            arguments: {
              STR1: { type: ArgumentType.STRING, defaultValue: 'apple' },
              STR2: { type: ArgumentType.STRING, defaultValue: 'a' }
            }
          },
          {
            opcode: 'stringStartsWith',
            blockType: BlockType.BOOLEAN,
            text: '[STR1] [MATCH] with [STR2] ?',
            color1: COLOR_6,
            arguments: {
              STR1: { type: ArgumentType.STRING, defaultValue: 'abcdef' },
              MATCH: { type: ArgumentType.STRING, menu: 'startsEndsMenu', defaultValue: 'starts' },
              STR2: { type: ArgumentType.STRING, defaultValue: 'abc' }
            }
          },
          {
            opcode: 'isTextInverted',
            blockType: BlockType.BOOLEAN,
            text: '[VAL] is text?',
            color1: COLOR_6,
            arguments: {
              VAL: { type: ArgumentType.STRING, defaultValue: 'world' }
            }
          },
          {
            opcode: 'isNumberInverted',
            blockType: BlockType.BOOLEAN,
            text: '[VAL] is number?',
            color1: COLOR_6,
            arguments: {
              VAL: { type: ArgumentType.STRING, defaultValue: '10' }
            }
          },
          '---',
          {
            opcode: 'labelClipboard',
            blockType: BlockType.LABEL,
            text: 'useful control stuff'
          },
          {
            opcode: 'addToClipboardAfter',
            blockType: BlockType.COMMAND,
            text: 'add [STUFF] to clipboard after [SEC] seconds',
            color1: COLOR_7,
            arguments: {
              STUFF: { type: ArgumentType.STRING, defaultValue: 'important data' },
              SEC: { type: ArgumentType.NUMBER, defaultValue: 5 }
            }
          },
          {
            opcode: 'doNothingEfficiently',
            blockType: BlockType.COMMAND,
            text: 'do nothing after [SEC] seconds efficiently',
            color1: COLOR_7,
            arguments: {
              SEC: { type: ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          {
            opcode: 'askEfficiently',
            blockType: BlockType.COMMAND,
            text: 'ask [TEXT], efficiently?',
            color1: COLOR_7,
            arguments: {
              TEXT: { type: ArgumentType.STRING, defaultValue: "What's your name?" }
            }
          },
          {
            opcode: 'whenIDontStartAsClone',
            blockType: BlockType.HAT,
            text: 'when I don\'t start as a clone',
            isEdgeActivated: false,
            color1: COLOR_7
          },
          {
            opcode: 'dontCreateCloneOf',
            blockType: BlockType.COMMAND,
            text: 'don\'t create clone of [SPRITE]',
            color1: COLOR_7,
            arguments: {
              SPRITE: { type: ArgumentType.STRING, menu: 'spritesMenu', defaultValue: 'myself' }
            }
          },
          {
            opcode: 'dontDeleteClonesOf',
            blockType: BlockType.COMMAND,
            text: 'don\'t delete clones of [SPRITE]',
            color1: COLOR_7,
            arguments: {
              SPRITE: { type: ArgumentType.STRING, menu: 'spritesMenu', defaultValue: 'myself' }
            }
          },
          {
            opcode: 'dontDeleteThisClone',
            blockType: BlockType.COMMAND,
            text: 'don\'t delete this clone',
            color1: COLOR_7
          },
          {
            opcode: 'isNotClone',
            blockType: BlockType.BOOLEAN,
            text: 'isn\'t clone?',
            color1: COLOR_7
          }
        ],
        menus: {
          effectsMenu: {
            acceptReporters: true,
            items: ['hue', 'blur', 'roundness', 'etc']
          },
          broadcastMenu: {
            acceptReporters: true,
            items: ['message1']
          },
          startsEndsMenu: {
            acceptReporters: true,
            items: ['starts', 'ends']
          },
          spritesMenu: {
            acceptReporters: true,
            items: ['myself']
          },
          gotoMenu: {
            acceptReporters: true,
            items: ['random position', 'mouse-pointer']
          },
          pointTowardsMenu: {
            acceptReporters: true,
            items: ['mouse-pointer']
          },
          layerMenu: {
            acceptReporters: true,
            items: ['front', 'back']
          },
          dragModeMenu: {
            acceptReporters: true,
            items: ['draggable', 'not draggable']
          }
        }
      };
    }

    getNameFromName(args) { return Scratch.Cast.toString(args.NAME); }

    getWebsiteFromUrl(args) {
      const url = Scratch.Cast.toString(args.URL);
      if (url.startsWith('https://') || url.startsWith('www.')) {
        return url;
      }
      return 'false';
    }

    whichScratch() { return 'scratch'; }
    whatAreYouOnRn() { return 'a project duh'; }
    isAnythingReal() { return 'maybe'; }

    changeSpriteName() {}
    changeEffectBy() {}
    setEffectTo() {}

    movePreciseX() {}
    movePreciseY() {}
    turnLeftPrecise() {}
    turnRightPrecise() {}

    dontMoveSteps() {}
    dontGoToTarget() {}
    dontGoToXY() {}
    dontChangeXYBy() {}
    dontPointInDirection() {}
    dontPointTowardsMenu() {}
    dontPointTowardsXY() {}
    dontChangeXBy() {}
    dontSetXTo() {}
    dontChangeYBy() {}
    dontSetYTo() {}

    dontSayForSec() {}
    dontSay() {}
    dontThinkForSec() {}
    dontThink() {}
    speakBlock() {}
    dontChangeSizeBy() {}
    dontSetSizeTo() {}
    dontSetStretchTo() {}
    dontChangeStretchBy() {}
    dontShow() {}
    dontHide() {}
    dontGoToLayer() {}

    dontStartSound() {}
    dontStopSound() {}
    dontChangeVolumeBy() {}
    dontSetVolumeTo() {}
    dontChangePitchBy() {}
    dontSetPitchTo() {}

    dontSetDragMode() {}

    runFlag() {}

    whenIDontReceive() { return false; }
    neverBlock(args, util) { return false; }
    ifNotNotElse(args, util) { return false; }
    dontRepeat(args, util) { return false; }
    dontWait() {}
    dontWaitUntil() {}
    dontStopSprite() {}
    dontStopAll() {}

    async addToClipboardAfter(args) {
      const ms = Math.max(0, Scratch.Cast.toNumber(args.SEC) * 1000);
      await new Promise((resolve) => setTimeout(resolve, ms));
    }

    async doNothingEfficiently(args) {
      const ms = Math.max(0, Scratch.Cast.toNumber(args.SEC) * 1000);
      await new Promise((resolve) => setTimeout(resolve, ms));
    }

    askEfficiently(args) {}

    mathAdd(args) {
      const op = getUnreliableOp('add');
      return executeMath(op, Scratch.Cast.toNumber(args.NUM1), Scratch.Cast.toNumber(args.NUM2));
    }

    mathSubtract(args) {
      const op = getUnreliableOp('subtract');
      return executeMath(op, Scratch.Cast.toNumber(args.NUM1), Scratch.Cast.toNumber(args.NUM2));
    }

    mathMultiply(args) {
      const op = getUnreliableOp('multiply');
      return executeMath(op, Scratch.Cast.toNumber(args.NUM1), Scratch.Cast.toNumber(args.NUM2));
    }

    mathDivide(args) {
      const op = getUnreliableOp('divide');
      return executeMath(op, Scratch.Cast.toNumber(args.NUM1), Scratch.Cast.toNumber(args.NUM2));
    }

    mathPlusMinus(args) {
      const op = getUnreliableOp('plusminus');
      return executeMath(op, Scratch.Cast.toNumber(args.NUM1), Scratch.Cast.toNumber(args.NUM2));
    }

    mathMinusPlus(args) {
      const op = getUnreliableOp('minusplus');
      return executeMath(op, Scratch.Cast.toNumber(args.NUM1), Scratch.Cast.toNumber(args.NUM2));
    }

    mathExponent(args) {
      const op = getUnreliableOp('exponent');
      return executeMath(op, Scratch.Cast.toNumber(args.NUM1), Scratch.Cast.toNumber(args.NUM2));
    }

    mathSqrt(args) {
      const op = getUnreliableOp('sqrt');
      return executeMath(op, Scratch.Cast.toNumber(args.NUM1), Scratch.Cast.toNumber(args.NUM2));
    }

    mathSquared(args) {
      const op = getUnreliableOp('squared');
      return executeMath(op, Scratch.Cast.toNumber(args.NUM1), Scratch.Cast.toNumber(args.NUM2));
    }

    mathPercent(args) {
      const op = getUnreliableOp('percent');
      return executeMath(op, Scratch.Cast.toNumber(args.NUM1), Scratch.Cast.toNumber(args.NUM2));
    }

    mathPermille(args) {
      const op = getUnreliableOp('permille');
      return executeMath(op, Scratch.Cast.toNumber(args.NUM1), Scratch.Cast.toNumber(args.NUM2));
    }

    dynamicInvertedJoin() {
      return 'join';
    }

    stringContains(args) {
      return Math.random() >= 0.5;
    }

    stringStartsWith(args) {
      return Math.random() >= 0.5;
    }

    isTextInverted(args) {
      const raw = args.VAL;
      const isNum = !isNaN(raw) && !isNaN(parseFloat(raw));
      return isNum; 
    }

    isNumberInverted(args) {
      const raw = args.VAL;
      const isNum = !isNaN(raw) && !isNaN(parseFloat(raw));
      return !isNum;
    }

    touchingSomething() {
      return "yuh twin🥀🥀";
    }

    blueyIsGay() {
      return "yuh twin🥀🥀";
    }

    whenIDontStartAsClone() { return false; }
    dontCreateCloneOf() {}
    dontDeleteClonesOf() {}
    dontDeleteThisClone() {}

    isNotClone(args, util) {
      if (util && util.target) {
        return !util.target.isClone;
      }
      return true;
    }

    daysSinceToday() {
      return Math.floor(Math.random() * 100000) + 1;
    }
  }

  Scratch.extensions.register(new MostUsefulExtension());

  if (typeof Blockly !== 'undefined' && Blockly.Blocks) {
    const blockKey = 'mostusefulextension_dynamicInvertedJoin';
    if (Blockly.Blocks[blockKey]) {
      const originalInit = Blockly.Blocks[blockKey].init;
      Blockly.Blocks[blockKey].init = function () {
        if (originalInit) originalInit.call(this);

        this.inputCount_ = 2;

        this.updateShape_ = function () {
          for (let i = 1; this.getInput('STR' + i); i++) {
            this.removeInput('STR' + i);
          }
          for (let i = 1; i <= this.inputCount_; i++) {
            this.appendValueInput('STR' + i);
          }
        };

        this.minus = function () {
          this.inputCount_++;
          this.updateShape_();
        };

        this.plus = function () {
          if (this.inputCount_ > 1) {
            this.inputCount_--;
            this.updateShape_();
          }
        };
      };
    }
  }
})(Scratch);
