import addressRouter from "./address/address.routes.js"
import authRouter from "./auth/auth.routes.js"
import brandRouter from "./brand/brand.routes.js"
import CartRouter from "./cart/cart.routes.js"
import categoryRouter from "./category/category.routes.js"
import CouponRouter from "./coupon/coupon.routes.js"
import OrderRouter from "./order/order.routes.js"
import productRouter from "./product/product.routes.js"
import reviewRouter from "./review/review.routes.js"
import subCategoryRouter from "./subcategory/subcategory.routes.js"
import userRouter from "./user/user.routes.js"
import wishlistRouter from "./wishlist/wishlist.routes.js"



export const bootstrap = (app) =>{
    app.use('/api/categories',categoryRouter)
    app.use('/api/subcategories',subCategoryRouter)
    app.use('/api/brands',brandRouter)
    app.use('/api/products',productRouter)
    app.use('/api/users',userRouter)
    app.use('/api/auth',authRouter)
    app.use('/api/reviews',reviewRouter)
    app.use('/api/wishlist',wishlistRouter)
    app.use('/api/addresses',addressRouter)
    app.use('/api/coupons',CouponRouter)
    app.use('/api/carts',CartRouter)
    app.use('/api/orders',OrderRouter)
}