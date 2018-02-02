<template>
  <div>
    <vue-inquirer :questions="questions" v-on:submit="val => {this.answers = val}"></vue-inquirer>
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
          name: 'year',
          message: 'Choose a year',
          default: 2018,
          choices: [
            {
              name: '2016 - Paralympiques',
              value: 1129
            },
            {
              name: 2016,
              value: 1075
            },
            {
              name: '2014 - Winter - Paralympiques',
              value: 877
            },
            {
              name: '2014 - Winter',
              value: 800
            },
            {
              name: '2012 - Paralympiques',
              value: 750
            },
            {
              name: 2012,
              value: 718
            },
            {
              name: '2010 - Winter',
              value: 556
            },
            {
              name: 2008,
              value: 438
            },
            {
              name: '2006 - Winter',
              value: 247
            },
            {
              name: 2004,
              value: 219
            },
            {
              name: '2002 - Winter',
              value: 158
            },
            {
              name: 2000,
              value: 48
            },
            {
              name: '1998 - Winter',
              value: 47
            },
            {
              name: 1996,
              value: 46
            },
            {
              name: '1994 - Winter',
              value: 45
            },
            {
              name: '1992 - Winter',
              value: 44
            },
            {
              name: 1992,
              value: 43
            },
            {
              name: '1988 - Winter',
              value: 42
            },
            {
              name: 1988,
              value: 41
            },
            {
              name: '1984 - Winter',
              value: 40
            },
            {
              name: 1984,
              value: 39
            },
            {
              name: '1980 - Winter',
              value: 38
            },
            {
              name: 1980,
              value: 37
            },
            {
              name: '1976 - Winter',
              value: 36
            },
            {
              name: 1976,
              value: 35
            },
            {
              name: '1972 - Winter',
              value: 34
            },
            {
              name: 1972,
              value: 33
            },
            {
              name: '1968 - Winter',
              value: 32
            },
            {
              name: 1968,
              value: 31
            },
            {
              name: '1964 - Winter',
              value: 30
            },
            {
              name: 1964,
              value: 29
            },
            {
              name: '1960 - Winter',
              value: 28
            },
            {
              name: 1960,
              value: 27
            },
            {
              name: '1956 - Winter',
              value: 26
            },
            {
              name: 1956,
              value: 25
            },
            {
              name: '1952 - Winter',
              value: 24
            },
            {
              name: 1952,
              value: 23
            },
            {
              name: '1948 - Winter',
              value: 22
            },
            {
              name: 1948,
              value: 21
            },
            {
              name: 1944,
              value: 20
            },
            {
              name: 1940,
              value: 19
            },
            {
              name: '1936 - Winter',
              value: 18
            },
            {
              name: 1936,
              value: 17
            },
            {
              name: '1932 - Winter',
              value: 16
            },
            {
              name: 1932,
              value: 15
            },
            {
              name: '1928 - Winter',
              value: 14
            },
            {
              name: 1928,
              value: 13
            },
            {
              name: '1924 - Winter',
              value: 12
            },
            {
              name: 1924,
              value: 11
            },
            {
              name: 1920,
              value: 10
            },
            {
              name: 1916,
              value: 9
            },
            {
              name: 1912,
              value: 8
            },
            {
              name: 1908,
              value: 7
            },
            {
              name: 1906,
              value: 6
            },
            {
              name: 1904,
              value: 5
            },
            {
              name: 1900,
              value: 4
            },
            {
              name: 1896,
              value: 3
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
