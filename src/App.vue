<template>
<div style="overflow:auto;">
  {{ timer }}
<v-stage :config="configKonva">
  <v-layer
      v-for="level in levs"
     :key="level.id"
  >
      <v-rect
          :config="param(level)"
          @dblclick="setFinished(level)"
          @dbltap="setFinished(level)"

      ></v-rect>
<!--    <v-rect-->
<!--        :config="param4(level)"-->
<!--        @dbltap="onSwipeItem"-->
<!--    ></v-rect>-->
    <v-text
        :config="param3(level)"
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
  name: 'App',
  mounted() {
    this.levels.forEach(level => {
      level.children.forEach(ch => {
        this.calc_line(ch, level)
      })
    })
  },
  computed: {
    levs() {
      return this.levels
    },
  },
  data() {
    return {
      w: 25,
      timer: 0,
      levels: [
        {id: 1, finished: true, faction: 1, x: 25,y: 25, lines: [], unlocked: true, unlocks: [2,5],
          children: [{line: 'right', id: 2, connection: '1-2'}, {line: 'down', id: 5, connection: '1-5'},  ],
        },
        {id: 2, finished: false, faction: 2,x: 300,y: 300,lines: [], unlocked: true, unlocks: [1,3],
          children: [{line: 'right', id: 3, connection: '2-3'}, ],
        },
        {id: 3, finished: false, faction: 1, x: 500,y: 400,lines: [], unlocked: false, unlocks: [2,5,4],
          children: [{line: 'right', id: 4, connection: '3-4'}, ],
        },
        {id: 4, finished: false, faction: 3,x: 1200,y: 400,lines: [], unlocked: false, unlocks: [3,],
          children: [],
        },
        {id: 5, finished: false, faction: 1,x: 100,y: 400,lines: [], unlocked: true, unlocks: [1,3],
          children: [{line: 'right', id: 3, connection: '5-3'}, ],
        },
      ],
      configKonva: { width: 1500,height: 600 },
    }
  },
  methods: {
    param(item) {
      return {
        x: item.x,
        y: item.y,
        width: this.w,
        height: this.w,
        // fill: item.faction === 1 ? 'blue' : item.faction === 2 ? 'red' : 'green',
        fill: item.finished ? 'green' : 'grey',
        stroke: item.faction === 1 ? 'blue' : 'red',
        // dragBoundFunc: this.onSwipeItem(item),
        // draggable:true
      }
    },
    param4(item) {
      return {
        x: item.x,
        y: item.y + this.w,
        width: this.w,
        height: this.w,
        // fill: item.faction === 1 ? 'blue' : item.faction === 2 ? 'red' : 'green',
        fill: item.finished ? 'green' : 'grey',
        stroke: item.faction === 1 ? 'blue' : 'red',
      }
    },
    param2(arrow, level) {
      return {
        x: arrow.x,
        y: arrow.y,
        points: [arrow.points[0], arrow.points[1], arrow.points[2], arrow.points[3]],
        fill: arrow.fill,
        stroke: arrow.fill,
        // strokeWidth: level.finished ? 2 : 1,
        strokeWidth: level.finished ? 3 : 1,
      }
    },
    param3(level) {
      return {
        text: `Врагов - \n${level.id}`,
        fontSize: 8,
        x: level.x + this.w / 4,
        y: level.y + this.w / 4,
        align: 'center',
        verticalAlign: 'middle',
        // dragBoundFunc: this.onSwipeItem(level),
        // dragDistance: 1,
        // draggable:true
      }
    },
    // func(level) {
    //   if (level.unlocked) console.log('уровень открыт')
    // },
    onSwipeItem(el) {
      alert(el.id)
      const this_ = this
      return function () {
        console.log('OPEN')
        alert(el.id)
        this_.timer +=1
        return el
      }
    },
    setFinished(level) {
      if (!level.unlocked) {
        alert('Ты чо, уровень даже не открыт')
        return
      }
      if (level.finished) return
      level.finished = true
      level.unlocks.forEach(lev => {
        console.log('ОТКРЫЛИ УРОВЕНЬ' + this.levels[lev - 1].id)
        this.levels[lev - 1].unlocked = true
      })
      this.levels.forEach(level => {
        level.lines = []
        level.children.forEach(ch => {
          this.calc_line(ch, level)
        })
      })
    },
    push_line(connections, level, x1, y1, x2, y2) {
      for (const l of connections) {
        if (this.levels[parseInt(l) - 1].finished) {
          level.lines.push({
            x: x2,
            y: y2,
            fill: 'green',
            points: [0, 0, x1, y1],
          })
          console.log('Добавили' + connections + `Линюю зеленую, уровень ${l} же открыт`)
          return
        }
      }
      level.lines.push({
        x: x2,
        y: y2,
        fill: 'red',
        points: [0, 0, x1, y1],
      })
      console.log('Добавили' + connections + 'Линюю серую, все дети закрыты')
    },
    calc_line(ch, level) {
      const connections = ch.connection?.split('-')
      if (!connections || !ch.line) return
      let x1 = undefined
      let y1 = undefined
      let x2 = undefined
      let y2 = undefined
      if (ch.line === 'right') {
        x1 = this.levels[ch.id - 1].x - level.x - this.w
        y1 = this.levels[ch.id - 1].y - level.y
        x2 = level.x + this.w
        y2 = level.y + this.w / 2
      } else if (ch.line === 'down') {
        x1 = this.levels[ch.id - 1].x - level.x
        y1 = this.levels[ch.id - 1].y - level.y - this.w
        x2 = level.x + this.w / 2
        y2 = level.y + this.w
      } else if (ch.line === 'left') {
        x1 = this.levels[ch.id - 1].x - level.x + this.w
        y1 = this.levels[ch.id - 1].y - level.y
        x2 = level.x
        y2 = level.y + this.w / 2
      } else if (ch.line === 'top') {
        x1 = this.levels[ch.id - 1].x - level.x
        y1 = this.levels[ch.id - 1].y - level.y + this.w
        x2 = level.x + this.w / 2
        y2 = level.y
      }
      this.push_line(connections, level, x1, y1, x2, y2)
    },
  },
}
</script>

<style>

</style>
