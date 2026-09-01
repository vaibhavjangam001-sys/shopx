class ApiFeatures {
  constructor(query, queryParams) {
    this.query = query;
    this.queryParams = queryParams;

    this.filterQuery = {};
    this.page = 1;
    this.limit = 10;
  }

  search(searchFields = []) {
    const keyword = this.queryParams.keyword?.trim();

    if (!keyword || searchFields.length === 0) {
      return this;
    }

    const searchQuery = {
      $or: searchFields.map((field) => ({
        [field]: {
          $regex: keyword,
          $options: 'i',
        },
      })),
    };

    this.filterQuery = {
      ...this.filterQuery,
      ...searchQuery,
    };

    this.query = this.query.find(searchQuery);

    return this;
  }

  filter(filterQuery = {}) {
    if (Object.keys(filterQuery).length === 0) {
      return this;
    }

    this.filterQuery = {
      ...this.filterQuery,
      ...filterQuery,
    };

    this.query = this.query.find(filterQuery);

    return this;
  }

  sort(allowedFields = []) {
    const sortBy = this.queryParams.sort;

    if (sortBy) {
      const sortFields = sortBy.split(',');

      const validSortFields = sortFields.filter((field) => {
        const fieldName = field.startsWith('-') ? field.slice(1) : field;
        return allowedFields.includes(fieldName);
      });

      if (validSortFields.length > 0) {
        this.query = this.query.sort(validSortFields.join(' '));
      } else {
        this.query = this.query.sort('-createdAt');
      }
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  fields(allowedFields = []) {
    const fields = this.queryParams.fields;

    if (!fields || allowedFields.length === 0) {
      return this;
    }

    const validFields = fields
      .split(',')
      .filter((field) => allowedFields.includes(field));

    if (validFields.length > 0) {
      this.query = this.query.select(validFields.join(' '));
    }

    return this;
  }

  paginate() {
    this.page = Number(this.queryParams.page) || 1;
    this.limit = Number(this.queryParams.limit) || 10;

    const skip = (this.page - 1) * this.limit;

    this.query = this.query.skip(skip).limit(this.limit);

    return this;
  }
}

export default ApiFeatures;
