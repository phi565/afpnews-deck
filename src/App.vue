<!-- Main App file, needed only for dev -->
<template>
  <div id="app">
    <vue-inquirer :url="null" v-on:submit="val => {log(val)}" :initialQuestions="questions" :debug="true"></vue-inquirer>
  </div>
</template>

<script>
import VueInquirer from './components/VueInquirer'
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export default {
  name: 'app',
  components: {
    VueInquirer
  },
  data () {
    return {
      questions: [
        {
          type: 'list',
          name: 'template',
          message: 'Choose a template',
          default: '',
          choices: [
            {
              name: 'Template 1',
              value: 'template-1'
            },
            {
              name: 'Template 2',
              value: 'template-2'
            }
          ]
        },
        {
          type: 'input',
          name: 'name',
          message: 'Type the name of your project',
          default: 'my-project',
          filter: input => input.toUpperCase(),
          validate: input => input.match(/^[A-Z-]+$/),
          when: answers => answers.template === 'template-1'
        },
        {
          type: 'list',
          name: 'async-choices',
          message: 'Choose an choice',
          asyncChoices: async ({ template }) => {
            await delay(100)
            return ['choice1', 'choice2']
          }
        }
      ]
    }
  },
  methods: {
    log (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss">
$assets_path: '~@afp/toolkit-styles/assets/';
@import "~@afp/toolkit-styles/scss/main.scss";
</style>
