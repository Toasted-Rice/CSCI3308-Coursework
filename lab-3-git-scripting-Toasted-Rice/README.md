# CSCI 3308 Lab 3: Git Scripting

| Course Website | Canvas | Piazza  |
| :------------: | :----: | :-----: |
| [![Course Website](https://img.shields.io/badge/Labs-Lab3-0A4D99)](https://cuboulder-csci-3308.herokuapp.com/Labs/lab3_git_scripting/index.html) | [![Canvas](https://img.shields.io/badge/Canvas-CSCI3308-CFB87C)](https://canvas.colorado.edu/courses/75464) | [![Piazza](https://img.shields.io/badge/-Piazza-3e7aab)](https://piazza.com/class/ksjjmkg29n8dv)


## Overview
In this lab, you will learn how to use a linux terminal, practice some git commands, and write a shell script. Step 3, "Practicing git commands", is a group exercise and you will work with your project team to practice managing a repository.

Please follow the instructions on the [course website](https://cuboulder-csci-3308.herokuapp.com/Labs/lab3_git_scripting/index.html). Note that the above badges serve as quick links to the lab instructions, Course Canvas, and Course Piazza. 

## Command Quick Reference
Run the `devel` image:
```bash
docker-compose run devel
```

Install vim:
```bash
apt-get update && apt-get install vim
```

Reclaim ownership of all files in the current working directory:
```bash
# uncomment if not in container
# docker-compose run devel
chown -R 1000:1000 .
```
Please refer to the lab instructions for more details. 

## Submission Guidelines
To receive credit for this lab, you MUST check in with your TA during lab and upload your files and screenshots to this repo by the deadline.

Make sure to add, commit, and push your changes. You should run the following commands inside your local git directory. Make sure to double-check your submission through the browser.

In a terminal opened inside your repo:

```bash
mkdir submission # then, copy/move your screenshots into the submission directory
git add submission
git commit -m "add all of the screenshots for lab3"
git push
```
