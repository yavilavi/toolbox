const express = require('express');

const router = express.Router();

const Text = require('../models/Text');

/* GET users listing. */
router.get('/', (req, res) => {
  Text.find({ user_id: '60a5bedc209aa32a50ec34c2' })
    .then((texts) => {
      const mappedTexts = texts.map((t) => ({
        title: t.title,
        // eslint-disable-next-line no-underscore-dangle
        id: t._id,
        content: t.content,
      }));
      res.status(200).json(mappedTexts);
    })
    .catch((e) => {
      res.status(500).json(e.stack);
    });
});

router.post('/', (req, res) => {
  const { content } = req.body;
  if (content || content === '') {
    let title = content.replace(/(<([^>]+)>)/gi, '');
    title = title.split(' ').slice(0, 3);
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
    .catch(() => {
      res.status(404).json({ error: 'not found' });
    });
});

router.delete('/', (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  console.log(id);
  if (id) {
    Text.findByIdAndDelete(id)
      .then(() => {
        res.status(204).json({ success: true });
      })
      .catch((e) => {
        res.status(500).json({ error: e.message });
      });
  } else {
    res.status(400).json({ error: 'Invalid id' });
  }
});

router.put('/', (req, res) => {
  const { content, id } = req.body;
  console.log(req.body);
  if (content && id && content !== '') {
    let title = content.replace(/(<([^>]+)>)/gi, '');
    title = title.split(' ').slice(0, 3);
    title = `${title.join(' ')} ...`;
    Text.updateOne({ _id: id }, { content, title })
      .then((ut) => {
        res.status(200).json({ ut, success: true });
      })
      .catch((e) => {
        res.status(500).json({ error: e.message });
      });
  } else {
    res.status(400).json({ error: 'Invalid data' });
  }
});

module.exports = router;
