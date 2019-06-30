(function () {
    'use strict';

    angular.module('AppModule', [])
    .controller('TextCtrl', TextCtrl)
    .service('ScenarioService', ScenarioService);

    function ScenarioService(){
        var service = this;
        var counter = 0;

        service.getName = function(){
            return data[counter].name;
        }

        service.getText = function(){
            return data[counter].text;
        }

        service.nextLine = function() {
            if (counter >= data.length - 1) {
                return;
            }
            counter ++;
        }
    }

    TextCtrl.$inject = ['ScenarioService']
    function TextCtrl(ScenarioService){
        var ctrl = this;

        ctrl.init = function(){
            ctrl.name = ScenarioService.getName();
            ctrl.text = ScenarioService.getText();
        }
        ctrl.init();

        ctrl.nextLine = function(){
            ScenarioService.nextLine();
            ctrl.init();
        }
    }

})();