function logType(arg) {
    console.log("Input: ", arg, "Type: ", typeof arg);
    if (typeof arg === "undefined") {
        console.log("undefined!");
    } else if (arg === null) {
        console.log("null!");
    } else if (typeof arg === "number" && !isNaN(arg)) {
        console.log("number!");
    } else if (Number.isNaN(arg)) {
        console.log("not a number!");
    } else if (typeof arg === "string") {
        console.log("string!");
    } else if (typeof arg === "boolean") {
        console.log("boolean!");
    } else if (typeof arg === "bigint") {
        console.log("bigint!");
    } else if (typeof arg === "function") {
        console.log("funtion!");
        // } else if (Array.isArray(arg)) {
        //     console.log("array!");
    } else if (typeof arg === "object") {
        if (Array.isArray(arg)) {
            console.log("array!");
        } else {
            console.log("object!");
        }
    } else {
        console.log("I have no idea!");
    }
}

var t;
logType(t);
logType(null);
logType(3);
logType(2 * "asd");
logType("word");
logType(false);
logType(5n);
logType(console.log);
logType({});
logType({ sample: "object" });
logType([1, 2, 3, 4]);
logType(new Array(1, 2, 3));
