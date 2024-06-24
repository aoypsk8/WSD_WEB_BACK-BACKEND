const connectToMySQL = require('../utils/db');
class SaleController {
    static async createSale(req) {
        return new Promise((resolve, reject) => {
            try {
                const connection = connectToMySQL();
                const { order_id } = req.body;
                if (!order_id) {
                    reject(new Error("Please enter all required data!"));
                }
                const insertSaleQuery = `INSERT INTO tb_sale_history (order_id, status) VALUES (?, ?)`;
                const status = true;
                connection.query(insertSaleQuery, [order_id, status], (error, results) => {
                    connection.end();
                    if (error) {
                        reject(new Error("Failed to create sale"));
                    } else {
                        resolve({ status: "ok", message: "Sale created successfully", data: results });
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }


    static async getSaleDetails(req, res) {
        const connection = connectToMySQL();
        try {
            const { order_id } = req.body;
            if (!order_id) {
                connection.end();
                return res.json({ message: "Please enter all required data!" });
            }

            const checkOrderQuery = `SELECT * FROM tb_sale_history WHERE order_id = ?`;
            connection.query(checkOrderQuery, [order_id], (error, results) => {
                if (error) {
                    connection.end();
                    return res.json({ message: "Database error", error });
                }

                if (results.length === 0) {
                    connection.end();
                    return res.json({ message: "No sale history found for the given order_id" });
                }

                // Get order details similar to getAllOrder
                const getOrderDetailsQuery = `
                    SELECT 
                        o.order_id,
                        o.Cus_ID,
                        o.order_date,
                        o.status,
                        oi.order_item_id,
                        oi.Product_ID,
                        oi.quantity,
                        oi.Price,
                        oi.Location,
                        oi.phone,
                        oi.ImagePay,
                        p.Product_Name,
                        p.Description,
                        p.Product_img
                    FROM orders o
                    JOIN order_items oi ON o.order_id = oi.order_id
                    JOIN tb_products p ON oi.Product_ID = p.Product_ID
                    WHERE o.order_id = ?;
                `;

                connection.query(getOrderDetailsQuery, [order_id], (error, orderResults) => {
                    if (error) {
                        connection.end();
                        return res.json({ message: "Database error", error });
                    }
                    if (orderResults.length === 0) {
                        connection.end();
                        return res.json({ message: "No orders found for the given order_id" });
                    }

                    const getCustomerQuery = 'SELECT * FROM tb_customers WHERE Cus_ID = ?';
                    connection.query(getCustomerQuery, [orderResults[0].Cus_ID], (error, customerResults) => {
                        if (error) {
                            connection.end();
                            return res.json({ message: "Database error", error });
                        }
                        if (customerResults.length === 0) {
                            connection.end();
                            return res.json({ message: "No customer found for the given Cus_ID" });
                        }

                        let total = 0;
                        orderResults.forEach(item => {
                            total += item.quantity * parseFloat(item.Price);
                        });

                        const orderDetails = {
                            Cus_name: customerResults[0].First_name,
                            order_date: orderResults[0].order_date,
                            status: orderResults[0].status,
                            Location: orderResults[0].Location,
                            ImagePay: orderResults[0].ImagePay,
                            total: total,
                            products: orderResults.map(item => ({
                                Product_Name: item.Product_Name,
                                quantity: item.quantity,
                                Price: item.Price,
                                Description: item.Description,
                                Product_img: item.Product_img,
                                totalProduct: item.Price * item.quantity
                            }))
                        };

                        connection.end();
                        return res.json({
                            status: "ok",
                            message: "Order details retrieved successfully",
                            data: orderDetails
                        });
                    });
                });
            });
        } catch (error) {
            if (connection) connection.end();
            return res.json({ message: error.message });
        }
    }

}

module.exports = SaleController;
