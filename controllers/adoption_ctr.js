const router = require('express').Router();
const db = require('../models');

//Controllers routes for Adoption
//GET route pet adoption
router.get('/', (req, res) => {
  db.Adoption.find()
    .then(pets => {
      res.render('adoption/index_adoption', {pets});
    })
    .catch(err => {
      console.log('err', err);
      res.render('error404');
    })
})

//GET add pet adoption
router.get ('/new', (req, res) => {
    res.render('adoption/new_adoption')
})

//POST add pet adoption
router.post('/', (req, res) => {
  db.Adoption.create(req.body)
    .then(() => {
      res.redirect('/adoption');
    })
    .catch(err => {
      if(err && err.name === 'ValidationError'){
        let message = "Validation Error: "
        for(var field in err.errors){
          message+= `${field} was ${err.errors[field].value}.`
          message+= `${err.errors[field].message}`
        }
        console.log('Validation errore message', message)
        res.render('adoption/new_adoption', {message})
      }
      else{
        res.render('error404');
      }
    })
})

//Alissa--->Marisol I put in some code to test out the show page on my index, but i can't get it to generate an id number in the url. 
//hopefully once katie finalizes the mongodb seeders and database content in teh collections.js and mongo_index.js it will be fixed. 
//GET show pet adoption
router.get('/:id', (req, res) => {
    // res.send("GET adoption/show")
    res.render('adoption/show_adoption')
    //mongo code
    // db.Adoption.findById(req.params.id)
    // .then(pets => {
    //   res.render('adoption/show_adoption', {pets});
    // })
    // .catch(err => {
    //   res.render('error404');
    // })
})
// I used Postman to check route above. It's good as is. Once we connect data on Mongoose, I will include the commented sections.

//GET edit pet adoption
router.get('/:id/edit', (req, res) => {
  db.Adoption.findById(req.params.id)
    .then(pets => {
      res.render('adoption/edit_adoption', {pets})
    })
    .catch(err => {
      res.render('error404')
    })
})

//PUT edit pet adoption
router.put('/:id', (req, res) =>{
  db.Adoption.findByIdAndUpdate(req.params.id, req.body, {runValidators: true})
    .then(() => {
      res.redirect(`/adoption/${req.params.id}`);
    })
    .catch(err => {
      res.render('error404');
    })
})

//DELETE pet adoption


module.exports = router;