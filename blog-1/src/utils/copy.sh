#!/bin/sh
cd /Users/guozhen/work/nodeBlog/blog-1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log