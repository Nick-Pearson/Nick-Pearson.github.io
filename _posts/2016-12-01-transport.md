---
layout: post
tags: ["PC", "Unity", "cs"]
category: "Project Overview"
title: "Project Overview - Transport Game"
---

A Game created for a Youtube tutorial series, focusing on creating a Tycoon style strategy game in Unity. The video series currently has over 41k views on youtube"

![Demo of the dynamic terrain system used for the game](/assets/img/projects/transport.jpg){: .mx-auto.d-block :}

## Gameplay

A Standard top down Real Time Strategy game, similar to games such as OpenTTD and Simutrans. The intention was to add elements from Cities: Skylines, with splines being used for roads and railways. I also wanted to add an infinite procedural terrain so that the player can expand their game at any point.

## Code

Most of the series focused on the procedural terrain and editing system, using the Diamond Square fractal algorithm. A tile system of 9 Unity terrains linked each one together. Diamond Square does not automatically link when two different tiles are generated so I added a system of pre-placed vertices to ensure that the edges of each tile attached seamlessly to it's neighbour.

## Result

Once I began working at Sumo Digital on my placement I no longer had time to make the videos and due to their decreasing popularity I decided to stop making the series. All of the source code used is still available on GitHub for anyone who is interested in continuing.

## Links

*   [Source Code (Github) @fa-external-link ](https://github.com/Nick-Pearson/Transport-Game)
*   [Playlist of Youtube Tutorials @fa-external-link ](https://www.youtube.com/playlist?list=PLbqSTeoMZd-JmdgzeDP5OFeDzDo9xQ1ZW)
