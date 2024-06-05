const multer = require('multer');
const MiddleWare = require('../middleware/authMiddleware');
const connectToMySQL = require('../utils/db');
const multerConfig = require('../utils/multer');
const cloudinary = require('../utils/couldinary');

class AuthCostomerController {
    static async loginUser(req, res) {
        try {
            const connection = connectToMySQL();
            const { phoneNumber, password } = req.body;
            if (!phoneNumber || !password) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            }
            const queryUserLogin = 'SELECT * FROM tb_customers WHERE Phone_Number = ?';
            connection.query(queryUserLogin, [phoneNumber], async (error, results) => {
                if (error) {
                    return res.json({
                        message: "ເກີດຂໍ້ຜິດພາດ",
                    });
                }
                // Check if user exists
                if (results.length === 0) {
                    return res.json({
                        message: "ບໍ່ພົບ PhoneNumber !",
                    });
                }
                const user = results[0];
                // Compare password
                if (user['Password'] != password) {
                    return res.json({ message: "ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ  !" });
                }
                const payload = {
                    Phone_Number: user['Phone_Number']
                };
                var accessToken = "";
                accessToken = await MiddleWare.GenerateToken(payload);
                // Close MySQL connection
                connection.end();
                return res.json({
                    status: "ok",
                    message: "ເຂົ້າສູ່ລະບົບສຳເລັດ",
                    data: user,
                    token: accessToken,

                });
            });
        } catch (error) {
            return res.json({
                message: error.message,
            });
        }
    }

    static async registerUser(req, res) {
        try {
            const connection = connectToMySQL();
            const { First_name, Last_name, Phone_Number, Address, Password } = req.body;
            const Profile_img = req.file ? req.file.path : null;

            if (!First_name || !Last_name || !Phone_Number || !Address || !Password) {
                return res.json({
                    message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ !",
                });
            } else {
                // Check if phone number already exists
                const checkPhoneNumberQuery = 'SELECT * FROM tb_customers WHERE Phone_Number = ?';
                connection.query(checkPhoneNumberQuery, [Phone_Number], async (error, results) => {
                    if (error) {
                        return res.json({
                            message: "ເກີດຂໍ້ຜິດພາດ",
                        });
                    }
                    if (results.length > 0) {
                        return res.json({
                            message: "ເບີໂທລະສັບນີ້ມີແລ້ວ!",
                        });
                    }
                    // Insert new user if phone number doesn't exist
                    const insertUser = `INSERT INTO tb_customers (First_name, Last_name, Phone_Number, Profile_img, Address, Password) VALUES (?,?,?,?,?,?)`;
                    if (Profile_img) {
                        await cloudinary.uploader.upload(Profile_img);
                        const result = await cloudinary.uploader.upload(Profile_img);
                        const imageUrl = result.secure_url;
                        connection.query(insertUser, [First_name, Last_name, Phone_Number, imageUrl || "", Address, Password], async (error, results) => {
                            if (error) {
                                return res.json({
                                    message: "ເກີດຂໍ້ຜິດພາດ",
                                });
                            }
                            const user = results[0];
                            // Close MySQL connection
                            connection.end();
                            return res.json({
                                status: "ok",
                                message: "ລົງທະບຽນສຳເລັດ",
                                data: user,
                            });
                        });
                    }
                    
                });
            }
        } catch (error) {
            return res.json({
                message: error.message,
            });
        }
    }


}

module.exports = AuthCostomerController;





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