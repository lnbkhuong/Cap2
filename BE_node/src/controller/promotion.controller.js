const { Promotion } = require("../database/sequelize")

const createPromotion = async(req, res, next) => {
    try {
        const {code, promotionName, description, discount, startDate, endDate} = req.body
        const newPromotion = await Promotion.create({
            code,
            promotionName,
            description,
            discount,
            startDate,
            endDate
        })

        return res.status(200).json({
            data:{
                newPromotion
            },
            message:"Tạo vé khuyến mãi thành công"
        })
    } catch (error) {
        return next(error)
    }
}

const updatePromotion = async (req, res, next) => {
    try {
        const {} = req.body
    } catch (error) {
        return next(error)
    }
}