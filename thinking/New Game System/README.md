# New Game system Thinkpad

We don't need to change much to be honest. Need to give user the control of compiling and running the game.

1. The Phaser scene script should be loaded as one class.
2. Get rid of "Setup", "Each Frame", "Level Destroy" scripts.

Load the phaser library into monaco.

The default scene script should be loaded from a template file. It should have all the methods setup, plus the spriteArray and properties dict.

properties dict should contain the camera size and position.

Template should contain default camera loading script. The canvas should be sized to the camera size.

