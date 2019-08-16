const Loan = require('../models/loan')
// require('../models/book')
// require('../models/user')

function loansAll(req, res, next) {
  Loan
    .find()
    .populate('book borrower')
    .then(loans => res.json(loans))
    .catch(next)
}

function loanCreate(req, res, next) {
  req.body.borrower = req.currentUser
  req.body.book = req.params.id
  Loan
    .create(req.body)
    .then(loan => res.status(201).json(loan))
    .catch(next)
}

function loanShow(req, res) {
  Loan
    .findById(req.params.id)
    .populate('owner')
    .exec()
    .then(loan => {
      if(!loan) {
        return res.status(404).json({message: 'Could not find a loan with that id'})
      }
      return res.status(200).json(loan)
    })
    .catch(err => res.status(500).json(err))
}

function loanUpdate(req, res) {
  Loan
    .findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    .exec()
    .then(loan => res.status(200).json(loan))
    .catch(err => res.status(500).json(err))
}

function loanDelete(req, res) {
  Loan
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => res.sendStatus(204))
    .catch(err => res.status(500).json(err))
}

module.exports = {
  loansAll: loansAll,
  loanCreate: loanCreate,
  loanShow: loanShow,
  loanUpdate: loanUpdate,
  loanDelete: loanDelete
}
