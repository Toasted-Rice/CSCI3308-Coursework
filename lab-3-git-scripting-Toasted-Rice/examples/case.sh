#!/bin/sh

echo "Enter a binary number (0 or 1):"
read number

case $number in 
  0)
    Message="That's a zero!"
    ;;
  1)
    Message="That's a one!"
    ;;
  *)
    Message="Response undefined. Have a lucky day!"
    ;;
esac

echo $Message


