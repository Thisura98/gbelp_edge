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
        if (window.InternalsFromAngular._on_updateObjective != null)
            window.InternalsFromAngular._on_updateObjective(name, points);
        else
            console.log("Edge Internal implementation for _on_updateObjective missing");
    },
    /**
     * Increase hitpoints for a guidance tracker
     * @param {string} name The 'name' of the guidance tracker. Case insensitive.
     * @param {number} points Number of points to add to the objective.
     */
    increaseGuidanceProgress: function(name, points){
        if (window.InternalsFromAngular._on_updateGuidance != null)
            window.InternalsFromAngular._on_updateGuidance(name, points);
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
        if (window.InternalsFromAngular._on_gameCompleted != null)
            window.InternalsFromAngular._on_gameCompleted(message, data);
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
		this.rawResources['sky1.png'] = "fs/res_upload/image/5f6c7f06-de68-4daa-a9e5-17b7d609b277.png";
		this.rawResources['titleplaceholder.png'] = "fs/res_upload/image/a4f08ca1-c52e-4b4c-9e0a-56165c5920e1.png";
		this.rawResources['rocket.png'] = "fs/res_upload/image/16233c5d-55d0-471c-87d8-ac62ad4c05a6.png";
		this.rawResources['smallbullet.png'] = "fs/res_upload/image/2b27ea04-7f29-45eb-8af4-6ac536f85592.png";
		this.rawResources['meteor.png'] = "fs/res_upload/image/362129c5-d0d4-4c2c-8715-db0c1d2740fd.png";
		this.rawResources['meteor2.png'] = "fs/res_upload/image/f02ca90a-4506-405b-b981-066aee394d81.png";
		this.rawResources['panel.png'] = "fs/res_upload/image/27f00367-3767-4e83-ad54-bed4ee874122.png";
		this.rawResources['heart.png'] = "fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png";
		this.rawResources['gameover.jpeg'] = "fs/res_upload/image/92986bcf-c632-4b92-94b3-d927a9ec53d4.jpeg";
		this.rawResources['youwin.jpg'] = "fs/res_upload/image/cc004623-8d79-42e9-a3b3-f694acd95b4d.jpg";
		this.rawResources['explosion.png'] = "fs/res_upload/image/57d09cc0-0154-4f71-8303-24de6168db05.png";
		this.rawResources['explosion_atlas.json'] = "fs/res_upload/other/d76c80ad-d43f-4d85-9162-3139ce88830f.json";
		this.rawResources['sky2.png'] = "fs/res_upload/image/909d1634-5698-4c40-92d3-52fa58d0e421.png";
		this.rawResources['sky3.png'] = "fs/res_upload/image/16a1c8a0-2f13-4fd7-aae9-7cc04ada872f.png";
		this.rawResources['sky4.png'] = "fs/res_upload/image/37306a9b-0f11-44b6-a7ca-eebe8f2d8f2b.png";
		this.rawResources['sky5.png'] = "fs/res_upload/image/55377bb2-f9e7-45e2-bbe6-ba40d120a37f.png";
		this.rawResources['starcluster1.png'] = "fs/res_upload/image/58e67e0f-6ab0-4588-ba89-15d3eba5e0a7.png";
		this.rawResources['starcluster2.png'] = "fs/res_upload/image/0d6cfdfc-d869-427c-a0eb-d19b1bee99cd.png";


		this.load.image('sky', 'fs/res_upload/image/5f6c7f06-de68-4daa-a9e5-17b7d609b277.png');
		this.load.image('title', 'fs/res_upload/image/a4f08ca1-c52e-4b4c-9e0a-56165c5920e1.png');


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
    "First Level": "LevelScene_Level1"
}
	

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
        const firstLevelName = EdgeProxy.getLevelProperty(this, 'First Level');

        this.startButton = this.add.text(0, 0, 'Start', {
            fontSize: '30px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        })
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start(firstLevelName);
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

let objective_globals = {
    didObtain5Points20Seconds: false
};

class DirectionHelper{
    /**
     * @param {number} direction the parsed asteroid direction
     * @returns {{dx: number, dy: number}} Directional components that can be multiplied by source values
     */
    static getComponents(direction){
        let dx = 1;
        let dy = 1;

        /**
         * 1 = Right
         * 2 = Down
         * 3 = Left
         * 4 = Top
         */
        if (direction == 1){
            dx = -1;
            dy = 0;
        }
        if (direction == 2){
            dx = 0;
            dy = -1;
        }
        else if (direction == 3){
            dx = 1;
            dy = 0;
        }
        else if (direction == 4){
            dx = 0;
            dy = 1;
        }

        return { dx: dx, dy: dy };
    }

}

class LevelScene_DataLevel extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_DataLevel", active: false });
    }

    preload(){
        

		this.load.setBaseURL('http://localhost/');


		this.rawResources = {}
		this.rawResources['sky1.png'] = "fs/res_upload/image/5f6c7f06-de68-4daa-a9e5-17b7d609b277.png";
		this.rawResources['titleplaceholder.png'] = "fs/res_upload/image/a4f08ca1-c52e-4b4c-9e0a-56165c5920e1.png";
		this.rawResources['rocket.png'] = "fs/res_upload/image/16233c5d-55d0-471c-87d8-ac62ad4c05a6.png";
		this.rawResources['smallbullet.png'] = "fs/res_upload/image/2b27ea04-7f29-45eb-8af4-6ac536f85592.png";
		this.rawResources['meteor.png'] = "fs/res_upload/image/362129c5-d0d4-4c2c-8715-db0c1d2740fd.png";
		this.rawResources['meteor2.png'] = "fs/res_upload/image/f02ca90a-4506-405b-b981-066aee394d81.png";
		this.rawResources['panel.png'] = "fs/res_upload/image/27f00367-3767-4e83-ad54-bed4ee874122.png";
		this.rawResources['heart.png'] = "fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png";
		this.rawResources['gameover.jpeg'] = "fs/res_upload/image/92986bcf-c632-4b92-94b3-d927a9ec53d4.jpeg";
		this.rawResources['youwin.jpg'] = "fs/res_upload/image/cc004623-8d79-42e9-a3b3-f694acd95b4d.jpg";
		this.rawResources['explosion.png'] = "fs/res_upload/image/57d09cc0-0154-4f71-8303-24de6168db05.png";
		this.rawResources['explosion_atlas.json'] = "fs/res_upload/other/d76c80ad-d43f-4d85-9162-3139ce88830f.json";
		this.rawResources['sky2.png'] = "fs/res_upload/image/909d1634-5698-4c40-92d3-52fa58d0e421.png";
		this.rawResources['sky3.png'] = "fs/res_upload/image/16a1c8a0-2f13-4fd7-aae9-7cc04ada872f.png";
		this.rawResources['sky4.png'] = "fs/res_upload/image/37306a9b-0f11-44b6-a7ca-eebe8f2d8f2b.png";
		this.rawResources['sky5.png'] = "fs/res_upload/image/55377bb2-f9e7-45e2-bbe6-ba40d120a37f.png";
		this.rawResources['starcluster1.png'] = "fs/res_upload/image/58e67e0f-6ab0-4588-ba89-15d3eba5e0a7.png";
		this.rawResources['starcluster2.png'] = "fs/res_upload/image/0d6cfdfc-d869-427c-a0eb-d19b1bee99cd.png";




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

    constructor(scene, fontSize){
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

        this.fontSize = fontSize;

        this.setup();
    }

    setup(){
        this.meteor = this.scene.add.sprite(0, 0, 'meteor');

        /**
         * @type {Phaser.Types.GameObjects.Text.TextStyle}
         */
        const textStyle = {
            fontFamily: 'Arial',
            fontSize: `${this.fontSize}px`,
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
     * @param {number} fontSize
     */
    addMeteor (x, y, velocityX, velocityY, correct, text, fontSize)
    {
        const meteor = new MeteorTextContainer(this.scene, fontSize);
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

        this.kObj5Points20Seconds = '5 points in 20 seconds';
        this.kObjCompleteLvl1 = 'Complete Lvl 1';
        this.kObjCompleteLvl2 = 'Complete Lvl 2';
        this.kObjCompleteLvl3 = 'Complete Lvl 3';
        this.kObjCompleteLvl4 = 'Complete Lvl 4';
        this.kObjCompleteLvl5 = 'Complete Lvl 5';

        this.kGuiNoPoints1Minute = 'Had no points for 1 minute';
        this.kGuiNoPoints2Minutes = 'Had no points for 2 minutes';
        this.kGui5WrongAnswers = '5 Wrong Answers';
        this.kGui10WrongAnswers = '10 Wrong Answers';
        this.kGui15WrongAnswers = '15 Wrong Answers';

        /**
         * Veloctiy of the rocket.
         * @type {number}
         */
        this.rocketVelocity = 8;

        /**
         * @type {Phaser.GameObjects.Sprite}
         */
        this.rocket = null;

        /**
         * @type {Phaser.GameObjects.TileSprite}
         */
        this.starCluster1 = null;

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
         * Answer font size
         * 
         * @type {number}
         */
        this.answerFontSize = 16;

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
        this.preloadExplosionAtlas();
        this.createStarCluster();
    }

    create(){
        const meteor = EdgeProxy.getLevelSprite(this, 'meteor');
        meteor_globals.scaleX = meteor.scaleX;
        meteor_globals.scaleY = meteor.scaleY;

        this.readProperties();
        this.setup();
        this.listenToSpaceBar();
        this.showPrompt();
        this.updatePoints(0);

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
        if (this.cameras.main == undefined){
            return;
        }

        this.handleRocketMovement();
        this.handleRocketBullets();
    }

    destroy(){
        
    }

    createStarCluster(){
        const res = 'starcluster1.png';
        const path = EdgeProxy.getLevelRawResourcePath(this, res);
        this.kTextureStarCluster = 'star-cluster';
        console.log('Load Star Cluster', path);
        this.load.image(this.kTextureStarCluster, path);
    }

    preloadExplosionAtlas(){
        const resSheet = 'explosion.png';
        const resAtlast = 'explosion_atlas.json';
        const fileSheet = EdgeProxy.getLevelRawResourcePath(this, resSheet);
        const fileAtlas = EdgeProxy.getLevelRawResourcePath(this, resAtlast);
        this.kAtlasExplosion = 'atlas-explosion';
        this.load.atlas(this.kAtlasExplosion, fileSheet, fileAtlas);
    }

    /**
     * Sets up object references
     */
    setup(){
        this.rocket = EdgeProxy.getLevelSprite(this, 'rocket');
        this.cursors = this.input.keyboard.createCursorKeys();
        this.bullets = new RocketBulletsGroup(this);
        this.meteors = new MeteorGroup(this);

        this.setupGuidanceTriggers();
        this.setupObjectives();
        this.setupBulletAndMeteorCollision();
        this.setupRocketAndMeteorCollision();
        this.setupMeteorTimer();
        this.setupExplosionAnimation();
        this.setupStarCluster();
        this.setupLevelText();
        this.setupTransitions();
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

        const components = DirectionHelper.getComponents(this.asteroidDirection);
        velocityX = components.dx * -1 * bulletVelocity;
        velocityY = components.dy * -1 * bulletVelocity;
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
            this.showExplosionAt(meteor.x, meteor.y);
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

        this.kAnimExplosion = 'anim-explosion';
        this.anims.create({
            key: 'anim-explosion',
            frames: this.anims.generateFrameNames(this.kAtlasExplosion, { start: 1, end: 7 }),
            repeat: 0,
            hideOnComplete: true
        });
    }

    setupStarCluster(){
        const camWidth = this.cameras.main.displayWidth;
        const camHeight = this.cameras.main.displayHeight;
        const x = camWidth / 2;
        const y = camHeight / 2;
        const clusterTexture1 = this.textures.get(this.kTextureStarCluster).getSourceImage();
        this.starCluster1 = this.add.tileSprite(x, y, camWidth, camHeight, this.kTextureStarCluster);

        let tileXTween = 0;
        let tileYTween = 0;

        const components = DirectionHelper.getComponents(this.asteroidDirection);

        tileXTween = components.dx * -1 * clusterTexture1.width;
        tileYTween = components.dy * -1 * clusterTexture1.height;

        this.tweens.add({
            targets: this.starCluster1,
            tilePositionX: tileXTween,
            tilePositionY: tileYTween,
            repeat: -1,
            duration: 20000
        });
    }

    setupLevelText(){
        const x = this.cameras.main.displayWidth / 2;
        const y = this.cameras.main.displayHeight / 2;
        // getLevelName
        const text = this.getLevelName();
        const sprite = this.add.text(x, y, text, {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#FFFFFF'
        });

        sprite.setOrigin(0.5, 0.5);
        sprite.alpha = 0;
        
        const fadeOut = this.add.tween({
            targets: sprite,
            alpha: 1,
            duration: 1000,
            hold: 2000,
            yoyo: true,
        })
    }

    setupTransitions(){
        this.events.on('transitionout', (scene, duration) => {
            this.add.tween({
                targets: this.cameras.main,
                alpha: 0,
                duration: duration
            });
            this.physics.pause();
            this.cameras.main.zoomTo(0.001, duration, 'Power2')
        });
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

        const components = DirectionHelper.getComponents(this.asteroidDirection);

        velocityX = components.dx * this.meteorVelocity;
        velocityY = components.dy * this.meteorVelocity;

        switch(this.asteroidDirection){

            // Right
            case 1: 
            meteorX = this.cameras.main.width;
            meteorY = topOffset + heightArea * Math.random();
            break;

            // Down
            case 2: 
            meteorX = leftOffset + widthArea * Math.random();
            meteorY = this.cameras.main.height;
            break;

            // Left
            case 3: 
            meteorX = -meteorWidth;
            meteorY = topOffset + heightArea * Math.random();
            break;

            // Top
            case 4: 
            meteorX = leftOffset + widthArea * Math.random();
            meteorY = -meteorHeight;
            break;
        }

        this.meteors.addMeteor(
            meteorX, 
            meteorY, 
            velocityX, 
            velocityY, 
            isCorrectAnswer,
            value,
            this.answerFontSize
        );
    }

    readProperties(){
        this.question = EdgeProxy.getLevelProperty(this, 'Question');
        this.requiredPoints = EdgeProxy.getLevelProperty(this, 'Points Required');
        this.correctAnswers = this.splitCSV(EdgeProxy.getLevelProperty(this, 'Correct Answers'));
        this.wrongAnswers = this.splitCSV(EdgeProxy.getLevelProperty(this, 'Wrong Answers'));
        this.meteorVelocity = Number.parseInt(EdgeProxy.getLevelProperty(this, 'Meteor Velocity'));
        this.asteroidDirection = Number.parseInt(EdgeProxy.getLevelProperty(this, 'Asteroid Direction'));
        this.answerFontSize = Number.parseInt(EdgeProxy.getLevelProperty(this, 'Answer Font Size'));
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
            const lastPoints = this.points;
            this.points = newPoints;

            // if ((this.time.now / 1000) <= 20){
            //     EdgeProxy.increaseObjectiveProgress(this.kObj5Points20Seconds, newPoints - lastPoints);
            // }

            if (this.points <= -5){
                EdgeProxy.increaseGuidanceProgress(this.kGui5WrongAnswers, 1);
            }

            if (this.points <= -10){
                EdgeProxy.increaseGuidanceProgress(this.kGui10WrongAnswers, 1);
            }

            if (this.points <= -15){
                EdgeProxy.increaseGuidanceProgress(this.kGui15WrongAnswers, 1);
            }

            if (this.points >= this.requiredPoints){
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
        const oneMinute = 60000;

        /**
         * @type {Phaser.Time.TimerEvent}
         */
        const config1 = {
            delay: oneMinute,
            callback: () => { 
                if (this.points <= 0){
                    EdgeProxy.increaseGuidanceProgress(this.kGuiNoPoints1Minute, 1);
                }
            }
        };

        /**
         * @type {Phaser.Time.TimerEvent}
         */
        const config2 = {
            delay: 2 * oneMinute,
            callback: () => { 
                if (this.points <= 0){
                    EdgeProxy.increaseGuidanceProgress(this.kGuiNoPoints2Minutes, 1);
                }
            }
        };

        this.time.addEvent(config1);
        this.time.addEvent(config2);
    }

    setupObjectives(){
        /**
         * @type {Phaser.Time.TimerEvent}
         */
        const config1 = {
            delay: 20000,
            callback: () => { 
                if (this.points >= 5 && !objective_globals.didObtain5Points20Seconds){
                    objective_globals.didObtain5Points20Seconds = true;
                    EdgeProxy.increaseGuidanceProgress(this.kObj5Points20Seconds, 1);
                }
            }
        }

        this.time.addEvent(config1);
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
            this.flashRocket();
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

    showExplosionAt(x, y){
        const animCompletionEvent = Phaser.Animations.Events.ANIMATION_COMPLETE;
        const explosion = this.add.sprite(x, y, 'texture-explosion')
            .play(this.kAnimExplosion)
            .setDisplaySize(80, 80)

        explosion.on(animCompletionEvent, () => {
            explosion.destroy();
        })
    }

    flashRocket(){
        this.tweens.add({
            targets: this.rocket,
            alpha: 0.1,
            duration: 600,
            yoyo: true,
            repeat: 3
        });
    }

    moveToNextLevel(){
        const nextLevel = this.getNextLevelName();
        this.scene.transition({
            target: nextLevel,
            duration: 1000,
            moveBelow: true
        });
        // this.scene.start(nextLevel);
    }

    // MARK: Override Properties

    getLevelName(){
        return 'Level Name Not Overridden!';
    }

    getNextLevelName(){
        console.log('Move to next level not implemented. Do not call super implementation.');
        return 'EmptyLevel';
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
        

		this.load.setBaseURL('http://localhost/');


		this.rawResources = {}
		this.rawResources['sky1.png'] = "fs/res_upload/image/5f6c7f06-de68-4daa-a9e5-17b7d609b277.png";
		this.rawResources['titleplaceholder.png'] = "fs/res_upload/image/a4f08ca1-c52e-4b4c-9e0a-56165c5920e1.png";
		this.rawResources['rocket.png'] = "fs/res_upload/image/16233c5d-55d0-471c-87d8-ac62ad4c05a6.png";
		this.rawResources['smallbullet.png'] = "fs/res_upload/image/2b27ea04-7f29-45eb-8af4-6ac536f85592.png";
		this.rawResources['meteor.png'] = "fs/res_upload/image/362129c5-d0d4-4c2c-8715-db0c1d2740fd.png";
		this.rawResources['meteor2.png'] = "fs/res_upload/image/f02ca90a-4506-405b-b981-066aee394d81.png";
		this.rawResources['panel.png'] = "fs/res_upload/image/27f00367-3767-4e83-ad54-bed4ee874122.png";
		this.rawResources['heart.png'] = "fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png";
		this.rawResources['gameover.jpeg'] = "fs/res_upload/image/92986bcf-c632-4b92-94b3-d927a9ec53d4.jpeg";
		this.rawResources['youwin.jpg'] = "fs/res_upload/image/cc004623-8d79-42e9-a3b3-f694acd95b4d.jpg";
		this.rawResources['explosion.png'] = "fs/res_upload/image/57d09cc0-0154-4f71-8303-24de6168db05.png";
		this.rawResources['explosion_atlas.json'] = "fs/res_upload/other/d76c80ad-d43f-4d85-9162-3139ce88830f.json";
		this.rawResources['sky2.png'] = "fs/res_upload/image/909d1634-5698-4c40-92d3-52fa58d0e421.png";
		this.rawResources['sky3.png'] = "fs/res_upload/image/16a1c8a0-2f13-4fd7-aae9-7cc04ada872f.png";
		this.rawResources['sky4.png'] = "fs/res_upload/image/37306a9b-0f11-44b6-a7ca-eebe8f2d8f2b.png";
		this.rawResources['sky5.png'] = "fs/res_upload/image/55377bb2-f9e7-45e2-bbe6-ba40d120a37f.png";
		this.rawResources['starcluster1.png'] = "fs/res_upload/image/58e67e0f-6ab0-4588-ba89-15d3eba5e0a7.png";
		this.rawResources['starcluster2.png'] = "fs/res_upload/image/0d6cfdfc-d869-427c-a0eb-d19b1bee99cd.png";


		this.load.image('sky', 'fs/res_upload/image/5f6c7f06-de68-4daa-a9e5-17b7d609b277.png');
		this.load.image('rocket', 'fs/res_upload/image/16233c5d-55d0-471c-87d8-ac62ad4c05a6.png');
		this.load.image('bullet', 'fs/res_upload/image/2b27ea04-7f29-45eb-8af4-6ac536f85592.png');
		this.load.image('meteor', 'fs/res_upload/image/362129c5-d0d4-4c2c-8715-db0c1d2740fd.png');
		this.load.image('panel', 'fs/res_upload/image/27f00367-3767-4e83-ad54-bed4ee874122.png');
		this.load.image('heart3', 'fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png');
		this.load.image('heart2', 'fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png');
		this.load.image('heart1', 'fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png');


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
    "Points Required": 5,
    "Meteor Velocity": 80,
    "Asteroid Direction": "1",
    "Answer Font Size": 16,
    "Correct Answers": "2, 4, 6, 8, 10, 12",
    "Wrong Answers": "1, 3, 5, 7, 9, 11"
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

    getLevelName(){
        return 'Level 1';
    }

    getNextLevelName(){
        EdgeProxy.increaseObjectiveProgress(this.kObjCompleteLvl1, 1);
        return 'LevelScene_Level2';
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
		this.rawResources['sky1.png'] = "fs/res_upload/image/5f6c7f06-de68-4daa-a9e5-17b7d609b277.png";
		this.rawResources['titleplaceholder.png'] = "fs/res_upload/image/a4f08ca1-c52e-4b4c-9e0a-56165c5920e1.png";
		this.rawResources['rocket.png'] = "fs/res_upload/image/16233c5d-55d0-471c-87d8-ac62ad4c05a6.png";
		this.rawResources['smallbullet.png'] = "fs/res_upload/image/2b27ea04-7f29-45eb-8af4-6ac536f85592.png";
		this.rawResources['meteor.png'] = "fs/res_upload/image/362129c5-d0d4-4c2c-8715-db0c1d2740fd.png";
		this.rawResources['meteor2.png'] = "fs/res_upload/image/f02ca90a-4506-405b-b981-066aee394d81.png";
		this.rawResources['panel.png'] = "fs/res_upload/image/27f00367-3767-4e83-ad54-bed4ee874122.png";
		this.rawResources['heart.png'] = "fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png";
		this.rawResources['gameover.jpeg'] = "fs/res_upload/image/92986bcf-c632-4b92-94b3-d927a9ec53d4.jpeg";
		this.rawResources['youwin.jpg'] = "fs/res_upload/image/cc004623-8d79-42e9-a3b3-f694acd95b4d.jpg";
		this.rawResources['explosion.png'] = "fs/res_upload/image/57d09cc0-0154-4f71-8303-24de6168db05.png";
		this.rawResources['explosion_atlas.json'] = "fs/res_upload/other/d76c80ad-d43f-4d85-9162-3139ce88830f.json";
		this.rawResources['sky2.png'] = "fs/res_upload/image/909d1634-5698-4c40-92d3-52fa58d0e421.png";
		this.rawResources['sky3.png'] = "fs/res_upload/image/16a1c8a0-2f13-4fd7-aae9-7cc04ada872f.png";
		this.rawResources['sky4.png'] = "fs/res_upload/image/37306a9b-0f11-44b6-a7ca-eebe8f2d8f2b.png";
		this.rawResources['sky5.png'] = "fs/res_upload/image/55377bb2-f9e7-45e2-bbe6-ba40d120a37f.png";
		this.rawResources['starcluster1.png'] = "fs/res_upload/image/58e67e0f-6ab0-4588-ba89-15d3eba5e0a7.png";
		this.rawResources['starcluster2.png'] = "fs/res_upload/image/0d6cfdfc-d869-427c-a0eb-d19b1bee99cd.png";


		this.load.image('sky', 'fs/res_upload/image/909d1634-5698-4c40-92d3-52fa58d0e421.png');
		this.load.image('rocket', 'fs/res_upload/image/16233c5d-55d0-471c-87d8-ac62ad4c05a6.png');
		this.load.image('bullet', 'fs/res_upload/image/2b27ea04-7f29-45eb-8af4-6ac536f85592.png');
		this.load.image('meteor', 'fs/res_upload/image/362129c5-d0d4-4c2c-8715-db0c1d2740fd.png');
		this.load.image('panel', 'fs/res_upload/image/27f00367-3767-4e83-ad54-bed4ee874122.png');
		this.load.image('heart3', 'fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png');
		this.load.image('heart2', 'fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png');
		this.load.image('heart1', 'fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png');


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
            "_id": "temp_1670218982690",
            "spriteResourceId": "638d84c16ed0b86069ce862f",
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
    "Answer Font Size": 16,
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

    getLevelName(){
        return 'Level 2';
    }

    getNextLevelName(){
        EdgeProxy.increaseObjectiveProgress(this.kObjCompleteLvl2, 1);
        return 'LevelScene_Level3';
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
		this.rawResources['sky1.png'] = "fs/res_upload/image/5f6c7f06-de68-4daa-a9e5-17b7d609b277.png";
		this.rawResources['titleplaceholder.png'] = "fs/res_upload/image/a4f08ca1-c52e-4b4c-9e0a-56165c5920e1.png";
		this.rawResources['rocket.png'] = "fs/res_upload/image/16233c5d-55d0-471c-87d8-ac62ad4c05a6.png";
		this.rawResources['smallbullet.png'] = "fs/res_upload/image/2b27ea04-7f29-45eb-8af4-6ac536f85592.png";
		this.rawResources['meteor.png'] = "fs/res_upload/image/362129c5-d0d4-4c2c-8715-db0c1d2740fd.png";
		this.rawResources['meteor2.png'] = "fs/res_upload/image/f02ca90a-4506-405b-b981-066aee394d81.png";
		this.rawResources['panel.png'] = "fs/res_upload/image/27f00367-3767-4e83-ad54-bed4ee874122.png";
		this.rawResources['heart.png'] = "fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png";
		this.rawResources['gameover.jpeg'] = "fs/res_upload/image/92986bcf-c632-4b92-94b3-d927a9ec53d4.jpeg";
		this.rawResources['youwin.jpg'] = "fs/res_upload/image/cc004623-8d79-42e9-a3b3-f694acd95b4d.jpg";
		this.rawResources['explosion.png'] = "fs/res_upload/image/57d09cc0-0154-4f71-8303-24de6168db05.png";
		this.rawResources['explosion_atlas.json'] = "fs/res_upload/other/d76c80ad-d43f-4d85-9162-3139ce88830f.json";
		this.rawResources['sky2.png'] = "fs/res_upload/image/909d1634-5698-4c40-92d3-52fa58d0e421.png";
		this.rawResources['sky3.png'] = "fs/res_upload/image/16a1c8a0-2f13-4fd7-aae9-7cc04ada872f.png";
		this.rawResources['sky4.png'] = "fs/res_upload/image/37306a9b-0f11-44b6-a7ca-eebe8f2d8f2b.png";
		this.rawResources['sky5.png'] = "fs/res_upload/image/55377bb2-f9e7-45e2-bbe6-ba40d120a37f.png";
		this.rawResources['starcluster1.png'] = "fs/res_upload/image/58e67e0f-6ab0-4588-ba89-15d3eba5e0a7.png";
		this.rawResources['starcluster2.png'] = "fs/res_upload/image/0d6cfdfc-d869-427c-a0eb-d19b1bee99cd.png";


		this.load.image('sky', 'fs/res_upload/image/16a1c8a0-2f13-4fd7-aae9-7cc04ada872f.png');
		this.load.image('rocket', 'fs/res_upload/image/16233c5d-55d0-471c-87d8-ac62ad4c05a6.png');
		this.load.image('bullet', 'fs/res_upload/image/2b27ea04-7f29-45eb-8af4-6ac536f85592.png');
		this.load.image('meteor', 'fs/res_upload/image/362129c5-d0d4-4c2c-8715-db0c1d2740fd.png');
		this.load.image('panel', 'fs/res_upload/image/27f00367-3767-4e83-ad54-bed4ee874122.png');
		this.load.image('heart3', 'fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png');
		this.load.image('heart2', 'fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png');
		this.load.image('heart1', 'fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png');


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
            "_id": "temp_1670219012475",
            "spriteResourceId": "638d84c66ed0b86069ce8630",
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
                "x": 58.00000000000002,
                "y": 524,
                "w": 65.99999999999999,
                "h": 43
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
    "Answer Font Size": 24,
    "Correct Answers": "1/2, 1/4, 4/5, 10/20, 3/4, 2/8, 9/100, 4/6, 13/19, ⅜",
    "Wrong Answers": "2/2, 3/2, 10/9, 2 ½, 4 ⅘, 24/14, 9/6, 2, 3/2"
}
	

        // Add your code below this line
        super.preload();
        
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
		const sprite_4 = this.add.sprite(91.00000000000001, 545.5, 'meteor').setInteractive();
		sprite_4.name = "meteor";
		scaleX = 65.99999999999999 / sprite_4.displayWidth;
		scaleY = 43 / sprite_4.displayHeight;
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

    getLevelName(){
        return 'Level 3';
    }

    getNextLevelName(){
        EdgeProxy.increaseObjectiveProgress(this.kObjCompleteLvl3, 1);
        return 'LevelScene_Level4';
    }

}

// removed import

/**
 * @type {Phaser.Scene}
 */
class LevelScene_Level4 extends CommonLevel{

    constructor(){
        super({key: "LevelScene_Level4", active: false });
    }

    preload(){
        

		this.load.setBaseURL('http://localhost/');


		this.rawResources = {}
		this.rawResources['sky1.png'] = "fs/res_upload/image/5f6c7f06-de68-4daa-a9e5-17b7d609b277.png";
		this.rawResources['titleplaceholder.png'] = "fs/res_upload/image/a4f08ca1-c52e-4b4c-9e0a-56165c5920e1.png";
		this.rawResources['rocket.png'] = "fs/res_upload/image/16233c5d-55d0-471c-87d8-ac62ad4c05a6.png";
		this.rawResources['smallbullet.png'] = "fs/res_upload/image/2b27ea04-7f29-45eb-8af4-6ac536f85592.png";
		this.rawResources['meteor.png'] = "fs/res_upload/image/362129c5-d0d4-4c2c-8715-db0c1d2740fd.png";
		this.rawResources['meteor2.png'] = "fs/res_upload/image/f02ca90a-4506-405b-b981-066aee394d81.png";
		this.rawResources['panel.png'] = "fs/res_upload/image/27f00367-3767-4e83-ad54-bed4ee874122.png";
		this.rawResources['heart.png'] = "fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png";
		this.rawResources['gameover.jpeg'] = "fs/res_upload/image/92986bcf-c632-4b92-94b3-d927a9ec53d4.jpeg";
		this.rawResources['youwin.jpg'] = "fs/res_upload/image/cc004623-8d79-42e9-a3b3-f694acd95b4d.jpg";
		this.rawResources['explosion.png'] = "fs/res_upload/image/57d09cc0-0154-4f71-8303-24de6168db05.png";
		this.rawResources['explosion_atlas.json'] = "fs/res_upload/other/d76c80ad-d43f-4d85-9162-3139ce88830f.json";
		this.rawResources['sky2.png'] = "fs/res_upload/image/909d1634-5698-4c40-92d3-52fa58d0e421.png";
		this.rawResources['sky3.png'] = "fs/res_upload/image/16a1c8a0-2f13-4fd7-aae9-7cc04ada872f.png";
		this.rawResources['sky4.png'] = "fs/res_upload/image/37306a9b-0f11-44b6-a7ca-eebe8f2d8f2b.png";
		this.rawResources['sky5.png'] = "fs/res_upload/image/55377bb2-f9e7-45e2-bbe6-ba40d120a37f.png";
		this.rawResources['starcluster1.png'] = "fs/res_upload/image/58e67e0f-6ab0-4588-ba89-15d3eba5e0a7.png";
		this.rawResources['starcluster2.png'] = "fs/res_upload/image/0d6cfdfc-d869-427c-a0eb-d19b1bee99cd.png";


		this.load.image('sky', 'fs/res_upload/image/37306a9b-0f11-44b6-a7ca-eebe8f2d8f2b.png');
		this.load.image('rocket', 'fs/res_upload/image/16233c5d-55d0-471c-87d8-ac62ad4c05a6.png');
		this.load.image('bullet', 'fs/res_upload/image/2b27ea04-7f29-45eb-8af4-6ac536f85592.png');
		this.load.image('meteor', 'fs/res_upload/image/362129c5-d0d4-4c2c-8715-db0c1d2740fd.png');
		this.load.image('panel', 'fs/res_upload/image/27f00367-3767-4e83-ad54-bed4ee874122.png');
		this.load.image('heart3', 'fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png');
		this.load.image('heart2', 'fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png');
		this.load.image('heart1', 'fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png');


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
            "_id": "temp_1670219075355",
            "spriteResourceId": "638d84c96ed0b86069ce8631",
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
    "Question": "Shoot all SI Units",
    "Points Required": 20,
    "Meteor Velocity": 120,
    "Asteroid Direction": "1",
    "Answer Font Size": 16,
    "Correct Answers": "kg, cm, m3, km, meter, mm",
    "Wrong Answers": "°C, liters, inch, feet, ounce, pound"
}
	

        // Add your code below this line
        super.preload();

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


		// --- scene object rocket ---
		const sprite_2 = this.add.sprite(31, 240, 'rocket').setInteractive();
		sprite_2.name = "rocket";
		scaleX = 40 / sprite_2.displayWidth;
		scaleY = 40 / sprite_2.displayHeight;
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

    getLevelName(){
        return 'Level 4';
    }

    getNextLevelName(){
        EdgeProxy.increaseGuidanceProgress(this.kObjCompleteLvl4, 1);
        return 'LevelScene_Level5';
    }
}




// removed import

/**
 * @type {Phaser.Scene}
 */
class LevelScene_Level5 extends CommonLevel{

    constructor(){
        super({key: "LevelScene_Level5", active: false });
    }

    preload(){
        

		this.load.setBaseURL('http://localhost/');


		this.rawResources = {}
		this.rawResources['sky1.png'] = "fs/res_upload/image/5f6c7f06-de68-4daa-a9e5-17b7d609b277.png";
		this.rawResources['titleplaceholder.png'] = "fs/res_upload/image/a4f08ca1-c52e-4b4c-9e0a-56165c5920e1.png";
		this.rawResources['rocket.png'] = "fs/res_upload/image/16233c5d-55d0-471c-87d8-ac62ad4c05a6.png";
		this.rawResources['smallbullet.png'] = "fs/res_upload/image/2b27ea04-7f29-45eb-8af4-6ac536f85592.png";
		this.rawResources['meteor.png'] = "fs/res_upload/image/362129c5-d0d4-4c2c-8715-db0c1d2740fd.png";
		this.rawResources['meteor2.png'] = "fs/res_upload/image/f02ca90a-4506-405b-b981-066aee394d81.png";
		this.rawResources['panel.png'] = "fs/res_upload/image/27f00367-3767-4e83-ad54-bed4ee874122.png";
		this.rawResources['heart.png'] = "fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png";
		this.rawResources['gameover.jpeg'] = "fs/res_upload/image/92986bcf-c632-4b92-94b3-d927a9ec53d4.jpeg";
		this.rawResources['youwin.jpg'] = "fs/res_upload/image/cc004623-8d79-42e9-a3b3-f694acd95b4d.jpg";
		this.rawResources['explosion.png'] = "fs/res_upload/image/57d09cc0-0154-4f71-8303-24de6168db05.png";
		this.rawResources['explosion_atlas.json'] = "fs/res_upload/other/d76c80ad-d43f-4d85-9162-3139ce88830f.json";
		this.rawResources['sky2.png'] = "fs/res_upload/image/909d1634-5698-4c40-92d3-52fa58d0e421.png";
		this.rawResources['sky3.png'] = "fs/res_upload/image/16a1c8a0-2f13-4fd7-aae9-7cc04ada872f.png";
		this.rawResources['sky4.png'] = "fs/res_upload/image/37306a9b-0f11-44b6-a7ca-eebe8f2d8f2b.png";
		this.rawResources['sky5.png'] = "fs/res_upload/image/55377bb2-f9e7-45e2-bbe6-ba40d120a37f.png";
		this.rawResources['starcluster1.png'] = "fs/res_upload/image/58e67e0f-6ab0-4588-ba89-15d3eba5e0a7.png";
		this.rawResources['starcluster2.png'] = "fs/res_upload/image/0d6cfdfc-d869-427c-a0eb-d19b1bee99cd.png";


		this.load.image('sky', 'fs/res_upload/image/55377bb2-f9e7-45e2-bbe6-ba40d120a37f.png');
		this.load.image('rocket', 'fs/res_upload/image/16233c5d-55d0-471c-87d8-ac62ad4c05a6.png');
		this.load.image('bullet', 'fs/res_upload/image/2b27ea04-7f29-45eb-8af4-6ac536f85592.png');
		this.load.image('meteor', 'fs/res_upload/image/362129c5-d0d4-4c2c-8715-db0c1d2740fd.png');
		this.load.image('panel', 'fs/res_upload/image/27f00367-3767-4e83-ad54-bed4ee874122.png');
		this.load.image('heart3', 'fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png');
		this.load.image('heart2', 'fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png');
		this.load.image('heart1', 'fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png');


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
            "_id": "temp_1670219100847",
            "spriteResourceId": "638d84cc6ed0b86069ce8632",
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
                "x": 26.5,
                "y": 530,
                "w": 16.5,
                "h": 16.5
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
                "x": 58.000000000000114,
                "y": 524,
                "w": 156.66666666666657,
                "h": 78.33333333333329
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
    "Question": "Shoot correct representations of fractions",
    "Points Required": 25,
    "Meteor Velocity": 130,
    "Asteroid Direction": "1",
    "Answer Font Size": 16,
    "Correct Answers": "🌓 = 1/2, ✅✅❌ = 2/3, ✅✅❌ = 1/3, 🎩🎩🎩👒 = 3/4, 🌕🌑🌑🌕 = 2/4",
    "Wrong Answers": "🍎🍊🍊 = 1/2, ✅✅✅❌ = 2/4, 🎩🎩👒👒👒 = 4/5, 🌕🌑🌑🌕🌕 = 1/5"
}
	

        // Add your code below this line
        super.preload();

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


		// --- scene object rocket ---
		const sprite_2 = this.add.sprite(31, 240, 'rocket').setInteractive();
		sprite_2.name = "rocket";
		scaleX = 40 / sprite_2.displayWidth;
		scaleY = 40 / sprite_2.displayHeight;
		sprite_2.setScale(scaleX, scaleY);
		this.spriteReferences['rocket'] = sprite_2;


		// --- scene object bullet ---
		const sprite_3 = this.add.sprite(34.75, 538.25, 'bullet').setInteractive();
		sprite_3.name = "bullet";
		scaleX = 16.5 / sprite_3.displayWidth;
		scaleY = 16.5 / sprite_3.displayHeight;
		sprite_3.setScale(scaleX, scaleY);
		this.spriteReferences['bullet'] = sprite_3;


		// --- scene object meteor ---
		const sprite_4 = this.add.sprite(136.3333333333334, 563.1666666666666, 'meteor').setInteractive();
		sprite_4.name = "meteor";
		scaleX = 156.66666666666657 / sprite_4.displayWidth;
		scaleY = 78.33333333333329 / sprite_4.displayHeight;
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

    getLevelName(){
        return 'Level 5';
    }

    getNextLevelName(){
        EdgeProxy.increaseGuidanceProgress(this.kObjCompleteLvl5, 1);
        return 'LevelScene_Win';
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
		this.rawResources['sky1.png'] = "fs/res_upload/image/5f6c7f06-de68-4daa-a9e5-17b7d609b277.png";
		this.rawResources['titleplaceholder.png'] = "fs/res_upload/image/a4f08ca1-c52e-4b4c-9e0a-56165c5920e1.png";
		this.rawResources['rocket.png'] = "fs/res_upload/image/16233c5d-55d0-471c-87d8-ac62ad4c05a6.png";
		this.rawResources['smallbullet.png'] = "fs/res_upload/image/2b27ea04-7f29-45eb-8af4-6ac536f85592.png";
		this.rawResources['meteor.png'] = "fs/res_upload/image/362129c5-d0d4-4c2c-8715-db0c1d2740fd.png";
		this.rawResources['meteor2.png'] = "fs/res_upload/image/f02ca90a-4506-405b-b981-066aee394d81.png";
		this.rawResources['panel.png'] = "fs/res_upload/image/27f00367-3767-4e83-ad54-bed4ee874122.png";
		this.rawResources['heart.png'] = "fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png";
		this.rawResources['gameover.jpeg'] = "fs/res_upload/image/92986bcf-c632-4b92-94b3-d927a9ec53d4.jpeg";
		this.rawResources['youwin.jpg'] = "fs/res_upload/image/cc004623-8d79-42e9-a3b3-f694acd95b4d.jpg";
		this.rawResources['explosion.png'] = "fs/res_upload/image/57d09cc0-0154-4f71-8303-24de6168db05.png";
		this.rawResources['explosion_atlas.json'] = "fs/res_upload/other/d76c80ad-d43f-4d85-9162-3139ce88830f.json";
		this.rawResources['sky2.png'] = "fs/res_upload/image/909d1634-5698-4c40-92d3-52fa58d0e421.png";
		this.rawResources['sky3.png'] = "fs/res_upload/image/16a1c8a0-2f13-4fd7-aae9-7cc04ada872f.png";
		this.rawResources['sky4.png'] = "fs/res_upload/image/37306a9b-0f11-44b6-a7ca-eebe8f2d8f2b.png";
		this.rawResources['sky5.png'] = "fs/res_upload/image/55377bb2-f9e7-45e2-bbe6-ba40d120a37f.png";
		this.rawResources['starcluster1.png'] = "fs/res_upload/image/58e67e0f-6ab0-4588-ba89-15d3eba5e0a7.png";
		this.rawResources['starcluster2.png'] = "fs/res_upload/image/0d6cfdfc-d869-427c-a0eb-d19b1bee99cd.png";


		this.load.image('sky', 'fs/res_upload/image/5f6c7f06-de68-4daa-a9e5-17b7d609b277.png');
		this.load.image('youwin', 'fs/res_upload/image/cc004623-8d79-42e9-a3b3-f694acd95b4d.jpg');


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
		this.rawResources['sky1.png'] = "fs/res_upload/image/5f6c7f06-de68-4daa-a9e5-17b7d609b277.png";
		this.rawResources['titleplaceholder.png'] = "fs/res_upload/image/a4f08ca1-c52e-4b4c-9e0a-56165c5920e1.png";
		this.rawResources['rocket.png'] = "fs/res_upload/image/16233c5d-55d0-471c-87d8-ac62ad4c05a6.png";
		this.rawResources['smallbullet.png'] = "fs/res_upload/image/2b27ea04-7f29-45eb-8af4-6ac536f85592.png";
		this.rawResources['meteor.png'] = "fs/res_upload/image/362129c5-d0d4-4c2c-8715-db0c1d2740fd.png";
		this.rawResources['meteor2.png'] = "fs/res_upload/image/f02ca90a-4506-405b-b981-066aee394d81.png";
		this.rawResources['panel.png'] = "fs/res_upload/image/27f00367-3767-4e83-ad54-bed4ee874122.png";
		this.rawResources['heart.png'] = "fs/res_upload/image/d77e498b-0fe1-466d-914d-8205b63ed186.png";
		this.rawResources['gameover.jpeg'] = "fs/res_upload/image/92986bcf-c632-4b92-94b3-d927a9ec53d4.jpeg";
		this.rawResources['youwin.jpg'] = "fs/res_upload/image/cc004623-8d79-42e9-a3b3-f694acd95b4d.jpg";
		this.rawResources['explosion.png'] = "fs/res_upload/image/57d09cc0-0154-4f71-8303-24de6168db05.png";
		this.rawResources['explosion_atlas.json'] = "fs/res_upload/other/d76c80ad-d43f-4d85-9162-3139ce88830f.json";
		this.rawResources['sky2.png'] = "fs/res_upload/image/909d1634-5698-4c40-92d3-52fa58d0e421.png";
		this.rawResources['sky3.png'] = "fs/res_upload/image/16a1c8a0-2f13-4fd7-aae9-7cc04ada872f.png";
		this.rawResources['sky4.png'] = "fs/res_upload/image/37306a9b-0f11-44b6-a7ca-eebe8f2d8f2b.png";
		this.rawResources['sky5.png'] = "fs/res_upload/image/55377bb2-f9e7-45e2-bbe6-ba40d120a37f.png";
		this.rawResources['starcluster1.png'] = "fs/res_upload/image/58e67e0f-6ab0-4588-ba89-15d3eba5e0a7.png";
		this.rawResources['starcluster2.png'] = "fs/res_upload/image/0d6cfdfc-d869-427c-a0eb-d19b1bee99cd.png";


		this.load.image('sky', 'fs/res_upload/image/5f6c7f06-de68-4daa-a9e5-17b7d609b277.png');
		this.load.image('gameover_jpeg', 'fs/res_upload/image/92986bcf-c632-4b92-94b3-d927a9ec53d4.jpeg');


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

const scenes = [LevelScene_Title_Screen, LevelScene_DataLevel, LevelScene_Level1, LevelScene_Level2, LevelScene_Level3, LevelScene_Level4, LevelScene_Level5, LevelScene_Win, LevelScene_Game_Over_Screen];
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
 * @type Phaser.Game
 */
const edgeGame = new Phaser.Game(config);
scenes.forEach((scn, index) => {
    edgeGame.scene.add('scene', scn, index == 0, null);
});

// edgeGame.scene.add('scene', startingScene, true, null);
// edgeGame.scene.scenes = scenes;

window.InternalsFromGame = {
    _on_changeGameState: (paused) => {

        edgeGame.input.enabled = !paused;
        edgeGame.input.keyboard.enabled = !paused;
        edgeGame.input.mouse.enabled = !paused;

        if (paused){
            const scenes = edgeGame.scene.getScenes(true);
            if (scenes.length > 0){
                scenes.forEach(scn => {
                    if (!scn.scene.isPaused()){
                        scn.scene.pause();
                    }
                })
            }
        }
        else{
            const pausedScenes = edgeGame.scene.getScenes(null)
                .filter(scn => scn.scene.isPaused());
            if (pausedScenes.length > 0){
                pausedScenes.forEach(scn => {
                    scn.scene.resume();
                    scn.input.enabled = true;
                });
                edgeGame.input.enabled = true;
            }
        }
    }
}

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