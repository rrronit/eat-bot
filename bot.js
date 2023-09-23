const puppeteer=require("puppeteer")
const fs=require("fs")
const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://ronit:ronit@cluster0.b64qrkf.mongodb.net/?retryWrites=true&w=majority")


const codeSchema=new mongoose.Schema({
    code:String,
    used:{type:Boolean,default:false} 
})  

const code=mongoose.model("Code",codeSchema)


const login=async () => {

    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
  
    const localData=JSON.parse(fs.readFileSync("localStorageData.json","utf-8"))
    const cookies=JSON.parse(fs.readFileSync("cookies.json","utf-8"))
   await page.setCookie(...cookies)

    await page.goto('https://eatsure.com/checkout');

    

    await page.evaluate((localData)=>{
        for (let key in localData){
            localStorage.setItem(key,localData[key])
        }
    },localData)

    const remove = await page.$('.jLCREk button');

    if (remove!==null){

    await page.click(".jLCREk button")
    await page.waitForTimeout(1000)

    }
    await page.waitForTimeout(2000)
   
    await page.waitForSelector(".dFTiPm")
    await page.click(".fvVWzT .dFTiPm")

    for (let i=70000;i<99999;i++){
try{


        const input = await page.$('.ilNeTH');
       
        if (input!==null){
            await input.click({ clickCount: 3 })
            await input.type(`ES${i}`);
            
            /* await page.type(".ilNeTH",`ES${i}`) */
            await page.waitForSelector(".gkvVFa")
          
            await page.click(".gkvVFa")
            await page.waitForTimeout(1500)
        }
       else{
        await code.create({code:`ES${i-1}`})
        console.log(i-1)
    fs.appendFile("code.txt",`ES${i-1},`,(err)=>{
        console.log(err)
    })
         await page.waitForTimeout(4000)
        await page.waitForSelector(".jLCREk button")

        await page.click(".jLCREk button")
        
        await page.waitForTimeout(2000)
        
        await page.waitForSelector(".dFTiPm")
        await page.click(".fvVWzT .dFTiPm")
}



    }catch(err){
        console.log(err)
    }


/*     await page.waitForSelector(".userSP")
    await page.click(".userSP")
    await page.waitForSelector("#phone_number")

    await page.type("#phone_number","7985107225")

    await page.click("#send_otp")

    await page.waitForTimeout(40000)

*/
/*     const localStorageData = await page.evaluate(() => {
    return JSON.stringify(localStorage);
  });
    const cookie= await page.cookies()

  fs.writeFileSync("cookies.json",JSON.stringify(cookie))
  fs.writeFileSync('localStorageData.json', localStorageData)
  fs.writeFileSync('check.json', localStorageData)
    */
   
    }
}
login()