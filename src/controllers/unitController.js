const connectToMySQL = require('../utils/db');
class UnitController {
    //======================= create =============================
    static async unitCreate(req, res) {
        try {
            const connection = connectToMySQL();
            const { unitname } = req.body;
            if (!unitname) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            }
            const queryUnit = `INSERT INTO tb_unit (unit) VALUES (?)`;
            connection.query(queryUnit, [unitname], async (error, result) => {
                if (error) {
                    return res.json({
                        message: "ເກີດຂໍ້ຜິດພາດ",
                    });
                }
                return res.json({
                    status: "ok",
                    message: "ສ້າງຫົວຫນ່ວຍສຳເລັດ",
                });
            })
        } catch (error) {
            return res.json({
                message: error.message,
            });
        }
    }
    //======================= Update =============================
    static async unitUpdate(req, res) {
        try {
            const connection = connectToMySQL();
            const { id, unit } = req.body;
            if (!id || !unit) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            }
            const getPosition = `SELECT * FROM tb_unit where id=?`;
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
                const queryUnit = `UPDATE tb_unit SET unit = ? where id=?`;
                connection.query(queryUnit, [unit, id], async (error, result) => {
                    if (error) {
                        return res.json({
                            message: "ເກີດຂໍ້ຜິດພາດ",
                        });
                    }
                    return res.json({
                        status: "ok",
                        message: "ອັບເດດຫົວຫນ່ວຍສຳເລັດ",
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
    static async unitDelete(req, res) {
        try {
            const connection = connectToMySQL();
            const { id } = req.params; 
            if (!id) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            }
            const getPosition = `SELECT * FROM tb_unit where id=?`;
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
                const queryUnit = `DELETE FROM tb_unit where id=?`;
                connection.query(queryUnit, [id], async (error, result) => {
                    if (error) {
                        if (error['code'] == "ER_ROW_IS_REFERENCED_2") {
                            return res.json({
                                message: "ບໍ່ສາມາດລົບຫົວຫນ່ວຍໄດ້ ເນືອງຈາກມີການໃຊ້ງານຢູ່",
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
                        message: "ລົບຫົວຫນ່ວຍສຳເລັດ",
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
    static async unitGetAll(req, res) {
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

module.exports = UnitController;
