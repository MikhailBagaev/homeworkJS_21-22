'use strict';

$(function(){
$(document).ready(function () { 
    let html = $('#parsed-resig').html();
    let mainObj = [    
        {
        headerTest: 'Проверь свои знания JavaScript'
        },               
        {
            question: 'JavaScript это',
            blockAnswer: ['Объектно-ориентированный скриптовый язык программирования',
                          'Скриптовой язык программирования',
                          'Прототипно-ориентированный скриптовый язык программирования',
                          'Все выше перечисленое верно'],
            rightAnswer: 2
        },
        { 
            question: 'Где в документе может располагаться тэг script по стандарту HTML?',
            blockAnswer: ['В HEAD или в BODY',
                          'До HTML',
                          'Только в BODY',
                          'Только в HEAD'],
            rightAnswer: 0            
        },
        { 
            question: 'Какой из этих тагов соответствуют стандарту HTML?',
            blockAnswer: ['&lt;"script language="javascript" type="text/javascript"&gt;',
                          '&lt;script&gt;',
                          '&lt;script language="javascript"&gt;',
                          '&lt;script type="text/javascript"&gt;'],
            rightAnswer: 3             
        },
        {
            button: '<button class="calculate">Проверить результат</button>'
        }
    ];      
    
    localStorage.setItem('mainObj', JSON.stringify(mainObj));    
    mainObj = localStorage.getItem('mainObj');
    mainObj = JSON.parse(mainObj);       
    
    let $body = $('body');
    let content = tmpl(html, {
        data: mainObj}
        );
    
    $body.append(content);   

    function checkInputs(){ 
        let inputs = document.querySelectorAll('.' + myString[value]);    
        for (let j = 0; j < inputs.length; j++) {
        inputs[j].onchange = function() {
            for (let k = 0; k < inputs.length; k++) {
                inputs[k].checked = false;                
                this.checked = true;
                }
            }
        }            
    };   
     
    let myString = ['cbGroup1', 'cbGroup2', 'cbGroup3'];
    // for (var i = 0; i < myString.length; i++) {
    for (var value of myString) {
        checkInputs();        
    };

    let score = 0;
    let $checkedAnswer;
    let $userAnswer = [];  
    let $button = $('.calculate'); 
    let allInputs = $('input');    
    $($button).on('click', function(e){
        e.preventDefault();
        $( ':checkbox:checked' ).each(function(){
            $checkedAnswer = (this.value);
            $userAnswer.push($checkedAnswer);                
        });        
        countScore(); 
        showModal(); 
        console.log(score);
        console.log($userAnswer);              
    }); 

    function countScore(){     
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

    function showModal(){
        let $body = $('body');
        let $modal = $('<div class="modal"><p class="modal-text">Вы успешно прошли тест!</p></div>');
        let $modal2 = $('<div class="modal"><p class="modal-text">Вы не прошли тест! Вы можете попробовать еще раз.</p></div>');
        let $closeButton = $('<div class="close-button">ЗАКРЫТЬ</div>')
        if (score == (mainObj.length - 2) * 10) {
            $body.append($modal);
            $modal.append($closeButton);            
        } else {
            $body.append($modal2);
            $modal2.append($closeButton);
        }
        $('input[type="checkbox"]').attr('disabled', "disabled");


    $($closeButton).on('click', function() {        
        $modal.remove();        
        clearAll();                           
    });
    $($closeButton).on('click', function() {        
        $modal2.remove();        
        clearAll()                      
    });    
 }; 
});
});















 




 



    





