import isAnswer from './isAnswer';
import getNextQuestions from './getNextQuestions';

export default function getVisibleQuestions(allValues, questions, questionsOrder) {
    let visibleQuestions = [];

    questionsOrder.forEach((orderItem, index) => {
        const correspondingQuestion = questions.find(questionItem => questionItem.question.id === orderItem);
        if (index === 0 || isAnswer(allValues[visibleQuestions[visibleQuestions.length - 1].question.id])) {
            visibleQuestions.push(correspondingQuestion);
            visibleQuestions = visibleQuestions.concat(getNextQuestions(correspondingQuestion, allValues, questions));
        }
    });
    return visibleQuestions;
}