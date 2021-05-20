const express = require('express');

const router = express.Router();

const Text = require('../models/Text');

/* GET users listing. */
router.get('/', (req, res, next) => {
  Text.find({ user_id: '60a5bedc209aa32a50ec34c2' })
    .then((texts) => {
      texts = texts.map((t) => ({
        title: t.title,
        id: t._id,
      }));
      res.status(200).json(texts);
    })
    .catch((e) => {
      res.status(500).json(e.stack);
    });
});

router.post('/', (req, res) => {
  const { content } = req.body;
  if (content || content === '') {
    let title = content.replace(/(<([^>]+)>)/gi, '');
    title = title.split(' ').slice(0, 4);
    title = `${title.join(' ')} ...`;
    Text.create({ user_id: '60a5bedc209aa32a50ec34c2', content, title, date: Date.now() })
      .then((text) => {
        res.status(201).json({ text, success: true });
      })
      .catch((e) => {
        res.status(500).json(e.stack);
      });
  } else {
    console.log(content);
    res.status(400).json({ error: 'content is not valid' });
  }
});

router.get('/get/:id', (req, res) => {
  const { id } = req.params;
  Text.find({ user_id: '60a5bedc209aa32a50ec34c2', _id: id })
    .then((text) => {
      if (text.length !== 0) {
        res.status(200).json(text[0].content);
      } else {
        res.status(404).json({ error: 'not found' });
      }
    })
    .catch((e) => {
      res.status(404).json({ error: 'not found' });
    });
});

module.exports = router;
