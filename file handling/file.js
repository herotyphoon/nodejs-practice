const fs = require('fs');
const os = require('os');

// // sync...
// fs.writeFileSync('./test.txt', 'hey there!')
//
// // async
// fs.writeFileSync('./test.txt', 'Hello World', (err) => {})

// const result = fs.readFileSync("./test.txt",'utf8')
// console.log(result)
//
// fs.readFile("./test.txt","utf-8",(err,result) => {
//     if (err) throw err;
//     console.log("Test result: "+result);
// });
// console.log(1);

// fs.appendFile('./test.txt', '\n'+new Date().getDate().toLocaleString(), (err) => {})

// console.log(os.cpus().length);