# Happiness-App

This project contains the source code of Happiness application

Step 1:  Start the Network and instantiate the chaincode

*  cd happy 
*  sudo ./startHappinessApp.sh

Step 2: Start the client node-sdk to interact with block chain network

*  cd happy/middleware/
*  rm -rf wallet/
*  npm install
*  npm run start


Step 3: Test all curl is working

*  cd happy/middleware/test
*  ./curlTest.sh


Step 4: Access swagger UI

*  http://172-16-104-161.osz4.rdcloud.intra.hitachi.co.jp/api-docs/#/

