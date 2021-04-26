(function(){
    var apiEndpoint = 'https://ws.tst.divulgadores.app.br/sales/register';

    var url = window.location.href;

    window.divulgadoresObserver = false;

    var storageName = "divulgadoresOrder";

    var product = window.produto || window.product;
    
    var partnerId = findPartnerId(url);

    if (partnerId !== null) { createOrder(); } 

    startObserver();

    function startObserver() {
        if (location.pathname === '/checkout/easy') {
            window.divulgadoresObserver = true;
            window.addEventListener("hashchange", oberserver, false);
        }
    }

    function oberserver(event) {
        if (location.hash === '#confirmation' && getMememoryOrder()) {
            completeOrder();
            sendOrder();
        } 
    }

    function findPartnerId(url) {
        var id = null;
        var index = url.indexOf('partner=')
        if (url.indexOf('partner=') > -1) {
            id = url.slice(index, url.length);
            id = id.slice(id.indexOf('=')+1, id.length)
        }
        return id;
    }

    function createOrder() {
        if (!product) return;
        
        let order = {
            userId: partnerId,
            orderId: null,
            orderNumber: null,
            custumerId: browsingContext.Common.Customer.CustomerID || null,
            productId: product.ProductID,
            productName: product.Name,
            qtd: 0,
            skuId: product.SKU,
            productPrice: product.RetailPrice,
            total: 0.00
        }
        saveOrder(order);
    }

    function completeOrder() {
        var order = getMememoryOrder();
        EasyCheckout.ModelData.Basket.Items.forEach(function (item) {
            if (item.ProductID === order.productId && item.SKU === order.skuId) {
                order.qtd = item.Quantity;
            }
        });        
        order.total = EasyCheckout.ModelData.Basket.SubTotal;
        try {
            order.orderId = Order.OrderID;
            order.orderNumber = Order.OrderNumber;
        } catch(err) {
            console.error(err);
        }
        if (order.custumerId === null) {
            order.custumerId = browsingContext.Common.Customer.CustomerID;
        }
        saveOrder(order);
    }

    function getMememoryOrder() {
        return sessionStorage.getItem(storageName);
    }

    function saveOrder(order) {
        sessionStorage.setItem(storageName, order);
    }

    function sendOrder() {
        var order = getMememoryOrder();

        fetch(apiEndpoint, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }).then(function(res){ sessionStorage.removeItem(storageName) })
    }
})();
