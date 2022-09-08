<template>
<div style="overflow:auto;">
<v-stage :config="configKonva">
  <v-layer
      v-for="level in levels"
     :key="level.id"
  >
    <v-rect :config="param(level)" @click="func(level)"></v-rect>
    <v-text :config="param3(level)" @click="func(level)"></v-text>
    <v-line
        v-for="line in level.lines"
        :key="line"
        :config="param2(line, level)"
    ></v-line>
  </v-layer>
</v-stage>
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
  data() {
    return {
      w: 20,
      levels: [
        {id: 1, finished: true, faction: 1, x: 100,y: 100, lines: [], unlocked: true,
          children: [{line: 'right', id: 2}, {line: 'down', id: 5},  ],
        },
        {id: 2, finished: false, faction: 2,x: 300,y: 300,lines: [], unlocked: true,
          children: [{line: 'right', id: 3}, {line: 'left', id: 1},],
        },
        {id: 3, finished: false, faction: 1, x: 500,y: 400,lines: [], unlocked: false,
          children: [{line: 'right', id: 4}, {line: 'left', id: 2}, {line: 'left', id: 5},],
        },
        {id: 4, finished: false, faction: 3,x: 1200,y: 400,lines: [], unlocked: false,
          children: [{line: 'left', id: 3},],
        },
        {id: 5, finished: false, faction: 1,x: 100,y: 400,lines: [], unlocked: true,
          children: [{line: 'top', id: 1}, {line: 'right', id: 3}],
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
        // stroke: item.finished ? 'green' : 'grey',
      }
    },
    param2(arrow, level) {
      return {
        x: arrow.x,
        y: arrow.y,
        points: [arrow.points[0], arrow.points[1], arrow.points[2], arrow.points[3]],
        fill: arrow.fill,
        stroke: arrow.fill,
        strokeWidth: level.finished ? 2 : 1,
      }
    },
    param3(level) {
      return {
        text: level.id,
        fontSize: 15,
        x: level.x + this.w / 4,
        y: level.y + this.w / 4,
        align: 'center',
        verticalAlign: 'middle',
      }
    },
    func(level) {
      if (level.unlocked) alert(level.id)
      else alert('уровень не пройден')
    },
    calc_line(ch, level) {
      if (ch.line === 'right') {
        const x = this.levels[ch.id - 1].x - level.x - this.w
        const y = this.levels[ch.id - 1].y - level.y
        level.lines.push({
          x: level.x + this.w,
          y: level.y + this.w / 2,
          fill: level.finished ? 'green' : 'grey',
          points: [0, 0, x, y],
        })
      }
      if (ch.line === 'down') {
        const x = this.levels[ch.id - 1].x - level.x
        const y = this.levels[ch.id - 1].y - level.y - 20
        level.lines.push({
          x: level.x + 10,
          y: level.y + 20,
          fill: level.finished ? 'green' : 'grey',
          points: [0, 0, x, y],
        })
      }
      if (ch.line === 'left') {
        const x = this.levels[ch.id - 1].x - level.x + 20
        const y = this.levels[ch.id - 1].y - level.y
        level.lines.push({
          x: level.x,
          y: level.y + 10,
          fill: level.finished ? 'green' : 'grey',
          points: [0, 0, x, y],
        })
      }
      // if (ch.line === 'top') {
      //   const x = this.levels[ch.id - 1].x - level.x
      //   const y = this.levels[ch.id - 1].y - level.y + 20
      //   level.lines.push({
      //     x: level.x + 10,
      //     y: level.y,
      //     fill: level.finished ? 'green' : 'grey',
      //     points: [0, 0, x, y],
      //   })
      // }
    },
  },
}
</script>

<style>

</style>
