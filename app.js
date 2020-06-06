const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser')
const path = require('path')
const favicon = require('serve-favicon')
var routesBenXe = require('./routesAdmin/benxeRoutes');
var routesXe = require('./routesAdmin/xeRoutes');
var routestuyenXe = require('./routesAdmin/tuyenxeRoutes');
var routesChuyenXe = require('./routesAdmin/chuyenxeRoutes');
var routesKhachHang = require('./routesAdmin/khachhangRoutes');
var routesChiTietVeXe = require('./routesAdmin/chitietvexeRoutes');
var routesChiTietVeXeHuy = require('./routesAdmin/chitietvexehuyRoute');
var routesHoaDon = require('./routesAdmin/hoadonRoutes');
var routesTaiKhoan = require('./routesAdmin/taikhoanRoutes');
const { ensureAuthenticated, forwardAuthenticated ,ensureAuthenticatedForAdmin} = require('./config/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())

// Passport Config

// MySql DB

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB ALTER TABLE `tickets` ADD PRIMARY KEY(`ticketID`);
mongoose
  .connect(
    db,
    {useNewUrlParser:true,
    useUnifiedTopology: true
  },
    
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')))


// Express body parser
app.use(express.urlencoded({ extended: true }));
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes User

app.use('/', require('./routes/index.js'));
app.use('/user', require('./routes/users.js'));
// app.use('/admin', require('./routes/admin.js'));
app.use('/static', express.static(path.join(__dirname, 'public')))


//Route Admin
app.get("/allusers",function(req,res){
  res.render("admin/user");
});
app.get("/tablebenxe",function(req,res){
  res.render("admin/tableBenXe");
});
app.get("/tablexe",function(req,res){
  res.render("admin/tableXe");
});
app.get("/tabletuyenxe",function(req,res){
  res.render("admin/tableTuyenXe");
});
app.get("/tablechuyenxe",function(req,res){
  res.render("admin/tableChuyenXe");
});
app.get("/tablekhachhang",function(req,res){
  res.render("admin/tableKhachHang");
});
app.get("/tablevexe",function(req,res){
  res.render("admin/tableVeXe");
});
app.get("/tablehoadon",function(req,res){
  res.render("admin/tableHoaDon");
});
app.get("/editbenxe",function(req,res){
  res.render("admin/editBenXe");
});
app.get("/editxe",function(req,res){
  res.render("admin/editXe");
});
app.get("/edittuyenxe",function(req,res){
  res.render("admin/editTuyenXe");
});
app.get("/editchuyenxe",function(req,res){
  res.render("admin/editChuyenXe");
});
app.get("/editkhachhang",function(req,res){
  res.render("admin/editKhachHang");
});
app.get("/statistical",function(req,res){
  res.render("admin/statistical");
});
app.get("/huyve",function(req,res){
  res.render("admin/huyVeXe")
});app.get("/duyetvehuy",function(req,res){
  res.render("admin/DuyetVeHuy")
});



routesBenXe(app);
routesXe(app);
routestuyenXe(app);
routesChuyenXe(app);
routesKhachHang(app);
routesChiTietVeXe(app);
 routesChiTietVeXeHuy(app);
routesHoaDon(app);
routesTaiKhoan(app);
app.use(function (req, res, next) {
  res.status(404).render('error');

})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

