## Gameplay

Players run in an infinate world, collecting Items and avoiding deadly hazards. Collecting enough Milk will power up the cow for a short burst of high speed, collecting coins will allow upgrades in a shop after the game. The aim is to get the highest score - which is based on the Player's distance and speed.

The game was played as a Facebook app so features such as high scores could be shared between friends.

## Code

This game was developed before full Facebook support was added to Unity so most of my work was focused there. Additionally a lack of a proper JSON library made it difficult to use the Facebook API in game. Both of these problems had been solved in later versions of Unity but in this case it was not possible.

The game was originally targetted for Flash player (in the time when Flash player was still trusted to be on most machines) and Unity Web Player. The Flash player suffered considerable lag during garbage collection which was mitigated by the pooling of many assets for reuse as they went off screen.
