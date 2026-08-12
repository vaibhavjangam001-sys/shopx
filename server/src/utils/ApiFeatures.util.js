class ApiFeatures {
  constructor(query, queryParams) {
    this.query = query;
    this.queryParams = queryParams;

    this.filterQuery = {};
    this.page = 1;
    this.limit = 10;
  }

  search() {
    const keyword = this.queryParams.keyword
      ? {
          productName: {
            $regex: this.queryParams.keyword,
            $options: 'i',
          },
        }
      : {};

    this.filterQuery = {
      ...this.filterQuery,
      ...keyword,
    };

    this.query = this.query.find(keyword);

    return this;
  }

  filters() {
    const filters = {};

    if (this.queryParams.category) {
      filters.category = this.queryParams.category;
    }

    if (this.queryParams.brand) {
      filters.brand = {
        $regex: this.queryParams.brand,
        $options: 'i',
      };
    }

    if (this.queryParams.minPrice || this.queryParams.maxPrice) {
      filters.price = {};

      if (this.queryParams.minPrice) {
        filters.price.$gte = Number(this.queryParams.minPrice);
      }

      if (this.queryParams.maxPrice) {
        filters.price.$lte = Number(this.queryParams.maxPrice);
      }
    }

    if (this.queryParams.minRating) {
      filters.rating = {
        $gte: Number(this.queryParams.minRating),
      };
    }

    if (this.queryParams.status) {
      filters.status = this.queryParams.status;
    }

    if (this.queryParams.isFeatured !== undefined) {
      filters.isFeatured = this.queryParams.isFeatured === 'true';
    }

    this.filterQuery = {
      ...this.filterQuery,
      ...filters,
    };

    this.query = this.query.find(filters);

    return this;
  }

  sort() {
    const sortBy = this.queryParams.sort;

    if (sortBy) {
      const sortFields = sortBy.split(',');

      const allowedSortFields = ['price', 'rating', 'productName', 'createdAt'];

      const validSortFields = sortFields.filter((field) => {
        const fieldName = field.startsWith('-') ? field.slice(1) : field;
        return allowedSortFields.includes(fieldName);
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

  fields() {
    const fields = this.queryParams.fields;

    const allowedFields = [
      'productName',
      'price',
      'discountPrice',
      'rating',
      'numOfReviewes',
      'images',
      'description',
    ];

    if (fields) {
      const fieldArray = fields.split(',');

      const validFields = fieldArray.filter((field) => {
        return allowedFields.includes(field);
      });

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
