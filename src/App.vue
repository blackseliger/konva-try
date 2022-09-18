<template>
  <div style="overflow: auto">
    {{ timer }}
    <v-stage :config="configKonva">
      <v-layer v-for="level in levs" :key="level.id">
        <v-rect
          :config="param(level)"
          @dblclick="setFinished(level)"
          @dbltap="setFinished(level)"
        ></v-rect>
        <!--    <v-rect-->
        <!--        :config="param4(level)"-->
        <!--        @dbltap="onSwipeItem"-->
        <!--    ></v-rect>-->
          <!-- @touchend="endLong" -->
        <v-text
          :config="param3(level)"
          @pointerdown="startLong(level)"
          @dblclick="setFinished(level)"
          @dbltap="setFinished(level)"
        ></v-text>
        <v-line
          v-for="line in level.lines"
          :key="line"
          :config="param2(line, level)"
        ></v-line>
      </v-layer>
    </v-stage>
    <!--  <div v-for="el in [1,2,3,4]" :key="el" v-touch:hold="onSwipeItem(el)">{{ el }}</div>-->
  </div>
</template>
<script>
export default {
  name: "App",
  mounted() {
    this.levels.forEach((level) => {
      level.children.forEach((ch) => {
        this.calc_line(ch, level);
      });
    });
  },
  computed: {
    levs() {
      return this.levels;
    },
  },
  data() {
    return {
      longtap: true,
      longtapTimer: false,
      dontClick: true,
      w: 25,
      timer: 0,
      levels: [
        {
          id: 1,
          finished: false,
          faction: 1,
          x: 25,
          y: 25,
          lines: [],
          unlocked: true,
          unlocks: [2, 3],
          children: [
            { line: "right", id: 2, connection: "1-2" },
            { line: "down", id: 3, connection: "1-3" },
          ],
        },
        {
          id: 2,
          finished: false,
          faction: 1,
          x: 85,
          y: 25,
          lines: [],
          unlocked: false,
          unlocks: [8, 4, 5, 1],
          children: [
            { line: "right", id: 5, connection: "2-5" },
            { line: "right", id: 4, connection: "2-4" },
            { line: "down", id: 8, connection: "2-8" },
          ],
        },
        {
          id: 3,
          finished: false,
          faction: 1,
          x: 25,
          y: 85,
          lines: [],
          unlocked: false,
          unlocks: [8, 11, 1],
          children: [
            { line: "right", id: 8, connection: "3-8" },
            { line: "down", id: 11, connection: "3-11" },
          ],
        },
        {
          id: 4,
          finished: false,
          faction: 1,
          x: 150,
          y: 65,
          lines: [],
          unlocked: false,
          unlocks: [6, 2],
          children: [{ line: "right", id: 6, connection: "4-6" }],
        },
        {
          id: 5,
          finished: false,
          faction: 2,
          x: 235,
          y: 25,
          lines: [],
          unlocked: false,
          unlocks: [7, 2],
          children: [{ line: "right", id: 7, connection: "5-7" }],
        },
        {
          id: 6,
          finished: false,
          faction: 2,
          x: 235,
          y: 85,
          lines: [],
          unlocked: false,
          unlocks: [9, 4, 7],
          children: [
            { line: "down", id: 9, connection: "6-9" },
            { line: "right", id: 7, connection: "6-7" },
          ],
        },
        {
          id: 7,
          finished: false,
          faction: 1,
          x: 335,
          y: 25,
          lines: [],
          unlocked: false,
          unlocks: [6, 5],
          children: [],
        },
        {
          id: 8,
          finished: false,
          faction: 1,
          x: 85,
          y: 150,
          lines: [],
          unlocked: false,
          unlocks: [9, 3, 2],
          children: [{ line: "right", id: 9, connection: "8-9" }],
        },
        {
          id: 9,
          finished: false,
          faction: 1,
          x: 235,
          y: 150,
          lines: [],
          unlocked: false,
          unlocks: [8, 6, 10, 12],
          children: [
            { line: "right", id: 10, connection: "9-10" },
            { line: "down", id: 12, connection: "9-12" },
          ],
        },
        {
          id: 10,
          finished: false,
          faction: 2,
          x: 335,
          y: 135,
          lines: [],
          unlocked: false,
          unlocks: [],
          children: [],
        },
        {
          id: 11,
          finished: false,
          faction: 2,
          x: 25,
          y: 215,
          lines: [],
          unlocked: false,
          unlocks: [3, 12, 19],
          children: [
            { line: "right", id: 12, connection: "11-12" },
            { line: "down", id: 19, connection: "11-19" },
          ],
        },
        {
          id: 12,
          finished: false,
          faction: 1,
          x: 165,
          y: 235,
          lines: [],
          unlocked: false,
          unlocks: [9, 11, 15, 13],
          children: [
            { line: "right", id: 15, connection: "12-15" },
            { line: "down", id: 13, connection: "12-13" },
          ],
        },
        {
          id: 13,
          finished: false,
          faction: 1,
          x: 165,
          y: 315,
          lines: [],
          unlocked: false,
          unlocks: [12, 16, 14, 19],
          children: [
            { line: "right", id: 16, connection: "13-16" },
            { line: "down", id: 14, connection: "13-14" },
          ],
        },
        {
          id: 14,
          finished: false,
          faction: 2,
          x: 165,
          y: 385,
          lines: [],
          unlocked: false,
          unlocks: [],
          children: [],
        },
        {
          id: 15,
          finished: false,
          faction: 2,
          x: 285,
          y: 215,
          lines: [],
          unlocked: false,
          unlocks: [12, 17, 16],
          children: [
            { line: "right", id: 17, connection: "15-17" },
            { line: "down", id: 16, connection: "15-16" },
          ],
        },
        {
          id: 16,
          finished: false,
          faction: 1,
          x: 285,
          y: 300,
          lines: [],
          unlocked: false,
          unlocks: [15, 17, 18, 13],
          children: [
            { line: "right", id: 17, connection: "16-17" },
            { line: "down", id: 18, connection: "16-18" },
          ],
        },
        {
          id: 17,
          finished: false,
          faction: 1,
          x: 335,
          y: 265,
          lines: [],
          unlocked: false,
          unlocks: [15, 16],
          children: [],
        },
        {
          id: 18,
          finished: false,
          faction: 1,
          x: 285,
          y: 360,
          lines: [],
          unlocked: false,
          unlocks: [],
          children: [],
        },
        {
          id: 19,
          finished: false,
          faction: 1,
          x: 75,
          y: 315,
          lines: [],
          unlocked: false,
          unlocks: [11, 13, 20],
          children: [
            { line: "right", id: 13, connection: "19-13" },
            { line: "down", id: 20, connection: "19-20" },
          ],
        },
        {
          id: 20,
          finished: false,
          faction: 2,
          x: 25,
          y: 360,
          lines: [],
          unlocked: false,
          unlocks: [],
          children: [],
        },
      ],
      configKonva: { width: 370, height: 600 },
    };
  },
  methods: {

    startLong() {
      console.log("касание с задарежкой в секунду");
      this.longtap = true;

      if (this.longtap) {
        this.longtapTimer = setTimeout(() => {
          if (this.longtap) {
            console.log("work");
          }
        }, 1000);
      }
    },

    endLong() {
      console.log('снял')
      this.longtap = false;
    },
    param(item) {
      return {
        x: item.x,
        y: item.y,
        width: this.w,
        height: this.w,
        // fill: item.faction === 1 ? 'blue' : item.faction === 2 ? 'red' : 'green',
        fill: item.finished ? "green" : "grey",
        stroke: item.faction === 1 ? "blue" : "red",
        // dragBoundFunc: this.onSwipeItem(item),
        // draggable:true
      };
    },
    param4(item) {
      return {
        x: item.x,
        y: item.y + this.w,
        width: this.w,
        height: this.w,
        // fill: item.faction === 1 ? 'blue' : item.faction === 2 ? 'red' : 'green',
        fill: item.finished ? "green" : "grey",
        stroke: item.faction === 1 ? "blue" : "red",
      };
    },
    param2(arrow, level) {
      return {
        x: arrow.x,
        y: arrow.y,
        points: [
          arrow.points[0],
          arrow.points[1],
          arrow.points[2],
          arrow.points[3],
        ],
        fill: arrow.fill,
        stroke: arrow.fill,
        // strokeWidth: level.finished ? 2 : 1,
        strokeWidth: level.finished ? 3 : 1,
      };
    },
    param3(level) {
      return {
        text: level.id,
        fontSize: 8,
        x: level.x + this.w / 4,
        y: level.y + this.w / 4,
        align: "center",
        verticalAlign: "middle",
        //  @mousedown="mouseDown">
        // https://stackoverflow.com/questions/42058393/vue-js-event-handling-with-on-mouse-click-down-and-not-up
        // https://konvajs.org/docs/vue/Events.html
        dragBoundFunc: this.onSwipeItem(level),
        dragDistance: 0,
        draggable: true,
      };
    },
    // func(level) {
    //   if (level.unlocked) console.log('уровень открыт')
    // },
    onSwipeItem(el) {
      // alert(el.id)
      // this.timer +=1
      // console.log(el)
      // return el
      const this_ = this;
      return function () {
        console.log("ЧТО ДЕЛАЮ?");
        this.dontClick = false;
        setTimeout(() => {
          console.log("JNRHSKJJJJJ", el);
          // окошко открылось, нажимаем на крести чтоб закрыть и после
          // dontClick делаем true чтоб двойной клик работал.
        }, 1000);
        this_.timer += 1;
        return el;
      };
    },
    setFinished(level) {
      this.longtap = false;
      clearInterval(this.longtapTimer);
      if (!this.dontClick) return null;
      if (!level.unlocked) {
        // alert("Ты чо, уровень даже не открыт");
        console.log("stop");
        return;
      }
      if (level.finished) return;
      level.finished = true;
      level.unlocks.forEach((lev) => {
        console.log("ОТКРЫЛИ УРОВЕНЬ" + this.levels[lev - 1].id);
        this.levels[lev - 1].unlocked = true;
      });
      this.levels.forEach((level) => {
        level.lines = [];
        level.children.forEach((ch) => {
          this.calc_line(ch, level);
        });
      });
    },
    push_line(connections, level, x1, y1, x2, y2) {
      for (const l of connections) {
        if (this.levels[parseInt(l) - 1].finished) {
          level.lines.push({
            x: x2,
            y: y2,
            fill: "green",
            points: [0, 0, x1, y1],
          });
          // console.log('Добавили' + connections + `Линюю зеленую, уровень ${l} же открыт`)
          return;
        }
      }
      level.lines.push({
        x: x2,
        y: y2,
        fill: "red",
        points: [0, 0, x1, y1],
      });
      // console.log('Добавили' + connections + 'Линюю серую, все дети закрыты')
    },
    calc_line(ch, level) {
      const connections = ch.connection?.split("-");
      if (!connections || !ch.line) return;
      let x1 = undefined;
      let y1 = undefined;
      let x2 = undefined;
      let y2 = undefined;
      if (ch.line === "right") {
        x1 = this.levels[ch.id - 1].x - level.x - this.w;
        y1 = this.levels[ch.id - 1].y - level.y;
        x2 = level.x + this.w;
        y2 = level.y + this.w / 2;
      } else if (ch.line === "down") {
        x1 = this.levels[ch.id - 1].x - level.x;
        y1 = this.levels[ch.id - 1].y - level.y - this.w;
        x2 = level.x + this.w / 2;
        y2 = level.y + this.w;
      } else if (ch.line === "left") {
        x1 = this.levels[ch.id - 1].x - level.x + this.w;
        y1 = this.levels[ch.id - 1].y - level.y;
        x2 = level.x;
        y2 = level.y + this.w / 2;
      } else if (ch.line === "top") {
        x1 = this.levels[ch.id - 1].x - level.x;
        y1 = this.levels[ch.id - 1].y - level.y + this.w;
        x2 = level.x + this.w / 2;
        y2 = level.y;
      }
      this.push_line(connections, level, x1, y1, x2, y2);
    },
  },
};
</script>

<style>
.test {
  width: 100px;
  height: 100px;
  background-color: rgb(128, 24, 224);
}
</style>
