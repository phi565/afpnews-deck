export default async (answers, initialQuestions) => {
  const promises = initialQuestions

    // Select only relevant questions
    .filter(question => {
      if (typeof question.when === 'function') {
        return question.when(answers)
      }
      return true
    })

    // Fetch async choices
    .map(async question => {
      if (typeof question.asyncChoices === 'function') {
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
      if (typeof question.filter === 'function') {
        answers[questionName] = question.filter(answers[questionName])
      }

      const answer = answers[questionName]

      // Validate answer
      if (question.type === 'list') {
        errors[questionName] = !question.choices.some(d => d.value === answer || d === answer)
      } else {
        if (typeof question.validate === 'function') {
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
