const Razorpay=require('razorpay')

const razorpay=new Razorpay({
    key_id:'rzp_test_Cn2c0cRyN3dAh0',
    key_secret:'80dj0KzogKgUEGt9ZDBjuROW',
})

app.post('/order',(req, res)=>{
    var options = {
        amount: 10000,  // amount in the smallest currency unit
        currency: "INR",
      };

      razorpay.orders.create(options, function(err,order){
        
            console.log(order)
            res.json(order)
      })
})

axios.post('/order').then((info)=>{
    console.log(info)

        var options = {
            "key": "rzp_test_Cn2c0cRyN3dAh0", // Enter the Key ID generated from the Dashboard
            "amount": "10000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "App",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": info.data.id,
            "callback_url": "/is-order-complete",
            "theme":{
                "color": "#3399cc"
            }
        };
    
        var rzp1=new Razorpay(options);
        rzp1.open();
})

app.post('/is-order-complete', (req, res,next)=> {
    razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument)=>{
        if(paymentDocument.status=='captured'){
            console.log('payment successfull')
            next();
        }
        else{
            console.log("Something went wrong")
            return res.status(422).render('apply',
                {pageTitle:'Apply',
                info: {
                    name: name,
                    email: email,
                    num : num,
                    address: address,
                    dist: dist,
                    aadhar: aadhar,
                    shop: shop,
                    desi: desi,
                    shopAd: shopAd
                },
          errorMessage: "Payment Unsucessfull"
        });
        }
    })
})

