// const Razorpay = require('razorpay')

// const razorpay = new Razorpay({
//     key_id: 'rzp_test_uGoq5ADrFTgYRAhk',
//        key_secret: 'FySe2f58UYtg6Hjkj1a5s6clk9B'
//     })

//     app.post('/order', async (req, res) => {
//         // initializing razorpay
//         const razorpay = new Razorpay({
//             key_id: req.body.keyId,
//             key_secret: req.body.keySecret,
//         });
    
//         // setting up options for razorpay order.
//         const options = {
//             amount: req.body.amount,
//             currency: req.body.currency,
//             receipt: "any unique id for every order",
//             payment_capture: 1
//         };
//         try {
//             const response = await razorpay.orders.create(options)
//             res.json({
//                 order_id: response.id,
//                 currency: response.currency,
//                 amount: response.amount,
//             })
//         } catch (err) {
//            res.status(400).send('Not able to create order. Please try again!');
//         }
//     });