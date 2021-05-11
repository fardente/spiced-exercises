var a = {
    Berlin: "Germany",
    Paris: "France",
    "New York": "USA",
};

var b = {};

for (var i in a) {
    b[a[i]] = i;
}
console.log(b);
