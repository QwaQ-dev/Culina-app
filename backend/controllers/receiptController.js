const db = require('../db/db');

class ReceiptController{
    async createReceipt(req, res){
        const {name, descr, diff, filters, author} = req.body;
        const imagesUrl = req.images;

        if(!imagesUrl) {
            res.status(500).json({message: "Error uploading images"})
        }
        try {
            await db.query("INSERT INTO dev.receipts (name, descr, diff, filters, imgs, author) VALUES ($1, $2, $3, $4, $5, $6)",
                [name, descr, diff, filters, imagesUrl, author]);
            res.status(200).json({message: "Receipt add"});
        } catch (error) {
            res.status(500).json({
                message: "Error with adding receipt", 
                error: error.message});
        }
    };  

    async oneReceipt(req, res){
        const id = req.params.id;

        try {
            const request = await db.query("SELECT * FROM dev.receipts WHERE id = $1",
                                     [id])
            if(request.rows.length === 0) {
                res.status(500).json({message: "No receipt with this id"});
            } else {
                res.status(200).json(request.rows[0])
            }
        } catch (error) {
            res.status(500).json({message: "Error with getting card by id", error: error.message});
        }
    };

    async allReceipts(req, res){
        try {
            const request = await db.query("SELECT * FROM dev.receipts");
            let receipts = [];

            request.rows.forEach((el) => {
                receipts.push(el);
            })

            res.status(200).json(receipts)
        } catch (error) {
            res.status(500).json({message: "Error with getting all receipts", error: error.message});
        }
    };

    async userReceipts(req, res){
        const author = req.params.author;

        try {
            const request = await db.query("SELECT * FROM dev.receipts WHERE author = $1", [author]);

            if(request.rows.length === 0){
                res.status(500).json({message: "This user has no receipts yet"})
            } else {
                let receipts = [];

                request.rows.forEach((el) => {
                    receipts.push(el);
                });

                res.status(200).json(receipts);
            }
            
        } catch (error) {
            res.status(500).json({message: "Error with getting user receipts", error: error.message});
        };
    };
}

module.exports = new ReceiptController();