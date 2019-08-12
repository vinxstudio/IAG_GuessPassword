const express = require ('express');
const app = express();
const actualpassword = "87654321";
app.use(express.json());

app.get('/api/new-password', (request, response) => {
      function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }
      
      var arr = [1, 2, 3, 4, 5, 6, 7, 8];
      
      do {
        generatedpassword = shuffle(arr);
      } while (generatedpassword == actualpassword);
    
    response.send({"hint":generatedpassword});
});

app.post('/api/verify-password', (request, response) => {
    var inputtedpassword = {
        "correct": true,
        "hint": request.body.hint,
        "answer": request.body.answer
    };
   
    if (!request.body.hint) {
        return response.status(400).send({
          success: 'false',
          message: 'Hint is required',
        });
    } else if (!request.body.answer) {
        return response.status(400).send({
            success: 'false',
            message: 'Answer is required',
          });
    } else {
        const output = [];
        const answerNumber = request.body.answer.toString();
        const actualNumber = actualpassword.toString();
        var correctFlag = true;

        for (var i = 0, len = answerNumber.length; i < len; i += 1) {
            if(answerNumber.charAt(i) == actualNumber.charAt(i))
                output.push(+answerNumber.charAt(i));
            else {
                output.push(+'-1');
                correctFlag = false;
            }
        }

        if(answerNumber.length < 8)
            correctFlag = false;
        
        if(!correctFlag) {
            inputtedpassword = {
                "correct": false,
                "highlight": output,
                "hint": request.body.hint,
                "answer": request.body.answer
            };
        }
    }

    return response.send(inputtedpassword);
});

// SET PORT
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}...`));
