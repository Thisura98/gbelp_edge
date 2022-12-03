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
                "y": 134,
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
		const sprite_2 = this.add.sprite(450, 184, 'title').setInteractive();
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

class FillHelper{
    /**
     * @param grid {Cell[][]} The grid with null spaces to fill in
     * @param nClasses {number} The number of classes
     * @param boardX {number}
     * @param boardY {number}
     * @param boardWidth {number}
     * @param spriteClasses {string[][]} Array of array of sprites for each class
     * @param cell {Cell} The cell to assign texture to based on cell.type
     * @param scene {Phaser.Scene}
     * @returns {Cell[]} The newly added cells
     */
    static fillInNull(
        grid, 
        nClasses,
        boardX,
        boardY,
        boardWidth,
        spriteClasses,
        scene
    ){
        const gridSize = grid.length;
        const spacing = Helper.getSpacing();
        const cellSize = (boardWidth - (spacing * (gridSize + 1))) / gridSize;

        /**
         * @type {Cell[]}
         */
        let newCells = [];
        let stableGridFound = false;

        const shallowCopy = FillHelper.getGridFilledShallowCopy(grid, nClasses, newCells);
        let generationIterations = 0;
        
        while(!stableGridFound || (generationIterations < 20)){
            const matches = MatchHelper.getAllMatches(shallowCopy);

            if (matches.length == 0){
                stableGridFound = true;
            }
            else{
                for (let newCell of newCells){
                    const newClassIndex = Helper.getRandomClass(nClasses);
                    newCell.type = newClassIndex;
                }
            }

            console.log('fillInNull generation: iteration =', generationIterations, 'stable? =', stableGridFound);
            generationIterations += 1;
        }

        // Add the new cells to the actual grid
        for (let newCell of newCells){
            grid[newCell.y][newCell.x] = newCell;
            Helper.addSpriteToCell(
                spacing,
                cellSize,
                boardX,
                boardY,
                spriteClasses,
                newCell, 
                scene
            );
        }

        return newCells;
    }

    /**
     * @param originalGrid {Cell[][]} The original grid
     * @param nClasses {number} number of classes
     * @param newCells {array} The out array for the new cells
     * @returns with no sprites
     */
    static getGridFilledShallowCopy(originalGrid, nClasses, newCells){
        /**
         * @type {Cell[][]}
         */
        let newGrid = [];
        const gridSize = originalGrid.length;

        for(let i = 0; i < gridSize; i++){
            /**
             * @type {Cell[]}
             */
            let row = []

            for(let j = 0; j < gridSize; j++){
                const cell = originalGrid[i][j];
                if (cell == null){
                    // Create the new cells
                    const sClassIndex = Helper.getRandomClass(nClasses);
                    const newCell = new Cell(j, i, sClassIndex, null);
                    row.push(newCell);
                    newCells.push(newCell);
                }
                else{
                    const newCell = new Cell(cell.x, cell.y, cell.type, null);
                    row.push(newCell);
                }
            }
            newGrid.push(row);
        }
        return newGrid;
    }

    /**
     * @param grid {Cell[][]} The grid with null spaces to fill in
     * @param targetX {number} The X of the null
     * @param targetY {number} The Y of the null
     */
    static bestClassForCell(grid, targetX, targetY){
        const gridSize = grid.length;
        let c = new Map();
        let smallestFrequentClass = '';
        let smallestClassFrequency = -1;

        /**
         * @type { (cell: Cell | null) => void }
         */
        const addClass = (cell) => {
            if (cell != undefined && cell != null){
                const str = cell.type;
                c.set(str, c.has(str) ? (c.get(str) + 1) : 1 );
            }
        }

        if (targetY > 0){
            addClass(grid[targetY - 1][targetX]);
        }
        if (targetX < (gridSize - 1)){
            addClass(grid[targetY][targetX + 1]);
        }
        if (targetY < (gridSize - 1)){
            addClass(grid[targetY + 1][targetX]);
        }
        if (targetX > 0){
            addClass(grid[targetY][targetX - 1]);
        }

        c.forEach((freq, type) => {
            if (smallestClassFrequency == -1 || freq < smallestClassFrequency){
                smallestClassFrequency = freq;
                smallestFrequentClass = type;
            }
        });

        return smallestFrequentClass;
    }
}

