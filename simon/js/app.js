$(document).ready(function(){
    var game = new Game();
    
    (function($) {
        $.fn.clickToggle = function(func1, func2) {
            var funcs = [func1, func2];
            this.data('toggleclicked', 0);
            this.click(function() {
                var data = $(this).data();
                var tc = data.toggleclicked;
                $.proxy(funcs[tc], this)();
                data.toggleclicked = (tc + 1) % 2;
            });
            return this;
        };
    }(jQuery));

    $('.startBtn').clickToggle(function() {   
        $(this).addClass('on');
        $('.onOff-text').text('on');
        game.switch = 'on';
        if(game.switch == 'on')
        {
            game.init();
            game.bgAnimation('body', 'on');
            game.colorSizeAnim('on');
        }
    },
    function() {
        $(this).removeClass('on');
        $('.onOff-text').text('off');
        game.stopGame();
    });
   
    
    
    
    $('.tile').on('click', function(){
        
        if(game.switch == 'on')
        {
           if(game.userCurrentScore == 5)
            {
                $('.wrapper').addClass('ani-wrapper');
               
            }
            game.checkCurrentStep($(this).attr('id'));
        }
        
    });
});

var Game = function main()
    {
        this.switch = '0ff';
        this.userCurrent;
        this.counter;
        this.turn;
        this.aiTurn;
        this.userTurn;
        this.userBestScore;
        this.userCurrentScore;
        this.pattern;
        this.difficulty = 50;

        this.init = function()
        {
            
            if(this.switch == 'on')
            {
                if(this.getScore('score') == null)
                {
                  document.cookie = 'score=0';
                  this.userBestScore = this.getScore('score');
                }else
                {
                  this.userBestScore = this.getScore('score');
                }
                
                
                this.userCurrentScore = 0;
                this.userCurrent = [];
                this.counter = 0;
                this.turn = 'ai';
                this.aiTurn = 0;
                this.userTurn = 0;
                this.pattern = [];
                this.getPattern();
                this.ai();
            }else if(this.switch == 'off'){
                return false;
            }
        }

        this.ai = function()
        {
            $('#counter').text(this.aiTurn + 1);
            $('#bestScore').text(this.userBestScore);
            if(this.turn == 'ai' && this.switch == 'on')
             {
                 if(this.userCurrent.length == this.difficulty)
                    {
                        alert('GAME OVER! You Win!');
                        this.stopGame();
                        return false;
                    }
                 var interval = setInterval(function(){
                    var color = this.pattern[this.counter];
                     
                    if(this.counter <= this.aiTurn)
                    {
                        $('#'+color).fadeTo('fast', 0.5).fadeTo('fast', 1);
                        this.counter++;
                        this.userCurrentScore = this.counter;                        
                        
                    }
                    else
                    { 
                        this.counter = 0;
                        this.userTurn = 0;
                        this.aiTurn++;
                        clearInterval(interval);
                        
                    }
                
                }.bind(this), 500);
                this.turn = 'player';
            }
        }

        this.getPattern = function()
        {
            var colors = ['red', 'green', 'blue', 'yellow'];
            for(var i = 0; i < this.difficulty; i++)
            {
                var ranNum = Math.floor(Math.random() * colors.length);
                var color = colors[ranNum];
                this.pattern.push(color);
            }

        }

        this.checkCurrentStep = function(color)
        {
            this.userTurn++;
            if(color != this.pattern[this.userTurn - 1] && this.switch == 'on')
            {
                alert('FAil! Next step was: '+this.pattern[this.userTurn - 1]+' Score: '+ (this.userCurrentScore - 1)+' Your best: '+(this.userBestScore));
                this.init();
                
            }else if(this.turn == 'player' && this.userTurn == this.aiTurn && this.userCurrent.length < 10)
            {
                
                $('#score').text(this.userCurrentScore);
                if(this.userBestScore <= this.userCurrentScore)
                {
                    document.cookie = 'score=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
                    document.cookie = 'score='+this.userCurrentScore;
                    this.userBestScore = this.getScore('score');    
                }
                this.turn = 'ai';
                this.userCurrent.push(color);
                this.ai();
                
            }

        }

        this.bgAnimation =  function(el, s)
        {
           if(s == 'on')
            {
                window.bgIntervals = window.setInterval(setBgColor, 16000);
                function setBgColor()
                {
                    var ran = Math.floor(Math.random() * (111111 + 999999) - 111111);
                     
                    $(el).css({
                        backgroundColor: '#'+ran,
                        transition: '7s ease-in-out'
                    });
                   
                }

            }else if(s == 'off'){
                window.clearInterval(window.bgIntervals);
                $(el).css({
                        backgroundColor: 'white',
                        transition: '5s ease-in-out'
                    });

            }
            
        
            
        }
        this.colorSizeAnim = function(trigger)
        {
            if(this.switch ==  'on' && trigger == 'on')
            {
                window.sizeAniInterval = window.setInterval(function()
                {
                    for(var i = 0; i < this.pattern.length; i++)
                    {
                        var ranSec = Math.floor(Math.random() * (1 + 10) - 1);
                        var ransize = Math.floor((Math.random() * 150) + 40);
                        $('#'+this.pattern[i]).css({
                            transition: 'width 10s, height 10s',
                            width: ransize+'px',
                            height: ransize+'px'
                        });

                    }
                    
                }.bind(this), 16000);

            }else if(trigger == 'off'){
                window.clearInterval(window.sizeAniInterval);
                $('#red').css({
                    transition: 'width 8s, height 8s',
                    width: '60px',
                    height: '60px'
                });
                $('#green').css({
                    transition: 'width 8s, height 8s',
                    width: '120px',
                    height: '120px'
                });
                $('#blue').css({
                    transition: 'width 8s, height 8s',
                    width: '90px',
                    height: '90px'
                });
                $('#yellow').css({
                    transition: 'width 8s, height 8s',
                    width: '150px',
                    height: '150px'
                });

            }

           
             
        }

        this.stopGame = function()
        {
            
            this.switch = 'off';
            this.init();
            $('#counter').text('--');
            $('#score').text('--');
            $('.wrapper').removeClass('ani-wrapper');
            this.bgAnimation('body', 'off');
            this.colorSizeAnim('off');
        }
        this.getScore = function(cookie) 
        {
            var regexp = new RegExp("(?:^" + cookie + "|;\s*"+ cookie + ")=(.*?)(?:;|$)", "g");
            var result = regexp.exec(document.cookie);
            return (result === null) ? null : result[1];
        }

         //for debugging
        this.showVariables = function()
        {
            console.log('Patter: '+this.pattern+' | User current pattern: '+this.userCurrent+
            ' | Turn: '+this.turn+' | Counter: '+this.counter+' | AI Turn: '+this.aiTurn+
            ' | User Turn: '+this.userTurn);
            
        }

    }


