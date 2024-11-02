const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    getDictionary(locale) {
        // create two dictionaries
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
        // separate end punctuation from text
        let punctuation = "";
        const punctuationRegex = /[\.|\?|\!]$/;
        let punctuationCheck = text.match(punctuationRegex);
        // console. log("punctuationCheck", punctuationCheck);
        if (punctuationCheck) {
            // console.log("punctuation[0]", punctuationCheck[0], "at index", punctuationCheck.index);
            text = text.slice(0, punctuationCheck.index);
            punctuation = punctuationCheck[0];
        }
        console.log("punctuation", punctuation);
        console.log("text", text);
        // turn text string to array 
        let textArr = text.split(/\s/g);
        // get correct dictionary
        const lexicon = this.getDictionary(locale);
        console.log("textArr", textArr);
        // initiate variables
        let didTranslate = false;
        let previousWord = "";
        let previousIndices = [];
        let toBeSliced = [];
        let timeRegXAm = /(\d?\d)(\:)(\d\d)/;
        let timeRegXBr = /(\d?\d)(\.)(\d\d)/;
        // function to replace capital letters of found entries
        const handleCase = (word) => {
            let result = lexicon[word.toLowerCase()];
            console.log("result", result);
            result = result.replace(result.charAt(0), result.charAt(0).toUpperCase());
            return result;
        };
        // reset after match
        const postTranslated = () => {
            didTranslate = true;
            previousWord = "";
            return;
        }

        let translation = textArr.map((word, index) => {
            // pass end punctuation
            if (word === "." || word === "?" || word === "!") {
                return word;
            }
            // handle single-word match
            if (word in lexicon) {
                postTranslated();
                return `<span class="highlight">${lexicon[word]}</span>`;
                // handle time american-to-british
            } else if (timeRegXAm.test(word) && locale === "american-to-british") {
                let newTime = word.replace(":", ".");
                console.log("newTime", newTime);
                postTranslated();
                return `<span class="highlight">${newTime}</span>`;
                // handle time british-to-american
            } else if (timeRegXBr.test(word) && locale === "british-to-american") {
                let newTime = word.replace(".", ":");
                console.log("newTime", newTime);
                postTranslated();
                return `<span class="highlight">${newTime}</span>`;
                // match upper case entry
            } else if (word.toLowerCase() in lexicon) {
                let result = handleCase(word);
                postTranslated();
                return `<span class="highlight">${result}</span>`;
            }
            // handle multiple-word entries
            {   //collect previous words as string for testing
                previousWord = (previousWord + " " + word).trim();
                console.log("previousWord", previousWord, typeof previousWord, "lexicon[previousWord]", lexicon[previousWord]);
                // check string
                if (previousWord in lexicon) {
                    let result = previousWord;
                    console.log('previousWord.split(" ").length', previousWord.split(" ").length);
                    // if match was three words, save additional index for removal
                    if (previousWord.split(" ").length === 3) {
                        toBeSliced.push(previousIndices.pop());
                    }
                    // save index of word to be removed
                    toBeSliced.push(previousIndices.pop());
                    // reset 
                    postTranslated();
                    console.log("found previousWord", result);
                    // return translation
                    return `<span class="highlight">${lexicon[result]}</span>`;
                    // if no match, repeat check in lowercase
                } else if (previousWord.toLowerCase() in lexicon) {
                    let result = handleCase(previousWord);
                    console.log('previousWord.split(" ").length', previousWord.split(" ").length)
                    if (previousWord.split(" ").length === 3) {
                        toBeSliced.push(previousIndices.pop());
                    }
                    toBeSliced.push(previousIndices.pop());
                    postTranslated();
                    return `<span class="highlight">${result}</span>`;
                    // if no match and there are three previous words remove first word and check
                } else {
                    let removeOne = previousWord.split(" ");
                    console.log("removeOne", removeOne);
                    if (removeOne.length === 3) {
                        removeOne.shift();
                        console.log("removeOne just shifted", removeOne);
                        previousWord = removeOne.join(" ");
                        console.log("removeOne joined ", "withoutFirstWord", previousWord);

                        if (previousWord in lexicon) {
                            let result = previousWord;
                            console.log("found previousWord", result);
                            toBeSliced.push(previousIndices.pop());
                            postTranslated();
                            return `<span class="highlight">${lexicon[result]}</span>`;
                        } else if (previousWord.toLowerCase() in lexicon) {
                            let result = handleCase(previousWord);
                            postTranslated();
                            return `<span class="highlight">${result}</span>`;
                        };
                    }
                }
            }
            // if no matches, save index and return word 
            previousIndices.push(index);
            return word;

        });
        console.log("translation before slice", translation);
        // descending sort indices to be removed
        toBeSliced.sort((a, b) => b - a);
        console.log("toBeSliced", toBeSliced);
        // console log words to be removed
        for (let word of toBeSliced) {
            console.log(translation[word])
        }
        // remove translated words
        for (let index of toBeSliced) {
            translation.splice(index, 1);
        };
        console.log("translation", translation);
        // if anything was translated, return translation
        if (didTranslate) {
            return translation.join(" ").concat(punctuation);
            // else return this
        } else {
            return "Everything looks good to me!";
        }
    }
}
module.exports = Translator;