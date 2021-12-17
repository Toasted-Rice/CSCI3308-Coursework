#!/bin/bash

clear
echo "############"
echo "only action: awk '{print}' employee.txt" 
awk '{print}' employee.txt
echo "############"
echo 'only pattern - default action is print: awk "/manager/" employee.txt' 
awk '/manager/' employee.txt
echo "############"
echo 'action & pattern: awk "/manager/ {print}" employee.txt'
awk '/manager/ {print}' employee.txt
echo "############"
echo 'printing specific fields: awk "{print $1, $4}" employee.txt'
awk '{print $1, $4}' employee.txt
echo "############"
echo 'printing row number with record: awk "{print NR, $0}" employee.txt'
awk '{print NR, $0}' employee.txt
echo "############"
echo 'printing first and last column of all records: awk "{print $1, $NF}" employee.txt'
awk '{print $1, $NF}' employee.txt
echo "############"
echo 'print specific rows: awk "NR==3, NR==6 {print NR, $0}" employee.txt'
awk 'NR==3, NR==6 {print NR, $0}' employee.txt
echo "############"
echo 'matching a field to a value: awk "$2 !~ /manager/ {print}" employee.txt'
awk '$2 !~ /manager/ {print}' employee.txt
echo "############"
echo 'matching a field to a value: awk "$2 ~ /manager/ {print}" employee.txt'
awk '$2 ~ /manager/ {print}' employee.txt
echo "############"
echo 'for loop: '
awk 'BEGIN {for (i=1;i<6;i++) print "square of ", i, " is ", i*i;}'