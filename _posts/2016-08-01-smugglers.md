---
tags: ["UWP", "Unity", "cs"]
category: "Project Overview"
title: "Project Overview - Smuggler's Paradise"
excerpt_separator: <!--more-->
---

A 2D cartoon style space shooter game, in which players could trade items across different planets while dodging obstacles on the way. Spend money upgrading and improving your ship. Created for the Rising Star GameJam round in 2 weeks for Universal Windows Platforms
<!--more-->

<!-- "projects/smugglers/smugglers0.png",
"projects/smugglers/smugglers2.png",
"projects/smugglers/smugglers1.png",
"projects/smugglers/smugglers3.png" -->

## Gameplay

The game is divided into two parts; a menu system which allows you to modify and repair the ship as well as being able to select new missions, and the live game where the player drives the ship to their next destination (dodging various obstacles on the way).

Pressing and holding anywhere on the screen would add thrust to the ship, tapping once would shoot a laser. Swiping left or right would move the ship in that direction. An earlier build included buttons for these controls which can be seen in some screenshots, but this seemed too clunky for a primarily mobile game and hogged a large amount of screen space.

While flying the player had to be careful that their fuel level didn't approach 0 as this would mean they could no longer use the thrusters. They also couldn't hit too many objects otherwise the ship would be destroyed.

## Code

Some key parts of the code:

__[SpacePhysics.cs @fa-external-link ](https://github.com/Nick-Pearson/SmugglersParadise/blob/master/UnityProject/Assets/Scripts/SpacePhysics.cs)__

I created my own basic physics component for the game so I could easily model the ship leaving a planet's atmosphere. It was designed so that the player remained near the origin and objects moved around them to give the impression of movement - this was to avoid floating point issues with the larger planets.

__[Addon.cs @fa-external-link ](https://github.com/Nick-Pearson/SmugglersParadise/blob/master/UnityProject/Assets/Scripts/Addon.cs)__

Generic base class for addons to the ship and some implementations for the game, this might have benefited from Unity's Scriptable Object system so that the implementation of an Addon could be an asset.

__[Mission.cs @fa-external-link ](https://github.com/Nick-Pearson/SmugglersParadise/blob/master/UnityProject/Assets/Scripts/Mission.cs)__

Generic base class for missions, the only implementation I had time for is a cargo delivery mission. I also began to work on serializing the missions to a string for a savegame system but I didn't have time to complete this


## Issues and Improvements

In the core game there were some obvious issues, clearly I had tried to include too many gameplay mechanics.

* When you boot the game it takes at least 4 taps to get into the actual game with many options that confuse first time players. I would change this to jump straight into the game for first time players, only showing the main UI after they complete their first mission.

*  Obstacles were rather dull after the first few, an obvious addition would be to include fuel boosters for the player to collect as they played. These could be
positioned in hard to reach areas to reward more skilled players. This idea could also be extended to give the player extra money.

* Death is not fun. The addition of a better 'Game Over' screen would have helped players understand why they lose. Additionally, when the player ran out of fuel it was up to them to click back - there was no automatic timeout. The addition of a 'lifesaver' item or 'lucky spin' like ones seen in other popular mobile games might have also helped this. This would have been useful for players who made it most of the way through the level but died near the end.

## Result

Despite the numerous issues with my entry I passed through to the final round, and after coming Runner Up was offered a 1 year Placement with Sumo Digital. This was a brilliant chance to learn from some of the top games developers in the UK which has helped me enhance my own personal projects and my university work. At the end of the year I was lucky enough to stay at Sumo for an additional few months to continue working as part of the team there.

I later found out via the Documentary series about the competition that the main reason I had progressed to the final round was due to my code quality.

I've attached some of the feedback from the judges I received during the process. There was a bug in the build sent to judges which I hadn't noticed which crops up several times in the feedback. In the links section you will find a link to the Github clone of the repository, which has the original commits so you may be able to spot the bug fix I implemented after the fact ([Hint @fa-external-link ](https://github.com/Nick-Pearson/SmugglersParadise/commit/7937187d8f180d81c857ae844d56d6f8e4e4e591#diff-5ea3f08ef2c44a17b9b7ad729ff329f8)).

### Judges Feedback

> ***"The game itself is well thought out and has many sophisticated features. The major downfall
> of the game is its lack of intuitiveness, it lacks to inform the player about their goals of the
> game and can very easily lead to them feeling overwhelmed. While I am impressed with how
> technically extensive the game is, the confusing gameplay overshadows it. With an
> introductory piece and the inclusion of tooltips, there is potential. I also encountered a bug
> rendering any other actions impossible.
> that seems to always return me to the same planet despite having enough fuel to do so,
> rendering any other actions impossible."***

There was some confusion with the controls

> ***"I couldn't manage to take off. The idea while reminding me of Elite has
> potential but the implementation just isn't there. The UI is functional but too retro. Plenty of
> features in the design and if we were judging design implementation of the UI it would score
> quite well, but we need a game we can play."***
<!-- -->
> ***"I couldn't figure out taking off and flying to other planets, but otherwise a creative looking
game."***

## Links

*   [Source Code (Github Clone) @fa-external-link ](https://github.com/Nick-Pearson/SmugglersParadise)
*   [Windows Store App Download Page @fa-external-link ](https://www.microsoft.com/en-gb/store/p/smugglers-paradise/9nblggh4qgc4)
*   [Finalists Announcement @fa-external-link ](http://gradsingames.com/search-for-a-star/sfas-rs-2016-finalists/)
*   [Playlist for the Documentary Series @fa-external-link ](https://www.youtube.com/playlist?list=PLV395U2mwlfLyXmpR8hIFUro0pBrpOE5n)
