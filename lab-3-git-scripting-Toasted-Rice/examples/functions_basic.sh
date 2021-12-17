#!/bin/sh

search(){
	grep "$1" textfile.txt | tee result.txt 
}

printf "##### Demo functions ##### \n"

read -p "Enter search string: " word

search $word
