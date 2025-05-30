class ApIFeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    filter(){
        const excludedFields = ['sort','page','limit','fields']
        let queryObj = {...this.queryString}
        excludedFields.forEach(el=> delete queryObj[el])
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g,match=>`$${match}`)
        this.query=this.query.find(JSON.parse(queryStr));
        return this;
    }

    sort(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this
    }

    fields(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ')
            this.query = this.query.select(fields)
        }else{
            this.query = this.query.select('-__v')
        }
        return this
    }

    paginition(){
        if(this.queryString.page){
            const page = this.queryString.page*1 || 1
            const limit = this.queryString.limit*1 || 100
            const skip = (page-1)*limit
            this.query = this.query.skip(skip).limit(limit)
        }
    
        return this
    }


}

export {ApIFeatures}