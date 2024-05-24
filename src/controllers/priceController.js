const connectToMySQL = require('../utils/db');
const crypto = require('crypto');
class PriceController {
    //======================= create =============================
    static async priceCreate(req, res) {
        try {
            const connection = connectToMySQL();
            const { product_id, price } = req.body;
            if (!product_id || !price) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            }
            const queryPrice = `INSERT INTO tb_price (product_id, price) VALUES (?,?)`;
            connection.query(queryPrice, [product_id, price], async (error, result) => {
                if (error) {
                    return res.json({
                        message: "ເກີດຂໍ້ຜິດພາດ",
                    });
                }
                return res.json({
                    status: "ok",
                    message: "ສ້າງລາຄາສຳເລັດ",
                });
            })
        } catch (error) {
            return res.json({
                message: error.message,
            });
        }
    }
    //======================= Update =============================
    static async priceUpdate(req, res) {
        try {
            const connection = connectToMySQL();
            const { id, product_id, price } = req.body;
            if (!product_id || !price ||!id) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            }
            const getPricet = `SELECT * FROM tb_price where id=?`;
            connection.query(getPricet, [id], async (error, result) => {
                if (error) {
                    return res.json({
                        message: "ເກີດຂໍ້ຜິດພາດ",
                    });
                }
                if (!result || result.length === 0) {
                    return res.json({
                        message: "ບໍ່ພົບຂໍ້ມູນ",
                    });
                }
                const queryPrice = `UPDATE tb_price SET product_id =? ,price = ? where id=?`;
                connection.query(queryPrice, [product_id, price, id], async (error, result) => {
                    if (error) {
                        return res.json({
                            message: "ເກີດຂໍ້ຜິດພາດ",
                        });
                    }
                    return res.json({
                        status: "ok",
                        message: "ອັບເດດລາຄາສຳເລັດ",
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
    static async priceDelete(req, res) {
        try {
            const connection = connectToMySQL();
            const { id } = req.body;
            if (!id) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            }
            const getPrice = `SELECT * FROM tb_price where id=?`;

            connection.query(getPrice, [id], async (error, result) => {
                if (error) {
                    return res.json({
                        message: "ເກີດຂໍ້ຜິດພາດ",
                    });
                }
                if (!result || result.length === 0) {
                    return res.json({
                        message: "ບໍ່ພົບຂໍ້ມູນ",
                    });
                }
                const queryPrice = `DELETE FROM tb_price where id=?`;
                connection.query(queryPrice, [id], async (error, result) => {
                    if (error) {
                        if (error['code'] == "ER_ROW_IS_REFERENCED_2") {
                            return res.json({
                                message: "ບໍ່ສາມາດລົບລາຄາໄດ້ ເນືອງຈາກມີການໃຊ້ງານຢູ່",
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
                        message: "ລົບລາຄາສຳເລັດ",
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
    static async priceGetAll(req, res) {
        try {
            const connection = connectToMySQL();
            const queryPrice = `SELECT * FROM tb_price `;
            connection.query(queryPrice, async (error, result) => {
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

module.exports = PriceController;
