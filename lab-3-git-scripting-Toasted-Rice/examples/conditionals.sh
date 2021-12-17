#!/bin/sh

echo "Enter number1: "
read number1

echo "Enter number2: "
read number2

if [ $number1 == $number2 ]
then 
	echo "both numbers are equal"
else
	echo "both numbers are inequal"
fi
