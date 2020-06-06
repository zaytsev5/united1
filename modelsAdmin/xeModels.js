'user strict';
var sql = require('./db.js');

//Task object constructor
var Xe = function(xe){
    console.log(xe);
    this.BienSoXe = xe.BienSoXe;
    this.LoaiXe = xe.LoaiXe;
    this.SoChoNgoi = xe.SoChoNgoi;
	this.MaBX = xe.MaBX;
};
Xe.createXe = function createUser(newXe, result) {
    sql.query("INSERT INTO xe set ?", newXe, function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
         //   console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Xe.getXeByMaBX = function getXeByMaBX(MaBX,result){
	sql.query("Select * from xe where xe.MaBX = ? ",MaBX,function(err,res){
		if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
	});
};
Xe.getXeById = function createUser(BienSoXe, result) {
    sql.query("Select * from xe where BienSoXe = ? ", BienSoXe, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};
Xe.getAllXe = function getAllXe(result) {
    sql.query("Select * from xe", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            //console.log('Xe : ', res);

            result(null, res);
        }
    });
};
Xe.updateXeById = function(BienSoXe, xe, result){
    sql.query("UPDATE xe SET  LoaiXe= ?, SoChoNgoi= ?, MaBX= ? WHERE BienSoXe = ?", [xe.LoaiXe,xe.SoChoNgoi,xe.MaBX,BienSoXe], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
Xe.remove = function(BienSoXe, result){
    sql.query("DELETE FROM xe WHERE BienSoXe = ?", [BienSoXe], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            result(null, res);
        }
    });
};

module.exports= Xe;