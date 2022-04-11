const puppeteer = require('puppeteer');


(async()=>{
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: false,
        headless: false,
        devtools: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    
    
    page = await browser.newPage();


    await page.goto('https://www.typing.com/student/typing-test/1-minute')
            .then(()=>console.log("[👍] Page OK"))
            .catch((e)=>console.log('!!! Goto Fail page'))
        
    // Wait for selector
    await page.waitForSelector('button.js-continue-button',{timeout: 5000})
        .then(async()=>{
            await page.click('button.js-continue-button')
            console.log('[👍] Continue ok')
        })
    
    await page.waitForSelector('.letter',{timeout: 0})
        .then(()=>console.log('[👍] Selector ok'))
    
        let rows = await page.evaluate(
                ()=> Array.from(window.document.querySelectorAll('.letter'))
                        .map((row)=>{
                        return row.innerText
                    }).join('')
        )
        
    // Filter data
        console.log("Total file scraped "+rows.length)
        console.log(rows);
    
    await page.type(".letter",rows,{delay :30})
        /*
    (async()=>{
        for(let i=0;i<rows.length;i++){
            if(rows[i]==" "){
                await  page.keyboard.press("Space")
            }
            else{
                await  page.keyboard.press(rows[i])
            }
            
        }
    })()
    */
})()

