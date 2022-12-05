// removed import
// removed import

/**
 * Communicate with the EDGE system.
 */
 const EdgeProxy = {
    /**
     * Increase progress points for an objective
     * @param {string} name The 'name' of the objective. Case insensitive.
     * @param {number} points Number of points to add to the objective.
     */
    increaseObjectiveProgress: function(name, points){
        if (window.EdgeInternals._on_updateObjective != null)
            window.EdgeInternals._on_updateObjective(name, points);
        else
            console.log("Edge Internal implementation for _on_updateObjective missing");
    },
    /**
     * Increase hitpoints for a guidance tracker
     * @param {string} name The 'name' of the guidance tracker. Case insensitive.
     * @param {number} points Number of points to add to the objective.
     */
    increaseGuidanceProgress: function(name, points){
        if (window.EdgeInternals._on_updateGuidance != null)
            window.EdgeInternals._on_updateGuidance(name, points);
        else
            console.log("Edge Internal implementation for _on_updateGuidance missing");
    },
    /**
     * Notify the EDGE system that the user finished the game.
     * For example, when the user is at the last level.
     * @param {string} message The message to show to the user.
     * @param {object | null | undefined} data Optional data
     */
    notifyGameCompleted: function(message, data){
        if (window.EdgeInternals._on_gameCompleted != null)
            window.EdgeInternals._on_gameCompleted(message, data);
        else
            console.log("Edge Internal implementation for _on_gameCompleted missing");
    },
    
    /**
     * Get a Phaser Sprite by using it's object name
     * @param {Phaser.Scene} scene Pass `this` as the first argument
     * @param {string} key The scene object name you want the sprite for
     * @returns {Phaser.GameObjects.Sprite} The sprite corresponding to the sceneObject name
     */
    getLevelSprite: function(scene, key){
        return scene.spriteReferences[key];
    },

    /**
     * Get a raw object with the displayNames and filePaths of resources
     * @param {Phaser.Scene} scene Pass `this` as the first argument
     * @param {string} displayName Display name of the resources in the resource tab
     * @returns {string} The filePath of the resource
     */
    getLevelRawResourcePath: function(scene, displayName){
        return scene.rawResources[displayName];
    },

    /**
     * Get the entire level as an object. Explore the 'objects' key in the return object.
     * @param {Phaser.Scene} scene Pass `this` as the first argument
     * @returns {object}
     */
    getLevelData: function(scene){
        return scene.levelData;
    },

    /**
     * Get the value for each level property by it's name
     * @param {Phaser.Scene} scene Pass `this` as the first argument
     * @param {string} propertyName The name of the property
     * @returns {object}
     */
    getLevelProperty: function(scene, propertyName){
        return scene.levelProperties[propertyName];
    },

    /**
     * Returns the underlying raw level properties object
     * @param {Phaser.Scene} scene Pass `this` as the first argument
     * @returns {{ [key: string]: object }}
     */
    getAllProperties: function(scene) {
        return scene.levelProperties;
    }
}

// removed import

/**
 * Check SPLAY component for this canvas.
 */
const canvasName = 'canvas-container';

// removed import

class LevelScene_Title_Screen extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_Title_Screen", active: false });

        /**
         * @type {Phaser.GameObjects.Text}
         */
        this.startButton = null;
    }

    preload(){
        

		this.load.setBaseURL('http://localhost/');


		this.rawResources = {}
		this.rawResources['sky1.png'] = "fs/res_upload/image/543a1bf2-5735-4778-99fd-1ab26ec6373f.png";
		this.rawResources['titleplaceholder.png'] = "fs/res_upload/image/7f321712-4567-485f-bc7c-4b2d09b4354d.png";
		this.rawResources['rocket.png'] = "fs/res_upload/image/af846e3e-142f-4e82-825d-d95ab196eb8b.png";
		this.rawResources['smallbullet.png'] = "fs/res_upload/image/93b193d9-3939-48a0-bde0-e983d4df60cc.png";
		this.rawResources['meteor.png'] = "fs/res_upload/image/19b17164-f17c-4d14-b6f9-309986e823d8.png";
		this.rawResources['meteor2.png'] = "fs/res_upload/image/1ac64204-33ab-4658-a229-223ef9695c87.png";
		this.rawResources['panel.png'] = "fs/res_upload/image/e825ee7e-0a7f-417d-bce0-ab15f83e6895.png";
		this.rawResources['heart.png'] = "fs/res_upload/image/f9c94337-a6ac-4580-b8dc-41a3b80d84a5.png";
		this.rawResources['gameover.jpeg'] = "fs/res_upload/image/5d5f6894-ad08-49ee-a28a-de9d89356caf.jpeg";
		this.rawResources['youwin.jpg'] = "fs/res_upload/image/5df0a14f-62ee-49fb-a9d1-d97487a1ae3c.jpg";
		this.rawResources['explosion.png'] = "fs/res_upload/image/d47f1e63-761f-46c4-9353-22ddce5ab0d3.png";
		this.rawResources['explosion_atlas.json'] = "fs/res_upload/other/12d9b5bf-9881-4418-b481-af49c0000484.json";


		this.load.image('sky', 'fs/res_upload/image/543a1bf2-5735-4778-99fd-1ab26ec6373f.png');
		this.load.image('title', 'fs/res_upload/image/7f321712-4567-485f-bc7c-4b2d09b4354d.png');


		this.levelData = {
    "objects": [
        {
            "_id": "6372aaa7b3861d1bc51ee400",
            "spriteResourceId": "",
            "type": "camera",
            "name": "Camera",
            "frame": {
                "x": 0,
                "y": 0,
                "w": 899,
                "h": 480
            },
            "rotation": 0,
            "physicsBehavior": "1",
            "physicsCollision": "2",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668460879936",
            "spriteResourceId": "6372b0355959633a814b9974",
            "type": "sprite",
            "name": "sky",
            "frame": {
                "x": 0,
                "y": 0,
                "w": 900,
                "h": 490
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668460888809",
            "spriteResourceId": "6372b14a5959633a814b9976",
            "type": "sprite",
            "name": "title",
            "frame": {
                "x": 300,
                "y": 50,
                "w": 300,
                "h": 200
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        }
    ]
}


		this.levelProperties = {}
	

        // Add your code below this line


        
    }
    create(){
        let scaleX = 0, scaleY = 0;
		this.spriteReferences = {}
		// --- scene object sky ---
		const sprite_1 = this.add.sprite(450, 245, 'sky').setInteractive();
		sprite_1.name = "sky";
		scaleX = 900 / sprite_1.displayWidth;
		scaleY = 490 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences['sky'] = sprite_1;


		// --- scene object title ---
		const sprite_2 = this.add.sprite(450, 150, 'title').setInteractive();
		sprite_2.name = "title";
		scaleX = 300 / sprite_2.displayWidth;
		scaleY = 200 / sprite_2.displayHeight;
		sprite_2.setScale(scaleX, scaleY);
		this.spriteReferences['title'] = sprite_2;


		const objects = this.levelData.objects;
		const camera = objects.find((o) => o.type == 'camera');
		console.log("Camera width & height", camera.frame.w, camera.frame.h);
		this.scale.setGameSize(camera.frame.w, camera.frame.h);
		this.scale.resize(camera.frame.w, camera.frame.h);
		this.cameras.main.setBounds(camera.frame.x, camera.frame.y, camera.frame.w, camera.frame.h)



        // Add your code below this line

        this.setupStartButton();
        
    }
    update(){
        // EDGTOKEN_UPDATE

        // Add your code below this line

    }
    destroy(){
        // EDGTOKEN_DESTROY
        
        // Add your code below this line

    }

    setupStartButton(){
        this.startButton = this.add.text(0, 0, 'Start', {
            fontSize: '30px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        })
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start('LevelScene_Level1');
        });

        this.startButton.setX( this.cameras.main.centerX - (this.startButton.width / 2.0) );
        this.startButton.setY( this.cameras.main.height * 0.75 - this.startButton.height );
    }
}

// removed import

let meteor_globals = {
    scaleX: 0,
    scaleY: 0
};

class LevelScene_DataLevel extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_DataLevel", active: false });
        
    }

    preload(){
        

		this.load.setBaseURL('http://localhost/');


		this.rawResources = {}
		this.rawResources['sky1.png'] = "fs/res_upload/image/543a1bf2-5735-4778-99fd-1ab26ec6373f.png";
		this.rawResources['titleplaceholder.png'] = "fs/res_upload/image/7f321712-4567-485f-bc7c-4b2d09b4354d.png";
		this.rawResources['rocket.png'] = "fs/res_upload/image/af846e3e-142f-4e82-825d-d95ab196eb8b.png";
		this.rawResources['smallbullet.png'] = "fs/res_upload/image/93b193d9-3939-48a0-bde0-e983d4df60cc.png";
		this.rawResources['meteor.png'] = "fs/res_upload/image/19b17164-f17c-4d14-b6f9-309986e823d8.png";
		this.rawResources['meteor2.png'] = "fs/res_upload/image/1ac64204-33ab-4658-a229-223ef9695c87.png";
		this.rawResources['panel.png'] = "fs/res_upload/image/e825ee7e-0a7f-417d-bce0-ab15f83e6895.png";
		this.rawResources['heart.png'] = "fs/res_upload/image/f9c94337-a6ac-4580-b8dc-41a3b80d84a5.png";
		this.rawResources['gameover.jpeg'] = "fs/res_upload/image/5d5f6894-ad08-49ee-a28a-de9d89356caf.jpeg";
		this.rawResources['youwin.jpg'] = "fs/res_upload/image/5df0a14f-62ee-49fb-a9d1-d97487a1ae3c.jpg";
		this.rawResources['explosion.png'] = "fs/res_upload/image/d47f1e63-761f-46c4-9353-22ddce5ab0d3.png";
		this.rawResources['explosion_atlas.json'] = "fs/res_upload/other/12d9b5bf-9881-4418-b481-af49c0000484.json";




		this.levelData = {
    "objects": [
        {
            "_id": "637fa31c8fe88c7d54ae3efb",
            "spriteResourceId": "",
            "type": "camera",
            "name": "Camera",
            "frame": {
                "x": 0,
                "y": 0,
                "w": 1366,
                "h": 768
            },
            "rotation": 0,
            "physicsBehavior": "1",
            "physicsCollision": "2",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        }
    ]
}


		this.levelProperties = {}
	

        // Add your code below this line
        
    }
    create(){
        let scaleX = 0, scaleY = 0;
		this.spriteReferences = {}
		const objects = this.levelData.objects;
		const camera = objects.find((o) => o.type == 'camera');
		console.log("Camera width & height", camera.frame.w, camera.frame.h);
		this.scale.setGameSize(camera.frame.w, camera.frame.h);
		this.scale.resize(camera.frame.w, camera.frame.h);
		this.cameras.main.setBounds(camera.frame.x, camera.frame.y, camera.frame.w, camera.frame.h)



        // Add your code below this line

    }
    update(){
        // EDGTOKEN_UPDATE

        // Add your code below this line

    }
    destroy(){
        // EDGTOKEN_DESTROY
        
        // Add your code below this line

    }
}

