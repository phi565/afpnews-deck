export default async ({ answers, validate, filter, asyncChoices }, initialQuestions) => {
  const promises = initialQuestions

    // Select only relevant questions
    .filter(question => {
      if (typeof question.when === 'function') {
        return question.when(answers)
      }
      return true
    })

    // Fetch async choices
    .map(async (question, i) => {
      if (asyncChoices === i && typeof question.asyncChoices === 'function') {
        try {
          question.choices = await question.asyncChoices(answers)
        } catch (e) {
          console.error(e)
        }
      }
      return question
    })

  const questions = await Promise.all(promises)

  const errors = {}

  for (const questionName in answers) {
    const question = questions.find(d => d.name === questionName)

    if (question) {
      // Filter answer
      if (filter && typeof question.filter === 'function') {
        answers[questionName] = question.filter(answers[questionName])
      }

      const answer = answers[questionName]

      // Validate answer
      if (validate) {
        if (question.type === 'list' && Array.isArray(question.choices)) {
          errors[questionName] = !question.choices.some(d => d.value === answer || d === answer)
        } else if (question.type !== 'list' && typeof question.validate === 'function') {
          errors[questionName] = !question.validate(answer, answers)
        }
      }
    } else {
      delete answers[questionName]
    }
  }

  return {
    questions,
    errors,
    answers
  }
}
