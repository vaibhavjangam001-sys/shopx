class ApiFeatures {
  constructor(query, queryParams) {
    this.query = query;
    this.queryParams = queryParams;
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

    this.query = this.query.find(keyword);

    return this;
  }

  filters() {
    const filters = {};

    if (this.queryParams.category) {
      filters.category = this.queryParams.category;
    }

    if (this.queryParams.brand) {
      filters.brand = this.queryParams.brand;
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

    this.query = this.query.find(filters);

    console.log(this.query);

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
}

export default ApiFeatures;
