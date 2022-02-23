REM first argument is name
REM second argument is video format
REM third & forth argument is filters/additional args
mkdir %1
ffmpeg -i %1.%2 %3 %4 ./%1/%%d.png