class ShuffleHelper{

    /**
     * @param grid {Cell[][]} The grid to shuffle
     * @param nClasses {number} The number of classes in the grid
     * @returns {Cell[][] | false} The shuffled grid with no matches, or false if shuffle fails
     */
    static shuffleUntilNoMatches(grid, nClasses){
        let matchesFound = true;
        let shuffleTries = 0;
        let shuffleTryLimit = 4;

        while(matchesFound){
            matchesFound = false;
            if (shuffleTries > shuffleTryLimit){
                return false;
            }

            console.log('Shuffling: Try =', shuffleTries);

            const horizontalMatches = MatchHelper.search(grid, true);
            if (horizontalMatches.length > 0){
                ShuffleHelper.computeShuffle(grid, horizontalMatches, nClasses, true);
                matchesFound = true;
            }

            const verticalMatches = MatchHelper.search(grid, false);
            if (verticalMatches.length > 0){
                ShuffleHelper.computeShuffle(grid, verticalMatches, nClasses, false);
                matchesFound = true;
            }

            shuffleTries += 1;
        }

        console.log('Found state with no matches!');

        return grid;
    }

    /**
     * @param grid {Cell[][]} The grid to shuffle
     * @param matches {Cell[][]} The matches
     * @param nClasses {number} The number of classes
     * @param horizontal {boolean} Are we shuffling horizontally?
     */
    static computeShuffle(grid, matches, nClasses, horizontal){
        for(let m of matches){
            if(m.length == 3){
                // !horizontal because:
                // Horizontal groups need to be shuffled vertically
                // vertical groups need to be shuffled horizontally.
                const index = Math.floor(Math.random() * 3) % 3;
                ShuffleHelper.swap(grid, m[index], !horizontal);
            }
            else if(m.length < 6){
                const randPosition = Math.round(Math.random() * m.length);
                const randClass = Math.round(Math.random() * nClasses);
                m[randPosition] = randClass;
            }
            else{
                const randPosition1 = Math.round(Math.random() * m.length);
                const randPosition2 = Math.round(Math.random() * m.length);
                const randClass = Math.round(Math.random() * nClasses);
                m[randPosition1] = randClass;
                m[randPosition2] = randClass;
            }
        }
    }

    /**
     * Swaps a cell with a randmon adjacent cell
     * @param grid {Cell[][]} The grid to shuffle
     * @param cell {Cell} The source cell to consider for swapping
     * @param horizontallySwap {boolean} If true horizontally, if false vertical
     */
    static swap(grid, cell, horizontallySwap){
        const gridSize = (grid.length - 1);
        const sourceX = cell.x;
        const sourceY = cell.y;
        let targetX = sourceX;
        let targetY = sourceY;

        const newValue = (source) => {
            return source == 0 ? (Math.round(Math.random() * gridSize)) : (source - 1);
        }

        if (horizontallySwap){
            targetX = newValue(sourceX);
        }
        else{
            targetY = newValue(sourceY);
        }

        console.log(`Swapping (h? = ${horizontallySwap}) (${sourceX}, ${sourceY}) with (${targetX}, ${targetY})`);

        ShuffleHelper.swapWith(grid, cell, targetY, targetY);
    }

    /**
     * @param grid {Cell[][]} The initial grid
     * @param cell {Cell} The source cell
     * @param targetX {number} The x index of the cell to swap with
     * @param targetY {number} The y index of the cell to swap with
     */
    static swapWith(grid, cell, targetX, targetY){

        const targetItem = grid[targetY][targetX];

        const sourceX = cell.x;
        const sourceY = cell.y;
        targetItem.x = sourceX;
        targetItem.y = sourceY;
        cell.x = targetX;
        cell.y = targetY;

        grid[targetY][targetX] = cell;
        grid[sourceY][sourceX] = targetItem;

        if (targetItem.sprite != undefined && cell.sprite != undefined){
            const targetPosX = targetItem.sprite.x;
            const targetPosY = targetItem.sprite.y;
            targetItem.sprite.x = cell.sprite.x;
            targetItem.sprite.y = cell.sprite.y;
            cell.sprite.x = targetPosX;
            cell.sprite.y = targetPosY;
        }
    }

}

