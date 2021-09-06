class SplayComponent{

  phaser: any

  ngOnInit(){
    // 1. Init Phaser 
    // 2. Parse the game project
    // 3. Set active level index

    // 4. Initialize EdgeProxy
    (window.EdgeProxy as any).sprites = this.enerateEdgeSprites(this.phaser.activeScene.gameObjects);
    (window.EdgeProxy as any).closeLevel = function(levelName){
      console.log('close level called with levelName', levelName);
    };

    // Run 
  }

  enerateEdgeSprites(gameObjects: any){

  }

}