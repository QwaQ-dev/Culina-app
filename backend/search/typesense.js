const Typesense = require("typesense");
const { Receipts } = require('../models/models');

const client = new Typesense.Client({
    'nodes': [{
        'host': 'typesense',
        'port': '8108',
        'protocol': 'http',
    }],
    'apiKey': 'xyz',  
    'connectionTimeoutSeconds': 10,
});


async function createCollectionIfNotExist() {
    try {
        const collections = await client.collections().retrieve();
        const collectionExists = collections.some(col => col.name === 'receipts');
        if (!collectionExists) {
            console.log('Creating collection "receipts"...');
            const schema = {
                'name': 'receipts',
                'fields': [
                    { 'name': 'id', 'type': 'string' },
                    { 'name': 'name', 'type': 'string' },
                    { 'name': 'descr', 'type': 'string' },
                    { 'name': 'diff', 'type': 'string' },
                    { 'name': 'filters', 'type': 'string[]' },
                    { 'name': 'imgs', 'type': 'string[]' },
                    { 'name': 'author', 'type': 'string' }
                ]
            };
            await client.collections().create(schema);
            console.log('Collection "receipts" created');

            await new Promise(resolve => setTimeout(resolve, 10000));
        }
    } catch (error) {
        console.error('Error checking or creating collection:', error);
    }
}


async function typesenseFill() {
    try {
        await createCollectionIfNotExist();
        
        const receiptsFromDB = await Receipts.findAll();
        const formattedReceipts = receiptsFromDB.map((receipt) => ({
            name: receipt.name,
            descr: receipt.descr,
            diff: receipt.diff,
            filters: JSON.parse(receipt.filters),
            imgs: Object.values(receipt.imgs),
            author: receipt.author,
        }));

        const result = await client.collections('receipts').documents().import(formattedReceipts, { action: 'create' });
        console.log("Documents added to Typesense:", result);
    } catch (error) {
        console.error("Error while adding documents to Typesense:", error);
    }
}

async function deleteTypesense() {
    try {
        const del = await client.collections('receipts').delete();
        console.log("Collection 'receipts' deleted.");
    } catch (error) {
        console.error("Error while deleting collection:", error);
    }
}

async function retrive() {
    try {
        const retrive = await client.collections('receipts').retrieve();
        console.log("Collection schema:", retrive);
    } catch (error) {
        console.error("Error while retrieving collection:", error);
    }
}

// Экспорт функций
module.exports = {
    client,
    typesenseFill,
    deleteTypesense,
    retrive,
    createCollectionIfNotExist
};