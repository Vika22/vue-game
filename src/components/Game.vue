<template>
   <div>
      <h1 class="d-flex justify-center">Simon Game</h1>
      <div class="d-flex flex-wrap justify-evenly">
         <div class="game d-flex flex-column">
            <div class="flex-row">
               <div class="box box1" @click="clicked(1)" :class="{ hover: isHover[1] }"></div>
               <div class="box box2" @click="clicked(2)" :class="{ hover: isHover[2] }"></div>
            </div>
            <div class="flex-row ">
               <div class="box box3" @click="clicked(3)" :class="{ hover: isHover[3] }"></div>
               <div class="box box4" @click="clicked(4)" :class="{ hover: isHover[4] }"></div>
            </div>
         </div>
         <div class="game-info">
            <h2>{{ win ? 'You are winner!' : gameOver ? 'Game Over' : `Round ${round}` }}</h2>
            <button @click="startGame">{{ playing ? 'Stop' : 'Start' }}</button>
            <h2>Game Options</h2>
            <h3>Select level of difficulty:</h3>
            <div class="d-flex flex-column">
               <label for="1500">
                  <input v-model="selectTime" type="radio" id="1500" name="1500" value="1500" />
                  1.5c
               </label>
               <label for="1000">
                  <input v-model="selectTime" type="radio" id="1000" name="1000" value="1000" />
                  1c
               </label>
               <label for="400">
                  <input v-model="selectTime" type="radio" id="400" name="400" value="400" />
                  0.5c
               </label>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: 'Game',
   props: {},
   data: () => ({
      selectTime: '1500',
      gameOver: false,
      win: false,
      playing: false,
      round: 0,
      showOrder: [],
      clickOrder: [],
      isHover: {
         1: false,
         2: false,
         3: false,
         4: false,
      },
      sounds: {
         1: new Audio(require('../audio/1.mp3')),
         2: new Audio(require('../audio/2.mp3')),
         3: new Audio(require('../audio/3.mp3')),
         4: new Audio(require('../audio/4.mp3')),
      },
   }),
   methods: {
      startGame() {
         !this.playing
            ? ((this.playing = true),
              this.showed(),
              (this.round = 1),
              clearInterval(this.showOrder))
            : this.stopGame();
      },
      stopGame() {
         this.playing = false;
         this.clickOrder = [];
         this.showOrder = [];
         this.round = 0;
         !this.win && (this.gameOver = true);
         setInterval(() => {
            this.win = false;
            this.gameOver = false;
         }, 1500);
      },
      lightUp(num) {
         this.isHover[num] = true;
         setTimeout(() => {
            this.isHover[num] = false;
         }, 200);
      },
      playSound(num) {
         this.sounds[num].play();
      },
      clicked(num) {
         this.clickOrder.push(num);
         this.lightUp(num);
         this.playSound(num);
         this.clickOrder.length === this.showOrder.length
            ? JSON.stringify(this.clickOrder) === JSON.stringify(this.showOrder)
               ? (this.showed(),
                 this.round++,
                 this.round === 15 ? ((this.win = true), this.stopGame()) : '')
               : this.stopGame()
            : '';
      },
      showed() {
         let currentIndex = 0;
         this.clickOrder = [];
         this.showOrder.push(Math.floor(Math.random() * 4 + 1));
         this.showInterval = setInterval(() => {
            if (currentIndex >= this.showOrder.length) {
               return clearInterval(this.showInterval);
            }
            this.lightUp(this.showOrder[currentIndex]);
            this.playSound(this.showOrder[currentIndex]);
            currentIndex++;
         }, this.selectTime);
      },
   },
};
</script>

<style lang="sass">
button
    width: 5em
    font-size: 1.4em
    background: #6DABE8
    border: none
    padding: 0.3em 0.6em
    border-radius: 10px 10px 10px 10px
    cursor: pointer
    &:focus
       outline: none
label
    cursor: pointer
.box
    display: inline-block
    width: 150px
    height: 150px
    font-size: 64px
    text-align: center
    box-shadow: 5px 10px 10px #323232
    cursor: pointer

.box1
    background-color: #e84545
    border-radius: 100% 0 0 0
    margin-bottom: -5px
    border-left: 5px solid transparent
    border-top: 5px solid transparent
    &.hover
        border-color: #000

.box2
    background-color: #3f72af
    border-radius: 0 100% 0 0
    margin-bottom: -5px
    border-right: 5px solid transparent
    border-top: 5px solid transparent
    &.hover
        border-color: #000

.box3
    background-color: #11d3bc
    border-radius: 0 0 0 100%
    margin-top: -5px
    border-left: 5px solid transparent
    border-bottom: 5px solid transparent
    &.hover
        border-color: #000

.box4
    background-color: #ffd460
    border-radius: 0 0 100% 0
    margin-top: -5px
    border-right: 5px solid transparent
    border-bottom: 5px solid transparent
    &.hover
        border-color: #000
@media (max-width: 330px)
   .box
      width: 100px
      height: 100px
</style>
