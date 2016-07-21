'use strict';

function printReceipt(tags) {
    let items = loadAllItems();
    let barcodes = formatBarcodes(tags);
    let mergedBarcodes = mergeBarcode(barcodes);
    let promotedItems = loadPromotions();
    let promotedCartItems = getPromotedItem(mergedBarcodes, promotedItems);
    let cartItermsInfo = getItems(promotedCartItems, items);
    let cartItemSubtotal = getSubtotal(cartItermsInfo);
    let cartItemSavedSubtotal = getSavedSubtotal(cartItemSubtotal);
    let savedCartItems = getSaved(cartItemSavedSubtotal);
    let total = getTotal(savedCartItems);
    let saves = calcutateSave(savedCartItems);

    let returnString = '';
    for(let cartItem of savedCartItems) {
        returnString += '名称：' + cartItem.name + '，数量：' + cartItem.amount + '瓶，单价：' +
            cartItem.price + '（元），小计：' + cartItem.savedSubtotal + '（元）';
    }
    returnString += '，总计：' + total + '（元），节省：' + saves + '（元）'
    return returnString;
}

function formatBarcodes(tags) {
    return tags.map(function (tag) {
        let temp = tag.split('-');
        return {
            barcode: temp[0],
            amount: parseFloat(temp[1]) || 1
        }
    });
}

function mergeBarcode(barcodes) {
    return barcodes.reduce(function (cur, pre) {
        let exitItem = cur.find(function (item) {
            return item.barcode === pre.barcode
        })
        if(exitItem) {
            exitItem.amount += pre.amount;
        } else {
            cur.push(pre)
        }
        return cur;
    },[])
}

function getPromotedItem(carItems, promotedItems) {
    let promotedCartItems = [];

    let flag = true;
    for(let i=0; i<carItems.length; i++) {
        for(let j=0; j<promotedItems.length; j++) {
            let exitItem = promotedItems[j].barcodes.find(function(item) {
                return item === carItems[i].barcode
            })

            if(exitItem) {
                flag = true;
                promotedCartItems.push(Object.assign({}, carItems[i], {type: promotedItems[j].type}));
                break;
            }
            else {
                flag = false
            }
        }
        if(!flag) {
            promotedCartItems.push(Object.assign({}, carItems[i], {type: "null"}));
        }
    }
    console.log(promotedCartItems)
    return promotedCartItems;
}


function getItems(promotedCartItems, items) {
    let cartItemsInfo = [];
    for(let i=0; i<promotedCartItems.length; i++) {
        let exitItem = items.find(function (item) {
            return item.barcode === promotedCartItems[i].barcode;
        })
        if(exitItem) {
            cartItemsInfo.push(Object.assign({}, exitItem, {amount:promotedCartItems[i].amount,type:promotedCartItems[i].type}))
        }
    }
    return cartItemsInfo;
}

function getSubtotal(cartItemsInfo) {
    let cartItemSubtotal = [];

    for(let i=0; i<cartItemsInfo.length; i++) {
        let temp = cartItemsInfo[i].price * cartItemsInfo[i].amount;
        cartItemSubtotal.push(Object.assign({}, cartItemsInfo[i], {subtotal: temp}))
    }
    return cartItemSubtotal;
}

function getSavedSubtotal(cartItemSubtotal) {
    let cartItemSavedSubtotal = [];
    let result
    for (let i = 0; i < cartItemSubtotal.length; i++) {

        if (cartItemSubtotal[i].type === "BUY_TWO_GET_ONE_FREE") {
            if(cartItemSubtotal.count <= 2) {
                result = cartItemSubtotal[i].amount * cartItemSubtotal[i].price
            }
            else {
                let num = cartItemSubtotal[i].amount - parseInt(cartItemSubtotal[i].amount/3)
                result = num * cartItemSubtotal[i].price
            }
        }

        else if (cartItemSubtotal[i].type === "OTHER_PROMOTION") {
            result = cartItemSubtotal[i].subtotal * 0.8;
        }

        else {
            result = cartItemSubtotal[i].subtotal;
        }
        cartItemSavedSubtotal.push(Object.assign({}, cartItemSubtotal[i], {savedSubtotal: result}))
    }
    return cartItemSavedSubtotal;
}
function getSaved(cartItemSavedSubtotal) {
    let savedCartItems = []
    for(let i=0; i<cartItemSavedSubtotal.length; i++) {
        let saves = cartItemSavedSubtotal[i].subtotal - cartItemSavedSubtotal[i].savedSubtotal
        savedCartItems.push(Object.assign({}, cartItemSavedSubtotal[i], {save:saves}))
    }
    return savedCartItems
}

function getTotal(savedCartItems) {
    let total = 0;
    for(let i=0; i<savedCartItems.length; i++) {
        total += savedCartItems[i].savedSubtotal
    }
    return total;
}

function calcutateSave(savedCartItems) {
    let saves = 0;
    for(let i=0; i<savedCartItems.length; i++) {
        saves += savedCartItems[i].save
    }
    return saves;
}
