export class ApiFeature {
    constructor(mongooseQuery, searchQuery) {
        this.mongooseQuery = mongooseQuery;
        this.searchQuery = searchQuery;
    }

    pagination() {
        let pageNumber = this.searchQuery.page * 1 || 1;
        if (this.searchQuery.page < 1) pageNumber = 1;
        const limit = 5;
        let skip = (parseInt(pageNumber) - 1) * limit;
        this.pageNumber = pageNumber;
        this.mongooseQuery.skip(skip).limit(limit);
        return this;
    }

    filter() {
        let filter = JSON.parse(JSON.stringify(this.searchQuery));
        filter = JSON.stringify(filter);
        filter = filter.replace(/(gt|gte|lt|lte)/, (value) => `$${value}`);
        filter = JSON.parse(filter);
        let excludedFields = ['page', 'sort', 'fields', 'search'];
        excludedFields.forEach((val) => delete filter[val]);
        this.mongooseQuery.find(filter);
        return this;
    }

    sort() {
        if (this.searchQuery.sort) {
            let sortedBy = this.searchQuery.sort.split(',').join(' ');
            this.mongooseQuery.sort(sortedBy);
        }
        return this;
    }

    fields() {
        if (this.searchQuery.fields) {
            let selectedFields = this.searchQuery.fields.split(',').join(' ');
            this.mongooseQuery.select(selectedFields);
        }
        return this;
    }

    search() {
        if (this.searchQuery.search) {
            this.mongooseQuery.find({
                $or: [
                    { title: { $regex: this.searchQuery.search, $options: 'i' } },
                    { name: { $regex: this.searchQuery.search, $options: 'i' } },
                    { description: { $regex: this.searchQuery.search, $options: 'i' } }
                ]
            });
        }
        return this;
    }
}