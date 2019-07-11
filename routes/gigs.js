const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gigs');

//List all gigs
router.get('/', (req, res) => {
  Gig.findAll()
    .then(gigs => {
      res.render('gigs', {
        gigs
      });
    })
    .catch(err => {
      console.log(err);
    });
});

//Display Add gig form
router.get('/add', (req, res) => res.render('add'));

//Add gig
router.get('/add', (req, res) => {
  const data = {
    title: 'Simple Wordpress developer',
    technology: 'wordpress,php,html,css',
    budget: '3000',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic type",
    contact_email: 'test@test.com'
  };
  let { title, technology, budget, description, contact_email } = data;

  //Insert In to Table
  Gig.create({
    title,
    technology,
    description,
    budget,
    contact_email
  })
    .then(gig => res.redirect('/gigs'))
    .catch(err => console.log(err.message));
});

module.exports = router;
