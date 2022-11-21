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

        /**
         * @type {Phaser.GameObjects.Text}
         */
        this.startButton = null;
    }

    preload(){
        this.load.setBaseURL('http://localhost');
        

		this.load.image('sky', 'fs/res_upload/image/1668460597818.png');
		this.load.image('title', 'fs/res_upload/image/1668460874540.png');
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
        this.levelProperties = {
    "Question": "Shoot all proper fractions",
    "Points Required": 10,
    "Correct Answers": "1",
    "Incorrect Answers": "1"
}
        		const objects = this.levelData.objects;
		const camera = objects.find((o) => o.type == 'camera');
		console.log("Camera width & height", camera.frame.w, camera.frame.h);
		this.scale.setGameSize(camera.frame.w, camera.frame.h);
		this.scale.resize(camera.frame.w, camera.frame.h);
		this.cameras.main.setBounds(camera.frame.x, camera.frame.y, camera.frame.w, camera.frame.h)

        // Add your code below this line


        
    }
    create(){
        let scaleX = 0, scaleY = 0;
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



        // Add your code below this line

        this.setupStartButton();
        
    }
    update(){

        // Add your code below this line

    }
    destroy(){
        
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

class LevelScene_Level1 extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_Level1", active: false });

        this.objective1 = '5 points in 12 seconds';
        this.guidance1 = 'No points for 10 seconds';
        this.guidance2 = 'No points for 30 seconds';

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
         * Correct answer array
         * @type {string[]}
         */
        this.correctAnswers = [];

        /**
         * Wrong answer array
         * @type {string[]}
         */
        this.wrongAnswers = [];
    }

    preload(){
        this.load.setBaseURL('http://localhost');
        

		this.load.image('sky', 'fs/res_upload/image/1668460597818.png');
		this.load.image('rocket', 'fs/res_upload/image/1668463714205.png');
		this.load.image('bullet', 'fs/res_upload/image/1668467872107.png');
		this.load.image('meteor', 'fs/res_upload/image/1668469407970.png');
		this.load.image('panel', 'fs/res_upload/image/1668476532633.png');
		this.load.image('heart3', 'fs/res_upload/image/1668484858175.png');
		this.load.image('heart2', 'fs/res_upload/image/1668484858175.png');
		this.load.image('heart1', 'fs/res_upload/image/1668484858175.png');
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
                "y": 0,
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
                "x": 58,
                "y": 524,
                "w": 150,
                "h": 75
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
    "Question": "Shoot all vegetables",
    "Points Required": 10,
    "Correct Answers": "Tomato, Carrot",
    "Wrong Answers": "Mango, Apple"
}
        		const objects = this.levelData.objects;
		const camera = objects.find((o) => o.type == 'camera');
		console.log("Camera width & height", camera.frame.w, camera.frame.h);
		this.scale.setGameSize(camera.frame.w, camera.frame.h);
		this.scale.resize(camera.frame.w, camera.frame.h);
		this.cameras.main.setBounds(camera.frame.x, camera.frame.y, camera.frame.w, camera.frame.h)

        // Add your code below this line
        
    }
    create(){
        let scaleX = 0, scaleY = 0;
		// --- scene object sky ---
		const sprite_1 = this.add.sprite(450, 245.25000000000003, 'sky').setInteractive();
		sprite_1.name = "sky";
		scaleX = 900 / sprite_1.displayWidth;
		scaleY = 490.50000000000006 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences['sky'] = sprite_1;


		// --- scene object rocket ---
		const sprite_2 = this.add.sprite(50, 50, 'rocket').setInteractive();
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
		const sprite_4 = this.add.sprite(133, 561.5, 'meteor').setInteractive();
		sprite_4.name = "meteor";
		scaleX = 150 / sprite_4.displayWidth;
		scaleY = 75 / sprite_4.displayHeight;
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



        // Add your code below this line

        this.setup();
        this.setupBulletAndMeteorCollision();
        this.setupRocketAndMeteorCollision();
        this.setupMeteorTimer();
        this.listenToSpaceBar();
        this.readProperties();
        this.showPrompt();
        this.updatePoints(0);
        this.setupGuidanceTriggers();

        // Test Meteor Text Container - works!
        // this.meteor1 = new MeteorTextContainer(this);
        // this.meteor1.setPosition(200, 50);
        // this.add.existing(this.meteor1);

        

    }
    update(){

        // Add your code below this line

        this.handleRocketMovement();
        this.handleRocketBullets();

    }
    destroy(){
        
        // Add your code below this line

    }

    /**
     * Sets up object references
     */
    setup(){
        this.rocket = this.spriteReferences['rocket'];
        this.cursors = this.input.keyboard.createCursorKeys();
        this.bullets = new RocketBulletsGroup(this);
        this.meteors = new MeteorGroup(this);
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
        this.bullets.fireBullet(rocket.x, rocket.y);
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

        const panelHeight = this.spriteReferences['panel'].displayHeight;
        const meteorHeight = this.spriteReferences['meteor'].displayHeight;
        const topOffset = 30;
        const meteorY = topOffset + (this.cameras.main.height - panelHeight - meteorHeight - topOffset) * Math.random();
        this.meteors.addMeteor(this.cameras.main.width, meteorY, isCorrectAnswer, value);
    }

    readProperties(){
        this.question = this.levelProperties['Question'];
        this.requiredPoints = this.levelProperties['Points Required'];
        this.correctAnswers = this.splitCSV(this.levelProperties['Correct Answers']);
        this.wrongAnswers = this.splitCSV(this.levelProperties['Wrong Answers']);
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
        let panel = this.spriteReferences['panel'];
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
        }

        const text = `Score: ${this.points}`;

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
        const h1 = this.spriteReferences['heart1'];
        const h2 = this.spriteReferences['heart2'];
        const h3 = this.spriteReferences['heart3'];

        h1.setVisible(newLives > 0);
        h2.setVisible(newLives > 1);
        h3.setVisible(newLives > 2);

        if (this.lives < 1){
            // Game Over
            this.scene.start(LevelScene_Game_Over_Screen);
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
}

