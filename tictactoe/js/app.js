$(document).ready(function(){
    var matches = [
    [1,5,9],[9,5,1],[3,5,7],[7,5,3],[1,4,7],[7,4,1],[2,5,8],[8,5,2],[3,6,9],[9,6,3],[1,2,3],[3,2,1],[4,5,6],[6,5,4],[7,8,9],[9,8,7]
    ];

    
    var user = [];
    $('.tile').on('click', function(){
        $(this).text('X');
        user.push(parseInt($(this).attr('id')));
        console.log(user);
        if(user.length == 3)
        {
            var result = checkIfWon(user);
            console.log(result);
            if(result == true)
            {
                alert('you won!');
            }
            user = [];
        }
    });

    function checkIfWon(arr)
    {
        var exist = false;
        for(var i = 0; i < matches.length; i++)
        {
            for(var j = 0; j < arr.length; j++)
            {
                if(matches[i].indexOf(arr[j]) != -1 && matches[i].indexOf(arr[j + 1]) != -1 && matches[i].indexOf(arr[j + 2]) != -1)
                {
                    exist = true;
                }
            }
            
        }
        if(exist == true)
        {
            return true;
        }else{
            return false;
        }

    }

});

