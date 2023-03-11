import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants'

// handles the state for the product list which we see on home page.
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    // where we make fetch request
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    // when we get teh data
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// reviews is an array.
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    // where we make fetch request
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state }
    // when we get teh data
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
