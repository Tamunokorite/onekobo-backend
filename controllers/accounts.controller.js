const { Account } = require('../models');

const controller = {};

controller.getAccounts = async (req, res) => {
    /*
    
    TODO: Add functionality to get the list of accounts

    */

    try {
        await Account.find({}, (err, result) => {
            if (err) throw err;
            return res.status(200).json({"accounts": result});
        }).clone().catch((err) => console.log(err));
    } catch (err) { 
        console.log(err);
    }

};

controller.getAccount = async (req, res) => {
    /*
    
    TODO: Add functionality to get an account

    */
    try {
        const email = req.params.email;
        await Account.findOne({ userEmail: email }, (err, result) => {
            if (err) throw err;
            return res.status(200).json({"account": result});
        }).clone().catch((err) => console.log(err));
    } catch (err) { 
        console.log(err);
    }
};

controller.creditAccount = async (req, res) => {
    try {
        const email = req.params.email;
        const account = await Account.findOne({ userEmail: email });
        // TODO: Add functionality to credit an account with pasystack
        const newBalance = account.balance + req.body.amount;
        await Account.updateOne({ userEmail: email }, {balance: newBalance}, (err, result) => {
            if (err) throw err;
            return res.status(200).json({"success": "Your account has been credited with NGN" + req.body.amount + " Bal: NGN" + newBalance + "CR"});
        }).clone().catch((err) => console.log(err));
    } catch (err) { 
        console.log(err);
    }
   
};

controller.debitAccount = async (req, res) => {
    try {
        const email = req.params.email;
        const account = await Account.findOne({ userEmail: email });
        // TODO: Add functionality to debit an account with pasystack
        const newBalance = account.balance - req.body.amount;
        await Account.updateOne({ userEmail: email }, {balance: newBalance}, (err, result) => {
            if (err) throw err;
            return res.status(200).json({"success": "Your account has been debited with NGN" + req.body.amount + " Bal: NGN" + newBalance + "CR"});
        }).clone().catch((err) => console.log(err));
    } catch (err) { 
        console.log(err);
    }
};

controller.getCards = async (req, res) => {
    /*
    
    TODO: Add functionality to get the list of cards belonging to an account

    */
};

controller.getCard = async (req, res) => {
    /*
    
    TODO: Add functionality to get a card

    */
};

controller.addCard = async (req, res) => {
    /*
    
    TODO: Add functionality to add a card to an account with paystack

    */
};

controller.deleteCard = async (req, res) => {
    /*
    
    TODO: Add functionality to delete a card from an account

    */
};


module.exports = controller;