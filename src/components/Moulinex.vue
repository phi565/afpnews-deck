<template>
  <div>
    <vue-inquirer :questions="questions" v-on:submit="val => {this.answers = JSON.parse(JSON.stringify(val))}" v-on:change="() => {this.answers = null}"></vue-inquirer>
    <svg-composer v-if="answers" :spec="answers"></svg-composer>
    <download-svg v-if="answers"></download-svg>
  </div>
</template>

<script>
import VueInquirer from '@/components/VueInquirer'
import SvgComposer from '@/components/SvgComposer'
import DownloadSvg from '@/components/DownloadSvg'

export default {
  name: 'Moulinex',

  components: { VueInquirer, SvgComposer, DownloadSvg },

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
              name: 'Soccer league ranking',
              value: 'soccer-league-ranking'
            },
            {
              name: 'Rugby league ranking',
              value: 'rubgy-league-ranking'
            }
          ]
        },
        {
          type: 'list',
          name: 'year',
          message: 'Choose a year',
          default: 2018,
          choices: [
            {
              name: 2018,
              value: 1076
            },
            {
              name: 2016,
              value: 1075
            }
          ],
          when: answers => answers.template === 'olympic-games-medals'
        },
        {
          type: 'list',
          name: 'league',
          message: 'Choose a league',
          default: '',
          choices: [
            {
              name: 'Premier league',
              value: 'premier-league'
            },
            {
              name: 'Ligue 1',
              value: 'ligue-1'
            }
          ],
          when: answers => answers.template === 'soccer-league-ranking'
        },
        {
          type: 'list',
          name: 'league',
          message: 'Choose a league',
          default: 'top-14',
          choices: [
            {
              name: 'Top 14',
              value: 'top-14'
            }
          ],
          when: answers => answers.template === 'rubgy-league-ranking'
        },
        {
          type: 'list',
          name: 'year',
          message: 'Choose a year',
          default: 2018,
          choices: [2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010],
          when: answers => answers.template === 'soccer-league-ranking' || answers.template === 'rubgy-league-ranking'
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
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
