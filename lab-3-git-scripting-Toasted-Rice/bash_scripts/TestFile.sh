#!/bin/bash

if test $# -lt 1; then
	echo "    USAGE: ./TestFile.sh filename"
	exit
elif test ! -f $1; then
	echo "    ERROR: $1 does not exist."
	exit
fi

input=""
echo "Welcome to the TestFile program..."

while true; do
	echo "Enter one of the commands below:"
	echo "    1. count_lines()"
	echo "    2. count_words()"
	echo "    3. add_text()"
	echo "    4. copy()"
	echo "    5. exit()"
	read -p "> " input

	case "$input" in
		1*|*count_lines*)
			if line_count=$(wc -l $1 | grep -o -E "[0-9]+"); then
				echo "$1 has $line_count lines."
			else
				echo "ERROR: Failed to get line count."
			fi
			;;

		2*|*count_words)
			if word_count=$(grep -o -E "Lorem|model|Ipsum|will" $1 | wc -w); then
				echo "The words, Lorem, model, Ipsum, and will appear $word_count time(s) in $1."
			else
				echo "ERROR: failed to get word count."
			fi
			;;

		3*|*add_text)
			echo ""
			echo "This command will append your input to $1."
			echo "Enter a sentence:"
			read -p "> " input
			if echo "$input" >> $1; then
				echo "Successfully appended $1."
			else
				echo "ERROR: could not append $1."
			fi
			;;

		4*|*copy)
			if test -f "solution"; then mkdir solution; fi
			if cp $1 ./solution/$1; then
				echo "Successfully copied $1 into solution directory."
			else
				echo "ERROR: could not copy $1 into solution directory."
			fi
			;;

		5*|*exit)
			echo "Thank you for using the TestFile program. We hope to service you again soon!"
			echo ""
			exit
			;;

		*)
		echo "Invalid command."
		;;
	esac
	echo "" && echo ""
done
