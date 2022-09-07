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
        :config="param2(line)"
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

        if (ch.line === 'right') {
          const x = this.levels[ch.id - 1].x - level.x - 20
          const y = this.levels[ch.id - 1].y - level.y
          level.lines.push({
            x: level.x + 20,
            y: level.y + 10,
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
      })
    })
  },
  data() {
    return {
      levels: [
        {id: 1, finished: true, faction: 1, x: 100,y: 100, lines: [], yes: true,
          children: [{line: 'right', id: 2}, {line: 'down', id: 5},],
          // lines: [
          //   {x: 120,y: 110,points: [0, 0, 180, 200],fill:'black'},
          //   {x: 110,y: 120,points: [0, 0, 0, 280],fill:'black'},
          // ]
        },
        {id: 2, finished: true, faction: 2,x: 300,y: 300,lines: [],
          children: [{line: 'right', id: 3},],
          // lines: [
          //   {x: 320,y: 310,points: [0, 0, 180, 100],fill:'green'},
          // ]
        },
        {id: 3, finished: false, faction: 1, x: 500,y: 400,lines: [],
          children: [{line: 'right', id: 4},],
          // lines: [
          //   {x: 520,y: 410,points: [0, 0, 680, 0],fill:'yellow'},
          // ]
        },
        {id: 4, finished: false, faction: 3,x: 1200,y: 400,lines: [],
          children: [],
          // lines: []
        },
        {id: 5, finished: false, faction: 1,x: 100,y: 400,lines: [],
          children: [{line: 'right', id: 3},],
          // lines: []
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
        width: 20,
        height: 20,
        // fill: item.faction === 1 ? 'blue' : item.faction === 2 ? 'red' : 'green',
        fill: item.finished ? 'green' : 'grey',
        // stroke: item.finished ? 'green' : 'grey',

      }
    },
    param2(arrow) {
      return {
        x: arrow.x,
        y: arrow.y,
        points: [arrow.points[0], arrow.points[1], arrow.points[2], arrow.points[3]],
        fill: arrow.fill,
        stroke: arrow.fill,
        strokeWidth: 1,
      }
    },
    param3(level) {
      return {
        text: level.id,
        fontSize: 15,
        x: level.x + 5,
        y: level.y + 5,
        align: 'center',
        verticalAlign: 'middle',
      }
    },
    func(level) {
      alert(level.id)
    },
  },
}
</script>

<style>

</style>
