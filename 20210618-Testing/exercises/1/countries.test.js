const countries = require("./countries");
const find = countries.find;

// console.log(countries.find());

test("Returns an empty array given empty String", () => {
    let result = find("");
    expect(result).toEqual([]);
});

test("Returns max of 4 elements", () => {
    let result = find("a");
    expect(result.length).toBeLessThanOrEqual(4);
});

test("Search is case insensitive", () => {
    let result = find("germany");
    let inputStringUpper = find("GERMANY");
    expect(result.length).toBeGreaterThan(0);
    expect(result).toEqual(inputStringUpper);
});

test("Returns an empty array if no countries found", () => {
    let result = find("Atlantis");
    expect(result).toEqual([]);
});
