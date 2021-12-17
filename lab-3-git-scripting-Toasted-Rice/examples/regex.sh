#! /bin/bash

#-i: ignore case
#-v: text that does not match pattern
#-n: line number
#^: anchor tag - starts with
#.: wildcard character denoting 1 character
#egrep: equivalent of grep -E. treats string as a regular expression. regards the metacharacter's as is.

echo "\nliteral matching: grep -ivn 'unix' textfile.txt"
grep -ivn 'unix' textfile.txt

echo "\nAnchor matches: grep -in '^unix' textfile.txt"
grep -in '^unix' textfile.txt

echo "\nWildcard matching: grep -n '..eat' textfile.txt"
grep -n '..eat' textfile.txt

echo "\nBracket expressions: grep -n '^[A-Z]' textfile.txt"
grep -n '^[A-Z]' textfile.txt

echo "\nRepeat pattern matching: egrep -n '[A-Za-z]+' textfile.txt"
grep -En '[A-Za-z]+' textfile.txt

