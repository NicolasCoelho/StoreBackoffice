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
            log("Oberserver started");
            window.divulgadoresObserver = true;
            window.addEventListener("hashchange", oberserver, false);
        }
    }

    function oberserver(event) {
        if (location.hash === '#confirmation' && getMememoryOrder()) {
            log("Oberserver fired");
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
        log("Partner Id active: "+id);
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
        log({m: "Order created", order: order});
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
            order.orderId = EasyCheckout.ModelData.Order.OrderID;
            order.orderNumber = EasyCheckout.ModelData.Order.OrderNumber;
            order.custumerId = browsingContext.Common.Customer.CustomerID;
        } catch(err) {
            console.error(err);
        }
        if (order.custumerId === null) {
            order.custumerId = browsingContext.Common.Customer.CustomerID;
        }
        log({m:"Order complete", order: order});
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
        log("Sending order")
        fetch(apiEndpoint, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }).then(function(res){ deleteOrderFromMemory(); log("Order sended sucessfuly"); }).catch(
            function(err) {
                log({err: "Order send error", details: err});
            }
        );
        
    }

    function deleteOrderFromMemory() {
        sessionStorage.removeItem(storageName);
    }

    function log(m) {
        var logs = sessionStorage.getItem("DivulgadoresLogs") || [];
        
        logs.push({date:new Date().toISOString(), message: m});

        sessionStorage.setItem("DivulgadoresLogs", logs);
    }
})();
