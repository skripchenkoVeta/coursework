const { Op } = require("sequelize");
const uuid = require('uuid');
const path = require('path');
const {DrivingSchool, DrivingSchoolInfo, Type, Brand} = require('../models/models');
const apiError = require('../error/apiError');

class DrivingSchoolController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const drivingschool = await DrivingSchool.create({
                name,
                price,
                brandId,
                typeId,
                img: fileName
            });

            if(info) {
                info = JSON.parse(info);
                info.forEach(i => {
                    DrivingSchoolInfo.create({
                        title: i.title,
                        description: i.description,
                        drivingschoolId: drivingschool.id
                    })
                })
            }

            return res.json(drivingschool);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }

    }

    async getAll(req, res,next) {
        try {
            let {brandId, typeId, limit, page} = req.query;
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit
            let drivingschools;
            if (!brandId && !typeId) {
                drivingschools = await DrivingSchool.findAndCountAll({
                    include: [
                        {model: Brand},
                        {model: Type},
                    ],
                    limit,
                    offset})
            }
            if (brandId && !typeId) {
                drivingschools = await DrivingSchool.findAndCountAll({
                    where:{brandId},
                    include: [
                        {model: Brand},
                        {model: Type},
                    ],
                    limit,
                    offset
                })}
            if (!brandId && typeId) {
                drivingschools = await DrivingSchool.findAndCountAll({
                    where:{typeId},
                    include: [
                        {model: Brand},
                        {model: Type},
                    ],
                    limit,
                    offset
                })}
            if (brandId && typeId) {
                drivingschools = await DrivingSchool.findAndCountAll({
                    where:{typeId, brandId},
                    include: [
                        {model: Brand},
                        {model: Type},
                    ],
                    limit,
                    offset
                })}
            return res.json(drivingschools)
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getSearchAllDrivingSchoolByName(req, res, next) {
        try {
            let {limit, page, name, filter} = req.query;

            page = page || 1;
            limit = limit || 7;
            let offset = page * limit - limit
            if(filter === "Все") {
                const drivingschools =  await DrivingSchool.findAndCountAll({
                    attributes: ["name", "price", "img", "id"],
                    where:
                        {
                            name: {
                                [Op.like]: `%${name}%`
                            }
                        },
                    include: [
                        {
                            attributes: ["name"],
                            model: Brand
                        },
                        {
                            attributes: ["name"],
                            model: Type
                        },
                    ],
                    limit,
                    offset,
                })

                return res.json(drivingschools);
            } else {
                const drivingschools =  await DrivingSchool.findAndCountAll({
                    attributes: ["name", "price", "img", "id", "brandId", "typeId"],
                    where:
                        {
                            name: {
                                [Op.like]: `%${name}%`
                            },
                            [Op.or]: [
                                {
                                    brandId: null,
                                },
                                {
                                    typeId: null,
                                },
                            ],
                        },
                    include: [
                        {
                            attributes: ["name"],
                            model: Brand
                        },
                        {
                            attributes: ["name"],
                            model: Type
                        },
                    ],
                    limit,
                    offset,
                })


                return res.json(drivingschools);
            }
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            let drivingschools = await DrivingSchool.findOne({
                where: {id},
                include: [
                    {model: DrivingSchoolInfo, as: 'info'},
                    {model: Type},
                    {model: Brand},
                ]
            });
            return res.json(drivingschools);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await DrivingSchool.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await DrivingSchool.destroy({where:{id}}).then(() => {
                            return res.json("Автошкола удалена");
                        })
                    } else {
                        return res.json("Данная автошкола не найдена. Скорее всего она отсутствует в базе данных");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            const {brandId, typeId, name, price, info} = req.body;

            await DrivingSchool.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        let newVal = {};
                        brandId ? newVal.brandId = brandId : false;
                        typeId ? newVal.typeId = typeId : false;
                        name ? newVal.name = name : false;
                        price ? newVal.price = price : false;

                        if(req.files) {
                            const {img} = req.files;
                            const type = img.mimetype.split('/')[1];
                            let fileName = uuid.v4() + `.${type}`;
                            img.mv(path.resolve(__dirname, '..', 'static', fileName));
                            newVal.img = fileName;
                        }

                        if(info) {
                            const parseInfo = JSON.parse(info);
                            for (const item of parseInfo) {
                                await DrivingSchoolInfo.findOne({where:{id: item.id}}).then( async data => {
                                    if(data) {
                                        await DrivingSchoolInfo.update({
                                            title: item.title,
                                            description: item.description
                                        }, {where:{id: item.id}})
                                    } else {
                                        await DrivingSchoolInfo.create({
                                            title: item.title,
                                            description: item.description,
                                            drivingschoolId: id
                                        })
                                    }
                                })
                            }
                        }

                        await DrivingSchool.update({
                            ...newVal
                        }, {where:{id}} ).then(() => {
                            return res.json("Автошкола обновлена");
                        })
                    } else {
                        return res.json("Данная автошкола не найдена. Скорее всего она отсутствует в базе данных");
                    }
                })
            } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new DrivingSchoolController();
