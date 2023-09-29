


import {
    ALL_PRODUCT_FAILED,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERRORS
} from '../consants/productConsants'
export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
     
        case ALL_PRODUCT_REQUEST:

            return {
                loading: true,
                products: [],
            }
            case ALL_PRODUCT_SUCCESS:
                return {
                    loading: false,
                    products: action.payload.products,
                    productsCount: action.payload.productsCount,
                }
        case ALL_PRODUCT_FAILED:

            return {
                loading: false,
                error: action.payload,
            }
            case CLEAR_ERRORS:
            return {
               ...state,
                error: null
            }

        default:
          return state
    }

}