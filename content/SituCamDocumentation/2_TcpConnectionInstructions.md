---
title: 'Windows-ROS TCP Connection Instructions'
weight: 2
---
<!-- markdownlint-disable MD033 -->

### BrownLab-Specific Parameters

- IP Address Linux "LinuxIP": 192.168.10.2  
- IP Address Windows "WindowsIP": 192.168.10.3  
- Server Port "Port": 5005

### Windows Side

- Make sure Linux IP address and server port values are configured in UnityTcpClient.cs
- Make sure Windows machine is connected to Linux machine via Ethernet by running `ping {LinuxIP}`.
- Do the same on Linux machine, `ping {WindowsIP}`.
- In the Unity object inspector, make sure the UnityTcpClient.cs script has its Enable_tcp_connection checkbox marked.

### Linux Side

- Run `roscore`.
- Run the dVRK ROS node.
- Run `python TcpServer.py` & `python GcodeRunner.py`.

### Quitting and Restarting TcpServer.py

- Ctrl+C will not work because TcpServer.py catches the keyboard interrupt exception (can maybe be fixed).  
- Instead, press ctrl+Z.  
- This will suspend the program but the server port will still be in use, preventing TcpServer.py from running again.  
- To run `python TcpServer.py` while port 5005 is in use, run the command `lsof -i :{Port}` and copy the printed PID value.  
- Run the command `kill -9 {PID}`.  
- Run `python TcpServer.py` again.

### Ethernet Connection Troubleshooting

- Make sure Linux is configured to connect to {WindowsIP} by going to `WiFiSettings->WiredConnections` and selecting `BlueComputer` instead of `internet`.
