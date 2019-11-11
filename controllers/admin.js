const Product = require('../models/products')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product',
    { 
        path: '/admin/add-product', 
        title: 'Add product', 
        edit: false 
    });
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title, req.body.imageUrl, req.body.price, req.body.description);
    product.save();
    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const prodid= req.params.productId;
    if(!editMode){
       return res.redirect('/');
    }
    Product.findById(prodid, (product)=>{
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            path: '/admin/edit-product', 
            title: 'Edit product',
            edit: editMode,
            product: product
        });
    })
}

exports.postEditProduct = (req, res, next)=>{
    const prodId = req.body.productId;
    const updatedtitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImgUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    const updatedProduct = new Product(updatedtitle, updatedImgUrl, updatedPrice, updatedDesc);
    updatedProduct.save(prodId);
    res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next)=>{
    const id = req.body.productId;
    Product.deleteById(id);
    res.redirect('/admin/products');
}

exports.getAdminProducts = (req, res, next)=>{
    Product.fetchAll(products=>{
        res.render('admin/products', {
            prods: products,
            path: '/admin/products',
            title: 'Admin Products'
        });
    })
}