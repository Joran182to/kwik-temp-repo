import isAnswer from './isAnswer';

export default function getNextQuestions(questionItem, allValues, questions) {
    if (!isAnswer(allValues[questionItem.question.id]) || questionItem.nextQuestions.length === 0) {
        return [];
    } else {
        const nextQuestions = questionItem.nextQuestions
            .filter(nextQuestionItem => nextQuestionItem.whenChoiceId === allValues[questionItem.question.id])
            .map(nextQuestionItem => questions.find(questionItem => questionItem.question.id === nextQuestionItem.nextQuestionId));

        return [].concat(nextQuestions.reduce((acc, questionItem) => {
            return acc.concat(questionItem, getNextQuestions(questionItem, allValues, questions));
        }, []))
            .filter((questionItem, index, array) => index === 0 ? true : isAnswer(allValues[array[index - 1].question.id]))
    }
}