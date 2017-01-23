let Question = (function() {
    class Question {
        constructor(question, answers) {
            this._question = question;
            this._answers = answers;
        }
    }
    return Question;
}());

let categoryData = (function() {
    'use strict';
    //caching variables
    const formAnswers = document.querySelectorAll('.form__answer'),
        saveCategory = document.querySelector('.btn__save'),
        saveQuestion = document.querySelector('.btn__add-question'),
        categoryDom = document.querySelector('.form__category-js'),
        questionDom = document.querySelector('.form__question-js');

    let answers = [],
        questions = [],
        questionsCount = document.querySelector('.questions-count');
    //event listeners
    saveQuestion.addEventListener('click', saveQuestionData, false);
    saveCategory.addEventListener('click', saveCategoryData, false);

    //functions
    function saveQuestionData(e) {
        const getAnswers = document.querySelectorAll('.form__answers');

        //Check first HTML validation
        const checkHtmlValidation = [...formAnswers]
            .every((x) => x.checkValidity() === true);

        if (questionDom.checkValidity() === false || checkHtmlValidation === false) {
            return false;
        }

        const questionData = () => {
            let getQeustionData = questionDom.value
                .trim(),
                validQuestion = inputValidation(getQeustionData),
                lastLetterQuestion = validQuestion.slice(-1);
            //check if first Letter is small, and change it to capital

            if (lastLetterQuestion !== '?') {
                validQuestion += ' ?';
            }
            return validQuestion;
        }
        const getAnswersValue = [...getAnswers]
            .reduce((answers, el) => {
                let getAnswer = el.querySelector('.form__answer'),
                    answerVal = getAnswer.value
                    .trim(),
                    checkVal = el.querySelector('.form__checkbox-js'),
                    validCheck = checkBoxValidation(checkVal),
                    answerReady = inputValidation(answerVal),
                    answer = {
                        answer: answerReady,
                        validStatus: validCheck
                    };
                answers.push(answer);
                checkVal.checked = false;
                getAnswer.value = '';

                return answers;

            }, []);

        //all vidations for answers
        function inputValidation(element) {
            let answerVal = element,
                firstLetter = answerVal[0];

            if (answerVal === '') {
                alert('Empty answer field');
            }
            if (firstLetter.toLowerCase() === firstLetter) {
                answerVal = firstLetter.toUpperCase() + answerVal.substring(1);
            }
            return answerVal;
        };
        //checking checkbox status
        function checkBoxValidation(element) {
            let valid = false;
            if (element.checked) {
                valid = true;
            }
            return valid;
        }

        //add new question
        const question = new Question(questionData(), getAnswersValue);
        questions.push(question);
        questionsCount.textContent = questions.length;
        questionDom.value = '';
        answers = [];
    };

    function saveCategoryData(e) {
        e.preventDefault();
        const category = {
            questions
        };
        const minifyBoxDom = document.querySelector('.results__minify'),
            resultsCont = document.querySelectorAll('.my-container'),
            fullJson = document.querySelector('.results__json');
        minifyBoxDom.textContent = JSON.stringify(category);
        fullJson.textContent = JSON.stringify(category, null, 4);

        for (let result of resultsCont) {
            if (result.classList.contains('hidden-js')) {
                result.classList.remove('hidden-js');
            }
        }
    };
}());
