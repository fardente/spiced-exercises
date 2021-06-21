module.exports = function fn(arg) {
    if (typeof arg == "string") {
        return arg.split("").reverse().join("");
    }

    if (Array.isArray(arg)) {
        return arg.map((x) => fn(x));
    }

    return null;
};
