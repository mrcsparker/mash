path = require "path"
fs = require "fs"

Mash = require __dirname + "/../lib"

class Vendor extends Mash.Model
  productCount: ->
    this.products.length

class Product extends Mash.Model
  vendorName: ->
    this.vendor.name

  vendorFile: ->
    "#{__dirname}/data/vendors/#{this.vendor_id}.json"

describe 'Product', ->
  it 'should have the correct vendor data', ->
    product = new Product
    product.json(fs.readFileSync("#{__dirname}/data/products/1.json"))

    vendor = new Vendor
    vendor.json(fs.readFileSync(product.vendorFile()))

    product.vendor.name.should.equal vendor.name
    product.vendor.id.should.equal vendor.id
    product.vendor_id.should.equal vendor.id