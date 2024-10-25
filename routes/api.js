'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      console.log(req.body);
      const { text, locale } = req.body;

      if (text === "" || text === " ") {
        res.send({ error: 'No text to translate' });
        return;
      };

      if (!text || !locale) {
        res.send({ error: 'Required field(s) missing' })
        return;
      };

      if (locale !== "american-to-British" || locale !== "british-to-american") {
        res.send({ error: 'Invalid value for locale field' });
        return;
      };
      res.send({ text: req.body.text, translation: "coming soon" })
    });
};
