<template>
  <div>
    <form v-on:submit.prevent="">
      <div class="question" v-for="(question, i) in currentQuestions" :key="question.name">
        <input v-if="question.type === 'input'" :type="question.type === 'password' ? 'password' : 'text'" :placeholder="question.message" v-model="answers[question.name]" :class="{ danger: errors[question.name] === true, success: errors[question.name] === false }" @change="goQuestion(i)">
        <select v-else-if="question.type === 'list'" v-model="answers[question.name]" :multiple="question.multiple || false" :class="{ danger: errors[question.name] === true, success: errors[question.name] === false }" @change="goQuestion(i)">
          <option disabled value=''>{{ question.message }}</option>
          <option v-for="choice in question.choices" :key="choice.value || choice" :value="choice.value || choice">{{ choice.name || choice }}</option>
        </select>
        <button :disabled="errors[question.name] ? 'disabled' : false" @click="goQuestion(i + 1)">Valider</button>
      </div>
      <button type="submit" v-if="!hasErrors && !missSomeAnswers && current === relevantQuestions.length" @click="submit">Générer</button>
      {{ answers }}
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
      current: null, // Index of the current question inside the filtered question array
      answers: {}, // Contains the answers hash
      errors: {} // Contains validation errors
    }
  },

  computed: {
    relevantQuestions () {
      // Check if question is displayable
      return this.questions
        .filter(question => {
          if (!question.when || typeof question.when !== 'function') return true
          return question.when(this.answers)
        })
    },
    currentQuestions: {
      get () {
        return this.relevantQuestions
          .filter((question, i) => {
            return i <= this.current
          })
      },
      set (questions) {
        this.questions = Object.assign(this.questions, questions)
      }
    },
    hasErrors () {
      let errors = false
      for (const error in this.errors) {
        if (this.errors[error] === true) errors = true
      }
      return errors
    },
    missSomeAnswers () {
      return this.relevantQuestions.some(question => {
        return this.answers[question.name] === undefined
      })
    }
  },

  created () {
    this.goQuestion(0)
  },

  watch: {
    answers: {
      handler () {
        for (const questionName in this.answers) {
          const question = this.currentQuestions.find(d => d.name === questionName)
          if (question) {
            this.filterAnswer(question)
            this.validateAnswer(question)
          }
        }
      },
      deep: true,
      immediate: false
    },
    currentQuestions (questions) {
      for (const answer in this.answers) {
        if (!questions.find(d => d.name === answer)) {
          delete this.answers[answer]
          delete this.errors[answer]
        }
      }
    }
  },

  methods: {
    goQuestion (i) {
      // Check if there is a validation error, then filter questions array for the next one
      if (this.hasErrors) {
        return false
      }
      this.current = i

      this.prepareQuestions()
        .then(questions => {
          this.currentQuestions = questions
          questions.forEach(question => {
            this.initializeQuestionError(question)
            this.initializeQuestionAnswer(question)
          })
        })
    },
    async prepareQuestions () {
      const promises = this.currentQuestions
        .map(async question => {
          if (question.asyncChoices) {
            try {
              question.choices = await question.asyncChoices(this.answers)
            } catch (e) {
              console.error(e)
            }
          }
          return question
        })

      const questions = await Promise.all(promises)
      return questions
    },
    initializeQuestionError (question) {
      // Set error to null in errors hash
      if (this.answers[question.name] === undefined) {
        this.$set(this.errors, question.name, null)
      }
    },
    initializeQuestionAnswer (question) {
      // Set up default answer in answers hash
      if (this.answers[question.name] === undefined) {
        let defaultAnswer = typeof question.default === 'function' ? question.default() : question.default
        if (question.multiple && !Array.isArray(defaultAnswer)) defaultAnswer = []
        this.$set(this.answers, question.name, defaultAnswer)
      }
    },
    filterAnswer (question) {
      if (question.filter && typeof question.filter === 'function') {
        this.answers[question.name] = question.filter(this.answers[question.name])
      }
    },
    validateAnswer (question) {
      if (question.type === 'list') {
        this.errors[question.name] = !question.choices.some(d => d.value === this.answers[question.name] || d === this.answers[question.name])
      } else {
        if (question.validate && typeof question.validate === 'function') {
          this.errors[question.name] = !question.validate(this.answers[question.name], this.answers)
        }
      }
    },
    submit () {
      this.$emit('submit', JSON.parse(JSON.stringify(this.answers)))
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
