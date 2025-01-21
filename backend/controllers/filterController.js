const db = require("../db/db");
const { client } = require("../search/Typesense");

class FiltersControler{
    async filterBy(req, res){
        const { filters } = req.body;

        try {
            let query = []
            Object.values(filters).map((el)=> query.push(el))
            const queryString = query.join(' ');
            const filterParams = {
                'q': queryString,
                'query_by': 'filters, diff'
            }

            const filter = await client.collections('recipes').documents().search(filterParams);

            if(filter.hits && filter.hits.length > 0){
                const recipes = filter.hits.map(hit => hit.document);
                return res.status(200).json(recipes);
            } else {
                return res.status(404).json({message: "No recipes found"});
            }
        } catch (error) {
            return res.status(500).json({message: "Error with filter", error: error.message})
        }
    }

    async sortBy(req, res){
        
    }

}

module.exports = new FiltersControler();