const chalk = require("chalk");
const readline = require("readline");
const data = require("./data");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function ask(question) {
    if (typeof question == "string") {
        console.log(question);
        rl.close();
    } else if (typeof question == "object") {
        const options = Object.keys(question.answers);
        rl.question(
            question.q + "\n" + chalk.green(options.join("\n")) + "\n",
            function (answer) {
                // console.log(Object.keys(question), answer);
                answer = options.find(
                    (option) => option == answer || option[1] == answer
                );
                // console.log(answer);
                if (options.includes(answer)) {
                    ask(question.answers[answer]);
                } else {
                    console.log(chalk.red("Invalid answer! Try again!"));
                    ask(question);
                }
            }
        );
    }
    rl.close;
}
ask(data);
