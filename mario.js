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


//game setting 

const MoveSpeed = 120
const JumpForce = 360
const BigJumpForce = 500
const fallDeath = 400
const enemySpeed = -20
let isJumping = true
let CurrentJumpForce = JumpForce

scene("game", ({ score }) => {
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
        '%': [sprite('surprise'), solid(), 'coinSurprise'],
        '*': [sprite('surprise'), solid(), 'mushroomSurprise'],
        '}': [sprite('unboxed'), solid()],
        '(': [sprite('pipeBottomLeft'), solid(), scale(0.5)],
        ')': [sprite('pipeBottomRight'), solid(), scale(0.5)],
        '-': [sprite('pipeTopLeft'), solid(), scale(0.5), 'pipe'],
        '+': [sprite('pipeTopRight'), solid(), scale(0.5), 'pipe'],
        '^': [sprite('evilShroom'), solid(), 'dangerous'],
        '#': [sprite('mushroom'), solid(), 'mushroom', body()],
        '!': [sprite('blueBlock'), solid(), scale(0.5)],
        '£': [sprite('blueBrick'), solid(), scale(0.5)],
        'z': [sprite('blueEvilShroom'), solid(), scale(0.5), 'danger'],
        '@': [sprite('blueSurprise'), solid(), scale(0.5), 'coin-surprise'],
        'x': [sprite('blueSteel'), solid(), scale(0.5)],

    }

    const gameLevel = addLevel(gameBoard, levelConfig)
    
    const scoreLabel = add([text(score), pos(30, 6), layer('ui'), { value: 'score', }])

    add([text('level ' + parseInt(level + 1) ), pos(40, 6)])

    function big() {
        let timer = 0
        let isBig = false
        return {
            update() {
                if (isBig) {
                    timer -=dt()
                    if (timer <= 0) {
                        this.smallify
                    }
                }
            },
            isBig() {
                return isBig
            },
            smallify() {
                CurrentJumpForce = JumpForce
                this.scale = vec2(1)
                timer = 0 
                isBig = false
            },
            biggify(time) {
                CurrentJumpForce = BigJumpForce
                this.scale = vec2(2)
                timer = time
                isBig = false
            }
        }
    }

    const player = add([
        sprite('mario'), solid(), pos(30, 0), body(), origin('bot'), big()
    ])

    action('mushroom', (m) => {
        m.move(20, 0)
    })

    action('danger', (d) => {
        d.move(enemySpeed, 0)  
    })

    player.on("headbump", (obj) => {
        if (obj.is('coinSurprise')) {
            gameLevel.spawn('$', obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn('}', obj.gridPos.sub(0, 0))
        }

        if (obj.is('mushroomSurprise')) {
            gameLevel.spawn('#', obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn('}', obj.gridPos.sub(0, 0))
        }
    })

    player.collides('mushroom', (m) =>  {
        destroy(m)
        player.biggify(6)
    })

    player.collides('coin', (c) => {
        destroy(c)
        scoreLabel.value++
        scoreLabel.text = scoreLabel.value
    })
    // killing ennemys and losing 

    player.collides('danger', (d) => {
        if (isJumping) {
          destroy(d)
        } else {
          go('lose', { score: scoreLabel.value})
        }
    })

    player.action(() => {
        camPos(player.pos)
        if (player.pos >= fallDeath) {
            globalThis('lose', {score :scoreLabel.value})
        }
    })

    

    //? Moving setting

    keyDown('left', () => {
        player.move(-MoveSpeed, 0)
    })
    keyDown('right', () => {
        player.move(MoveSpeed, 0)
    })

    player.action(() => {
        if(player.grounded()) {
          isJumping = false
        }
    })

    keyPress('space', () => {
        if (player.grounded()) {
          isJumping = true
          player.jump(CurrentJumpForce)
        }
    })

})

scene('lose', ({ score }) => {
    add([text(score, 32), origin('center'), pos(width()/2, height()/ 2)])
  })

  start("game", { level: 0, score: 0})