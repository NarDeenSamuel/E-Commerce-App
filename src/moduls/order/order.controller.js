import { Cart } from "../../../dbConnection/models/cart.model.js"
import { Order } from "../../../dbConnection/models/order.model.js"
import { Product } from "../../../dbConnection/models/product.model.js"
import { catchError } from "../../middleware/catchError.js"
import { appError } from "../../utils/appError.js"
import { getOne } from "../handlers/handler.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.SECRET_KEY_PAYMENT)


const createCashOrder = catchError(async (req, res, next) => {
    let cart = await Cart.findById(req.params.id)
    if(!cart) return next(new appError('cart not found',404))
    let totalOrderPrice =  cart.totalCartPriceAfterDiscount || cart.totalCartPrice
    let order = new Order({
        user:req.user._id,
        orderItems:cart.cartItems,
        shippingAddress:req.body.shippingAddress,
        totalOrderPrice
    })
    await order.save()
    let options = cart.cartItems.map((prod)=>{
        return ( {
            updateOne:{
                "filter":{_id: prod.product },
                "update":{$inc:{sold: prod.quantity , stock: - prod.quantity}}
            }
        })
    })
    
    Product.bulkWrite(options)
    await Cart.findByIdAndDelete(cart._id)
    
    res.json({message:"success",order})


})

const getUserOrders = catchError(async (req, res, next) => {
    let order = await Order.find({user:req.user._id}).populate('orderItems.product')
    if(!order) return next(new appError('order not found',404))
    res.json({message:"success",order})
    
})

const getAllOrders = catchError(async (req, res, next) => {
    let order = await Order.find().populate('orderItems.product')
    if(!order) return next(new appError('order not found',404))
    res.json({message:"success",order})
    
})

const getOneOrder = getOne(Order)
    

const createCheckOutSession = catchError(async (req, res, next) => {
    let cart = await Cart.findById(req.params.id)
    if(!cart) return next(new appError('cart not found',404))
    let totalOrderPrice =  cart.totalCartPriceAfterDiscount || cart.totalCartPrice
    let session =await stripe.checkout.sessions.create({
        line_items:[
            {
            price_data:{
                currency:'egp',
                unit_amount : totalOrderPrice * 100 ,
                product_data:{
                    name:req.user.name
                }
       },
       quantity:1     
        },
    ],
    mode:'payment',
    success_url:'https://github.com/NarDeenSamuel',
    cancel_url:'https://github.com/NarDeenSamuel',
    customer_email:req.user.userEmail,
    client_reference_id:req.params.id,
    metadata:req.body.shippingAddress,
    })

    res.json({message:"success",session})
})




export {
   createCashOrder,getUserOrders,getAllOrders,getOneOrder,createCheckOutSession
}
