const connectToMySQL = require('../utils/db');
const MiddleWare = require('../middleware/authMiddleware')
class AuthController {
    static async loginUser(req, res) {
        try {
            const connection = connectToMySQL();
            const { username, password } = req.body;
            if (!username || !password) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            }
            const queryUserLogin = 'SELECT * FROM tb_user_login WHERE username = ?';
            connection.query(queryUserLogin, [username], async (error, results) => {
                if (error) {
                    return res.json({
                        message: "ເກີດຂໍ້ຜິດພາດ",
                    });
                }
                // Check if user exists
                if (results.length === 0) {
                    return res.json({
                        message: "ບໍ່ພົບ Username !",
                    });
                }
                const user = results[0];

                const queryRole = `SELECT * FROM tb_role WHERE id = ${user['role_id']}`;
                connection.query(queryRole, async (error, resultRole) => {
                    const role = resultRole[0];
                    console.log(role['role']);
                    const payload = {
                        role: role['role']
                    };
                    var accessToken = "";
                    if (role['role'] == 'Admin') {
                        accessToken = await MiddleWare.GenerateTokenAdmin(payload);
                    } else {
                        accessToken = await MiddleWare.GenerateToken(payload);
                    }

                    // Compare password
                    if (user['password'] != password) {
                        return res.json({ message: "ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ  !" });
                    }
                    // Close MySQL connection
                    connection.end();
                    return res.json({
                        status: "ok",
                        message: "ເຂົ້າສູ່ລະບົບສຳເລັດ",
                        token: accessToken,
                    });
                })
            });
        } catch (error) {
            return res.json({
                message: error.message,
            });
        }
    }
}

module.exports = AuthController;





// static async registerUser(req, res) {
//     try {
//         const { name, phone, password, birthday, role } = req.body;
//         if (phone) {
//             const checkexist = await Models.User.findOne({
//                 phone,
//             });
//             if (checkexist) {
//                 return res.json({
//                     message: "Phone already exsit",
//                 });
//             }
//             if (birthday) {
//                 const [day, month, year] = birthday.split("/");
//                 const parsedBirthday = new Date(`${year}-${month}-${day}`);

//                 var hash = await bcrypt.hash(password, 10);

//                 const newUser = new Models.User({
//                     name: name,
//                     phone: phone,
//                     birthday: new Date(parsedBirthday),
//                     role: role,
//                     password: hash,
//                 });

//                 const userCreate = await Models.User.create(newUser);

//                 if (userCreate) {
//                     return res.json({
//                         status: "ok",
//                         message: "Registration successful",
//                         data: userCreate,
//                     });
//                 }
//             }
//         }
//     } catch (error) {
//         return res.json({
//             message: error.message,
//         });
//     }
// }