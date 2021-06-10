(function(){

    log("Tracking divulgadores active");
  
    var apiEndpoint = 'https://ws.tst.divulgadores.app.br/sales/register';

    var url = window.location.href;

    window.divulgadoresObserver = false;

    var storageName = "divulgadoresOrder";

    var product = window.produto || window.product;
    
    var partnerId = findPartnerId(url);

    if (partnerId !== null) { createOrder(); } 

    startObserver();

    var failPreventOrder = {
        orderId: '',
        orderNumber: '',
    };

    function startObserver() {
        if (location.pathname === '/checkout/easy') {
            koOberserverFailPrevent();
            log("Oberserver started");
            window.divulgadoresObserver = true;
            window.addEventListener("hashchange", oberserver, false);
        }
    }

    function koOberserverFailPrevent() {
        document.addEventListener("DOMContentLoaded", function(){
            ko.postbox.subscribe('checkout/payment/submit', function(event) {
                try {
                    if (event.Order.OrderID && event.Order.OrderNumber) {
                        failPreventOrder.orderId = event.Order.OrderID;
                        failPreventOrder.orderNumber = event.Order.OrderNumber;
                    } else if(event.Response.Custom['PlaceOrder.OrderID'] && event.Response.Custom['PlaceOrder.OrderID']) {
                        failPreventOrder.orderId = event.Response.Custom['PlaceOrder.OrderID'];
                        failPreventOrder.orderNumber = event.Response.Custom['PlaceOrder.OrderNumber'];
                    }
                    log({m:"Submit Response", response: event});
                } catch(err){
                    console.error(err);
                }
                
            });
        });
    }

    function oberserver(event) {
        if (location.hash === '#confirmation' && getMememoryOrder()) {
            log("Oberserver fired");
            setTimeout(function(){ 
                completeOrder();
                sendOrder();
            },2000);
        } 
    }

    function findPartnerId(url) {
        var id = null;
        var index = url.indexOf('partner=')
        if (url.indexOf('partner=') > -1) {
            id = url.slice(index, url.length);
            id = id.slice(id.indexOf('=')+1, id.length)
            log("Partner Id active: "+id);
        }
        return id;
    }

    function createOrder() {
        let order = {
            userId: partnerId,
            orderId: null,
            orderNumber: null,
            custumerId: browsingContext.Common.Customer.CustomerID || null,
            products: [],
            total: 0.00
        }
        log({m: "Order created", order: order});
        saveOrder(order);
    }
    function completeOrder() {
        var order = getMememoryOrder();
        try {
            EasyCheckout.ModelData.Basket.Items.forEach(function (item) { 
                
                var newProduct = new Object();
                newProduct.productId = item.ProductID;
                newProduct.productName = item.Name;
                newProduct.productPrice = item.RetailPrice
                newProduct.qtd = item.Quantity;
                newProduct.skuId = item.SkuID || 0;

                order.products.push(newProduct);
            });
            order.total = EasyCheckout.ModelData.Basket.SubTotal;
            order.orderId = (EasyCheckout.ModelData.Order.OrderID || ko.postbox.topicCache['checkout/payment/submit'].value.Response.Custom['PlaceOrder.OrderID'] || failPreventOrder.orderId).toString();
            order.orderNumber = (EasyCheckout.ModelData.Order.OrderNumber || ko.postbox.topicCache['checkout/payment/submit'].value.Response.Custom['PlaceOrder.OrderNumber'] || failPreventOrder.orderNumber).toString();
            order.custumerId = browsingContext.Common.Customer.CustomerID || EasyCheckout.ModelData.Customer.CustomerID || ko.postbox.topicCache['checkout/payment/submit'].value.Checkout.CustomerID;
        } catch(err) {
            console.error(err);
        }
        log({m:"Order complete", order: order});
        saveOrder(order);
    }

    function getMememoryOrder() {
        return JSON.parse(sessionStorage.getItem(storageName));
    }

    function saveOrder(order) {
        var tempOrder = JSON.stringify(order);
        sessionStorage.setItem(storageName, tempOrder);
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
        }).then(function(res){ deleteOrderFromMemory(); log({m:"Order sended sucessfuly", order: order}); }).catch(
            function(err) {
                log({err: "Order send error", details: err});
            }
        );
    }

    function deleteOrderFromMemory() {
        sessionStorage.removeItem(storageName);
    }

    function log(m) {
        var logs = JSON.parse(sessionStorage.getItem("DivulgadoresLogs")) || [];
        logs.push({date:new Date().toISOString(), message: m});
        logs = JSON.stringify(logs);
        sessionStorage.setItem("DivulgadoresLogs", logs);
    }
})();
