const productModel=require("../model/Product")

exports.getProducts=async(req,res)=>{
    try{
        const products=await productModel.find()
        res.status(200).json(products)
    }
    catch(error){
        console.error(error)
        res.status(500).json({error:'server error'})
    }
}
exports.postProduct=async(req,res)=>{
    const {name, price, description,image}=req.body
    try{
        
        const newproduct=new productModel({name, price, description,image})
        await newproduct.save()
        res.status(201).json(newproduct)
    }catch(error){
        console.error(error)
        res.status(500).json({error:'server error'})
    }
}
exports.deleteProduct=async(req, res)=>{
    const {id}=req.params
    try{
        const deleteproduct=await productModel.findByIdAndDelete(id)
        if(!deleteproduct){
            return res.status(404).json({error:"product not found"})
        }
        res.status(200).json({message:"product deleted successfully"})
    }
    catch(error){
        console.error(error)
        res.status(500).json({error:"server error"})
    }
}
exports.updateProduct=async(req, res)=>{
    const {id}=req.params
    const {name, price, description,image}=req.body
    try{
        const updateproduct=await productModel.findByIdAndUpdate(id, {name, price, description,image}, {new:true})
        if(!updateproduct){
            return res.status(404).json({error:"product not found"})
        }
        res.status(200).json(updateproduct)
    }
    catch(error){
        console.error(error)
        res.status(500).json({error:"server error"})
    }
}
 