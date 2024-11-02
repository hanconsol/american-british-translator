const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator;

suite('Unit Tests', () => {
    suite("Translate to British English", () => {
        test("Mangoes are my favorite fruit.", () => {
            assert.include(translator.translate({ text: "Mangoes are my favorite fruit.", locale: "american-to-british" }), 'Mangoes are my <span class="highlight">favourite</span> fruit.');
        });
        test("I ate yogurt for breakfast.", () => {
            assert.include(translator.translate({ text: "I ate yogurt for breakfast.", locale: "american-to-british" }), 'I ate <span class="highlight">yoghurt</span> for <span class="highlight">brekky</span>.')
        });
        test("We had a party at my friend's condo.", () => {
            assert.include(translator.translate({ text: "We had a party at my friend's condo.", locale: "american-to-british" }), 'We had a party at my friend\'s <span class="highlight">flat</span>.')
        });
        test("Can you toss this in the trashcan for me?", () => {
            assert.include(translator.translate({ text: "Can you toss this in the trashcan for me?", locale: "american-to-british" }), 'Can you toss this in the <span class="highlight">bin</span> for me?')
        });
        test("The parking lot was full.", () => {
            assert.include(translator.translate({ text: "The parking lot was full.", locale: "american-to-british" }), 'The <span class="highlight">car park</span> was full.')
        });
        test("Like a high tech Rube Goldberg machine.", () => {
            assert.include(translator.translate({ text: "Like a high tech Rube Goldberg machine.", locale: "american-to-british" }), 'Like a high tech <span class="highlight">Heath Robinson device</span>.')
        });
        test("To play hooky means to skip class or work.", () => {
            assert.include(translator.translate({ text: "To play hooky means to skip class or work.", locale: "american-to-british" }), 'To <span class="highlight">bunk off</span> means to skip class or work.')
        });
        test("No Mr. Bond, I expect you to die.", () => {
            assert.include(translator.translate({ text: "No Mr. Bond, I expect you to die.", locale: "american-to-british" }), 'No <span class="highlight">Mr</span> Bond, I expect you to die.')
        });
        test("Dr. Grosh will see you now.", () => {
            assert.include(translator.translate({ text: "Dr. Grosh will see you now.", locale: "american-to-british" }), '<span class="highlight">Dr</span> Grosh will see you now.')
        });
        test("Lunch is at 12:15 today.", () => {
            assert.include(translator.translate({ text: "Lunch is at 12:15 today.", locale: "american-to-british" }), 'Lunch is at <span class="highlight">12.15</span> today.')
        });
    });
    suite("Translate to American English", () => {
        test("We watched the footie match for a while.", () => {
            assert.include(translator.translate({ text: "We watched the footie match for a while.", locale: "british-to-american" }), 'We watched the <span class="highlight">soccer</span> match for a while.')
        });
        test("Paracetamol takes up to an hour to work.", () => {
            assert.include(translator.translate({ text: "Paracetamol takes up to an hour to work.", locale: "british-to-american" }), '<span class="highlight">Tylenol</span> takes up to an hour to work.')
        });
        test("First, caramelise the onions.", () => {
            assert.include(translator.translate({ text: "First, caramelise the onions.", locale: "british-to-american" }), 'First, <span class="highlight">caramelize</span> the onions.')
        });
        test("I spent the bank holiday at the funfair.", () => {
            assert.include(translator.translate({ text: "I spent the bank holiday at the funfair.", locale: "british-to-american" }), 'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.')
        });
        test("I had a bicky then went to the chippy.", () => {
            assert.include(translator.translate({ text: "I had a bicky then went to the chippy.", locale: "british-to-american" }), 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.')
        });
        test("I've just got bits and bobs in my bum bag.", () => {
            assert.include(translator.translate({ text: "I've just got bits and bobs in my bum bag.", locale: "british-to-american" }), 'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.')
        });
        test("The car boot sale at Boxted Airfield was called off.", () => {
            assert.include(translator.translate({ text: "The car boot sale at Boxted Airfield was called off.", locale: "british-to-american" }), 'The <span class="highlight">trunk</span> sale at Boxted Airfield was called off.')
        });
        test("Have you met Mrs Kalyani?", () => {
            assert.include(translator.translate({ text: "Have you met Mrs Kalyani?", locale: "british-to-american" }), 'Have you met <span class="highlight">Mrs.</span> Kalyani?')
        });
        test("Prof Joyner of King's College, London.", () => {
            assert.include(translator.translate({ text: "Prof Joyner of King's College, London.", locale: "british-to-american" }), '<span class="highlight">Prof.</span> Joyner of King\'s College, London.')
        });
        test("Tea time is usually around 4 or 4.30.", () => {
            assert.include(translator.translate({ text: "Tea time is usually around 4 or 4.30.", locale: "british-to-american" }), 'Tea time is usually around 4 or <span class="highlight">4:30</span>.')
        });
    });
    suite("Highlight translation in:", () => {
        test("Mangoes are my favorite fruit.", () => {
            assert.include(translator.translate({ text: "Mangoes are my favorite fruit.", locale: "american-to-british" }), 'Mangoes are my <span class="highlight">favourite</span> fruit.');
        });
        test("I ate yogurt for breakfast.", () => {
            assert.include(translator.translate({ text: "I ate yogurt for breakfast.", locale: "american-to-british" }), 'I ate <span class="highlight">yoghurt</span> for <span class="highlight">brekky</span>.')
        });
        test("We watched the footie match for a while.", () => {
            assert.include(translator.translate({ text: "We watched the footie match for a while.", locale: "british-to-american" }), 'We watched the <span class="highlight">soccer</span> match for a while.')
        });
        test("Paracetamol takes up to an hour to work.", () => {
            assert.include(translator.translate({ text: "Paracetamol takes up to an hour to work.", locale: "british-to-american" }), '<span class="highlight">Tylenol</span> takes up to an hour to work.')
        });
    });
});
/*
Highlight translation in Mangoes are my favorite fruit.
Highlight translation in I ate yogurt for breakfast.
Highlight translation in We watched the footie match for a while.
Highlight translation in Paracetamol takes up to an hour to work.
*/
