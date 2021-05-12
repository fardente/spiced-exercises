function waitThenRun(func) {
    setTimeout(func, 1500);
}

function sayHello() {
    console.log("Hello!");
}

waitThenRun(sayHello);

waitThenRun(function () {
    console.log("Hello!");
    waitThenRun(function () {
        console.log("Goodbye!");
    }); // logs 'Goodbye!' 1.5 seconds later
}); // logs 'Hello!' 1.5 seconds later
