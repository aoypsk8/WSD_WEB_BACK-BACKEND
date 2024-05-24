const connectToMySQL = require('../utils/db');
const crypto = require('crypto');
class ProductController {
    //======================= create =============================
    static async productCreate(req, res) {
        try {
            const connection = connectToMySQL();
            const { productname, unit, price } = req.body;
            if (!productname || !unit || !price) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            }
            const barCode = crypto.randomBytes(10).toString('hex');
            const queryProduct = `INSERT INTO tb_product (barcode,product_name,unit_id,price_cost) VALUES (?,?,?,?)`;
            connection.query(queryProduct, [barCode, productname, unit, price], async (error, result) => {
                if (error) {
                    return res.json({
                        message: "ເກີດຂໍ້ຜິດພາດ",
                    });
                }
                return res.json({
                    status: "ok",
                    message: "ສ້າງສິນຄ້າສຳເລັດ",
                });
            })
        } catch (error) {
            return res.json({
                message: error.message,
            });
        }
    }
    //======================= Update =============================
    static async productUpdate(req, res) {
        try {
            const connection = connectToMySQL();
            const { id, productname, unit, price } = req.body;
            if (!productname || !unit || !price) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            }
            const getProduct = `SELECT * FROM tb_product where id=?`;
            connection.query(getProduct, [id], async (error, result) => {
                if (error) {
                    return res.json({
                        message: "ເກີດຂໍ້ຜິດພາດ",
                    });
                }
                if (!result || result.length === 0) {
                    return res.json({
                        message: "ບໍ່ພົບສິນຄ້າ",
                    });
                }
                const queryProduct = `UPDATE tb_product SET product_name =? ,unit_id = ? ,price_cost = ? where id=?`;
                connection.query(queryProduct, [productname, unit, price, id], async (error, result) => {
                    if (error) {
                        return res.json({
                            message: "ເກີດຂໍ້ຜິດພາດ",
                        });
                    }
                    return res.json({
                        status: "ok",
                        message: "ອັບເດດສິນຄ້າສຳເລັດ",
                    });
                })
            })
        } catch (error) {
            return res.json({
                message: error.message,
            });
        }
    }
    //======================= delete =============================
    static async productDelete(req, res) {
        try {
            const connection = connectToMySQL();
            const { id } = req.body;
            if (!id) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            }
            const getProduct = `SELECT * FROM tb_product where id=?`;

            connection.query(getProduct, [id], async (error, result) => {
                if (error) {
                    return res.json({
                        message: "ເກີດຂໍ້ຜິດພາດ",
                    });
                }
                if (!result || result.length === 0) {
                    return res.json({
                        message: "ບໍ່ພົບສິນຄ້າ",
                    });
                }
                const queryProduct = `DELETE FROM tb_product where id=?`;
                connection.query(queryProduct, [id], async (error, result) => {
                    if (error) {
                        if (error['code'] == "ER_ROW_IS_REFERENCED_2") {
                            return res.json({
                                message: "ບໍ່ສາມາດລົບສິນຄ້າໄດ້ ເນືອງຈາກມີການໃຊ້ງານຢູ່",
                            });
                        }
                        else {
                            return res.json({
                                message: "ເກີດຂໍ້ຜິດພາດ",
                            });
                        }
                    }
                    return res.json({
                        status: "ok",
                        message: "ລົບສິນຄ້າສຳເລັດ",
                    });
                })
            })

        } catch (error) {
            return res.json({
                message: error.message,
            });
        }
    }
    //======================= Get all =============================
    static async productGetAll(req, res) {
        try {
            const connection = connectToMySQL();
            const queryUnit = `SELECT * FROM tb_product `;
            connection.query(queryUnit, async (error, result) => {
                if (error) {
                    return res.json({
                        message: "ເກີດຂໍ້ຜິດພາດ",
                    });
                }
                return res.json({
                    status: "ok",
                    message: "ສຳເລັດ",
                    data: result,
                });
            })
        } catch (error) {
            return res.json({
                message: error.message,
            });
        }
    }

}

module.exports = ProductController;
