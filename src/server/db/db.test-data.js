const {ProductGroup} = require("./product.group.model");
const {ProductSupplier} = require("./product.supplier.model");
const {Document} = require("./document.model");
const enums = require("./model.enum");
const {Product} = require("./product.model");

(async () => {
    let existing = await ProductSupplier.find();
    let toCreate = [];
    while (toCreate.length + existing.length < 20) {
        toCreate.push({
            name: `supplier ${random()}`
        })
    }
    if (toCreate.length) {
        await ProductSupplier.insertMany(toCreate);
    }

    // let imageDocument = await createImageDocument('/home/misha/Desktop/4438d51c52f3f88761d6cd95f84db254.jpeg', enums.DocumentType.PRODUCT_SUPPLIER_LOGO);
    // let one = await ProductSupplier.findOne();
    // one.logo = imageDocument;
    // await one.save();


})();


(async () => {
    let existing = await ProductGroup.find();
    let toCreate = [];
    while (toCreate.length + existing.length < 20) {
        toCreate.push({
            name: `group ${random()}`
        })
    }
    if (toCreate.length) {
        await ProductGroup.insertMany(toCreate);
    }

    existing = await ProductGroup.find();
    for (let x of [
        {p: 0, c: [1, 2, 3]},
        {p: 5, c: [6, 7, 8]}
    ]) {
        let parent = existing[x.p];
        for (let c of x.c) {
            let child = existing[c];
            child.parent = parent;
            await child.save();
        }
    }


})();


(async () => {
    let supplier = await ProductSupplier.findOne();
    let group = await ProductGroup.findOne();

    let existing = await Product.find();
    let toCreate = [];
    while (toCreate.length + existing.length < 20) {
        toCreate.push({
            name: `product ${random()}`,
            description: `description ${random()}`,
            price: 25.6,
            uplift: 10,
            group:group,
            supplier:supplier,
            images:[]
        })
    }


    if (toCreate.length) {
        await Product.insertMany(toCreate);
    }


})();


function createImageDocument(path, type) {
    return Document.create({
        name: require('path').basename(path),
        type: type,
        contentType: 'png',
        content: require('fs').readFileSync(path, 'utf8'),
    });
}


function random() {
    let result = [];
    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
}