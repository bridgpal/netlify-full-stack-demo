const KontentDelivery = require('@kontent-ai/delivery-sdk');
const util = require('util')


var deliveryClient = KontentDelivery.createDeliveryClient({
    environmentId: 'cbdb567e-0cfc-0012-9089-88d49d69f949'
});

deliveryClient
    .items()
    .type('blog')
    .toPromise()
    .then((response) => console.log(response.data.items));