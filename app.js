(function () {
    'use strict';

    angular.module('AppModule', [])
    .controller('TextCtrl', TextCtrl)
    .service('ScenarioService', ScenarioService);

    function ScenarioService(){
        var service = this;
        var counter = 0;
        var answer = false;
        var lastAnswer = '';

        service.getName = function(){
            return data[counter].name;
        }

        service.getText = function(){
            if (!answer && typeof data[counter].text !== 'string') {
                return data[counter].text[lastAnswer];
            }
            if(!answer || typeof data[counter].text === 'string') {
                return data[counter].text;
            }
            if (answer) {
                let currentText = data[counter].text[answer];
                lastAnswer = answer;
                answer = false;
                return currentText;
            }
        }

        service.nextLine = function() {
            if (counter >= data.length - 1 || data[counter].choices || answer) {
                return;
            }
            counter ++;
        }

        service.getChoices = function(){
            if (data[counter].choices) {
                return data[counter].choices;
            }
        }

        service.getAnswer = function(){
            return answer;
        }

        service.choiceButton = function($index) {
            answer = data[counter].choices[$index];
            if (counter >= data.length - 1) {
                return;
            }
            counter ++;
        }
    }

    TextCtrl.$inject = ['ScenarioService']
    function TextCtrl(ScenarioService){
        var ctrl = this;

        ctrl.choiceButton = function($index) {
            ScenarioService.choiceButton($index);
        }

        ctrl.init = function() {
            ctrl.name = ScenarioService.getName();
            ctrl.text = ScenarioService.getText();
            ctrl.choices = ScenarioService.getChoices();
        }
        ctrl.init();

        ctrl.nextLine = function(){
            ScenarioService.nextLine();
            ctrl.init();
        }
    }

})();