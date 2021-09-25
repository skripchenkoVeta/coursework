const sequelize = require('./../db/db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
});

const DrivingSchool = sequelize.define('drivingschool', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
});

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
});

const DrivingSchoolInfo = sequelize.define('drivingschool_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
});

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasMany(Rating);
Rating.belongsTo(User);


Type.hasMany(DrivingSchool);
DrivingSchool.belongsTo(Type);

Type.hasMany(DrivingSchool);
DrivingSchool.belongsTo(Type);

Brand.hasMany(DrivingSchool);
DrivingSchool.belongsTo(Brand);

DrivingSchool.hasMany(Rating);
Rating.belongsTo(DrivingSchool);

DrivingSchool.hasMany(DrivingSchoolInfo, {as: 'info'});
DrivingSchoolInfo.belongsTo(DrivingSchool);

Type.belongsToMany(Brand, {through: TypeBrand});
Brand.belongsToMany(Type, {through: TypeBrand});


module.exports = {
    User,
    DrivingSchool,
    Type,
    Brand,
    Rating,
    TypeBrand,
    DrivingSchoolInfo
}

