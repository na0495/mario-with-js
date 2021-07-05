kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    debug: true,
    clearColor: [0, 0, 0, 1],
  })

loadRoot('https://i.imgur.com/')
loadSprite('coin', 'wbKxhcd.png')
loadSprite('evilShroom', 'KPO3fR9.png')
loadSprite('brick', 'pogC9x5.png')
loadSprite('block', 'M6rwarW.png')
loadSprite('mario', 'Wb1qfhK.png')
loadSprite('mushroom', '0wMd92p.png')
loadSprite('surprise', 'gesQ1KP.png')
loadSprite('unboxed', 'bdrLpi6.png')
loadSprite('pipeTopLeft', 'ReTPiWY.png')
loadSprite('pipeTopRight', 'hj2GK4n.png')
loadSprite('pipeBottomLeft', 'c1cYSbt.png')
loadSprite('pipeBottomRight', 'nqQ79eI.png')

loadSprite('blueBlock', 'fVscIbn.png')
loadSprite('blueBrick', '3e5YRQd.png')
loadSprite('blueSteel', 'gqVoI2b.png')
loadSprite('blueEvilShroom', 'SvV4ueD.png')
loadSprite('blueSurprise', 'RMqCc1G.png')


scene("game", () => {
    layers(['bg', 'obj', 'ui'], 'obj')

    const gameBoard = [
        // [
            '                                               ',
            '                                               ',
            '                                               ',
            '                                               ',
            '                                               ',
            '     %   =*=%=                                 ',
            '                                               ',
            '                            -+                 ',
            '                    ^   ^   ()                 ',
            '==============================   ==============',
        //   ],
        //   [
        //     '£                                       £',
        //     '£                                       £',
        //     '£                                       £',
        //     '£                                       £',
        //     '£                                       £',
        //     '£        @@@@@@              x x        £',
        //     '£                          x x x        £',
        //     '£                        x x x x  x   -+£',
        //     '£               z   z  x x x x x  x   ()£',
        //     '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
        //   ]
        ]
    const levelConfig = {
        width: 20,
        height: 20,
        '=': [sprite('block'), solid()],
        '$': [sprite('coin'), 'coin'],
        '%': [sprite('surprise'), solid(), 'coin-surprise'],
        '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
        '}': [sprite('unboxed'), solid()],
        '(': [sprite('pipeBottomLeft'), solid(), scale(0.5)],
        ')': [sprite('pipeBottomRight'), solid(), scale(0.5)],
        '-': [sprite('pipeTopLeft'), solid(), scale(0.5), 'pipe'],
        '+': [sprite('pipeTopRight'), solid(), scale(0.5), 'pipe'],
        '^': [sprite('evilShroom'), solid(), 'dangerous'],
        '#': [sprite('mushroom'), solid(), 'mushroom', body()],
        '!': [sprite('blueBlock'), solid(), scale(0.5)],
        '£': [sprite('blueBrick'), solid(), scale(0.5)],
        'z': [sprite('blueEvilShroom'), solid(), scale(0.5), 'dangerous'],
        '@': [sprite('blueSurprise'), solid(), scale(0.5), 'coin-surprise'],
        'x': [sprite('blueSteel'), solid(), scale(0.5)],

    }

    const gameLevel = addLevel(gameBoard, levelConfig)

    const player = add([
        sprite('mario'), solid(), pos(30, 0), body(), origin('bot')
    ])

})

start("game")