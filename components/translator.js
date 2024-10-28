const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    getDictionary(locale) {
        let lexicon = {};
        if (locale === "american-to-british") {
            lexicon = { ...americanToBritishSpelling, ...americanOnly, ...americanToBritishTitles }
            for (const [key, value] of Object.entries(britishOnly)) {

                lexicon[value] = key
            };
        }
        if (locale === "british-to-american") {
            lexicon = { ...britishOnly };
            for (const [key, value] of Object.entries(americanToBritishSpelling)) {
                lexicon[value] = key
            };

            for (const [key, value] of Object.entries(americanOnly)) {
                lexicon[value] = key
            };
            for (const [key, value] of Object.entries(americanToBritishTitles)) {
                lexicon[value] = key
            };
        }
        return lexicon;
    }
    translate({ text, locale }) {
        let textArr = text.split(" ");

        const lexicon = this.getDictionary(locale);
        console.log("textArr", textArr);
        let didTranslate = false;
        let previousWord = "";
        let previousIndices = [];
        let toBeSliced = [];
        let cleanTranslation = [];
      
        let translation = textArr.map((word, index) => {
            if (word in lexicon) {
                didTranslate = true;
                previousWord = "";
                previousIndices.push(index)
                return `<span class="highlight">${lexicon[word]}</span>`;
            } else {
                previousWord = (previousWord + " " + word).trimStart();
                console.log("previousWord", previousWord, typeof previousWord, "lexicon[previousWord]", lexicon[previousWord])
                if (previousWord in lexicon) {
                    didTranslate = true;
                    let result = previousWord;
                    previousWord = "";
                    //Todo  remove last placed word
                    toBeSliced.push(previousIndices.pop())
                    console.log("found previousWord", result);
                    return `<span class="highlight">${lexicon[result]}</span>`;
                } else {
                    let removeOne = previousWord.split(" ");
                    console.log("removeOne", removeOne);
                    if (removeOne.length >= 3) {
                        removeOne.shift();
                        console.log("removeOne just shifted", removeOne);
                        let withoutFirstWord = removeOne.join(" ");
                        console.log("removeOne joined ", "withoutFirstWord", withoutFirstWord);
                        if (withoutFirstWord in lexicon) {
                            didTranslate = true;
                            let result = withoutFirstWord;
                            previousWord = "";
                            //Todo  remove last placed word
                            toBeSliced.push(previousIndices.pop());
                            console.log("found previousWord", result);
                            return `<span class="highlight">${lexicon[result]}</span>`;
                        };
                    }
                }
            }
            previousIndices.push(index);
            return word;

        });
        console.log("translation before slice", translation);
        console.log("toBeSliced", toBeSliced);
        let count = 0
        for (let word of toBeSliced) {
            translation.splice(word - count, 1);
            count++
        };
        console.log("translation", translation);
        if (didTranslate) {
            return translation.join(" ")
        } else {
            return "Everything looks good to me!";
        }
    }
}
module.exports = Translator;