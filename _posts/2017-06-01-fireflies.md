---
layout: post
tags: ["Game Development", "C++", "Unreal Engine"]
category: "Project Overview"
title: "Project Overview - Dawn of the Fireflies"
---

A dark and moody 3rd person puzzle platformer game using a [Tobii](https://tobiigaming.com/) eye tracking device as an input method. I worked on this in a team of 6 as a part of the 2 week internal studio game jam whilst at Sumo Digital

![Corridor with volumetrics](/assets/img/projects/fireflies/corridor0.jpg){: .mx-auto.d-block :}
![Corridor old wardrobes and sofas](/assets/img/projects/fireflies/corridor1.jpg){: .mx-auto.d-block :}

## Gameplay

You play as a child called *"Dawn"*, playing through her distorted dream world while she is in a coma. She has a jar of fireflies on her back which are her health, when the player is in dark areas the health slowly degrades. Using the eye tracking technology, the player can move items in the world with her mind and create light (e.g. by breaking shutters in front of a window, or lighting a candle). This allows them to progress through the new light areas.

![Dawn in the library](/assets/img/projects/fireflies/library0.jpg){: .mx-auto.d-block :}
![Moving lights in the library](/assets/img/projects/fireflies/library1.jpg){: .mx-auto.d-block :}

## Code

I worked on the light system, tracking lights in a radius around the player based on the light's settings. As the light moved further away or became irrelevant to the player it would no longer be considered. Each frame the system would then look through the relevant lights and determine their value based on the player's distance. On top of this was collision detection so that when an object passed in front of a light it would block the player from receiving that light's value. This meant as the player moved in and out of shadows they would receive varying levels of light, this was to enable a swinging chandelier puzzle that unfortunately we didn't have time to build.

The Tobi eye tracker had a plugin for Unreal Engine, however it took a considerable amount of work to get the control to function with our game and feel right as you played. We only had a few trackers so this was handled mainly by the other programmer on the team who owned a tracker.

## Result

The game was shown to other Employees and Judges at the end of the two weeks, the eye tracking and visual style were very well received but there were a few issues. The game was difficult to balance as slight changes by artists / designers could drastically affect the balance of a level. If we had done a full balancing pass on the levels it would have been much better, looking back the light system should have had hard coded values so that visual changes could be made without drastically changing gameplay.

I really enjoyed the process and the game had an excellent aesthetic, [Eurogamer wrote an article about the game jam](http://www.eurogamer.net/articles/2017-08-27-inside-sumos-game-jam) process and we get a short mention there

> ***"There's one game with staggering production values that's all the more staggering when you sit down to play it and realise it's controlled entirely by tracking your eyes"***