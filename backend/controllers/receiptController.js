const { Receipts } = require("../models/models");
const { client, retrive } = require('../search/Typesense');

class ReceiptController{
    async createReceipt(req, res){
        const {name, descr, diff, filters, author} = req.body;
        const imagesUrl = req.images;
    
        if(!imagesUrl) {
            return res.status(500).json({message: "Error uploading images"})
        }
    
        try {
            try {
                const newReceipt = await Receipts.create({
                    name,
                    descr,
                    diff,
                    filters,
                    imgs: imagesUrl,
                    author
                });
                console.log('New receipt created:', newReceipt); 
            } catch (error) {
                console.error('Error adding receipt to DB:', error.message);
                return res.status(500).json({
                    message: "Error with adding receipt to DB",
                    error: error.message
                });
            }
            
    
            try {
                const type = await client.collections('receipts').documents().create({
                    name: name,
                    descr: descr,
                    diff: diff,
                    filters: Array.isArray(filters) ? filters : JSON.parse(filters),
                    imgs: Array.isArray(imagesUrl) ? imagesUrl : Object.values(imagesUrl),
                    author: author,
                });
                await retrive();
                console.log('Document added to Typesense:', type);
            } catch (error) {
                console.error('Error adding document to Typesense:', error.response?.data || error.message);
                return res.status(500).json({
                    message: "Error with adding receipt to Typesense",
                    error: error.message
                });
            }
            
    
            return res.status(200).json({message: "Receipt added"});
        } catch (error) {
            return res.status(500).json({
                message: "Error with adding receipt",
                error: error.message
            });
        }
    }

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

    async searchReceipts(req, res) { 
        const query = req.params.query;  
        try {
            const searchParams = {
                'q': query, 
                'query_by': 'name,descr,author'  
            };
        
            const search = await client.collections('receipts').documents().search(searchParams);
    
            if (search.hits && search.hits.length > 0) {
                const receipts = search.hits.map(hit => hit.document);
                return res.status(200).json(receipts);
            } else {
                return res.status(404).json({ message: "No receipts found" });
            }
        } catch (error) {
            console.error("Error with searching:", error);
            return res.status(500).json({ message: "Error with searching", error: error.message });
        }
    }
    
    
}

module.exports = new ReceiptController();