class MatchHelper{
    /**
     * @param grid {Cell[][]} The grid to search
     * @returns {Cell[][]} All the matches as an array of matches
     */
    static getAllMatches(grid){
        let searches = [];
        searches = searches.concat(MatchHelper.search(grid, true));
        searches = searches.concat(MatchHelper.search(grid, false));
        return searches;
    }

    /**
     * @param grid {Cell[][]} The grid to search
     * @param horizontal {boolean} Searching horizontally or vertically?
     * @returns {Cell[][]} Array of groups of cells
     */
    static search(grid, horizontal){
        const size = grid.length;
        const sizeLimit = 3;
        let result = [];

        for(let i = 0; i < size; i++){
            let lastChar = '-1';
            let setsOfItemsInLine = [];
            let sameIndices = [];
            let sameCount = 0;

            for(let j = 0; j < size; j++){
                let x = horizontal ? j : i;
                let y = horizontal ? i : j;

                let cell = grid[y][x];
                let item = cell.type;

                if (lastChar == '-1' || lastChar != item){
                    if (sameCount >= sizeLimit){
                        setsOfItemsInLine.push(sameIndices);
                    }

                    sameIndices = [];
                    sameCount = 1;
                    sameIndices.push(cell);
                }
                else if(lastChar == item){
                    sameCount += 1;
                    sameIndices.push(cell);

                    if (j == size - 1 && sameCount >= sizeLimit){
                        setsOfItemsInLine.push(sameIndices);
                    }
                }

                // console.log(i, '::', lastChar, 'v', item, ':', sameCount, 'arr =', sameIndices);

                lastChar = item;
            }
            result = result.concat(setsOfItemsInLine);
        }

        console.log('Final Matches h =', horizontal, '=', result);

        return result;
    }
}

class Helper{

    static getSpacing(){
        return 10;
    }

    /**
     * @param nClasses {number} Number of random classes
     * @returns a random class index
     */
    static getRandomClass(nClasses){
        return Math.round(Math.random() * 10) % nClasses;
    }

    /**
     * @param size {number}
     * @param boardX {number}
     * @param boardY {number}
     * @param boardWidth {number}
     * @param nClasses {number}
     * @param spriteClasses {string[][]}
     * @param scene {Phaser.Scene}
     * @returns The Grid (rows x columns)
     */
    static createGrid(
        size,
        boardX,
        boardY,
        boardWidth,
        nClasses,
        spriteClasses,
        scene
    ){
        const spacing = Helper.getSpacing();
        const cellSize = (boardWidth - (spacing * (size + 1))) / size;

        /**
         * @type {Cell[][]}
         */
        let grid = [];

        // : Step 1: Create the initial grid with random classes
        // (rows x columns)
        for(let i = 0; i < size; i++){
            let colSprites = [];
            for(let j = 0; j < size; j++){
                const sClassIndex = Helper.getRandomClass(nClasses);
                // const cell = new Cell(j, i, sClassIndex, sprite);
                const cell = new Cell(j, i, sClassIndex, undefined);
                colSprites.push(cell);
            }
            grid.push(colSprites);
        }

        console.log('Finalized Grid =', grid);

        // Test Code
        // const matches = MatchHelper.getAllMatches(grid);
        // console.log('Obvious Matches:');
        // console.log(matches);

        // : Step 2: Shuffle the board until the initial state doesn't have any matches
        const noMatchesOrFalse = ShuffleHelper.shuffleUntilNoMatches(grid);
        if (noMatchesOrFalse == false){
            // retry with a different board.
            return Helper.createGrid(size, boardX, boardY, boardWidth, nClasses, spriteClasses, scene);
        }

        // : Step3: Create the sprites with the finalized board
        for (let row of grid){
            for (let cell of row){
                Helper.addSpriteToCell(
                    spacing,
                    cellSize,
                    boardX,
                    boardY,
                    spriteClasses,
                    cell,
                    scene
                );
            }
        }

        return grid;
    }