/**
 * Represents 1 bullet.
 * Defined in level1, available on subsequent levels.
 */
class RocketBullet extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y)
    {
        // All levels must have a bullet object.
        // Same as out of camera bounds object. 
        let textureName = 'bullet'; 
        super(scene, x, y, textureName);
        this.setName('bullet');
    }

    fire (x, y, vX, vY)
    {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityX(vX);
        this.setVelocityY(vY);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        if (this.x + this.displayWidth >= this.scene.cameras.main.width)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

/**
 * Represents all the bullets.
 * Defined in level1, available on subsequent levels.
 */
class RocketBulletsGroup extends Phaser.Physics.Arcade.Group {
    constructor (scene)
    {
        super(scene.physics.world, scene);
        this.createMultiple({
            frameQuantity: 10,
            key: 'rocketbullet',
            active: false,
            visible: false,
            classType: RocketBullet
        });
    }

    fireBullet (x, y, vX, vY)
    {
        let bullet = this.getFirstDead(true);
        if (bullet)
            bullet.fire(x, y, vX, vY);
    }
}

/**
 * Represents one meteor text sprite
 */
class MeteorTextContainer extends Phaser.GameObjects.Container{

    constructor(scene){
        super(scene);

        /**
         * @type {Phaser.GameObjects.Sprite}
         */
        this.meteor = null;

        /**
         * @type {Phaser.GameObjects.Text}
         */
        this.text = null;

        /**
         * @type {Boolean}
         */
        this.correct = false;

        this.setup();
    }

    setup(){
        this.meteor = this.scene.add.sprite(0, 0, 'meteor');

        /**
         * @type {Phaser.Types.GameObjects.Text.TextStyle}
         */
        const textStyle = {
            fontFamily: 'Arial',
            fontSize: '16px',
            align: 'center',
            color: '#ffc800',
            wordWrap: {
                width: this.meteor.displayWidth
            }
        }

        this.text = this.scene.add.text(0, 0, '1/2 ', textStyle);
        this.text.setOrigin(0.5, 0.5);

        this.add(this.meteor);
        this.add(this.text);

        this.setName('meteor');
        // this.setSize(this.meteor.displayWidth, this.meteor.displayHeight);
        this.meteor.setScale(meteor_globals.scaleX, meteor_globals.scaleY);
        this.setSize(this.meteor.displayWidth, this.meteor.displayHeight);
    }

    /**
     * Add a meteor to the scene
     * @param {number} x Origin X
     * @param {number} y Origin Y
     * @param {number} velocityX X velocity
     * @param {number} velocityY Y velocity
     * @param {boolean} correct Does the meteor represent correct or incorrect state?
     * @param {string} textStr The answer visible on the meteor
     */
    queue(x, y, velocityX, velocityY, correct, textStr){
        this.text.text = textStr;
        this.isCorrect = correct;
        this.setPosition(x, y);

        // Enable physics for this container
        this.scene.physics.world.enableBody(this);
        this.body.setVelocityX(Number.parseInt(velocityX))
        this.body.setVelocityY(Number.parseInt(velocityY));
    }

}

/**
 * Represents all meteors.
 * Defined in level1, available on subsequent levels.
 */
class MeteorGroup extends Phaser.Physics.Arcade.Group {
    constructor (scene)
    {
        super(scene.physics.world, scene);
    }

    /**
     * Add a meteor to the scene
     * @param {number} x Origin X
     * @param {number} y Origin Y
     * @param {number} velocity X Velocity
     * @param {number} velocity Y Velocity
     * @param {boolean} correct Does the meteor represent correct or incorrect state?
     * @param {string} text The answer visible on the meteor
     */
    addMeteor (x, y, velocityX, velocityY, correct, text)
    {
        const meteor = new MeteorTextContainer(this.scene);
        this.add(meteor)
        this.scene.add.existing(meteor);
        meteor.queue(x, y, velocityX, velocityY, correct, text);
    }
}

// ****************************************************************
// MARK: Common level used by all levels

class CommonLevel extends Phaser.Scene{

    constructor(object){
        super(object);

        this.objective1 = '5 points in 12 seconds';
        this.objective2 = 'Finish 3 Levels';
        this.guidance1 = 'No points for 10 seconds';
        this.guidance2 = 'No points for 30 seconds';

        /**
         * Veloctiy of the rocket.
         * @type {number}
         */
        this.rocketVelocity = 20;

        /**
         * @type {Phaser.GameObjects.Sprite}
         */
        this.rocket = null;

        /**
         * @type {Phaser.Types.Input.Keyboard.CursorKeys}
         */
        this.cursors = null;

        /**
         * @type {RocketBulletsGroup}
         */
        this.bullets = null;

        /**
         * If true, bullets will appear on screen.
         */
        this.fire = false;

        /**
         * @type {MeteorGroup}
         */
        this.meteors = null;

        /**
         * @type {Phaser.Time.TimerEvent}
         */
        this.meteorTimer = null;

        /**
         * @type {Phaser.GameObjects.Text}
         */
        this.scoreText = null;

        // MARK: Game Data

        /**
         * Number of lives before a game over
         * @type {number}
         */
        this.lives = 3;

        /**
         * The text on the question prompt
         * @type {string}
         */
        this.question = '';

        /**
         * Current points
         * @type {number}
         */
        this.points = 0;

        /**
         * Required points
         * @type {number}
         */
        this.requiredPoints = 0;

        /**
         * Asteroid Direction
         * (1 = Right, 2 = Down, 3 = Left, 4 = Top)
         * 
         * @type {number}
         */
        this.asteroidDirection = 1;

        /**
         * Correct answer array
         * @type {string[]}
         */
        this.correctAnswers = [];

        /**
         * Wrong answer array
         * @type {string[]}
         */
        this.wrongAnswers = [];

        /**
         * Meteor Velocity
         * @type {number}
         */
        this.meteorVelocity = 0
    }

    preload(){

        const resSheet = 'explosion.png';
        const resAtlast = 'explosion_atlas.json';
        const fileSheet = EdgeProxy.getLevelRawResourcePath(this, resSheet);
        const fileAtlas = EdgeProxy.getLevelRawResourcePath(this, resAtlast);

        console.log('Atlast File', fileAtlas);
        this.load.atlas('atlas-explosion', fileSheet, fileAtlas);

    }

    create(){
        const meteor = EdgeProxy.getLevelSprite(this, 'meteor');
        meteor_globals.scaleX = meteor.scaleX;
        meteor_globals.scaleY = meteor.scaleY;

        this.setup();
        this.listenToSpaceBar();
        this.readProperties();
        this.showPrompt();
        this.updatePoints(0);
        this.setupGuidanceTriggers();

        // NEW:

        let angle = 0;
        switch(this.asteroidDirection){
            case 1: angle = 0; break;
            case 2: angle = 90; break;
            case 3: angle = 180; break;
            case 4: angle = 270; break;
        }
        this.rocket.setAngle(angle);

        // Test Meteor Text Container - works!
        // this.meteor1 = new MeteorTextContainer(this);
        // this.meteor1.setPosition(200, 50);
        // this.add.existing(this.meteor1);

        // Test
        // EdgeProxy.increaseObjectiveProgress(this.objective2, 3);
    }

    update(){
        this.handleRocketMovement();
        this.handleRocketBullets();
    }

    destroy(){
        
    }

    /**
     * Sets up object references
     */
    setup(){
        this.rocket = EdgeProxy.getLevelSprite(this, 'rocket');
        this.cursors = this.input.keyboard.createCursorKeys();
        this.bullets = new RocketBulletsGroup(this);
        this.meteors = new MeteorGroup(this);

        this.setupBulletAndMeteorCollision();
        this.setupRocketAndMeteorCollision();
        this.setupMeteorTimer();
        this.setupExplosionAnimation();
    }

    /**
     * Add keyboard controls to rocket
     */
    handleRocketMovement(){
        let velocity = this.rocketVelocity;
        let kb = this.cursors;
        let rocket = this.rocket;
        let x = rocket.x;
        let y = rocket.y;
        let w2 = rocket.displayWidth / 2;
        let h2 = rocket.displayHeight / 2;
        let cam = this.cameras.main;

        if (kb.left.isDown)
            rocket.setX(x - velocity);

        if (kb.right.isDown)
            rocket.setX(x + velocity);

        if (kb.up.isDown)
            rocket.setY(y - velocity);

        if (kb.down.isDown)
            rocket.setY(y + velocity);

        // Check Bounds
        rocket.setX(Math.max(w2, Math.min(cam.width - w2, rocket.x)));
        rocket.setY(Math.max(h2, Math.min(cam.height - h2, rocket.y)));
    }

    listenToSpaceBar(){
        this.input.keyboard.on('keydown-SPACE', () => {
            // this.fire = true;
            this.fireRocketBullet();
        });
        this.input.keyboard.on('keyup-SPACE', () => this.fire = false);
    }

    handleRocketBullets(){
        if (this.fire){
            this.fireRocketBullet();
        }
    }

    fireRocketBullet(){
        let rocket = this.rocket;
        const bulletVelocity = 430;
        let velocityX = 0;
        let velocityY = 0;

        /**
         * 1 = Right
         * 2 = Down
         * 3 = Left
         * 4 = Top
         */
        switch(this.asteroidDirection){
            case 1: 
                velocityX = bulletVelocity;
                velocityY = 0;
                break;

            case 2:
                velocityX = 0;
                velocityY = bulletVelocity;
                break;

            case 3: 
                velocityX = -bulletVelocity;
                velocityY = 0;
                break;

            case 4:
                velocityX = 0;
                velocityY = -bulletVelocity;
                break;
        }


        this.bullets.fireBullet(rocket.x, rocket.y, velocityX, velocityY);
    }

    setupBulletAndMeteorCollision(){
        this.physics.add.collider(this.bullets, this.meteors, (first, second) => {
            /**
             * @type {MeteorTextContainer}
             */
            let meteor = first.name == 'meteor' ? first : second;
            
            if (meteor.isCorrect){
                // Increase points
                this.updatePoints(this.points + 1);
            }
            else{
                // Decrease points
                this.updatePoints(this.points - 1);
            }

            first.destroy();
            second.destroy();
        });
    }

    setupRocketAndMeteorCollision(){
        this.physics.world.enableBody(this.rocket);
        this.physics.add.overlap(this.rocket, this.meteors, (first, second) => {
            this.updateLives(this.lives - 1);
        });
    }

    setupMeteorTimer(){
        /**
         * @type {Phaser.Types.Time.TimerEventConfig}
         */
        const config = {
            delay: 2500,
            callback: () => this.handleMeteorTimeTicked(),
            callbackScope: this,
            loop: true,
        };
        this.meteorTimer = this.time.addEvent(config);
    }

    setupExplosionAnimation(){

        // Demo Animation & Sprite
        this.anims.create({
            key: 'anim-explosion',
            // frames: this.anims.generateFrameNumbers('atlas-explosion', { start: 1, end: 7 }),
            frames: this.anims.generateFrameNames('atlas-explosion', { prefix: "", start: 1, end: 7 }),
            repeat: -1,
            frameRate: 2
        });
        this.add.sprite(200, 200, 'something').play('anim-explosion').setDisplaySize(100, 100);


    }

    /**
     * When the meteor creation ticker ticks, pick an answer from the 
     * answers pool and add a meteor to the scene.
     */
    handleMeteorTimeTicked(){

        let isCorrectAnswer = Math.random() > 0.5;
        let value = '';

        if (isCorrectAnswer){
            let index = Math.floor(Math.random() * this.correctAnswers.length);
            value = this.correctAnswers[index];
        }
        else{
            let index = Math.floor(Math.random() * this.wrongAnswers.length);
            value = this.wrongAnswers[index];
        }

        const panel = EdgeProxy.getLevelSprite(this, 'panel');
        const meteor = EdgeProxy.getLevelSprite(this, 'meteor');
        const panelHeight = panel.displayHeight;
        const meteorWidth = meteor.frame.width;
        const meteorHeight = meteor.frame.height;
        const topOffset = 30;
        const leftOffset = 30;
        const widthArea = (this.cameras.main.width - meteorWidth - leftOffset);
        const heightArea = (this.cameras.main.height - panelHeight - meteorHeight - topOffset);
        let meteorX = 0;
        let meteorY = 0;
        // const meteorY = topOffset + heightArea * Math.random();

        // NEW: Change the appearing position of the asteroids
        let velocityX = 0;
        let velocityY = 0;

        switch(this.asteroidDirection){

            // Right
            case 1: 
            meteorX = this.cameras.main.width;
            meteorY = topOffset + heightArea * Math.random();
            velocityX = -this.meteorVelocity;
            velocityY = 0;
            break;

            // Down
            case 2: 
            meteorX = leftOffset + widthArea * Math.random();
            meteorY = this.cameras.main.height;
            velocityX = 0;
            velocityY = -this.meteorVelocity;
            break;

            // Left
            case 3: 
            meteorX = -meteorWidth;
            meteorY = topOffset + heightArea * Math.random();
            velocityX = this.meteorVelocity;
            velocityY = 0;
            break;

            // Top
            case 4: 
            meteorX = leftOffset + widthArea * Math.random();
            meteorY = -meteorHeight;
            velocityX = 0;
            velocityY = this.meteorVelocity;
            break;
        }

        this.meteors.addMeteor(
            meteorX, 
            meteorY, 
            velocityX, 
            velocityY, 
            isCorrectAnswer,
            value
        );
    }

    readProperties(){
        this.question = EdgeProxy.getLevelProperty(this, 'Question');
        this.requiredPoints = EdgeProxy.getLevelProperty(this, 'Points Required');
        this.correctAnswers = this.splitCSV(EdgeProxy.getLevelProperty(this, 'Correct Answers'));
        this.wrongAnswers = this.splitCSV(EdgeProxy.getLevelProperty(this, 'Wrong Answers'));
        this.meteorVelocity = Number.parseInt(EdgeProxy.getLevelProperty(this, 'Meteor Velocity'));
        this.asteroidDirection = Number.parseInt(EdgeProxy.getLevelProperty(this, 'Asteroid Direction'));
    }

    /**
     * Splits a comma separated list of values into a string array
     * @param {string} csv
     * @returns {string[]}
     */
    splitCSV(csv){
        return csv.split(",").map(s => s.trim());
    }

    showPrompt(){
        let panel = EdgeProxy.getLevelSprite(this, 'panel');
        let text = this.add.text(panel.x, panel.y, this.question, {
            fixedWidth: panel.displayWidth,
            align: 'center',
            fontFamily: 'Arial',
            fontSize: '20px',
        });
        text.setOrigin(0.5, 0.5);
    }

    /**
     * Update the score text or create it if it doesn't exist.
     * Optionally pass the new points to update.
     * @param {number | null} newPoints
     */
    updatePoints(newPoints){
        if (newPoints != null){
            let lastPoints = this.points;
            this.points = newPoints;

            // Check objective1 progress
            if ((this.time.now / 1000) <= 5){
                EdgeProxy.increaseObjectiveProgress(this.objective1, newPoints - lastPoints);
            }

            if (this.points >= this.requiredPoints){
                EdgeProxy.increaseObjectiveProgress(this.objective2, 1);

                this.moveToNextLevel();
            }
        }

        const text = `Score: ${this.points}/${this.requiredPoints}`;

        if (this.scoreText == null){
            this.scoreText = this.add.text(10, 10, text, {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#ffc800'
            })
        }
        else{
            this.scoreText.text = text;
        }
    }

    setupGuidanceTriggers(){
        /**
         * @type {Phaser.Time.TimerEvent}
         */
        const config1 = {
            delay: 10,
            callback: () => { 
                if (this.points <= 0){
                    EdgeProxy.increaseGuidanceProgress(this.guidance1, 1);
                }
            }
        };

        /**
         * @type {Phaser.Time.TimerEvent}
         */
        const config2 = {
            delay: 30,
            callback: () => { 
                if (this.points <= 0){
                    EdgeProxy.increaseGuidanceProgress(this.guidance2, 1);
                }
            }
        };

        this.time.addEvent(config1);
        this.time.addEvent(config2);
    }

    updateLives(newLives){
        this.lives = newLives;
        const h1 = EdgeProxy.getLevelSprite(this, 'heart1');
        const h2 = EdgeProxy.getLevelSprite(this, 'heart2');
        const h3 = EdgeProxy.getLevelSprite(this, 'heart3');

        h1.setVisible(newLives > 0);
        h2.setVisible(newLives > 1);
        h3.setVisible(newLives > 2);

        if (this.lives < 1){
            // Game Over
            this.scene.start('LevelScene_Game_Over_Screen');
        }
        else{
            this.resetPlayerPosition();
            this.removeAllMeteors();
        }
    }

    resetPlayerPosition(){
        this.rocket.body.setVelocityX(0);
        this.rocket.body.setVelocityY(0);
        this.rocket.setPosition(
            5 + this.rocket.displayWidth / 2,
            this.cameras.main.centerY
        );
    }

    removeAllMeteors(){
        this.meteors.children.getArray().forEach(m => {
            this.meteors.remove(m);
        })
    }

    moveToNextLevel(){
        console.log('Move to next level not implemented. Do not call super implementation.');
    }

}

// removed import

/**
 * @type {Phaser.Scene}
 */
class LevelScene_Level1 extends CommonLevel{

    constructor(){
        super({key: "LevelScene_Level1", active: false });
    }

    preload(){
        this.load.setBaseURL('EDGTOKEN_LOADBASEURL');
        

		this.load.setBaseURL('http://localhost/');


		this.rawResources = {}
		this.rawResources['sky1.png'] = "fs/res_upload/image/543a1bf2-5735-4778-99fd-1ab26ec6373f.png";
		this.rawResources['titleplaceholder.png'] = "fs/res_upload/image/7f321712-4567-485f-bc7c-4b2d09b4354d.png";
		this.rawResources['rocket.png'] = "fs/res_upload/image/af846e3e-142f-4e82-825d-d95ab196eb8b.png";
		this.rawResources['smallbullet.png'] = "fs/res_upload/image/93b193d9-3939-48a0-bde0-e983d4df60cc.png";
		this.rawResources['meteor.png'] = "fs/res_upload/image/19b17164-f17c-4d14-b6f9-309986e823d8.png";
		this.rawResources['meteor2.png'] = "fs/res_upload/image/1ac64204-33ab-4658-a229-223ef9695c87.png";
		this.rawResources['panel.png'] = "fs/res_upload/image/e825ee7e-0a7f-417d-bce0-ab15f83e6895.png";
		this.rawResources['heart.png'] = "fs/res_upload/image/f9c94337-a6ac-4580-b8dc-41a3b80d84a5.png";
		this.rawResources['gameover.jpeg'] = "fs/res_upload/image/5d5f6894-ad08-49ee-a28a-de9d89356caf.jpeg";
		this.rawResources['youwin.jpg'] = "fs/res_upload/image/5df0a14f-62ee-49fb-a9d1-d97487a1ae3c.jpg";
		this.rawResources['explosion.png'] = "fs/res_upload/image/d47f1e63-761f-46c4-9353-22ddce5ab0d3.png";
		this.rawResources['explosion_atlas.json'] = "fs/res_upload/other/12d9b5bf-9881-4418-b481-af49c0000484.json";


		this.load.image('sky', 'fs/res_upload/image/543a1bf2-5735-4778-99fd-1ab26ec6373f.png');
		this.load.image('rocket', 'fs/res_upload/image/af846e3e-142f-4e82-825d-d95ab196eb8b.png');
		this.load.image('bullet', 'fs/res_upload/image/93b193d9-3939-48a0-bde0-e983d4df60cc.png');
		this.load.image('meteor', 'fs/res_upload/image/19b17164-f17c-4d14-b6f9-309986e823d8.png');
		this.load.image('panel', 'fs/res_upload/image/e825ee7e-0a7f-417d-bce0-ab15f83e6895.png');
		this.load.image('heart3', 'fs/res_upload/image/f9c94337-a6ac-4580-b8dc-41a3b80d84a5.png');
		this.load.image('heart2', 'fs/res_upload/image/f9c94337-a6ac-4580-b8dc-41a3b80d84a5.png');
		this.load.image('heart1', 'fs/res_upload/image/f9c94337-a6ac-4580-b8dc-41a3b80d84a5.png');


		this.levelData = {
    "objects": [
        {
            "_id": "6372aaa7b3861d1bc51ee400",
            "spriteResourceId": "",
            "type": "camera",
            "name": "Camera",
            "frame": {
                "x": 0,
                "y": 0,
                "w": 900,
                "h": 480
            },
            "rotation": 0,
            "physicsBehavior": "1",
            "physicsCollision": "2",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668460633059",
            "spriteResourceId": "6372b0355959633a814b9974",
            "type": "sprite",
            "name": "sky",
            "frame": {
                "x": 0,
                "y": 0,
                "w": 900,
                "h": 490.50000000000006
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668463725450",
            "spriteResourceId": "6372bc62ca0b53b40adfe7fe",
            "type": "sprite",
            "name": "rocket",
            "frame": {
                "x": 0,
                "y": 190,
                "w": 100,
                "h": 100
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668467889749",
            "spriteResourceId": "6372cca0ca0b53b40adfe800",
            "type": "sprite",
            "name": "bullet",
            "frame": {
                "x": 30,
                "y": 530,
                "w": 13,
                "h": 13
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668469415514",
            "spriteResourceId": "6372d29fca0b53b40adfe801",
            "type": "sprite",
            "name": "meteor",
            "frame": {
                "x": 58.0000000000001,
                "y": 524,
                "w": 66.6666666666666,
                "h": 33.3333333333333
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668476541664",
            "spriteResourceId": "6372ee74ca0b53b40adfe803",
            "type": "sprite",
            "name": "panel",
            "frame": {
                "x": 250,
                "y": 400,
                "w": 400,
                "h": 70
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668484865393",
            "spriteResourceId": "63730efaca0b53b40adfe804",
            "type": "sprite",
            "name": "heart3",
            "frame": {
                "x": 766,
                "y": 3,
                "w": 36,
                "h": 36
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668484900845",
            "spriteResourceId": "63730efaca0b53b40adfe804",
            "type": "sprite",
            "name": "heart2",
            "frame": {
                "x": 812,
                "y": 3,
                "w": 36,
                "h": 36
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668484939014",
            "spriteResourceId": "63730efaca0b53b40adfe804",
            "type": "sprite",
            "name": "heart1",
            "frame": {
                "x": 858,
                "y": 3,
                "w": 36,
                "h": 36
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        }
    ]
}


		this.levelProperties = {
    "Question": "Shoot all even numbers",
    "Points Required": 1,
    "Meteor Velocity": 80,
    "Asteroid Direction": "4",
    "Correct Answers": "2, 4, 6, 8, 10, 12",
    "Wrong Answers": "1, 3, 5, 7, 9, 11"
}
	
        // EDGTOKEN_LEVEL
        // EDGTOKEN_PROPERTIES
        // EDGTOKEN_SETCAMERA

        // Add your code below this line
        super.preload();

    }

    create(){
        let scaleX = 0, scaleY = 0;
		this.spriteReferences = {}
		// --- scene object sky ---
		const sprite_1 = this.add.sprite(450, 245.25000000000003, 'sky').setInteractive();
		sprite_1.name = "sky";
		scaleX = 900 / sprite_1.displayWidth;
		scaleY = 490.50000000000006 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences['sky'] = sprite_1;


		// --- scene object rocket ---
		const sprite_2 = this.add.sprite(50, 240, 'rocket').setInteractive();
		sprite_2.name = "rocket";
		scaleX = 100 / sprite_2.displayWidth;
		scaleY = 100 / sprite_2.displayHeight;
		sprite_2.setScale(scaleX, scaleY);
		this.spriteReferences['rocket'] = sprite_2;


		// --- scene object bullet ---
		const sprite_3 = this.add.sprite(36.5, 536.5, 'bullet').setInteractive();
		sprite_3.name = "bullet";
		scaleX = 13 / sprite_3.displayWidth;
		scaleY = 13 / sprite_3.displayHeight;
		sprite_3.setScale(scaleX, scaleY);
		this.spriteReferences['bullet'] = sprite_3;


		// --- scene object meteor ---
		const sprite_4 = this.add.sprite(91.3333333333334, 540.6666666666666, 'meteor').setInteractive();
		sprite_4.name = "meteor";
		scaleX = 66.6666666666666 / sprite_4.displayWidth;
		scaleY = 33.3333333333333 / sprite_4.displayHeight;
		sprite_4.setScale(scaleX, scaleY);
		this.spriteReferences['meteor'] = sprite_4;


		// --- scene object panel ---
		const sprite_5 = this.add.sprite(450, 435, 'panel').setInteractive();
		sprite_5.name = "panel";
		scaleX = 400 / sprite_5.displayWidth;
		scaleY = 70 / sprite_5.displayHeight;
		sprite_5.setScale(scaleX, scaleY);
		this.spriteReferences['panel'] = sprite_5;


		// --- scene object heart3 ---
		const sprite_6 = this.add.sprite(784, 21, 'heart3').setInteractive();
		sprite_6.name = "heart3";
		scaleX = 36 / sprite_6.displayWidth;
		scaleY = 36 / sprite_6.displayHeight;
		sprite_6.setScale(scaleX, scaleY);
		this.spriteReferences['heart3'] = sprite_6;


		// --- scene object heart2 ---
		const sprite_7 = this.add.sprite(830, 21, 'heart2').setInteractive();
		sprite_7.name = "heart2";
		scaleX = 36 / sprite_7.displayWidth;
		scaleY = 36 / sprite_7.displayHeight;
		sprite_7.setScale(scaleX, scaleY);
		this.spriteReferences['heart2'] = sprite_7;


		// --- scene object heart1 ---
		const sprite_8 = this.add.sprite(876, 21, 'heart1').setInteractive();
		sprite_8.name = "heart1";
		scaleX = 36 / sprite_8.displayWidth;
		scaleY = 36 / sprite_8.displayHeight;
		sprite_8.setScale(scaleX, scaleY);
		this.spriteReferences['heart1'] = sprite_8;


		const objects = this.levelData.objects;
		const camera = objects.find((o) => o.type == 'camera');
		console.log("Camera width & height", camera.frame.w, camera.frame.h);
		this.scale.setGameSize(camera.frame.w, camera.frame.h);
		this.scale.resize(camera.frame.w, camera.frame.h);
		this.cameras.main.setBounds(camera.frame.x, camera.frame.y, camera.frame.w, camera.frame.h)



        // Add your code below this line
        super.create();

    }

    update(){

        // Add your code below this line
        super.update();

    }

    destroy(){
        
        // Add your code below this line
        super.destroy();

    }

    moveToNextLevel(){
        /**
         * @type {Phaser.Scene}
         */
        const ref = this;
        // ref.scene.start('LevelScene_Level2');
        ref.scene.start('LevelScene_Win');
    }
}




// removed import

class LevelScene_Level2 extends CommonLevel{

    constructor(){
        super({key: "LevelScene_Level2", active: false });
    }

    preload(){
        

		this.load.setBaseURL('http://localhost/');


		this.rawResources = {}
		this.rawResources['sky1.png'] = "fs/res_upload/image/543a1bf2-5735-4778-99fd-1ab26ec6373f.png";
		this.rawResources['titleplaceholder.png'] = "fs/res_upload/image/7f321712-4567-485f-bc7c-4b2d09b4354d.png";
		this.rawResources['rocket.png'] = "fs/res_upload/image/af846e3e-142f-4e82-825d-d95ab196eb8b.png";
		this.rawResources['smallbullet.png'] = "fs/res_upload/image/93b193d9-3939-48a0-bde0-e983d4df60cc.png";
		this.rawResources['meteor.png'] = "fs/res_upload/image/19b17164-f17c-4d14-b6f9-309986e823d8.png";
		this.rawResources['meteor2.png'] = "fs/res_upload/image/1ac64204-33ab-4658-a229-223ef9695c87.png";
		this.rawResources['panel.png'] = "fs/res_upload/image/e825ee7e-0a7f-417d-bce0-ab15f83e6895.png";
		this.rawResources['heart.png'] = "fs/res_upload/image/f9c94337-a6ac-4580-b8dc-41a3b80d84a5.png";
		this.rawResources['gameover.jpeg'] = "fs/res_upload/image/5d5f6894-ad08-49ee-a28a-de9d89356caf.jpeg";
		this.rawResources['youwin.jpg'] = "fs/res_upload/image/5df0a14f-62ee-49fb-a9d1-d97487a1ae3c.jpg";
		this.rawResources['explosion.png'] = "fs/res_upload/image/d47f1e63-761f-46c4-9353-22ddce5ab0d3.png";
		this.rawResources['explosion_atlas.json'] = "fs/res_upload/other/12d9b5bf-9881-4418-b481-af49c0000484.json";


		this.load.image('sky', 'fs/res_upload/image/543a1bf2-5735-4778-99fd-1ab26ec6373f.png');
		this.load.image('rocket', 'fs/res_upload/image/af846e3e-142f-4e82-825d-d95ab196eb8b.png');
		this.load.image('bullet', 'fs/res_upload/image/93b193d9-3939-48a0-bde0-e983d4df60cc.png');
		this.load.image('meteor', 'fs/res_upload/image/19b17164-f17c-4d14-b6f9-309986e823d8.png');
		this.load.image('panel', 'fs/res_upload/image/e825ee7e-0a7f-417d-bce0-ab15f83e6895.png');
		this.load.image('heart3', 'fs/res_upload/image/f9c94337-a6ac-4580-b8dc-41a3b80d84a5.png');
		this.load.image('heart2', 'fs/res_upload/image/f9c94337-a6ac-4580-b8dc-41a3b80d84a5.png');
		this.load.image('heart1', 'fs/res_upload/image/f9c94337-a6ac-4580-b8dc-41a3b80d84a5.png');


		this.levelData = {
    "objects": [
        {
            "_id": "6372aaa7b3861d1bc51ee400",
            "spriteResourceId": "",
            "type": "camera",
            "name": "Camera",
            "frame": {
                "x": 0,
                "y": 0,
                "w": 900,
                "h": 480
            },
            "rotation": 0,
            "physicsBehavior": "1",
            "physicsCollision": "2",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668460633059",
            "spriteResourceId": "6372b0355959633a814b9974",
            "type": "sprite",
            "name": "sky",
            "frame": {
                "x": 0,
                "y": 0,
                "w": 900,
                "h": 490.50000000000006
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668463725450",
            "spriteResourceId": "6372bc62ca0b53b40adfe7fe",
            "type": "sprite",
            "name": "rocket",
            "frame": {
                "x": 14,
                "y": 204,
                "w": 72,
                "h": 72
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668467889749",
            "spriteResourceId": "6372cca0ca0b53b40adfe800",
            "type": "sprite",
            "name": "bullet",
            "frame": {
                "x": 30,
                "y": 530,
                "w": 13,
                "h": 13
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668469415514",
            "spriteResourceId": "6372d29fca0b53b40adfe801",
            "type": "sprite",
            "name": "meteor",
            "frame": {
                "x": 58.0000000000001,
                "y": 524,
                "w": 66.6666666666666,
                "h": 33.3333333333333
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668476541664",
            "spriteResourceId": "6372ee74ca0b53b40adfe803",
            "type": "sprite",
            "name": "panel",
            "frame": {
                "x": 250,
                "y": 400,
                "w": 400,
                "h": 70
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668484865393",
            "spriteResourceId": "63730efaca0b53b40adfe804",
            "type": "sprite",
            "name": "heart3",
            "frame": {
                "x": 766,
                "y": 3,
                "w": 36,
                "h": 36
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668484900845",
            "spriteResourceId": "63730efaca0b53b40adfe804",
            "type": "sprite",
            "name": "heart2",
            "frame": {
                "x": 812,
                "y": 3,
                "w": 36,
                "h": 36
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668484939014",
            "spriteResourceId": "63730efaca0b53b40adfe804",
            "type": "sprite",
            "name": "heart1",
            "frame": {
                "x": 858,
                "y": 3,
                "w": 36,
                "h": 36
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        }
    ]
}


		this.levelProperties = {
    "Question": "Shoot all square numbers",
    "Points Required": 15,
    "Meteor Velocity": 130,
    "Asteroid Direction": "2",
    "Correct Answers": "1, 4, 9, 16, 25, 36, 49",
    "Wrong Answers": "0, 2, 6, 12, 18, 24, 27, 32"
}
	

        // Add your code below this line

        super.preload();
        
    }
    create(){
        let scaleX = 0, scaleY = 0;
		this.spriteReferences = {}
		// --- scene object sky ---
		const sprite_1 = this.add.sprite(450, 245.25000000000003, 'sky').setInteractive();
		sprite_1.name = "sky";
		scaleX = 900 / sprite_1.displayWidth;
		scaleY = 490.50000000000006 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences['sky'] = sprite_1;


		// --- scene object rocket ---
		const sprite_2 = this.add.sprite(50, 240, 'rocket').setInteractive();
		sprite_2.name = "rocket";
		scaleX = 72 / sprite_2.displayWidth;
		scaleY = 72 / sprite_2.displayHeight;
		sprite_2.setScale(scaleX, scaleY);
		this.spriteReferences['rocket'] = sprite_2;


		// --- scene object bullet ---
		const sprite_3 = this.add.sprite(36.5, 536.5, 'bullet').setInteractive();
		sprite_3.name = "bullet";
		scaleX = 13 / sprite_3.displayWidth;
		scaleY = 13 / sprite_3.displayHeight;
		sprite_3.setScale(scaleX, scaleY);
		this.spriteReferences['bullet'] = sprite_3;


		// --- scene object meteor ---
		const sprite_4 = this.add.sprite(91.3333333333334, 540.6666666666666, 'meteor').setInteractive();
		sprite_4.name = "meteor";
		scaleX = 66.6666666666666 / sprite_4.displayWidth;
		scaleY = 33.3333333333333 / sprite_4.displayHeight;
		sprite_4.setScale(scaleX, scaleY);
		this.spriteReferences['meteor'] = sprite_4;


		// --- scene object panel ---
		const sprite_5 = this.add.sprite(450, 435, 'panel').setInteractive();
		sprite_5.name = "panel";
		scaleX = 400 / sprite_5.displayWidth;
		scaleY = 70 / sprite_5.displayHeight;
		sprite_5.setScale(scaleX, scaleY);
		this.spriteReferences['panel'] = sprite_5;


		// --- scene object heart3 ---
		const sprite_6 = this.add.sprite(784, 21, 'heart3').setInteractive();
		sprite_6.name = "heart3";
		scaleX = 36 / sprite_6.displayWidth;
		scaleY = 36 / sprite_6.displayHeight;
		sprite_6.setScale(scaleX, scaleY);
		this.spriteReferences['heart3'] = sprite_6;


		// --- scene object heart2 ---
		const sprite_7 = this.add.sprite(830, 21, 'heart2').setInteractive();
		sprite_7.name = "heart2";
		scaleX = 36 / sprite_7.displayWidth;
		scaleY = 36 / sprite_7.displayHeight;
		sprite_7.setScale(scaleX, scaleY);
		this.spriteReferences['heart2'] = sprite_7;


		// --- scene object heart1 ---
		const sprite_8 = this.add.sprite(876, 21, 'heart1').setInteractive();
		sprite_8.name = "heart1";
		scaleX = 36 / sprite_8.displayWidth;
		scaleY = 36 / sprite_8.displayHeight;
		sprite_8.setScale(scaleX, scaleY);
		this.spriteReferences['heart1'] = sprite_8;


		const objects = this.levelData.objects;
		const camera = objects.find((o) => o.type == 'camera');
		console.log("Camera width & height", camera.frame.w, camera.frame.h);
		this.scale.setGameSize(camera.frame.w, camera.frame.h);
		this.scale.resize(camera.frame.w, camera.frame.h);
		this.cameras.main.setBounds(camera.frame.x, camera.frame.y, camera.frame.w, camera.frame.h)



        // Add your code below this line
        
        super.create();

    }
    update(){
        // EDGTOKEN_UPDATE

        // Add your code below this line

        super.update();

    }
    destroy(){
        // EDGTOKEN_DESTROY
        
        // Add your code below this line
        super.destroy();

    }

    moveToNextLevel(){
        /**
         * @type {Phaser.Scene}
         */
        const ref = this;
        ref.scene.start('LevelScene_Level3');
    }

}




// removed import

class LevelScene_Level3 extends CommonLevel{

    constructor(){
        super({key: "LevelScene_Level3", active: false });
    }

    preload(){
        this.load.setBaseURL('EDGTOKEN_LOADBASEURL');
        

		this.load.setBaseURL('http://localhost/');


		this.rawResources = {}
		this.rawResources['sky1.png'] = "fs/res_upload/image/543a1bf2-5735-4778-99fd-1ab26ec6373f.png";
		this.rawResources['titleplaceholder.png'] = "fs/res_upload/image/7f321712-4567-485f-bc7c-4b2d09b4354d.png";
		this.rawResources['rocket.png'] = "fs/res_upload/image/af846e3e-142f-4e82-825d-d95ab196eb8b.png";
		this.rawResources['smallbullet.png'] = "fs/res_upload/image/93b193d9-3939-48a0-bde0-e983d4df60cc.png";
		this.rawResources['meteor.png'] = "fs/res_upload/image/19b17164-f17c-4d14-b6f9-309986e823d8.png";
		this.rawResources['meteor2.png'] = "fs/res_upload/image/1ac64204-33ab-4658-a229-223ef9695c87.png";
		this.rawResources['panel.png'] = "fs/res_upload/image/e825ee7e-0a7f-417d-bce0-ab15f83e6895.png";
		this.rawResources['heart.png'] = "fs/res_upload/image/f9c94337-a6ac-4580-b8dc-41a3b80d84a5.png";
		this.rawResources['gameover.jpeg'] = "fs/res_upload/image/5d5f6894-ad08-49ee-a28a-de9d89356caf.jpeg";
		this.rawResources['youwin.jpg'] = "fs/res_upload/image/5df0a14f-62ee-49fb-a9d1-d97487a1ae3c.jpg";
		this.rawResources['explosion.png'] = "fs/res_upload/image/d47f1e63-761f-46c4-9353-22ddce5ab0d3.png";
		this.rawResources['explosion_atlas.json'] = "fs/res_upload/other/12d9b5bf-9881-4418-b481-af49c0000484.json";


		this.load.image('sky', 'fs/res_upload/image/543a1bf2-5735-4778-99fd-1ab26ec6373f.png');
		this.load.image('rocket', 'fs/res_upload/image/af846e3e-142f-4e82-825d-d95ab196eb8b.png');
		this.load.image('bullet', 'fs/res_upload/image/93b193d9-3939-48a0-bde0-e983d4df60cc.png');
		this.load.image('meteor', 'fs/res_upload/image/19b17164-f17c-4d14-b6f9-309986e823d8.png');
		this.load.image('panel', 'fs/res_upload/image/e825ee7e-0a7f-417d-bce0-ab15f83e6895.png');
		this.load.image('heart3', 'fs/res_upload/image/f9c94337-a6ac-4580-b8dc-41a3b80d84a5.png');
		this.load.image('heart2', 'fs/res_upload/image/f9c94337-a6ac-4580-b8dc-41a3b80d84a5.png');
		this.load.image('heart1', 'fs/res_upload/image/f9c94337-a6ac-4580-b8dc-41a3b80d84a5.png');


		this.levelData = {
    "objects": [
        {
            "_id": "6372aaa7b3861d1bc51ee400",
            "spriteResourceId": "",
            "type": "camera",
            "name": "Camera",
            "frame": {
                "x": 0,
                "y": 0,
                "w": 900,
                "h": 480
            },
            "rotation": 0,
            "physicsBehavior": "1",
            "physicsCollision": "2",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668460633059",
            "spriteResourceId": "6372b0355959633a814b9974",
            "type": "sprite",
            "name": "sky",
            "frame": {
                "x": 0,
                "y": 0,
                "w": 900,
                "h": 490.50000000000006
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668463725450",
            "spriteResourceId": "6372bc62ca0b53b40adfe7fe",
            "type": "sprite",
            "name": "rocket",
            "frame": {
                "x": 11,
                "y": 220,
                "w": 40,
                "h": 40
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668467889749",
            "spriteResourceId": "6372cca0ca0b53b40adfe800",
            "type": "sprite",
            "name": "bullet",
            "frame": {
                "x": 18.5,
                "y": 530,
                "w": 24.5,
                "h": 24.5
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668469415514",
            "spriteResourceId": "6372d29fca0b53b40adfe801",
            "type": "sprite",
            "name": "meteor",
            "frame": {
                "x": 58.00000000000007,
                "y": 524,
                "w": 53.33333333333328,
                "h": 26.666666666666643
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668476541664",
            "spriteResourceId": "6372ee74ca0b53b40adfe803",
            "type": "sprite",
            "name": "panel",
            "frame": {
                "x": 250,
                "y": 400,
                "w": 400,
                "h": 70
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668484865393",
            "spriteResourceId": "63730efaca0b53b40adfe804",
            "type": "sprite",
            "name": "heart3",
            "frame": {
                "x": 766,
                "y": 3,
                "w": 36,
                "h": 36
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668484900845",
            "spriteResourceId": "63730efaca0b53b40adfe804",
            "type": "sprite",
            "name": "heart2",
            "frame": {
                "x": 812,
                "y": 3,
                "w": 36,
                "h": 36
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668484939014",
            "spriteResourceId": "63730efaca0b53b40adfe804",
            "type": "sprite",
            "name": "heart1",
            "frame": {
                "x": 858,
                "y": 3,
                "w": 36,
                "h": 36
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        }
    ]
}


		this.levelProperties = {
    "Question": "Shoot all proper fractions",
    "Points Required": 20,
    "Meteor Velocity": 160,
    "Asteroid Direction": "3",
    "Correct Answers": "1/2, 1/4, 4/5, 10/20, 3/4, 2/8, 9/100, 4/6, 13/19, 23/2",
    "Wrong Answers": "2/2, 3/2, 10/9, 2 ½, ⅜, 4 ⅘, 24/14, 9/6, 2, 3/2"
}
	
        // EDGTOKEN_LEVEL
        // EDGTOKEN_PROPERTIES
        // EDGTOKEN_SETCAMERA

        // Add your code below this line
        super.preload();
        
    }
    create(){
        let scaleX = 0, scaleY = 0;
		this.spriteReferences = {}
		// --- scene object sky ---
		const sprite_1 = this.add.sprite(450, 245.25000000000003, 'sky').setInteractive();
		sprite_1.name = "sky";
		scaleX = 900 / sprite_1.displayWidth;
		scaleY = 490.50000000000006 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences['sky'] = sprite_1;


		// --- scene object rocket ---
		const sprite_2 = this.add.sprite(31, 240, 'rocket').setInteractive();
		sprite_2.name = "rocket";
		scaleX = 40 / sprite_2.displayWidth;
		scaleY = 40 / sprite_2.displayHeight;
		sprite_2.setScale(scaleX, scaleY);
		this.spriteReferences['rocket'] = sprite_2;


		// --- scene object bullet ---
		const sprite_3 = this.add.sprite(30.75, 542.25, 'bullet').setInteractive();
		sprite_3.name = "bullet";
		scaleX = 24.5 / sprite_3.displayWidth;
		scaleY = 24.5 / sprite_3.displayHeight;
		sprite_3.setScale(scaleX, scaleY);
		this.spriteReferences['bullet'] = sprite_3;


		// --- scene object meteor ---
		const sprite_4 = this.add.sprite(84.66666666666671, 537.3333333333334, 'meteor').setInteractive();
		sprite_4.name = "meteor";
		scaleX = 53.33333333333328 / sprite_4.displayWidth;
		scaleY = 26.666666666666643 / sprite_4.displayHeight;
		sprite_4.setScale(scaleX, scaleY);
		this.spriteReferences['meteor'] = sprite_4;


		// --- scene object panel ---
		const sprite_5 = this.add.sprite(450, 435, 'panel').setInteractive();
		sprite_5.name = "panel";
		scaleX = 400 / sprite_5.displayWidth;
		scaleY = 70 / sprite_5.displayHeight;
		sprite_5.setScale(scaleX, scaleY);
		this.spriteReferences['panel'] = sprite_5;


		// --- scene object heart3 ---
		const sprite_6 = this.add.sprite(784, 21, 'heart3').setInteractive();
		sprite_6.name = "heart3";
		scaleX = 36 / sprite_6.displayWidth;
		scaleY = 36 / sprite_6.displayHeight;
		sprite_6.setScale(scaleX, scaleY);
		this.spriteReferences['heart3'] = sprite_6;


		// --- scene object heart2 ---
		const sprite_7 = this.add.sprite(830, 21, 'heart2').setInteractive();
		sprite_7.name = "heart2";
		scaleX = 36 / sprite_7.displayWidth;
		scaleY = 36 / sprite_7.displayHeight;
		sprite_7.setScale(scaleX, scaleY);
		this.spriteReferences['heart2'] = sprite_7;


		// --- scene object heart1 ---
		const sprite_8 = this.add.sprite(876, 21, 'heart1').setInteractive();
		sprite_8.name = "heart1";
		scaleX = 36 / sprite_8.displayWidth;
		scaleY = 36 / sprite_8.displayHeight;
		sprite_8.setScale(scaleX, scaleY);
		this.spriteReferences['heart1'] = sprite_8;


		const objects = this.levelData.objects;
		const camera = objects.find((o) => o.type == 'camera');
		console.log("Camera width & height", camera.frame.w, camera.frame.h);
		this.scale.setGameSize(camera.frame.w, camera.frame.h);
		this.scale.resize(camera.frame.w, camera.frame.h);
		this.cameras.main.setBounds(camera.frame.x, camera.frame.y, camera.frame.w, camera.frame.h)



        // Add your code below this line
        super.create();

    }
    update(){

        // Add your code below this line
        super.update();

    }
    destroy(){
        
        // Add your code below this line
        super.destroy();

    }

    moveToNextLevel(){
        /**
         * @type {Phaser.Scene}
         */
        const ref = this;
        ref.scene.start('LevelScene_Win');
    }

}

// removed import

class LevelScene_Win extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_Win", active: false });

        /**
         * @type {Phaser.GameObjects.Sprite}
         */
        this.exitButton;

        /**
         * All sprites loaded in the create() method
         * @type {{ [key: string] : Phaser.GameObjects.Sprite }}
         */
        this.spriteReferences = {};
        /**
         * The entire scene object (contains the raw game objects in the 'objects' array)
         * @type {Array}
         */
        this.levelData = null;
        /**
         * Properties loaded from the Property Editor
         * @type {Object.<string, any>}
         */
        this.levelProperties = null;
    }

    preload(){
        this.load.setBaseURL('EDGTOKEN_LOADBASEURL');
        

		this.load.setBaseURL('http://localhost/');


		this.rawResources = {}
		this.rawResources['sky1.png'] = "fs/res_upload/image/543a1bf2-5735-4778-99fd-1ab26ec6373f.png";
		this.rawResources['titleplaceholder.png'] = "fs/res_upload/image/7f321712-4567-485f-bc7c-4b2d09b4354d.png";
		this.rawResources['rocket.png'] = "fs/res_upload/image/af846e3e-142f-4e82-825d-d95ab196eb8b.png";
		this.rawResources['smallbullet.png'] = "fs/res_upload/image/93b193d9-3939-48a0-bde0-e983d4df60cc.png";
		this.rawResources['meteor.png'] = "fs/res_upload/image/19b17164-f17c-4d14-b6f9-309986e823d8.png";
		this.rawResources['meteor2.png'] = "fs/res_upload/image/1ac64204-33ab-4658-a229-223ef9695c87.png";
		this.rawResources['panel.png'] = "fs/res_upload/image/e825ee7e-0a7f-417d-bce0-ab15f83e6895.png";
		this.rawResources['heart.png'] = "fs/res_upload/image/f9c94337-a6ac-4580-b8dc-41a3b80d84a5.png";
		this.rawResources['gameover.jpeg'] = "fs/res_upload/image/5d5f6894-ad08-49ee-a28a-de9d89356caf.jpeg";
		this.rawResources['youwin.jpg'] = "fs/res_upload/image/5df0a14f-62ee-49fb-a9d1-d97487a1ae3c.jpg";
		this.rawResources['explosion.png'] = "fs/res_upload/image/d47f1e63-761f-46c4-9353-22ddce5ab0d3.png";
		this.rawResources['explosion_atlas.json'] = "fs/res_upload/other/12d9b5bf-9881-4418-b481-af49c0000484.json";


		this.load.image('sky', 'fs/res_upload/image/543a1bf2-5735-4778-99fd-1ab26ec6373f.png');
		this.load.image('youwin', 'fs/res_upload/image/5df0a14f-62ee-49fb-a9d1-d97487a1ae3c.jpg');


		this.levelData = {
    "objects": [
        {
            "_id": "6372aaa7b3861d1bc51ee400",
            "spriteResourceId": "",
            "type": "camera",
            "name": "Camera",
            "frame": {
                "x": 0,
                "y": 0,
                "w": 900,
                "h": 480
            },
            "rotation": 0,
            "physicsBehavior": "1",
            "physicsCollision": "2",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668460633059",
            "spriteResourceId": "6372b0355959633a814b9974",
            "type": "sprite",
            "name": "sky",
            "frame": {
                "x": 0,
                "y": 0,
                "w": 900,
                "h": 490.50000000000006
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1669310456789",
            "spriteResourceId": "637fa7f0b57a466919d159c4",
            "type": "sprite",
            "name": "youwin",
            "frame": {
                "x": 184,
                "y": 76,
                "w": 521.8039772727273,
                "h": 253.1960227272727
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        }
    ]
}


		this.levelProperties = {
    "Question": "Shot all prime numbers",
    "Points Required": 10,
    "Correct Answers": "1, 3, 5, 7, 11, 13, 17",
    "Wrong Answers": "0, -1, 2, 4, 6, 9, 12, 14"
}
	
        // EDGTOKEN_LEVEL
        // EDGTOKEN_PROPERTIES
        // EDGTOKEN_SETCAMERA

        // Add your code below this line
        
    }
    create(){
        let scaleX = 0, scaleY = 0;
		this.spriteReferences = {}
		// --- scene object sky ---
		const sprite_1 = this.add.sprite(450, 245.25000000000003, 'sky').setInteractive();
		sprite_1.name = "sky";
		scaleX = 900 / sprite_1.displayWidth;
		scaleY = 490.50000000000006 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences['sky'] = sprite_1;


		// --- scene object youwin ---
		const sprite_2 = this.add.sprite(444.9019886363636, 202.59801136363635, 'youwin').setInteractive();
		sprite_2.name = "youwin";
		scaleX = 521.8039772727273 / sprite_2.displayWidth;
		scaleY = 253.1960227272727 / sprite_2.displayHeight;
		sprite_2.setScale(scaleX, scaleY);
		this.spriteReferences['youwin'] = sprite_2;


		const objects = this.levelData.objects;
		const camera = objects.find((o) => o.type == 'camera');
		console.log("Camera width & height", camera.frame.w, camera.frame.h);
		this.scale.setGameSize(camera.frame.w, camera.frame.h);
		this.scale.resize(camera.frame.w, camera.frame.h);
		this.cameras.main.setBounds(camera.frame.x, camera.frame.y, camera.frame.w, camera.frame.h)



        // Add your code below this line

        const x = this.cameras.main.displayWidth * 0.5;
        const y = this.cameras.main.displayHeight * 0.67;
        this.exitButton = this.add.text(x, y, 'Click to Finish', {
            fontFamily: 'Arial',
            fontSize: '25px',
            color: '#FFFFFF'
        });
        this.exitButton.setOrigin(0.5, 0.5);
        this.exitButton.setInteractive();
        this.exitButton.on('pointerup', () => {
            EdgeProxy.notifyGameCompleted('Congratulations on finishing the game!');
        });
    }
    update(){

        // Add your code below this line

    }
    destroy(){
        
        // Add your code below this line

    }
}




// removed import

class LevelScene_Game_Over_Screen extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_Game_Over_Screen", active: false });

        /**
         * All sprites loaded in the create() method
         * @type {{ [key: string] : Phaser.GameObjects.Sprite }}
         */
        this.spriteReferences = {};
        /**
         * The entire scene object (contains the raw game objects in the 'objects' array)
         * @type {Array}
         */
        this.levelData = null;
        /**
         * Properties loaded from the Property Editor
         * @type {Object.<string, any>}
         */
        this.levelProperties = null;

    }

    preload(){
        this.load.setBaseURL('EDGTOKEN_LOADBASEURL');
        

		this.load.setBaseURL('http://localhost/');


		this.rawResources = {}
		this.rawResources['sky1.png'] = "fs/res_upload/image/543a1bf2-5735-4778-99fd-1ab26ec6373f.png";
		this.rawResources['titleplaceholder.png'] = "fs/res_upload/image/7f321712-4567-485f-bc7c-4b2d09b4354d.png";
		this.rawResources['rocket.png'] = "fs/res_upload/image/af846e3e-142f-4e82-825d-d95ab196eb8b.png";
		this.rawResources['smallbullet.png'] = "fs/res_upload/image/93b193d9-3939-48a0-bde0-e983d4df60cc.png";
		this.rawResources['meteor.png'] = "fs/res_upload/image/19b17164-f17c-4d14-b6f9-309986e823d8.png";
		this.rawResources['meteor2.png'] = "fs/res_upload/image/1ac64204-33ab-4658-a229-223ef9695c87.png";
		this.rawResources['panel.png'] = "fs/res_upload/image/e825ee7e-0a7f-417d-bce0-ab15f83e6895.png";
		this.rawResources['heart.png'] = "fs/res_upload/image/f9c94337-a6ac-4580-b8dc-41a3b80d84a5.png";
		this.rawResources['gameover.jpeg'] = "fs/res_upload/image/5d5f6894-ad08-49ee-a28a-de9d89356caf.jpeg";
		this.rawResources['youwin.jpg'] = "fs/res_upload/image/5df0a14f-62ee-49fb-a9d1-d97487a1ae3c.jpg";
		this.rawResources['explosion.png'] = "fs/res_upload/image/d47f1e63-761f-46c4-9353-22ddce5ab0d3.png";
		this.rawResources['explosion_atlas.json'] = "fs/res_upload/other/12d9b5bf-9881-4418-b481-af49c0000484.json";


		this.load.image('sky', 'fs/res_upload/image/543a1bf2-5735-4778-99fd-1ab26ec6373f.png');
		this.load.image('gameover_jpeg', 'fs/res_upload/image/5d5f6894-ad08-49ee-a28a-de9d89356caf.jpeg');


		this.levelData = {
    "objects": [
        {
            "_id": "6372aaa7b3861d1bc51ee400",
            "spriteResourceId": "",
            "type": "camera",
            "name": "Camera",
            "frame": {
                "x": 0,
                "y": 0,
                "w": 900,
                "h": 480
            },
            "rotation": 0,
            "physicsBehavior": "1",
            "physicsCollision": "2",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1668485850295",
            "spriteResourceId": "6372b0355959633a814b9974",
            "type": "sprite",
            "name": "sky",
            "frame": {
                "x": 0,
                "y": 0,
                "w": 905,
                "h": 519
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1669309007366",
            "spriteResourceId": "637fa243b57a466919d159c3",
            "type": "sprite",
            "name": "gameover_jpeg",
            "frame": {
                "x": 250,
                "y": 62,
                "w": 400,
                "h": 260
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        }
    ]
}


		this.levelProperties = {}
	
        // EDGTOKEN_LEVEL
        // EDGTOKEN_PROPERTIES
        // EDGTOKEN_SETCAMERA

        // Add your code below this line


        
    }
    create(){
        let scaleX = 0, scaleY = 0;
		this.spriteReferences = {}
		// --- scene object sky ---
		const sprite_1 = this.add.sprite(452.5, 259.5, 'sky').setInteractive();
		sprite_1.name = "sky";
		scaleX = 905 / sprite_1.displayWidth;
		scaleY = 519 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences['sky'] = sprite_1;


		// --- scene object gameover_jpeg ---
		const sprite_2 = this.add.sprite(450, 192, 'gameover_jpeg').setInteractive();
		sprite_2.name = "gameover_jpeg";
		scaleX = 400 / sprite_2.displayWidth;
		scaleY = 260 / sprite_2.displayHeight;
		sprite_2.setScale(scaleX, scaleY);
		this.spriteReferences['gameover_jpeg'] = sprite_2;


		const objects = this.levelData.objects;
		const camera = objects.find((o) => o.type == 'camera');
		console.log("Camera width & height", camera.frame.w, camera.frame.h);
		this.scale.setGameSize(camera.frame.w, camera.frame.h);
		this.scale.resize(camera.frame.w, camera.frame.h);
		this.cameras.main.setBounds(camera.frame.x, camera.frame.y, camera.frame.w, camera.frame.h)



        // Add your code below this line

        const cam = this.cameras.main;
        const mainMenuButton = this.add.text(
            cam.centerX, 
            cam.centerY + gameOverText.displayHeight + 20,
            'Go to Main Menu',
            {
                fontSize: '13px',
                fontFamily: 'Arial',
                backgroundColor: '#FFA500',
            }
        ).setOrigin(0.5, 0.5)
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start(LevelScene_Title_Screen);
        });
    }
    update(){

        // Add your code below this line

    }
    destroy(){
        
        // Add your code below this line

    }
}

const scenes = [LevelScene_Title_Screen, LevelScene_DataLevel, LevelScene_Level1, LevelScene_Level2, LevelScene_Level3, LevelScene_Win, LevelScene_Game_Over_Screen];
const gameZoom = 1.0;

/**
 * Remove all elements inside the canvas container
 */
document.getElementById(canvasName).replaceChildren([]);

/**
 * @type {Phaser.Core.Config}
 */
const config = {
    type: Phaser.WEBGL,
    parent: canvasName,
    width: 1366,
    height: 500,
    title: 'Shock and Awesome',
    // backgroundColor: "#FFFFFF",
    backgroundColor: "#000000",
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    scaleMode: Phaser.Scale.NONE,
    zoom: gameZoom,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
};


/**
 * @type Phaser.Scene
 */
const edgeGame = new Phaser.Game(config);
scenes.forEach((scn, index) => {
    edgeGame.scene.add('scene', scn, index == 0, null);
});

// edgeGame.scene.add('scene', startingScene, true, null);
// edgeGame.scene.scenes = scenes;

/**
 * Proxying methods
 * 
 * EdgeProxy is defined in singleplayer.lib.js
 */
// window.EdgeProxy.unloadGame = function(){
//     console.log("EdgeProxy manual destroy invoked");
//     edgeGame.destroy();
// }

// window.addEventListener('resize', () => {
//     // const parent
//     // edgeGame.scale.setZoom
// });