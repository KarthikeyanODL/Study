#!/bin/bash

        if [ $1 = "" ]
	then
	   echo "Please Provide cmd arguments u or h"
	   exit
        fi 	   
        if [ $1 = "u" ]
	then
	   for ((i = 0; i<50; i++))
	   do 	   
	    # userId=$(uuidgen)	
	     userId=$((100 + $i))
	     args="{\"Args\":[\"registerUser\", \"$userId\",\"10\" ]}"
	     set-chain-env.sh -i  "$args"
	     chain.sh invoke
           done
        elif [ $1 = "h" ]
	then
	    for ((i = 0; i<50; i++))
	    do	    
	      historyId=$((500 + $i))
	     # userId=$(uuidgen)
	      userId=$((100 + $i))
              args="{\"Args\":[\"addHistory\", \"$historyId\",\"$userId\", \"90\", \"12:10pm-July-2019\", \"$i\",\"hitachi-park\",\"maintain garden\" ]}"
              set-chain-env.sh -i  "$args"
	      chain.sh invoke	
            done   
        else
	    echo "invalid cmd arguments"
        fi	 

