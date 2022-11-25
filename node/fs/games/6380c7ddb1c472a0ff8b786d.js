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

        this.startBtnName = 'start';

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
        this.load.setBaseURL('http://localhost/');
        

		this.load.image('bg', 'fs/res_upload/image/40b9dc00-082a-4e93-98fb-a910c9c98a6f.png');
		this.load.image('title', 'fs/res_upload/image/340752a3-4a9d-423f-916c-75556a7a322a.png');
		this.load.image('start', 'fs/res_upload/image/9c438923-e955-4ca4-ac03-b52aeb5f3ea7.png');
        this.levelData = {
    "objects": [
        {
            "_id": "6380c7ddd09b836a7a78b620",
            "spriteResourceId": "",
            "type": "camera",
            "name": "Camera",
            "frame": {
                "x": 0,
                "y": 0,
                "w": 900,
                "h": 500
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
            "_id": "temp_1669385490548",
            "spriteResourceId": "6380c8fcb1c472a0ff8b786e",
            "type": "sprite",
            "name": "bg",
            "frame": {
                "x": 0,
                "y": 0,
                "w": 925,
                "h": 532.9999999999999
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
            "_id": "temp_1669385506404",
            "spriteResourceId": "6380cb10b1c472a0ff8b7874",
            "type": "sprite",
            "name": "title",
            "frame": {
                "x": 250,
                "y": 100,
                "w": 400,
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
            "_id": "temp_1669385542053",
            "spriteResourceId": "6380cb02b1c472a0ff8b7871",
            "type": "sprite",
            "name": "start",
            "frame": {
                "x": 375,
                "y": 350,
                "w": 150,
                "h": 50
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
		// --- scene object bg ---
		const sprite_1 = this.add.sprite(462.5, 266.49999999999994, 'bg').setInteractive();
		sprite_1.name = "bg";
		scaleX = 925 / sprite_1.displayWidth;
		scaleY = 532.9999999999999 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences['bg'] = sprite_1;


		// --- scene object title ---
		const sprite_2 = this.add.sprite(450, 150, 'title').setInteractive();
		sprite_2.name = "title";
		scaleX = 400 / sprite_2.displayWidth;
		scaleY = 100 / sprite_2.displayHeight;
		sprite_2.setScale(scaleX, scaleY);
		this.spriteReferences['title'] = sprite_2;


		// --- scene object start ---
		const sprite_3 = this.add.sprite(450, 375, 'start').setInteractive();
		sprite_3.name = "start";
		scaleX = 150 / sprite_3.displayWidth;
		scaleY = 50 / sprite_3.displayHeight;
		sprite_3.setScale(scaleX, scaleY);
		this.spriteReferences['start'] = sprite_3;



        // Add your code below this line
        const startBtn = this.spriteReferences[this.startBtnName];
        startBtn.on('pointerup', () => {
            this.scene.start('LevelScene_Level1');
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

class Cell{
    constructor(x, y, type, sprite){
        this.x = x;
        this.y = y;
        this.type = type;
        this.sprite = sprite;
    }
}

class LevelScene_DataLevel extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_DataLevel", active: false });

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
        this.load.setBaseURL('http://localhost/');
        

        this.levelData = {
    "objects": [
        {
            "_id": "6380c7ddd09b836a7a78b620",
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

        // Add your code below this line

    }
    update(){

        // Add your code below this line

    }
    destroy(){
        
        // Add your code below this line

    }
}

// removed import

class LevelScene_Level1 extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_Level1", active: false });

        /**
         * The grid of cells (columns x rows)
         * @type {array[]}
         */
        this.grid = [];

        this.nClasses = 0;
        this.prompt = "";
        /**
         * @type {string[]}
         */
        this.class1Sprites = [];
        /**
         * @type {string[]}
         */
        this.class2Sprites = [];
        /**
         * @type {string[]}
         */
        this.class3Sprites = [];
        /**
         * @type {string[]}
         */
        this.class4Sprites = [];

        // MARK: Built in properties

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
        this.load.setBaseURL('http://localhost/');
        

		this.load.image('bg', 'fs/res_upload/image/40b9dc00-082a-4e93-98fb-a910c9c98a6f.png');
		this.load.image('gas1', 'fs/res_upload/image/c943ffe9-9522-4473-b34f-5860e9e7238d.png');
		this.load.image('gas2', 'fs/res_upload/image/cb32bc12-fb49-4420-ac30-8770ad47dbec.png');
		this.load.image('gas3', 'fs/res_upload/image/ff420a7b-1efb-4a92-8dcb-df8787593760.png');
		this.load.image('plasma1', 'fs/res_upload/image/0380aab3-3de5-4d19-a9c5-af2aa60ec0e8.png');
		this.load.image('plasma2', 'fs/res_upload/image/7d73e570-ac1d-4b6a-86ae-1e934abbd4cd.png');
		this.load.image('plasma3', 'fs/res_upload/image/b746e63a-5077-40cc-803b-8427b9d6d2eb.png');
		this.load.image('solid1', 'fs/res_upload/image/9a89029f-f5e6-411c-b2db-8b978c3c7af3.png');
		this.load.image('solid2', 'fs/res_upload/image/060d475d-e44c-4ecc-a72e-f51928c24c4b.png');
		this.load.image('solid3', 'fs/res_upload/image/d2ef70d9-cec7-42be-b7cf-358c84c3705b.png');
		this.load.image('board_png', 'fs/res_upload/image/3d93c48b-71a4-487b-9163-4c558c40e163.png');
		this.load.image('container_png', 'fs/res_upload/image/a6b6e23d-1734-4dd5-8a28-d9749eae5037.png');
        this.levelData = {
    "objects": [
        {
            "_id": "6380c822d09b836a7a78b624",
            "spriteResourceId": "",
            "type": "camera",
            "name": "Camera",
            "frame": {
                "x": 0,
                "y": 0,
                "w": 900,
                "h": 500
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
            "_id": "temp_1669387150863",
            "spriteResourceId": "6380c8fcb1c472a0ff8b786e",
            "type": "sprite",
            "name": "bg",
            "frame": {
                "x": 0,
                "y": 0,
                "w": 900,
                "h": 500
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
            "_id": "temp_1669387167820",
            "spriteResourceId": "6380cccbb1c472a0ff8b7875",
            "type": "sprite",
            "name": "gas1",
            "frame": {
                "x": 4.9999999999999964,
                "y": 560,
                "w": 38.5,
                "h": 38.5
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
            "_id": "temp_1669387177938",
            "spriteResourceId": "6380cccdb1c472a0ff8b7876",
            "type": "sprite",
            "name": "gas2",
            "frame": {
                "x": 55,
                "y": 562,
                "w": 34.5,
                "h": 34.5
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
            "_id": "temp_1669387259027",
            "spriteResourceId": "6380ccd2b1c472a0ff8b7878",
            "type": "sprite",
            "name": "gas3",
            "frame": {
                "x": 97,
                "y": 564.5,
                "w": 36.5,
                "h": 36.5
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
            "_id": "temp_1669387266796",
            "spriteResourceId": "6380ccd7b1c472a0ff8b7879",
            "type": "sprite",
            "name": "plasma1",
            "frame": {
                "x": 3.0000000000000036,
                "y": 614,
                "w": 38,
                "h": 38
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
            "_id": "temp_1669387278213",
            "spriteResourceId": "6380ccd9b1c472a0ff8b787a",
            "type": "sprite",
            "name": "plasma2",
            "frame": {
                "x": 55.5,
                "y": 615.5,
                "w": 29.00000000000001,
                "h": 29.00000000000001
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
            "_id": "temp_1669387279115",
            "spriteResourceId": "6380ccdbb1c472a0ff8b787b",
            "type": "sprite",
            "name": "plasma3",
            "frame": {
                "x": 98.5,
                "y": 617.5,
                "w": 34.5,
                "h": 34.5
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
            "_id": "temp_1669387308820",
            "spriteResourceId": "6380cce1b1c472a0ff8b787c",
            "type": "sprite",
            "name": "solid1",
            "frame": {
                "x": 3.5,
                "y": 663.5,
                "w": 37.5,
                "h": 37.5
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
            "_id": "temp_1669387311018",
            "spriteResourceId": "6380cce3b1c472a0ff8b787d",
            "type": "sprite",
            "name": "solid2",
            "frame": {
                "x": 102.5,
                "y": 667.5,
                "w": 32.49999999999999,
                "h": 32.49999999999999
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
            "_id": "temp_1669387313453",
            "spriteResourceId": "6380cce6b1c472a0ff8b787e",
            "type": "sprite",
            "name": "solid3",
            "frame": {
                "x": 58.5,
                "y": 664.5,
                "w": 34.5,
                "h": 34.5
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
            "_id": "temp_1669387469562",
            "spriteResourceId": "6380c8ffb1c472a0ff8b786f",
            "type": "sprite",
            "name": "board_png",
            "frame": {
                "x": 225,
                "y": 25,
                "w": 450,
                "h": 450
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
            "_id": "temp_1669387510632",
            "spriteResourceId": "6380c902b1c472a0ff8b7870",
            "type": "sprite",
            "name": "container_png",
            "frame": {
                "x": 234,
                "y": 34,
                "w": 432.5,
                "h": 432.50000000000006
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
    "Prompt": "Match pictures with similar states of matter",
    "No. of Classes": 3,
    "Class 1 sprites": "gas1, gas2, gas3",
    "Class 2 sprites": "plasma1, plasma2, plasm3",
    "Class 3 sprites": "solid1, solid2, solid3",
    "Class 4 sprites": ""
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
		// --- scene object bg ---
		const sprite_1 = this.add.sprite(450, 250, 'bg').setInteractive();
		sprite_1.name = "bg";
		scaleX = 900 / sprite_1.displayWidth;
		scaleY = 500 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences['bg'] = sprite_1;


		// --- scene object gas1 ---
		const sprite_2 = this.add.sprite(24.249999999999996, 579.25, 'gas1').setInteractive();
		sprite_2.name = "gas1";
		scaleX = 38.5 / sprite_2.displayWidth;
		scaleY = 38.5 / sprite_2.displayHeight;
		sprite_2.setScale(scaleX, scaleY);
		this.spriteReferences['gas1'] = sprite_2;


		// --- scene object gas2 ---
		const sprite_3 = this.add.sprite(72.25, 579.25, 'gas2').setInteractive();
		sprite_3.name = "gas2";
		scaleX = 34.5 / sprite_3.displayWidth;
		scaleY = 34.5 / sprite_3.displayHeight;
		sprite_3.setScale(scaleX, scaleY);
		this.spriteReferences['gas2'] = sprite_3;


		// --- scene object gas3 ---
		const sprite_4 = this.add.sprite(115.25, 582.75, 'gas3').setInteractive();
		sprite_4.name = "gas3";
		scaleX = 36.5 / sprite_4.displayWidth;
		scaleY = 36.5 / sprite_4.displayHeight;
		sprite_4.setScale(scaleX, scaleY);
		this.spriteReferences['gas3'] = sprite_4;


		// --- scene object plasma1 ---
		const sprite_5 = this.add.sprite(22.000000000000004, 633, 'plasma1').setInteractive();
		sprite_5.name = "plasma1";
		scaleX = 38 / sprite_5.displayWidth;
		scaleY = 38 / sprite_5.displayHeight;
		sprite_5.setScale(scaleX, scaleY);
		this.spriteReferences['plasma1'] = sprite_5;


		// --- scene object plasma2 ---
		const sprite_6 = this.add.sprite(70, 630, 'plasma2').setInteractive();
		sprite_6.name = "plasma2";
		scaleX = 29.00000000000001 / sprite_6.displayWidth;
		scaleY = 29.00000000000001 / sprite_6.displayHeight;
		sprite_6.setScale(scaleX, scaleY);
		this.spriteReferences['plasma2'] = sprite_6;


		// --- scene object plasma3 ---
		const sprite_7 = this.add.sprite(115.75, 634.75, 'plasma3').setInteractive();
		sprite_7.name = "plasma3";
		scaleX = 34.5 / sprite_7.displayWidth;
		scaleY = 34.5 / sprite_7.displayHeight;
		sprite_7.setScale(scaleX, scaleY);
		this.spriteReferences['plasma3'] = sprite_7;


		// --- scene object solid1 ---
		const sprite_8 = this.add.sprite(22.25, 682.25, 'solid1').setInteractive();
		sprite_8.name = "solid1";
		scaleX = 37.5 / sprite_8.displayWidth;
		scaleY = 37.5 / sprite_8.displayHeight;
		sprite_8.setScale(scaleX, scaleY);
		this.spriteReferences['solid1'] = sprite_8;


		// --- scene object solid2 ---
		const sprite_9 = this.add.sprite(118.75, 683.75, 'solid2').setInteractive();
		sprite_9.name = "solid2";
		scaleX = 32.49999999999999 / sprite_9.displayWidth;
		scaleY = 32.49999999999999 / sprite_9.displayHeight;
		sprite_9.setScale(scaleX, scaleY);
		this.spriteReferences['solid2'] = sprite_9;


		// --- scene object solid3 ---
		const sprite_10 = this.add.sprite(75.75, 681.75, 'solid3').setInteractive();
		sprite_10.name = "solid3";
		scaleX = 34.5 / sprite_10.displayWidth;
		scaleY = 34.5 / sprite_10.displayHeight;
		sprite_10.setScale(scaleX, scaleY);
		this.spriteReferences['solid3'] = sprite_10;


		// --- scene object board_png ---
		const sprite_11 = this.add.sprite(450, 250, 'board_png').setInteractive();
		sprite_11.name = "board_png";
		scaleX = 450 / sprite_11.displayWidth;
		scaleY = 450 / sprite_11.displayHeight;
		sprite_11.setScale(scaleX, scaleY);
		this.spriteReferences['board_png'] = sprite_11;


		// --- scene object container_png ---
		const sprite_12 = this.add.sprite(450.25, 250.25000000000003, 'container_png').setInteractive();
		sprite_12.name = "container_png";
		scaleX = 432.5 / sprite_12.displayWidth;
		scaleY = 432.50000000000006 / sprite_12.displayHeight;
		sprite_12.setScale(scaleX, scaleY);
		this.spriteReferences['container_png'] = sprite_12;



        // Add your code below this line
        this.readProperties();
    }
    update(){

        // Add your code below this line

    }
    destroy(){
        
        // Add your code below this line

    }

    // MARK: Private methods
    readProperties(){
        let readCSV = (str) => {
            return String(str).split(',').map(s => s.trim());
        }

        this.nClasses = Number.parseInt(this.levelProperties['No. of Classes']);
        this.prompt = this.levelProperties['Prompt'];
        this.class1Sprites = readCSV(this.levelProperties['Class 1 sprites']);
        this.class2Sprites = readCSV(this.levelProperties['Class 2 sprites']);
        this.class3Sprites = readCSV(this.levelProperties['Class 3 sprites']);
        this.class4Sprites = readCSV(this.levelProperties['Class 4 sprites']);
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
        this.load.setBaseURL('http://localhost/');
        

        this.levelData = {
    "objects": [
        {
            "_id": "6380c7ddd09b836a7a78b620",
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

        // Add your code below this line

    }
    update(){

        // Add your code below this line

    }
    destroy(){
        
        // Add your code below this line

    }
}

const scenes = [LevelScene_Title_Screen, LevelScene_DataLevel, LevelScene_Level1, LevelScene_Game_Over_Screen];
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