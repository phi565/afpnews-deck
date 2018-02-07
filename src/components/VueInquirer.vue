<template>
  <div>
    <form v-on:submit.prevent="">
      <div class="question" v-for="(question, i) in currentQuestions" :key="question.name">
        <input v-if="question.type === 'input'" :type="question.type === 'password' ? 'password' : 'text'" :placeholder="question.message" v-model="answers[question.name]" :class="{ danger: errors[question.name] === true, success: errors[question.name] === false }" @keyup="validate(i)" @change="validate(i)">
        <select v-else-if="question.type === 'list'" v-model="answers[question.name]" :multiple="question.multiple || false" :class="{ danger: errors[question.name] === true, success: errors[question.name] === false }" @change="validate(i)">
          <option disabled value=''>{{ question.message }}</option>
          <option v-for="choice in question.choices" :key="choice.value || choice" :value="choice.value || choice">{{ choice.name || choice }}</option>
        </select>
        <button v-show="current === i" :disabled="errors[question.name] || isLoading || (question.required !== false && answers[question.name] === undefined) ? 'disabled' : false" @click="next()"><span v-if="!isLoading">✓</span><span class="loading" v-else><i class="UI-icon UI-loading"></i> Loading</span></button>
        <p class="error" v-if="errors[question.name]">Your answer is not correct</p>
      </div>
      <button id="submit" type="submit" v-if="!hasErrors && !missSomeAnswers && current === questions.length" @click="submit">Generate</button>
    </form>
    <pre id="debug" v-if="debug">{{ answers | pretty }}</pre>
  </div>
</template>

<script>
import inquirer from '@/utils/inquirer'

export default {
  name: 'vue-inquirer',

  filters: {
    pretty (val) {
      return JSON.stringify(val, null, 2)
    }
  },

  props: {
    url: { // Must be a VueInquirer server (respond to POST)
      type: String,
      required: false
    },
    initialQuestions: { // Must be a VueInquirer questions array
      type: Array,
      required: false
    },
    debug: {
      type: Boolean,
      required: false
    }
  },

  data () {
    return {
      current: -1, // Index of the current question inside the filtered question array
      questions: [],
      answers: {},
      errors: {},
      isLoading: false
    }
  },

  computed: {
    currentQuestions () {
      return this.questions
        .filter((question, i) => {
          return i <= this.current
        })
    },
    hasErrors () {
      let errors = false
      for (const error in this.errors) {
        if (this.errors[error] === true) errors = true
      }
      return errors
    },
    missSomeAnswers () {
      return this.questions.some(question => {
        return this.answers[question.name] === undefined
      })
    }
  },

  created () {
    this.next()
  },

  methods: {
    async validate (i) {
      this.$emit('validate')
      this.current = i

      const data = await this.askInquirer({
        validate: true,
        filter: true,
        asyncChoices: false
      })

      this.errors = data.errors
      this.answers = data.answers
    },
    async next () {
      this.$emit('next')

      const data = await this.askInquirer({
        validate: true,
        filter: true,
        asyncChoices: this.current + 1
      })

      this.questions = data.questions
      this.errors = data.errors
      this.answers = data.answers

      this.currentQuestions.forEach(question => {
        this.initializeQuestionAnswer(question)
      })

      this.current++
    },
    async askInquirer (options) {
      try {
        this.isLoading = true
        let data

        // If questions async
        if (this.url) {
          const response = await fetch(this.url, {
            method: 'POST',
            body: JSON.stringify({
              answers: this.answers,
              ...options
            })
          })
          data = await response.json()
        } else if (this.initialQuestions) {
          // If questions sync
          data = await inquirer({
            answers: this.answers,
            ...options
          }, this.initialQuestions)
        } else {
          console.error('No questions data')
        }
        this.isLoading = false
        return data
      } catch (e) {
        console.error(e)
        this.isLoading = false
        return Promise.reject(e)
      }
    },
    initializeQuestionAnswer (question) {
      // Set up default answer in answers hash
      if (this.answers[question.name] === undefined) {
        let defaultAnswer = question.default
        if (question.multiple && !Array.isArray(defaultAnswer)) defaultAnswer = []
        this.$set(this.answers, question.name, defaultAnswer)
      }
    },
    submit () {
      this.$emit('submit', JSON.parse(JSON.stringify(this.answers)))
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  padding: 5px;

  .question {
    margin-bottom: 12px;

    input, select {
      width: 50%;
    }
  }

  #submit {
    width: 50%;
  }
}
#debug {
  background-color: yellow;
  margin-top: 20px;
  padding: 20px;
}
.danger {
  border: 1px solid red;
}
.success {
  outline: 1px solid green;
}
.loading {
  position: relative;
  padding-left: 20px;
  .UI-icon.UI-loading {
    left: 0px;
    position: absolute;
    animation:spin 4s linear infinite;
  }
}
@keyframes spin {
  100% {
    transform:rotate(360deg);
  }
}
</style>
