<template>
  <div>
    <form v-on:submit.prevent="">
      <div class="question" v-for="(question, i) in pastAndPresentQuestions" :key="question.name">
        <input v-if="question.type === 'input'" :type="question.type === 'password' ? 'password' : 'text'" :placeholder="question.message" v-model="answers[question.name]" :class="{ danger: errors[question.name] === true, success: errors[question.name] === false }" v-on:change="nextQuestion">
        <select v-else-if="question.type === 'list'" v-model="answers[question.name]" :multiple="question.multiple || false" :class="{ danger: errors[question.name] === true, success: errors[question.name] === false }" v-on:change="nextQuestion">
          <option disabled value=''>{{ question.message }}</option>
          <option v-for="choice in question.choices" :key="choice.value || choice" :value="choice.value || choice">{{ choice.name || choice }}</option>
        </select>
      </div>
      <button type="submit" v-if="!hasErrors && !missSomeAnswers" @click="submit">Valider</button>
      <button v-else-if="!hasErrors" @click="nextQuestion">Suivant</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'vue-inquirer',

  props: {
    questions: { // Should be an array containing an inquirer definition (https://github.com/SBoudrias/Inquirer.js/)
      type: Array,
      required: true
    }
  },

  data () {
    return {
      current: 0, // Index of the current question inside the filtered question array
      answers: {}, // Contains the answers hash
      errors: {} // Contains validation errors
    }
  },

  computed: {
    filteredQuestions () {
      // Check if question is displayable
      return this.questions
        .filter(question => {
          if (!question.when || typeof question.when !== 'function') return true
          return question.when(this.answers)
        })
    },
    pastAndPresentQuestions () {
      return this.filteredQuestions
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
      return this.filteredQuestions.some(question => {
        return this.answers[question.name] === undefined
      })
    }
  },

  created () {
    this.setQuestionsReactives()
  },

  watch: {
    pastAndPresentQuestions () {
      this.setQuestionsReactives()
    }
  },

  methods: {
    nextQuestion () {
      this.$emit('change')
      // Check if there is a validation error, then filter questions array for the next one
      this.$nextTick(() => {
        if (this.hasErrors) {
          return false
        }
        this.current++
      })
    },
    setQuestionsReactives (question) {
      // Set reactive properties and watcher on the answers and questions hashes
      this.pastAndPresentQuestions
        .forEach(question => {
          this.setQuestionError(question)
          this.setQuestionWatcher(question)
          this.setQuestionAnswer(question)
        })
    },
    setQuestionError (question) {
      // Set error to null in errors hash
      if (this.answers[question.name] === undefined) {
        this.$set(this.errors, question.name, null)
      }
    },
    setQuestionAnswer (question) {
      // Set up default answer in answers hash
      if (this.answers[question.name] === undefined) {
        let defaultAnswer = typeof question.default === 'function' ? question.default() : question.default
        if (question.multiple && !Array.isArray(defaultAnswer)) defaultAnswer = []
        this.$set(this.answers, question.name, defaultAnswer)
      }
    },
    setQuestionWatcher (question) {
      // Watch answer to filter and validate value
      if (this.$watch[`answers.${question.name}`] === undefined) {
        this.$watch(`answers.${question.name}`, (newValue, oldValue) => {
          if (question.filter && typeof question.filter === 'function') {
            this.answers[question.name] = question.filter(newValue)
          }
          if (question.validate && typeof question.validate === 'function') {
            this.errors[question.name] = !question.validate(this.answers[question.name], this.answers)
          }
          if (question.type === 'list') {
            this.errors[question.name] = !question.choices.some(d => d.value === this.answers[question.name] || d === this.answers[question.name])
          }
        })
      }
    },
    submit () {
      this.$emit('submit', this.answers)
    }
  }
}
</script>

<style lang="scss" scoped>
.danger {
  border: 1px solid red;
}
.success {
  outline: 1px solid green;
}
</style>
