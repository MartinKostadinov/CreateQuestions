(function() {
    'use strict';
    //Class  Question
    const Question = (function() {
        class Question {
            constructor(question, answers) {
                this.question = question;
                this.answers = answers;
            }
        }
        return Question;
    }());
    let form = {
        config: function() {
            this.answersContainerElement = document.getElementById('answers-container');
            this.answersInputElement = this.answersContainerElement.querySelectorAll('.form__answer');
            this.formElement = document.getElementById('questions-form');
            this.saveCategoryBtnElement = this.formElement.querySelector('.btn__save');
            this.saveQuestionBtnElement = this.formElement.querySelector('.btn__add-question');
            this.categoryInputElement = this.formElement.querySelector('.js-form__category');
            this.questionInputElement = this.formElement.querySelector('.js-form__question');
            this.questionsCountElement = document.querySelector('.questions-count');
            this.getAnswers = document.querySelectorAll('.form__answers');
            this.answers = [];
            this.questions = [];
        },
        init: function() {
            this.config();
            this.bindEvents();
        },
        bindEvents: function() {
            this.saveQuestionBtnElement.addEventListener('click', this.saveQuestionData.bind(this));
            this.saveCategoryBtnElement.addEventListener('click', this.saveCategoryData.bind(this));
        },
        inputValidation: function(element) {
            let answerVal = element;
            let firstLetter = answerVal.charAt(0);
            // if for some reason HTML validation not working,
            // check answer inputs if they are empty string.
            if (answerVal === '') {
                alert('Empty answer field');
            }
            // check if  first letter is lower and make it Capital if its true;
            if (firstLetter.toLowerCase() === firstLetter) {
                answerVal = firstLetter.toUpperCase() + answerVal.substring(1);
            }
            return answerVal;
        },
        checkBoxValidation: function(element) {
            let valid = false;
            if (element.checked) {
                valid = true;
            }
            return valid;
        },
        questionData: function() {
            const getQeustionData = this.questionInputElement.value
                .trim();
            let validQuestion = this.inputValidation(getQeustionData);
            const lastChar = validQuestion.length - 1;
            const lastLetterQuestion = validQuestion.charAt(lastChar);
            //check if first Letter is small, and change it to capital

            if (lastLetterQuestion !== '?') {
                validQuestion += ' ?';
            }
            return validQuestion;
        },
        getAnswersValue: function() {
            let getAnswers = [...this.getAnswers]
                .reduce((answers, el) => {
                    const checboxElement = el.querySelector('.form__checkbox-js');
                    const answerElement = el.querySelector('.form__answer');
                    const answerVal = answerElement.value.trim();
                    let validCheck = this.checkBoxValidation(checboxElement);
                    let answerReady = this.inputValidation(answerVal);
                    //set answer data
                    let answer = {
                        answer: answerReady,
                        validStatus: validCheck
                    };
                    this.answers.push(answer);
                    checboxElement.checked = false;
                    answerElement.value = '';
                    return this.answers;
                }, []);
            return getAnswers;
        },
        saveQuestionData: function(e) {
            e.preventDefault();
            //Check first HTML validation
            let checkHtmlValidation = [...this.answersInputElement]
                .some((x) => x.checkValidity() === true);

            if (this.questionInputElement.checkValidity() === false || checkHtmlValidation === false) {
                return false;
            }
            //add new question
            const question = new Question(this.questionData(), this.getAnswersValue());
            this.questions.push(question);
            this.questionsCountElement.textContent = this.questions.length;
            this.questionInputElement.value = '';
            this.answers = [];
        },
        saveCategoryData: function(e) {
            e.preventDefault();
            //Save questions to category object
            const category = {
                questions: this.questions
            };
            const resultsElement = document.getElementById('results');
            const minifyBoxElement = resultsElement.querySelector('.results__minify');
            const fullJsonBoxElement = resultsElement.querySelector('.results__json');
            //append categoryobjcet to Results Section and  stringify it
            minifyBoxElement.textContent = JSON.stringify(category);
            fullJsonBoxElement.textContent = JSON.stringify(category, null, 4);
            //Show results
            resultsElement.classList.remove('js-hidden');
        }

    };
    form.init();
}());
