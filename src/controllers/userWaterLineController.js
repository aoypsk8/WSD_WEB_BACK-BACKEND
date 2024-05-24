const connectToMySQL = require('../utils/db');
const crypto = require('crypto');
class UserWaterLineController {
    //======================= create =============================
    static async userWaterLineCreate(req, res) {
        try {
            const connection = connectToMySQL();
            const { employee_id, waterline_id, detail } = req.body;
            if (!employee_id || !waterline_id || !detail) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            }
            const queryUserWaterLine = `INSERT INTO tb_user_waterline (employee_id, waterline_id, detail) VALUES (?,?,?)`;
            connection.query(queryUserWaterLine, [employee_id, waterline_id, detail], async (error, result) => {
                if (error) {
                    return res.json({
                        message: "ເກີດຂໍ້ຜິດພາດ",
                    });
                }
                return res.json({
                    status: "ok",
                    message: "ສ້າງທີມສົ່ງນ້ຳເລັດ",
                });
            })
        } catch (error) {
            return res.json({
                message: error.message,
            });
        }
    }
    //======================= Update =============================
    static async userWaterLineUpdate(req, res) {
        try {
            const connection = connectToMySQL();
            const { id, employee_id, waterline_id, detail } = req.body;
            if (!employee_id || !waterline_id || !detail) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            }
            const getUserWaterLine = `SELECT * FROM tb_user_waterline where id=?`;
            connection.query(getUserWaterLine, [id], async (error, result) => {
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
                const queryUserWaterLine = `UPDATE tb_user_waterline SET employee_id =? ,waterline_id = ? ,detail = ? where id=?`;
                connection.query(queryUserWaterLine, [employee_id, waterline_id, detail, id], async (error, result) => {
                    if (error) {
                        return res.json({
                            message: "ເກີດຂໍ້ຜິດພາດ",
                        });
                    }
                    return res.json({
                        status: "ok",
                        message: "ອັບເດດທີມສົ່ງນ້ຳສຳເລັດ",
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
    static async userWaterLineDelete(req, res) {
        try {
            const connection = connectToMySQL();
            const { id } = req.body;
            if (!id) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            }
            const getUserWaterLine = `SELECT * FROM tb_user_waterline where id=?`;

            connection.query(getUserWaterLine, [id], async (error, result) => {
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
                const queryUserWaterLine = `DELETE FROM tb_user_waterline where id=?`;
                connection.query(queryUserWaterLine, [id], async (error, result) => {
                    if (error) {
                        if (error['code'] == "ER_ROW_IS_REFERENCED_2") {
                            return res.json({
                                message: "ບໍ່ສາມາດລົບທີມສົ່ງນ້ຳໄດ້ ເນືອງຈາກມີການໃຊ້ງານຢູ່",
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
                        message: "ລົບທີມສົ່ງນ້ຳສຳເລັດ",
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
    static async userWaterLineGetAll(req, res) {
        try {
            const connection = connectToMySQL();
            const queryUserWaterLine = `SELECT * FROM tb_user_waterline `;
            connection.query(queryUserWaterLine, async (error, result) => {
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

module.exports = UserWaterLineController;
