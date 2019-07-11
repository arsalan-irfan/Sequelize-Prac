const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gigs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//List all gigs
router.get('/', (req, res) => {
  Gig.findAll()
    .then(gigs =>
      res.render('gigs', {
        gigs
      })
    )
    .catch(err => {
      console.log(err);
    });
});

//Display Add gig form
router.get('/add', (req, res) => res.render('add'));

//Add gig
router.post('/add', (req, res) => {
  let { title, technology, budget, description, contact_email } = req.body;
  let errors = [];

  if (!title) {
    errors.push({ text: 'Please add a title' });
  }
  if (!technology) {
    errors.push({ text: 'Please add some technologies' });
  }
  if (!description) {
    errors.push({ text: 'Please add a description' });
  }
  if (!contact_email) {
    errors.push({ text: 'Please add a contact email' });
  }
  if (errors.length > 0) {
    res.render('add', {
      errors,
      title,
      technology,
      budget,
      description,
      contact_email
    });
  } else {
    if (!budget) {
      budget = 'unknown';
    } else {
      budget = `$${budget}`;
    }
    //Make lowercase and remove space after comma
    technology = technology.toLowerCase().replace(/, /g, ',');

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
  }
});

//Search For Gigs
router.get('/search', (req, res) => {
  const { term } = req.query;
  term.toLowerCase();
  Gig.findAll({ where: { technology: { [Op.like]: '%' + term + '%' } } })
    .then(gigs => res.render('gigs', { gigs }))
    .catch(err => console.log(err.message));
});

module.exports = router;
