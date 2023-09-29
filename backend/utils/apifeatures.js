

class ApiFetatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr
  }

  search() {
    const keyword = this.queryStr.keyword ? {
      name: {
        $regex: this.queryStr.keyword,
        $options: "i",

      },
    } : {};
    // console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }


  filter() {
    const queryCopy = { ...this.queryStr }
    // console.log(queryCopy)
    // Removing some fields for category

    const removeField = ["keyword", "page", "limit"];
    removeField.forEach((key) => delete queryCopy[key]);
    // console.log(queryCopy )


    // filter for price and range rating

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);


    this.query = this.query.find(JSON.parse(queryStr));
    // console.log(queryStr )
    return this;
  }
  pagination(resultPerPAge) {
    const currentpage = Number(this.queryStr.page) || 1

    const skip = resultPerPAge * (currentpage - 1)
    this.query = this.query.limit(resultPerPAge).skip(skip)
    return this
  }



};

module.exports = ApiFetatures;

