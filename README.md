# Assignment 3: Asteroids

EECS 493 Fall 2022

Released: **9/20/2022**

Due: **10/9/2022** at 11:59pm

**Submission Instructions:** Please submit your work to Canvas as a zip file, named "a3\_\<your\_uniq\_name\>.zip." Please keep the existing folders but feel free to add more folders or files (e.g., js or css). All files, except index.html, should be in folders_. Not following the upload instruction will result in a penalty_.

- Rename the "a3\_starter\_code" folder, which **contains the code you write** , including the index.html and other folders, into a3\_\<your\_uniq\_name\>.
- Zip the folder and upload the zip file. Renaming (e.g., "-1") done by Canvas is fine.

**Objective:** The objective of this assignment is for you to gain practical experience in building interactive user interfaces with JavaScript/jQuery. No external library (other than jQuery) is allowed unless instructed to do so.

See this video for a project overview: [https://drive.google.com/file/d/1j\_2WikiJxMeg8YounuwQJmJ2mIC1upud/view?usp=sharing](https://drive.google.com/file/d/1j_2WikiJxMeg8YounuwQJmJ2mIC1upud/view?usp=sharing)

**Instructions:** We would like you to create a digital "Asteroids" game as outlined in the attached spec below. The application has 10 main components (denominator of 150 points):

1. Asteroids spawn randomly from different directions _- 25 points_
2. Shields and portals spawn at certain time intervals _- 15 points_
3. A rocket (controlled by the user) whose goal is to travel through portals _- 15 points_
4. A scoreboard _- 5 points_
5. A landing page _- 25 points_
6. A settings panel _- 25 points_
7. A game over page - _15 points_
8. A "How to play" page - _15 points_
9. A "Get Ready" splash screen - _5 points_
10. Sounds - _5 points_

**Starter code** : you will use the starter code we provide to finish this assignment: [https://drive.google.com/file/d/1LG6cVMPSqAih7g4Kuu-tX6i-Ie6X5Qr\_/view?usp=sharing](https://drive.google.com/file/d/1LG6cVMPSqAih7g4Kuu-tX6i-Ie6X5Qr_/view?usp=sharing)

The starter code includes the following:

- The base containers for the game window and scoreboard
- Asteroids that are randomly generated and travels linearly across the gameboard (Refer to section "Asteroids spawn randomly from different directions" for more information)
- Other relevant variables and helper functions

Remarks:

- You aren't required to use any part of the starter code, but it's there to help you.

- Please refer to Piazza for any modifications and clarifications.
- Make sure that your application (webpage) behaves properly on the latest version of [Google Chrome](https://www.google.com/chrome/). Your graders will use Chrome.

## **Contents of This Spec**

- [Blaster Game Demo](#_heading=h.9akqt6kxu6hc)
- [Assignment 2 Feature Requirements](#_heading=h.vivweaup924w)
- [Assignment 2 Common Hints and Tips](#_heading=h.7nep75th5xdd)

## **Blaster Game Demo**

Before starting with this assignment, we recommend that you check out this demo on creating a game with JavaScript. The starter code is quite similar to the code in this assignment, and this demo will walk you through some starter code as well as some common functionality. The demo is about 45 minutes and will make your progress in this assignment much easier!

Blaster Game Video: (Consider downloading for better quality! Captions have been added also.) [https://drive.google.com/file/d/1ttQV8\_Wzm37cXrbEYuBXPAixG\_UzQNFZ/view?usp=sharing](https://drive.google.com/file/d/1ttQV8_Wzm37cXrbEYuBXPAixG_UzQNFZ/view?usp=sharing)

Blaster Game Starter Code: [https://drive.google.com/file/d/1r5YC7vx\_9l5GBzTYRpGE-5ewFbGN12Lk/view?usp=sharing](https://drive.google.com/file/d/1r5YC7vx_9l5GBzTYRpGE-5ewFbGN12Lk/view?usp=sharing)

## **Requirements**

We outline requirements for each of the game components below. **Everything listed below,** _ **unless** _ **labeled as "Suggested", is required**. The demo video & screenshots may be helpful in understanding the game; however, **your game does** _ **NOT** _ **need to look exactly like them.** You are allowed to change anything in "index.html", "index.css", and "page.js".

1. **General**
  1. Do all styling/layout in a separate CSS file, index.css. _-10 points off if not followed_.
  2. Do all JavaScript code in a separate JS file, page.js. _-10 points off if not followed._
  3. Use relative paths for images. _-10 points off if not followed._

**The Game (Mainly JavaScript)**

1. **Asteroids spawn randomly from different directions** _- 25 points_
  1. They should appear randomly from the side of the board, move through the board linearly, and disappear once they reach the other side of the board.
  2. Both the start and end location of the asteroid should be random.
  3. The speed and spawn rate of the asteroids change depending on the difficulty.
    - Easy:
      - Spawn rate: every 1000 milliseconds
      - Speed: 1x
    - Medium:
      - Spawn rate: every 800 milliseconds
      - Speed: 3x
    - Hard:
      - Spawn rate: every 600 milliseconds
      - Speed: 5x
  4. The exact speed for each difficulty is up to you.
  5. At the beginning of the game, the asteroid's speed for medium should be 3 times faster than the asteroid's speed for easy, and the asteroid's speed for hard should be 5 times faster than the asteroid's speed for easy.
  6. Every time the level increases (i.e. when the player goes through a portal), the asteroid's speed increases by a certain constant multiple.
    - You may choose whether the speed of the already-existing asteroids increases or not. But the speed of the newly-created asteroids (i.e. asteroids that are about to appear) has to increase.
  7. You can implement the asteroids to have the same speed, or have them so that they all reach their destination in the same amount of time. Either is fine.
  8. The asteroids can overlap each other on the board.
  9. _To save you time, requirements (a), (b), (g) are already implemented and the remaining can be easily implemented using the Asteroid class_ 🙂_._
  10. Suggested Style
    - height: 62px
    - width: 62px

1. **Shields and portals appear at certain time intervals** _- 15 points_
  1. A portal spawns every 20 seconds and disappears 5 seconds after it was spawned.
  2. A shield spawns every 15 seconds and disappears 5 seconds after it was spawned.
  3. The location of the portal and shield on the board is random and should be contained entirely within the dimensions of the board.
  4. It is okay for the portals and shields to appear over the scoreboard.
  5. The asteroids, portals, shields, and player should all roughly appear to be around a similar size.

1. **A rocket (controlled by the user) whose goal is to travel through portals** _- 15 points_
  1. The rocket should not be able to be moving "behind the scenes" when it is not visible on the screen (i.e., when it is not on the gameplay page).
  2. The rocket moves up/down/left/right, controlled by the keyboard arrow keys.
  3. The player can only move within the game board and should not be able to exit the board.
  4. When the rocket comes into contact with an asteroid without a shield:
    - Change the player gif to "player\_touched.gif" and play the "die" audio.
    - The player and all asteroids should immediately stop moving, and stay at their current position for 2 seconds.
    - Then, transition to the "game over" page.
  5. When the rocket comes into contact with an asteroid with a shield:
    - The player loses the shield (and the asteroid can be removed)
    - The game continues unless the player comes into contact with an asteroid without a shield
  6. When the rocket comes into contact with a shield:
    - The player obtains a shield.
    - The gif of the player now has a shield on.
    - Play sound for when the player collects an item.
  7. When the rocket comes into contact with a portal:
    - The level increases by 1
    - The asteroid's speed increases by 0.2x.
    - The danger increases by 2.
    - Play sound for when the player collects an item.
  8. When you hold down an arrow key, the player should keep moving in that direction until you stop holding down the key.
  9. The player should be able to move in two directions at the same time, such as moving left and down from pressing the left and down arrow keys. Basically, you should be able to move in diagonal directions.
    - You do _not_ need to worry about what happens when the player presses 2 keys with opposite directions or more than 2 keys simultaneously.
  10. When the player is moving in a particular direction:
    - The blinking light of the spaceship/player should be pointing in that direction.
    - This can be done by using different player gifs for each of the directions.
    - If the player is moving diagonally, pick one direction the blinking light should point towards.
  11. The exact speed of the player is up to you but it should be consistent in all directions.
    - You may choose whether the speed of the diagonal directions to be the same or different from the non-diagonal directions.

1. **A scoreboard** _- 5 points_
  1. The scoreboard (on the top right) should always be visible during the gameplay.
  2. It should not be visible on other pages of the game.
  3. It is okay for game items to appear over the scoreboard.
  4. A "Score" label with the current score, which starts at 0 and increases by 40 every 500 milliseconds the player stays alive.
  5. A "Danger" label:
    - It should start at a different number depending on the difficulty:
      - Easy: 10
      - Medium: 20
      - Hard: 30
    - Everytime the player travels through a portal, "Danger" increases by 2
  6. A "Level" label with that count, which starts at 1 and increases by 1 everytime the player travels through a portal

**Style (Mainly HTML/CSS)**

1. **A landing page** _- 25 points_
  1. Main Components
    - a background image
    - an "Asteroids" header
    - two buttons, "Play game!" and "Settings", that transition to the correct corresponding screen when clicked
  2. Required Style
    - When you first load the HTML page, the landing page should be shown.
    - Use the background as it appears from the [screenshot](#_heading=h.9l2ds68nemrt) above.
    - Header should be at the top and the text should be horizontally centered
    - Asteroid gifs should appear on the left and right side of the header; they should also have the same height as the header while retaining their original width/height ratio
    - Both buttons must appear within the game's border and be horizontally centered and aligned
    - Text in the buttons should be horizontally and vertically centered
    - There should be some space between the first button and the bottom of the header and some space between the two buttons
  3. Suggested Style
    - Header:
      - width: 100%
      - height: 100px
      - background color: darkslateblue
      - border bottom: 6px
      - border bottom style: groove
      - font size: 100px
      - font color: white
    - Button:
      - width: 200px
      - height: 100px
      - background color: darkslateblue
      - font size for text in buttons: 40px

1. **A settings panel** _- 25 points_
  1. Main Components
    - 3 headings ("Settings", "Volume:", "Difficulty")
    - a slider under the "Volume:" heading to adjust the volume of the game
      - Default: 50
    - 3 buttons under the "Difficulty" heading to select the difficulty level
      - Default: Normal
    - a close button that transitions back to the landing page
    - (Settings should stay the same after closing the panel!)
  2. Required Style
    - The Settings Panel
      - should have
        1. width: 600px;
        2. height: 690px;
      - should be displayed within the game's border
      - should be centered both vertically and horizontally
    - All 3 headings (i.e. "Settings", "Volume:", "Difficulty") should be bolded and horizontally centered
      - Remark: The volume number, e.g. 50, is NOT bolded
    - The slider has a range of 1 to 100 (inclusive). As the player drags around the slider, the current volume based on the positioning of the slider should be displayed next to the "Volume: " label.
      - Hint: [https://www.w3schools.com/howto/howto\_js\_rangeslider.asp](https://www.w3schools.com/howto/howto_js_rangeslider.asp)
    - The three difficulty buttons
      - have the same size (height/width)
      - are labeled "Easy", "Normal", and "Hard" respectively
      - are vertically aligned and evenly spaced horizontally
    - There is a visible, distinct border _around_ the difficulty that is currently selected
    - The close button should be horizontally aligned with the middle difficulty button (i.e. the "Normal" button)
  3. Suggested Style
    - Slider:
      - background: #d3d3d3
      - utline: none
      - transition: opacity .2s
      - pacity: 0.7
      - width: 100% of outside container
      - height: 25px
    - Button:
      - width: 180px
      - height: 100px
      - background color: purple
      - border color for selected difficulty: 'yellow'
      - font size for text in buttons: 40px

1. **A game over page** - _15 points_
  1. Main Components
    - same background & header ("Asteroids") as landing page
    - a container with
      - labels "Game Over!", "You have to fix your spaceship!"
      - player's score before dying
      - a "Start Over" button that takes the user back to the landing page
    - (The settings of the game should not be reset!)
  2. Required Style
    - The container should be vertically and horizontally centered
    - All components in the container
      - should be horizontally centered
      - should be evenly spaced vertically

1. **A "How to play" page** - _15 points_
  1. Main Components
    - All the texts and gifs as shown in the [screenshot](#_heading=h.9l2ds68nemrt) above
    - A "Start" button that transitions to the "Get Ready" splash screen
  2. Required Style
    - Should only be shown if the player is playing the game for the first time
      - When the player hits "Start over" from the game over page and decides to play the game again, this page should not show up
    - "How to play" is bolded
    - "Avoid", "Collect", "Travel", "Gain" are bolded
    - "asteroids", "shields", "portals", "points" are italicized
    - All components (texts, gifs, button) are horizontally centered on screen
    - There should be some space between each component
  3. Suggested Style
    - img
      - width: 100px
      - height: 100px
    - Text font size: 50px
    - Button:
      - width: 200px
      - height: 75px
    - "How to play" font size: 75px
    - Background color: 'gainsboro'

1. **A "Get Ready" splash screen** - _5 points_
  1. Main Components
    - Scoreboard visible on the top right corner with the correct values
    - All items and texts as shown in the [screenshot](#_heading=h.9l2ds68nemrt)
  2. Required Style
    - The screen should naturally disappear and transition to the gameplay in 3 seconds.
    - The items (besides the scoreboard) should be horizontally centered.
  3. Suggested style:
    - "Get Ready" font size: 75px
    - text font size: 50px
    - font color: black
    - img size: original size

1. **Sounds** - _5 points_
  1. When the player gets an item or when the player dies, the corresponding sound plays.
  2. The volume of the sounds should be based on what was set in the settings panel.

## **Hints**

_Hint 1: Changing Item Size_

If you are trying to set the width and height for asteroid elements but it's not working, double check what element you're actually setting the width and height for. If you are setting the width and height on the "div" containing the image, this doesn't actually affect the image size; it's simply a container for the image. You likely will need to set the width and height for the image element itself.

_Hint 2: Event Listeners_

If you think your event listeners aren't being triggered, one common error occurs when event listeners are created (and attached) before relevant DOM objects exist.

A way around this is to create event listeners that are attached to the body, or another element that exists immediately on the page, and then filter events for a given selector. For example, if I have a UI where I expect items to get added to the page dynamically, and I want to have a "delete" button next to each dynamically added element, I might create the event listener this way:

$("body").on("click", ".deleteX", function(event){

…

});

Here, the "body" is listening for all click events, and is essentially only passing them to the callback if the item clicked actually had the "deleteX" class. See the "selector" arg here: [https://api.jquery.com/on/](https://api.jquery.com/on/)
