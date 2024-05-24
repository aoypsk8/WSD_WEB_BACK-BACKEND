const connectToMySQL = require('../utils/db');
const crypto = require('crypto');
class BranchController {
    //======================= create =============================
    static async branchCreate(req, res) {
        try {
            const connection = connectToMySQL();
            const { fullname, phone, price_id, detail } = req.body;
            if (!fullname || !phone || !price_id || !detail) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            }
            const queryBranch = `INSERT INTO tb_branch (fullname, phone,price_id,detail) VALUES (?,?,?,?)`;
            connection.query(queryBranch, [fullname, phone, price_id, detail], async (error, result) => {
                if (error) {
                    return res.json({
                        message: "ເກີດຂໍ້ຜິດພາດ",
                    });
                }
                return res.json({
                    status: "ok",
                    message: "ສ້າງສາຂາແລະລູກຄ້າປະຈຳສຳເລັດ",
                });
            })
        } catch (error) {
            return res.json({
                message: error.message,
            });
        }
    }
    //======================= Update =============================
    static async branchUpdate(req, res) {
        try {
            const connection = connectToMySQL();
            const { id, fullname, phone, price_id, detail } = req.body;
            if (!fullname || !phone || !price_id || !detail) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            }
            const getBranch = `SELECT * FROM tb_branch where id=?`;
            connection.query(getBranch, [id], async (error, result) => {
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
                const queryPrice = `UPDATE tb_branch SET fullname =?, phone=?,price_id=?,detail=? where id=?`;
                connection.query(queryPrice, [fullname, phone, price_id, detail, id], async (error, result) => {
                    if (error) {
                        return res.json({
                            message: "ເກີດຂໍ້ຜິດພາດ",
                        });
                    }
                    return res.json({
                        status: "ok",
                        message: "ອັບເດດສາຂາແລະລູກຄ້າປະຈຳສຳເລັດ",
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
    static async branchDelete(req, res) {
        try {
            const connection = connectToMySQL();
            const { id } = req.body;
            if (!id) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            }
            const getBranch = `SELECT * FROM tb_branch where id=?`;

            connection.query(getBranch, [id], async (error, result) => {
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
                const queryBranch = `DELETE FROM tb_branch where id=?`;
                connection.query(queryBranch, [id], async (error, result) => {
                    if (error) {
                        if (error['code'] == "ER_ROW_IS_REFERENCED_2") {
                            return res.json({
                                message: "ບໍ່ສາມາດລົບສາຂາແລະລູກຄ້າປະຈຳໄດ້ ເນືອງຈາກມີການໃຊ້ງານຢູ່",
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
                        message: "ລົບສາຂາແລະລູກຄ້າປະຈຳເລັດ",
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
    static async branchGetAll(req, res) {
        try {
            const connection = connectToMySQL();
            const queryBranch = `SELECT * FROM tb_branch `;
            connection.query(queryBranch, async (error, result) => {
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

module.exports = BranchController;
