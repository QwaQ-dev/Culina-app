const { Receipts } = require("../models/models");

class ReceiptController{
    async createReceipt(req, res){
        const {name, descr, diff, filters, author} = req.body;
        const imagesUrl = req.images;

        if(!imagesUrl) {
            return res.status(500).json({message: "Error uploading images"})
        }
        try {
            await Receipts.create({
                name,
                descr,
                diff,
                filters,
                imgs: imagesUrl,
                author: author
            })
            return res.status(200).json({message: "Receipt add"});
        } catch (error) {
            return res.status(500).json({
                message: "Error with adding receipt", 
                error: error.message});
        }
    };  

    async oneReceipt(req, res){
        const id = req.params.id;

        try {
            const receipt = await Receipts.findOne({
                where: {
                    id: id
                }
            });

            if(receipt.length === 0) {
                return res.status(500).json({message: "No receipt with this id"});
            } else {
                return res.status(200).json(receipt);
            }
        } catch (error) {
            return res.status(500).json({message: "Error with getting card by id", error: error.message});
        }
    };

    async allReceipts(req, res){
        try {
            const request = await Receipts.findAll();
            let receipts = [];

            request.forEach((el) => {
                receipts.push(el);
            });

            return res.status(200).json(receipts)
        } catch (error) {
            return res.status(500).json({message: "Error with getting all receipts", error: error.message});
        }
    };

    async userReceipts(req, res){
        const author = req.params.author;

        try {
            const request = await Receipts.findAll({
                where: {
                    author: author
                }
            });

            if(request.length === 0){
                return res.status(500).json({message: "This user has no receipts yet"})
            } else {
                let receipts = [];

                request.forEach((el) => {
                    receipts.push(el);
                });

                return res.status(200).json(receipts);
            }
            
        } catch (error) {
            return res.status(500).json({message: "Error with getting user receipts", error: error.message});
        };
    };
}

module.exports = new ReceiptController();