const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
const translator = new Translator;

suite('Functional Tests', () => {
    suite('POST request to /api/translate', () => {
        test('Translation with text and locale fields', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .send({ text: "Mangoes are my favorite fruit.", locale: "american-to-british" })
                .end((req, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, {
                        text: 'Mangoes are my favorite fruit.',
                        translation: 'Mangoes are my <span class="highlight">favourite</span> fruit.'
                    });
                });
            done();
        }).timeout(10000);

        test('Translation with text and invalid locale field', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .send({ text: "Mangoes are my favorite fruit.", locale: "invalid-to-invalid" })
                .end((req, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { error: 'Invalid value for locale field' });
                });
            done();
        }).timeout(10000);

        test('Translation with missing text field', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .send({ locale: "american-to-british" })
                .end((req, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { error: 'Required field(s) missing' });
                });
            done();
        }).timeout(10000);

        test('Translation with missing locale field', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .send({ text: "Mangoes are my favorite fruit." })
                .end((req, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { error: 'Required field(s) missing' });
                });
            done();
        }).timeout(10000);

        test('Translation with text and locale fields', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .send({ text: "", locale: "american-to-british" })
                .end((req, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { error: 'No text to translate' });
                });
            done();
        }).timeout(10000);

        test('Translation with text and locale fields', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .send({ text: "Mangoes are my favorite fruit.", locale: "british-to-american" })
                .end((req, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, {
                        text: 'Mangoes are my favorite fruit.',
                        translation: "Everything looks good to me!"
                    });
                });
            done();
        }).timeout(10000);
    });
});