/**
 * Represents 1 bullet.
 * Defined in level1, available on subsequent levels.
 */
class RocketBullet extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        // All levels must have a bullet object.
        // Same as out of camera bounds object. 
        let textureName = 'bullet'; 
        super(scene, x, y, textureName);
        this.setName('bullet');
    }

    fire (x, y)
    {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityX(430);
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
class RocketBulletsGroup extends Phaser.Physics.Arcade.Group
{
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

    fireBullet (x, y)
    {
        let bullet = this.getFirstDead(true);
        if (bullet)
            bullet.fire(x, y);
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
        this.setSize(this.meteor.displayWidth, this.meteor.displayHeight);
    }

    /**
     * Add a meteor to the scene
     * @param {number} x Origin X
     * @param {number} y Origin Y
     * @param {boolean} correct Does the meteor represent correct or incorrect state?
     * @param {string} textStr The answer visible on the meteor
     */
    queue(x, y, correct, textStr){
        this.text.text = textStr;
        this.isCorrect = correct;
        this.setPosition(x, y);

        // Enable physics for this container
        this.scene.physics.world.enableBody(this);
        this.body.setVelocityX(-100);
    }

}

/**
 * Represents all meteors.
 * Defined in level1, available on subsequent levels.
 */
class MeteorGroup extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);
    }

    /**
     * Add a meteor to the scene
     * @param {number} x Origin X
     * @param {number} y Origin Y
     * @param {boolean} correct Does the meteor represent correct or incorrect state?
     * @param {string} text The answer visible on the meteor
     */
    addMeteor (x, y, correct, text)
    {
        const meteor = new MeteorTextContainer(this.scene);
        this.add(meteor)
        this.scene.add.existing(meteor);
        meteor.queue(x, y, correct, text);
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
        this.load.setBaseURL('http://localhost');
        

		this.load.image('sky__png', 'fs/res_upload/image/1668460597818.png');
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
            "name": "sky__png",
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
        }
    ]
}
        this.levelProperties = {}
        		const objects = this.levelData.objects;
		const camera = objects.find((o) => o.type == 'camera');
		console.log("Camera width & height", camera.frame.w, camera.frame.h);
		this.scale.setGameSize(camera.frame.w, camera.frame.h);
		this.scale.resize(camera.frame.w, camera.frame.h);
		this.cameras.main.setBounds(camera.frame.x, camera.frame.y, camera.frame.w, camera.frame.h)

        // Add your code below this line


        
    }
    create(){
        let scaleX = 0, scaleY = 0;
		// --- scene object sky__png ---
		const sprite_1 = this.add.sprite(452.5, 259.5, 'sky__png').setInteractive();
		sprite_1.name = "sky__png";
		scaleX = 905 / sprite_1.displayWidth;
		scaleY = 519 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences['sky__png'] = sprite_1;



        // Add your code below this line

        const cam = this.cameras.main;
        const gameOverText = this.add.text(
            cam.centerX, 
            cam.centerY,
            'Game Over!',
            {
                fontSize: '20px',
                fontFamily: 'Arial',
            }
        ).setOrigin(0.5, 0.5);

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

const scenes = [LevelScene_Title_Screen, LevelScene_Level1, LevelScene_Game_Over_Screen];
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
        target: 30,
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