    /**
     * @param spacing {number}
     * @param cellSize {number}
     * @param boardX {number}
     * @param boardY {number}
     * @param spriteClasses {string[][]} Array of array of sprites for each class
     * @param cell {Cell} The cell to assign texture to based on cell.type
     * @param scene {Phaser.Scene}
     */
    static addSpriteToCell(
        spacing,
        cellSize,
        boardX,
        boardY,
        spriteClasses,
        cell, 
        scene
    ){
        const sClassItemsArr = spriteClasses[cell.type];
        const nItems = sClassItemsArr.length;
        const itemIndex = Math.round(Math.random() * 10) % nItems;
        const itemTextureName = sClassItemsArr[itemIndex];

        // console.log(i, j, 'texture =', itemTextureName);

        const sprite = scene.add.sprite(0, 0, itemTextureName);
        const i = cell.y;
        const j = cell.x;
        const x = boardX + (j * cellSize) + (spacing * (j + 1));
        const y = boardY + (i * cellSize) + (spacing * (i + 1));
        sprite.x = x;
        sprite.y = y;
        sprite.setOrigin(0, 0);
        sprite.setDisplaySize(cellSize, cellSize);
        
        cell.sprite = sprite;
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

        this.points = 0;

        // MARK: Properties

        this.requiredScore = 0;
        this.scorePerMatch = 0;
        this.gridSize = 7;
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

        // MARK: END: Properties

        /**
         * @type {Phaser.GameObjects.Sprite}
         */
        this.containerSprite;

        /**
         * @type {Cell}
         */
        this.firstSelectedCell;
        /**
         * @type {Cell}
         */
        this.secondSelectedCell;
        
        /**
         * @type {Phaser.GameObjects.Text}
         */
        this.pointsText;
        /**
         * @type {Phaser.GameObjects.Sprite}
         */
        this.cupSprite;
        /**
         * @type {Phaser.GameObjects.Text}
         */
        this.requiredPointsText;
        /**
         * @type {Phaser.GameObjects.Text}
         */
        this.promptText;

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
		this.load.image('board', 'fs/res_upload/image/3d93c48b-71a4-487b-9163-4c558c40e163.png');
		this.load.image('container', 'fs/res_upload/image/a6b6e23d-1734-4dd5-8a28-d9749eae5037.png');
		this.load.image('cup', 'fs/res_upload/image/2472f990-7ce0-4cdc-aef9-4eb5ac560dd4.webp');
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
            "name": "board",
            "frame": {
                "x": 205.00000000000003,
                "y": 5,
                "w": 490.49999999999994,
                "h": 490.5
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
            "name": "container",
            "frame": {
                "x": 211.99999999999997,
                "y": 12.000000000000057,
                "w": 476.00000000000006,
                "h": 476.00000000000006
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
            "_id": "temp_1670093293530",
            "spriteResourceId": "638b99dacd3e94cf5f20591b",
            "type": "sprite",
            "name": "cup",
            "frame": {
                "x": 5,
                "y": 715,
                "w": 35.5,
                "h": 35.5
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
    "Score Per Tile Match": 30,
    "Required Score": 300,
    "Grid Size": 5,
    "No. of Classes": 3,
    "Class 1 sprites": "gas1",
    "Class 2 sprites": "plasma1",
    "Class 3 sprites": "solid1",
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


		// --- scene object board ---
		const sprite_11 = this.add.sprite(450.25, 250.25, 'board').setInteractive();
		sprite_11.name = "board";
		scaleX = 490.49999999999994 / sprite_11.displayWidth;
		scaleY = 490.5 / sprite_11.displayHeight;
		sprite_11.setScale(scaleX, scaleY);
		this.spriteReferences['board'] = sprite_11;


		// --- scene object container ---
		const sprite_12 = this.add.sprite(450, 250.00000000000009, 'container').setInteractive();
		sprite_12.name = "container";
		scaleX = 476.00000000000006 / sprite_12.displayWidth;
		scaleY = 476.00000000000006 / sprite_12.displayHeight;
		sprite_12.setScale(scaleX, scaleY);
		this.spriteReferences['container'] = sprite_12;


		// --- scene object cup ---
		const sprite_13 = this.add.sprite(22.75, 732.75, 'cup').setInteractive();
		sprite_13.name = "cup";
		scaleX = 35.5 / sprite_13.displayWidth;
		scaleY = 35.5 / sprite_13.displayHeight;
		sprite_13.setScale(scaleX, scaleY);
		this.spriteReferences['cup'] = sprite_13;



        // Add your code below this line
        this.containerSprite = this.spriteReferences['container'];
        this.readProperties();
        this.createGrid();
        this.updatePoints();
        this.updatePrompt();
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

        this.requiredScore = Number.parseInt(this.levelProperties['Required Score']);
        this.scorePerMatch = Number.parseInt(this.levelProperties['Score Per Tile Match']);
        this.gridSize = Number.parseInt(this.levelProperties['Grid Size']);
        this.nClasses = Number.parseInt(this.levelProperties['No. of Classes']);
        this.prompt = this.levelProperties['Prompt'];
        this.class1Sprites = readCSV(this.levelProperties['Class 1 sprites']);
        this.class2Sprites = readCSV(this.levelProperties['Class 2 sprites']);
        this.class3Sprites = readCSV(this.levelProperties['Class 3 sprites']);
        this.class4Sprites = readCSV(this.levelProperties['Class 4 sprites']);
    }

    updatePoints(){

        // Player Score
        const scoreText = `Score: ${this.points}`;
        if (this.pointsText == undefined){
            this.pointsText = this.add.text(10, 10, scoreText, {
                fontFamily: 'Arial',
                fontSize: '30px',
                color: '#FFFFFF'
            })
        }
        else{
            this.pointsText.setText(scoreText);
        }

        // Required Score
        const requiredScoreText = `${this.requiredScore}`;
        if (this.cupSprite == undefined || this.requiredPointsText == undefined){
            this.cupSprite = this.add.sprite(10, 50, 'cup');
            this.cupSprite.setOrigin(0, 0,);
            this.cupSprite.setDisplaySize(30, 30);

            this.requiredPointsText = this.add.text(50, 50, requiredScoreText, {
                fontFamily: 'Arial',
                fontSize: '20px',
                color: '#FFFFFF'
            })
        }

    }

    updatePrompt(){
        if (this.promptText == undefined){
            const cameraWidth = this.cameras.main.displayWidth;
            const cameraHeight = this.cameras.main.displayHeight;
            const spacing = 10;
            const width = cameraWidth - this.spriteReferences['board'].getBottomRight().x - 30;

            this.promptText = this.add.text(
                cameraWidth - spacing, 
                cameraHeight - spacing, 
                this.prompt, 
                {
                    fontFamily: 'Arial',
                    fontSize: '15px',
                    color: '#FFFFFF',
                    // fixedWidth: width,
                    align: 'right',
                    wordWrap: {
                        width: width
                    }
                }
            );
            this.promptText.setOrigin(1.0, 1.0);
        }
    }

    /**
     * @returns {string[][]}
     */
    getSpriteClasses(){
        return [
            this.class1Sprites,
            this.class2Sprites,
            this.class3Sprites,
            this.class4Sprites
        ];
    }

    createGrid(){
        const size = this.gridSize;
        const board = this.containerSprite;
        const boardTopLeft = board.getTopLeft();
        const spriteClasses = this.getSpriteClasses();

        this.grid = Helper.createGrid(
            size,
            boardTopLeft.x,
            boardTopLeft.y,
            board.displayWidth,
            this.nClasses,
            spriteClasses,
            this
        );

        for (let cellRow of this.grid){
            for(let cell of cellRow){
                this.attachSpriteActions(cell);
            }
        }
    }

    /**
     * @param cell {Cell}
     */
    attachSpriteActions(cell){
        /**
         * @type {Phaser.GameObjects.Sprite}
         */
        const sprite = cell.sprite;
        sprite.setInteractive();
        sprite.on('pointerup', () => {
            sprite.setTint(0xFFA500);
            console.log('Setting tint!');

            if (this.firstSelectedCell == undefined){
                this.firstSelectedCell = cell;
            }
            else if (this.firstSelectedCell === cell){
                sprite.clearTint();
                this.firstSelectedCell = undefined;
            }
            else{
                this.secondSelectedCell = cell;
                this.evaluateMatches();
            }
        });
    }

    fadeIn(cell){
        /**
         * @type {Phaser.GameObjects.Sprite}
         */
        const sprite = cell.sprite;
        sprite.alpha = 0;

        this.tweens.add({
            targets: sprite,
            alpha: { value: 1, duration: 1000, ease: 'Power 1' }
        });
    }

    /**
     * Check for any matches between the two selected cells;
     */
    evaluateMatches(){
        console.log(this.firstSelectedCell);
        console.log(this.secondSelectedCell);

        const cell1 = this.firstSelectedCell;
        const cell2 = this.secondSelectedCell;

        const originalX = cell1.x;
        const originalY = cell1.y;
        const targetX = cell2.x;
        const targetY = cell2.y;

        ShuffleHelper.swapWith(this.grid, cell1, targetX, targetY);

        /**
         * @type {Array[]}
         */
        let matches = MatchHelper.getAllMatches(this.grid);
        // let matchContainingCell = matches.find(arr => arr.find(mCell => mCell === cell1));

        // Important Note:
        // This logic does not check if the cells are contained
        // in the returned matches.
        //
        // So if previous matches are not discarded properly, then
        // you can potentially swap any cell.
        //
        // Maybe change this in future version?

        if (matches.length > 0){
            // TODO:
            // Remove the sprites (done)
            // Add the points (done)
            // Move the rest of the sprites down
            // Add new sprites

            cell2.sprite.clearTint();
            this.firstSelectedCell = undefined;
            this.secondSelectedCell = undefined;

            this.removeGridCells(matches);
            this.addPoints(matches);
            this.fillNullSprites();

            // demo code

            // cell1.sprite.clearTint();
            // cell2.sprite.clearTint();

            // this.firstSelectedCell = undefined;
            // this.secondSelectedCell = undefined;
        }
        else{
            ShuffleHelper.swapWith(this.grid, cell1, originalX, originalY);
            cell1.sprite.clearTint();
            cell2.sprite.clearTint();

            this.firstSelectedCell = undefined;
            this.secondSelectedCell = undefined;
        }
    }

    /**
     * @param matches {Cell[][]} The array of groups of cells that matched
     */
    removeGridCells(matches){
        for (let group of matches){
            for (let cell of group){
                /**
                 * @type {Phaser.GameObjects.Sprite}
                 */
                const sprite = cell.sprite;
                // sprite.removeFromDisplayList();
                sprite.destroy();

                this.grid[cell.y][cell.x] = null;
            }
        }

        console.log(this.grid);
    }

    /**
     * @param matches {Cell[][]} The array of groups of cells that matched
     */
    addPoints(matches){
        let matchCombo = 0;
        for (let group of matches){
            for (let cell of group){
                matchCombo += 1;
            }
        }

        this.points += matchCombo * this.scorePerMatch;
        this.updatePoints();
    }

    /**
     * Fill in the null sprites
     */
    fillNullSprites(){
        const size = this.gridSize;
        const board = this.containerSprite;
        const boardTopLeft = board.getTopLeft();
        const spriteClasses = this.getSpriteClasses();

        /**
         * @type {Cell[]}
         */
        const newCells = FillHelper.fillInNull(
            this.grid,
            this.nClasses,
            boardTopLeft.x,
            boardTopLeft.y,
            board.displayWidth,
            spriteClasses,
            this
        );

        newCells.forEach(cell => {
            this.attachSpriteActions(cell);
            this.fadeIn(cell);
        });
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