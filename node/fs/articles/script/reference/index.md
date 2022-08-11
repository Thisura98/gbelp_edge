# Scripting Reference

## Introduction

Welcome to the Scripting Reference documentation page. On this page, you will find information about "Game Scripting". This topic is intended primarily for Teachers, but it is explained in simple terms so anyone can follow along.

Game Scripting allows you to add logic to your games, after its design is created on the Scene Map. Figure 1 shows the interface where you write your scripts.

<figure align="center">
    <img src="<server_path>/fs/articles/script/reference/script_editor.png" width="70%">
    <figcaption>The EDGE Script Editor screen</figcaption>
</figure>


<br/>

## Sprite Referencing

The sprites you setup in the Level scene can be referenced and manipulated in the game script using these steps.

1. Assign a null variable in the scene constructor.
2. In the `create()` method, access the `spriteReferences` object with your sprite name.

- Remember reference your sprite __AFTER__ the `EDGTOKEN_CREATE` token.
- The name of the sprite should be equal to the name shown in the level scene editor.

```js
class LevelScene_Title_Screen extends Phaser.Scene{
    
    constructor(){
        // Step 1
        this.mySprite = null;
    }

    create(){
        // EDGTOKEN_CREATE

        // Step 2
        this.mySprite = this.spriteReferences['sprite_png'];
    }

}
```

<br/>

## Property Referencing

Using the properties tab you can define/edit preferences for your game. Properties allow easy modification of your game for non-technical users.

- In the `create()` method, access the `levelProperties` object with your property name.

- Remember reference properties __AFTER__ the `EDGTOKEN_CREATE` token.
- The name of the property can be used to access it's value.
- Always check for `null` properties before accessing them.

```js
class LevelScene_Title_Screen extends Phaser.Scene{

    create(){
        // EDGTOKEN_CREATE

        if (this.levelProperties['Character Count'] != null){
            let count = Number.parseInt(this.levelProperties['Character Count'])
        }

    }

}
```

<br/>

## Recording Performance

'Objectives' and 'Guidance Trackers' can be used to track a player's performance. They are defined in the Overview tab in the Game/Template editor. 

- Objectives and Guidance Trackers are reset every game, but are not reset on every level.
- In the game code, you can reference these entries using their 'name'. 
- You can record performance anywhere in the scene class.

```js
class LevelScene_Title_Screen extends Phaser.Scene{

    objective1 = 'Collect 10 gold coins';
    tracker1 = 'Unable to collect 1 coin timeout';

    create(){
        EdgeProxy.increaseObjectiveProgress(this.objective1, 1);  // Update Objective
        EdgeProxy.increaseGuidanceProgress(this.tracker1, 0.025); // Update Guidance
    }

}
```

> __IMPORTANT:__ Objectives and Guidance Trackers are referenced by their name in the code. Changing the name or deleting these items without also modifying the code _may_ break the game.