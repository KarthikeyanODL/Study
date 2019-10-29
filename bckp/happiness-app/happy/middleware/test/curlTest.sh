
printf "\nTest1\n"
curl -X POST "http://localhost:8787/api/v1/users" -H "accept: application/xml" -H "Content-Type: application/json" -d "{ \"userId\": \"100\", \"balance\": \"10\"}"   &&

printf  "\nTest2\n"
curl -X POST "http://localhost:8787/api/v1/users" -H "accept: application/xml" -H "Content-Type: application/json" -d "{ \"userId\": \"101\", \"balance\": \"10\"}"   &&

printf "\nTest3\n"
curl -X GET "http://localhost:8787/api/v1/users" -H "accept: application/xml"  &&

printf "\nTest4\n"
curl -X GET "http://localhost:8787/api/v1/users/100" -H "accept: application/xml"  &&

printf "\nTest5\n"
curl -X DELETE "http://localhost:8787/api/v1/users/100" -H "accept: application/xml" &&

printf "\nTest6\n"
curl -X POST "http://localhost:8787/api/v1/users/101/point" -H "accept: application/xml" -H "Content-Type: application/json" -d "{ \"points\": \"100\", \"operator\": \"add\"}" &&

printf "\nTest7\n"
curl -X POST "http://localhost:8787/api/v1/histories" -H "accept: application/xml" -H "Content-Type: application/json" -d "{ \"historyId\": \"1000\", \"userId\": \"101\", \"points\": \"111\", \"time\": \"12pm\", \"actionId\": \"123\", \"status\": \"testing\", \"details\": \"testing\"}" &&

printf "\nTest8\n"
curl -X GET "http://localhost:8787/api/v1/histories?limit=20" -H "accept: application/xml" &&

printf "\nTest9\n"
curl -X GET "http://localhost:8787/api/v1/histories/101?limit=20" -H "accept: application/xml" 

