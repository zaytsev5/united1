const mysql = require('mysql');
//MySql config
const mysqlDB = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: null,
  database: 'booking_system'
})
mysqlDB.connect(function(err){
  if(err) return console.log(err)
  console.log("Mysql connected...")
})


module.exports = {
	// THÍCH THÌ DÙNG KHÔNG THÍCH THÌ THÔI
	
 findPostIdByName:function(src,des,callback){
 	let query = "select * from tuyenxe where DiemDi = ? and DiemDen=?";
 	let bind = [];
 	bind.push(src);bind.push(des)
 	mysqlDB.query(query,bind,(err,result)=>{
 		if(err) return console.log(err)
 		callback(result)
 	})
 },
 findPost: function(trip,date,callback){
 	let query = "select * from chuyenxe where MaTX = ? and NgayDi=?";
 	let bind = [];
 	bind.push(trip);bind.push(date)
 	mysqlDB.query(query,bind,(err,result)=>{
 		if(err) return console.log(err)
 		callback(result)
 	})
 },
 findTrip:function(callback){
 	let query = "select * from tuyenxe"
 	mysqlDB.query(query,(err,result)=>{
 		if(err) throw err
 		callback(result)
 	})
 },
 findByEmail : function(email,callback){
 	let query = "select * from users where email = ?";
 	mysqlDB.query(query,email,)
 },
 addOne: function(val1,val2,val3,callback){
 	let bind = [];
 	bind.push(val1);bind.push(val2);bind.push(val3)
 	let query = "INSERT INTO `xe`(`BienSoXe`, `LoaiXe`, `SoChoNgoi`, `MaBX`) VALUES (?,?,30,?)"
 	mysqlDB.query(query,bind,(err,result) =>{
 		if(err) return  callback({isAdded:false})
 		callback({isAdded:true})
 	})
 },
 findPostTime: function(trip,date,time,callback){
 	let query = 'select * from chitietvexe where MACX = (select MaCX  from chuyenxe where MaTX =? and NgayDi=? and GioDi=? and SoVeHienCon > 0)';
 	let bind = [];
 	bind.push(trip);bind.push(date);bind.push(time)
 	mysqlDB.query(query,bind,(err,result)=>{
 		if(err) return console.log(err)
 		callback(result)
 	})
 },
 getTimePost:function(trip,date,callback){
 	let query = 'select MaCX,GioDi,NgayDi from chuyenxe where MaTX =? and NgayDi = ?';
 	let bind = [];
 	bind.push(trip);bind.push(date)
 	mysqlDB.query(query,bind,(err,result)=>{
 		if(err) return console.log(err)
 		callback(result)
 	})
 },
 getAllTrips:function(callback){
 	let query = 'select * from tuyenxe';
 	mysqlDB.query(query,(err, result) =>{
 		if(err) throw err
 		callback(result)
 	})
 },
 getInfoTrip:function(tripId,callback) {
 	let query = 'select * from tuyenxe where MaTX=?'
 	mysqlDB.query(query,tripId,(err,result)=>{
 		if(err) return console.log("a mistake -1")
 		callback(result)
 	})
 },
 getInfoUser:function(email,callback){
 	let query = 'select * from khachhang where Email = ?'
 	mysqlDB.query(query,email,(err, result) =>{
 		if(err) throw err
 		callback(result)
 	})
 },
 getInfoPost:function(postID,callback){
 	let query = 'select * from chuyenxe where MaCX=?'
 	mysqlDB.query(query,postID,(err,result)=>{
 		if(err) return console.log("a mistake 0")
 		callback(result)
 	})
 }
 ,
 save:function(bind,callback){
 	let query = 'INSERT INTO `khachhang`(`Email`, `TenKH`, `SDT`, `GioiTinh`, `DiaChi`) VALUES (?,?,?,?,?)'
 	let not = false
 	mysqlDB.query(query,bind,(err,result) =>{
 		if(err) return callback(not)
 		callback(result)
 	})
 },
 findSeat:function(postID,callback){
 	let query = 'select SoGhe from chitietvexe where MaCX=?'
 	let bind = [];
 	bind.push(postID);
 	mysqlDB.query(query,bind,(err,result)=>{
 		if(err) return console.log("a mistake 1")
 		callback(result)
 	})
 },
 checkSeatBySeat:function(seat,postID,callback){
	let query = 'select SoGhe from chitietvexe where MaCX=? and SoGhe = ?'
 	let bind = [];
 	bind.push(postID);
 	bind.push(seat);

 	mysqlDB.query(query,bind,(err,result)=>{
 		if(err) return console.log("a mistake 2")
 		callback(result)
 	})
 },
 saveTicket:function (bind,callback){
 	let query = 'insert into `vexe`(`MaHD`,`MaVeXe`,`Email`,`NgayDat`) values (?,?,?,?)'
 	let not = false;
 	mysqlDB.query(query,bind,(err,result)=>{
 		if(err) return callback(not)
 		callback(result)
 	})
 },
 saveDetailTicket:function (bind,callback){
 	let query = 'insert into `chitietvexe`(`MaVeXe`,`MaCX`,`SoGhe`) values (?,?,?)'
 		let not = false;
 	mysqlDB.query(query,bind,(err,result)=>{
 		if(err) return  console.log("hghj")
 		callback(result)
 	})
 },
 updateTickets: function(tickets,postID, callback){
 	let query = 'update `chuyenxe` set `SoVeHienCon` =(select `SoVeHienCon` from `chuyenxe` where `MaCX`=?) - ? where MaCX=?'
 	let bind = [];
 	bind.push(postID);
 	bind.push(tickets);
 	bind.push(postID);
 		let not = false;
 	mysqlDB.query(query,bind,(err, result) =>{
 		if(err) return console.log("lôi day ne")
 			callback(result)
 	})
 },
 getAllCusId: function(callback){
 	let query = 'select `CMND` from `khachhang`'
 	mysqlDB.query(query,(err, result) =>{
 		if(err) return console.log("a mistake")
 			callback(result)
 		//console.log(result)
 	})
 }
 ,
 findCusByEmail: function(email,callback){
 	let query = 'select * from `khachhang` where Email=?';
 	let notdone =false;
 	mysqlDB.query(query,email,(err, result) =>{
 		if(err) return callback(notdone)
 			callback(result)
 	})
 }
 ,
 checkTicket:function(ticketId,callback){
 	let query = 'select * from `chitietvexe`,`vexe` where chitietvexe.MaVeXe = vexe.MaVeXe and chitietvexe.MaVeXe = ?';
 	mysqlDB.query(query,ticketId,(err, result) =>{
 		if(err) return callback(false)
 			callback(result)
 	})
 },
 getAllTicketsById:function(cmnd,callback){
 	let query = 'select * from `chitietvexe`,`vexe`,`chuyenxe` where chitietvexe.MaVeXe = vexe.MaVeXe and chitietvexe.MaCX = chuyenxe.MaCX and vexe.CMND = ?';
 	mysqlDB.query(query,cmnd,(err, result) =>{
 		if(err) return callback(false)
 			callback(result)
 	})
 	
 },
 getAllTicketsByEmail:function(email,callback){
 	let query = 'select * from `chitietvexe`,`vexe`,`chuyenxe` where chitietvexe.MaVeXe = vexe.MaVeXe and chitietvexe.MaCX = chuyenxe.MaCX and vexe.Email = ?';
 	mysqlDB.query(query,email,(err, result) =>{
 		if(err) return callback(false)
 			callback(result)
 	})
 	
 },
 findUserByEmail:function(email,callback){
 	let query = 'select Email from khachhang where Email=? limit 1'
 	mysqlDB.query(query,email,(err, result) =>{
 		if(err) return callback(false)
 			callback(result)
 	})
 },
 checkCusByEmail:function(email,callback){
 	let query = 'select Email from khachhang where Email=?'
 	mysqlDB.query(query,email,(err, result) =>{
 		if(err) return callback(false)
 			callback(result)
 	})
 },
 destroyTicket:function(id,callback){
 	let query = 'delete from chitietvexe where chitietvexe.MaVeXe = ?'
 	mysqlDB.query(query,id,(err, result) =>{
 		if(err) return callback(false)
 			callback(result)
 	})
 },
 updateCus:function(cusId,email,callback){
 	let query = 'update `khachhang` set `Email` = ? where `CMND` =?'
 	let bind=[];
 	bind.push(email);
 	bind.push(cusId);	
 	mysqlDB.query(query,bind,(err, result) =>{
 		if(err) return callback(false)
 			callback(result)
 	})
 },
 getDateGoPost:function(postID,callback){
 	let query =`SELECT chuyenxe.MaTX, chuyenxe.MaCX,chuyenxe.BienSoXe,benxe.TenBX,tuyenxe.DonGia
	FROM chuyenxe
	INNER JOIN benxe ON chuyenxe.MaBXDi =  benxe.MaBX
	INNER JOIN tuyenxe ON tuyenxe.MaTX= chuyenxe.MaTX where chuyenxe.MaCX = ?`
	mysqlDB.query(query,postID,(err,result)=>{
		if(err) return console.log(err)
			callback(result)
	})
 },
 updateEmailForChangeEmail:function(newE,oldE,callback){
 	let query = 'update `khachhang` set `Email` = ? where `Email` =?'
 	let bind=[];
 	bind.push(newE);
 	bind.push(oldE);	
 	mysqlDB.query(query,bind,(err, result) =>{
 		if(err) return callback(false)
 			callback(result)
 	})
 }
};