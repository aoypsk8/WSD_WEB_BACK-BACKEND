const connectToMySQL = require('../utils/db');
class WaterLineController {
    //======================= create =============================
    static async waterCreate(req, res) {
        try {
            const connection = connectToMySQL();
            const { line_name } = req.body;
            if (!line_name) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            }
            const queryWaterLine = `INSERT INTO tb_waterline (line_name) VALUES (?)`;
            connection.query(queryWaterLine, [line_name], async (error, result) => {
                if (error) {
                    return res.json({
                        message: "ເກີດຂໍ້ຜິດພາດ",
                    });
                }
                return res.json({
                    status: "ok",
                    message: "ສ້າງສາຍນ້ຳສຳເລັດ",
                });
            })
        } catch (error) {
            return res.json({
                message: error.message,
            });
        }
    }
    //======================= Update =============================
    static async waterUpdate(req, res) {
        try {
            const connection = connectToMySQL();
            const { id, line_name } = req.body;
            if (!id || !line_name) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            }
            const getWaterLine = `SELECT * FROM tb_waterline where id=?`;
            connection.query(getWaterLine, [id], async (error, result) => {
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
                const queryWaterLine = `UPDATE tb_waterline SET line_name = ? where id=?`;
                connection.query(queryWaterLine, [line_name, id], async (error, result) => {
                    if (error) {
                        return res.json({
                            message: "ເກີດຂໍ້ຜິດພາດ",
                        });
                    }
                    return res.json({
                        status: "ok",
                        message: "ອັບເດດສາຍນ້ຳສຳເລັດ",
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
    static async waterDelete(req, res) {
        try {
            const connection = connectToMySQL();
            const { id } = req.body;
            if (!id) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            }
            const getWaterLine = `SELECT * FROM tb_waterline where id=?`;
            connection.query(getWaterLine, [id], async (error, result) => {
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
                const queryWaterLine = `DELETE FROM tb_waterline where id=?`;
                connection.query(queryWaterLine, [id], async (error, result) => {
                    if (error) {
                        if (error['code'] == "ER_ROW_IS_REFERENCED_2") {
                            return res.json({
                                message: "ບໍ່ສາມາດລົບສາຍນ້ຳໄດ້ ເນືອງຈາກມີການໃຊ້ງານຢູ່",
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
                        message: "ລົບສາຍນ້ຳສຳເລັດ",
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
    static async waterGetAll(req, res) {
        try {
            const connection = connectToMySQL();
            const queryWaterLine = `SELECT * FROM tb_waterline `;
            connection.query(queryWaterLine, async (error, result) => {
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

module.exports = WaterLineController;
