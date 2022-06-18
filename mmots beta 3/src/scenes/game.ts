import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene
{    
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
    private fauna?: Phaser.Physics.Arcade.Sprite

	constructor()
	{
		super('game')
	}

	preload()
    {
        this.load.image('tiles', 'tiles/DungeonTileset.png')
        this.load.tilemapTiledJSON('dungeon', 'tiles/dungeon01.json')
        this.load.image('tiles2', 'tiles/sky.png')
        this.load.spritesheet('fmchar', 'character/female-char.png', { frameWidth: 16, frameHeight: 16 } )
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create()
    {
        const map = this.make.tilemap({ key: 'dungeon' })
        const tileset = map.addTilesetImage('dungeon-01', 'tiles', 16, 16)

        const groundLlayer = map.createLayer('Ground', tileset)
        const wallsLayer = map.createLayer('Walls', tileset)

        wallsLayer.setCollisionByProperty({ Collides: true })

        const debugGraphics = this.add.graphics().setAlpha(0.7)
        wallsLayer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        })

        this.fauna = this.physics.add.sprite(100, 150, 'fmchar')

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('fmchar', { start: 6, end: 10 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'stand',
            frames: [ { key: 'fmchar', frame: 5 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('fmchar', { start: 6, end: 10 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('fmchar', { start: 11, end: 13 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('fmchar', { start: 14, end: 16 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.fauna, wallsLayer)

        this.cameras.main.startFollow(this.fauna, true)
    }
    update(t: number, dt:number)
    {
        if(!this.cursors || !this.fauna)
        {
            return
        }

        const speed = 100

        if(this.cursors.left?.isDown)
        {
            this.fauna.setVelocity(-speed, 0)
            this.fauna.anims.play('left', true)

            this.fauna.scaleX = -1
            this.fauna.body.offset.x = 16
        }
        else if(this.cursors.right?.isDown)
        {
            this.fauna.setVelocity(speed, 0)
            this.fauna.anims.play('right', true)

            this.fauna.scaleX = 1
            this.fauna.body.offset.x = 0
        }
        else if(this.cursors.up?.isDown)
        {
            this.fauna.setVelocity(0, -speed)
            //this.fauna.anims.play('left', true)

            this.fauna.anims.play('up', true)
        }
        else if(this.cursors.down?.isDown)
        {
            this.fauna.setVelocity(0, speed)
            //this.fauna.anims.play('left', true)
            this.fauna.anims.play('down', true)
        }
        else{
            this.fauna.setVelocity(0, 0)
            this.fauna.anims.play('stand', true)
        }
    }
}
