const data = {
    q: "Welcome to Ultimate Quiz, do you want to play?",
    answers: {
        no: "Okay, goodbye!",
        yes: {
            q: 'First Question: What does "ICANN" stand for?',
            answers: {
                "(1) International Conglomerate of Aeronautics and Nihilism":
                    "No that's incorrect!",
                "(2) Internet Corporation for assigned names and numbers": {
                    q: "Good job! Second Question: What was the item that was first scanned using a barcode?",
                    answers: {
                        "(1) A pack of Wrigley's chewing gum": {
                            q: "Indeed! Last Question: What is the oldest Building in Hamburg?",
                            answers: {
                                "(1) The Michel":
                                    "Nope, the first time it was finished was in 1750.",
                                "(2) The Rathaus":
                                    "Not so old... it was finished in 1897.",
                                "(3) The Lighthouse on Neuwerk":
                                    "Correct! Finished in 1310 and about 120km away from Hamburg, but belongs to Hamburg Mitte!",
                            },
                        },
                        "(2) Kellog's Cornflakes": "Good guess, but wrong...",
                        "(3) A pack of Marlboros": "No! Smoking's bad!",
                    },
                },
                "(3) Interesting Collection of American Nautical Nonsense":
                    "Almost...but no.",
            },
        },
    },
};

module.exports = data;
