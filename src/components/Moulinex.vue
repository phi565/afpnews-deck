<template>
  <div>
    <vue-inquirer :questions="questions" v-on:submit="val => {this.answers = val}"></vue-inquirer>
    <p><img v-if="answers" :src="svgUrl"></p>
  </div>
</template>

<script>
import VueInquirer from '@/components/VueInquirer'
import { format } from 'url'

const tableLang = {
  'fr': 1,
  'en': 2,
  'es': 3,
  'de': 1,
  'ar': 1,
  'pt': 1
}

export default {
  name: 'Moulinex',

  components: { VueInquirer },

  data () {
    return {
      answers: null,
      questions: [
        {
          type: 'list',
          name: 'template',
          message: 'Choose a template',
          default: '',
          choices: [
            {
              name: 'Olympic Games medals',
              value: 'olympic-games-medals'
            },
            {
              name: 'Soccer Ligue 1 ranking',
              value: 'soccer-ligue1-ranking'
            },
            {
              name: 'Soccer Premier League ranking',
              value: 'soccer-premier-league-ranking'
            },
            {
              name: 'Rugby Top14 ranking',
              value: 'rubgy-top14-ranking'
            }
          ]
        },
        {
          type: 'list',
          name: 'season',
          message: 'Choose a season',
          default: 'true',
          choices: [
            {
              name: 'summer',
              value: 'true'
            },
            {
              name: 'winter',
              value: 'false'
            }
          ],
          when: answers => answers.template === 'olympic-games-medals'
        },
        {
          type: 'list',
          name: 'lang',
          message: 'Choose a language',
          default: 'fr',
          choices: [
            {
              name: 'French',
              value: 'fr'
            },
            {
              name: 'English',
              value: 'en'
            },
            {
              name: 'Spanish',
              value: 'es'
            },
            {
              name: 'Portuguese',
              value: 'pt'
            },
            {
              name: 'German',
              value: 'de'
            },
            {
              name: 'Arabic',
              value: 'ar'
            }
          ]
        },
        {
          type: 'list',
          name: 'event',
          message: 'Choose an event',
          asyncChoices: async ({ lang, season }) => {
            const response = await fetch(`http://sbds:80/bdsapi/api/osgamescompets/${tableLang[lang]}/${season}`)
            const olympicGames = await response.json()
            return olympicGames.Competitions.map(game => ({ name: game.Name, value: game.Id })).reverse()
          },
          when: answers => answers.template === 'olympic-games-medals'
        },
        {
          type: 'list',
          name: 'event',
          message: 'Choose an event',
          asyncChoices: async ({ lang }) => {
            const response = await fetch(`http://sbds:80/bdsapi/api/xcevenementsbydiscipline/${tableLang[lang]}/16`)
            const events = await response.json()
            return events.Evenements.map(event => ({ name: event.Label, value: event.Id })).reverse()
          },
          // default: 6851,
          // choices: [
          //   {
          //     name: 'France : Ligue 1 (2017/2018)',
          //     value: 6851
          //   },
          //   {
          //     name: 'France : National (2017/2018)',
          //     value: 6862
          //   }
          // ],
          when: answers => answers.template === 'soccer-ligue1-ranking'
        },
        {
          type: 'list',
          name: 'phase',
          message: 'Choose a phase',
          asyncChoices: async ({ lang, event }) => {
            const response = await fetch(`http://sbds:80/bdsapi/api/xcphases/${tableLang[lang]}/${event}`)
            const phases = await response.json()
            return phases.Phases.map(phase => ({ name: phase.PhaseCompet, value: phase.PhaseId })).reverse()
          },
          when: answers => answers.template === 'soccer-ligue1-ranking'
        },
        {
          type: 'list',
          name: 'group',
          message: 'Choose a group',
          asyncChoices: async ({ lang, event, phase }) => {
            const response = await fetch(`http://sbds:80/bdsapi/api/xcphases/${tableLang[lang]}/${event}`)
            const phases = await response.json()
            const groupes = phases.Phases.find(phaseObj => phaseObj.PhaseId === parseInt(phase)).Groupes

            return groupes.map((group, i) => {
              return {
                name: group.GroupeLabel || i.toString(),
                value: group.GroupeId
              }
            })
          },
          when: answers => answers.template === 'soccer-ligue1-ranking'
        }
      ]
    }
  },

  computed: {
    svgUrl () {
      return format({
        protocol: 'http',
        hostname: 'localhost',
        port: 3001,
        pathname: 'image.svg',
        query: this.answers
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
