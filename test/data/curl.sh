curl http://localhost:3000/products.json > products.json
curl http://localhost:3000/vendors.json > vendors.json

curl http://localhost:3000/products/[1-250].json -o "products/#1.json"
curl http://localhost:3000/vendors/[1-25].json -o "vendors/#1.json"
