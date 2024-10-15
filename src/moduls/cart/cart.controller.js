import { Cart } from "../../../dbConnection/models/cart.model.js"
import { Coupon } from "../../../dbConnection/models/coupon.model.js"
import { Product } from "../../../dbConnection/models/product.model.js"
import { catchError } from "../../middleware/catchError.js"
import { appError } from "../../utils/appError.js"

function calcTotalPrice(isCartExist) {
    isCartExist.totalCartPrice = isCartExist.cartItems.reduce((prev, item) => prev += item.quantity * item.price, 0)  
   if(isCartExist.discount)
   {
    isCartExist.totalCartPriceAfterDiscount = isCartExist.totalCartPrice - (isCartExist.totalCartPrice * isCartExist.discount) / 100
   }
}

const addToCart = catchError(async (req, res, next) => {
    let isCartExist = await Cart.findOne({ user: req.user._id })
    let product = await Product.findById(req.body.product)
    if (!product) return next(new appError('product not found', 404))
    req.body.price = product.price
    if (req.body.quantity > product.stock) return next(new appError('sold out', 404))

    if (!isCartExist) {
        let cart = new Cart({
            user: req.user._id,
            cartItems: [req.body],
        })
        calcTotalPrice(cart)
        await cart.save()
        res.json({ message: 'successs', cart: cart })
    }
    else {
        let item = isCartExist.cartItems.find(item => item.product == req.body.product)
        if (item) {
            item.quantity += req.body.quantity || 1
            if (item.quantity > product.stock) return next(new appError('sold out', 404))
        }
        if (!item) isCartExist.cartItems.push(req.body)
        calcTotalPrice(isCartExist)
        await isCartExist.save()
        res.json({ message: 'successs', cart: isCartExist })
    }

})

const updateQuantity = catchError(async (req, res, next) => {
    let cart = await Cart.findOne({ user: req.user._id })
    let item = cart.cartItems.find(item => item.product == req.params.id)
    if (!item) return next(new appError("product not found", 404))

    item.quantity = req.body.quantity
    calcTotalPrice(cart)
    await cart.save()
    res.json({ message: 'successs', cart })
})

const getCartItems = catchError(async (req, res, next) => {
    let cart = await Cart.findOne({ user: req.user._id })
    cart || next(new appError("cart not found", 404))
    !cart || res.json({ message: 'successs', cart })

})

const removeItemFromCart = catchError(async (req, res, next) => {
    let cart = await Cart.findOneAndUpdate({ user: req.user._id }, { $pull: { cartItems: { _id: req.params.id } } }, { new: true })
    calcTotalPrice(cart)
    cart || next(new appError("product not found", 404))
    !cart || res.json({ message: 'successs', cart })

})

const clearUserCart = catchError(async (req, res, next) => {
    let cart = await Cart.findOneAndDelete({ user: req.user._id })
    cart || next(new appError("cart not found", 404))
    !cart || res.json({ message: 'successs', cart })
})


const applayCoupon = catchError(async (req, res, next) => {
    let coupon = await Coupon.findOne({ code: req.body.code, expires: { $gte: Date.now() } })
    if (!coupon) return next(new appError("Opps coupon invalid", 404))
    let cart = await Cart.findOne({ user: req.user._id })
    
     cart.discount = coupon.discount
    await cart.save()
    res.json({ message: 'successs', cart })

})





export {
    addToCart, updateQuantity, removeItemFromCart, getCartItems, clearUserCart, applayCoupon
}
