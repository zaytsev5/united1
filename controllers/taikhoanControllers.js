'use strict';

var TaiKhoan = require('../modelsAdmin/taikhoanModels.js');

exports.getAllTaiKhoan = function(req, res) {
    TaiKhoan.getAllTaiKhoan(function(err, taikhoan) {

        console.log('controller')
        if (err) res.send(err);
        //console.log('res',taikhoan);
        res.send(taikhoan);
    });
};