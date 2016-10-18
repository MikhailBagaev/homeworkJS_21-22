'use strict';

$(function () {
    $(document).ready(function () {
        var html = $('#parsed-resig').html();
        var mainObj = [{
            headerTest: 'Проверь свои знания JavaScript'
        }, {
            question: 'JavaScript это',
            blockAnswer: ['Объектно-ориентированный скриптовый язык программирования', 'Скриптовой язык программирования', 'Прототипно-ориентированный скриптовый язык программирования', 'Все выше перечисленое верно'],
            rightAnswer: 2
        }, {
            question: 'Где в документе может располагаться тэг script по стандарту HTML?',
            blockAnswer: ['В HEAD или в BODY', 'До HTML', 'Только в BODY', 'Только в HEAD'],
            rightAnswer: 0
        }, {
            question: 'Какой из этих тагов соответствуют стандарту HTML?',
            blockAnswer: ['&lt;"script language="javascript" type="text/javascript"&gt;', '&lt;script&gt;', '&lt;script language="javascript"&gt;', '&lt;script type="text/javascript"&gt;'],
            rightAnswer: 3
        }, {
            button: '<button class="calculate">Проверить результат</button>'
        }];

        localStorage.setItem('mainObj', JSON.stringify(mainObj));
        mainObj = localStorage.getItem('mainObj');
        mainObj = JSON.parse(mainObj);

        var $body = $('body');
        var content = tmpl(html, {
            data: mainObj });

        $body.append(content);

        function checkInputs() {
            var inputs = document.querySelectorAll('.' + myString[value]);
            for (var j = 0; j < inputs.length; j++) {
                inputs[j].onchange = function () {
                    for (var k = 0; k < inputs.length; k++) {
                        inputs[k].checked = false;
                        this.checked = true;
                    }
                };
            }
        };

        var myString = ['cbGroup1', 'cbGroup2', 'cbGroup3'];
        // for (var i = 0; i < myString.length; i++) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = myString[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var value = _step.value;

                checkInputs();
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        ;

        var score = 0;
        var $checkedAnswer = void 0;
        var $userAnswer = [];
        var $button = $('.calculate');
        var allInputs = $('input');
        $($button).on('click', function (e) {
            e.preventDefault();
            $(':checkbox:checked').each(function () {
                $checkedAnswer = this.value;
                $userAnswer.push($checkedAnswer);
            });
            countScore();
            showModal();
            console.log(score);
            console.log($userAnswer);
        });

        function countScore() {
            for (var i = 0; i < mainObj.length - 2; i++) {
                if ($userAnswer[i] == mainObj[i + 1].rightAnswer) {
                    score += 10;
                }
            };
            // return score;
        };

        function clearAll() {
            $userAnswer = [];
            score = 0;
            $('input[type="checkbox"]').removeAttr('disabled', "disabled");
            $('input').prop('checked', false);
        }

        function showModal() {
            var $body = $('body');
            var $modal = $('<div class="modal"><p class="modal-text">Вы успешно прошли тест!</p></div>');
            var $modal2 = $('<div class="modal"><p class="modal-text">Вы не прошли тест! Вы можете попробовать еще раз.</p></div>');
            var $closeButton = $('<div class="close-button">ЗАКРЫТЬ</div>');
            if (score == (mainObj.length - 2) * 10) {
                $body.append($modal);
                $modal.append($closeButton);
            } else {
                $body.append($modal2);
                $modal2.append($closeButton);
            }
            $('input[type="checkbox"]').attr('disabled', "disabled");

            $($closeButton).on('click', function () {
                $modal.remove();
                clearAll();
            });
            $($closeButton).on('click', function () {
                $modal2.remove();
                clearAll();
            });
        };
    });
});
