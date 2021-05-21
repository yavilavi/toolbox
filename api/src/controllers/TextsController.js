const express = require('express');

const router = express.Router();

const Text = require('../models/Text');

const { isAuthorizedMiddleware } = require('../middlewares/auth/index');

router.use(isAuthorizedMiddleware);

const generateTitle = (content) => {
  let title = content.replace(/(<([^>]+)>)/gi, '');
  title = title.split(' ').slice(0, 3);
  title = `${title.join(' ')} ...`;
  return title;
};

/* GET Texts listing. */
router.get('/', (req, res) => {
  const { id } = req.user;
  Text.find({ user_id: id })
    .then((texts) => {
      const mappedTexts = texts.map((t) => ({
        title: t.title,
        // eslint-disable-next-line no-underscore-dangle
        id: t._id,
        content: t.content,
      }));
      res.status(200).json(mappedTexts);
    })
    .catch(() => {
      res.status(500).json({ error: 'There was a problem fetching texts from database' });
    });
});

router.get('/get/:id', (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  Text.find({ user_id: userId, _id: id })
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

router.post('/', (req, res) => {
  const { content } = req.body;
  const { id } = req.user;
  if (content || content === '') {
    const title = generateTitle(content);
    Text.create({ user_id: id, content, title })
      .then((text) => {
        res.status(201).json({ text: { id: text._id, content: text.content }, success: true });
      })
      .catch(() => {
        res.status(500).json({ error: 'Something went wrong please try again' });
      });
  } else {
    res.status(400).json({ error: 'content is not valid' });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  if (id) {
    Text.findOneAndDelete({ _id: id, user_id: userId })
      .then(() => {
        res.status(204).json({ success: true });
      })
      .catch(() => {
        res.status(500).json({ error: 'Something went wrong please try again' });
      });
  } else {
    res.status(400).json({ error: 'Invalid id' });
  }
});

router.put('/', (req, res) => {
  const { content, id } = req.body;
  const userId = req.user.id;
  if (content && id && content !== '') {
    const title = generateTitle(content);
    Text.updateOne({ _id: id, user_id: userId }, { content, title })
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch(() => {
        res.status(500).json({ error: 'Something went wrong please try again' });
      });
  } else {
    res.status(400).json({ error: 'Invalid data' });
  }
});

module.exports = router;
