<template>
  <div>
    <form v-on:submit.prevent="submit">
      <div class="question" v-for="(question, i) in filteredQuestions" :key="question.name">
        <input v-if="question.type === 'input'" :type="question.type === 'password' ? 'password' : 'text'" :placeholder="question.message" v-model="answers[question.name]" :class="{ danger: errors[question.name] === true, success: errors[question.name] === false }" v-on:change="nextQuestion">
        <select v-else-if="question.type === 'list'" v-model="answers[question.name]" :multiple="question.multiple || false" :class="{ danger: errors[question.name] === true, success: errors[question.name] === false }" v-on:change="nextQuestion">
          <option disabled value=''>{{ question.message }}</option>
          <option v-for="choice in question.choices" :key="choice.value || choice" :value="choice.value || choice">{{ choice.name || choice }}</option>
        </select>
      </div>
      <button type="submit" v-if="canBeSubmitted">Valider</button>
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
      filteredQuestions: [], // Will contain the question currently displayable
      current: 0, // Index of the current question inside the filtered question array
      answers: {}, // Contains the answers hash
      errors: {} // Contains validation errors
    }
  },

  computed: {
    currentQuestion () {
      return this.filteredQuestions[this.current]
    },
    hasErrors () {
      let errors = false
      for (const error in this.errors) {
        if (this.errors[error] === true) errors = true
      }
      return errors
    },
    hasAllAnswers () {
      let answers = true
      for (const answer in this.answers) {
        if (this.answers[answer] === undefined) answers = false
      }
      return answers
    },
    canBeSubmitted () {
      return this.current >= this.filteredQuestions.length && this.hasErrors === false && this.hasAllAnswers === true
    }
  },

  watch: {
    current () {
      this.filterQuestions()
    }
  },

  created () {
    this.filterQuestions()
  },

  methods: {
    nextQuestion () {
      // Check if there is a validation error, then filter questions array for the next one
      if (this.hasErrors) {
        return false
      }
      this.current++
    },
    filterQuestions () {
      // Check if question is displayable
      this.filteredQuestions = this.questions
        .filter(question => {
          if (!question.when || typeof question.when !== 'function') return true
          return question.when(this.answers)
        })
        .filter((question, i) => {
          return i <= this.current
        })

      // Set reactive properties and watcher on the answers and questions hashes
      this.filteredQuestions
        .forEach(question => {
          if (this.answers[question.name] === undefined) {
            this.$set(this.errors, question.name, null)
          }
          if (this.$watch[`answers.${question.name}`] === undefined) {
            this.$watch(`answers.${question.name}`, (newValue, oldValue) => {
              if (question.filter && typeof question.filter === 'function') {
                this.answers[question.name] = question.filter(newValue)
              }
              if (question.validate && typeof question.validate === 'function') {
                this.errors[question.name] = !question.validate(this.answers[question.name], this.answers)
              }
            })
          }
          if (this.answers[question.name] === undefined) {
            let defaultAnswer = typeof question.default === 'function' ? question.default() : question.default
            if (question.multiple && !Array.isArray(defaultAnswer)) defaultAnswer = []
            this.$set(this.answers, question.name, defaultAnswer)
          }
        })
    },
    submit () {
      this.$emit('answer', this.answers)
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
