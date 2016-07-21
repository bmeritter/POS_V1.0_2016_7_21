'use strict';

describe("printReceipt", function () {
    it("print Receipt", function () {
        let tags = ['ITEM000000', 'ITEM000000', 'ITEM000000'];
        let returnString = '名称：可口可乐，数量：3瓶，单价：3（元），小计：6（元），总计：6（元），节省：3（元）'
        let result = printReceipt(tags)

        expect(result).toEqual(returnString);
    })
})

describe("formatBarcodes", function () {

    it("given tages and get barcodes", function () {
        let tags = ['ITEM000002'];
        let result = formatBarcodes(tags);
        let barcodes = [
            {
                barcode: 'ITEM000002',
                amount: 1
            }
        ];

        expect(result).toEqual(barcodes);
    });
})

describe("mergeBarcode", function () {
    it("merge barcodes array", function () {
        let barcodes = [
            {
                barcode: 'ITEM000002',
                amount: 2.5
            },
            {
                barcode: 'ITEM000002',
                amount: 2
            }
        ];
        let result = mergeBarcode(barcodes);
        let mergedBarcodes = [
            {
                barcode: 'ITEM000002',
                amount: 4.5
            }
        ];

        expect(result).toEqual(mergedBarcodes)
    });
});

describe("getPromotedItem", function () {
    it("return cartItems promotion", function () {
        let mergedBarcodes = [
            {
                barcode: 'ITEM000000',
                amount: 1
            }
        ];
        let promotedItems = [
            {
                type: 'BUY_TWO_GET_ONE_FREE',
                barcodes: [
                    'ITEM000000',
                    'ITEM000001'
                ]
            },
            {
                type: 'OTHER_PROMOTION',
                barcodes: [
                    'ITEM000003',
                    'ITEM000004'
                ]
            }
        ];
        let promotedCartItems = [
            {
                barcode: 'ITEM000000',
                amount: 1,
                type: 'BUY_TWO_GET_ONE_FREE'
            }
        ];
        let result = getPromotedItem(mergedBarcodes, promotedItems);

        expect(result).toEqual(promotedCartItems)
    })
})

describe("getItems", function () {
    it("return the cartItemsDetail", function () {
        let promotedCartItems = [
            {
                barcode: 'ITEM000000',
                amount: 1,
                type: 'BUY_TWO_GET_ONE_FREE'
            }
        ];
        let items = [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00
            }
        ];
        let cartItemsInfo = [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                amount: 1,
                type: 'BUY_TWO_GET_ONE_FREE'
            }
        ];
        let result = getItems(promotedCartItems, items);

        expect(result).toEqual(cartItemsInfo)
    });
})


describe("getSubtotal", function () {
    it("return subtotal", function () {
        let cartItemsInfo = [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                amount: 1,
                type: 'BUY_TWO_GET_ONE_FREE'
            }
        ];

        let cartItemSubtotal = [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                amount: 1,
                subtotal: 3,
                type: 'BUY_TWO_GET_ONE_FREE'
            }
        ];
        let result = getSubtotal(cartItemsInfo)

        expect(result).toEqual(cartItemSubtotal)
    });
})

describe("getSavedSubtotal", function () {
    it("return the every cartItems real total", function () {
        let cartItemSubtotal = [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                amount: 3,
                subtotal: 9,
                type: 'BUY_TWO_GET_ONE_FREE'
            }
        ];
        let cartItemSavedSubtotal = [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                amount: 3,
                subtotal: 9,
                savedSubtotal: 6,
                type: 'BUY_TWO_GET_ONE_FREE'
            }
        ];
        let result = getSavedSubtotal(cartItemSubtotal);

        expect(result).toEqual(cartItemSavedSubtotal)
    })
})

describe("getSaved", function () {
    it("return every saves", function () {
        let cartItemSavedSubtotal = [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                amount: 3,
                subtotal: 9,
                savedSubtotal: 6,
                type: 'BUY_TWO_GET_ONE_FREE'
            }
        ];
        let savedCartItems = [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                amount: 3,
                subtotal: 9,
                savedSubtotal: 6,
                save: 3,
                type: 'BUY_TWO_GET_ONE_FREE'
            }
        ];

        let result = getSaved(cartItemSavedSubtotal);
        expect(result).toEqual(savedCartItems)
    })
})

describe("getTotal", function () {
    it("return total", function () {
        let savedCartItems = [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                amount: 3,
                subtotal: 9,
                savedSubtotal: 6,
                save: 3,
                type: 'BUY_TWO_GET_ONE_FREE'
            }
        ];
        let total = getTotal(savedCartItems)

        expect(total).toBe(6)
    })
})

describe("calcutateSave", function () {
    it("return total save", function () {
        let savedCartItems = [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                amount: 3,
                subtotal: 9,
                savedSubtotal: 6,
                save: 3,
                type: 'BUY_TWO_GET_ONE_FREE'
            }
        ];
        let saves = calcutateSave(savedCartItems)

        expect(saves).toBe(3)
    })
})