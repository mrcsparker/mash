## mash

Create javascript models easily using JSON

*not much to see here right now*

## license

MIT

## written in 

coffeescript

### example

Examples are in coffeescript right now.

```coffeescript
class Vendor extends Mash.Model
	hasMany: -> [
		Product
	]
	
	fullName: ->
		this.name + ' : ' + this.address

class Product extends Mash.Model
	belongsTo: -> [
		Vendor
	]
	
	fullPrice: ->
		this.quantity * this.unit_price	

product = new Product()
product.json jsonText

console.log product.vendor.fullName()

vendor = new Vendor()
vendor.json jsonText

console.log vendor.products[0].fullPrice()


```


#### Also check out

* https://github.com/meltingice/node-activerecord
* https://github.com/FineLinePrototyping/angularjs-rails-resource


