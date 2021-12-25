let validate = require('./validator')
let productModel = require('../models/productModel')
let userModel = require('../models/userModel')
let awsCon = require('./awsController')

let releaseProduct = async function (req, res) {

    try {
        let reqBody = req.body
        let files = req.files

        if (!validate.isValidRequestBody(reqBody)) {
            res.status(400).send({ status: false, message: "request body is required" })
            return
        }

        let { title, description, price, currencyId, currencyFormat, productImage, style, availableSizes } = reqBody

        // let availSiz = JSON.parse(availableSizes)
        console.log(typeof availableSizes)
        if (!validate.isValid(title)) {
            res.status(400).send({ status: false, message: "enter valid title" })
            return
        }

        if (!validate.isValid(description)) {
            res.status(400).send({ status: false, message: "enter valid description" })
            return
        }

        if (!validate.isValid(price)) {
            res.status(400).send({ status: false, message: "price is required" })
            return
        }

        if (!validate.isValid(currencyId)) {
            res.status(400).send({ status: false, message: "currencyId is required" })
            return
        }

        if (!validate.isValid(currencyFormat)) {
            res.status(400).send({ status: false, message: "currencyFormat is required" })
            return
        }

        // a

        if (!validate.isValid(availableSizes)) {
            res.status(400).send({ status: false, message: "size is required" })
            return
        }

        // if (!validate.isValidSize(availableSizes)) {
        //     res.status(400).send({ status: false, message: "size is required" })
        //     return
        // }

        let findTitle = await productModel.findOne({ title })
        if (findTitle) {
            res.status(403).send({ status: false, message: "product with this title already exist it must be unique" })
            return
        }

        if (files && files.length > 0) {
            let uploadedFileURL = await awsCon.uploadFile(files[0])

            let saveProductData = {
                title,
                description,
                price,
                currencyId,
                currencyFormat,
                availableSizes,
                productImage: uploadedFileURL,
                style
            }
            console.log(typeof availSiz)

            let createProduct = await productModel.create(saveProductData)
            res.status(200).send({ status: false, message: `product ${title} created successfully`, data: createProduct })
            return
        } else {
            res.status(400).send({ status: false, message: "somthing unexpected happen" })
            return
        }
    } catch (error) {
        res.status(500).send({ seatus: false, message: error.message })
    }
}

// get product by query localhost:3000/
const getProduct = async function(req,res){
    try{

        if(req.query.size || req.query.name || req.query.priceGreaterThan || req.query.priceLessThan ){
            let availableSizes = req.query.size
            let title = req.query.name
            let priceGreaterThan = req.query.priceGreaterThan
            let priceLessThan = req.query.priceLessThan
            obj = {}
            if(availableSizes){
                obj.availableSizes = availableSizes
            }
            if(title){
                obj.title = {  $regex: '.*' + title.toLowerCase() + '.*' }
            }
            if(priceGreaterThan){
                obj.price = { $gt: priceGreaterThan}
            }
            if(priceLessThan){
                obj.price = { $lt: priceLessThan}
            }
            obj.isDeleted = false
            obj.deletedAt = null

            console.log(obj)
            const getProductsList = await productModel.find(obj).sort({price : 1})
            // console.log(getProductsList)
            if(!getProductsList || getProductsList.length == 0){
                res.status(400).send({status: false, message: `product is not available right now.`})
            }else{
                res.status(200).send({status: true, message:'Success', data: getProductsList})
            }
        }else{
            const getListOfProducts = await productModel.find({isDeleted:false, deletedAt: null}).sort({price:1})
            res.status(200).send({status: true, message:'Success', data: getListOfProducts })
        }
    }catch(err){
        res.status(500).send({status: false, msg : err.message})
    }

}

//get product Delails by id localhost:3000/products/:productId

const getProductById = async function(req,res){
    try{
        let id = req.params.productId

        if (!validate.isValidObjectId(id)) {
            res
                .status(404)
                .send({ status: false, message: `${id} is not valid user id ` });
            return;
        }

        let findPro = await productModel.findOne({_id: id})
        if(!findPro){
            res.status(404).send({status: false, message: `product is not available with this ${id} id`})
            return
        }

        let data = await productModel.find({_id: id, isDeleted: false, deletedAt: null})
        if(!data){
            res.status(400).send({status: false, message: "Product is not present with this ID. Please provide valid ID!!"})
        }
        res.status(200).send({status: true, message:"Success", data: data})
    }catch(err){
        res.status(500).send({status: false, message: err.message})
    }
}

module.exports = { releaseProduct, getProduct, getProductById }