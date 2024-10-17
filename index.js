const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()
const port = 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const db = mysql.createConnection({
  host: 'korawit.ddns.net',
  user: 'webapp',
  password: 'secret2024', 
  port: 3307,
  database: 'shop'
});
db.connect((err) => {
  if (err) {
    console.error('ไม่สามารถเชื่อมต่อกับฐานข้อมูลได้: ', err);
  } else {
    console.log('เชื่อมต่อฐานข้อมูลสำเร็จ');
  }
});
 
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE",
  );
  next();
});
app.use(express.json())
 
const products=[
  {id:0,name:"Notebook Acer Swift",price:45900,img:"https://img.advice.co.th/images_nas/pic_product4/A0147295/A0147295_s.jpg"},
  {id:1,name:"Notebook Asus Vivo",price:19900,img:"https://img.advice.co.th/images_nas/pic_product4/A0146010/A0146010_s.jpg"},
  {id:2,name:"Notebook Lenovo Ideapad",price:32900,img:"https://img.advice.co.th/images_nas/pic_product4/A0149009/A0149009_s.jpg"},
  {id:3,name:"Notebook MSI Prestige",price:54900,img:"https://img.advice.co.th/images_nas/pic_product4/A0149954/A0149954_s.jpg"},
  {id:4,name:"Notebook DELL XPS",price:99900,img:"https://img.advice.co.th/images_nas/pic_product4/A0146335/A0146335_s.jpg"},
  {id:5,name:"Notebook HP Envy",price:46900,img:"https://img.advice.co.th/images_nas/pic_product4/A0145712/A0145712_s.jpg"}];
 
app.get('/', (req, res) => {
  res.send('Hello World!')
})
 
app.get('/api/products',(req,res)=>{
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return res.status(500).send('เกิดข้อผิดพลาดกับฐานข้อมูล');
    } else {
      return res.json(results);
    }
  });
})
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  db.query('SELECT * FROM products WHERE id = '+productId, (err, result) => {
    if (err) {
      return res.status(500).send('Error querying the database');
    }
    if (result.length === 0) {
      return res.status(404).send('Product not found');
    }
    res.json(result);
  });
});
 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})