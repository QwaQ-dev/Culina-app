const Typesense = require("typesense");

const client = new Typesense.Client({
    'nodes': [{
        'host': 'localhost',
        'port': '8108',
        'protocol': 'http',
    }],
    'apiKey': 'xyz',
    'connectionTimeoutSeconds': 2
})

const schema = {
    'name': 'receipt1',
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

const popa = client.collections().create(schema);

console.log(popa)

module.exports = client;