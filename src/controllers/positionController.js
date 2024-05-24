const connectToMySQL = require('../utils/db');
class PositionController {
    //======================= create =============================
    static async positionCreate(req, res) {
        try {
            const connection = connectToMySQL();
            const { position } = req.body;
            if (!position) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            }
            const queryUnit = `INSERT INTO tb_position (position) VALUES (?)`;
            connection.query(queryUnit, [position], async (error, result) => {
                if (error) {
                    return res.json({
                        message: "ເກີດຂໍ້ຜິດພາດ",
                    });
                }
                return res.json({
                    status: "ok",
                    message: "ສ້າງຕຳແໜ່ງສຳເລັດ",
                });
            })
        } catch (error) {
            return res.json({
                message: error.message,
            });
        }
    }
    //======================= Update =============================
    static async positionUpdate(req, res) {
        try {
            const connection = connectToMySQL();
            const { id, position } = req.body;
            if (!id || !position) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            }
            const getPosition = `SELECT * FROM tb_position where id=?`;
            connection.query(getPosition, [id], async (error, result) => {
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
                const queryPosition = `UPDATE tb_position SET position = ? where id=?`;
                connection.query(queryPosition, [position, id], async (error, result) => {
                    if (error) {
                        return res.json({
                            message: "ເກີດຂໍ້ຜິດພາດ",
                        });
                    }
                    return res.json({
                        status: "ok",
                        message: "ອັບເດດຕຳແໜ່ງສຳເລັດ",
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
    static async positionDelete(req, res) {
        try {
            const connection = connectToMySQL();
            const { id } = req.body;
            if (!id) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            }
            const getPosition = `SELECT * FROM tb_position where id=?`;
            connection.query(getPosition, [id], async (error, result) => {
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
                const queryUnit = `DELETE FROM tb_position where id=?`;
                connection.query(queryUnit, [id], async (error, result) => {
                    if (error) {
                        if (error['code'] == "ER_ROW_IS_REFERENCED_2") {
                            return res.json({
                                message: "ບໍ່ສາມາດລົບຕຳແຫນ່ງໄດ້ ເນືອງຈາກມີການໃຊ້ງານຢູ່",
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
                        message: "ລົບຕຳແໜ່ງສຳເລັດ",
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
    static async positionGetAll(req, res) {
        try {
            const connection = connectToMySQL();
            const queryUnit = `SELECT * FROM tb_unit `;
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

module.exports = PositionController;
