Sprint 8 Project
For this project I used the tool WebDriverIO to automate tests to check the functionality of Urban Routes.
In order to install and configure WebDriverIO(WDIO), you need to create a directory and set up node.js by using npm init --yes. Fron here, you sinstall all its dependencies using npx wdio config. Make sure your chrome or whatever browser your using is up to date and you're ready to run some automated tests.
These tests covered the full process of ordering a taxi. The test were run using two different browsers, Chrome and firefox. 
I utilized Devtools to search for certain elements on the Urban Routes. To search for these specific elements I used locators such as CSS selectors and XPath. 
The describe and it functions from the mocha library helped us structurize and organize all these tests. Another function that helped organize code and avoid repetition is the module.exports function. 
I stored my selectors in one file and exported them to be used in another file using the require function. 
To save computational resources when running each test, I utilized the headless mode. This prevents my computer from slowiong down or even crashing when running all these tests.
To run these tests, simply go to the wdio.conf.js file and replace the baseURL link with a newly generated Urban Routes Link. The baseURL stored in the wdio.conf.js file saves us from having to repeat it multiple times for each test. Then npm run wdio