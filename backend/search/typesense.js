const Typesense = require("typesense");
const { Receipts } = require('../models/models');

const client = new Typesense.Client({
    'nodes': [{
        'host': 'typesense',
        'port': '8108',
        'protocol': 'http',
    }],
    'apiKey': 'xyz',  
    'connectionTimeoutSeconds': 2
});

const schema = {
    'name': 'receipts',
    'fields': [
        {
            'name': 'id',
            'type': 'string',
            'facet': false
        },
        {
            'name': 'name',
            'type': 'string',
            'facet': false
        },
        {
            'name': 'descr',
            'type': 'string',
            'facet': false
        },
        {
            'name': 'diff',
            'type': 'string',
            'facet': false
        },
        {
            'name': 'filters',
            'type': 'string[]',
            'facet': false
        },
        {
            'name': 'imgs',
            'type': 'string[]',
            'facet': false
        },
        {
            'name': 'author',
            'type': 'string',
            'facet': false
        }
    ]
};

async function typesenseFill() {
    try {
        const receiptsFromDB = await Receipts.findAll();

        const receiptsSchema = await client.collections().create(schema);

        const formattedReceipts = receiptsFromDB.map((receipt) => {
            return {
                id: receipt.id.toString(),
                name: receipt.name,
                descr: receipt.descr,
                diff: receipt.diff,
                filters: JSON.parse(receipt.filters),  
                imgs: Object.values(receipt.imgs),    
                author: receipt.author,
            };
        });

        const result = await client.collections('receipts').documents().import(formattedReceipts, { action: 'create' });

        console.log("Documents added to Typesense:", result);
    } catch (error) {
        console.error("Error while adding documents to Typesense:", error);
    }
}

async function deleteTypesense() {
    try {
        const del = await client.collections('receipts').delete();
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

module.exports = {
    client,
    typesenseFill,
    deleteTypesense,
    retrive
};
