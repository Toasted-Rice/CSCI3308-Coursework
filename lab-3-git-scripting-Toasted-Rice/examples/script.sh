#!/bin/bash

echo "Check if files with the name are currently in folder: "
ls #| egrep --color "file1.txt|file2.txt"
echo "Some text in File 1 for Sample shell script" > file1.txt
echo "\nFile1 created. See list below:"
ls #| egrep --color "file1.txt|file2.txt"
echo "\nContents of file1:"
cat file1.txt

echo "Some text in File 2 for Sample shell script" > file2.txt
echo "\nFile2 created. See list below:"
ls #| egrep --color "file1.txt|file2.txt"
echo "\nContents of file2: "
cat file2.txt



echo "\ncontents from File1 and File2 merged and stored in file2:"
cat file1.txt file2.txt | tee file2.txt

echo "contents of file1: \n"
cat file1.txt

rm file1.txt file2.txt

echo "\nFiles 1&2 deleted. See list below:"

ls #| egrep --color "file1.txt|file2.txt" 


