const express = require('express');
const { accountsController } = require('../controllers');
router = express.Router();

const auth = require("../middleware/auth");


// Get Accounts (Admin only)
router.get("/", auth, accountsController.getAccounts);

// Get Account 
router.get("/:email", auth, accountsController.getAccount);

router.post("/:email/credit", auth, accountsController.creditAccount);

router.post("/:email/debit", auth, accountsController.debitAccount);


module.exports = router;