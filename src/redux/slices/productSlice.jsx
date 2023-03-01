import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApiUrl, staticTocken } from "../../constant/Baseurls";

export const getPromotionalProduct = createAsyncThunk(
  "getPromotionalProduct",
  async (categoryId) => {
    const formData = new FormData();
    formData.append("tocken", "XMCNBVGDTE734BCU65DW");
    formData.append("Categoryid", categoryId);
    try {
      const res = await axios.post(
        `${baseApiUrl}/EcommerceServices/ProductViaCategory`,
        formData
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const getSingleProductData = createAsyncThunk(
  "getSingleProductData",
  async (productId) => {
    const formData = new FormData();
    formData.append("tocken", "XMCNBVGDTE734BCU65DW");
    formData.append("Productid", productId);
    try {
      const res = await axios.post(
        `${baseApiUrl}/EcommerceServices/Productdescription`,
        formData
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const getProductsBySubCategory = createAsyncThunk(
  "getProductsBySubCategory",
  async (subCategoryId) => {
    const formData = new FormData();
    formData.append("tocken", "XMCNBVGDTE734BCU65DW");
    formData.append("SubCategoryid", subCategoryId);
    try {
      const res = await axios.post(
        `${baseApiUrl}/EcommerceServices/ProductViaSubCategory`,
        formData
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const getProductsByCategory = createAsyncThunk(
  "getProductsByCategory",
  async (categoryId) => {
    const formData = new FormData();
    formData.append("tocken", "XMCNBVGDTE734BCU65DW");
    formData.append("Categoryid", categoryId);

    try {
      const res = await axios.post(
        `${baseApiUrl}/EcommerceServices/ProductViaCategory`,
        formData
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const getNewArrivalProducts = createAsyncThunk(
  "getNewArrivalProducts",
  async () => {
    try {
      const res = await axios.post(
        `${baseApiUrl}/EcommerceServices/TopNewArrivalProducts`
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "getAllCategories",
  async () => {
    try {
      const res = await axios.get(
        `${baseApiUrl}/EcommerceServices/Getdashboardslider?tocken=XMCNBVGDTE734BCU65DW`
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const getSubCategory = createAsyncThunk(
  "getSubCategory",
  async (categoryId) => {
    console.log("Ye bhi chl rha hai");
    try {
      const res = await axios.get(
        `${baseApiUrl}/EcommerceServices/GetSubcategorieList?tocken=XMCNBVGDTE734BCU65DW&Categoryid=${categoryId}`
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    promotionData: {
      promotionProduct: [],
      loading: false,
      error: "",
    },
    singleProduct: {
      data: [],
      loading: false,
      error: "",
    },
    subCategoryByProduct: {
      getproBySubCat: [],
      loading: false,
      error: "",
    },
    categoryByProduct: {
      data: [],
      loading: false,
      error: "",
    },
    newArrivalProduct: {
      data: [],
      loading: false,
      error: "",
    },
    AllCat: {
      data: "",
      loading: false,
      error: "",
    },
    GetSubCat: {
      data: [],
      loading: false,
      error: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    // Get Promotional Data
    builder.addCase(getPromotionalProduct.pending, (state, action) => {
      state.promotionData.loading = true;
    });
    builder.addCase(getPromotionalProduct.fulfilled, (state, action) => {
      state.promotionData.promotionProduct = action.payload;
      state.promotionData.loading = false;
    });
    builder.addCase(getPromotionalProduct.rejected, (state, action) => {
      state.promotionData.error = action.error;
    });

    // Get Single Product
    builder.addCase(getSingleProductData.pending, (state, action) => {
      state.singleProduct.loading = true;
    });
    builder.addCase(getSingleProductData.fulfilled, (state, action) => {
      state.singleProduct.data = action.payload;
      state.singleProduct.loading = false;
    });
    builder.addCase(getSingleProductData.rejected, (state, action) => {
      state.singleProduct.error = action.error;
    });

    // Get Product By Sub Category
    builder.addCase(getProductsBySubCategory.pending, (state, action) => {
      state.subCategoryByProduct.loading = true;
    });
    builder.addCase(getProductsBySubCategory.fulfilled, (state, action) => {
      state.subCategoryByProduct.getproBySubCat = action.payload;
      state.subCategoryByProduct.loading = false;
    });
    builder.addCase(getProductsBySubCategory.rejected, (state, action) => {
      state.subCategoryByProduct.error = action.error;
    });

    // Get Product By Category
    builder.addCase(getProductsByCategory.pending, (state, action) => {
      state.categoryByProduct.loading = true;
    });
    builder.addCase(getProductsByCategory.fulfilled, (state, action) => {
      state.categoryByProduct.data = action.payload;
      state.categoryByProduct.loading = false;
    });
    builder.addCase(getProductsByCategory.rejected, (state, action) => {
      state.categoryByProduct.error = action.error;
    });

    // Get new Arrival Product
    builder.addCase(getNewArrivalProducts.pending, (state, action) => {
      state.newArrivalProduct.loading = true;
    });
    builder.addCase(getNewArrivalProducts.fulfilled, (state, action) => {
      state.newArrivalProduct.data = action.payload;
      state.newArrivalProduct.loading = false;
    });
    builder.addCase(getNewArrivalProducts.rejected, (state, action) => {
      state.newArrivalProduct.error = action.error;
    });
    // Get All Category
    builder.addCase(getAllCategories.pending, (state, action) => {
      state.AllCat.loading = true;
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.AllCat.data = action.payload;
      state.AllCat.loading = false;
    });
    builder.addCase(getAllCategories.rejected, (state, action) => {
      state.AllCat.error = action.error;
    });
    // Get Sub Category
    builder.addCase(getSubCategory.pending, (state, action) => {
      state.GetSubCat.loading = true;
    });
    builder.addCase(getSubCategory.fulfilled, (state, action) => {
      state.GetSubCat.data = action.payload;
      state.GetSubCat.loading = false;
    });
    builder.addCase(getSubCategory.rejected, (state, action) => {
      state.GetSubCat.error = action.error;
    });
  },
});

export default productSlice.reducer;
