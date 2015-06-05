安装说明:

1.启动server :  进入server目录,修改server.config,运行java -jar server.jar.(端口为3000 ,java version 1.7+)

2.安装大屏  分别安装语音库speech.apk,应用程序 bigscreen.apk (配置服务端地址:如"http://xxx.xxx.xxx.xxx:3000/")

3.安装小屏  安装room.apk (配置服务端地址:如"http://xxx.xxx.xxx.xxx:3000/",房间号:如 "12") 






提示内容接口:
http://localhost:3000/changeTipFire?type=2&content=<div style="color:red">支持html css</div>&roomno=12 
触发小屏提示内容  
http://localhost:3000/changeTipFire?type=1&content=<div style="color:red">支持html css</div> 
触发大屏提示内容

状态改变触发接口:
http://localhost:3000/loadDataFire?roomno=12  
状态更新触发操作


获取数据接口
http://localhost:3000/getbigscreendata?linesno=2 
大屏获取最新数据
http://localhost:3000/getbigscreenpasseddata?linesno=2
大屏获取最新过号数据
http://localhost:3000/getroomdata?roomno=12 
小屏获取最新数据






