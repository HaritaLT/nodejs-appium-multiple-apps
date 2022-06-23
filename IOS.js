var wd = require("wd")
var assert  = require("assert");
var asserter = wd.asserters;

username = (process.env.LT_USERNAME == undefined) ? "username" //Enter the username here
        : process.env.LT_USERNAME
accesskey = (process.env.LT_ACCESS_KEY == undefined) ? "access_key" //Enter the access_key here
        : process.env.LT_ACCESS_KEY

desired_capabilities = {
    'deviceName':'iPhone 12',
    'platformVersion':'14',
    'platformName':'iOS',
    'isRealMobile':true,
    'app':'lt://', //Enter the app_url here
    'visual':true,
    'video': true,
    'build':'NodeJS Vanilla - iOS',
    'name': 'Sample Test - NodeJS',

    //ADD GEOLOCATION BASED ON COUNTRY CODE
    'geoLocation':'fr'  
}

driver = wd.promiseRemote(`https://${username}:${accesskey}@mobile-hub.lambdatest.com/wd/hub`)

async function iOStest(){

try {

driver.init(desired_capabilities)
.then(function(){
    return driver.waitForElementById('color',10000)
})
.then(function(color){
    return color.click();
})
.then(function(){
    return driver.waitForElementById('Text',10000)
})
.then(function(text){
    text.click()
    return driver.waitForElementById('toast',10000)
})
.then(function(toast){
    toast.click()
    return driver.waitForElementById('notification',10000)
})
.then(function(find){
    find.click()
    driver.quit()
})
}
catch (e) {
    driver.quit()
}
}

iOStest();
