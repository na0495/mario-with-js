//IMPORTANT: Make sure to use Kaboom version 0.5.0 for this game by adding the correct script tag in the HTML file.

kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    debug: true,
    clearColor: [0, 0, 0, 1],
  })
  
  // Speed identifiers
  const MOVE_SPEED = 120
  const JUMP_FORCE = 360
  const BIG_JUMP_FORCE = 550
  let CURRENT_JUMP_FORCE = JUMP_FORCE
  const FALL_DEATH = 400
  const ENEMY_SPEED = 20
  
  // Game logic
  
  let isJumping = true

  // make sure to use your local server address
  // You can use python -m http.server $PORT or python3 -m http.server $PORT
  // To run your server and then use loadRoot('http://localhost:8000/assets/sound/')
  // insated of loadRoot('https://mariowithjs.netlify.app/assets/sound/')


  loadRoot('https://mariowithjs.netlify.app/assets/sound/')
  // loadRoot('http://localhost:8000/assets/sound/')
  loadSound('big_jump', 'big_jump.ogg')
  loadSound('small_jump', 'small_jump.ogg')
  loadSound('bump', 'bump.ogg')
  loadSound('coin', 'coin.ogg')
  loadSound('stomp', 'stomp.ogg')
  loadSound('powerup', 'powerup.ogg')
  loadSound('powerup_appears', 'powerup_appears.ogg')
  loadSound('pipe', 'pipe.ogg')

  loadRoot('https://mariowithjs.netlify.app/assets/music/')
  // loadRoot('http://localhost:8000/assets/music/')
  loadSound('death', 'death.wav')
  loadSound('gameover', 'game_over.ogg')
  loadSound('win', 'world_clear.wav')
  loadSound('main_theme', 'main_theme.ogg')
  loadSound('stage_clear', 'stage_clear.wav')
  
  loadRoot('https://i.imgur.com/')
  loadSprite('bg', 'jPJzaRT.png');
  loadSprite('coin', 'wbKxhcd.png')
  loadSprite('evil-shroom', 'KPO3fR9.png')
  loadSprite('brick', 'pogC9x5.png')
  loadSprite('block', 'M6rwarW.png')
  loadSprite('mario', 'Wb1qfhK.png')
  loadSprite('mushroom', '0wMd92p.png')
  loadSprite('surprise', 'gesQ1KP.png')
  loadSprite('unboxed', 'bdrLpi6.png')
  loadSprite('pipe-top-left', 'ReTPiWY.png')
  loadSprite('pipe-top-right', 'hj2GK4n.png')
  loadSprite('pipe-bottom-left', 'c1cYSbt.png')
  loadSprite('pipe-bottom-right', 'nqQ79eI.png')
  loadSprite('blue-block', 'fVscIbn.png')
  loadSprite('blue-brick', '3e5YRQd.png')
  loadSprite('blue-steel', 'gqVoI2b.png')
  loadSprite('blue-evil-shroom', 'SvV4ueD.png')
  loadSprite('blue-surprise', 'RMqCc1G.png')

  
  
  
  scene("game", ({ level, score }) => {
    layers(['bg', 'obj', 'ui'], 'obj')
    

    // background image
    // add([
    //   sprite("bg"),
    //   scale(width(), height()/440),
    //   layer("bg"),
    // ]);
  
    const maps = [
      [
        '                                                                           ',
        '                                           %%%%                            ',
        '                                                                           ',
        '                                                          ===              ',
        '                                                                           ',
        '     %   =*=%=                          %===%%==*=             %%%         ',
        '                                  ===                   =                  ',
        '                                                        =               -+ ',
        '                    ^   ^                             ^ =               () ',
        '==============================   ========================    ==============',
      ],
      [
        '                          %%%%                                                                  %%%%                        =',
        '                                                                                                                            =',
        '                                                                                                                            =',
        '                          ====                                                              ^              ^                =',
        '                               ==   ==                                        =======  =====================                =',
        '               %                      =           =*=%========%%===                                                         =',
        '                                         ===                           ==                                                 -+=',
        '                                                                              =                                          =()=',
        '                    ^   ^                                                   ^ =                                         ==()=',
        '=====  ==  =================   ====   =========================================                                ==============',
      ],
      [
        '                                                                                                                      ',
        '                                                                                                                      ',
        '                                                                                                                      ',
        '                                                                                                                      ',
        '                                                                                                                      ',
        '     %%%%%                                                                                                       %%%%%',
        '                                                                 ==%========%%===                                     ',
        '                                   ==                                                              -+                 ',
        '                    ^              =         =                                                 ^   ()                 ',
        '======================   ======   ==      ====    ==   ===============================    ============    ====   =====',
      ],
      [
        '£                                                                                                            £',
        '£                                                                                                xxxxxx      £',
        '£                                                                                                          x £',
        '£                                                                                                            £',
        '£  X                                                    xxx                                 z               x£',
        '£        @@@@@@              x x                   xxx                           @@@%@@@%%%%%@@              £',
        '£X                         x x x   xx   xxxxxxxx                   xxx                                       £',
        '£                        x x x x           xx                 xxx                                         x~/£',
        '£               z   z  x x x x x           xx                             xx                  z           x()£',
        '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!         !!!!                             xxx!!!!!!!!!!!!!!!!!!!!   !!!!!!!!!',
      ],
      
    ]
  
    const levelCfg = {
      width: 20,
      height: 20,
      '=': [sprite('block'), solid()],
      '$': [sprite('coin'), 'coin'],
      '%': [sprite('surprise'), solid(), 'coin-surprise'],
      '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
      '}': [sprite('unboxed'), solid()],
      '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
      ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
      '-': [sprite('pipe-top-left'), solid(), scale(0.5), 'pipe'],
      '+': [sprite('pipe-top-right'), solid(), scale(0.5), 'pipe'],
      '^': [sprite('evil-shroom'), solid(), 'dangerous'],
      '#': [sprite('mushroom'), solid(), 'mushroom', body()],
      '!': [sprite('blue-block'), solid(), scale(0.5)],
      '£': [sprite('blue-brick'), solid(), scale(0.5)],
      'z': [sprite('blue-evil-shroom'), solid(), scale(0.5), 'dangerous'],
      '@': [sprite('blue-surprise'), solid(), scale(0.5), 'coin-surprise'],
      'x': [sprite('blue-steel'), solid(), scale(0.5)],
      '~': [sprite('pipe-top-left'), solid(), scale(0.5), 'win-pipe'],
      '/': [sprite('pipe-top-right'), solid(), scale(0.5), 'win-pipe'],

  
    }
  
    const gameLevel = addLevel(maps[level], levelCfg)
  
    const scoreLabel = add([
      text(`Score ${score}`),,
      pos(30, 6),
      layer('ui'),
      {
        value: score
      }
    ])
  
    add([text('level ' + parseInt(level + 1) ), pos(-40, 6)])
    
    function big() {
      let timer = 0
      let isBig = false
      return {
        update() {
          if (isBig) {
            CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
            timer -= dt()
            if (timer <= 0) {
              this.smallify()
            }
          }
        },
        isBig() {
          return isBig
        },
        smallify() {
          this.scale = vec2(1)
          CURRENT_JUMP_FORCE = JUMP_FORCE
          timer = 0
          isBig = false
        },
        biggify(time) {
          this.scale = vec2(2)
          timer = time
          isBig = true     
        }
      }
    }
  
    const player = add([
      sprite('mario'), solid(),
      pos(30, 0),
      body(),
      big(),
      origin('bot')
    ])

    // the music might not autoplay cuz some browser won't allow audio start before any user interaction
    const music = play("main_theme", { loop: true, });

    // adjust global volume
    volume(0.5);

    // if (music.paused()) {
    //   music.play();
    // } else {
    //   music.pause();
    // }
  
    action('mushroom', (m) => {
      m.move(20, 0)
    })

    player.on("headbump", (obj) => {
      if (obj.is('coin-surprise')) {
        play('stomp')
        gameLevel.spawn('$', obj.gridPos.sub(0, 1))
        destroy(obj)
        gameLevel.spawn('}', obj.gridPos.sub(0,0))
      }
      if (obj.is('mushroom-surprise')) {
        play('powerup_appears')
        gameLevel.spawn('#', obj.gridPos.sub(0, 1))
        destroy(obj)
        gameLevel.spawn('}', obj.gridPos.sub(0,0))
      }
    })
  
    player.collides('mushroom', (m) => {
      destroy(m)
      play('powerup')
      scoreLabel.value = scoreLabel.value + 2
      player.biggify(6)
    })
  
    player.collides('coin', (c) => {
      destroy(c)
      play('coin')
      scoreLabel.value++
      scoreLabel.text = scoreLabel.value
    })
  
    action('dangerous', (d) => {
      d.move(-ENEMY_SPEED, 0)
    })
  
    player.collides('dangerous', (d) => {
      if (isJumping) {
        destroy(d)
        play('bump')
        scoreLabel.value = scoreLabel.value + 5
        scoreLabel.text = scoreLabel.value
      } else {
        music.stop()
        play('death')
        play('gameover')
        go('lose', { score: scoreLabel.value})
      }
    })
  
    player.action(() => {
      camPos(player.pos)
      if (player.pos.y >= FALL_DEATH) {
        music.stop()
        play('death')
        play('gameover')
        go('lose', { score: scoreLabel.value})
      }
    })
    
    player.collides('pipe', () => {
      keyPress('down', () => {
          play('pipe')
          music.stop()
          go('game', {
          level: (level + 1) % maps.length,
          score: scoreLabel.value
          })
        // }
      })
    })
    player.collides('win-pipe', () => {
      keyPress('down', () => {
        music.stop()
        play('win')
        go('win', { score: scoreLabel.value})
      })
    })
  
    keyDown('left', () => {
      player.move(-MOVE_SPEED, 0)
    })
  
    keyDown('right', () => {
      player.move(MOVE_SPEED, 0)
    })
  
    player.action(() => {
      if(player.grounded()) {
        isJumping = false
      }
    })
  
    keyPress('space', () => {
      if (player.grounded()) {
        isJumping = true
        player.jump(CURRENT_JUMP_FORCE)
        if (player.is('big')) {
          play('big_jump')
        } else {
          play('small_jump')
        }
      }
    })

    keyPress('r', () => {
      window.location.reload();
    })

    // keyPress("p", () => {
    //   go("gameover",{ score: scoreLabel.value, level: levelLabel.value} );
    // })

  })

  scene('lose', ({ score }) => {
    add([text("Game Over \n\n\n" + score + "\n\n\n press R or click on \n\n the Screen to replay!", 30), origin('center'), pos(width()/2, height()/ 2)])
    keyPress("r", () => {
      window.location.reload();
    });
    mouseClick(() => window.location.reload());
  })

  // scene("gameover", (score, level) => {
  //   add([text("Your current score is :  " + score, 30), origin('center'), pos(width()/2, height()/ 2)])
  //   mouseClick(() => go("game", { level , score }))
  // });

  scene('win', ({ score }) => {
    add([text("That wasn't hard GG\n\n this was the last level \n\n your Score is \n\n" + score, 32), origin('center'), pos(width()/2, height()/ 2)])
  })
  
  start("game", { level: 0, score: 0})

