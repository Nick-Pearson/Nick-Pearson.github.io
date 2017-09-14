## Gameplay

You play as a child called *"Dawn"*, playing through her distorted dream world while she is in a coma. She has a jar of fireflies on her back which are her health, when the player is in dark areas the health slowly degrades. Using the eye tracking technology, the player can move items in the world with her mind and create light (e.g. by breaking shutters in front of a window, or lighting a candle). This allows them to progress through the new light areas.

## Code

Although the Tobi eye tracker has a plugin for Unreal Engine it took a lot of work to get the control to work with our game and feel right. We only had a few trackers so this was handled by another programmer on the team.

I worked on the light system, as unreal uses a deffered rendering model we originally thought we could read values from this but it wasn't possible to do on our timeframe. Additionally, it would be difficult to determine the players location in the buffer, and even then they may be lit in places not currently visible to the camera. Instead the system tracked lights in a radius around the player based on the light's settings, it would then regularly look through the local lights and determine their value based on the player's distance. On top of this was collision detection so that when an object passed in front of a light it would block the player from receiving that light's value.

## Result

The game was shown to other Employees and Judges at the end of the two weeks, although it ran and the eye tracking was generally well received there were a few issues. The game was difficult to balance as slight changes by artists / designers could drastically affect the balance of a level. If we had done a full balancing pass on the levels it would have been much better, looking back the light system should have had hard coded values so that visual changes would not affect gameplay.

I really enjoyed the process and the game had an excellent aesthetic, Eurogamer wrote an article about the game jam process and we get a short mention there (see links)

> ***"There's one game with staggering production values that's all the more staggering when you sit down to play it and realise it's controlled entirely by tracking your eyes"***

## Links

* [Eurogamer Article about the Game Jam @fa-external-link ](http://www.eurogamer.net/articles/2017-08-27-inside-sumos-game-jam)
